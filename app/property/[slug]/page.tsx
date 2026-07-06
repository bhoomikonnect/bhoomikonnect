import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Bookmark,
  CalendarClock,
  Download,
  FileText,
  Heart,
  IndianRupee,
  MapPin,
  Maximize2,
  ParkingCircle,
  Share2,
  ShieldCheck,
  Star,
  Video
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { LeadForm } from "@/components/sections/LeadForm";
import { MapPreview } from "@/components/sections/MapPreview";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDeveloperBySlug, getPropertyBySlug, getRelatedProperties, properties } from "@/lib/data";
import { breadcrumbSchema, createMetadata, faqSchema, propertySchema } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";

type PropertyPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug
  }));
}

export function generateMetadata({ params }: PropertyPageProps): Metadata {
  const property = getPropertyBySlug(params.slug);

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

export default function PropertyDetailPage({ params }: PropertyPageProps) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const developer = getDeveloperBySlug(property.developerSlug);
  const related = getRelatedProperties(property);
  const faqs = [
    {
      question: `Is ${property.projectName} RERA approved?`,
      answer: `Yes. The listing includes RERA number ${property.reraNumber} and approval details: ${property.approvals.join(", ")}.`
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
              <button className={cn(buttonVariants({ variant: "outline" }))} type="button">
                <Heart className="size-4" aria-hidden /> Save
              </button>
              <button className={cn(buttonVariants({ variant: "outline" }))} type="button">
                <Bookmark className="size-4" aria-hidden /> Compare
              </button>
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
            <div className="grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image src={property.gallery[0]} alt={`${property.title} main gallery`} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                {property.gallery.slice(1, 3).map((image, index) => (
                  <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image src={image} alt={`${property.title} gallery ${index + 2}`} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Price", value: formatPrice(property.price), icon: IndianRupee },
                { label: "Area", value: `${property.area} ${property.areaUnit}`, icon: Maximize2 },
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
                  ["Price per sq.ft", `₹${property.pricePerSqFt.toLocaleString("en-IN")}`],
                  ["Booking amount", formatPrice(property.bookingAmount)],
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
                  <p className="mt-1 text-sm text-muted-foreground">Plans, brochure, video, and virtual-tour actions are ready for Supabase Storage assets.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className={cn(buttonVariants({ variant: "outline", size: "sm" }))} type="button">
                    <Video className="size-4" aria-hidden /> Video
                  </button>
                  <button className={cn(buttonVariants({ variant: "outline", size: "sm" }))} type="button">
                    <Download className="size-4" aria-hidden /> Brochure
                  </button>
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

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Starting price</p>
              <p className="mt-1 text-3xl font-bold">{formatPrice(property.price)}</p>
              <p className="mt-2 text-sm text-muted-foreground">₹{property.pricePerSqFt.toLocaleString("en-IN")} per sq.ft · Booking {formatPrice(property.bookingAmount)}</p>
            </Card>
            <LeadForm source="Book Site Visit" />
          </aside>
        </div>
      </section>

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
