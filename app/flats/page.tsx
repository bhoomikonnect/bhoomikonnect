import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getPropertiesByType } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Verified Flats and Apartments for Sale",
  description:
    "Find verified flats from trusted developers with floor plans, amenities, RERA details, price, possession, and direct enquiry.",
  path: "/flats",
  keywords: ["flats for sale", "apartments", "3 BHK flats", "verified flats"]
});

export default async function FlatsPage() {
  const properties = await getPropertiesByType("Flat");

  return (
    <ListingPage
      eyebrow="Flats"
      title="Apartment communities built for practical shortlisting."
      description="Browse flats with bedroom filters, floor plans, amenities, developer details, nearby essentials, and pricing clarity."
      properties={properties}
    />
  );
}
