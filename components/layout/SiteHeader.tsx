import Link from "next/link";
import Image from "next/image";
import { ChevronDown, FilePlus2, UserRound } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { navItems, serviceNavItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
          <Image src="/brand/logo-horizontal.svg" alt="BhoomiKonnect" width={220} height={48} priority className="h-11 w-auto dark:hidden" />
          <Image src="/brand/logo-horizontal-dark.svg" alt="BhoomiKonnect" width={220} height={48} priority className="hidden h-11 w-auto dark:block" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Services <ChevronDown className="size-3 transition group-open:rotate-180" aria-hidden />
            </summary>
            <div className="absolute right-0 top-12 grid w-[520px] grid-cols-2 gap-1 rounded-lg border bg-background p-3 shadow-panel">
              {serviceNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted hover:text-primary">
                  {item.label}
                </Link>
              ))}
              {navItems.slice(5).map((item) => (
                <Link key={item.href} href={item.href} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} aria-label="Login" title="Login">
              <UserRound className="size-4" aria-hidden />
            </Link>
            <Link href="/post-property" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              <FilePlus2 className="size-4" aria-hidden /> Post Property
            </Link>
            <Link href="/contact?type=free-quote" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Get Free Quote
            </Link>
          </div>
          <Link href="/contact?type=free-quote" className={cn(buttonVariants({ size: "sm" }), "md:hidden")}>Quote</Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
