import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PageEditor } from "@/components/admin/PageEditor";
import { Badge } from "@/components/ui/badge";
import { createEmptyPage } from "@/lib/cms-defaults";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Add Page", description: "Create a page in the BhoomiKonnect CMS.", path: "/admin/pages/new", noIndex: true });

export default function NewPage() {
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><FileText className="size-3" aria-hidden /> New page</Badge><h1 className="mt-3 text-3xl font-bold">Add page</h1><p className="mt-2 text-sm text-muted-foreground">Set the page metadata, arrange content sections, and publish when ready.</p></div><PageEditor initialValue={createEmptyPage()} /></div></section>;
}
