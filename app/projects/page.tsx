import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Latest Real Estate Projects by Verified Developers",
  description:
    "Browse latest, ongoing, ready, and new launch real estate projects from verified developers with direct enquiry and SEO-ready detail pages.",
  path: "/projects",
  keywords: ["real estate projects", "new launch projects", "ongoing projects", "verified developers"]
});

const statusCards = [
  {
    title: "Ready to Move",
    copy: "Immediate-possession projects with completed infrastructure.",
    icon: CheckCircle2
  },
  {
    title: "Under Construction",
    copy: "Milestone-led projects with future possession timelines.",
    icon: Clock
  },
  {
    title: "New Launch",
    copy: "Fresh releases with early inventory and launch pricing.",
    icon: CalendarDays
  }
];

export default async function ProjectsPage() {
  const properties = await getProperties();

  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="Projects"
            title="Track real estate projects by launch stage, city, and developer."
            description="A project-first directory for buyers who compare multiple communities before opening a direct conversation."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {statusCards.map((card) => (
              <Card key={card.title} className="p-4">
                <card.icon className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-bold">{card.title}</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-10 text-white sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Project timeline"
            title="Inventory mapped to practical buyer milestones."
            description="Use status, possession, approval, and micro-market signals to plan site visits and negotiations."
            className="[&_*]:text-white [&_p]:text-slate-300"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {properties.slice(0, 4).map((property) => (
              <Link key={property.id} href={`/property/${property.slug}`} className="rounded-lg border border-white/10 bg-white/8 p-5 hover:bg-white/12">
                <Badge variant="accent">{property.status}</Badge>
                <h3 className="mt-4 text-lg font-bold">{property.projectName}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="size-4" aria-hidden /> {property.location.area}, {property.location.city}
                </p>
                <p className="mt-4 text-sm text-slate-300">Possession: {property.possessionDate}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Open project <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
