import { cache } from "react";
import { directusAssetUrl, directusCreateItem, directusReadItems, isDirectusConfigured } from "@/lib/directus";
import {
  cities as fallbackCities,
  developers as fallbackDevelopers,
  getDeveloperBySlug as getFallbackDeveloperBySlug,
  getPropertiesByDeveloper as getFallbackPropertiesByDeveloper,
  getPropertiesByType as getFallbackPropertiesByType,
  getPropertyBySlug as getFallbackPropertyBySlug,
  getRelatedProperties as getFallbackRelatedProperties,
  properties as fallbackProperties
} from "@/lib/data";
import { readLocalCmsStore } from "@/lib/local-cms";
import type { Category, City, Developer, NearbyPlace, Property, PropertyStatus, PropertyType, SaleType } from "@/types/marketplace";

type DirectusRecord = Record<string, unknown>;

const imageFallbackByType: Record<PropertyType, string> = {
  Flat: "/images/properties/apartment-grove.png",
  Villa: "/images/properties/villa-enclave.png",
  Plot: "/images/properties/plotted-habitat.png",
  Commercial: "/images/bhoomikonnect-hero.png",
  "Agricultural Land": "/images/properties/plotted-habitat.png",
  "Farm Land": "/images/properties/plotted-habitat.png",
  "Independent House": "/images/properties/villa-enclave.png",
  Office: "/images/bhoomikonnect-hero.png",
  Shop: "/images/bhoomikonnect-hero.png",
  Warehouse: "/images/bhoomikonnect-hero.png",
  Industrial: "/images/bhoomikonnect-hero.png"
};

const fallbackMarketplaceDevelopers: Developer[] = [
  ...fallbackDevelopers,
  {
    id: "dev-05", name: "Dakshin Living Works", slug: "dakshin-living-works", logoInitials: "DL",
    profile: "Dakshin Living Works is an original demo developer focused on efficient homes, serviced plots, and transparent delivery milestones.",
    completedProjects: 11, ongoingProjects: 4, upcomingProjects: 2,
    contact: { phone: "+91 90000 00000", email: "hello@dakshin.example", website: "https://dakshin.example" },
    socials: { linkedin: "#", instagram: "#", youtube: "#" }, rating: 4.6, reviews: 128,
    established: "2014", headquarters: "Vijayawada", specialties: ["Efficient homes", "Serviced plots", "Clear milestones"],
    projectSlugs: [], verified: true
  }
];

const fallbackMarketplaceProperties: Property[] = [
  ...fallbackProperties,
  ...fallbackProperties.slice(0, 7).map((property, index) => ({
    ...property,
    id: `prop-${String(index + 9).padStart(2, "0")}`,
    title: `${["Garden Rental Homes", "Canal View Residences", "Orchard Farm Parcel", "City Edge Workspace", "Lakefront Resale Homes", "Metro Rental Suites", "Industrial Growth Plot"][index]}`,
    slug: `${property.slug}-demo-${index + 2}`,
    projectName: `${property.projectName} ${index % 2 ? "Annex" : "Collection"}`,
    saleType: index === 0 || index === 5 ? "Rent" as const : "Sale" as const,
    propertyType: index === 2 ? "Farm Land" as const : index === 6 ? "Industrial" as const : property.propertyType,
    category: index === 2 ? "Agricultural" as const : index === 6 ? "Industrial" as const : property.category,
    price: index === 0 || index === 5 ? 42000 + index * 3500 : Math.round(property.price * (0.82 + index * 0.03)),
    featuredProperty: index < 2,
    seoTitle: `${property.title} ${index + 2} | Demo Property | BhoomiKonnect`,
    metaDescription: `Original BhoomiKonnect demo listing for ${property.propertyType.toLowerCase()} discovery, comparison, and direct enquiry.`
  }))
];

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value === "true" || value === "1";
  }

  return fallback;
}

function asArray(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : value.split(",").map((item) => item.trim()).filter(Boolean);
    } catch {
      return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }

  return [];
}

function asStringArray(value: unknown) {
  return asArray(value).map((item) => String(item)).filter(Boolean);
}

function relation(record: DirectusRecord, key: string) {
  const value = record[key];
  return value && typeof value === "object" ? (value as DirectusRecord) : undefined;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "BK";
}

function normalizeNearby(value: unknown): NearbyPlace[] {
  return asArray(value)
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as DirectusRecord;
      const type = asString(record.type, "Business Hub") as NearbyPlace["type"];

      return {
        label: asString(record.label),
        distance: asString(record.distance),
        type: ["School", "Hospital", "Metro", "Airport", "Business Hub"].includes(type) ? type : "Business Hub"
      };
    })
    .filter(Boolean) as NearbyPlace[];
}

function mapDeveloper(record: DirectusRecord): Developer {
  const name = asString(record.name, "Verified Developer");

  return {
    id: asString(record.slug, asString(record.id, name)),
    directusId: asString(record.id),
    name,
    slug: asString(record.slug, name.toLowerCase().replace(/\s+/g, "-")),
    logoInitials: asString(record.logo_initials ?? record.logoInitials, initials(name)),
    profile: asString(record.profile, "Verified developer profile managed in Directus."),
    completedProjects: asNumber(record.completed_projects ?? record.completedProjects, 0),
    ongoingProjects: asNumber(record.ongoing_projects ?? record.ongoingProjects, 0),
    upcomingProjects: asNumber(record.upcoming_projects ?? record.upcomingProjects, 0),
    contact: {
      phone: asString(record.phone ?? relation(record, "contact")?.phone),
      email: asString(record.email ?? relation(record, "contact")?.email),
      website: asString(record.website ?? relation(record, "contact")?.website, "#")
    },
    socials: {
      linkedin: asString(record.linkedin ?? record.social_linkedin ?? relation(record, "socials")?.linkedin, "#"),
      instagram: asString(record.instagram ?? record.social_instagram ?? relation(record, "socials")?.instagram, "#"),
      youtube: asString(record.youtube ?? record.social_youtube ?? relation(record, "socials")?.youtube, "#")
    },
    rating: asNumber(record.rating, 4.5),
    reviews: asNumber(record.reviews, 0),
    established: asString(record.established, "2020"),
    headquarters: asString(record.headquarters, "India"),
    specialties: asStringArray(record.specialties),
    projectSlugs: asStringArray(record.project_slugs ?? record.projectSlugs),
    verified: asBoolean(record.verified, true)
  };
}

function mapProperty(record: DirectusRecord): Property {
  const developer = relation(record, "developer_id") || relation(record, "developer");
  const developerSlug = asString(
    record.developer_slug ?? record.developerSlug ?? developer?.slug,
    "verified-developer"
  );
  const developerName = asString(developer?.name);
  const propertyType = asString(record.property_type ?? record.propertyType, "Flat") as PropertyType;
  const coverImage = directusAssetUrl(record.cover_image ?? record.coverImage);
  const gallery = [coverImage, ...asArray(record.gallery)
    .map((asset) => directusAssetUrl(asset))
    .filter(Boolean)].filter((asset, index, values) => asset && values.indexOf(asset) === index);
  const fallbackImage = imageFallbackByType[propertyType] || imageFallbackByType.Flat;

  return {
    id: asString(record.slug, asString(record.id, "property")),
    directusId: asString(record.id),
    title: asString(record.title, "Verified Property"),
    slug: asString(record.slug, "verified-property"),
    propertyType,
    category: asString(record.category, "Residential") as Category,
    developerSlug,
    developerName,
    developerLogoInitials: developerName ? initials(developerName) : undefined,
    projectName: asString(record.project_name ?? record.projectName, asString(record.title, "Verified Project")),
    status: asString(record.property_status ?? record.status, "Under Construction") as PropertyStatus,
    saleType: asString(record.sale_rent ?? record.listing_purpose ?? record.saleType, "Sale") as SaleType,
    price: asNumber(record.price ?? record.total_price),
    pricePerSqFt: asNumber(record.price_per_sq_ft ?? record.pricePerSqFt),
    bookingAmount: asNumber(record.booking_amount ?? record.bookingAmount),
    area: asNumber(record.area ?? record.total_area),
    areaUnit: asString(record.area_unit ?? record.areaUnit, "sq.ft") as Property["areaUnit"],
    facing: asString(record.facing, "East"),
    bedrooms: record.bedrooms === null || record.bedrooms === undefined ? null : asNumber(record.bedrooms),
    bathrooms: record.bathrooms === null || record.bathrooms === undefined ? null : asNumber(record.bathrooms),
    balconies: record.balconies === null || record.balconies === undefined ? null : asNumber(record.balconies),
    parking: asString(record.parking, "Available"),
    roadWidth: asString(record.road_width ?? record.roadWidth, "Internal roads"),
    approvals: asStringArray(record.approvals),
    reraNumber: asString(record.rera_number ?? record.reraNumber, "To be updated"),
    possessionDate: asString(record.possession_date ?? record.possessionDate, "To be announced"),
    amenities: asStringArray(record.amenities),
    description: asString(record.description, "Property description managed in Directus."),
    location: {
      city: asString(record.city ?? relation(record, "city")?.name, "India"),
      area: asString(record.area_name ?? record.area_locality ?? record.area_text ?? record.area_slug ?? record.locality ?? record.area_label ?? record.area, "Prime location"),
      address: asString(record.address ?? record.location, "Address managed in Directus"),
      latitude: asNumber(record.latitude),
      longitude: asNumber(record.longitude)
    },
    gallery: gallery.length ? gallery : [fallbackImage],
    floorPlans: asStringArray(record.floor_plans ?? record.floorPlans),
    videoUrl: asString(record.video_url ?? record.videoUrl) || undefined,
    brochureUrl: directusAssetUrl(record.brochure_url ?? record.brochureUrl ?? record.brochure) || undefined,
    seoTitle: asString(record.seo_title ?? record.seoTitle, asString(record.title, "Verified Property")),
    metaDescription: asString(record.meta_description ?? record.metaDescription, asString(record.description, "Verified property on BhoomiKonnect.")),
    keywords: asStringArray(record.keywords),
    featuredProperty: asBoolean(record.featured ?? record.featured_property ?? record.featuredProperty),
    verifiedProperty: asBoolean(record.verified ?? record.verified_property ?? record.verifiedProperty, true),
    active: asBoolean(record.active, true),
    rating: asNumber(record.rating, 4.5),
    nearby: normalizeNearby(record.nearby)
  };
}

function mapCity(record: DirectusRecord): City {
  return {
    id: asString(record.id),
    name: asString(record.name, "City"),
    slug: asString(record.slug, asString(record.name, "city").toLowerCase().replace(/\s+/g, "-")),
    state: asString(record.state, "India"),
    microMarkets: asStringArray(record.micro_markets ?? record.microMarkets),
    avgPrice: asString(record.avg_price ?? record.avgPrice, "On request"),
    activeListings: asNumber(record.active_listings ?? record.activeListings, 0),
    growth: asString(record.growth, "+0%")
  };
}

async function safeDirectus<T>(operation: () => Promise<T>, fallback: T) {
  if (!isDirectusConfigured()) {
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

export const getDevelopers = cache(async () =>
  safeDirectus(
    async () => {
      const records = await directusReadItems<DirectusRecord>("developers", {
        fields: "*",
        "filter[active][_eq]": true,
        sort: "name"
      });

      return records.map(mapDeveloper);
    },
    fallbackMarketplaceDevelopers
  )
);

export const getProperties = cache(async () => {
  if (isDirectusConfigured()) {
    return safeDirectus(
      async () => {
        const records = await directusReadItems<DirectusRecord>("properties", {
          fields: "*,developer_id.id,developer_id.name,developer_id.slug",
          "filter[active][_eq]": true,
          sort: "-featured,title"
        });

        return records.map(mapProperty).filter((property) => property.active);
      },
      fallbackMarketplaceProperties
    );
  }

  const store = await readLocalCmsStore();
  const localProperties = store.properties
    .filter((property) => property.active && property.publishing_status === "published")
    .map((property) => mapProperty(property as unknown as DirectusRecord));
  const hidden = new Set(store.deleted_property_slugs);
  const merged = new Map(
    fallbackMarketplaceProperties
      .filter((property) => !hidden.has(property.slug))
      .map((property) => [property.slug, property])
  );

  localProperties.forEach((property) => merged.set(property.slug, property));
  return [...merged.values()].sort((left, right) => Number(right.featuredProperty) - Number(left.featuredProperty) || left.title.localeCompare(right.title));
});

export const getCities = cache(async () =>
  safeDirectus(
    async () => {
      const records = await directusReadItems<DirectusRecord>("cities", {
        fields: "*",
        "filter[active][_eq]": true,
        sort: "name"
      });

      return records.map(mapCity);
    },
    fallbackCities
  )
);

export async function getDeveloperBySlug(slug: string) {
  const developers = await getDevelopers();
  return developers.find((developer) => developer.slug === slug) || getFallbackDeveloperBySlug(slug);
}

export async function getPropertyBySlug(slug: string) {
  const properties = await getProperties();
  return properties.find((property) => property.slug === slug) || getFallbackPropertyBySlug(slug);
}

export async function getPropertiesByType(type: PropertyType) {
  const properties = await getProperties();
  return properties.filter((property) => property.propertyType === type && property.active) || getFallbackPropertiesByType(type);
}

export async function getPropertiesByDeveloper(developerSlug: string) {
  const properties = await getProperties();
  return properties.filter((property) => property.developerSlug === developerSlug && property.active) || getFallbackPropertiesByDeveloper(developerSlug);
}

export async function getRelatedProperties(property: Property) {
  const properties = await getProperties();
  const related = properties
    .filter(
      (candidate) =>
        candidate.slug !== property.slug &&
        candidate.active &&
        (candidate.location.city === property.location.city || candidate.propertyType === property.propertyType)
    )
    .slice(0, 3);

  return related.length ? related : getFallbackRelatedProperties(property);
}

export async function createLead(payload: {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  message?: string;
  source: string;
  leadType?: string;
  propertySlug?: string;
  developerSlug?: string;
  serviceSlug?: string;
  providerSlug?: string;
  materialSlug?: string;
  city?: string;
  budget?: string;
  preferredDate?: string;
  sourcePage?: string;
  consent?: boolean;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  if (!isDirectusConfigured()) {
    return { id: "demo-lead", mode: "fallback" };
  }

  return directusCreateItem("leads", {
    buyer_name: payload.name,
    phone: payload.phone,
    whatsapp: payload.whatsapp || null,
    email: payload.email || null,
    source: payload.source,
    lead_type: payload.leadType || "General Contact",
    notes: payload.message || null,
    property_slug: payload.propertySlug || null,
    developer_slug: payload.developerSlug || null,
    service_slug: payload.serviceSlug || null,
    provider_slug: payload.providerSlug || null,
    material_slug: payload.materialSlug || null,
    city: payload.city || null,
    budget: payload.budget || null,
    preferred_date: payload.preferredDate || null,
    source_page: payload.sourcePage || null,
    consent: Boolean(payload.consent),
    metadata: payload.metadata || {},
    status: "new"
  });
}
