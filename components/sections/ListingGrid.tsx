import type { Property } from "@/types/marketplace";
import { EmptyCatalogState } from "@/components/sections/EmptyCatalogState";
import { PropertyCard } from "@/components/sections/PropertyCard";

type ListingGridProps = {
  properties: Property[];
};

export function ListingGrid({ properties }: ListingGridProps) {
  if (!properties.length) {
    return (
      <EmptyCatalogState
        title="No verified properties published yet"
        description="New listings are being reviewed before they appear here. Share your requirement and our team will contact you when a suitable property is available."
        actionLabel="Share property requirement"
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
