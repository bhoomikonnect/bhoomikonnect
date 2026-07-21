type LeadEmail = { name: string; phone: string; email?: string; leadType?: string; source: string; message?: string };

export async function notifyAdminOfLead(lead: LeadEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "BhoomiKonnect <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New ${lead.leadType || "marketplace"} lead from ${lead.name}`,
      text: `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || "Not provided"}\nSource: ${lead.source}\nMessage: ${lead.message || "Not provided"}`
    })
  });
  if (!response.ok) throw new Error(`Resend notification failed: ${response.status}`);
}
