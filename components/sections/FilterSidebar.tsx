import { BadgeCheck, BedDouble, CalendarClock, Home, MapPinned, Ruler, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { amenities, propertyTypes } from "@/lib/data";
import { getCities, getDevelopers } from "@/lib/marketplace";

export async function FilterSidebar() {
  const [cities, developers] = await Promise.all([getCities(), getDevelopers()]);

  return (
    <aside className="rounded-lg border bg-card p-4 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold">Search filters</h2>
        <BadgeCheck className="size-5 text-primary" aria-hidden />
      </div>

      <form action="/buy" className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <MapPinned className="size-4 text-primary" aria-hidden /> City
          </span>
          <select name="city" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">Any city</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <Home className="size-4 text-primary" aria-hidden /> Property type
          </span>
          <select name="propertyType" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">All types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <BedDouble className="size-4 text-primary" aria-hidden /> Bedrooms
          </span>
          <select name="bedrooms" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">Any</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <Ruler className="size-4 text-primary" aria-hidden /> Area size
          </span>
          <select name="area" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">Any size</option>
            <option value="0-1200">Below 1200 sq.ft</option>
            <option value="1200-2000">1200 - 2000 sq.ft</option>
            <option value="2000-4000">2000+ sq.ft</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <CalendarClock className="size-4 text-primary" aria-hidden /> Possession
          </span>
          <select name="possession" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">Any timeline</option>
            <option value="Immediate">Immediate</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028+</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Developer
          <select name="developer" className="focus-ring min-h-11 rounded-md border bg-background px-3">
            <option value="">All developers</option>
            {developers.map((developer) => (
              <option key={developer.slug} value={developer.slug}>
                {developer.name}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="grid gap-2">
          <legend className="inline-flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="size-4 text-primary" aria-hidden /> Amenities
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {amenities.slice(0, 8).map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 rounded-md bg-muted px-2 py-2 text-xs">
                <input type="checkbox" name="amenities" value={amenity} className="accent-primary" />
                {amenity}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm font-semibold text-primary">
          <input type="checkbox" name="rera" value="true" defaultChecked className="accent-primary" />
          RERA verified only
        </label>

        <Button type="submit">Apply filters</Button>
      </form>
    </aside>
  );
}
