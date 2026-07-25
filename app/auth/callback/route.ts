import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requestedPath = url.searchParams.get("next");
  const nextPath = requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath
    : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=invalid-auth-link", request.url));
  }

  const { error } = await createClient()!.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=auth-link-expired", request.url));
  }

  return NextResponse.redirect(new URL(nextPath, request.url));
}
