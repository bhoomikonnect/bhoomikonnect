import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Material } from "@/types/marketplace";

export function MaterialCard({ material }: { material: Material }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden"><Image src={material.image} alt={`${material.name} supply`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /><Badge className="absolute left-3 top-3"><PackageCheck className="size-3" aria-hidden /> Quote supply</Badge></div>
      <div className="p-4"><h3 className="text-lg font-bold">{material.name}</h3><p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{material.description}</p><div className="mt-4 flex items-end justify-between gap-3 border-t pt-4"><div><p className="text-xs text-muted-foreground">Indicative from</p><p className="font-bold">{formatPrice(material.price)} / {material.unit}</p></div><Link href={`/materials/${material.slug}`} aria-label={`View ${material.name}`} className="grid size-9 place-items-center rounded-md bg-primary text-white"><ArrowRight className="size-4" aria-hidden /></Link></div></div>
    </Card>
  );
}
