import type { Metadata } from "next";
import Link from "next/link";
import { Eye, LogIn, ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Login",
  description: "Login to BhoomiKonnect as a buyer, developer, or administrator.",
  path: "/login"
});

export default function LoginPage() {
  const localAdminCredentials = process.env.NODE_ENV !== "production" && process.env.LOCAL_ADMIN_EMAIL && process.env.LOCAL_ADMIN_PASSWORD
    ? { email: process.env.LOCAL_ADMIN_EMAIL, password: process.env.LOCAL_ADMIN_PASSWORD }
    : undefined;
  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <section className="container grid min-h-[72vh] place-items-center py-12">
      <Card className="w-full max-w-md p-6 shadow-panel">
        <div className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
            <LogIn className="size-6" aria-hidden />
          </span>
          <h1 className="mt-5 text-2xl font-bold">Login to BhoomiKonnect</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access saved properties, developer leads, and admin workflows.</p>
        </div>
        <AuthForm mode="login" localAdminCredentials={localAdminCredentials} />
        <Link href="/forgot-password" className="mt-3 block text-center text-sm font-semibold text-primary">Forgot password?</Link>
        <div className="mt-5 rounded-md bg-muted p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4 text-secondary" aria-hidden /> {hasSupabase ? "Supabase Auth connected" : localAdminCredentials ? "Local CMS administrator enabled" : "Supabase setup required"}
          </p>
          {localAdminCredentials ? (
            <dl className="mt-3 grid gap-2 border-t pt-3 text-xs">
              <div className="flex items-center justify-between gap-3"><dt className="text-muted-foreground">Email</dt><dd><code>{localAdminCredentials.email}</code></dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-muted-foreground">Password</dt><dd><code>{localAdminCredentials.password}</code></dd></div>
            </dl>
          ) : null}
        </div>
        {process.env.NODE_ENV !== "production" ? (
          <Link href="/admin-preview" className={buttonVariants({ variant: "outline", className: "mt-3 w-full" })}>
            <Eye className="size-4" aria-hidden /> Preview admin fields locally
          </Link>
        ) : null}
        <p className="mt-5 text-center text-sm text-muted-foreground">
          New here? <Link href="/register" className="font-semibold text-primary">Create an account</Link>
        </p>
      </Card>
    </section>
  );
}
