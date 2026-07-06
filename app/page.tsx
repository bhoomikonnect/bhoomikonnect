import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Home,
  KeyRound,
  Landmark,
  Layers3,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
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
import { cities, developers, homeFaqs, properties } from "@/lib/data";
import { createMetadata, faqSchema } from "@/lib/seo";
import { cn, formatNumber } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "BhoomiKonnect | Verified Developer Property Marketplace",
  description:
    "Search verified flats, plots, villas, commercial spaces, projects, developers, and cities with direct developer enquiry on BhoomiKonnect.",
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

const testimonials = [
  {
    name: "Riya Menon",
    role: "Buyer, Hyderabad",
    quote: "The developer profile and approval details helped us shortlist projects without calling five different brokers."
  },
  {
    name: "Arjun Sethi",
    role: "Investor, Pune",
    quote: "The comparison view made plotted layouts and commercial suites easier to evaluate side by side."
  },
  {
    name: "Meera Kulkarni",
    role: "Developer CRM Head",
    quote: "Lead quality improves when buyers already understand the project, price, possession, and location context."
  }
];

export default function HomePage() {
  const featuredProperties = properties.filter((property) => property.featuredProperty);
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
        <div className="container relative grid min-h-[calc(100svh-4rem)] content-center gap-10 py-12 lg:grid-cols-[0.95fr_0.72fr] lg:items-center">
          <div>
            <Reveal>
              <Badge variant="accent">
                <BadgeCheck className="size-3" aria-hidden /> Verified developer marketplace
              </Badge>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-bold tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                BhoomiKonnect
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">
                Connecting buyers with trusted developers through verified projects, transparent property data, and direct conversations.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <SearchPanel />
            </Reveal>

            <Reveal delay={0.18} className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/buy" className={cn(buttonVariants({ size: "lg" }))}>
                Explore properties <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/developers" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                View developers
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="grid gap-4 rounded-lg border bg-background/88 p-4 shadow-panel backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Verified listings", value: "1,200+", icon: CheckCircle2 },
                  { label: "Developer partners", value: "80+", icon: Users },
                  { label: "Growth cities", value: "12", icon: MapPin },
                  { label: "Avg. response", value: "< 30m", icon: TrendingUp }
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
                  Listings are scored across approval completeness, developer verification, response ownership, and property data depth.
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
            {testimonials.map((testimonial) => (
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
          <SectionHeading eyebrow="FAQ" title="Answers for buyers and developers." />
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <Newsletter />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
