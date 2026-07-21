import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getPropertiesByType } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Commercial Properties and Office Spaces",
  description:
    "Compare verified commercial properties, office suites, retail spaces, business parks, approvals, amenities, and developer contact options.",
  path: "/commercial",
  keywords: ["commercial property", "office space", "retail space", "business park"]
});

export default async function CommercialPage() {
  const properties = await getPropertiesByType("Commercial");

  return (
    <ListingPage
      eyebrow="Commercial"
      title="Commercial spaces for owner-occupiers and investors."
      description="Search office, retail, and business park inventory with frontage, parking, approvals, and tenant-friendly location signals."
      properties={properties}
    />
  );
}
