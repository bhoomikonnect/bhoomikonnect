# BhoomiKonnect Production Checklist

The repository contains no default administrator or committed secrets. Production admin access uses Supabase Auth and database roles only.

## 1. Supabase

1. Create the production Supabase project.
2. Run `supabase/schema.sql`.
3. Apply every file in `supabase/migrations` in filename order.
4. Create the first administrator through Supabase Auth.
5. Promote the profile. This also creates it if the Auth user was added before the profile trigger:

```sql
insert into public.profiles (id, full_name, role)
select id, 'BhoomiKonnect Administrator', 'admin'::public.user_role
from auth.users
where email = 'your-admin@your-domain.com'
on conflict (id) do update set role = excluded.role;
```

6. Configure the OAuth callback:

```text
https://your-domain.com/auth/callback
```

7. Copy the server-only Supabase secret key into `SUPABASE_SERVICE_ROLE_KEY`. Never use it in a `NEXT_PUBLIC_` variable.

## 2. Included CMS

The protected BhoomiKonnect admin uses Supabase PostgreSQL directly for properties, pages, and leads. No separate CMS subscription is required.

Directus remains an optional override. When used, connect it to PostgreSQL and follow `directus/README.md`. Configure `DIRECTUS_URL` and `DIRECTUS_STATIC_TOKEN` together, and never expose the token with a `NEXT_PUBLIC_` prefix.

## 3. Resend Email

1. Add and verify the sending domain in Resend.
2. Create a restricted production API key.
3. Use a sender address on the verified domain.
4. Configure one or more administrator recipients.

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=BhoomiKonnect <leads@your-domain.com>
LEAD_NOTIFICATION_EMAILS=admin@your-domain.com,sales@your-domain.com
SEND_CUSTOMER_CONFIRMATION_EMAIL=true
```

## 4. Optional Twilio SMS

Automated carrier SMS is optional and normally paid. Omit every Twilio variable for the free email-and-WhatsApp launch mode. When enabled, use E.164 numbers and configure either a sender number or a Messaging Service SID.

```bash
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=+10000000000
TWILIO_MESSAGING_SERVICE_SID=
LEAD_SMS_TO=+919876543210
SEND_CUSTOMER_CONFIRMATION_SMS=false
```

Confirm sender registration, templates, and local messaging regulations with the provider before enabling customer SMS.

## 5. Vercel Environment

Add these as production environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_PRIMARY_PHONE=+919876543210
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
ADMIN_EMAIL=your-admin@your-domain.com
RESEND_API_KEY=
RESEND_FROM_EMAIL=
LEAD_NOTIFICATION_EMAILS=
SEND_CUSTOMER_CONFIRMATION_EMAIL=true

# Optional Directus override
DIRECTUS_URL=
DIRECTUS_STATIC_TOKEN=
DIRECTUS_CACHE_SECONDS=60

# Optional paid SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
TWILIO_MESSAGING_SERVICE_SID=
LEAD_SMS_TO=
SEND_CUSTOMER_CONFIRMATION_SMS=false
```

Production Vercel builds enforce the environment gate automatically. Verify locally with:

```bash
pnpm check:production
```

## 6. Release Verification

1. Run `pnpm typecheck`, `pnpm lint`, and `pnpm build`.
2. Sign in through `/login`; confirm a non-admin cannot open `/admin`.
3. Submit one enquiry from each form family.
4. Confirm records in `/admin/leads`.
5. Confirm admin and customer email show `sent`.
6. If Twilio is enabled, confirm the applicable SMS delivery states.
7. Test property/page publish, edit, preview, and archive.
8. Verify `/robots.txt`, `/sitemap.xml`, canonical metadata, and JSON-LD.
9. Run Lighthouse against the deployed domain.
10. Rotate any key used during setup if it was shared outside the deployment secret manager.
