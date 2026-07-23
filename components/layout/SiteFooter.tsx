import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { navItems, serviceNavItems, siteConfig } from "@/lib/site";

const footerGroups = [
  {
    title: "Marketplace",
    links: [...navItems.filter((item) => ["/buy", "/sell-property", "/rent", "/projects"].includes(item.href)), { label: "Calculators", href: "/calculators" }]
  },
  {
    title: "Company",
    links: navItems.filter((item) => ["/developers", "/current-works", "/about", "/contact"].includes(item.href))
  },
  {
    title: "Services",
    links: serviceNavItems.slice(0, 6)
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-950 text-slate-100 dark:bg-black">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.25fr_2fr]">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center">
            <Image src="/brand/logo-monochrome.svg" alt="BhoomiKonnect" width={250} height={56} className="h-12 w-auto text-white brightness-0 invert" />
          </Link>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            One trusted platform to buy, sell, build, design, renovate, and maintain property with verified professionals.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            {siteConfig.phone ? <span className="inline-flex items-center gap-2">
              <Phone className="size-4" aria-hidden /> {siteConfig.phone}
            </span> : null}
            {siteConfig.email ? <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> {siteConfig.email}
            </span> : null}
            {siteConfig.address ? <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> {siteConfig.address}
            </span> : null}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold uppercase text-slate-400">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BhoomiKonnect. All rights reserved. <Link href="/privacy" className="hover:text-white">Privacy</Link> · <Link href="/terms" className="hover:text-white">Terms</Link></p>
          <div className="flex items-center gap-3">
            {siteConfig.socials.linkedin ? <a href={siteConfig.socials.linkedin} aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="size-4" aria-hidden />
            </a> : null}
            {siteConfig.socials.instagram ? <a href={siteConfig.socials.instagram} aria-label="Instagram" className="hover:text-white">
              <Instagram className="size-4" aria-hidden />
            </a> : null}
            {siteConfig.socials.facebook ? <a href={siteConfig.socials.facebook} aria-label="Facebook" className="hover:text-white">
              <Facebook className="size-4" aria-hidden />
            </a> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
