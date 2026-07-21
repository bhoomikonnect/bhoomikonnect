import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";
import { AdminFieldExplorer } from "@/components/admin/AdminFieldExplorer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Admin Field Preview",
  description: "Development-only preview of BhoomiKonnect CMS modules and fields.",
  path: "/admin-preview",
  noIndex: true
});

export default function AdminPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const cmsUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL;

  return (
    <>
      <section className="border-b bg-slate-950 py-9 text-white">
        <div className="container flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="accent">
              <Eye className="size-3" aria-hidden /> Development preview
            </Badge>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Admin fields, before login</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Inspect the BhoomiKonnect CMS structure locally. This route is unavailable in production and cannot edit live data.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/login" className={buttonVariants({ variant: "accent" })}>
              <LockKeyhole className="size-4" aria-hidden /> Real admin login
            </Link>
            {cmsUrl ? (
              <Link href={cmsUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", className: "border-white/30 bg-transparent text-white hover:bg-white/10" })}>
                <ExternalLink className="size-4" aria-hidden /> Open Directus
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b bg-amber-50 py-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
        <div className="container flex items-start gap-2 text-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>No default password is stored in the project. Real access uses Supabase Auth and an admin role; Directus uses its own administrator account.</p>
        </div>
      </section>

      <section className="py-9">
        <div className="container">
          <AdminFieldExplorer />
        </div>
      </section>
    </>
  );
}
