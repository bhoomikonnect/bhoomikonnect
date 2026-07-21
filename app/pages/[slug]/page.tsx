import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { getPublishedCmsPage, getPublishedCmsPages } from "@/lib/cms-repository";
import { breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";

type CmsPublicPageProps = { params: { slug: string } };

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedCmsPages()).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CmsPublicPageProps): Promise<Metadata> {
  const page = await getPublishedCmsPage(params.slug);
  if (!page) return createMetadata({ title: "Page Not Found", description: "The requested page is not available.", path: `/pages/${params.slug}`, noIndex: true });
  const metadata = createMetadata({ title: page.seo_title || page.title, description: page.meta_description || `Learn more about ${page.title} on BhoomiKonnect.`, path: `/pages/${page.slug}`, image: page.sections.find((section) => section.image)?.image || undefined });
  return page.canonical_url ? { ...metadata, alternates: { canonical: page.canonical_url } } : metadata;
}

export default async function CmsPublicPage({ params }: CmsPublicPageProps) {
  const page = await getPublishedCmsPage(params.slug);
  if (!page) notFound();
  const faqs = page.sections.filter((section) => section.block_type === "faq").flatMap((section) => section.items.map((item) => { const [question, ...answer] = item.split("|"); return { question: question?.trim() || "", answer: answer.join("|").trim() }; })).filter((item) => item.question && item.answer);
  return <><CmsPageRenderer page={page} /><JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: page.title, url: `/pages/${page.slug}` }]), ...(faqs.length ? [faqSchema(faqs)] : [])]} /></>;
}
