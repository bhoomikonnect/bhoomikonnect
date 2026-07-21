import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Buy Verified Properties from Trusted Developers",
  description:
    "Search verified plots, flats, villas, and commercial properties with RERA, approvals, amenities, price, and direct developer enquiry.",
  path: "/buy",
  keywords: ["buy property", "verified properties", "developer properties", "RERA property"]
});

export default async function BuyPage() {
  const properties = await getProperties();

  return (
    <ListingPage
      eyebrow="Buy property"
      title="Verified properties from trusted developers."
      description="Search across plots, flats, villas, and commercial spaces with structured filters, transparent pricing, and direct contact options."
      properties={properties}
    />
  );
}
