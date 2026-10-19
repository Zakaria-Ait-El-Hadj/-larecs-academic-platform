-- Accounts are usable immediately: no email verification step.
-- Every new user is marked as confirmed the moment it is created.
create or replace function public.auto_confirm_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.email_confirmed_at is null then
    new.email_confirmed_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_auto_confirm on auth.users;
create trigger on_auth_user_auto_confirm
  before insert on auth.users
  for each row execute function public.auto_confirm_user();

-- Confirm any accounts that were still waiting for verification.
update auth.users
set email_confirmed_at = now()
where email_confirmed_at is null;
