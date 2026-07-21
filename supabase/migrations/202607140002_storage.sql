-- Supabase Storage buckets for reviewed public media and private documents.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-media', 'public-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif','video/mp4','application/pdf']),
  ('private-documents', 'private-documents', false, 15728640, array['image/jpeg','image/png','application/pdf'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Public reads approved media" on storage.objects for select using (bucket_id = 'public-media');
create policy "Users upload private documents" on storage.objects for insert to authenticated
  with check (bucket_id = 'private-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users read own private documents" on storage.objects for select to authenticated
  using (bucket_id = 'private-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Admins manage public media" on storage.objects for all to authenticated
  using (bucket_id = 'public-media' and public.is_admin()) with check (bucket_id = 'public-media' and public.is_admin());
create policy "Admins manage private documents" on storage.objects for all to authenticated
  using (bucket_id = 'private-documents' and public.is_admin()) with check (bucket_id = 'private-documents' and public.is_admin());
