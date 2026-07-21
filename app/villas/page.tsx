import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getPropertiesByType } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Premium Villas from Verified Developers",
  description:
    "Discover verified villas and gated villa communities with floor plans, amenities, approvals, price, possession, and direct developer contact.",
  path: "/villas",
  keywords: ["villas for sale", "gated community villas", "premium villas", "verified villa developers"]
});

export default async function VillasPage() {
  const properties = await getPropertiesByType("Villa");

  return (
    <ListingPage
      eyebrow="Villas"
      title="Low-density villa communities with verified developer backing."
      description="Evaluate villa layouts, private gardens, clubhouse amenities, possession timelines, and neighborhood context."
      properties={properties}
    />
  );
}
