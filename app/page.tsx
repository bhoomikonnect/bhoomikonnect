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
import { PropertyCalculators } from "@/components/calculators/PropertyCalculators";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { EmptyCatalogState } from "@/components/sections/EmptyCatalogState";
import { FaqList } from "@/components/sections/FaqList";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SearchPanel } from "@/components/sections/SearchPanel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeaturedLaunches } from "@/components/sections/FeaturedLaunches";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { platformFaqs, serviceFamilyMeta } from "@/lib/catalog";
import { getCurrentWorks } from "@/lib/content";
import { getDevelopers, getProperties } from "@/lib/marketplace";
import { createMetadata, faqSchema } from "@/lib/seo";

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
  const [properties, developers, works] = await Promise.all([
    getProperties(),
    getDevelopers(),
    getCurrentWorks()
  ]);
  const featuredProperties = properties.filter((property) => property.featuredProperty).slice(0, 6);
  const propertyHighlights = featuredProperties.length ? featuredProperties : properties.slice(0, 6);

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
        <div className="container relative py-10 sm:py-14 lg:py-20">
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
            </Reveal>

            <Reveal delay={0.1} className="mt-4 sm:mt-8">
              <SearchPanel />
            </Reveal>
          </div>
        </div>
      </section>

      <FeaturedLaunches />

      <section className="py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Featured properties"
            title="Shortlist projects with the details buyers actually need."
            description="Explore reviewed listings with approvals, amenities, pricing, location details, and direct enquiry actions."
          />

          <div className="mt-8">
            {propertyHighlights.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{propertyHighlights.map((property, index) => (
              <Reveal key={property.id} delay={index * 0.05}>
                <PropertyCard property={property} />
              </Reveal>
            ))}</div> : <EmptyCatalogState title="Verified property listings are coming soon" description="The first listings will appear after ownership, approvals, pricing, and contact details have been reviewed." actionLabel="Share your property requirement" />}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/55 py-10 sm:py-14">
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

      <section className="bg-muted/55 py-10 sm:py-14">
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

      {works.length ? <section className="py-10 sm:py-14">
        <div className="container">
          <SectionHeading eyebrow="Current works" title="Visible progress builds confidence." description="Follow ongoing and completed construction, interior, painting, and renovation work through milestone-ready pages." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{works.slice(0, 4).map((work) => <Link key={work.id} href={`/current-works/${work.slug}`} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-[16/10]"><Image src={work.image} alt={`${work.title} current work`} fill className="object-cover" /></div><div className="p-4"><p className="text-xs font-bold uppercase text-primary">{work.category} · {work.status}</p><h3 className="mt-2 font-bold">{work.title}</h3><div className="mt-4 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-secondary" style={{ width: `${work.progress}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{work.progress}% complete</p></div></Link>)}</div>
        </div>
      </section> : null}

      {developers.length ? <section className="py-10 sm:py-14">
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

      <section className="py-10 sm:py-14"><div className="container"><SectionHeading eyebrow="Planning calculators" title="Estimate before you enquire." description="Explore home-loan EMI, construction cost, and common Indian property area conversions." /><div className="mt-8"><PropertyCalculators /></div></div></section>

      <section className="py-10 sm:py-14">
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

      <section className="py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <SectionHeading eyebrow="FAQ" title="Answers for buyers, owners, and service customers." />
          <FaqList faqs={platformFaqs} />
        </div>
      </section>

      <section className="border-t bg-muted/45 py-10 sm:py-14"><div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"><SectionHeading eyebrow="One enquiry, the right workflow" title="Tell us where your property journey stands." description="Buying, selling, construction, interiors, painting, renovation, maintenance, and material requests are classified and sent to the appropriate admin queue." /><QuoteForm title="How can BhoomiKonnect help?" leadType="General Contact" source="Homepage" /></div></section>

      <JsonLd data={faqSchema(platformFaqs)} />
    </>
  );
}
