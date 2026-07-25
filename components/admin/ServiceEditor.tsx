"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cmsServiceSchema } from "@/lib/cms-service-validation";
import type { CmsServiceInput, CmsServiceRecord } from "@/types/cms-service";

const selectClass = "focus-ring min-h-11 w-full rounded-md border bg-background px-3 text-sm";
const families = ["construction", "architecture", "interiors", "painting", "renovation", "maintenance"] as const;
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const lines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

export function ServiceEditor({ initialValue, serviceId }: { initialValue: CmsServiceInput | CmsServiceRecord; serviceId?: string }) {
  const router = useRouter();
  const [value, setValue] = useState<CmsServiceInput>(initialValue);
  const [slugEdited, setSlugEdited] = useState(Boolean(serviceId));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const parsed = cmsServiceSchema.safeParse(value);
    if (!parsed.success) return setMessage(parsed.error.issues[0]?.message || "Please correct the service fields.");
    setSaving(true);
    const endpoint = serviceId ? `/api/admin/services/${encodeURIComponent(serviceId)}` : "/api/admin/services";
    const response = await fetch(endpoint, { method: serviceId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) return setMessage(result.error || "Unable to save service.");
    router.push("/admin/services");
    router.refresh();
  }

  return <form onSubmit={submit} className="grid gap-7" noValidate>
    <section className="grid gap-5 md:grid-cols-2">
      <label className="grid gap-2 text-sm font-semibold">Service category<select className={selectClass} value={value.family} onChange={(event) => setValue((current) => ({ ...current, family: event.target.value as CmsServiceInput["family"] }))}>{families.map((family) => <option key={family} value={family}>{family[0].toUpperCase() + family.slice(1)}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-semibold">Display order<Input type="number" min="0" value={value.display_order} onChange={(event) => setValue((current) => ({ ...current, display_order: Number(event.target.value) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Title<Input value={value.title} onChange={(event) => setValue((current) => ({ ...current, title: event.target.value, slug: slugEdited ? current.slug : slugify(event.target.value) }))} required /></label>
      <label className="grid gap-2 text-sm font-semibold">URL slug<Input value={value.slug} onChange={(event) => { setSlugEdited(true); setValue((current) => ({ ...current, slug: slugify(event.target.value) })); }} required /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Short summary<Textarea value={value.summary} onChange={(event) => setValue((current) => ({ ...current, summary: event.target.value }))} required /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Full description<Textarea className="min-h-36" value={value.description} onChange={(event) => setValue((current) => ({ ...current, description: event.target.value }))} required /></label>
      <label className="grid gap-2 text-sm font-semibold">Starting price (₹)<Input type="number" min="0" value={value.starting_price} onChange={(event) => setValue((current) => ({ ...current, starting_price: Number(event.target.value) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Price label<Input value={value.price_label} onChange={(event) => setValue((current) => ({ ...current, price_label: event.target.value }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Timeline<Input value={value.timeline} onChange={(event) => setValue((current) => ({ ...current, timeline: event.target.value }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Cover image URL or path<Input value={value.cover_image} onChange={(event) => setValue((current) => ({ ...current, cover_image: event.target.value }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Features — one per line<Textarea value={value.features.join("\n")} onChange={(event) => setValue((current) => ({ ...current, features: lines(event.target.value) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Deliverables — one per line<Textarea value={value.deliverables.join("\n")} onChange={(event) => setValue((current) => ({ ...current, deliverables: lines(event.target.value) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Service locations — one per line<Textarea value={value.service_locations.join("\n")} onChange={(event) => setValue((current) => ({ ...current, service_locations: lines(event.target.value) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Packages — Name | Price | Description<Textarea value={value.packages.map((item) => `${item.name} | ${item.price} | ${item.description}`).join("\n")} onChange={(event) => setValue((current) => ({ ...current, packages: lines(event.target.value).map((item) => { const [name = "", price = "", description = ""] = item.split("|").map((part) => part.trim()); return { name, price, description }; }) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">FAQs — Question | Answer<Textarea value={value.faq.map((item) => `${item.question} | ${item.answer}`).join("\n")} onChange={(event) => setValue((current) => ({ ...current, faq: lines(event.target.value).map((item) => { const [question = "", ...answer] = item.split("|"); return { question: question.trim(), answer: answer.join("|").trim() }; }).filter((item) => item.question && item.answer) }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">SEO title<Input maxLength={160} value={value.seo_title} onChange={(event) => setValue((current) => ({ ...current, seo_title: event.target.value }))} /></label>
      <label className="grid gap-2 text-sm font-semibold">Meta description<Textarea maxLength={320} value={value.meta_description} onChange={(event) => setValue((current) => ({ ...current, meta_description: event.target.value }))} /></label>
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={value.is_featured} onChange={(event) => setValue((current) => ({ ...current, is_featured: event.target.checked }))} /> Featured service</label>
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={value.is_active} onChange={(event) => setValue((current) => ({ ...current, is_active: event.target.checked }))} /> Published and visible</label>
    </section>
    {message ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{message}</p> : null}
    <div className="flex items-center justify-between border-t pt-5"><Link href="/admin/services" className={buttonVariants({ variant: "outline" })}>Cancel</Link><Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}{saving ? "Saving..." : "Save service"}</Button></div>
  </form>;
}
