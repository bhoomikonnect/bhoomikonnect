import "server-only";
import {
  cmsCreateItem as directusCreateItem,
  cmsReadItems as directusReadItems,
  cmsUpdateItem as directusUpdateItem,
  isExternalCmsConfigured as isDirectusConfigured
} from "@/lib/wordpress";
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type { CmsServiceInput, CmsServiceRecord } from "@/types/cms-service";
import type { Faq, ServiceFamily } from "@/types/marketplace";

type UnknownRecord = Record<string, unknown>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : value == null ? fallback : String(value);
}

function number(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function boolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1" || value === 1) return true;
  if (value === "false" || value === "0" || value === 0) return false;
  return fallback;
}

function strings(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
  } catch {
    return value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean);
  }
}

function packages(value: unknown): CmsServiceInput["packages"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is UnknownRecord => Boolean(item) && typeof item === "object")
    .map((item) => ({ name: text(item.name), price: text(item.price), description: text(item.description) }));
}

function faqs(value: unknown): Faq[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is UnknownRecord => Boolean(item) && typeof item === "object")
    .map((item) => ({ question: text(item.question), answer: text(item.answer) }))
    .filter((item) => item.question && item.answer);
}

function normalize(record: UnknownRecord, source: CmsServiceRecord["source"]): CmsServiceRecord {
  return {
    id: text(record.id),
    family: text(record.family, "maintenance") as ServiceFamily,
    title: text(record.title),
    slug: text(record.slug),
    summary: text(record.summary),
    description: text(record.description),
    starting_price: number(record.starting_price),
    price_label: text(record.price_label, "Starting estimate"),
    timeline: text(record.timeline, "On request"),
    features: strings(record.features),
    deliverables: strings(record.deliverables),
    packages: packages(record.packages),
    service_locations: strings(record.service_locations),
    faq: faqs(record.faq),
    cover_image: text(record.cover_image),
    seo_title: text(record.seo_title),
    meta_description: text(record.meta_description),
    is_featured: boolean(record.is_featured),
    is_active: boolean(record.is_active, true),
    display_order: number(record.display_order),
    created_at: text(record.created_at),
    updated_at: text(record.updated_at),
    source
  };
}

export function createEmptyCmsService(): CmsServiceInput {
  return {
    family: "painting", title: "", slug: "", summary: "", description: "", starting_price: 0,
    price_label: "Starting estimate", timeline: "On request", features: [], deliverables: [], packages: [],
    service_locations: [], faq: [], cover_image: "", seo_title: "", meta_description: "",
    is_featured: false, is_active: true, display_order: 0
  };
}

export async function listCmsServices(): Promise<CmsServiceRecord[]> {
  if (isDirectusConfigured()) {
    const rows = await directusReadItems<UnknownRecord>("services", { sort: "display_order,title" });
    return rows.map((row) => normalize(row, "wordpress"));
  }
  if (!isSupabaseAdminConfigured()) return [];
  const supabase = createSupabaseAdminClient()!;
  const { data, error } = await supabase.from("services").select("*").is("deleted_at", null).order("display_order").order("title");
  if (error) throw error;
  return (data || []).map((row) => normalize(row as UnknownRecord, "supabase"));
}

export async function getCmsService(identifier: string) {
  return (await listCmsServices()).find((service) => service.id === identifier || service.slug === identifier) || null;
}

export async function createCmsService(input: CmsServiceInput) {
  if (isDirectusConfigured()) {
    return normalize(await directusCreateItem<CmsServiceInput, UnknownRecord>("services", input), "wordpress");
  }
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase CMS is not configured.");
  const { data, error } = await supabase.from("services").insert(input).select("*").single();
  if (error) throw error;
  return normalize(data as UnknownRecord, "supabase");
}

export async function updateCmsService(identifier: string, input: CmsServiceInput) {
  const existing = await getCmsService(identifier);
  if (!existing) throw new Error("Service not found.");
  if (isDirectusConfigured()) {
    return normalize(await directusUpdateItem<CmsServiceInput, UnknownRecord>("services", existing.id, input), "wordpress");
  }
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase CMS is not configured.");
  const { data, error } = await supabase.from("services").update(input).eq("id", existing.id).select("*").single();
  if (error) throw error;
  return normalize(data as UnknownRecord, "supabase");
}

export async function archiveCmsService(identifier: string) {
  const existing = await getCmsService(identifier);
  if (!existing) throw new Error("Service not found.");
  const payload = { is_active: false, deleted_at: new Date().toISOString() };
  if (isDirectusConfigured()) {
    await directusUpdateItem("services", existing.id, payload);
    return;
  }
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase CMS is not configured.");
  const { error } = await supabase.from("services").update(payload).eq("id", existing.id);
  if (error) throw error;
}
