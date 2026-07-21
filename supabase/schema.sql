create extension if not exists "uuid-ossp";

create type user_role as enum ('guest', 'customer', 'buyer', 'property_owner', 'developer', 'contractor', 'architect', 'interior_designer', 'service_provider', 'material_supplier', 'administrator', 'admin', 'super_admin');
create type lead_status as enum ('new', 'contacted', 'site_visit', 'negotiation', 'closed', 'lost');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role user_role not null default 'buyer',
  created_at timestamptz not null default now()
);

create table public.developers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  profile text not null,
  logo_initials text,
  logo_url text,
  website text,
  phone text,
  email text,
  completed_projects integer not null default 0,
  ongoing_projects integer not null default 0,
  upcoming_projects integer not null default 0,
  rating numeric not null default 4.5,
  reviews integer not null default 0,
  established text,
  headquarters text,
  specialties text[] default '{}',
  linkedin text,
  instagram text,
  youtube text,
  verified boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  property_type text not null,
  category text not null,
  developer_id uuid not null references public.developers(id),
  developer_slug text,
  project_name text not null,
  property_status text not null,
  sale_rent text not null default 'Sale',
  price numeric not null,
  price_per_sq_ft numeric,
  booking_amount numeric,
  area numeric not null,
  area_unit text not null default 'sq.ft',
  city text,
  area_name text,
  address text,
  facing text,
  bedrooms integer,
  bathrooms integer,
  balconies integer,
  parking text,
  road_width text,
  approvals text[] default '{}',
  rera_number text,
  possession_date date,
  amenities text[] default '{}',
  description text not null,
  location text,
  latitude numeric,
  longitude numeric,
  gallery text[] default '{}',
  floor_plans text[] default '{}',
  video_url text,
  brochure_url text,
  nearby jsonb default '[]',
  seo_title text,
  meta_description text,
  keywords text[] default '{}',
  featured boolean not null default false,
  verified boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id),
  developer_id uuid references public.developers(id),
  property_slug text,
  developer_slug text,
  buyer_name text not null,
  phone text not null,
  email text,
  source text not null,
  status lead_status not null default 'new',
  notes text,
  created_at timestamptz not null default now()
);

create table public.cities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  state text not null,
  active boolean not null default true,
  micro_markets text[] default '{}',
  seo_title text,
  meta_description text,
  keywords text[] default '{}',
  created_at timestamptz not null default now()
);

create table public.amenities (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  icon text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.property_types (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id),
  developer_id uuid references public.developers(id),
  storage_path text not null,
  alt_text text,
  media_type text not null,
  created_at timestamptz not null default now()
);

create table public.seo_entries (
  id uuid primary key default uuid_generate_v4(),
  path text not null unique,
  title text not null,
  description text not null,
  canonical_url text,
  no_index boolean not null default false,
  structured_data jsonb,
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.developers enable row level security;
alter table public.properties enable row level security;
alter table public.leads enable row level security;
alter table public.cities enable row level security;
alter table public.amenities enable row level security;
alter table public.property_types enable row level security;
alter table public.media_assets enable row level security;
alter table public.seo_entries enable row level security;
alter table public.audit_logs enable row level security;
alter table public.settings enable row level security;

create policy "Published properties are public"
  on public.properties for select
  using (active = true and verified = true);

create policy "Published developers are public"
  on public.developers for select
  using (active = true);

create policy "Active cities are public"
  on public.cities for select
  using (active = true);

create policy "Active amenities are public"
  on public.amenities for select
  using (active = true);

create policy "Active property types are public"
  on public.property_types for select
  using (active = true);

create policy "Buyers can create leads"
  on public.leads for insert
  with check (true);

-- Continue with supabase/migrations/202607140001_marketplace_cms.sql for the
-- complete services, providers, materials, works, CMS, dashboard, indexes,
-- storage metadata, and role-based policy expansion.
