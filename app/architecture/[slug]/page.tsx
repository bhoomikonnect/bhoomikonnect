import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getService, getServicesByFamily } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getServicesByFamily("architecture")).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getService("architecture", params.slug); return createMetadata({ title: item?.title || "Architecture Service", description: item?.summary || "Architecture and planning services from BhoomiKonnect.", path: `/architecture/${params.slug}`, image: item?.image }); }
export default function Page({ params }: Props) { return <ServiceDetail family="architecture" slug={params.slug} />; }
