import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("interiors")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("interiors", params.slug); return createMetadata({ title: item?.title || "Interior Service", description: item?.summary || "Interior design services from BhoomiKonnect.", path: `/interiors/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="interiors" slug={params.slug} />; }
