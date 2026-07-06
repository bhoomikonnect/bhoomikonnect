import Link from "next/link";
import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

const footerGroups = [
  {
    title: "Marketplace",
    links: navItems.filter((item) => ["/buy", "/plots", "/flats", "/villas", "/commercial", "/projects"].includes(item.href))
  },
  {
    title: "Company",
    links: navItems.filter((item) => ["/developers", "/cities", "/about", "/contact"].includes(item.href))
  },
  {
    title: "Access",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Admin", href: "/admin" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-950 text-slate-100 dark:bg-black">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.25fr_2fr]">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-primary text-white">
              <Building2 className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block font-bold">{siteConfig.name}</span>
              <span className="text-sm text-slate-400">{siteConfig.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            A verified developer marketplace built for cleaner discovery, direct conversations, and confident property decisions across India&apos;s growth cities.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" aria-hidden /> {siteConfig.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> {siteConfig.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> {siteConfig.address}
            </span>
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
          <p>© {new Date().getFullYear()} BhoomiKonnect. Original demo content and visuals.</p>
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="size-4" aria-hidden />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <Instagram className="size-4" aria-hidden />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
              <Facebook className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
