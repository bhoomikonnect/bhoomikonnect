import { ArrowRight, Building2, IndianRupee, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, developers, propertyTypes } from "@/lib/data";

export function SearchPanel() {
  return (
    <form action="/buy" className="rounded-lg border bg-background/94 p-3 shadow-panel backdrop-blur-xl">
      <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
        <label className="group flex min-h-14 items-center gap-3 rounded-md border bg-card px-3">
          <MapPin className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">City</span>
            <select name="city" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">Any growth city</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="group flex min-h-14 items-center gap-3 rounded-md border bg-card px-3">
          <Building2 className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">Property Type</span>
            <select name="propertyType" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">All types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="group flex min-h-14 items-center gap-3 rounded-md border bg-card px-3">
          <IndianRupee className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">Budget</span>
            <select name="budget" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">Any budget</option>
              <option value="0-7500000">Below ₹75 L</option>
              <option value="7500000-15000000">₹75 L - ₹1.5 Cr</option>
              <option value="15000000-30000000">₹1.5 Cr - ₹3 Cr</option>
              <option value="30000000-80000000">₹3 Cr+</option>
            </select>
          </span>
        </label>

        <label className="group flex min-h-14 items-center gap-3 rounded-md border bg-card px-3">
          <SlidersHorizontal className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">Developer</span>
            <select name="developer" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">Any verified developer</option>
              {developers.map((developer) => (
                <option key={developer.slug} value={developer.slug}>
                  {developer.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        <Button type="submit" size="lg" className="min-h-14">
          Search <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
