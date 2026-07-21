import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceProvider } from "@/types/marketplace";

export function ProviderCard({ provider }: { provider: ServiceProvider }) {
  return (
    <Card className="overflow-hidden p-4 transition hover:shadow-lift">
      <div className="flex gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md">
          <Image src={provider.image} alt={`${provider.name} profile`} fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div><Link href={`/service-providers/${provider.slug}`} className="font-bold hover:text-primary">{provider.name}</Link><p className="text-xs text-muted-foreground">{provider.providerType}</p></div>
            {provider.verified ? <Badge variant="secondary"><BadgeCheck className="size-3" aria-hidden /> Verified</Badge> : null}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" aria-hidden />{provider.city}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-sm">
        <span className="flex items-center gap-1"><Star className="size-4 fill-accent text-accent" aria-hidden />{provider.rating.toFixed(1)} ({provider.reviewCount})</span>
        <span className="flex items-center gap-1"><BriefcaseBusiness className="size-4 text-primary" aria-hidden />{provider.completedJobs} jobs</span>
      </div>
      <Link href={`/service-providers/${provider.slug}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}>View profile</Link>
    </Card>
  );
}
