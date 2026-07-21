"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, Loader2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cmsPropertySchema } from "@/lib/cms-validation";
import { cn } from "@/lib/utils";
import type { CmsPropertyInput, CmsPropertyRecord } from "@/types/cms";

const tabs = ["Basic", "Location", "Pricing", "Specifications", "Legal", "Content & media", "SEO", "Publishing"] as const;
type Tab = typeof tabs[number];
type FieldErrors = Record<string, string[] | undefined>;

const selectClass = "focus-ring min-h-11 w-full rounded-md border bg-background px-3 text-sm";

function Field({ label, required, error, children, className }: { label: string; required?: boolean; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("grid content-start gap-2 text-sm font-semibold", className)}>
      <span>{label}{required ? <span className="ml-1 text-red-600" aria-hidden>*</span> : null}</span>
      {children}
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (checked: boolean) => void; label: string; description?: string }) {
  return (
    <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-md border p-3">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 size-4 accent-primary" />
      <span><span className="block text-sm font-semibold">{label}</span>{description ? <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{description}</span> : null}</span>
    </label>
  );
}

function lines(value: string[]) {
  return value.join("\n");
}

function parseLines(value: string) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function PropertyEditor({ initialValue, propertyId }: { initialValue: CmsPropertyInput | CmsPropertyRecord; propertyId?: string }) {
  const router = useRouter();
  const [value, setValue] = useState<CmsPropertyInput>(initialValue);
  const [activeTab, setActiveTab] = useState<Tab>("Basic");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(propertyId));

  function update<K extends keyof CmsPropertyInput>(field: K, nextValue: CmsPropertyInput[K]) {
    setValue((current) => ({ ...current, [field]: nextValue }));
  }

  function updateNumber(field: keyof CmsPropertyInput, nextValue: string, nullable = false) {
    update(field, (nextValue === "" && nullable ? null : Number(nextValue || 0)) as never);
  }

  function firstError(field: keyof CmsPropertyInput) {
    return errors[field]?.[0];
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const parsed = cmsPropertySchema.safeParse(value);
    if (!parsed.success) {
      const nextErrors = parsed.error.flatten().fieldErrors;
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      const fieldTab: Record<string, Tab> = {
        title: "Basic", slug: "Basic", property_type: "Basic", project_name: "Basic", property_status: "Basic",
        country: "Location", state: "Location", city: "Location", address: "Location", latitude: "Location", longitude: "Location",
        total_price: "Pricing", total_area: "Specifications", description: "Content & media", seo_title: "SEO", publishing_status: "Publishing"
      };
      if (firstKey && fieldTab[firstKey]) setActiveTab(fieldTab[firstKey]);
      setMessage("Please correct the marked fields before saving.");
      return;
    }

    setErrors({}); setSaving(true);
    const endpoint = propertyId ? `/api/admin/properties/${encodeURIComponent(propertyId)}` : "/api/admin/properties";
    const response = await fetch(endpoint, {
      method: propertyId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setErrors(result.fields || {});
      setMessage(result.error || "Unable to save property.");
      return;
    }
    router.push("/admin/properties");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-6" noValidate>
      <div className="flex gap-2 overflow-x-auto border-b pb-3" role="tablist" aria-label="Property form sections">
        {tabs.map((tab) => (
          <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={cn("focus-ring min-h-9 shrink-0 rounded-md px-3 text-xs font-semibold", activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>{tab}</button>
        ))}
      </div>

      {activeTab === "Basic" ? (
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="basic-fields">
          <div className="md:col-span-2"><h2 id="basic-fields" className="text-xl font-bold">Basic information</h2><p className="mt-1 text-sm text-muted-foreground">Identity, ownership, project, and listing classification.</p></div>
          <Field label="Property title" required error={firstError("title")}><Input value={value.title} onChange={(event) => { update("title", event.target.value); if (!slugEdited) update("slug", slugify(event.target.value)); }} /></Field>
          <Field label="URL slug" required error={firstError("slug")}><Input value={value.slug} onChange={(event) => { setSlugEdited(true); update("slug", slugify(event.target.value)); }} /></Field>
          <Field label="Property type" required><select className={selectClass} value={value.property_type} onChange={(event) => update("property_type", event.target.value)}>{["Plot", "Agricultural Land", "Farm Land", "Flat", "Villa", "Independent House", "Commercial", "Office", "Shop", "Warehouse", "Industrial"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Category" required><select className={selectClass} value={value.category} onChange={(event) => update("category", event.target.value)}>{["Residential", "Commercial", "Agricultural", "Industrial"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Listing purpose"><select className={selectClass} value={value.listing_purpose} onChange={(event) => update("listing_purpose", event.target.value as CmsPropertyInput["listing_purpose"])}><option>Sale</option><option>Rent</option></select></Field>
          <Field label="Property status"><select className={selectClass} value={value.property_status} onChange={(event) => update("property_status", event.target.value)}>{["Ready to Move", "Under Construction", "New Launch"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Project name" required error={firstError("project_name")}><Input value={value.project_name} onChange={(event) => update("project_name", event.target.value)} /></Field>
          <Field label="Owner name"><Input value={value.owner_name} onChange={(event) => update("owner_name", event.target.value)} /></Field>
          <Field label="Developer name"><Input value={value.developer_name} onChange={(event) => update("developer_name", event.target.value)} /></Field>
          <Field label="Developer slug"><Input value={value.developer_slug} onChange={(event) => update("developer_slug", slugify(event.target.value))} /></Field>
          <Field label="Directus developer ID" className="md:col-span-2"><Input value={value.developer_id} onChange={(event) => update("developer_id", event.target.value)} /><span className="text-xs font-normal text-muted-foreground">Required only when writing to a Directus database with the developer relation enforced.</span></Field>
        </section>
      ) : null}

      {activeTab === "Location" ? (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-labelledby="location-fields">
          <div className="md:col-span-2 lg:col-span-3"><h2 id="location-fields" className="text-xl font-bold">Location</h2><p className="mt-1 text-sm text-muted-foreground">Search hierarchy, postal address, and map coordinates.</p></div>
          {(["country", "state", "district", "city", "area_name", "locality", "landmark", "pincode"] as const).map((field) => <Field key={field} label={field.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase())} required={field === "city"} error={firstError(field)}><Input value={value[field]} onChange={(event) => update(field, event.target.value)} /></Field>)}
          <Field label="Full address" required error={firstError("address")} className="md:col-span-2 lg:col-span-3"><Textarea value={value.address} onChange={(event) => update("address", event.target.value)} className="min-h-24" /></Field>
          <Field label="Latitude"><Input type="number" step="any" value={value.latitude} onChange={(event) => updateNumber("latitude", event.target.value)} /></Field>
          <Field label="Longitude"><Input type="number" step="any" value={value.longitude} onChange={(event) => updateNumber("longitude", event.target.value)} /></Field>
        </section>
      ) : null}

      {activeTab === "Pricing" ? (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-labelledby="pricing-fields">
          <div className="md:col-span-2 lg:col-span-3"><h2 id="pricing-fields" className="text-xl font-bold">Pricing</h2><p className="mt-1 text-sm text-muted-foreground">Sale, rent, deposits, booking, and recurring charges.</p></div>
          {([ ["total_price", "Total price"], ["price_per_sq_ft", "Price per sq ft"], ["price_per_sq_yd", "Price per sq yd"], ["booking_amount", "Booking amount"], ["maintenance_charges", "Maintenance charges"], ["security_deposit", "Security deposit"], ["rent_amount", "Monthly rent"] ] as Array<[keyof CmsPropertyInput, string]>).map(([field, label]) => <Field key={field} label={label} required={field === "total_price"} error={firstError(field)}><Input type="number" min="0" value={value[field] as number} onChange={(event) => updateNumber(field, event.target.value)} /></Field>)}
          <Toggle checked={value.negotiable} onChange={(checked) => update("negotiable", checked)} label="Negotiable" description="Show that the asking price can be discussed." />
        </section>
      ) : null}

      {activeTab === "Specifications" ? (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-labelledby="specification-fields">
          <div className="md:col-span-2 lg:col-span-3"><h2 id="specification-fields" className="text-xl font-bold">Specifications</h2><p className="mt-1 text-sm text-muted-foreground">Area, rooms, floors, access, furnishing, and construction timeline.</p></div>
          <Field label="Total area" required error={firstError("total_area")}><Input type="number" min="1" value={value.total_area} onChange={(event) => updateNumber("total_area", event.target.value)} /></Field>
          <Field label="Area unit"><select className={selectClass} value={value.area_unit} onChange={(event) => update("area_unit", event.target.value as CmsPropertyInput["area_unit"])}><option value="sq.ft">sq.ft</option><option value="sq.yd">sq.yd</option></select></Field>
          {([ ["plot_area", "Plot area"], ["built_up_area", "Built-up area"], ["carpet_area", "Carpet area"] ] as Array<[keyof CmsPropertyInput, string]>).map(([field, label]) => <Field key={field} label={label}><Input type="number" min="0" value={value[field] as number} onChange={(event) => updateNumber(field, event.target.value)} /></Field>)}
          {([ ["bedrooms", "Bedrooms"], ["bathrooms", "Bathrooms"], ["balconies", "Balconies"], ["total_floors", "Total floors"], ["property_floor", "Property floor"] ] as Array<[keyof CmsPropertyInput, string]>).map(([field, label]) => <Field key={field} label={label}><Input type="number" min="0" value={(value[field] as number | null) ?? ""} onChange={(event) => updateNumber(field, event.target.value, true)} /></Field>)}
          {([ ["parking", "Parking"], ["facing", "Facing"], ["road_width", "Road width"], ["furnishing", "Furnishing"], ["property_age", "Property age"], ["construction_status", "Construction status"] ] as Array<[keyof CmsPropertyInput, string]>).map(([field, label]) => <Field key={field} label={label}><Input value={value[field] as string} onChange={(event) => update(field, event.target.value as never)} /></Field>)}
          <Field label="Possession date"><Input type="date" value={value.possession_date} onChange={(event) => update("possession_date", event.target.value)} /></Field>
        </section>
      ) : null}

      {activeTab === "Legal" ? (
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="legal-fields">
          <div className="md:col-span-2"><h2 id="legal-fields" className="text-xl font-bold">Legal and approvals</h2><p className="mt-1 text-sm text-muted-foreground">Regulatory identifiers, approval authorities, verification, and loan readiness.</p></div>
          <Field label="RERA number"><Input value={value.rera_number} onChange={(event) => update("rera_number", event.target.value)} /></Field>
          <Field label="Approval labels"><Textarea value={lines(value.approvals)} onChange={(event) => update("approvals", parseLines(event.target.value))} className="min-h-24" /><span className="text-xs font-normal text-muted-foreground">One approval per line.</span></Field>
          <Toggle checked={value.dtcp_approval} onChange={(checked) => update("dtcp_approval", checked)} label="DTCP approved" />
          <Toggle checked={value.hmda_approval} onChange={(checked) => update("hmda_approval", checked)} label="HMDA approved" />
          <Toggle checked={value.municipality_approval} onChange={(checked) => update("municipality_approval", checked)} label="Municipality approved" />
          <Toggle checked={value.panchayat_approval} onChange={(checked) => update("panchayat_approval", checked)} label="Panchayat approved" />
          <Toggle checked={value.legal_verification} onChange={(checked) => update("legal_verification", checked)} label="Legal verification completed" />
          <Toggle checked={value.bank_loan_available} onChange={(checked) => update("bank_loan_available", checked)} label="Bank loan available" />
        </section>
      ) : null}

      {activeTab === "Content & media" ? (
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="content-fields">
          <div className="md:col-span-2"><h2 id="content-fields" className="text-xl font-bold">Content and media</h2><p className="mt-1 text-sm text-muted-foreground">Description, amenities, imagery, plans, documents, video, and virtual tour.</p></div>
          <Field label="Property description" required error={firstError("description")} className="md:col-span-2"><Textarea value={value.description} onChange={(event) => update("description", event.target.value)} className="min-h-40" /></Field>
          <Field label="Amenities"><Textarea value={lines(value.amenities)} onChange={(event) => update("amenities", parseLines(event.target.value))} /><span className="text-xs font-normal text-muted-foreground">One amenity per line.</span></Field>
          <Field label="Nearby places"><Textarea value={value.nearby.map((item) => `${item.label} | ${item.distance} | ${item.type}`).join("\n")} onChange={(event) => update("nearby", event.target.value.split("\n").map((row) => row.split("|").map((part) => part.trim())).filter(([label]) => label).map(([label, distance = "", type = "Business Hub"]) => ({ label, distance, type })))} /><span className="text-xs font-normal text-muted-foreground">Format: Place | Distance | Type</span></Field>
          <Field label="Cover image path or URL"><Input value={value.cover_image} onChange={(event) => update("cover_image", event.target.value)} /></Field>
          <Field label="Gallery images"><Textarea value={lines(value.gallery)} onChange={(event) => update("gallery", parseLines(event.target.value))} /><span className="text-xs font-normal text-muted-foreground">One path or URL per line.</span></Field>
          <Field label="Floor-plan images"><Textarea value={lines(value.floor_plans)} onChange={(event) => update("floor_plans", parseLines(event.target.value))} /></Field>
          {([ ["layout_plan", "Layout plan"], ["master_plan", "Master plan"], ["brochure_url", "Brochure PDF"], ["video_url", "Video URL"], ["virtual_tour_url", "Virtual-tour URL"] ] as Array<[keyof CmsPropertyInput, string]>).map(([field, label]) => <Field key={field} label={label}><Input value={value[field] as string} onChange={(event) => update(field, event.target.value as never)} /></Field>)}
        </section>
      ) : null}

      {activeTab === "SEO" ? (
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="seo-fields">
          <div className="md:col-span-2"><h2 id="seo-fields" className="text-xl font-bold">Search metadata</h2><p className="mt-1 text-sm text-muted-foreground">Unique metadata, canonical URL, social image, keywords, and accessible image text.</p></div>
          <Field label="SEO title"><Input value={value.seo_title} onChange={(event) => update("seo_title", event.target.value)} maxLength={160} /><span className="text-xs font-normal text-muted-foreground">{value.seo_title.length}/160</span></Field>
          <Field label="Canonical URL"><Input value={value.canonical_url} onChange={(event) => update("canonical_url", event.target.value)} /></Field>
          <Field label="Meta description" className="md:col-span-2"><Textarea value={value.meta_description} onChange={(event) => update("meta_description", event.target.value)} maxLength={320} /><span className="text-xs font-normal text-muted-foreground">{value.meta_description.length}/320</span></Field>
          <Field label="Keywords"><Textarea value={lines(value.keywords)} onChange={(event) => update("keywords", parseLines(event.target.value))} /></Field>
          <Field label="Open Graph image"><Input value={value.og_image} onChange={(event) => update("og_image", event.target.value)} /></Field>
          <Field label="Primary image alt text" className="md:col-span-2"><Input value={value.image_alt_text} onChange={(event) => update("image_alt_text", event.target.value)} /></Field>
        </section>
      ) : null}

      {activeTab === "Publishing" ? (
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="publishing-fields">
          <div className="md:col-span-2"><h2 id="publishing-fields" className="text-xl font-bold">Publishing</h2><p className="mt-1 text-sm text-muted-foreground">Control workflow state, public visibility, verification, and homepage promotion.</p></div>
          <Field label="Workflow status"><select className={selectClass} value={value.publishing_status} onChange={(event) => update("publishing_status", event.target.value as CmsPropertyInput["publishing_status"])}>{["draft", "pending", "approved", "rejected", "published", "archived"].map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select></Field>
          <div className="hidden md:block" />
          <Toggle checked={value.active} onChange={(checked) => update("active", checked)} label="Active listing" description="The property can appear publicly only when active and published." />
          <Toggle checked={value.featured} onChange={(checked) => update("featured", checked)} label="Featured property" description="Prioritize the property in selected marketplace sections." />
          <Toggle checked={value.verified} onChange={(checked) => update("verified", checked)} label="Verified property" description="Display the verified trust signal after checks are complete." />
        </section>
      ) : null}

      {message ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{message}</p> : null}

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/properties" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
          {propertyId && value.publishing_status === "published" ? <Link href={`/property/${value.slug}`} target="_blank" className={buttonVariants({ variant: "ghost" })}><Eye className="size-4" aria-hidden /> Preview</Link> : null}
        </div>
        <Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : value.publishing_status === "published" ? <Check className="size-4" aria-hidden /> : <Save className="size-4" aria-hidden />}{saving ? "Saving..." : value.publishing_status === "published" ? "Save and publish" : "Save property"}</Button>
      </div>
      <div className="flex flex-wrap gap-2"><Badge variant="outline">Autosaved only when Save is pressed</Badge><Badge variant="muted">Required fields are marked *</Badge></div>
    </form>
  );
}
