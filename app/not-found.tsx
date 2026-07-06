import Link from "next/link";
import { Home, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="container grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold">This page is not listed.</h1>
        <p className="mt-3 text-muted-foreground">
          The property, developer, or city you are looking for may have moved or is no longer active.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className={cn(buttonVariants())}>
            <Home className="size-4" aria-hidden /> Home
          </Link>
          <Link href="/buy" className={cn(buttonVariants({ variant: "outline" }))}>
            <Search className="size-4" aria-hidden /> Search properties
          </Link>
        </div>
      </div>
    </section>
  );
}
