import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("painting")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("painting", params.slug); return createMetadata({ title: item?.title || "Painting Service", description: item?.summary || "Professional painting services from BhoomiKonnect.", path: `/painting/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="painting" slug={params.slug} />; }
