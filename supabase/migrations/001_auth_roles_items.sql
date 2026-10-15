-- =====================================================================
-- LARECS — accounts, roles and per-item ownership
-- Run once in Supabase Dashboard → SQL Editor (safe to re-run).
--
-- Rules enforced by Row Level Security:
--   * everyone (even visitors) can READ content
--   * any signed-in user can CREATE items
--   * a user can EDIT / DELETE only the items they created
--   * an admin can EDIT / DELETE everything
--   * every new account is 'user'; the ONLY way to make an admin is to
--     edit the role column in Supabase Dashboard → Table Editor → profiles
-- =====================================================================

-- ---------- Roles ----------------------------------------------------
do $$ begin
  create type public.app_role as enum ('user', 'admin');
exception when duplicate_object then null; end $$;

-- ---------- Profiles (one row per auth user) -------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text not null default '',
  role       public.app_role not null default 'user',
  created_at timestamptz not null default now()
);

-- Admin check used by every policy. SECURITY DEFINER so it can read
-- profiles without being blocked by (or recursing into) RLS.
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Create a profile automatically whenever someone signs up. The role
-- is never taken from sign-up data, so it always gets the default 'user'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Nobody can change role, id or email from the website — not even an
-- admin. auth.uid() is null only for the Supabase dashboard (Table
-- Editor / SQL Editor) and the service role, so that is the only place
-- a role can be changed.
create or replace function public.protect_profile_fields()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is not null then
    if new.role is distinct from old.role
       or new.id is distinct from old.id
       or new.email is distinct from old.email then
      raise exception 'Role, id and email can only be changed from the Supabase dashboard';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_fields on public.profiles;
create trigger profiles_protect_fields
  before update on public.profiles
  for each row execute function public.protect_profile_fields();

-- Backfill profiles for users that existed before this migration.
-- Everyone starts as 'user'.
insert into public.profiles (id, email, full_name)
select u.id,
       u.email,
       coalesce(u.raw_user_meta_data ->> 'full_name', '')
from auth.users u
on conflict (id) do nothing;

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own or admin"   on public.profiles;
drop policy if exists "profiles: update own or admin" on public.profiles;
drop policy if exists "profiles: update own"          on public.profiles;

create policy "profiles: read own or admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

-- Users may only edit their own name; see column grant below.
create policy "profiles: update own" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------- Items (articles, books, members, seminars, ...) ----------
create table if not exists public.items (
  id          uuid primary key default gen_random_uuid(),
  section     text not null check (section in (
                'members','teams','articles','books','theses','reports',
                'phd','researchers','seminars','conferences','studyDays',
                'defenses','newsletters','library','documents')),
  title       text not null check (length(trim(title)) > 0),
  author      text,          -- author / role / supervisor
  year        text,
  event_date  date,
  location    text,
  item_type   text,          -- e.g. PDF, book, report
  description text,          -- description / topic / specialty
  email       text,
  file_name   text,
  owner_id    uuid default auth.uid() references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists items_section_idx on public.items (section, created_at);
create index if not exists items_owner_idx   on public.items (owner_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists items_touch_updated_at on public.items;
create trigger items_touch_updated_at
  before update on public.items
  for each row execute function public.touch_updated_at();

alter table public.items enable row level security;

drop policy if exists "items: public read"            on public.items;
drop policy if exists "items: signed-in users create" on public.items;
drop policy if exists "items: owner or admin update"  on public.items;
drop policy if exists "items: owner or admin delete"  on public.items;

create policy "items: public read" on public.items
  for select to anon, authenticated
  using (true);

create policy "items: signed-in users create" on public.items
  for insert to authenticated
  with check (owner_id = auth.uid());

create policy "items: owner or admin update" on public.items
  for update to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

create policy "items: owner or admin delete" on public.items
  for delete to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- ---------- Site content (about / vision texts — admin only) ---------
create table if not exists public.site_content (
  id         int primary key,
  content    jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_content (id, content) values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Move list data from the old JSON blob into the items table
-- (only the first time, while items is still empty). Legacy rows get
-- no owner, so only admins can edit or delete them.
insert into public.items
  (section, title, author, year, event_date, location, item_type,
   description, email, file_name, owner_id)
select s.key,
       coalesce(nullif(e ->> 'title', ''), nullif(e ->> 'name', ''), '—'),
       coalesce(e ->> 'author', e ->> 'role'),
       e ->> 'year',
       case when e ->> 'date' ~ '^\d{4}-\d{2}-\d{2}$' then (e ->> 'date')::date end,
       e ->> 'location',
       e ->> 'type',
       coalesce(e ->> 'description', e ->> 'topic', e ->> 'specialty'),
       e ->> 'email',
       e ->> 'fileName',
       null
from public.site_content sc
cross join lateral jsonb_each(sc.content) s
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(s.value) = 'array' then s.value else '[]'::jsonb end) e
where sc.id = 1
  and s.key in ('members','teams','articles','books','theses','reports',
                'phd','researchers','seminars','conferences','studyDays',
                'defenses','newsletters','library','documents')
  and not exists (select 1 from public.items);

-- site_content now only holds the about / vision texts.
update public.site_content
set content = jsonb_strip_nulls(jsonb_build_object(
      'about',  content -> 'about',
      'vision', content -> 'vision'))
where id = 1;

alter table public.site_content enable row level security;

-- Replace whatever policies existed before with the new ones.
do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'site_content'
  loop
    execute format('drop policy %I on public.site_content', p.policyname);
  end loop;
end $$;

create policy "site_content: public read" on public.site_content
  for select to anon, authenticated
  using (true);

create policy "site_content: admin update" on public.site_content
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- Grants (RLS above decides which rows) --------------------
grant usage on schema public to anon, authenticated;
grant select on public.items, public.site_content to anon, authenticated;
grant insert, update, delete on public.items to authenticated;
grant update on public.site_content to authenticated;
revoke insert, update, delete on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Making an admin ------------------------------------------
-- Supabase Dashboard → Table Editor → profiles → set role to 'admin'.
