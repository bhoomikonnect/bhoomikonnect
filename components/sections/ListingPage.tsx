import { FilterSidebar } from "@/components/sections/FilterSidebar";
import { ListingGrid } from "@/components/sections/ListingGrid";
import { SearchPanel } from "@/components/sections/SearchPanel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
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
        <div className="container grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar />
          <ListingGrid properties={properties} />
        </div>
      </section>
    </>
  );
}
