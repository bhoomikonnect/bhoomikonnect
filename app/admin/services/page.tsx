import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Wrench } from "lucide-react";
import { ServiceInventory } from "@/components/admin/ServiceInventory";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listCmsServices } from "@/lib/cms-services";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Manage Services", description: "Create and manage BhoomiKonnect service listings.", path: "/admin/services", noIndex: true });

export default async function AdminServicesPage() {
  const services = await listCmsServices();
  return <section className="py-8"><div className="container grid gap-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Badge><Wrench className="size-3" aria-hidden /> Services CMS</Badge><h1 className="mt-3 text-3xl font-bold">Services</h1><p className="mt-2 text-sm text-muted-foreground">Manage construction, architecture, interiors, painting, renovation, and maintenance services.</p></div><Link href="/admin/services/new" className={buttonVariants()}><Plus className="size-4" aria-hidden /> Add service</Link></div><ServiceInventory services={services} /></div></section>;
}
