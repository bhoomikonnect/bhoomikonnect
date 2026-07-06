import { MapPin, Navigation, Plane, School, Stethoscope } from "lucide-react";
import type { Property } from "@/types/marketplace";

const iconMap = {
  School,
  Hospital: Stethoscope,
  Metro: Navigation,
  Airport: Plane,
  "Business Hub": MapPin
};

type MapPreviewProps = {
  property: Property;
};

export function MapPreview({ property }: MapPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="map-mesh relative min-h-[320px]">
        <div className="absolute left-[56%] top-[46%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-lift">
          <MapPin className="size-7" aria-hidden />
        </div>
        <div className="absolute left-5 top-5 rounded-md bg-background/90 p-3 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold text-muted-foreground">Coordinates</p>
          <p className="text-sm font-bold">
            {property.location.latitude}, {property.location.longitude}
          </p>
        </div>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {property.nearby.map((place) => {
          const Icon = iconMap[place.type];

          return (
            <div key={place.label} className="flex items-center gap-3 rounded-md bg-muted p-3">
              <span className="grid size-9 place-items-center rounded-md bg-background text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{place.label}</span>
                <span className="text-xs text-muted-foreground">{place.type} · {place.distance}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
