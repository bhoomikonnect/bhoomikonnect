import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { MarketplaceService } from "@/types/marketplace";

export function ServiceCard({ service }: { service: MarketplaceService }) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/${service.family}/${service.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={service.image} alt={`${service.title} service`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <Badge className="absolute left-3 top-3 border-white/20 bg-white/90 text-primary"><BadgeCheck className="size-3" aria-hidden /> Verified team</Badge>
          <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-md bg-white text-primary"><ArrowUpRight className="size-4" aria-hidden /></span>
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/${service.family}/${service.slug}`} className="text-lg font-bold hover:text-primary">{service.title}</Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4 text-sm">
          <span className="flex items-center gap-1.5 font-semibold"><IndianRupee className="size-4 text-primary" aria-hidden />{formatPrice(service.startingPrice)}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground"><Clock3 className="size-4" aria-hidden />{service.timeline}</span>
        </div>
      </div>
    </Card>
  );
}
