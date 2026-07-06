import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Building, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Developer } from "@/types/marketplace";

type DeveloperCardProps = {
  developer: Developer;
};

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Card className="group overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-lg font-bold text-white shadow-lift">
          {developer.logoInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/developers/${developer.slug}`} className="text-lg font-bold hover:text-primary">
              {developer.name}
            </Link>
            {developer.verified ? (
              <Badge>
                <BadgeCheck className="size-3" aria-hidden /> Verified
              </Badge>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{developer.profile}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <span className="rounded-md bg-muted p-3">
          <span className="block text-lg font-bold">{developer.completedProjects}</span>
          <span className="text-xs text-muted-foreground">Completed</span>
        </span>
        <span className="rounded-md bg-muted p-3">
          <span className="block text-lg font-bold">{developer.ongoingProjects}</span>
          <span className="text-xs text-muted-foreground">Ongoing</span>
        </span>
        <span className="rounded-md bg-muted p-3">
          <span className="block text-lg font-bold">{developer.upcomingProjects}</span>
          <span className="text-xs text-muted-foreground">Upcoming</span>
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <Star className="size-4 fill-accent text-accent" aria-hidden /> {developer.rating} · {developer.reviews} reviews
        </span>
        <Link href={`/developers/${developer.slug}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Profile <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {developer.specialties.map((specialty) => (
          <span key={specialty} className="inline-flex items-center gap-1 rounded-sm bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            <Building className="size-3" aria-hidden /> {specialty}
          </span>
        ))}
      </div>
    </Card>
  );
}
