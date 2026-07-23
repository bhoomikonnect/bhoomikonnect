import type { MetadataRoute } from "next";

export const siteConfig = {
  name: "BhoomiKonnect",
  tagline: "From Land to Dream Home — Everything Under One Roof",
  description:
    "Buy, sell, build, design, renovate, and maintain property with verified developers, professionals, and suppliers on BhoomiKonnect.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bhoomikonnect.com",
  ogImage: "/images/bhoomikonnect-hero.png",
  phone: process.env.NEXT_PUBLIC_PRIMARY_PHONE || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "",
  socials: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || ""
  }
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Buy Property", href: "/buy" },
  { label: "Sell Property", href: "/sell-property" },
  { label: "Rent", href: "/rent" },
  { label: "Projects", href: "/projects" },
  { label: "Developers", href: "/developers" },
  { label: "Current Works", href: "/current-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const serviceNavItems = [
  { label: "Construction", href: "/construction" },
  { label: "Architecture", href: "/architecture" },
  { label: "Interiors", href: "/interiors" },
  { label: "Painting", href: "/painting" },
  { label: "Renovation", href: "/renovation" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Materials", href: "/materials" },
  { label: "Professionals", href: "/service-providers" }
];

export const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, priority: 1, changeFrequency: "daily" },
  { url: `${siteConfig.url}/buy`, priority: 0.9, changeFrequency: "daily" },
  { url: `${siteConfig.url}/sell-property`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/post-property`, priority: 0.75, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/rent`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/plots`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/flats`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/villas`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/commercial`, priority: 0.8, changeFrequency: "daily" },
  { url: `${siteConfig.url}/projects`, priority: 0.85, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/developers`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/cities`, priority: 0.75, changeFrequency: "weekly" },
  ...serviceNavItems.map((item) => ({ url: `${siteConfig.url}${item.href}`, priority: 0.8, changeFrequency: "weekly" as const })),
  { url: `${siteConfig.url}/current-works`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/calculators`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/about`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/contact`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/privacy`, priority: 0.25, changeFrequency: "yearly" },
  { url: `${siteConfig.url}/terms`, priority: 0.25, changeFrequency: "yearly" },
  { url: `${siteConfig.url}/login`, priority: 0.3, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/register`, priority: 0.3, changeFrequency: "monthly" }
];
