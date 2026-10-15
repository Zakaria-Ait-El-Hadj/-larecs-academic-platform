-- =====================================================================
-- LARECS — file attachments (PDF and Word only) in Supabase Storage
-- Run AFTER 001 in Supabase Dashboard → SQL Editor (safe to re-run).
--
--   * everyone (even visitors) can read / download files
--   * signed-in users can upload, into a folder named after their id
--   * a user can replace / delete only their own files; admins all files
-- =====================================================================

-- Where the file lives in the bucket (file_name keeps the original name).
alter table public.items add column if not exists file_path text;

-- Public bucket, 2 MB per file, only PDF and Word documents.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'files', 'files', true, 2097152,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set public             = excluded.public,
    file_size_limit    = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "files: public read"            on storage.objects;
drop policy if exists "files: upload to own folder"   on storage.objects;
drop policy if exists "files: owner or admin update"  on storage.objects;
drop policy if exists "files: owner or admin delete"  on storage.objects;

create policy "files: public read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'files');

create policy "files: upload to own folder" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "files: owner or admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'files'
         and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

create policy "files: owner or admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'files'
         and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
