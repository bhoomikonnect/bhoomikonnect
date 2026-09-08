import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, Instagram, Linkedin, Mail, Phone, Star, Youtube } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDeveloperBySlug, getDevelopers, getPropertiesByDeveloper } from "@/lib/marketplace";
import { breadcrumbSchema, createMetadata, developerSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

type DeveloperPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const developers = await getDevelopers();

  return developers.map((developer) => ({
    slug: developer.slug
  }));
}

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  const developer = await getDeveloperBySlug(params.slug);

  if (!developer) {
    return createMetadata({
      title: "Developer Not Found",
      description: "The requested developer profile is not available on BhoomiKonnect.",
      path: `/developers/${params.slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: `${developer.name} Projects, Reviews and Contact`,
    description: `${developer.name} profile with completed, ongoing, and upcoming projects, specialties, reviews, contact details, and verified listings.`,
    path: `/developers/${developer.slug}`,
    keywords: [developer.name, "verified developer", "developer profile", "real estate projects"]
  });
}

export default async function DeveloperProfilePage({ params }: DeveloperPageProps) {
  const developer = await getDeveloperBySlug(params.slug);

  if (!developer) {
    notFound();
  }

  const developerProperties = await getPropertiesByDeveloper(developer.slug);

  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <div className="grid size-20 place-items-center rounded-lg bg-primary text-2xl font-bold text-white shadow-lift">
                {developer.logoInitials}
              </div>
              <div>
                <Badge variant="secondary">Verified Developer</Badge>
                <h1 className="mt-3 text-balance text-4xl font-bold sm:text-5xl">{developer.name}</h1>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{developer.profile}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Completed", developer.completedProjects],
              ["Ongoing", developer.ongoingProjects],
              ["Upcoming", developer.upcomingProjects]
            ].map(([label, value]) => (
              <Card key={label} className="p-4 text-center">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[330px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold">Contact</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <a href={`tel:${developer.contact.phone}`} className="flex items-center gap-2 hover:text-primary">
                  <Phone className="size-4" aria-hidden /> {developer.contact.phone}
                </a>
                <a href={`mailto:${developer.contact.email}`} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="size-4" aria-hidden /> {developer.contact.email}
                </a>
                <a href={developer.contact.website} className="flex items-center gap-2 hover:text-primary">
                  <Globe className="size-4" aria-hidden /> Website
                </a>
              </div>
              <div className="mt-5 flex gap-2">
                <a href={developer.socials.linkedin} className={cn(buttonVariants({ variant: "outline", size: "icon" }))} aria-label="LinkedIn">
                  <Linkedin className="size-4" aria-hidden />
                </a>
                <a href={developer.socials.instagram} className={cn(buttonVariants({ variant: "outline", size: "icon" }))} aria-label="Instagram">
                  <Instagram className="size-4" aria-hidden />
                </a>
                <a href={developer.socials.youtube} className={cn(buttonVariants({ variant: "outline", size: "icon" }))} aria-label="YouTube">
                  <Youtube className="size-4" aria-hidden />
                </a>
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-bold">Company snapshot</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <p><span className="text-muted-foreground">Established:</span> {developer.established}</p>
                <p><span className="text-muted-foreground">Headquarters:</span> {developer.headquarters}</p>
                <p className="flex items-center gap-2">
                  <Star className="size-4 fill-accent text-accent" aria-hidden /> {developer.rating} rating · {developer.reviews} reviews
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {developer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">{specialty}</Badge>
                ))}
              </div>
            </Card>
          </aside>

          <div className="space-y-8">
            <SectionHeading
              eyebrow="Projects"
              title={`Active listings by ${developer.name}.`}
              description="Each project links to a detail page with price, approvals, map, amenities, lead capture, and related listings."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {developerProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          developerSchema(developer),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Developers", url: "/developers" },
            { name: developer.name, url: `/developers/${developer.slug}` }
          ])
        ]}
      />
    </>
  );
}
