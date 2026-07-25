"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Eye, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsServiceRecord } from "@/types/cms-service";

export function ServiceInventory({ services }: { services: CmsServiceRecord[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState("");
  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return services.filter((service) => !search || [service.title, service.slug, service.family].join(" ").toLowerCase().includes(search));
  }, [query, services]);

  async function archive(service: CmsServiceRecord) {
    if (!window.confirm(`Archive ${service.title}? It will be removed from the public service page.`)) return;
    setDeleting(service.id);
    const response = await fetch(`/api/admin/services/${encodeURIComponent(service.id)}`, { method: "DELETE" });
    setDeleting("");
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      window.alert(result.error || "Unable to archive service.");
      return;
    }
    router.refresh();
  }

  return <div className="grid gap-5">
    <label className="relative max-w-xl"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search title, category, or slug" aria-label="Search services" /></label>
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-muted text-muted-foreground"><tr><th className="p-4 font-semibold">Service</th><th className="p-4 font-semibold">Category</th><th className="p-4 font-semibold">Price</th><th className="p-4 font-semibold">Status</th><th className="p-4 text-right font-semibold">Actions</th></tr></thead>
        <tbody>{visible.map((service) => <tr key={service.id} className="border-t"><td className="p-4"><p className="font-semibold">{service.title}</p><code className="mt-1 block text-xs text-muted-foreground">/{service.family}/{service.slug}</code></td><td className="p-4 capitalize">{service.family}</td><td className="p-4">{service.starting_price ? `₹${service.starting_price.toLocaleString("en-IN")}` : "On request"}</td><td className="p-4"><Badge variant={service.is_active ? "secondary" : "muted"}>{service.is_active ? "Published" : "Hidden"}</Badge></td><td className="p-4"><div className="flex justify-end gap-1">{service.is_active ? <Link href={`/${service.family}/${service.slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`View ${service.title}`}><Eye className="size-4" aria-hidden /></Link> : null}<Link href={`/admin/services/${encodeURIComponent(service.id)}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`Edit ${service.title}`}><Edit3 className="size-4" aria-hidden /></Link><Button type="button" variant="ghost" size="icon" disabled={deleting === service.id} onClick={() => archive(service)} aria-label={`Archive ${service.title}`}><Trash2 className="size-4 text-red-600" aria-hidden /></Button></div></td></tr>)}</tbody>
      </table>
      {!visible.length ? <div className="grid min-h-40 place-items-center p-8 text-sm text-muted-foreground">No services match this view.</div> : null}
    </div>
  </div>;
}
