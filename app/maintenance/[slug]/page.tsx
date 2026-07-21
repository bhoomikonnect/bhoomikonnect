import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("maintenance")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("maintenance", params.slug); return createMetadata({ title: item?.title || "Maintenance Service", description: item?.summary || "Verified home maintenance services from BhoomiKonnect.", path: `/maintenance/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="maintenance" slug={params.slug} />; }
