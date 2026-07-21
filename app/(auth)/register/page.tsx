import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Register",
  description: "Register on BhoomiKonnect as a buyer or verified developer.",
  path: "/register"
});

export default function RegisterPage() {
  return (
    <section className="container grid min-h-[72vh] place-items-center py-12">
      <Card className="w-full max-w-xl p-6 shadow-panel">
        <div className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
            <UserPlus className="size-6" aria-hidden />
          </span>
          <h1 className="mt-5 text-2xl font-bold">Create your BhoomiKonnect account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Save properties, manage enquiries, or start developer verification.</p>
        </div>
        <AuthForm mode="register" />
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered? <Link href="/login" className="font-semibold text-primary">Login</Link>
        </p>
      </Card>
    </section>
  );
}
