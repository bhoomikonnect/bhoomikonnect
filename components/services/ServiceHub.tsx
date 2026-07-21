import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serviceFamilyMeta } from "@/lib/catalog";
import { getServicesByFamily } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { ServiceFamily } from "@/types/marketplace";

const leadTypes: Record<ServiceFamily, string> = {
  construction: "Construction Quote", architecture: "Architecture Enquiry", interiors: "Interior Enquiry",
  painting: "Painting Enquiry", renovation: "Renovation Enquiry", maintenance: "Maintenance Booking"
};

export async function ServiceHub({ family }: { family: ServiceFamily }) {
  const services = await getServicesByFamily(family);
  const meta = serviceFamilyMeta[family];
  return (
    <>
      <section className="border-b bg-slate-950 py-12 text-white sm:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><Badge variant="accent"><BadgeCheck className="size-3" aria-hidden /> BhoomiKonnect verified network</Badge><h1 className="mt-5 max-w-4xl text-balance text-4xl font-bold sm:text-5xl">{meta.title}</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{meta.description}</p></div>
          <Link href="#quote" className={cn(buttonVariants({ variant: "accent", size: "lg" }))}>Get free quote <ArrowRight className="size-4" aria-hidden /></Link>
        </div>
      </section>
      <section className="py-10 sm:py-14"><div className="container"><SectionHeading eyebrow={meta.eyebrow} title={`Choose the right ${meta.title.toLowerCase()} scope.`} description={`${services.length} original demo service pages are ready for CMS-managed pricing, packages, portfolios, locations, and FAQs.`} /><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div></div></section>
      <section className="border-y bg-muted/55 py-10 sm:py-14"><div className="container grid gap-5 lg:grid-cols-3">{[
        [ShieldCheck, "Verified specialists", "Provider identity, portfolio, skills, and availability can be reviewed before assignment."],
        [ClipboardCheck, "Scope before price", "Requirements are documented before the team prepares a comparable quotation."],
        [MapPin, "Local coordination", "City and service-area matching keeps travel, material, and schedule assumptions practical."]
      ].map(([Icon, title, copy]) => <Card key={String(title)} className="p-5"><Icon className="size-6 text-primary" aria-hidden /><h2 className="mt-4 text-lg font-bold">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{String(copy)}</p></Card>)}</div></section>
      <section id="quote" className="scroll-mt-24 py-10 sm:py-14"><div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><SectionHeading eyebrow="Start a conversation" title="Tell us what you need at the property." description="Share the location, rough budget, and preferred timeline. The request enters the admin lead queue with the correct service category." /><QuoteForm leadType={leadTypes[family]} source={`${meta.title} Hub`} /></div></section>
    </>
  );
}
