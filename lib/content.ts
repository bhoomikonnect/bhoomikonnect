import { cache } from "react";
import {
  currentWorks,
  marketplaceServices,
  materials,
  serviceProviders,
  testimonials as localTestimonials
} from "@/lib/catalog";
import { isDemoContentEnabled } from "@/lib/demo";
import { directusAssetUrl, directusReadItems, isDirectusConfigured } from "@/lib/directus";
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type {
  CurrentWork,
  MarketplaceService,
  Material,
  ServiceFamily,
  ServiceProvider,
  Testimonial
} from "@/types/marketplace";

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

function record(value: unknown): RecordValue | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : undefined;
}

async function readCollection<T>(
  directusRead: () => Promise<T[]>,
  supabaseRead: () => Promise<T[]>,
  localFallback: T[]
) {
  if (isDirectusConfigured()) {
    try {
      return await directusRead();
    } catch (error) {
      console.warn("Directus content read failed", error);
    }
  }

  if (isSupabaseAdminConfigured()) {
    try {
      return await supabaseRead();
    } catch (error) {
      console.warn("Supabase content read failed", error);
      return [];
    }
  }

  return !isDirectusConfigured() && isDemoContentEnabled() ? localFallback : [];
}

function mapService(item: RecordValue): MarketplaceService {
  return {
    id: text(item.slug, text(item.id)),
    directusId: text(item.id),
    title: text(item.title, "Service"),
    slug: text(item.slug, "service"),
    family: text(item.family, "maintenance") as ServiceFamily,
    summary: text(item.summary),
    description: text(item.description),
    startingPrice: number(item.starting_price),
    priceLabel: text(item.price_label, "starting estimate"),
    timeline: text(item.timeline, "On request"),
    features: list(item.features),
    deliverables: list(item.deliverables),
    packages: Array.isArray(item.packages) ? item.packages as MarketplaceService["packages"] : [],
    serviceLocations: list(item.service_locations),
    faq: Array.isArray(item.faq) ? item.faq as MarketplaceService["faq"] : [],
    image: directusAssetUrl(item.cover_image) || "/images/bhoomikonnect-hero.png",
    featured: boolean(item.is_featured),
    active: boolean(item.is_active, true)
  };
}

function mapProvider(item: RecordValue): ServiceProvider {
  return {
    id: text(item.slug, text(item.id)), directusId: text(item.id), name: text(item.name), slug: text(item.slug),
    companyName: text(item.company_name, text(item.name)), providerType: text(item.provider_type, "Service Provider"),
    serviceFamilies: list(item.service_families) as ServiceFamily[], services: list(item.services), experience: number(item.experience),
    city: text(item.city), serviceAreas: list(item.service_areas), phone: text(item.phone), whatsapp: text(item.whatsapp),
    email: text(item.email), description: text(item.description), skills: list(item.skills), completedJobs: number(item.completed_jobs),
    startingPrice: number(item.starting_price), rating: number(item.rating), reviewCount: number(item.review_count),
    availability: text(item.availability, "Contact for availability"), languages: list(item.languages), verified: boolean(item.is_verified),
    image: directusAssetUrl(item.profile_image) || "/images/properties/apartment-grove.png"
  };
}

function mapMaterial(item: RecordValue): Material {
  const category = record(item.category_id);
  return {
    id: text(item.slug, text(item.id)), directusId: text(item.id), name: text(item.name), slug: text(item.slug),
    category: text(item.category, text(category?.name)), brand: text(item.brand), description: text(item.description), unit: text(item.unit, "unit"),
    price: number(item.price), minimumOrder: text(item.minimum_order), availability: text(item.availability, "Quote on request"),
    deliveryLocations: list(item.delivery_locations), specifications: list(item.specifications),
    image: directusAssetUrl(item.cover_image) || "/images/properties/plotted-habitat.png", featured: boolean(item.is_featured)
  };
}

function mapCurrentWork(item: RecordValue): CurrentWork {
  const media = Array.isArray(item.work_media) ? item.work_media : [];
  const gallery = list(item.gallery)
    .concat(media.map((entry) => text(record(entry)?.file_path)))
    .map(directusAssetUrl)
    .filter(Boolean);

  return {
    id: text(item.slug, text(item.id)), directusId: text(item.id), title: text(item.title), slug: text(item.slug),
    category: text(item.category, "Construction") as CurrentWork["category"], location: text(item.location),
    startDate: text(item.start_date), expectedCompletion: text(item.expected_completion), status: text(item.status, "Ongoing") as CurrentWork["status"],
    progress: number(item.progress), description: text(item.description), image: directusAssetUrl(item.cover_image) || "/images/properties/villa-enclave.png",
    gallery, featured: boolean(item.is_featured)
  };
}

function mapTestimonial(item: RecordValue): Testimonial {
  return {
    id: text(item.id, item.name ? `testimonial-${text(item.name).toLowerCase().replace(/\s+/g, "-")}` : "testimonial"),
    name: text(item.name),
    role: text(item.role),
    quote: text(item.quote),
    rating: number(item.rating)
  };
}

export const getServices = cache(async (): Promise<MarketplaceService[]> => readCollection(
  async () => {
    const records = await directusReadItems<RecordValue>("services", { "filter[is_active][_eq]": true, sort: "display_order,title" });
    return records.map(mapService);
  },
  async () => {
    const supabase = createSupabaseAdminClient()!;
    const { data, error } = await supabase.from("services").select("*").eq("is_active", true).is("deleted_at", null).order("display_order").order("title");
    if (error) throw error;
    return (data || []).map((item) => mapService(item as RecordValue));
  },
  marketplaceServices
));

export async function getServicesByFamily(family: ServiceFamily) {
  return (await getServices()).filter((service) => service.family === family && service.active);
}

export async function getService(family: ServiceFamily, slug: string) {
  return (await getServices()).find((service) => service.family === family && service.slug === slug);
}

export const getServiceProviders = cache(async (): Promise<ServiceProvider[]> => readCollection(
  async () => {
    const records = await directusReadItems<RecordValue>("service_providers", {
      "filter[is_active][_eq]": true,
      "filter[is_verified][_eq]": true,
      sort: "-is_verified,name"
    });
    return records.map(mapProvider);
  },
  async () => {
    const supabase = createSupabaseAdminClient()!;
    const { data, error } = await supabase.from("service_providers").select("*").eq("is_active", true).eq("is_verified", true).order("name");
    if (error) throw error;
    return (data || []).map((item) => mapProvider(item as RecordValue));
  },
  serviceProviders
));

export const getMaterials = cache(async (): Promise<Material[]> => readCollection(
  async () => {
    const records = await directusReadItems<RecordValue>("materials", { "filter[is_active][_eq]": true, sort: "-is_featured,name" });
    return records.map(mapMaterial);
  },
  async () => {
    const supabase = createSupabaseAdminClient()!;
    const { data, error } = await supabase
      .from("materials")
      .select("*,category_id:material_categories(name)")
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("is_featured", { ascending: false })
      .order("name");
    if (error) throw error;
    return (data || []).map((item) => mapMaterial(item as RecordValue));
  },
  materials
));

export const getCurrentWorks = cache(async (): Promise<CurrentWork[]> => readCollection(
  async () => {
    const records = await directusReadItems<RecordValue>("current_works", { "filter[is_active][_eq]": true, sort: "-start_date" });
    return records.map(mapCurrentWork);
  },
  async () => {
    const supabase = createSupabaseAdminClient()!;
    const { data, error } = await supabase
      .from("current_works")
      .select("*,work_media(file_path,display_order)")
      .eq("is_active", true)
      .order("start_date", { ascending: false });
    if (error) throw error;
    return (data || []).map((item) => mapCurrentWork(item as RecordValue));
  },
  currentWorks
));

export const getTestimonials = cache(async (): Promise<Testimonial[]> => readCollection(
  async () => {
    const records = await directusReadItems<RecordValue>("testimonials", { "filter[is_active][_eq]": true, sort: "display_order" });
    return records.map(mapTestimonial);
  },
  async () => {
    const supabase = createSupabaseAdminClient()!;
    const { data, error } = await supabase.from("testimonials").select("*").eq("is_active", true).order("display_order");
    if (error) throw error;
    return (data || []).map((item) => mapTestimonial(item as RecordValue));
  },
  localTestimonials
));
