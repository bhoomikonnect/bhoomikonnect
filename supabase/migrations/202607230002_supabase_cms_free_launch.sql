-- Allow BhoomiKonnect's server-only Supabase repository to replace hosted Directus.
alter table public.properties alter column developer_id drop not null;
alter table public.properties add column if not exists developer_name text;
alter table public.properties add column if not exists owner_name text;
alter table public.properties add column if not exists rent_amount numeric;

create index if not exists cms_pages_status_idx
  on public.cms_pages (status, updated_at desc)
  where deleted_at is null;

create index if not exists cms_sections_page_idx
  on public.cms_sections (page_id, display_order)
  where is_active = true;
