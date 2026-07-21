import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Edit3 } from "lucide-react";
import { PageEditor } from "@/components/admin/PageEditor";
import { Badge } from "@/components/ui/badge";
import { getCmsPage } from "@/lib/cms-repository";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Edit Page", description: "Edit a page in the BhoomiKonnect CMS.", path: "/admin/pages/edit", noIndex: true });

export default async function EditPage({ params }: { params: { id: string } }) {
  const page = await getCmsPage(decodeURIComponent(params.id));
  if (!page) notFound();
  return <section className="py-8"><div className="container grid gap-7"><div><Badge><Edit3 className="size-3" aria-hidden /> Edit page</Badge><h1 className="mt-3 text-3xl font-bold">{page.title}</h1><p className="mt-2 text-sm text-muted-foreground">Update sections, metadata, ordering, and publishing status.</p></div><PageEditor initialValue={page} pageId={page.id} /></div></section>;
}
