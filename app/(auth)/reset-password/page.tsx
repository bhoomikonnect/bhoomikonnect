import type { Metadata } from "next";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Choose New Password", description: "Choose a new BhoomiKonnect password.", path: "/reset-password", noIndex: true });
export default function Page() { return <section className="container grid min-h-[70vh] place-items-center py-12"><Card className="w-full max-w-md p-6"><h1 className="text-2xl font-bold">Choose a new password</h1><p className="mt-2 text-sm text-muted-foreground">Use at least eight characters and keep it unique to this account.</p><PasswordForm mode="reset" /></Card></section>; }
