import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyCatalogStateProps = {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
};

export function EmptyCatalogState({
  title,
  description,
  href = "/contact",
  actionLabel = "Contact BhoomiKonnect"
}: EmptyCatalogStateProps) {
  return (
    <div className="rounded-lg border border-dashed bg-muted/35 px-5 py-10 text-center sm:px-10">
      <span className="mx-auto grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
        <SearchX className="size-6" aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      <Link href={href} className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
        {actionLabel} <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
