"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/marketplace";

export function ComparisonManager({ properties }: { properties: Property[] }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { try { setIds(JSON.parse(localStorage.getItem("bk_property_comparison") || "[]")); } catch { setIds([]); } }, []);
  const selected = ids.map((id) => properties.find((property) => property.id === id)).filter(Boolean) as Property[];
  function clear() { localStorage.removeItem("bk_property_comparison"); setIds([]); }
  if (!selected.length) return <Card className="p-8 text-center"><h2 className="text-xl font-bold">Your comparison is empty</h2><p className="mt-2 text-muted-foreground">Use Compare on any property card to add up to four properties.</p><Link href="/buy" className="mt-5 inline-flex text-sm font-semibold text-primary">Browse properties</Link></Card>;
  const rows: Array<[string, (property: Property) => string]> = [["Price", (p) => formatPrice(p.price)], ["Location", (p) => `${p.location.area}, ${p.location.city}`], ["Type", (p) => p.propertyType], ["Area", (p) => `${p.area} ${p.areaUnit}`], ["Bedrooms", (p) => p.bedrooms ? String(p.bedrooms) : "Flexible"], ["Bathrooms", (p) => p.bathrooms ? String(p.bathrooms) : "Flexible"], ["Facing", (p) => p.facing], ["Approvals", (p) => p.approvals.join(", ")], ["Possession", (p) => p.possessionDate], ["Price / unit", (p) => `₹${p.pricePerSqFt.toLocaleString("en-IN")}`]];
  return <div><div className="mb-4 flex justify-end"><Button type="button" variant="outline" onClick={clear}>Clear comparison</Button></div><div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-muted"><th className="p-4">Attribute</th>{selected.map((property) => <th key={property.id} className="p-4"><Link href={`/property/${property.slug}`} className="font-bold hover:text-primary">{property.title}</Link></th>)}</tr></thead><tbody>{rows.map(([label, getValue]) => <tr key={label} className="border-t"><th className="p-4 font-semibold text-muted-foreground">{label}</th>{selected.map((property) => <td key={property.id} className="p-4">{getValue(property)}</td>)}</tr>)}</tbody></table></div></div>;
}
