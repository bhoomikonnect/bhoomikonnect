import "server-only";
import type { LeadDeliveryStatus, LeadPayload } from "@/types/leads";

type DeliveryResult = { state: "sent" | "skipped" | "failed"; error?: string };

function recipients(value?: string) {
  return (value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

function leadRows(lead: LeadPayload) {
  const related = lead.propertySlug || lead.developerSlug || lead.serviceSlug || lead.providerSlug || lead.materialSlug || "Not linked";
  const rows: Array<[string, string]> = [
    ["Lead type", lead.leadType || "General Contact"], ["Name", lead.name], ["Phone", lead.phone],
    ["WhatsApp", lead.whatsapp || "Not provided"], ["Email", lead.email || "Not provided"],
    ["City / location", lead.city || "Not provided"], ["Budget", lead.budget || "Not provided"],
    ["Preferred date", lead.preferredDate || "Not provided"], ["Related item", related],
    ["Source", lead.source], ["Source page", lead.sourcePage || "Not provided"], ["Message", lead.message || "Not provided"]
  ];
  Object.entries(lead.metadata || {}).forEach(([key, value]) => rows.push([key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()), String(value ?? "")]));
  return rows;
}

async function sendResendEmail(input: { to: string[]; subject: string; text: string; html: string; replyTo?: string; idempotencyKey: string }): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !input.to.length) return { state: "skipped" };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": input.idempotencyKey },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "BhoomiKonnect <onboarding@resend.dev>",
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html
      })
    });
    if (!response.ok) throw new Error(`Resend ${response.status}: ${(await response.text()).slice(0, 240)}`);
    return { state: "sent" };
  } catch (error) {
    return { state: "failed", error: error instanceof Error ? error.message : "Email delivery failed" };
  }
}

async function sendTwilioSms(to: string, body: string): Promise<DeliveryResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!accountSid || !authToken || !to || (!from && !messagingServiceSid)) return { state: "skipped" };
  try {
    const form = new URLSearchParams({ To: to, Body: body });
    if (messagingServiceSid) form.set("MessagingServiceSid", messagingServiceSid);
    else form.set("From", from || "");
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form
    });
    if (!response.ok) throw new Error(`Twilio ${response.status}: ${(await response.text()).slice(0, 240)}`);
    return { state: "sent" };
  } catch (error) {
    return { state: "failed", error: error instanceof Error ? error.message : "SMS delivery failed" };
  }
}

export function notificationConfiguration() {
  const adminEmails = recipients(process.env.LEAD_NOTIFICATION_EMAILS || process.env.ADMIN_EMAIL);
  const adminPhones = recipients(process.env.LEAD_SMS_TO);
  return {
    emailConfigured: Boolean(process.env.RESEND_API_KEY && adminEmails.length),
    smsConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && (process.env.TWILIO_FROM_NUMBER || process.env.TWILIO_MESSAGING_SERVICE_SID) && adminPhones.length),
    adminEmailCount: adminEmails.length,
    adminSmsCount: adminPhones.length
  };
}

export async function sendLeadNotifications(lead: LeadPayload, leadId: string): Promise<LeadDeliveryStatus> {
  const rows = leadRows(lead);
  const subject = `New ${lead.leadType || "marketplace"} lead: ${lead.name}`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#102a2e"><h1 style="font-size:24px">${escapeHtml(subject)}</h1><p>A new BhoomiKonnect enquiry requires follow-up.</p><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="padding:10px;border:1px solid #d8e3df;text-align:left;background:#f7faf8;width:34%">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #d8e3df">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="margin-top:20px;color:#5c6f73">Lead ID: ${escapeHtml(leadId)}</p></div>`;
  const adminEmails = recipients(process.env.LEAD_NOTIFICATION_EMAILS || process.env.ADMIN_EMAIL);
  const adminPhones = recipients(process.env.LEAD_SMS_TO);
  const adminSmsBody = `BhoomiKonnect ${lead.leadType || "lead"}: ${lead.name}, ${lead.phone}${lead.city ? `, ${lead.city}` : ""}. Source: ${lead.source}.`;

  const adminEmailPromise = sendResendEmail({ to: adminEmails, subject, text, html, replyTo: lead.email || undefined, idempotencyKey: `lead-${leadId}-admin` });
  const customerEmailPromise = lead.email && process.env.SEND_CUSTOMER_CONFIRMATION_EMAIL !== "false"
    ? sendResendEmail({
        to: [lead.email], subject: "We received your BhoomiKonnect request",
        text: `Hello ${lead.name},\n\nWe received your ${lead.leadType || "enquiry"}. Our team will contact you shortly.\n\nReference: ${leadId}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#102a2e"><h1>Request received</h1><p>Hello ${escapeHtml(lead.name)},</p><p>We received your ${escapeHtml(lead.leadType || "enquiry")}. Our team will contact you shortly.</p><p>Reference: <strong>${escapeHtml(leadId)}</strong></p></div>`,
        idempotencyKey: `lead-${leadId}-customer`
      })
    : Promise.resolve<DeliveryResult>({ state: "skipped" });
  const adminSmsPromise = adminPhones.length
    ? Promise.all(adminPhones.map((phone) => sendTwilioSms(phone, adminSmsBody))).then((results) => results.some((result) => result.state === "failed") ? { state: "failed" as const, error: results.find((result) => result.error)?.error } : results.some((result) => result.state === "sent") ? { state: "sent" as const } : { state: "skipped" as const })
    : Promise.resolve<DeliveryResult>({ state: "skipped" });
  const customerSmsPromise = process.env.SEND_CUSTOMER_CONFIRMATION_SMS === "true" && lead.phone.startsWith("+")
    ? sendTwilioSms(lead.phone, `BhoomiKonnect received your ${lead.leadType || "request"}. We will contact you shortly. Ref: ${leadId}`)
    : Promise.resolve<DeliveryResult>({ state: "skipped" });

  const [adminEmail, customerEmail, adminSms, customerSms] = await Promise.all([adminEmailPromise, customerEmailPromise, adminSmsPromise, customerSmsPromise]);
  return {
    adminEmail: adminEmail.state, customerEmail: customerEmail.state, adminSms: adminSms.state, customerSms: customerSms.state,
    errors: [adminEmail.error, customerEmail.error, adminSms.error, customerSms.error].filter((error): error is string => Boolean(error))
  };
}
