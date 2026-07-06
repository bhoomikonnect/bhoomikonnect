import type { MetadataRoute } from "next";

export const siteConfig = {
  name: "BhoomiKonnect",
  tagline: "Connecting Buyers with Trusted Developers",
  description:
    "A premium real estate marketplace connecting buyers with verified developers, RERA-ready projects, transparent pricing, and direct enquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bhoomikonnect.com",
  ogImage: "/images/bhoomikonnect-hero.png",
  phone: "+91 98765 43210",
  email: "hello@bhoomikonnect.com",
  address: "Hyderabad, Telangana, India"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Plots", href: "/plots" },
  { label: "Flats", href: "/flats" },
  { label: "Villas", href: "/villas" },
  { label: "Commercial", href: "/commercial" },
  { label: "Projects", href: "/projects" },
  { label: "Developers", href: "/developers" },
  { label: "Cities", href: "/cities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, priority: 1, changeFrequency: "daily" },
  { url: `${siteConfig.url}/buy`, priority: 0.9, changeFrequency: "daily" },
  { url: `${siteConfig.url}/plots`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/flats`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/villas`, priority: 0.85, changeFrequency: "daily" },
  { url: `${siteConfig.url}/commercial`, priority: 0.8, changeFrequency: "daily" },
  { url: `${siteConfig.url}/projects`, priority: 0.85, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/developers`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/cities`, priority: 0.75, changeFrequency: "weekly" },
  { url: `${siteConfig.url}/about`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/contact`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/login`, priority: 0.3, changeFrequency: "monthly" },
  { url: `${siteConfig.url}/register`, priority: 0.3, changeFrequency: "monthly" }
];
