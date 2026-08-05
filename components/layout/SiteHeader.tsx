import Link from "next/link";
import Image from "next/image";
import { MessageCircle, PhoneCall, UserRound } from "lucide-react";
import { DesktopServicesMenu } from "@/components/layout/DesktopServicesMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { navItems, serviceNavItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const primaryNavItems = [
    navItems.find((item) => item.href === "/"),
    navItems.find((item) => item.href === "/about"),
    navItems.find((item) => item.href === "/projects"),
    serviceNavItems.find((item) => item.href === "/interiors"),
    navItems.find((item) => item.href === "/rent")
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <header className="sticky top-0 z-40 border-b bg-background shadow-sm supports-[backdrop-filter]:bg-background/95 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-2 xl:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
          <Image src="/brand/logo-horizontal.svg" alt="BhoomiKonnect" width={220} height={48} priority className="h-10 w-auto dark:hidden" />
          <Image src="/brand/logo-horizontal-dark.svg" alt="BhoomiKonnect" width={220} height={48} priority className="hidden h-10 w-auto dark:block" />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <DesktopServicesMenu />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} aria-label="Login" title="Login">
              <UserRound className="size-4" aria-hidden />
            </Link>
            <a
              href="tel:+919063242304"
              className="group hidden whitespace-nowrap items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-sm font-bold text-primary transition hover:border-primary/45 hover:bg-primary/10 xl:inline-flex"
              aria-label={`Call BhoomiKonnect at ${siteConfig.phone}`}
            >
              <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <PhoneCall className="size-3.5" aria-hidden />
              </span>
              <span>Call {siteConfig.phone}</span>
            </a>
            <a
              href="https://wa.me/919063242304?text=Hello%20BhoomiKonnect%2C%20I%20would%20like%20to%20know%20more."
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg"
              aria-label={`WhatsApp BhoomiKonnect at ${siteConfig.whatsapp}`}
              title="Chat on WhatsApp"
            >
              <MessageCircle className="size-5" aria-hidden />
            </a>
            <Link href="/contact?type=free-quote" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Get Free Quote
            </Link>
          </div>
          <a
            href="https://wa.me/919063242304?text=Hello%20BhoomiKonnect%2C%20I%20would%20like%20to%20know%20more."
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-full bg-[#25D366] text-white shadow-md md:hidden"
            aria-label="Chat with BhoomiKonnect on WhatsApp"
          >
            <MessageCircle className="size-4" aria-hidden />
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
