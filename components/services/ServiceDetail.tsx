import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CheckCircle2, Clock3, IndianRupee, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProviderCard } from "@/components/services/ProviderCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serviceFamilyMeta } from "@/lib/catalog";
import { getService, getServiceProviders } from "@/lib/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";
import type { ServiceFamily } from "@/types/marketplace";

const leadTypes: Record<ServiceFamily, string> = {
  construction: "Construction Quote", architecture: "Architecture Enquiry", interiors: "Interior Enquiry",
  painting: "Painting Enquiry", renovation: "Renovation Enquiry", maintenance: "Maintenance Booking"
};

export async function ServiceDetail({ family, slug }: { family: ServiceFamily; slug: string }) {
  const service = await getService(family, slug);
  if (!service) notFound();
  const providers = (await getServiceProviders()).filter((provider) => provider.serviceFamilies.includes(family)).slice(0, 3);
  const meta = serviceFamilyMeta[family];
  return (
    <>
      <section className="border-b bg-muted/45 py-8"><div className="container"><div className="flex flex-wrap gap-2 text-sm text-muted-foreground"><Link href="/">Home</Link><span>/</span><Link href={`/${family}`}>{meta.title}</Link><span>/</span><span className="text-foreground">{service.title}</span></div><div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end"><div><Badge><BadgeCheck className="size-3" aria-hidden /> Verified service</Badge><h1 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">{service.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{service.summary}</p></div><div className="flex flex-wrap gap-2 lg:justify-end"><a href="tel:+919000000000" className={cn(buttonVariants({ variant: "outline" }))}><Phone className="size-4" aria-hidden /> Call</a><a href="https://wa.me/919000000000" className={cn(buttonVariants({ variant: "secondary" }))}><MessageCircle className="size-4" aria-hidden /> WhatsApp</a></div></div></div></section>
      <section className="py-8 sm:py-12"><div className="container grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <div className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={service.image} alt={`${service.title} work example`} fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" /></div>
          <div className="grid gap-4 sm:grid-cols-3">{[[IndianRupee, "Starting price", formatPrice(service.startingPrice)], [Clock3, "Typical timeline", service.timeline], [ShieldCheck, "Service assurance", "Verified scope"]].map(([Icon, label, value]) => <Card key={String(label)} className="p-4"><Icon className="size-5 text-primary" aria-hidden /><p className="mt-3 text-xs text-muted-foreground">{String(label)}</p><p className="font-bold">{String(value)}</p></Card>)}</div>
          <Card className="p-5"><h2 className="text-2xl font-bold">Service overview</h2><p className="mt-3 leading-7 text-muted-foreground">{service.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{service.features.map((feature) => <span key={feature} className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm font-semibold"><CheckCircle2 className="size-4 text-secondary" aria-hidden />{feature}</span>)}</div></Card>
          <div><SectionHeading eyebrow="Packages" title="A clear starting point for scope and budget." /><div className="mt-5 grid gap-4 sm:grid-cols-2">{service.packages.map((pack) => <Card key={pack.name} className="p-5"><Badge variant={pack.name === "Premium" ? "accent" : "secondary"}>{pack.name}</Badge><p className="mt-4 text-2xl font-bold">{pack.price}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{pack.description}</p><ul className="mt-4 space-y-2">{service.deliverables.map((item) => <li key={item} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></Card>)}</div></div>
          <Card className="p-5"><h2 className="text-2xl font-bold">How the work moves</h2><div className="mt-5 grid gap-3 sm:grid-cols-4">{["Requirement", "Inspection", "Quotation", "Delivery"].map((step, index) => <div key={step} className="rounded-md bg-muted p-4"><span className="text-xs font-bold text-primary">0{index + 1}</span><p className="mt-2 font-semibold">{step}</p></div>)}</div></Card>
          {providers.length ? <div><SectionHeading eyebrow="Verified professionals" title={`Providers for ${service.title.toLowerCase()}.`} /><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{providers.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}</div></div> : null}
          <div><SectionHeading eyebrow="FAQ" title="Know before you request a quote." /><div className="mt-5"><FaqList faqs={service.faq} /></div></div>
        </div>
        <aside id="quote" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start"><QuoteForm title={`Quote for ${service.title}`} leadType={leadTypes[family]} source={`${service.title} Detail`} serviceSlug={service.slug} compact /></aside>
      </div></section>
      <div className="mobile-sticky-actions sticky bottom-0 z-30 grid grid-cols-3 border-t bg-background p-2 lg:hidden"><a href="tel:+919000000000" className={cn(buttonVariants({ variant: "outline" }))}>Call</a><a href="https://wa.me/919000000000" className={cn(buttonVariants({ variant: "secondary" }))}>WhatsApp</a><a href="#quote" className={cn(buttonVariants())}>Book</a></div>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faq), breadcrumbSchema([{ name: "Home", url: "/" }, { name: meta.title, url: `/${family}` }, { name: service.title, url: `/${family}/${service.slug}` }])]} />
    </>
  );
}
