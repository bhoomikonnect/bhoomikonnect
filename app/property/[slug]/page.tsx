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
  Star,
  Video
  ,Phone
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
import { publicContactLinks, whatsappContactLink } from "@/lib/env";
import { getDeveloperBySlug, getProperties, getPropertyBySlug, getRelatedProperties } from "@/lib/marketplace";
import { breadcrumbSchema, createMetadata, faqSchema, propertySchema } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";
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
    title: property.seoTitle,
    description: property.metaDescription,
    path: `/property/${property.slug}`,
    image: property.gallery[0],
    keywords: property.keywords
  });
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const developer = await getDeveloperBySlug(property.developerSlug);
  const related = await getRelatedProperties(property);
  const hasProposedApproval = property.approvals.some((approval) => approval.toLowerCase().includes("proposed"));
  const faqs = [
    {
      question: `What is the approval status of ${property.projectName}?`,
      answer: hasProposedApproval
        ? `${property.projectName} is presented as a proposed approval project. Current details: ${property.approvals.join(", ")}. Buyers should verify final approval and registration documents before booking.`
        : `${property.projectName} lists RERA number ${property.reraNumber} and approval details: ${property.approvals.join(", ")}. Buyers should independently verify the current documents before booking.`
    },
    {
      question: `What is the possession timeline for ${property.projectName}?`,
      answer: `${property.projectName} has a possession timeline of ${property.possessionDate}.`
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
            <span className="text-foreground">{property.title}</span>
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
              <h1 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">{property.title}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" aria-hidden /> {property.location.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PropertyActionButtons id={property.id} title={property.title} />
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
            <MediaGallery images={property.gallery} title={property.title} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Price", value: property.price > 0 ? formatPrice(property.price) : "On request", icon: IndianRupee },
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
                  ["Project name", property.projectName],
                  ["Sale/Rent", property.saleType],
                  ["Price", property.pricePerSqFt > 0 ? `₹${property.pricePerSqFt.toLocaleString("en-IN")} per sq.ft` : "Available on request"],
                  ["Booking amount", property.bookingAmount > 0 ? formatPrice(property.bookingAmount) : "Available on request"],
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
                  {property.videoUrl ? <a href="#project-video" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}><Video className="size-4" aria-hidden /> Video</a> : null}
                  {property.brochureUrl ? <a href={property.brochureUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}><Download className="size-4" aria-hidden /> Brochure / document</a> : null}
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
              {property.documents?.length ? <div className="mt-5 flex flex-wrap gap-2">{property.documents.map((document) => <a key={document.url} href={document.url} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}><FileText className="size-4" aria-hidden /> {document.label}</a>)}</div> : null}
              {property.videoUrl ? <video id="project-video" controls playsInline preload="metadata" className="mt-5 max-h-[680px] w-full scroll-mt-24 rounded-lg bg-black"><source src={property.videoUrl} type="video/mp4" /></video> : null}
            </Card>

            <Card className="p-5">
              <h2 className="text-2xl font-bold">Developer Details</h2>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="grid size-16 shrink-0 place-items-center rounded-md bg-primary text-xl font-bold text-white">
                  {developer?.logoInitials}
                </div>
                <div className="flex-1">
                  <Link href={`/developers/${developer?.slug}`} className="text-xl font-bold hover:text-primary">
                    {developer?.name}
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{developer?.profile}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Star className="size-3 fill-current" aria-hidden /> {developer?.rating} rating
                    </Badge>
                    <Badge variant="outline">{developer?.completedProjects} completed projects</Badge>
                    <Badge variant="outline">Established {developer?.established}</Badge>
                  </div>
                </div>
              </div>
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
              <p className="text-sm text-muted-foreground">Starting price</p>
              <p className="mt-1 text-3xl font-bold">{property.price > 0 ? formatPrice(property.price) : "Price on request"}</p>
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
        <a href={publicContactLinks.phone} className={cn(buttonVariants({ variant: "outline" }))}><Phone className="size-4" aria-hidden /> Call</a>
        <a href={whatsappContactLink(`I am interested in ${property.title}`)} className={cn(buttonVariants({ variant: "secondary" }))}><MessageCircle className="size-4" aria-hidden /> WhatsApp</a>
        <a href="#property-enquiry" className={cn(buttonVariants())}>Enquire</a>
      </div>

      <JsonLd
        data={[
          propertySchema(property, developer),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Buy", url: "/buy" },
            { name: property.title, url: `/property/${property.slug}` }
          ]),
          faqSchema(faqs)
        ]}
      />
    </>
  );
}
