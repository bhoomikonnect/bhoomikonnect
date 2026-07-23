import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminApi = request.nextUrl.pathname.startsWith("/api/admin");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin") || isAdminApi;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return isAdminApi
      ? NextResponse.json({ error: "Administrator authentication is required." }, { status: 401 })
      : NextResponse.redirect(new URL("/login?setup=required", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    if (isAdminApi) return NextResponse.json({ error: "Administrator authentication is required." }, { status: 401 });
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  if (isAdminRoute) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const isAdmin = profile?.role === "admin" || profile?.role === "super_admin" || user.email === process.env.ADMIN_EMAIL;
    if (!isAdmin) {
      return isAdminApi
        ? NextResponse.json({ error: "Administrator permission is required." }, { status: 403 })
        : NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/dashboard/:path*"] };
