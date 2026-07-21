import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BedDouble, Building2, MapPin, Ruler, Star } from "lucide-react";
import { PropertyActionButtons } from "@/components/properties/PropertyActionButtons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getDeveloperBySlug } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import type { Property } from "@/types/marketplace";

type PropertyCardProps = {
  property: Property;
  compact?: boolean;
};

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const developer = getDeveloperBySlug(property.developerSlug);
  const developerName = property.developerName || developer?.name || "Verified Developer";

  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/property/${property.slug}`} className="block">
        <div className={cn("relative overflow-hidden", compact ? "aspect-[4/3]" : "aspect-[16/11]")}>
          <Image
            src={property.gallery[0]}
            alt={`${property.title} property image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/5 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {property.verifiedProperty ? (
              <Badge className="border-white/20 bg-white/92 text-primary">
                <BadgeCheck className="size-3" aria-hidden /> Verified
              </Badge>
            ) : null}
            <Badge variant="accent">{property.status}</Badge>
            {property.featuredProperty ? <Badge variant="secondary">Featured</Badge> : null}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="rounded-md bg-white/92 px-3 py-2 text-slate-950 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-slate-500">Starting from</p>
              <p className="text-lg font-bold">{formatPrice(property.price)}</p>
            </div>
            <span className="grid size-10 place-items-center rounded-md bg-primary text-white shadow-sm">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/property/${property.slug}`} className="line-clamp-1 text-lg font-bold hover:text-primary">
              {property.title}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden /> {property.location.area}, {property.location.city}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-xs font-semibold">
            <Star className="size-3 fill-accent text-accent" aria-hidden /> {property.rating}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <span className="rounded-md bg-muted px-3 py-2">
            <Building2 className="mb-1 size-4 text-primary" aria-hidden />
            {property.propertyType}
          </span>
          <span className="rounded-md bg-muted px-3 py-2">
            <Ruler className="mb-1 size-4 text-primary" aria-hidden />
            {property.area} {property.areaUnit}
          </span>
          <span className="rounded-md bg-muted px-3 py-2">
            <BedDouble className="mb-1 size-4 text-primary" aria-hidden />
            {property.bedrooms ? `${property.bedrooms} BHK` : "Flexible"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
          <p className="line-clamp-1 text-sm text-muted-foreground">
            by <span className="font-semibold text-foreground">{developerName}</span>
          </p>
          <span className="text-xs font-semibold text-primary">{property.approvals[0] || "Approval review"}</span>
        </div>
        <div className="mt-3 grid grid-cols-[auto_auto_auto_1fr] gap-2">
          <PropertyActionButtons id={property.id} title={property.title} compact />
          <Link href={`/property/${property.slug}`} className={cn(buttonVariants({ variant: "default", size: "sm" }))}>View Details</Link>
        </div>
      </div>
    </Card>
  );
}
