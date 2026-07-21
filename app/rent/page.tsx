import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Rental Properties", description: "Find verified rental apartments, villas, houses, and commercial spaces with direct enquiry on BhoomiKonnect.", path: "/rent" });
export default async function RentPage() { const properties = (await getProperties()).filter((property) => property.saleType === "Rent"); return <ListingPage eyebrow="Rent property" title="Verified rentals without the information chase." description="Compare location, monthly price, area, amenities, and responsible contact details before scheduling a visit." properties={properties} />; }
