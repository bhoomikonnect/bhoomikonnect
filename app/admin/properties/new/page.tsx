import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { Badge } from "@/components/ui/badge";
import { createEmptyProperty } from "@/lib/cms-defaults";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Add Property", description: "Create a property in the BhoomiKonnect CMS.", path: "/admin/properties/new", noIndex: true });

export default function NewPropertyPage() {
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><Building2 className="size-3" aria-hidden /> New property</Badge><h1 className="mt-3 text-3xl font-bold">Add property</h1><p className="mt-2 text-sm text-muted-foreground">Complete the relevant tabs, validate the listing, then save it as a draft or publish it.</p></div><PropertyEditor initialValue={createEmptyProperty()} /></div></section>;
}
