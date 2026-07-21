import Link from "next/link";
import { ArrowRight, Building2, IndianRupee, MapPin, Ruler, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { propertyTypes } from "@/lib/data";
import { getCities } from "@/lib/marketplace";

export async function SearchPanel() {
  const cities = await getCities();

  return (
    <form action="/buy" className="min-w-0 rounded-lg border bg-background/94 p-3 shadow-panel backdrop-blur-xl">
      <div className="mb-3 flex overflow-x-auto border-b" aria-label="Search modes">
        {[{ label: "Buy", href: "/buy" }, { label: "Rent", href: "/rent" }, { label: "Projects", href: "/projects" }, { label: "Services", href: "/maintenance" }].map((tab, index) => <Link key={tab.href} href={tab.href} className={`min-w-20 flex-1 border-b-2 px-2 py-2 text-center text-xs font-semibold sm:min-w-24 sm:px-4 sm:text-sm ${index === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{tab.label}</Link>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

        <label className="group hidden min-h-14 items-center gap-3 rounded-md border bg-card px-3 sm:flex">
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

        <label className="group hidden min-h-14 items-center gap-3 rounded-md border bg-card px-3 sm:flex">
          <Ruler className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">Size</span>
            <select name="area" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">Any size</option><option value="0-1200">Below 1,200</option><option value="1200-2400">1,200 - 2,400</option><option value="2400+">2,400+ sq.ft</option>
            </select>
          </span>
        </label>

        <label className="group hidden min-h-14 items-center gap-3 rounded-md border bg-card px-3 sm:flex">
          <ShieldCheck className="size-5 text-primary" aria-hidden />
          <span className="w-full">
            <span className="block text-xs font-semibold text-muted-foreground">Approval</span>
            <select name="approval" className="w-full bg-transparent text-sm font-semibold outline-none">
              <option value="">Any approval</option><option value="RERA">RERA</option><option value="DTCP">DTCP</option><option value="HMDA">HMDA</option><option value="Municipality">Municipality</option>
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
