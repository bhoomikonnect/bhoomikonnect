import type { Property } from "@/types/marketplace";
import { PropertyCard } from "@/components/sections/PropertyCard";

type ListingGridProps = {
  properties: Property[];
};

export function ListingGrid({ properties }: ListingGridProps) {
  if (!properties.length) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h2 className="text-xl font-bold">No matching properties yet</h2>
        <p className="mt-2 text-muted-foreground">Try a broader city, budget, or property type.</p>
      </div>
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
