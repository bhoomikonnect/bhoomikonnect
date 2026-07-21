"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, Eye, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsPageRecord } from "@/types/cms";

export function PageInventory({ pages }: { pages: CmsPageRecord[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return pages.filter((page) => !normalized || [page.title, page.slug, page.template, page.status].join(" ").toLowerCase().includes(normalized));
  }, [pages, query]);

  async function remove(page: CmsPageRecord) {
    if (!window.confirm(`Archive ${page.title}? Its public URL will stop working.`)) return;
    setDeleting(page.id);
    const response = await fetch(`/api/admin/pages/${encodeURIComponent(page.id)}`, { method: "DELETE" });
    setDeleting("");
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      window.alert(result.error || "Unable to archive page.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      <label className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search title, slug, template, or status" aria-label="Search pages" />
      </label>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted text-muted-foreground"><tr><th className="p-4 font-semibold">Page</th><th className="p-4 font-semibold">Template</th><th className="p-4 font-semibold">Sections</th><th className="p-4 font-semibold">Status</th><th className="p-4 text-right font-semibold">Actions</th></tr></thead>
          <tbody>{visible.map((page) => <tr key={page.id} className="border-t"><td className="p-4"><p className="font-semibold">{page.title}</p><code className="mt-1 block text-xs text-muted-foreground">/pages/{page.slug}</code></td><td className="p-4">{page.template}</td><td className="p-4">{page.sections.length}</td><td className="p-4"><Badge variant={page.status === "published" ? "secondary" : page.status === "archived" ? "accent" : "muted"}>{page.status}</Badge></td><td className="p-4"><div className="flex justify-end gap-1">{page.status === "published" ? <Link href={`/pages/${page.slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "icon" })} title="View public page" aria-label={`View ${page.title}`}><Eye className="size-4" aria-hidden /></Link> : null}<Link href={`/admin/pages/${encodeURIComponent(page.id)}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })} title="Edit page" aria-label={`Edit ${page.title}`}><Edit3 className="size-4" aria-hidden /></Link><Button type="button" variant="ghost" size="icon" disabled={deleting === page.id} onClick={() => remove(page)} title="Archive page" aria-label={`Archive ${page.title}`}><Trash2 className="size-4 text-red-600" aria-hidden /></Button></div></td></tr>)}</tbody>
        </table>
        {!visible.length ? <div className="grid min-h-40 place-items-center p-8 text-sm text-muted-foreground">No CMS pages match this view.</div> : null}
      </div>
    </div>
  );
}
