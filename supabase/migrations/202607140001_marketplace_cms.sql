-- BhoomiKonnect marketplace + services CMS expansion.
-- Apply after the base schema in ../schema.sql.

alter type public.user_role add value if not exists 'customer';
alter type public.user_role add value if not exists 'property_owner';
alter type public.user_role add value if not exists 'contractor';
alter type public.user_role add value if not exists 'architect';
alter type public.user_role add value if not exists 'interior_designer';
alter type public.user_role add value if not exists 'service_provider';
alter type public.user_role add value if not exists 'material_supplier';
alter type public.user_role add value if not exists 'admin';
alter type public.user_role add value if not exists 'super_admin';

alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();
alter table public.profiles add column if not exists is_verified boolean not null default false;

alter table public.properties add column if not exists listing_purpose text not null default 'Sale';
alter table public.properties add column if not exists country text not null default 'India';
alter table public.properties add column if not exists state text;
alter table public.properties add column if not exists district text;
alter table public.properties add column if not exists locality text;
alter table public.properties add column if not exists landmark text;
alter table public.properties add column if not exists pincode text;
alter table public.properties add column if not exists total_price numeric;
alter table public.properties add column if not exists price_per_sq_yd numeric;
alter table public.properties add column if not exists negotiable boolean not null default false;
alter table public.properties add column if not exists maintenance_charges numeric;
alter table public.properties add column if not exists security_deposit numeric;
alter table public.properties add column if not exists plot_area numeric;
alter table public.properties add column if not exists built_up_area numeric;
alter table public.properties add column if not exists carpet_area numeric;
alter table public.properties add column if not exists total_floors integer;
alter table public.properties add column if not exists property_floor integer;
alter table public.properties add column if not exists furnishing text;
alter table public.properties add column if not exists property_age text;
alter table public.properties add column if not exists construction_status text;
alter table public.properties add column if not exists dtcp_approval boolean not null default false;
alter table public.properties add column if not exists hmda_approval boolean not null default false;
alter table public.properties add column if not exists municipality_approval boolean not null default false;
alter table public.properties add column if not exists panchayat_approval boolean not null default false;
alter table public.properties add column if not exists legal_verification boolean not null default false;
alter table public.properties add column if not exists bank_loan_available boolean not null default false;
alter table public.properties add column if not exists cover_image text;
alter table public.properties add column if not exists layout_plan text;
alter table public.properties add column if not exists master_plan text;
alter table public.properties add column if not exists virtual_tour_url text;
alter table public.properties add column if not exists canonical_url text;
alter table public.properties add column if not exists og_image text;
alter table public.properties add column if not exists image_alt_text text;
alter table public.properties add column if not exists publishing_status text not null default 'draft';
alter table public.properties add column if not exists deleted_at timestamptz;
alter table public.properties add column if not exists updated_at timestamptz not null default now();

alter table public.leads add column if not exists whatsapp text;
alter table public.leads add column if not exists lead_type text not null default 'General Contact';
alter table public.leads add column if not exists service_slug text;
alter table public.leads add column if not exists provider_slug text;
alter table public.leads add column if not exists material_slug text;
alter table public.leads add column if not exists city text;
alter table public.leads add column if not exists area text;
alter table public.leads add column if not exists budget text;
alter table public.leads add column if not exists preferred_date date;
alter table public.leads add column if not exists source_page text;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_medium text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists priority text not null default 'normal';
alter table public.leads add column if not exists follow_up_at timestamptz;
alter table public.leads add column if not exists consent boolean not null default false;
alter table public.leads add column if not exists metadata jsonb not null default '{}';
alter table public.leads add column if not exists updated_at timestamptz not null default now();

create table if not exists public.property_categories (
  id uuid primary key default uuid_generate_v4(), name text not null, slug text not null unique,
  description text, display_order integer not null default 0, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.approvals (
  id uuid primary key default uuid_generate_v4(), name text not null unique, slug text not null unique,
  issuing_authority text, is_active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(), developer_id uuid references public.developers(id),
  title text not null, slug text not null unique, category text, status text not null default 'ongoing', description text,
  city text, area text, address text, latitude numeric, longitude numeric, rera_number text,
  start_date date, possession_date date, cover_image text, gallery jsonb not null default '[]',
  seo_title text, meta_description text, is_featured boolean not null default false, is_verified boolean not null default false,
  is_active boolean not null default true, display_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.property_images (
  id uuid primary key default uuid_generate_v4(), property_id uuid not null references public.properties(id) on delete cascade,
  file_path text not null, alt_text text, image_source text, copyright_owner text, permission_status text,
  license_url text, photographer_credit text, usage_expiry date, display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.property_documents (
  id uuid primary key default uuid_generate_v4(), property_id uuid not null references public.properties(id) on delete cascade,
  document_type text not null, file_path text not null, is_public boolean not null default false,
  verification_status text not null default 'pending', created_at timestamptz not null default now()
);
create table if not exists public.project_images (
  id uuid primary key default uuid_generate_v4(), project_id uuid not null references public.projects(id) on delete cascade,
  file_path text not null, alt_text text, display_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.developer_contacts (
  id uuid primary key default uuid_generate_v4(), developer_id uuid not null references public.developers(id) on delete cascade,
  contact_name text, designation text, phone text, whatsapp text, email text, is_primary boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.property_owners (
  id uuid primary key default uuid_generate_v4(), profile_id uuid references public.profiles(id), name text not null,
  phone text not null, whatsapp text, email text, verification_status text not null default 'pending',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.sell_property_requests (
  id uuid primary key default uuid_generate_v4(), owner_id uuid references public.property_owners(id), name text not null,
  phone text not null, whatsapp text, email text, property_type text not null, listing_purpose text not null,
  location text not null, expected_price numeric, size text, approval_status text, photos jsonb not null default '[]',
  documents jsonb not null default '[]', description text, preferred_callback_time text, consent boolean not null default false,
  status text not null default 'new', notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.property_visits (
  id uuid primary key default uuid_generate_v4(), property_id uuid references public.properties(id), customer_id uuid references public.profiles(id),
  name text not null, phone text not null, visit_at timestamptz, status text not null default 'requested', notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.favorites (
  profile_id uuid not null references public.profiles(id) on delete cascade, property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(), primary key (profile_id, property_id)
);
create table if not exists public.property_comparisons (
  id uuid primary key default uuid_generate_v4(), profile_id uuid not null references public.profiles(id) on delete cascade,
  property_ids uuid[] not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  constraint comparison_limit check (cardinality(property_ids) <= 4)
);

create table if not exists public.service_categories (
  id uuid primary key default uuid_generate_v4(), family text not null, name text not null, slug text not null unique,
  description text, icon text, display_order integer not null default 0, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(), category_id uuid references public.service_categories(id),
  family text not null, title text not null, slug text not null unique, summary text, description text,
  starting_price numeric, price_label text, timeline text, features jsonb not null default '[]', deliverables jsonb not null default '[]',
  packages jsonb not null default '[]', service_locations text[] not null default '{}', faq jsonb not null default '[]',
  cover_image text, gallery jsonb not null default '[]', seo_title text, meta_description text,
  is_featured boolean not null default false, is_active boolean not null default true, display_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.construction_services (
  service_id uuid primary key references public.services(id) on delete cascade, price_per_sq_ft numeric,
  materials_included jsonb not null default '[]', materials_excluded jsonb not null default '[]', work_stages jsonb not null default '[]'
);
create table if not exists public.architecture_services (
  service_id uuid primary key references public.services(id) on delete cascade, deliverable_files text[] not null default '{}',
  revision_count integer not null default 1, architect_name text
);
create table if not exists public.interior_services (
  service_id uuid primary key references public.services(id) on delete cascade, materials jsonb not null default '[]',
  warranty text, before_after_gallery jsonb not null default '[]'
);
create table if not exists public.painting_services (
  service_id uuid primary key references public.services(id) on delete cascade, paint_brands text[] not null default '{}',
  interior_exterior text, approximate_rate numeric
);
create table if not exists public.renovation_services (
  service_id uuid primary key references public.services(id) on delete cascade, inspection_required boolean not null default true,
  before_after_gallery jsonb not null default '[]'
);
create table if not exists public.maintenance_services (
  service_id uuid primary key references public.services(id) on delete cascade, price_range text,
  same_day_available boolean not null default false, service_packages jsonb not null default '[]'
);
create table if not exists public.service_providers (
  id uuid primary key default uuid_generate_v4(), profile_id uuid references public.profiles(id), name text not null,
  slug text not null unique, company_name text, provider_type text not null, service_families text[] not null default '{}',
  experience integer not null default 0, city text, service_areas text[] not null default '{}', phone text, whatsapp text,
  email text, description text, skills text[] not null default '{}', completed_jobs integer not null default 0,
  starting_price numeric, rating numeric not null default 0, review_count integer not null default 0, availability text,
  working_hours jsonb not null default '{}', languages text[] not null default '{}', certifications jsonb not null default '[]',
  identity_verification text not null default 'pending', is_verified boolean not null default false,
  profile_image text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.provider_services (
  provider_id uuid not null references public.service_providers(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade, custom_price numeric,
  is_active boolean not null default true, primary key (provider_id, service_id)
);
create table if not exists public.provider_portfolio (
  id uuid primary key default uuid_generate_v4(), provider_id uuid not null references public.service_providers(id) on delete cascade,
  title text not null, description text, media jsonb not null default '[]', display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.service_bookings (
  id uuid primary key default uuid_generate_v4(), customer_id uuid references public.profiles(id),
  service_id uuid references public.services(id), provider_id uuid references public.service_providers(id),
  name text not null, phone text not null, whatsapp text, email text, location text not null,
  preferred_date date, budget text, message text, status text not null default 'new', consent boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.service_leads (
  id uuid primary key default uuid_generate_v4(), lead_id uuid references public.leads(id) on delete cascade,
  service_id uuid references public.services(id), provider_id uuid references public.service_providers(id),
  assigned_to uuid references public.profiles(id), quotation_status text, created_at timestamptz not null default now()
);

create table if not exists public.current_works (
  id uuid primary key default uuid_generate_v4(), title text not null, slug text not null unique, category text not null,
  location text not null, customer_name_visible boolean not null default false, start_date date, expected_completion date,
  completion_date date, status text not null default 'Ongoing', progress integer not null default 0 check (progress between 0 and 100),
  description text, cover_image text, related_service_id uuid references public.services(id),
  related_property_id uuid references public.properties(id), is_featured boolean not null default false,
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.work_media (
  id uuid primary key default uuid_generate_v4(), work_id uuid not null references public.current_works(id) on delete cascade,
  media_type text not null, file_path text not null, caption text, progress_stage text, display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.project_updates (
  id uuid primary key default uuid_generate_v4(), project_id uuid references public.projects(id), work_id uuid references public.current_works(id),
  title text not null, description text, progress integer, update_date date not null default current_date,
  media jsonb not null default '[]', created_at timestamptz not null default now()
);

create table if not exists public.material_categories (
  id uuid primary key default uuid_generate_v4(), name text not null, slug text not null unique, description text,
  display_order integer not null default 0, is_active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.material_suppliers (
  id uuid primary key default uuid_generate_v4(), profile_id uuid references public.profiles(id), name text not null,
  slug text not null unique, phone text, whatsapp text, email text, delivery_locations text[] not null default '{}',
  verification_status text not null default 'pending', is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.materials (
  id uuid primary key default uuid_generate_v4(), category_id uuid references public.material_categories(id),
  supplier_id uuid references public.material_suppliers(id), name text not null, slug text not null unique, brand text,
  description text, unit text not null, price numeric, minimum_order text, availability text,
  delivery_locations text[] not null default '{}', images jsonb not null default '[]', specifications jsonb not null default '[]',
  cover_image text, is_featured boolean not null default false, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.material_enquiries (
  id uuid primary key default uuid_generate_v4(), material_id uuid references public.materials(id),
  customer_id uuid references public.profiles(id), name text not null, phone text not null, email text,
  quantity text, delivery_location text, required_date date, message text, status text not null default 'new',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(), author_id uuid references public.profiles(id),
  entity_type text not null, entity_id uuid not null, rating integer not null check (rating between 1 and 5),
  title text, body text, status text not null default 'pending', created_at timestamptz not null default now()
);
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(), name text not null, role text, quote text not null, rating integer,
  image text, is_featured boolean not null default false, is_active boolean not null default true,
  display_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.faqs (
  id uuid primary key default uuid_generate_v4(), entity_type text not null, entity_id uuid,
  question text not null, answer text not null, display_order integer not null default 0,
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.districts (
  id uuid primary key default uuid_generate_v4(), city_id uuid references public.cities(id), name text not null,
  slug text not null, is_active boolean not null default true, unique (city_id, slug)
);
create table if not exists public.areas (
  id uuid primary key default uuid_generate_v4(), city_id uuid references public.cities(id), district_id uuid references public.districts(id),
  name text not null, slug text not null, is_active boolean not null default true, unique (city_id, slug)
);
create table if not exists public.localities (
  id uuid primary key default uuid_generate_v4(), area_id uuid references public.areas(id), name text not null,
  slug text not null, pincode text, is_active boolean not null default true, unique (area_id, slug)
);

create table if not exists public.cms_pages (
  id uuid primary key default uuid_generate_v4(), title text not null, slug text not null unique, template text,
  status text not null default 'draft', seo_title text, meta_description text, canonical_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.cms_sections (
  id uuid primary key default uuid_generate_v4(), page_id uuid not null references public.cms_pages(id) on delete cascade,
  block_type text not null, content jsonb not null default '{}', display_order integer not null default 0,
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.navigation_items (
  id uuid primary key default uuid_generate_v4(), label text not null, url text not null, parent_id uuid references public.navigation_items(id),
  location text not null default 'header', display_order integer not null default 0, is_active boolean not null default true
);
create table if not exists public.contact_settings (
  id uuid primary key default uuid_generate_v4(), phone text, whatsapp text, email text, address text,
  office_hours text, map_url text, social_links jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table if not exists public.calculator_settings (
  key text primary key, value jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(), profile_id uuid references public.profiles(id) on delete cascade,
  title text not null, body text, type text, read_at timestamptz, created_at timestamptz not null default now()
);

create index if not exists properties_search_idx on public.properties (city, property_type, listing_purpose, price) where deleted_at is null;
create index if not exists properties_publish_idx on public.properties (publishing_status, featured, verified);
create index if not exists leads_queue_idx on public.leads (lead_type, status, created_at desc);
create index if not exists services_family_idx on public.services (family, is_active, is_featured);
create index if not exists providers_city_idx on public.service_providers (city, is_verified, is_active);
create index if not exists current_works_status_idx on public.current_works (status, category, is_featured);
create index if not exists materials_category_idx on public.materials (category_id, is_active, is_featured);
create index if not exists sell_requests_status_idx on public.sell_property_requests (status, created_at desc);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

do $$
declare target text;
begin
  foreach target in array array[
    'profiles','properties','leads','projects','property_owners','sell_property_requests','property_visits',
    'property_comparisons','service_categories','services','service_providers','service_bookings','current_works',
    'materials','material_suppliers','material_enquiries','faqs','cms_pages','cms_sections','contact_settings','calculator_settings'
  ] loop
    execute format('drop trigger if exists touch_updated_at on public.%I', target);
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function public.touch_updated_at()', target);
  end loop;
end $$;

alter table public.property_categories enable row level security;
alter table public.projects enable row level security;
alter table public.property_images enable row level security;
alter table public.property_documents enable row level security;
alter table public.property_owners enable row level security;
alter table public.sell_property_requests enable row level security;
alter table public.property_visits enable row level security;
alter table public.favorites enable row level security;
alter table public.property_comparisons enable row level security;
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.service_providers enable row level security;
alter table public.provider_services enable row level security;
alter table public.provider_portfolio enable row level security;
alter table public.service_bookings enable row level security;
alter table public.service_leads enable row level security;
alter table public.current_works enable row level security;
alter table public.work_media enable row level security;
alter table public.project_updates enable row level security;
alter table public.material_categories enable row level security;
alter table public.material_suppliers enable row level security;
alter table public.materials enable row level security;
alter table public.material_enquiries enable row level security;
alter table public.reviews enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.navigation_items enable row level security;
alter table public.contact_settings enable row level security;
alter table public.calculator_settings enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role::text in ('administrator', 'admin', 'super_admin'));
$$;

create policy "Public reads active services" on public.services for select using (is_active = true and deleted_at is null);
create policy "Public reads service categories" on public.service_categories for select using (is_active = true);
create policy "Public reads verified providers" on public.service_providers for select using (is_active = true and is_verified = true);
create policy "Public reads current works" on public.current_works for select using (is_active = true);
create policy "Public reads active materials" on public.materials for select using (is_active = true and deleted_at is null);
create policy "Public reads material categories" on public.material_categories for select using (is_active = true);
create policy "Public reads projects" on public.projects for select using (is_active = true and deleted_at is null);
create policy "Public reads testimonials" on public.testimonials for select using (is_active = true);
create policy "Public reads FAQs" on public.faqs for select using (is_active = true);
create policy "Users manage favorites" on public.favorites for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "Users manage comparisons" on public.property_comparisons for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "Users read notifications" on public.notifications for select using (profile_id = auth.uid());
create policy "Owners create sale requests" on public.sell_property_requests for insert with check (true);
create policy "Customers create bookings" on public.service_bookings for insert with check (true);
create policy "Customers create material enquiries" on public.material_enquiries for insert with check (true);
create policy "Users insert own profile" on public.profiles for insert with check (id = auth.uid());
create policy "Users read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage properties" on public.properties for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage developers" on public.developers for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage cities" on public.cities for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage amenities" on public.amenities for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage property types" on public.property_types for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage media" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage SEO" on public.seo_entries for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins read audit logs" on public.audit_logs for select using (public.is_admin());
create policy "Admins manage settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());

do $$
declare target text;
begin
  foreach target in array array[
    'property_categories','projects','property_images','property_documents','property_owners','sell_property_requests',
    'property_visits','service_categories','services','service_providers','provider_services','provider_portfolio',
    'service_bookings','service_leads','current_works','work_media','project_updates','material_categories',
    'material_suppliers','materials','material_enquiries','reviews','testimonials','faqs','cms_pages','cms_sections',
    'navigation_items','contact_settings','calculator_settings','notifications'
  ] loop
    execute format('create policy "Admins manage %s" on public.%I for all using (public.is_admin()) with check (public.is_admin())', target, target);
  end loop;
end $$;
