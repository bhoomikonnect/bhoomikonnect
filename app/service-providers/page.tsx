import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProviderCard } from "@/components/services/ProviderCard";
import { getServiceProviders } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Verified Service Providers", description: "Find verified contractors, architects, interior designers, painters, renovation specialists, and home-service professionals.", path: "/service-providers" });
export default async function ProvidersPage() { const providers = await getServiceProviders(); return <><section className="border-b bg-muted/50 py-10 sm:py-14"><div className="container"><SectionHeading eyebrow="Professional network" title="Find verified people for property work." description="Profiles make experience, services, service areas, ratings, availability, and quotation actions visible before you engage." /></div></section><section className="py-10 sm:py-14"><div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">{providers.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}</div></section></>; }
