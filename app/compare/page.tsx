import type { Metadata } from "next";
import { ComparisonManager } from "@/components/properties/ComparisonManager";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Compare Properties", description: "Compare up to four BhoomiKonnect properties side by side.", path: "/compare", noIndex: true });
export default async function ComparePage() { const properties = await getProperties(); return <section className="container py-10 sm:py-14"><SectionHeading as="h1" eyebrow="Property comparison" title="See the important differences side by side." description="Guest comparisons stay in this browser. Account-based persistence is available when Supabase is configured." /><div className="mt-8"><ComparisonManager properties={properties} /></div></section>; }
