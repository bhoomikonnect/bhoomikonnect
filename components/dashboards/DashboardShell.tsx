import Link from "next/link";
import { Bell, Building2, CalendarCheck, FileText, Heart, LayoutDashboard, MessageSquare, Settings, UserRound } from "lucide-react";
import type { ReactNode } from "react";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Saved", href: "/dashboard/saved", icon: Heart },
  { label: "Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "Quotations", href: "/dashboard/quotations", icon: FileText },
  { label: "Listings", href: "/dashboard/listings", icon: Building2 },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];

export function DashboardShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="min-h-[75vh] bg-muted/35 py-8">
      <div className="container grid gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start"><p className="px-3 py-2 text-xs font-bold uppercase text-primary">My BhoomiKonnect</p><nav className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">{links.map((item) => <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-primary"><item.icon className="size-4" aria-hidden />{item.label}</Link>)}</nav></aside>
        <div><div className="rounded-lg border bg-card p-5"><h1 className="text-3xl font-bold">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p></div><div className="mt-6">{children}</div></div>
      </div>
    </section>
  );
}
