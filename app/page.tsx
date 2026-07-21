import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  DraftingCompass,
  Hammer,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Home,
  KeyRound,
  Landmark,
  Layers3,
  MapPin,
  Paintbrush,
  PackageOpen,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench
} from "lucide-react";
import { PropertyCalculators } from "@/components/calculators/PropertyCalculators";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { FaqList } from "@/components/sections/FaqList";
import { Newsletter } from "@/components/sections/Newsletter";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SearchPanel } from "@/components/sections/SearchPanel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { platformFaqs, serviceFamilyMeta, testimonials } from "@/lib/catalog";
import { getCurrentWorks, getServices } from "@/lib/content";
import { getCities, getDevelopers, getProperties } from "@/lib/marketplace";
import { createMetadata, faqSchema } from "@/lib/seo";
import { cn, formatNumber } from "@/lib/utils";

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
    title: "SEO architecture built in",
    icon: BarChart3,
    copy: "Dynamic metadata, JSON-LD, canonical URLs, sitemap, robots, breadcrumbs, and internal links are part of the app."
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
  const [properties, cities, developers, services, works] = await Promise.all([getProperties(), getCities(), getDevelopers(), getServices(), getCurrentWorks()]);
  const featuredProperties = properties.filter((property) => property.featuredProperty).slice(0, 6);
  const latestProjects = properties.slice(0, 4);

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
        <div className="container relative grid min-h-[calc(100svh-7rem)] content-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.08fr_0.62fr] lg:items-center">
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

            <Reveal delay={0.18} className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6">
              <Link href="/buy" className={cn(buttonVariants({ size: "lg" }))}>
                Buy Property <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/sell-property" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                Sell Property
              </Link>
              <Link href="/construction#quote" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "hidden sm:inline-flex")}>
                Construction Quote
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "hidden sm:inline-flex")}>
                Contact Us
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="hidden lg:block">
            <div className="grid gap-4 rounded-lg border bg-background/88 p-4 shadow-panel backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Demo listings", value: `${properties.length}`, icon: CheckCircle2 },
                  { label: "Service scopes", value: `${services.length}+`, icon: Users },
                  { label: "Launch cities", value: `${cities.length}`, icon: MapPin },
                  { label: "Lead categories", value: "15", icon: TrendingUp }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-md bg-muted p-4">
                    <stat.icon className="size-5 text-primary" aria-hidden />
                    <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-md bg-slate-950 p-4 text-white">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                  <KeyRound className="size-4" aria-hidden /> Trust Index
                </p>
                <div className="mt-4 h-2 rounded-full bg-white/15">
                  <div className="h-2 w-[92%] rounded-full bg-accent" />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Properties, professionals, suppliers, and service scopes carry their own verification and review context.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeading
              eyebrow="Featured properties"
              title="Shortlist projects with the details buyers actually need."
              description="Explore original demo listings with RERA data, amenities, developer profiles, nearby places, pricing, gallery, and direct lead actions."
            />
            <div className="grid grid-cols-3 gap-3 rounded-lg border bg-card p-4">
              {[
                ["₹2.4K Cr", "demo GMV"],
                [formatNumber(4820), "buyer enquiries"],
                ["94%", "SEO health"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-md bg-muted p-3 text-center">
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property, index) => (
              <Reveal key={property.id} delay={index * 0.05}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/55 py-10 sm:py-14">
        <div className="container">
          <SectionHeading eyebrow="Everything under one roof" title="Move from property search to finished home without losing context." description="Each service family has its own CMS-ready pages, packages, local coverage, provider matching, and lead workflow." />
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

      <section className="py-10 sm:py-14">
        <div className="container">
          <SectionHeading eyebrow="Current works" title="Visible progress builds confidence." description="Follow ongoing and completed construction, interior, painting, and renovation work through milestone-ready pages." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{works.slice(0, 4).map((work) => <Link key={work.id} href={`/current-works/${work.slug}`} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-[16/10]"><Image src={work.image} alt={`${work.title} current work`} fill className="object-cover" /></div><div className="p-4"><p className="text-xs font-bold uppercase text-primary">{work.category} · {work.status}</p><h3 className="mt-2 font-bold">{work.title}</h3><div className="mt-4 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-secondary" style={{ width: `${work.progress}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{work.progress}% complete</p></div></Link>)}</div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
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
      </section>

      <section className="border-y bg-slate-950 py-10 text-white sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Latest projects"
            title="Fresh project inventory across high-intent city corridors."
            description="Latest project cards are internally linked to property detail pages for clean crawl paths."
            className="[&_*]:text-white [&_p]:text-slate-300"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {latestProjects.map((project) => (
              <Link key={project.id} href={`/property/${project.slug}`} className="rounded-lg border border-white/10 bg-white/8 p-4 transition hover:bg-white/12">
                <p className="text-sm text-amber-200">{project.status}</p>
                <h3 className="mt-2 text-lg font-bold">{project.projectName}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {project.location.area}, {project.location.city}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  View details <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Popular cities"
              title="City pages built for micro-market discovery."
              description="Each city highlights growth corridors, average prices, active listings, and internal links to matching properties."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.slice(0, 4).map((city) => (
                <Link key={city.slug} href={`/buy?city=${city.name}`} className="group rounded-lg border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{city.state}</p>
                      <h3 className="text-2xl font-bold">{city.name}</h3>
                    </div>
                    <Badge variant="secondary">{city.growth}</Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{city.microMarkets.join(" · ")}</p>
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
                    <span>{city.avgPrice}</span>
                    <span className="font-semibold text-primary">{city.activeListings} listings</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/55 py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Compare properties"
            title="Faster shortlists with clean side-by-side context."
            description="Comparison-ready data makes buyer evaluation clearer and reduces repeated calls."
          />
          <div className="mt-8 overflow-x-auto">
            <ComparisonTable />
          </div>
        </div>
      </section>

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

      <section className="bg-muted/55 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Buyer voices"
            title="Designed for people who want confidence before commitment."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 6).map((testimonial) => (
              <Card key={testimonial.name} className="p-5">
                <CircleDollarSign className="size-6 text-primary" aria-hidden />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-5 font-bold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </Card>
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

      <Newsletter />
      <JsonLd data={faqSchema(platformFaqs)} />
    </>
  );
}
