import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { interiorPortfolio, interiorShowcaseVideo } from "@/lib/interior-portfolio";

export function InteriorPortfolio() {
  return (
    <section className="border-b bg-background py-10 sm:py-14" aria-label="Selected interior projects">
      <div className="container">
        <SectionHeading eyebrow="Selected interior work" title="Spaces designed around real life." description="Explore work across kitchens, living rooms, bedrooms, wardrobes, lighting, custom furniture, privacy solutions, and devotional spaces." />
        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          {interiorPortfolio.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
              <Link href={`/interior-projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted"><Image src={project.images[0]} alt={project.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute bottom-3 right-3 rounded-md bg-black/65 px-3 py-2 text-xs font-bold text-white">{project.images.length} photos</span></div>
                <div className="p-5 sm:p-6"><Badge variant="secondary">{project.category}</Badge><h2 className="mt-3 text-2xl font-bold">{project.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Open project gallery <ArrowRight className="size-4" aria-hidden /></span></div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-xl border bg-slate-950 p-3 shadow-sm sm:p-5">
          <div className="mb-4 px-1 text-white"><p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Walk-through</p><h2 className="mt-1 text-2xl font-bold">Interior work in motion</h2></div>
          <video controls preload="metadata" playsInline className="max-h-[680px] w-full rounded-lg bg-black" aria-label="BhoomiKonnect interior project walk-through"><source src={interiorShowcaseVideo} type="video/mp4" /></video>
        </div>
      </div>
    </section>
  );
}
