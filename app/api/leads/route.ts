import { NextResponse } from "next/server";
import { createLead, updateLeadDelivery } from "@/lib/marketplace";
import { leadSchema } from "@/lib/validations";
import { sendLeadNotifications } from "@/lib/notifications";

const requests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requests.get(key);
  if (!current || current.resetAt < now) {
    requests.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (isRateLimited(forwardedFor)) {
      return NextResponse.json({ ok: false, message: "Too many requests. Please wait a minute and try again." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the enquiry form fields.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const leadPayload = Object.fromEntries(
      Object.entries(parsed.data).filter(([key]) => key !== "website")
    ) as Omit<typeof parsed.data, "website">;
    const lead = await createLead(leadPayload);
    const delivery = await sendLeadNotifications(leadPayload, lead.id);
    await updateLeadDelivery(lead.id, delivery);
    delivery.errors.forEach((error) => console.error(`Lead notification: ${error}`));

    return NextResponse.json({
      ok: true,
      reference: lead.id
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "Unable to submit the enquiry right now."
      },
      { status: 500 }
    );
  }
}
