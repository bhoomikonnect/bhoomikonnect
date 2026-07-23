-- Create profiles for every Auth user without trusting privileged role metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data ->> 'role', 'customer');
  safe_role public.user_role;
begin
  safe_role := case
    when requested_role in (
      'customer',
      'buyer',
      'property_owner',
      'developer',
      'contractor',
      'architect',
      'interior_designer',
      'service_provider',
      'material_supplier'
    ) then requested_role::public.user_role
    else 'customer'::public.user_role
  end;

  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(split_part(new.email, '@', 1), ''),
      'BhoomiKonnect user'
    ),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    safe_role
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for Auth users created before this trigger existed.
insert into public.profiles (id, full_name, role)
select
  users.id,
  coalesce(
    nullif(users.raw_user_meta_data ->> 'full_name', ''),
    nullif(split_part(users.email, '@', 1), ''),
    'BhoomiKonnect user'
  ),
  'customer'::public.user_role
from auth.users as users
on conflict (id) do nothing;

-- A normal user may choose a marketplace account type, but cannot self-promote.
drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
  on public.profiles
  for insert
  with check (
    id = auth.uid()
    and role::text not in ('administrator', 'admin', 'super_admin')
  );

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles
  for update
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role::text not in ('administrator', 'admin', 'super_admin')
  );
