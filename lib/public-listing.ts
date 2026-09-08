import type { Property } from "@/types/marketplace";

/** Public-facing labels deliberately omit project and developer identity. */
export function publicPropertyTitle(property: Property) {
  return `Verified ${property.propertyType} in ${property.location.area}`;
}

export const publicListingProvider = "BhoomiKonnect verified listing";
