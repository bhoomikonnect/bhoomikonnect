import type { MetadataRoute } from "next";
import { developers, properties } from "@/lib/data";
import { siteConfig, staticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    }))
  ];
}
