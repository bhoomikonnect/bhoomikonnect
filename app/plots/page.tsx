import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getPropertiesByType } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "RERA Approved Plots for Sale",
  description:
    "Explore verified residential plots with approvals, road width, amenities, location, pricing, and direct developer enquiry.",
  path: "/plots",
  keywords: ["plots for sale", "RERA plots", "approved plots", "residential plots"]
});

export default async function PlotsPage() {
  const properties = await getPropertiesByType("Plot");

  return (
    <ListingPage
      eyebrow="Plots"
      title="Approved plotted developments with clear buying signals."
      description="Compare plot sizes, road widths, approvals, location access, possession timelines, and infrastructure readiness."
      properties={properties}
    />
  );
}
