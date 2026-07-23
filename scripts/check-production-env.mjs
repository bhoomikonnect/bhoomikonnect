const forced = process.argv.includes("--force");
const deploymentBuild = forced || process.env.VERCEL_ENV === "production" || process.env.CHECK_PRODUCTION_ENV === "true";

if (!deploymentBuild) {
  console.log("Production environment check skipped for local build. Run pnpm check:production to enforce it locally.");
  process.exit(0);
}

const errors = [];

if (process.env.ENABLE_DEMO_CONTENT === "true") {
  errors.push("ENABLE_DEMO_CONTENT must not be enabled for a production deployment");
}
const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_PRIMARY_PHONE",
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAIL",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "LEAD_NOTIFICATION_EMAILS"
];

const placeholderPattern = /example\.com|your-|your_|replace|changeme|00000 00000|9000000000/i;

for (const name of required) {
  const value = process.env[name]?.trim();
  if (!value) errors.push(`${name} is missing`);
  else if (placeholderPattern.test(value)) errors.push(`${name} still contains a placeholder value`);
}

const directusConfigured = Boolean(process.env.DIRECTUS_URL || process.env.DIRECTUS_STATIC_TOKEN);
if (directusConfigured && (!process.env.DIRECTUS_URL || !process.env.DIRECTUS_STATIC_TOKEN)) {
  errors.push("DIRECTUS_URL and DIRECTUS_STATIC_TOKEN must be configured together");
}

const twilioNames = [
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_FROM_NUMBER",
  "TWILIO_MESSAGING_SERVICE_SID",
  "LEAD_SMS_TO"
];
const twilioConfigured = twilioNames.some((name) => Boolean(process.env[name]));
if (twilioConfigured) {
  for (const name of ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "LEAD_SMS_TO"]) {
    if (!process.env[name]) errors.push(`${name} is required when Twilio SMS is enabled`);
  }
  if (!process.env.TWILIO_FROM_NUMBER && !process.env.TWILIO_MESSAGING_SERVICE_SID) {
    errors.push("Set either TWILIO_FROM_NUMBER or TWILIO_MESSAGING_SERVICE_SID when Twilio SMS is enabled");
  }
}

for (const name of ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_SUPABASE_URL", ...(process.env.DIRECTUS_URL ? ["DIRECTUS_URL"] : [])]) {
  const value = process.env[name];
  if (value) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") errors.push(`${name} must use HTTPS`);
      if (["localhost", "127.0.0.1"].includes(url.hostname)) errors.push(`${name} cannot use localhost`);
    } catch {
      errors.push(`${name} must be a valid URL`);
    }
  }
}

const emailValues = [process.env.ADMIN_EMAIL, ...(process.env.LEAD_NOTIFICATION_EMAILS || "").split(",")].filter(Boolean);
if (emailValues.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
  errors.push("ADMIN_EMAIL and LEAD_NOTIFICATION_EMAILS must contain valid email addresses");
}

const smsRecipients = (process.env.LEAD_SMS_TO || "").split(",").map((phone) => phone.trim()).filter(Boolean);
if (smsRecipients.some((phone) => !/^\+[1-9]\d{7,14}$/.test(phone))) {
  errors.push("LEAD_SMS_TO numbers must use E.164 format, for example +919876543210");
}

if (!directusConfigured) {
  console.log("Directus is not configured; using the included Supabase CMS repository.");
}
if (!twilioConfigured) {
  console.log("Twilio is not configured; SMS delivery is disabled and email/WhatsApp remain active.");
}

if (errors.length) {
  console.error("\nBhoomiKonnect production configuration is incomplete:\n");
  errors.forEach((error) => console.error(`- ${error}`));
  console.error("\nAdd the missing values to the deployment environment. Secret values were not printed.\n");
  process.exit(1);
}

console.log("Production environment check passed.");
