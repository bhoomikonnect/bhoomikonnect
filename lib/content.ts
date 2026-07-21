import { cache } from "react";
import { currentWorks, marketplaceServices, materials, serviceProviders } from "@/lib/catalog";
import { directusAssetUrl, directusReadItems, isDirectusConfigured } from "@/lib/directus";
import type { CurrentWork, MarketplaceService, Material, ServiceFamily, ServiceProvider } from "@/types/marketplace";

type RecordValue = Record<string, unknown>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function number(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function boolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : value === "true" ? true : fallback;
}

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : value.split(",").map((item) => item.trim());
  } catch {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
}

async function withFallback<T>(read: () => Promise<T>, fallback: T) {
  if (!isDirectusConfigured()) return fallback;
  try {
    return await read();
  } catch (error) {
    console.warn("Directus content fallback", error);
    return fallback;
  }
}

export const getServices = cache(async (): Promise<MarketplaceService[]> => withFallback(async () => {
  const records = await directusReadItems<RecordValue>("services", { "filter[is_active][_eq]": true, sort: "display_order,title" });
  return records.map((record) => ({
    id: text(record.slug, text(record.id)),
    directusId: text(record.id),
    title: text(record.title, "Service"),
    slug: text(record.slug, "service"),
    family: text(record.family, "maintenance") as ServiceFamily,
    summary: text(record.summary),
    description: text(record.description),
    startingPrice: number(record.starting_price),
    priceLabel: text(record.price_label, "starting estimate"),
    timeline: text(record.timeline, "On request"),
    features: list(record.features),
    deliverables: list(record.deliverables),
    packages: Array.isArray(record.packages) ? record.packages as MarketplaceService["packages"] : [],
    serviceLocations: list(record.service_locations),
    faq: Array.isArray(record.faq) ? record.faq as MarketplaceService["faq"] : [],
    image: directusAssetUrl(record.cover_image) || "/images/bhoomikonnect-hero.png",
    featured: boolean(record.is_featured),
    active: boolean(record.is_active, true)
  }));
}, marketplaceServices));

export async function getServicesByFamily(family: ServiceFamily) {
  return (await getServices()).filter((service) => service.family === family && service.active);
}

export async function getService(family: ServiceFamily, slug: string) {
  return (await getServices()).find((service) => service.family === family && service.slug === slug);
}

export const getServiceProviders = cache(async (): Promise<ServiceProvider[]> => withFallback(async () => {
  const records = await directusReadItems<RecordValue>("service_providers", { "filter[is_active][_eq]": true, sort: "-is_verified,name" });
  return records.map((record) => ({
    id: text(record.slug, text(record.id)), directusId: text(record.id), name: text(record.name), slug: text(record.slug),
    companyName: text(record.company_name, text(record.name)), providerType: text(record.provider_type, "Service Provider"),
    serviceFamilies: list(record.service_families) as ServiceFamily[], services: list(record.services), experience: number(record.experience),
    city: text(record.city), serviceAreas: list(record.service_areas), phone: text(record.phone), whatsapp: text(record.whatsapp),
    email: text(record.email), description: text(record.description), skills: list(record.skills), completedJobs: number(record.completed_jobs),
    startingPrice: number(record.starting_price), rating: number(record.rating, 4.5), reviewCount: number(record.review_count),
    availability: text(record.availability, "Bookings open"), languages: list(record.languages), verified: boolean(record.is_verified),
    image: directusAssetUrl(record.profile_image) || "/images/properties/apartment-grove.png"
  }));
}, serviceProviders));

export const getMaterials = cache(async (): Promise<Material[]> => withFallback(async () => {
  const records = await directusReadItems<RecordValue>("materials", { "filter[is_active][_eq]": true, sort: "-is_featured,name" });
  return records.map((record) => ({
    id: text(record.slug, text(record.id)), directusId: text(record.id), name: text(record.name), slug: text(record.slug),
    category: text(record.category), brand: text(record.brand), description: text(record.description), unit: text(record.unit, "unit"),
    price: number(record.price), minimumOrder: text(record.minimum_order), availability: text(record.availability, "Quote on request"),
    deliveryLocations: list(record.delivery_locations), specifications: list(record.specifications),
    image: directusAssetUrl(record.cover_image) || "/images/properties/plotted-habitat.png", featured: boolean(record.is_featured)
  }));
}, materials));

export const getCurrentWorks = cache(async (): Promise<CurrentWork[]> => withFallback(async () => {
  const records = await directusReadItems<RecordValue>("current_works", { "filter[is_active][_eq]": true, sort: "-start_date" });
  return records.map((record) => ({
    id: text(record.slug, text(record.id)), directusId: text(record.id), title: text(record.title), slug: text(record.slug),
    category: text(record.category, "Construction") as CurrentWork["category"], location: text(record.location),
    startDate: text(record.start_date), expectedCompletion: text(record.expected_completion), status: text(record.status, "Ongoing") as CurrentWork["status"],
    progress: number(record.progress), description: text(record.description), image: directusAssetUrl(record.cover_image) || "/images/properties/villa-enclave.png",
    gallery: list(record.gallery).map(directusAssetUrl).filter(Boolean), featured: boolean(record.is_featured)
  }));
}, currentWorks));
