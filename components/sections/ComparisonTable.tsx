import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getProperties } from "@/lib/marketplace";
import { formatPrice } from "@/lib/utils";

export async function ComparisonTable() {
  const properties = await getProperties();
  const items = properties.slice(0, 3);

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="grid min-w-[720px] grid-cols-[1.1fr_repeat(3,1fr)]">
        <div className="border-b bg-muted p-4 font-semibold">Compare</div>
        {items.map((property) => (
          <Link key={property.id} href={`/property/${property.slug}`} className="border-b border-l bg-muted p-4 font-semibold hover:text-primary">
            {property.projectName}
          </Link>
        ))}
        {[
          ["Type", ...items.map((item) => item.propertyType)],
          ["Starting price", ...items.map((item) => formatPrice(item.price))],
          ["Area", ...items.map((item) => `${item.area} ${item.areaUnit}`)],
          ["Possession", ...items.map((item) => item.possessionDate)],
          ["RERA", ...items.map((item) => item.reraNumber)]
        ].map((row) => (
          <div key={row[0]} className="contents">
            {row.map((cell, index) => (
              <div key={`${row[0]}-${cell}-${index}`} className="border-b border-l-0 p-4 text-sm first:border-l-0 [&:not(:first-child)]:border-l">
                {index === 0 ? (
                  <span className="font-semibold text-muted-foreground">{cell}</span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-secondary" aria-hidden /> {cell}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
