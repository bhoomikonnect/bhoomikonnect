import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("renovation")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("renovation", params.slug); return createMetadata({ title: item?.title || "Renovation Service", description: item?.summary || "Home and commercial renovation from BhoomiKonnect.", path: `/renovation/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="renovation" slug={params.slug} />; }
