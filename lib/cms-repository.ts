import "server-only";
import { randomUUID } from "node:crypto";
import { createEmptyPage, createEmptyProperty } from "@/lib/cms-defaults";
import {
  directusCreateItem,
  directusDeleteItem,
  directusReadItems,
  directusUpdateItem,
  isDirectusConfigured
} from "@/lib/directus";
import { readLocalCmsStore, updateLocalCmsStore } from "@/lib/local-cms";
import { getProperties } from "@/lib/marketplace";
import type { CmsPageInput, CmsPageRecord, CmsPageSection, CmsPropertyInput, CmsPropertyRecord } from "@/types/cms";
import type { Property } from "@/types/marketplace";

type UnknownRecord = Record<string, unknown>;

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : value === null || value === undefined ? fallback : String(value);
}

function numberValue(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function nullableNumber(value: unknown) {
  return value === null || value === undefined || value === "" ? null : numberValue(value);
}

function booleanValue(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1" || value === 1) return true;
  if (value === "false" || value === "0" || value === 0) return false;
  return fallback;
}

function stringArray(value: unknown) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : value.split(",").map((item) => item.trim()).filter(Boolean);
  } catch {
    return value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean);
  }
}

function nearbyArray(value: unknown): CmsPropertyInput["nearby"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is UnknownRecord => Boolean(item) && typeof item === "object")
    .map((item) => ({ label: stringValue(item.label), distance: stringValue(item.distance), type: stringValue(item.type, "Business Hub") }));
}

export function normalizeCmsProperty(record: UnknownRecord, source: CmsPropertyRecord["source"] = "directus"): CmsPropertyRecord {
  const defaults = createEmptyProperty();
  const now = new Date().toISOString();

  return {
    ...defaults,
    title: stringValue(record.title), slug: stringValue(record.slug), property_type: stringValue(record.property_type, defaults.property_type),
    category: stringValue(record.category, defaults.category),
    listing_purpose: stringValue(record.listing_purpose ?? record.sale_rent, "Sale") === "Rent" ? "Rent" : "Sale",
    developer_id: stringValue(typeof record.developer_id === "object" && record.developer_id ? (record.developer_id as UnknownRecord).id : record.developer_id),
    developer_name: stringValue(record.developer_name ?? (typeof record.developer_id === "object" && record.developer_id ? (record.developer_id as UnknownRecord).name : "")),
    developer_slug: stringValue(record.developer_slug ?? (typeof record.developer_id === "object" && record.developer_id ? (record.developer_id as UnknownRecord).slug : "")),
    project_name: stringValue(record.project_name), owner_name: stringValue(record.owner_name),
    property_status: stringValue(record.property_status, defaults.property_status), country: stringValue(record.country, "India"),
    state: stringValue(record.state), district: stringValue(record.district), city: stringValue(record.city),
    area_name: stringValue(record.area_name), locality: stringValue(record.locality), address: stringValue(record.address ?? record.location),
    landmark: stringValue(record.landmark), pincode: stringValue(record.pincode), latitude: numberValue(record.latitude), longitude: numberValue(record.longitude),
    total_price: numberValue(record.total_price ?? record.price), price_per_sq_ft: numberValue(record.price_per_sq_ft),
    price_per_sq_yd: numberValue(record.price_per_sq_yd), negotiable: booleanValue(record.negotiable),
    booking_amount: numberValue(record.booking_amount), maintenance_charges: numberValue(record.maintenance_charges),
    security_deposit: numberValue(record.security_deposit), rent_amount: numberValue(record.rent_amount),
    total_area: numberValue(record.total_area ?? record.area), area_unit: stringValue(record.area_unit, "sq.ft") === "sq.yd" ? "sq.yd" : "sq.ft",
    plot_area: numberValue(record.plot_area), built_up_area: numberValue(record.built_up_area), carpet_area: numberValue(record.carpet_area),
    bedrooms: nullableNumber(record.bedrooms), bathrooms: nullableNumber(record.bathrooms), balconies: nullableNumber(record.balconies),
    parking: stringValue(record.parking, defaults.parking), total_floors: nullableNumber(record.total_floors), property_floor: nullableNumber(record.property_floor),
    facing: stringValue(record.facing, defaults.facing), road_width: stringValue(record.road_width), furnishing: stringValue(record.furnishing, defaults.furnishing),
    property_age: stringValue(record.property_age, defaults.property_age), construction_status: stringValue(record.construction_status, defaults.construction_status),
    possession_date: stringValue(record.possession_date), rera_number: stringValue(record.rera_number), dtcp_approval: booleanValue(record.dtcp_approval),
    hmda_approval: booleanValue(record.hmda_approval), municipality_approval: booleanValue(record.municipality_approval),
    panchayat_approval: booleanValue(record.panchayat_approval), legal_verification: booleanValue(record.legal_verification),
    bank_loan_available: booleanValue(record.bank_loan_available), approvals: stringArray(record.approvals),
    description: stringValue(record.description), amenities: stringArray(record.amenities), nearby: nearbyArray(record.nearby),
    cover_image: stringValue(record.cover_image), gallery: stringArray(record.gallery), floor_plans: stringArray(record.floor_plans),
    layout_plan: stringValue(record.layout_plan), master_plan: stringValue(record.master_plan), brochure_url: stringValue(record.brochure_url),
    video_url: stringValue(record.video_url), virtual_tour_url: stringValue(record.virtual_tour_url), seo_title: stringValue(record.seo_title),
    meta_description: stringValue(record.meta_description), keywords: stringArray(record.keywords), canonical_url: stringValue(record.canonical_url),
    og_image: stringValue(record.og_image), image_alt_text: stringValue(record.image_alt_text),
    publishing_status: (["draft", "pending", "approved", "rejected", "published", "archived"].includes(stringValue(record.publishing_status))
      ? stringValue(record.publishing_status) : booleanValue(record.active, true) ? "published" : "draft") as CmsPropertyRecord["publishing_status"],
    featured: booleanValue(record.featured), verified: booleanValue(record.verified), active: booleanValue(record.active, true),
    id: stringValue(record.id, randomUUID()), created_at: stringValue(record.created_at, now), updated_at: stringValue(record.updated_at, now), source
  };
}

function propertyToCmsRecord(property: Property): CmsPropertyRecord {
  return normalizeCmsProperty({
    id: property.id, title: property.title, slug: property.slug, property_type: property.propertyType, category: property.category,
    listing_purpose: property.saleType, developer_name: property.developerName, developer_slug: property.developerSlug,
    project_name: property.projectName, property_status: property.status, city: property.location.city, area_name: property.location.area,
    address: property.location.address, latitude: property.location.latitude, longitude: property.location.longitude,
    total_price: property.price, price_per_sq_ft: property.pricePerSqFt, booking_amount: property.bookingAmount,
    total_area: property.area, area_unit: property.areaUnit, bedrooms: property.bedrooms, bathrooms: property.bathrooms,
    balconies: property.balconies, parking: property.parking, facing: property.facing, road_width: property.roadWidth,
    approvals: property.approvals, rera_number: property.reraNumber, possession_date: property.possessionDate,
    amenities: property.amenities, description: property.description, cover_image: property.gallery[0], gallery: property.gallery.slice(1),
    floor_plans: property.floorPlans, video_url: property.videoUrl, brochure_url: property.brochureUrl,
    seo_title: property.seoTitle, meta_description: property.metaDescription, keywords: property.keywords,
    featured: property.featuredProperty, verified: property.verifiedProperty, active: property.active, publishing_status: "published",
    nearby: property.nearby
  }, "demo");
}

function directusPropertyPayload(property: CmsPropertyInput) {
  return {
    title: property.title, slug: property.slug, property_type: property.property_type, category: property.category,
    developer_id: property.developer_id || undefined, developer_slug: property.developer_slug || undefined,
    project_name: property.project_name, property_status: property.property_status, sale_rent: property.listing_purpose,
    listing_purpose: property.listing_purpose, price: property.total_price, total_price: property.total_price,
    price_per_sq_ft: property.price_per_sq_ft, price_per_sq_yd: property.price_per_sq_yd, booking_amount: property.booking_amount,
    area: property.total_area, area_unit: property.area_unit, country: property.country, state: property.state, district: property.district,
    city: property.city, area_name: property.area_name, locality: property.locality, address: property.address,
    landmark: property.landmark, pincode: property.pincode, latitude: property.latitude, longitude: property.longitude,
    negotiable: property.negotiable, maintenance_charges: property.maintenance_charges, security_deposit: property.security_deposit,
    plot_area: property.plot_area, built_up_area: property.built_up_area, carpet_area: property.carpet_area,
    bedrooms: property.bedrooms, bathrooms: property.bathrooms, balconies: property.balconies, parking: property.parking,
    total_floors: property.total_floors, property_floor: property.property_floor, facing: property.facing, road_width: property.road_width,
    furnishing: property.furnishing, property_age: property.property_age, construction_status: property.construction_status,
    possession_date: property.possession_date || null, rera_number: property.rera_number, approvals: property.approvals,
    dtcp_approval: property.dtcp_approval, hmda_approval: property.hmda_approval, municipality_approval: property.municipality_approval,
    panchayat_approval: property.panchayat_approval, legal_verification: property.legal_verification,
    bank_loan_available: property.bank_loan_available, amenities: property.amenities, description: property.description,
    nearby: property.nearby, cover_image: property.cover_image, gallery: property.gallery, floor_plans: property.floor_plans,
    layout_plan: property.layout_plan, master_plan: property.master_plan, brochure_url: property.brochure_url,
    video_url: property.video_url, virtual_tour_url: property.virtual_tour_url, seo_title: property.seo_title,
    meta_description: property.meta_description, keywords: property.keywords, canonical_url: property.canonical_url,
    og_image: property.og_image, image_alt_text: property.image_alt_text, publishing_status: property.publishing_status,
    featured: property.featured, verified: property.verified, active: property.active
  };
}

export async function listCmsProperties() {
  if (isDirectusConfigured()) {
    const records = await directusReadItems<UnknownRecord>("properties", { fields: "*,developer_id.id,developer_id.name,developer_id.slug", sort: "-updated_at" });
    return records.map((record) => normalizeCmsProperty(record, "directus"));
  }

  const [store, publicProperties] = await Promise.all([readLocalCmsStore(), getProperties()]);
  const records = new Map(publicProperties.map((property) => [property.slug, propertyToCmsRecord(property)]));
  store.properties.forEach((property) => records.set(property.slug, { ...property, source: "local" }));
  return [...records.values()].sort((left, right) => right.updated_at.localeCompare(left.updated_at));
}

export async function getCmsProperty(identifier: string) {
  return (await listCmsProperties()).find((property) => property.id === identifier || property.slug === identifier) || null;
}

export async function createCmsProperty(input: CmsPropertyInput) {
  const now = new Date().toISOString();
  if (isDirectusConfigured()) {
    const record = await directusCreateItem<Record<string, unknown>, UnknownRecord>("properties", directusPropertyPayload(input));
    return normalizeCmsProperty(record, "directus");
  }

  const record: CmsPropertyRecord = { ...input, id: randomUUID(), created_at: now, updated_at: now, source: "local" };
  await updateLocalCmsStore((store) => {
    if (store.properties.some((property) => property.slug === input.slug)) throw new Error("A property with this slug already exists.");
    store.properties.unshift(record);
    store.deleted_property_slugs = store.deleted_property_slugs.filter((slug) => slug !== input.slug);
  });
  return record;
}

export async function updateCmsProperty(identifier: string, input: CmsPropertyInput) {
  const existing = await getCmsProperty(identifier);
  if (!existing) throw new Error("Property not found.");
  if (isDirectusConfigured()) {
    const record = await directusUpdateItem<Record<string, unknown>, UnknownRecord>("properties", existing.id, directusPropertyPayload(input));
    return normalizeCmsProperty(record, "directus");
  }

  const record: CmsPropertyRecord = { ...input, id: existing.id, created_at: existing.created_at, updated_at: new Date().toISOString(), source: "local" };
  await updateLocalCmsStore((store) => {
    if (store.properties.some((property) => property.slug === input.slug && property.id !== existing.id)) throw new Error("A property with this slug already exists.");
    store.properties = store.properties.filter((property) => property.id !== existing.id && property.slug !== existing.slug);
    store.properties.unshift(record);
    store.deleted_property_slugs = store.deleted_property_slugs.filter((slug) => slug !== input.slug && slug !== existing.slug);
  });
  return record;
}

export async function deleteCmsProperty(identifier: string) {
  const existing = await getCmsProperty(identifier);
  if (!existing) throw new Error("Property not found.");
  if (isDirectusConfigured()) {
    await directusUpdateItem("properties", existing.id, { active: false, publishing_status: "archived", deleted_at: new Date().toISOString() });
    return;
  }

  await updateLocalCmsStore((store) => {
    store.properties = store.properties.filter((property) => property.id !== existing.id && property.slug !== existing.slug);
    if (!store.deleted_property_slugs.includes(existing.slug)) store.deleted_property_slugs.push(existing.slug);
  });
}

function normalizeSection(record: UnknownRecord, index = 0): CmsPageSection {
  const content = record.content && typeof record.content === "object" ? record.content as UnknownRecord : record;
  const blockType = stringValue(record.block_type ?? content.block_type, "text");
  return {
    id: stringValue(record.id, `section-${index}`),
    block_type: (["hero", "text", "image", "cta", "statistics", "faq", "gallery", "contact"].includes(blockType) ? blockType : "text") as CmsPageSection["block_type"],
    eyebrow: stringValue(content.eyebrow), heading: stringValue(content.heading), body: stringValue(content.body), image: stringValue(content.image),
    image_alt: stringValue(content.image_alt), cta_label: stringValue(content.cta_label), cta_url: stringValue(content.cta_url), items: stringArray(content.items)
  };
}

function normalizePage(record: UnknownRecord, sections: UnknownRecord[] = [], source: CmsPageRecord["source"] = "directus"): CmsPageRecord {
  const defaults = createEmptyPage();
  const status = stringValue(record.status, "draft");
  const now = new Date().toISOString();
  return {
    ...defaults, id: stringValue(record.id, randomUUID()), title: stringValue(record.title), slug: stringValue(record.slug),
    template: stringValue(record.template, "standard"), status: (["draft", "published", "archived"].includes(status) ? status : "draft") as CmsPageRecord["status"],
    seo_title: stringValue(record.seo_title), meta_description: stringValue(record.meta_description), canonical_url: stringValue(record.canonical_url),
    sections: sections.map(normalizeSection), created_at: stringValue(record.created_at, now), updated_at: stringValue(record.updated_at, now), source
  };
}

export async function listCmsPages() {
  if (isDirectusConfigured()) {
    const [pages, sections] = await Promise.all([
      directusReadItems<UnknownRecord>("cms_pages", { fields: "*", sort: "-updated_at" }),
      directusReadItems<UnknownRecord>("cms_sections", { fields: "*", sort: "display_order" })
    ]);
    return pages.map((page) => normalizePage(page, sections.filter((section) => stringValue(typeof section.page_id === "object" && section.page_id ? (section.page_id as UnknownRecord).id : section.page_id) === stringValue(page.id)), "directus"));
  }
  return (await readLocalCmsStore()).pages.map((page) => ({ ...page, source: "local" as const }));
}

export async function getCmsPage(identifier: string) {
  return (await listCmsPages()).find((page) => page.id === identifier || page.slug === identifier) || null;
}

export async function getPublishedCmsPages() {
  try {
    return (await listCmsPages()).filter((page) => page.status === "published");
  } catch (error) {
    console.warn(error);
    return (await readLocalCmsStore()).pages.filter((page) => page.status === "published");
  }
}

export async function getPublishedCmsPage(slug: string) {
  return (await getPublishedCmsPages()).find((page) => page.slug === slug) || null;
}

export async function createCmsPage(input: CmsPageInput) {
  const now = new Date().toISOString();
  if (isDirectusConfigured()) {
    const page = await directusCreateItem<Record<string, unknown>, UnknownRecord>("cms_pages", {
      title: input.title, slug: input.slug, template: input.template, status: input.status,
      seo_title: input.seo_title, meta_description: input.meta_description, canonical_url: input.canonical_url
    });
    const pageId = stringValue(page.id);
    const sections = await Promise.all(input.sections.map((section, index) => directusCreateItem<Record<string, unknown>, UnknownRecord>("cms_sections", {
      page_id: pageId, block_type: section.block_type, content: section, display_order: index, is_active: true
    })));
    return normalizePage(page, sections, "directus");
  }

  const record: CmsPageRecord = { ...input, id: randomUUID(), created_at: now, updated_at: now, source: "local" };
  await updateLocalCmsStore((store) => {
    if (store.pages.some((page) => page.slug === input.slug)) throw new Error("A page with this slug already exists.");
    store.pages.unshift(record);
  });
  return record;
}

export async function updateCmsPage(identifier: string, input: CmsPageInput) {
  const existing = await getCmsPage(identifier);
  if (!existing) throw new Error("Page not found.");
  if (isDirectusConfigured()) {
    const page = await directusUpdateItem<Record<string, unknown>, UnknownRecord>("cms_pages", existing.id, {
      title: input.title, slug: input.slug, template: input.template, status: input.status,
      seo_title: input.seo_title, meta_description: input.meta_description, canonical_url: input.canonical_url
    });
    await Promise.all(existing.sections.map((section) => directusDeleteItem("cms_sections", section.id)));
    const sections = await Promise.all(input.sections.map((section, index) => directusCreateItem<Record<string, unknown>, UnknownRecord>("cms_sections", {
      page_id: existing.id, block_type: section.block_type, content: section, display_order: index, is_active: true
    })));
    return normalizePage(page, sections, "directus");
  }

  const record: CmsPageRecord = { ...input, id: existing.id, created_at: existing.created_at, updated_at: new Date().toISOString(), source: "local" };
  await updateLocalCmsStore((store) => {
    if (store.pages.some((page) => page.slug === input.slug && page.id !== existing.id)) throw new Error("A page with this slug already exists.");
    store.pages = store.pages.filter((page) => page.id !== existing.id);
    store.pages.unshift(record);
  });
  return record;
}

export async function deleteCmsPage(identifier: string) {
  const existing = await getCmsPage(identifier);
  if (!existing) throw new Error("Page not found.");
  if (isDirectusConfigured()) {
    await directusUpdateItem("cms_pages", existing.id, { status: "archived", deleted_at: new Date().toISOString() });
    return;
  }
  await updateLocalCmsStore((store) => { store.pages = store.pages.filter((page) => page.id !== existing.id); });
}
