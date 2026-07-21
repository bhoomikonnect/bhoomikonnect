# Directus CMS Integration

BhoomiKonnect is now wired to read marketplace content from Directus when these environment variables are present:

```bash
DIRECTUS_URL=https://your-directus-instance.example.com
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.example.com
DIRECTUS_STATIC_TOKEN=your-static-token
DIRECTUS_CACHE_SECONDS=60
```

If Directus is not configured or temporarily unavailable, the app falls back to typed local demo data in `lib/data.ts` and `lib/catalog.ts`.

## Recommended Architecture

```txt
Next.js frontend
  -> server-side Directus REST reads
  -> /api/leads route for lead creation
Directus CMS
  -> connected to the Supabase Postgres database
Supabase
  -> Postgres, Auth, Storage, RLS
```

## Collections

Run `supabase/schema.sql`, then the migration in `supabase/migrations`, before connecting Directus to the same Postgres database. Directus should expose these launch collections:

- `properties`
- `developers`
- `cities`
- `amenities`
- `property_types`
- `media_assets`
- `seo_entries`
- `leads`
- `projects`
- `property_categories`
- `sell_property_requests`
- `property_visits`
- `service_categories`
- `services`
- `construction_services`
- `architecture_services`
- `interior_services`
- `painting_services`
- `renovation_services`
- `maintenance_services`
- `service_providers`
- `provider_services`
- `provider_portfolio`
- `service_bookings`
- `current_works`
- `work_media`
- `materials`
- `material_categories`
- `material_suppliers`
- `material_enquiries`
- `testimonials`
- `faqs`
- `cms_pages`
- `cms_sections`
- `navigation_items`
- `contact_settings`
- `calculator_settings`
- `audit_logs`
- `settings`

## Token Permissions

Create a Directus static token with:

- Read access for active `properties`, `developers`, `cities`, `amenities`, `property_types`, and `media_assets`
- Create access for `leads`
- Admin/editor CRUD for company-managed marketplace collections
- Delete permission for `cms_sections` so page-section replacements can be applied; archive primary content instead of deleting it

Keep `DIRECTUS_STATIC_TOKEN` server-only. Do not prefix it with `NEXT_PUBLIC_`.

## Field Mapping

The app accepts the snake_case fields from `supabase/schema.sql`, including:

- `property_type`, `project_name`, `property_status`, `sale_rent`
- `price_per_sq_ft`, `booking_amount`, `road_width`
- `rera_number`, `possession_date`
- `seo_title`, `meta_description`
- `developer_id` relation or `developer_slug`
- `gallery` as Directus file IDs, URLs, or local paths
- `nearby` as JSON array objects: `{ "label": "...", "distance": "...", "type": "School" }`

Service fields use `family`, `starting_price`, `price_label`, `features`, `deliverables`, `packages`, `service_locations`, `faq`, `cover_image`, `is_featured`, and `is_active`.

Provider, materials, and current-work pages accept the snake_case columns from the migration. Lead submissions are sent to `/api/leads`, validated with Zod, rate-limited, and then written to Directus `leads`.

## Recommended Directus roles

- `Content Editor`: properties, projects, developers, services, works, materials, CMS pages, media, FAQs, and testimonials.
- `Lead Manager`: leads, property requests, visits, bookings, and material enquiries; no schema or settings access.
- `Administrator`: schema, roles, workflows, audit, and all operational collections.
- `Public API`: no Directus login; only server-side token reads of active records and lead creation.

Use Directus flows for lead assignment, status notifications, stale follow-up reminders, property publication approval, and provider verification. Keep the static token server-only and rotate it if exposed.
