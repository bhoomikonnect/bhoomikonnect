import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const credentialsSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128)
});

function matches(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(valueHash, expectedHash);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const email = process.env.LOCAL_ADMIN_EMAIL;
  const password = process.env.LOCAL_ADMIN_PASSWORD;
  const sessionSecret = process.env.LOCAL_ADMIN_SESSION_SECRET;

  if (!email || !password || !sessionSecret) {
    return NextResponse.json({ error: "Local CMS access is not configured." }, { status: 503 });
  }

  const body = credentialsSchema.safeParse(await request.json().catch(() => null));
  if (!body.success || !matches(body.data.email.toLowerCase(), email.toLowerCase()) || !matches(body.data.password, password)) {
    return NextResponse.json({ error: "Invalid administrator email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, redirectTo: "/admin" });
  response.cookies.set("bk_local_admin", sessionSecret, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("bk_local_admin", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 0
  });
  return response;
}
