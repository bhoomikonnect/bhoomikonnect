import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("construction")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("construction", params.slug); return createMetadata({ title: item?.title || "Construction Service", description: item?.summary || "Verified construction services from BhoomiKonnect.", path: `/construction/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="construction" slug={params.slug} />; }
