import { FilterSidebar } from "@/components/sections/FilterSidebar";
import { ListingGrid } from "@/components/sections/ListingGrid";
import { SearchPanel } from "@/components/sections/SearchPanel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Map, SlidersHorizontal, X } from "lucide-react";
import type { Property } from "@/types/marketplace";

type ListingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  properties: Property[];
};

export function ListingPage({ eyebrow, title, description, properties }: ListingPageProps) {
  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-end">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {["City", "Area", "Type", "Budget", "Bedrooms", "Facing", "Approval", "RERA"].map((item) => (
                  <Badge key={item} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {properties.length} verified listings with direct developer enquiry, approval details, nearby context, and SEO-ready property pages.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <SearchPanel />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <details className="mb-5 rounded-lg border bg-card p-3 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold"><span className="flex items-center gap-2"><SlidersHorizontal className="size-4" aria-hidden /> Filters</span><span className="text-xs text-primary">Open</span></summary>
            <div className="mt-4"><FilterSidebar /></div>
          </details>
          <div className="mb-5 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-bold">{properties.length} properties</p><div className="mt-2 flex flex-wrap gap-2"><Badge variant="muted">Verified only <X className="size-3" aria-hidden /></Badge><Badge variant="muted">India <X className="size-3" aria-hidden /></Badge></div></div>
            <div className="flex flex-wrap items-center gap-2"><label className="text-sm font-semibold">Sort <select className="focus-ring ml-2 min-h-10 rounded-md border bg-background px-3"><option>Recommended</option><option>Price: Low to High</option><option>Newest first</option><option>Possession</option></select></label><div className="flex rounded-md border p-1" aria-label="View options"><Button type="button" variant="ghost" size="icon" title="Grid view"><Grid2X2 className="size-4" aria-hidden /></Button><Button type="button" variant="ghost" size="icon" title="List view"><List className="size-4" aria-hidden /></Button><Button type="button" variant="ghost" size="icon" title="Map view"><Map className="size-4" aria-hidden /></Button></div></div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="hidden lg:block"><FilterSidebar /></div>
            <div><ListingGrid properties={properties} /><nav className="mt-8 flex justify-center gap-2" aria-label="Property result pages"><Button type="button" variant="outline" size="sm" disabled>Previous</Button><Button type="button" size="sm">1</Button><Button type="button" variant="outline" size="sm">2</Button><Button type="button" variant="outline" size="sm">Next</Button></nav></div>
          </div>
        </div>
      </section>
    </>
  );
}
