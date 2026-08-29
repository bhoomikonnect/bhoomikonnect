# Directus CMS integration

BhoomiKonnect uses Directus as the preferred CMS when these server environment variables are configured:

```env
DIRECTUS_URL=https://your-directus-instance.example.com
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.example.com
DIRECTUS_STATIC_TOKEN=your-static-token
DIRECTUS_CACHE_SECONDS=60
```

Connect Directus to the PostgreSQL database prepared by `supabase/schema.sql` and the migrations in `supabase/migrations`.

The static token needs read access to published marketplace collections, create/update access to `leads`, CRUD access for admin-managed content, and delete access to `cms_sections`. Keep `DIRECTUS_STATIC_TOKEN` server-only and never expose it with a `NEXT_PUBLIC_` prefix.

Core collections used by the application include `properties`, `developers`, `cities`, `services`, `service_providers`, `materials`, `current_works`, `testimonials`, `leads`, `cms_pages`, and `cms_sections`.

Lead submissions are validated by `/api/leads`, stored in Directus first, and then sent through the configured email/SMS notification providers. Notification delivery state is written back into the lead's `metadata.notification_delivery` field.
