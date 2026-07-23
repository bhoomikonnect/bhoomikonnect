"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, Eye, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { CmsPropertyRecord } from "@/types/cms";

export function PropertyInventory({ properties }: { properties: CmsPropertyRecord[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [deleting, setDeleting] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesStatus = status === "all" || property.publishing_status === status;
      const matchesQuery = !normalized || [property.title, property.project_name, property.city, property.property_type, property.slug]
        .join(" ").toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [properties, query, status]);

  async function remove(property: CmsPropertyRecord) {
    if (!window.confirm(`Archive ${property.title}? It will be removed from public listings.`)) return;
    setDeleting(property.id);
    const response = await fetch(`/api/admin/properties/${encodeURIComponent(property.id)}`, { method: "DELETE" });
    setDeleting("");
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      window.alert(result.error || "Unable to archive property.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search title, project, city, type, or slug" aria-label="Search properties" />
        </label>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="focus-ring min-h-11 rounded-md border bg-background px-3 text-sm" aria-label="Filter publishing status">
          <option value="all">All publishing states</option>
          <option value="published">Published</option><option value="draft">Draft</option><option value="pending">Pending</option>
          <option value="approved">Approved</option><option value="rejected">Rejected</option><option value="archived">Archived</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr><th className="p-4 font-semibold">Property</th><th className="p-4 font-semibold">Location</th><th className="p-4 font-semibold">Price</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Source</th><th className="p-4 text-right font-semibold">Actions</th></tr>
          </thead>
          <tbody>
            {visible.map((property) => (
              <tr key={`${property.source}-${property.id}`} className="border-t align-middle">
                <td className="p-4"><p className="font-semibold">{property.title}</p><p className="mt-1 text-xs text-muted-foreground">{property.property_type} · {property.project_name}</p></td>
                <td className="p-4"><p>{property.city || "Not set"}</p><p className="mt-1 text-xs text-muted-foreground">{property.area_name || property.locality || "Area not set"}</p></td>
                <td className="p-4 font-semibold">{formatPrice(property.total_price)}</td>
                <td className="p-4"><Badge variant={property.publishing_status === "published" ? "secondary" : property.publishing_status === "rejected" ? "accent" : "muted"}>{property.publishing_status}</Badge></td>
                <td className="p-4"><Badge variant="outline">{property.source}</Badge></td>
                <td className="p-4">
                  <div className="flex justify-end gap-1">
                    {property.publishing_status === "published" ? <Link href={`/property/${property.slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`View ${property.title}`} title="View public page"><Eye className="size-4" aria-hidden /></Link> : null}
                    <Link href={`/admin/properties/${encodeURIComponent(property.id)}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`Edit ${property.title}`} title="Edit property"><Edit3 className="size-4" aria-hidden /></Link>
                    <Button type="button" variant="ghost" size="icon" disabled={deleting === property.id} onClick={() => remove(property)} aria-label={`Archive ${property.title}`} title="Archive property"><Trash2 className="size-4 text-red-600" aria-hidden /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visible.length ? <div className="grid min-h-40 place-items-center p-8 text-center text-sm text-muted-foreground">No properties match this view.</div> : null}
      </div>
      <p className="text-xs text-muted-foreground">Production records are stored in Supabase unless the optional Directus adapter is enabled. Archived records are removed from public listings.</p>
    </div>
  );
}
