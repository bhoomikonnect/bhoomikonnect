import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Edit3 } from "lucide-react";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { Badge } from "@/components/ui/badge";
import { getCmsProperty } from "@/lib/cms-repository";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Edit Property", description: "Edit a property in the BhoomiKonnect CMS.", path: "/admin/properties/edit", noIndex: true });

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await getCmsProperty(decodeURIComponent(params.id));
  if (!property) notFound();
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><Edit3 className="size-3" aria-hidden /> Edit property</Badge><h1 className="mt-3 text-3xl font-bold">{property.title}</h1><p className="mt-2 text-sm text-muted-foreground">Source: {property.source}. Saving a demo property creates an editable local override.</p></div><PropertyEditor initialValue={property} propertyId={property.id} /></div></section>;
}
