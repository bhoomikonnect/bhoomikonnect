# BhoomiKonnect

**From Land to Dream Home — Everything Under One Roof**

BhoomiKonnect is a company-managed property, construction, interiors, renovation, maintenance, and materials marketplace. It uses Next.js App Router, TypeScript, Tailwind CSS, shadcn-style primitives, Framer Motion, Supabase Auth/Postgres/Storage, and Directus as the operations CMS.

The repository includes original demo content only. No blog module is included by product choice.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
```

## Environment

Create `.env.local` when connecting Directus, Supabase, or Google Maps:

```bash
NEXT_PUBLIC_SITE_URL=https://bhoomikonnect.com
NEXT_PUBLIC_PRIMARY_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
DIRECTUS_URL=
NEXT_PUBLIC_DIRECTUS_URL=
DIRECTUS_STATIC_TOKEN=
DIRECTUS_CACHE_SECONDS=60
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `DIRECTUS_STATIC_TOKEN`, or `RESEND_API_KEY` to browser code. The current app does not import them from client components.

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local` and enter your project values.
3. Run `supabase/schema.sql` in a new Supabase project.
4. Apply the SQL files in `supabase/migrations` in filename order.
5. Optionally apply `supabase/seed.sql` for original demo records.
6. Connect Directus to the same PostgreSQL database and configure the collections in `directus/README.md`.
7. Run `pnpm dev`.

Without Directus, public pages use typed local demo data. Without Supabase, public browsing and CMS-fallback content still work, while authentication explains that environment setup is required.

## CMS

Directus is integrated as the CMS layer. Public pages read from Directus on the server when configured, while lead submissions go through `app/api/leads/route.ts`. Directus manages content and operations; Supabase remains the source for authentication, PostgreSQL, storage, and RLS.

## Main routes

- Properties: `/buy`, `/rent`, `/sell-property`, `/property/[slug]`, `/properties/[category]`, `/properties/[city]/[type]`
- Services: `/construction`, `/architecture`, `/interiors`, `/painting`, `/renovation`, `/maintenance`
- Supply and delivery: `/materials`, `/current-works`, `/service-providers`
- Tools: `/calculators`, `/compare`
- Protected workspaces: `/dashboard`, `/admin`

## Authentication and roles

Supabase cookie sessions protect dashboard and admin routes through `middleware.ts`. Email/password and Google OAuth are wired. The role model supports customer, buyer, property owner, developer, contractor, architect, interior designer, service provider, material supplier, admin, and super admin.

Set `ADMIN_EMAIL` for the first administrator. After the profile exists, prefer the `admin` or `super_admin` database role.

For a real administrator login:

1. Configure the Supabase URL and anonymous key in `.env.local`.
2. Create the user through `/register` or the Supabase Authentication dashboard.
3. Set `ADMIN_EMAIL` to that user's email, then restart Next.js.
4. Promote the profile permanently in the Supabase SQL editor. This also creates it if the Auth user was added before the profile trigger:

```sql
insert into public.profiles (id, full_name, role)
select id, 'BhoomiKonnect Administrator', 'admin'::public.user_role
from auth.users
where email = 'your-admin@example.com'
on conflict (id) do update set role = excluded.role;
```

Directus administrator credentials are created when the Directus instance is initialized and are never stored in this repository. Admin and dashboard routes require a valid Supabase session. Administrator access requires the `admin` or `super_admin` profile role, with `ADMIN_EMAIL` available only for first-administrator bootstrap.

## Admin content workflow

The protected admin now includes operational property and page management:

- `/admin/properties`: search, edit, preview, publish, and archive every property. Demo listings can be saved as local overrides.
- `/admin/properties/new`: multi-section property editor covering basic, location, pricing, specifications, legal, media, SEO, and publishing fields.
- `/admin/pages`: manage reusable CMS pages and their publishing state.
- `/admin/pages/new`: page builder with Hero, Text, Image, CTA, Statistics, FAQ, Gallery, and Contact sections.
- `/admin/leads`: persistent inbox for every enquiry form, including admin/customer email and SMS delivery status.
- `/pages/[slug]`: SEO-rendered public route for published CMS pages.

When Directus is configured, the admin repositories use Directus collections. Without Directus, development writes persist to `data/local-cms.json`; local filesystem writes are deliberately blocked in production. Published local properties are merged into marketplace search and detail routes immediately.

## Lead email and SMS

Property enquiries, site visits, sell-property requests, construction quotes, architecture enquiries, interior enquiries, painting enquiries, renovation enquiries, maintenance bookings, provider requests, material quotations, calculator requests, and contact forms all submit to `/api/leads`.

Configure notifications in `.env.local` or the deployment environment:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=BhoomiKonnect <leads@your-domain.com>
LEAD_NOTIFICATION_EMAILS=admin@your-domain.com,sales@your-domain.com
SEND_CUSTOMER_CONFIRMATION_EMAIL=true

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=+10000000000
# Use this instead of TWILIO_FROM_NUMBER when applicable:
TWILIO_MESSAGING_SERVICE_SID=
LEAD_SMS_TO=+919000000000,+919111111111
SEND_CUSTOMER_CONFIRMATION_SMS=false
```

Recipient numbers must use E.164 format. Admin notifications are sent to every configured email and phone recipient. Customer email confirmation is enabled by default when an address is supplied; customer SMS confirmation is opt-in and requires the submitted number to begin with `+`. A lead is stored before notification delivery begins, and delivery failures remain visible in `/admin/leads`.

## Forms and leads

React Hook Form and Zod power property submissions and quote forms. Every lead carries its type, source page, related entity, consent, and optional business metadata. The API includes a honeypot and lightweight per-instance rate limiting; production should add a durable edge rate limiter and CAPTCHA.

## Deployment

Vercel is the recommended deployment target. Add the environment variables to the Vercel project, set the production site URL, allow the Directus asset host in `next.config.mjs`, and configure the Supabase OAuth callback as `https://your-domain/auth/callback`.

Before launch, replace demo contact details, add legally reviewed policies, connect durable anti-spam/rate limiting, configure storage buckets, verify RLS in staging, and run Lighthouse against production assets.

## Production gate

`pnpm build` automatically validates required production configuration on Vercel and CI. Local builds skip the gate; run `pnpm check:production` to enforce it locally. The check requires real HTTPS URLs, Supabase authentication, Directus CMS access, Resend email delivery, Twilio SMS delivery, administrator recipients, and public contact details. It rejects placeholder domains and phone numbers and never prints secret values.

No development administrator, default password, password hint, local-session bypass, or public admin preview route is included. Production secrets belong only in the Vercel environment and must not be committed.

Follow the complete release sequence in `PRODUCTION.md`.
