import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Login",
  description: "Login to BhoomiKonnect as a buyer, developer, or administrator.",
  path: "/login"
});

export default function LoginPage() {
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
        <form className="mt-6 grid gap-4">
          <Input type="email" placeholder="Email address" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit">
            <Mail className="size-4" aria-hidden /> Continue
          </Button>
        </form>
        <div className="mt-5 rounded-md bg-muted p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4 text-secondary" aria-hidden /> Supabase Auth ready
          </p>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          New here? <Link href="/register" className="font-semibold text-primary">Create an account</Link>
        </p>
      </Card>
    </section>
  );
}
