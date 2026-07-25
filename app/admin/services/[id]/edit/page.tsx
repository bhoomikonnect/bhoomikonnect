import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Edit3 } from "lucide-react";
import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { Badge } from "@/components/ui/badge";
import { getCmsService } from "@/lib/cms-services";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Edit Service", description: "Edit a BhoomiKonnect service.", path: "/admin/services/edit", noIndex: true });

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getCmsService(decodeURIComponent(params.id));
  if (!service) notFound();
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><Edit3 className="size-3" aria-hidden /> Edit service</Badge><h1 className="mt-3 text-3xl font-bold">{service.title}</h1><p className="mt-2 text-sm text-muted-foreground">Update service content, pricing, visibility, and search metadata.</p></div><ServiceEditor initialValue={service} serviceId={service.id} /></div></section>;
}
