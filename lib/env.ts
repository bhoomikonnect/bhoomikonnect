import { z } from "zod";

const optionalUrl = z.preprocess((value) => value || undefined, z.string().url().optional());
const optionalString = z.preprocess((value) => value || undefined, z.string().min(1).optional());

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: optionalString,
  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalString,
  NEXT_PUBLIC_PRIMARY_PHONE: optionalString,
  NEXT_PUBLIC_CONTACT_EMAIL: z.preprocess((value) => value || undefined, z.string().email().optional()),
  NEXT_PUBLIC_OFFICE_ADDRESS: optionalString,
  NEXT_PUBLIC_LINKEDIN_URL: optionalUrl,
  NEXT_PUBLIC_INSTAGRAM_URL: optionalUrl,
  NEXT_PUBLIC_FACEBOOK_URL: optionalUrl,
  RESEND_API_KEY: optionalString,
  RESEND_FROM_EMAIL: optionalString,
  LEAD_NOTIFICATION_EMAILS: optionalString,
  SEND_CUSTOMER_CONFIRMATION_EMAIL: optionalString,
  TWILIO_ACCOUNT_SID: optionalString,
  TWILIO_AUTH_TOKEN: optionalString,
  TWILIO_FROM_NUMBER: optionalString,
  TWILIO_MESSAGING_SERVICE_SID: optionalString,
  LEAD_SMS_TO: optionalString,
  SEND_CUSTOMER_CONFIRMATION_SMS: optionalString,
  ADMIN_EMAIL: z.preprocess((value) => value || undefined, z.string().email().optional()),
  DIRECTUS_URL: optionalUrl,
  NEXT_PUBLIC_DIRECTUS_URL: optionalUrl,
  DIRECTUS_STATIC_TOKEN: optionalString,
  DIRECTUS_CACHE_SECONDS: z.preprocess((value) => value || "60", z.coerce.number().int().min(0).max(86400))
});

export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`);
  }

  return parsed.data;
}

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bhoomikonnect.com",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  phone: process.env.NEXT_PUBLIC_PRIMARY_PHONE || ""
};

export const publicContactLinks = {
  phone: publicEnv.phone ? `tel:${publicEnv.phone.replace(/[^\d+]/g, "")}` : "/contact",
  whatsapp: publicEnv.whatsapp ? `https://wa.me/${publicEnv.whatsapp.replace(/\D/g, "")}` : "/contact"
};

export function whatsappContactLink(message: string) {
  if (!publicEnv.whatsapp) return `/contact?message=${encodeURIComponent(message)}`;
  return `${publicContactLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
