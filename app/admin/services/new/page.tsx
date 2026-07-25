import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { Badge } from "@/components/ui/badge";
import { createEmptyCmsService } from "@/lib/cms-services";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Add Service", description: "Add a service to BhoomiKonnect.", path: "/admin/services/new", noIndex: true });

export default function NewServicePage() {
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><Wrench className="size-3" aria-hidden /> New service</Badge><h1 className="mt-3 text-3xl font-bold">Add service</h1><p className="mt-2 text-sm text-muted-foreground">Choose a category and add pricing, scope, locations, packages, and FAQs.</p></div><ServiceEditor initialValue={createEmptyCmsService()} /></div></section>;
}
