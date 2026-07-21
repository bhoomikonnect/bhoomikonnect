import type { Metadata } from "next";
import { ListingPage } from "@/components/sections/ListingPage";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

const categoryMap: Record<string, string[]> = {
  "residential-plots": ["Plot"], "agricultural-land": ["Agricultural Land"], "farm-land": ["Farm Land"],
  villas: ["Villa"], apartments: ["Flat"], "independent-houses": ["Independent House"],
  commercial: ["Commercial", "Office", "Shop", "Warehouse"], industrial: ["Industrial"]
};

type Props = { params: { city: string } };
export function generateStaticParams() { return Object.keys(categoryMap).map((city) => ({ city })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = params.city.replace(/-/g, " ");
  return createMetadata({ title: `${label.replace(/\b\w/g, (letter) => letter.toUpperCase())} for Sale`, description: `Find verified ${label} with approvals, pricing, location details, and direct enquiry on BhoomiKonnect.`, path: `/properties/${params.city}` });
}
export default async function CategoryPage({ params }: Props) {
  const types = categoryMap[params.city] || [];
  const properties = (await getProperties()).filter((property) => types.includes(property.propertyType));
  const title = params.city.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return <ListingPage eyebrow="Property category" title={`${title} on BhoomiKonnect`} description="Compare original demo inventory with pricing, approvals, location context, developer details, and direct lead actions." properties={properties} />;
}
