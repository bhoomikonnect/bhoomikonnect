import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { PageInventory } from "@/components/admin/PageInventory";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listCmsPages } from "@/lib/cms-repository";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Manage Pages", description: "Create, edit, publish, and archive BhoomiKonnect CMS pages.", path: "/admin/pages", noIndex: true });

export default async function AdminPagesPage() {
  const pages = await listCmsPages();
  return <section className="py-8"><div className="container grid gap-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Badge><FileText className="size-3" aria-hidden /> Page CMS</Badge><h1 className="mt-3 text-3xl font-bold">Pages</h1><p className="mt-2 text-sm text-muted-foreground">Build original pages with reusable sections, publishing workflow, and search metadata.</p></div><Link href="/admin/pages/new" className={buttonVariants({ variant: "default" })}><Plus className="size-4" aria-hidden /> Add page</Link></div><PageInventory pages={pages} /></div></section>;
}
