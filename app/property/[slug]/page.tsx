import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  CalendarClock,
  Download,
  FileText,
  IndianRupee,
  MapPin,
  MessageCircle,
  Maximize2,
  ParkingCircle,
  Share2,
  ShieldCheck,
  Phone
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PropertyActionButtons } from "@/components/properties/PropertyActionButtons";
import { FaqList } from "@/components/sections/FaqList";
import { LeadForm } from "@/components/sections/LeadForm";
import { MapPreview } from "@/components/sections/MapPreview";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { ContactActionLink } from "@/components/analytics/ContactActionLink";
import { publicContactLinks, whatsappContactLink } from "@/lib/env";
import { getProperties, getPropertyBySlug, getRelatedProperties } from "@/lib/marketplace";
import { publicPropertyTitle } from "@/lib/public-listing";
import { breadcrumbSchema, createMetadata, faqSchema, propertySchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { featuredLaunches } from "@/lib/featured-launches";

type PropertyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const properties = await getProperties();
  const slugs = new Set(properties.map((property) => property.slug));

  return [...properties, ...featuredLaunches.filter((property) => !slugs.has(property.slug))].map((property) => ({
    slug: property.slug
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return createMetadata({
      title: "Property Not Found",
      description: "The requested property is not available on BhoomiKonnect.",
      path: `/property/${params.slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: `${publicPropertyTitle(property)} | BhoomiKonnect`,
    description: "Review a BhoomiKonnect-verified property listing and contact our team for current availability, pricing, documents, and a site visit.",
    path: `/property/${property.slug}`,
    keywords: ["verified property", "BhoomiKonnect"]
  });
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const related = await getRelatedProperties(property);
  const publicTitle = publicPropertyTitle(property);
  const hasProposedApproval = property.approvals.some((approval) => approval.toLowerCase().includes("proposed"));
  const faqs = [
    {
      question: "What is the approval status of this property?",
      answer: hasProposedApproval
        ? `This listing is presented as a proposed approval project. Current details: ${property.approvals.join(", ")}. Buyers should verify final approval and registration documents before booking.`
        : `This listing includes RERA number ${property.reraNumber} and approval details: ${property.approvals.join(", ")}. Buyers should independently verify the current documents before booking.`
    },
    {
      question: "What is the possession timeline?",
      answer: `The current possession timeline is ${property.possessionDate}.`
    },
    {
      question: "Can I contact the developer directly?",
      answer:
        "Yes. BhoomiKonnect supports enquiry, call, WhatsApp, callback, and site-visit actions directly from the property page."
    }
  ];

  return (
    <>
      <section className="border-b bg-muted/45 py-8">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-primary">Buy</Link>
            <span>/</span>
            <span className="text-foreground">{publicTitle}</span>
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>
                  <BadgeCheck className="size-3" aria-hidden /> Verified Property
                </Badge>
                <Badge variant="accent">{property.status}</Badge>
                <Badge variant="secondary">{property.propertyType}</Badge>
              </div>
              <h1 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">{publicTitle}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" aria-hidden /> {property.location.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PropertyActionButtons id={property.id} title="a verified BhoomiKonnect property" />
              <button className={cn(buttonVariants({ variant: "outline" }))} type="button">
                <Share2 className="size-4" aria-hidden /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <MediaGallery images={property.gallery} title={publicTitle} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Current price", value: "Contact BhoomiKonnect", icon: IndianRupee },
                { label: "Area", value: property.area > 0 ? `${property.area} ${property.areaUnit}` : "On request", icon: Maximize2 },
                { label: "Possession", value: property.possessionDate, icon: CalendarClock },
                { label: "Parking", value: property.parking, icon: ParkingCircle }
              ].map((item) => (
                <Card key={item.label} className="p-4">
                  <item.icon className="size-5 text-primary" aria-hidden />
                  <p className="mt-3 text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </Card>
              ))}
            </div>

            <Card className="p-5">
              <h2 className="text-2xl font-bold">Property Description</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{property.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Listing partner", "BhoomiKonnect"],
                  ["Sale/Rent", property.saleType],
                  ["Price", "Shared on request"],
                  ["Booking amount", "Shared on request"],
                  ["Facing", property.facing],
                  ["Road width", property.roadWidth],
                  ["Bedrooms", property.bedrooms ? `${property.bedrooms}` : "Flexible"],
                  ["Bathrooms", property.bathrooms ? `${property.bathrooms}` : "Flexible"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-muted p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="inline-flex items-center gap-2 rounded-md bg-muted p-3 text-sm font-semibold">
                    <ShieldCheck className="size-4 text-secondary" aria-hidden /> {amenity}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold">Floor Plans and Media</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Review supplied plans, documents, pricing material and project video. Current terms remain subject to confirmation.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="#property-enquiry" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}><Download className="size-4" aria-hidden /> Request documents</a>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.floorPlans.map((plan) => (
                  <div key={plan} className="rounded-md border bg-muted p-4">
                    <FileText className="size-5 text-primary" aria-hidden />
                    <p className="mt-3 font-semibold">{plan}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-md border border-primary/15 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">Documents and walkthrough media are reviewed and shared by BhoomiKonnect on request, so third-party company branding and contact details remain private.</p>
            </Card>

            <Card className="p-5">
              <h2 className="text-2xl font-bold">BhoomiKonnect listing support</h2>
              <p className="mt-3 leading-7 text-muted-foreground">Our team coordinates current availability, pricing, approvals, documents and site visits directly. This keeps the property search simple and BhoomiKonnect as your single point of contact.</p>
            </Card>

            <div>
              <SectionHeading eyebrow="Location" title="Map and nearby essentials." />
              <div className="mt-5">
                <MapPreview property={property} />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="FAQ" title="Common buyer questions." />
              <div className="mt-5">
                <FaqList faqs={faqs} />
              </div>
            </div>

            {related.length ? (
              <div>
                <SectionHeading eyebrow="Related properties" title="More listings you may want to compare." />
                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {related.map((item) => (
                    <PropertyCard key={item.id} property={item} compact />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside id="property-enquiry" className="scroll-mt-24 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Current price</p>
              <p className="mt-1 text-3xl font-bold">Contact BhoomiKonnect</p>
              <p className="mt-2 text-sm text-muted-foreground">Contact us for current availability, pricing and site-visit slots.</p>
            </Card>
            <LeadForm
              source="Book Site Visit"
              propertySlug={property.slug}
              developerSlug={property.developerSlug}
            />
          </aside>
        </div>
      </section>

      <div className="mobile-sticky-actions sticky bottom-0 z-30 grid grid-cols-3 gap-2 border-t bg-background p-2 lg:hidden">
        <ContactActionLink channel="call" source="Property mobile call button" propertySlug={property.slug} href={publicContactLinks.phone} className={cn(buttonVariants({ variant: "outline" }))}><Phone className="size-4" aria-hidden /> Call</ContactActionLink>
        <ContactActionLink channel="whatsapp" source="Property mobile WhatsApp button" propertySlug={property.slug} href={whatsappContactLink("I am interested in a verified BhoomiKonnect property")} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "secondary" }))}><MessageCircle className="size-4" aria-hidden /> WhatsApp</ContactActionLink>
        <a href="#property-enquiry" className={cn(buttonVariants())}>Enquire</a>
      </div>

      <JsonLd
        data={[
          propertySchema(property),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Buy", url: "/buy" },
            { name: publicTitle, url: `/property/${property.slug}` }
          ]),
          faqSchema(faqs)
        ]}
      />
    </>
  );
}
