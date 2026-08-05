import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  DraftingCompass,
  Hammer,
  Compass,
  Home,
  Landmark,
  Layers3,
  Paintbrush,
  PackageOpen,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { RecentInteriorWork } from "@/components/sections/RecentInteriorWork";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeaturedLaunches } from "@/components/sections/FeaturedLaunches";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { serviceFamilyMeta } from "@/lib/catalog";
import { getDevelopers } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "BhoomiKonnect | Property, Construction and Home Services",
  description:
    "Buy, sell, build, design, renovate, maintain, and source construction materials through verified BhoomiKonnect professionals.",
  path: "/",
  keywords: ["real estate marketplace", "verified developers", "RERA properties", "buy property India"]
});

const categoryCards = [
  {
    title: "Plots",
    href: "/plots",
    icon: Layers3,
    copy: "Approved layouts, clear title checks, and self-build flexibility."
  },
  {
    title: "Flats",
    href: "/flats",
    icon: Building2,
    copy: "High-rise communities with floor plans, amenities, and possession clarity."
  },
  {
    title: "Villas",
    href: "/villas",
    icon: Home,
    copy: "Low-density gated neighborhoods from trusted villa developers."
  },
  {
    title: "Commercial",
    href: "/commercial",
    icon: Landmark,
    copy: "Office, retail, and business park inventory with approval details."
  }
];

const whyItems = [
  {
    title: "Developer-first trust layer",
    icon: ShieldCheck,
    copy: "Listings connect to verified developer profiles with project history, contact ownership, and approval context."
  },
  {
    title: "Decision-ready detail pages",
    icon: Compass,
    copy: "Every property page includes gallery, map, amenities, pricing, nearby essentials, FAQs, and enquiry actions."
  },
  {
    title: "One connected service journey",
    icon: Hammer,
    copy: "Move from property discovery to construction, design, renovation, maintenance, and materials through one enquiry flow."
  },
  {
    title: "Fast mobile discovery",
    icon: Sparkles,
    copy: "Responsive, image-optimized, accessible UI with compact filters and clear lead capture paths."
  }
];

const serviceFamilies = [
  { family: "construction", href: "/construction", icon: Hammer },
  { family: "architecture", href: "/architecture", icon: DraftingCompass },
  { family: "interiors", href: "/interiors", icon: Home },
  { family: "painting", href: "/painting", icon: Paintbrush },
  { family: "renovation", href: "/renovation", icon: Building2 },
  { family: "maintenance", href: "/maintenance", icon: Wrench },
  { family: "materials", href: "/materials", icon: PackageOpen }
] as const;

export default async function HomePage() {
  const developers = await getDevelopers();

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          <Image
            src="/images/bhoomikonnect-hero.png"
            alt="Premium residential projects and city skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/34 dark:from-slate-950 dark:via-slate-950/86 dark:to-slate-950/35" />
        </div>
        <div className="container relative py-10 sm:py-14 lg:py-16">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(390px,0.7fr)] lg:items-center xl:gap-12">
            <div className="min-w-0">
            <Reveal>
              <Badge variant="accent">
                <BadgeCheck className="size-3" aria-hidden /> BhoomiKonnect verified marketplace
              </Badge>
              <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold tracking-normal text-slate-950 dark:text-white sm:mt-5 sm:text-5xl lg:text-6xl">
                From Land to Dream Home — Everything Under One Roof
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-200 sm:mt-5 sm:text-lg sm:leading-8">
                Discover verified properties, trusted developers, construction solutions, interiors, renovation, and complete home services through BhoomiKonnect.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <span className="rounded-full border border-white/60 bg-white/75 px-4 py-2 shadow-sm backdrop-blur dark:border-white/15 dark:bg-slate-950/65">Verified properties</span>
                <span className="rounded-full border border-white/60 bg-white/75 px-4 py-2 shadow-sm backdrop-blur dark:border-white/15 dark:bg-slate-950/65">Interior solutions</span>
                <span className="rounded-full border border-white/60 bg-white/75 px-4 py-2 shadow-sm backdrop-blur dark:border-white/15 dark:bg-slate-950/65">Construction services</span>
              </div>
            </Reveal>
            </div>
            <Reveal delay={0.1} className="w-full lg:justify-self-end">
              <QuoteForm title="Tell us what you're looking for" leadType="Property Enquiry" source="Homepage Hero" minimal />
            </Reveal>
          </div>
        </div>
      </section>

      <FeaturedLaunches />

      <RecentInteriorWork />

      <section className="border-y border-emerald-900/10 bg-emerald-50/70 py-10 dark:border-emerald-200/10 dark:bg-emerald-950/20 sm:py-14">
        <div className="container">
          <SectionHeading eyebrow="Everything under one roof" title="Move from property search to finished home without losing context." description="Compare reviewed service scopes, packages, local coverage, provider availability, and direct enquiry options." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceFamilies.map((item) => {
              const meta = item.family === "materials" ? { title: "Materials Supply", description: "Cement, steel, finishes, hardware, and site delivery quotations." } : serviceFamilyMeta[item.family];
              return <Link key={item.href} href={item.href} className="group rounded-lg border bg-card p-5 transition hover:-translate-y-1 hover:shadow-lift"><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><item.icon className="size-5" aria-hidden /></span><h3 className="mt-4 text-lg font-bold">{meta.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{meta.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Property categories"
            title="Four discovery paths, one trusted marketplace."
            description="Each category has a focused SEO landing page with responsive filters and active listing cards."
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((category, index) => (
              <Reveal key={category.href} delay={index * 0.04}>
                <Link href={category.href} className="group block rounded-lg border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
                    <category.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Browse {category.title} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {developers.length ? <section className="border-y bg-muted/50 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeading
            eyebrow="Featured developers"
            title="Profiles that make trust visible before the first call."
            description="Developer pages include completed, ongoing, and upcoming projects, social links, reviews, specialties, and contact paths."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {developers.slice(0, 4).map((developer, index) => (
              <Reveal key={developer.id} delay={index * 0.04}>
                <DeveloperCard developer={developer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section> : null}

      <section className="bg-[#fbfaf6] py-10 dark:bg-slate-950 sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Why BhoomiKonnect"
            title="Built like a premium SaaS tool, tuned for real estate decisions."
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Card className="h-full p-5">
                  <span className="grid size-12 place-items-center rounded-md bg-accent/15 text-amber-700 dark:text-amber-200">
                    <item.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
