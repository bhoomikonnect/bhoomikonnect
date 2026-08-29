import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { Badge } from "@/components/ui/badge";
import { getInteriorPortfolioProject, interiorPortfolio } from "@/lib/interior-portfolio";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() { return interiorPortfolio.map((project) => ({ slug: project.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getInteriorPortfolioProject(params.slug);
  return project ? createMetadata({ title: `${project.title} | Interior Portfolio`, description: project.description, path: `/interior-projects/${project.slug}`, image: project.images[0] }) : {};
}

export default function InteriorProjectPage({ params }: { params: { slug: string } }) {
  const project = getInteriorPortfolioProject(params.slug);
  if (!project) notFound();
  return <>
    <section className="border-b bg-slate-950 py-10 text-white sm:py-14"><div className="container"><Link href="/interiors" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300"><ArrowLeft className="size-4" /> Back to interiors</Link><Badge variant="accent" className="mt-6 block w-fit">{project.category}</Badge><h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold sm:text-5xl">{project.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{project.description}</p></div></section>
    <section className="py-10 sm:py-14"><div className="container grid gap-10 lg:grid-cols-[1fr_380px]"><div><h2 className="mb-5 text-2xl font-bold">Project gallery</h2><MediaGallery images={project.images} title={project.title} compact /></div><aside className="lg:sticky lg:top-24 lg:self-start"><QuoteForm title={`Enquire about ${project.title}`} leadType="Interior Enquiry" source={`Interior Portfolio: ${project.title}`} serviceSlug={project.slug} compact /></aside></div></section>
  </>;
}
