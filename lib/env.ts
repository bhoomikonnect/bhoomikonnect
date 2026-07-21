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
  RESEND_API_KEY: optionalString,
  ADMIN_EMAIL: z.preprocess((value) => value || undefined, z.string().email().optional()),
  LOCAL_ADMIN_EMAIL: z.preprocess((value) => value || undefined, z.string().email().optional()),
  LOCAL_ADMIN_PASSWORD: optionalString,
  LOCAL_ADMIN_SESSION_SECRET: optionalString,
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
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919000000000",
  phone: process.env.NEXT_PUBLIC_PRIMARY_PHONE || "+91 90000 00000"
};
