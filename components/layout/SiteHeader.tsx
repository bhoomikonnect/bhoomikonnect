import Link from "next/link";
import { Building2 } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <span className="grid size-10 place-items-center rounded-md bg-primary text-white shadow-lift">
            <Building2 className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold">{siteConfig.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Login
            </Link>
            <Link href="/register" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Register
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
