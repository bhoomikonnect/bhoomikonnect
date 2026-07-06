import type { Metadata } from "next";
import Link from "next/link";
import { Building2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
        <form className="mt-6 grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Full name" required />
            <Input type="tel" placeholder="Phone number" required />
          </div>
          <Input type="email" placeholder="Email address" required />
          <Input type="password" placeholder="Password" required />
          <fieldset className="grid gap-2">
            <legend className="text-sm font-semibold">Role</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-md border bg-muted p-3 text-sm">
                <input type="radio" name="role" value="buyer" defaultChecked className="accent-primary" /> Buyer
              </label>
              <label className="flex items-center gap-2 rounded-md border bg-muted p-3 text-sm">
                <input type="radio" name="role" value="developer" className="accent-primary" /> Developer
              </label>
            </div>
          </fieldset>
          <Button type="submit">
            <Building2 className="size-4" aria-hidden /> Create account
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered? <Link href="/login" className="font-semibold text-primary">Login</Link>
        </p>
      </Card>
    </section>
  );
}
