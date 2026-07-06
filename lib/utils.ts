import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatPrice(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 2)} Cr`;
  }

  return `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)} L`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function absoluteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bhoomikonnect.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
