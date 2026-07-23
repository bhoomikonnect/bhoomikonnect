import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Map, MapPin, TrendingUp } from "lucide-react";
import { EmptyCatalogState } from "@/components/sections/EmptyCatalogState";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCities, getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Popular Real Estate Cities and Micro Markets",
  description:
    "Explore city-wise real estate opportunities, active listings, average prices, micro-markets, and verified developer projects.",
  path: "/cities",
  keywords: ["real estate cities", "property micro markets", "city property search", "popular property cities"]
});

export default async function CitiesPage() {
  const [cities, properties] = await Promise.all([getCities(), getProperties()]);

  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            as="h1"
            eyebrow="Cities"
            title="Micro-market intelligence for India's growing property corridors."
            description="City hubs connect buyers to active listings, average pricing, growth indicators, and location-specific projects."
          />
          <Card className="map-mesh min-h-56 p-5">
            <div className="inline-flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-sm font-semibold shadow-sm">
              <Map className="size-4 text-primary" aria-hidden /> Active launch map
            </div>
          </Card>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          {cities.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{cities.map((city) => {
            const count = properties.filter((property) => property.location.city === city.name).length;

            return (
              <Link key={city.slug} href={`/buy?city=${city.name}`} className="group rounded-lg border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4" aria-hidden /> {city.state}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{city.name}</h2>
                  </div>
                  {city.growth && city.growth !== "+0%" ? <Badge variant="secondary">
                    <TrendingUp className="size-3" aria-hidden /> {city.growth}
                  </Badge> : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {city.microMarkets.map((market) => (
                    <span key={market} className="rounded-sm bg-muted px-2 py-1 text-xs font-medium">
                      {market}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
                  <span>
                    <span className="block text-xs text-muted-foreground">Average price</span>
                    <span className="font-bold">{city.avgPrice}</span>
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Active listings</span>
                    <span className="font-bold">{count}</span>
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  View city inventory <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}</div> : <EmptyCatalogState title="City guides are being prepared" description="Location pages appear after local inventory and market details have been reviewed for publication." actionLabel="Tell us your preferred city" />}
        </div>
      </section>
    </>
  );
}
