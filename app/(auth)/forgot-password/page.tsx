import type { Metadata } from "next";
import Link from "next/link";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Forgot Password", description: "Request a secure BhoomiKonnect password reset link.", path: "/forgot-password", noIndex: true });
export default function Page() { return <section className="container grid min-h-[70vh] place-items-center py-12"><Card className="w-full max-w-md p-6"><h1 className="text-2xl font-bold">Reset your password</h1><p className="mt-2 text-sm text-muted-foreground">We will email a secure reset link to your account address.</p><PasswordForm mode="request" /><Link href="/login" className="mt-5 block text-center text-sm font-semibold text-primary">Back to login</Link></Card></section>; }
