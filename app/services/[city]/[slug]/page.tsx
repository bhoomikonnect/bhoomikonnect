import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { city: string; slug: string } };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const service = (await getServices()).find((item) => item.slug === params.slug); const city = params.city.replace(/-/g, " "); return createMetadata({ title: `${service?.title || "Home Service"} in ${city.replace(/\b\w/g, (letter) => letter.toUpperCase())}`, description: `Request verified ${service?.title.toLowerCase() || "home service"} professionals in ${city} with transparent scope and booking support.`, path: `/services/${params.city}/${params.slug}`, image: service?.image }); }
export default async function LocalServicePage({ params }: Props) { const service = (await getServices()).find((item) => item.slug === params.slug); if (!service) notFound(); return <ServiceDetail family={service.family} slug={service.slug} />; }
