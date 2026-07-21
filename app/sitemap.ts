import type { MetadataRoute } from "next";
import { getDevelopers, getProperties } from "@/lib/marketplace";
import { getCurrentWorks, getMaterials, getServiceProviders, getServices } from "@/lib/content";
import { getPublishedCmsPages } from "@/lib/cms-repository";
import { siteConfig, staticRoutes } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, developers, services, providers, materials, works, pages] = await Promise.all([
    getProperties(), getDevelopers(), getServices(), getServiceProviders(), getMaterials(), getCurrentWorks(), getPublishedCmsPages()
  ]);
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({ ...route, lastModified: now })),
    ...properties.map((property) => ({
      url: `${siteConfig.url}/property/${property.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: property.featuredProperty ? 0.9 : 0.75
    })),
    ...developers.map((developer) => ({
      url: `${siteConfig.url}/developers/${developer.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...services.map((service) => ({ url: `${siteConfig.url}/${service.family}/${service.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: service.featured ? 0.8 : 0.65 })),
    ...providers.map((provider) => ({ url: `${siteConfig.url}/service-providers/${provider.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...materials.map((material) => ({ url: `${siteConfig.url}/materials/${material.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: material.featured ? 0.75 : 0.6 })),
    ...works.map((work) => ({ url: `${siteConfig.url}/current-works/${work.slug}`, lastModified: now, changeFrequency: work.status === "Ongoing" ? "weekly" as const : "monthly" as const, priority: work.featured ? 0.75 : 0.6 })),
    ...pages.map((page) => ({ url: `${siteConfig.url}/pages/${page.slug}`, lastModified: new Date(page.updated_at), changeFrequency: "monthly" as const, priority: 0.65 }))
  ];
}
