"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Eye, GripVertical, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEmptySection } from "@/lib/cms-defaults";
import { cmsPageSchema } from "@/lib/cms-validation";
import type { CmsPageInput, CmsPageRecord, CmsSectionType } from "@/types/cms";

const selectClass = "focus-ring min-h-11 w-full rounded-md border bg-background px-3 text-sm";
const sectionTypes: Array<{ value: CmsSectionType; label: string }> = [
  { value: "hero", label: "Hero" }, { value: "text", label: "Text" }, { value: "image", label: "Image" },
  { value: "cta", label: "Call to action" }, { value: "statistics", label: "Statistics" }, { value: "faq", label: "FAQ" },
  { value: "gallery", label: "Gallery" }, { value: "contact", label: "Contact" }
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function PageEditor({ initialValue, pageId }: { initialValue: CmsPageInput | CmsPageRecord; pageId?: string }) {
  const router = useRouter();
  const [value, setValue] = useState<CmsPageInput>(initialValue);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [newType, setNewType] = useState<CmsSectionType>("text");
  const [slugEdited, setSlugEdited] = useState(Boolean(pageId));

  function updateSection(index: number, field: string, nextValue: string | string[]) {
    setValue((current) => ({ ...current, sections: current.sections.map((section, sectionIndex) => sectionIndex === index ? { ...section, [field]: nextValue } : section) }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.sections.length) return;
    setValue((current) => {
      const sections = [...current.sections];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...current, sections };
    });
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage("");
    const parsed = cmsPageSchema.safeParse(value);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message || "Please correct the page fields.");
      return;
    }
    setSaving(true);
    const endpoint = pageId ? `/api/admin/pages/${encodeURIComponent(pageId)}` : "/api/admin/pages";
    const response = await fetch(endpoint, { method: pageId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) { setMessage(result.error || "Unable to save page."); return; }
    router.push("/admin/pages"); router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-7" noValidate>
      <section className="grid gap-5 border-b pb-7 md:grid-cols-2">
        <div className="md:col-span-2"><h2 className="text-xl font-bold">Page settings</h2><p className="mt-1 text-sm text-muted-foreground">Set the URL, publishing state, template, and unique search metadata.</p></div>
        <label className="grid gap-2 text-sm font-semibold">Page title<Input value={value.title} onChange={(event) => { setValue((current) => ({ ...current, title: event.target.value, slug: slugEdited ? current.slug : slugify(event.target.value) })); }} required /></label>
        <label className="grid gap-2 text-sm font-semibold">URL slug<Input value={value.slug} onChange={(event) => { setSlugEdited(true); setValue((current) => ({ ...current, slug: slugify(event.target.value) })); }} required /></label>
        <label className="grid gap-2 text-sm font-semibold">Template<select className={selectClass} value={value.template} onChange={(event) => setValue((current) => ({ ...current, template: event.target.value }))}><option value="standard">Standard</option><option value="service">Service</option><option value="policy">Policy</option><option value="campaign">Campaign</option></select></label>
        <label className="grid gap-2 text-sm font-semibold">Publishing status<select className={selectClass} value={value.status} onChange={(event) => setValue((current) => ({ ...current, status: event.target.value as CmsPageInput["status"] }))}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="grid gap-2 text-sm font-semibold">SEO title<Input value={value.seo_title} maxLength={160} onChange={(event) => setValue((current) => ({ ...current, seo_title: event.target.value }))} /><span className="text-xs font-normal text-muted-foreground">{value.seo_title.length}/160</span></label>
        <label className="grid gap-2 text-sm font-semibold">Canonical URL<Input value={value.canonical_url} onChange={(event) => setValue((current) => ({ ...current, canonical_url: event.target.value }))} /></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Meta description<Textarea value={value.meta_description} maxLength={320} onChange={(event) => setValue((current) => ({ ...current, meta_description: event.target.value }))} /><span className="text-xs font-normal text-muted-foreground">{value.meta_description.length}/320</span></label>
      </section>

      <section className="grid gap-5">
        <div><h2 className="text-xl font-bold">Page sections</h2><p className="mt-1 text-sm text-muted-foreground">Build the page in reading order. Items use one line each; FAQ and statistics lines support a vertical bar separator.</p></div>
        <div className="grid gap-4">
          {value.sections.map((section, index) => (
            <article key={section.id} className="overflow-hidden rounded-lg border bg-card">
              <header className="flex flex-wrap items-center gap-2 border-b bg-muted/55 px-4 py-3">
                <GripVertical className="size-4 text-muted-foreground" aria-hidden />
                <strong className="mr-auto text-sm">{index + 1}. {sectionTypes.find((item) => item.value === section.block_type)?.label}</strong>
                <Button type="button" size="icon" variant="ghost" onClick={() => moveSection(index, -1)} disabled={index === 0} aria-label="Move section up" title="Move up"><ArrowUp className="size-4" aria-hidden /></Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => moveSection(index, 1)} disabled={index === value.sections.length - 1} aria-label="Move section down" title="Move down"><ArrowDown className="size-4" aria-hidden /></Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => setValue((current) => ({ ...current, sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index) }))} disabled={value.sections.length === 1} aria-label="Remove section" title="Remove"><Trash2 className="size-4 text-red-600" aria-hidden /></Button>
              </header>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">Section type<select className={selectClass} value={section.block_type} onChange={(event) => updateSection(index, "block_type", event.target.value)}>{sectionTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
                <label className="grid gap-2 text-sm font-semibold">Eyebrow<Input value={section.eyebrow} onChange={(event) => updateSection(index, "eyebrow", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold md:col-span-2">Heading<Input value={section.heading} onChange={(event) => updateSection(index, "heading", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold md:col-span-2">Body<Textarea value={section.body} onChange={(event) => updateSection(index, "body", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold">Image path or URL<Input value={section.image} onChange={(event) => updateSection(index, "image", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold">Image alt text<Input value={section.image_alt} onChange={(event) => updateSection(index, "image_alt", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold">CTA label<Input value={section.cta_label} onChange={(event) => updateSection(index, "cta_label", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold">CTA URL<Input value={section.cta_url} onChange={(event) => updateSection(index, "cta_url", event.target.value)} /></label>
                <label className="grid gap-2 text-sm font-semibold md:col-span-2">Items<Textarea value={section.items.join("\n")} onChange={(event) => updateSection(index, "items", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} /><span className="text-xs font-normal text-muted-foreground">Statistics: Label | Value. FAQ: Question | Answer. Gallery: image path per line.</span></label>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed p-4">
          <select className={`${selectClass} w-auto min-w-48`} value={newType} onChange={(event) => setNewType(event.target.value as CmsSectionType)}>{sectionTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
          <Button type="button" variant="outline" onClick={() => setValue((current) => ({ ...current, sections: [...current.sections, createEmptySection(newType)] }))}><Plus className="size-4" aria-hidden /> Add section</Button>
        </div>
      </section>

      {message ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{message}</p> : null}
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-2"><Link href="/admin/pages" className={buttonVariants({ variant: "outline" })}>Cancel</Link>{pageId && value.status === "published" ? <Link href={`/pages/${value.slug}`} target="_blank" className={buttonVariants({ variant: "ghost" })}><Eye className="size-4" aria-hidden /> Preview</Link> : null}</div><Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}{saving ? "Saving..." : value.status === "published" ? "Save and publish" : "Save page"}</Button></div>
    </form>
  );
}
