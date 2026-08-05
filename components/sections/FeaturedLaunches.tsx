"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, MapPin, Ruler, Sparkles } from "lucide-react";
import { useRef } from "react";
import { featuredLaunches } from "@/lib/featured-launches";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function FeaturedLaunches({ compact = false }: { compact?: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-[#071c17] py-12 text-white sm:py-16">
      <div className="absolute inset-0 premium-grid opacity-20" />
      <div className="absolute -left-32 top-1/3 size-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute -right-20 top-0 size-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="container relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              <Sparkles className="size-4" aria-hidden /> Grand new launches
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">
              Two growth corridors. One future-ready address.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-emerald-50/75">
              Discover Eeshanya&apos;s plotted communities across Rajapur and Mogiligidda, shaped around highway access, planned infrastructure and long-term growth.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/projects" className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-amber-300 hover:bg-white/10 sm:inline-flex">
              View all projects <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <button type="button" onClick={() => move(-1)} aria-label="Previous projects" className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/15"><ArrowLeft className="size-5" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next projects" className="grid size-11 place-items-center rounded-full bg-amber-300 text-slate-950 transition hover:bg-amber-200"><ArrowRight className="size-5" /></button>
          </div>
        </div>

        <div ref={carouselRef} className={cn("scrollbar-none mt-9 grid snap-x snap-mandatory grid-flow-col gap-5 overflow-x-auto overscroll-x-contain pb-2", compact ? "auto-cols-[100%] md:auto-cols-[calc(50%-0.625rem)]" : "auto-cols-[88%] sm:auto-cols-[calc(50%-0.625rem)] lg:auto-cols-[calc(33.333%-0.875rem)]")}>
          {featuredLaunches.map((project, index) => {
            const samruddhi = index === 0;
            const stats = samruddhi
              ? [["100+", "Acres vision"], ["1,500+", "Planned plots"], ["150", "Sq.yd onwards"]]
              : [["HMDA", "Approved"], ["RERA", "Registered"], ["201.66", "Sq.yd onwards"]];
            return (
              <article key={project.id} className="group snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-sm">
                <Link href={`/property/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-white">
                  <Image src={project.gallery[0]} alt={`${project.title} master layout`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-2 transition duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071c17]/90 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge variant="accent">New launch</Badge>
                    <Badge className="border-white/15 bg-[#0b5d4b]/90 text-white">{samruddhi ? "Proposed MUDA & RERA" : "HMDA & RERA approved"}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="flex items-center gap-2 text-sm text-emerald-50/80"><MapPin className="size-4 text-amber-300" /> {project.location.area}</p>
                    <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{project.title}</h3>
                  </div>
                </Link>
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-3 divide-x divide-white/10 rounded-xl bg-black/15 py-4">
                    {stats.map(([value, label]) => <div key={label} className="px-3 text-center"><p className="text-lg font-bold text-amber-300 sm:text-xl">{value}</p><p className="mt-1 text-[11px] leading-4 text-emerald-50/60 sm:text-xs">{label}</p></div>)}
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {(samruddhi
                      ? ["5 min to NH-44", "10 min to proposed RRR", "Luxury resort proposed", "40 ft & 30 ft BT roads"]
                      : ["200 ft highway facing", "Inside proposed RRR", "100 ft grand entrance", "30 ft CC internal roads"]
                    ).map((item) => <span key={item} className="flex items-center gap-2 text-sm text-emerald-50/80"><CheckCircle2 className="size-4 shrink-0 text-emerald-400" />{item}</span>)}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href={`/property/${project.slug}`} className={cn(buttonVariants({ variant: "secondary" }), "rounded-full px-5")}>Explore project <ArrowUpRight className="size-4" /></Link>
                    <a href={project.brochureUrl} target="_blank" className={cn(buttonVariants({ variant: "outline" }), "rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white")}><Ruler className="size-4" /> View master plan</a>
                    {!samruddhi && <span className="inline-flex items-center gap-1 text-xs text-emerald-200"><BadgeCheck className="size-4" /> RERA P02400009992</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <Link href="/projects" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:border-amber-300 hover:bg-white/10 sm:hidden">
          View all projects <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
