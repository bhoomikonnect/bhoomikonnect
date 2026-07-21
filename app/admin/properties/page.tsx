import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Plus } from "lucide-react";
import { PropertyInventory } from "@/components/admin/PropertyInventory";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listCmsProperties } from "@/lib/cms-repository";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Manage Properties", description: "Create, edit, publish, and archive BhoomiKonnect properties.", path: "/admin/properties", noIndex: true });

export default async function AdminPropertiesPage() {
  const properties = await listCmsProperties();
  return (
    <section className="py-8">
      <div className="container grid gap-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><Badge><Building2 className="size-3" aria-hidden /> Property CMS</Badge><h1 className="mt-3 text-3xl font-bold">Properties</h1><p className="mt-2 text-sm text-muted-foreground">Manage drafts, approvals, publishing, SEO, pricing, legal data, and media.</p></div>
          <Link href="/admin/properties/new" className={buttonVariants({ variant: "default" })}><Plus className="size-4" aria-hidden /> Add property</Link>
        </div>
        <PropertyInventory properties={properties} />
      </div>
    </section>
  );
}
