import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Building2,
  CheckCircle2,
  FileImage,
  Gauge,
  LayoutDashboard,
  MessageSquare,
  SearchCheck,
  Settings,
  ShieldCheck,
  Users,
  Plus,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AdminFieldExplorer } from "@/components/admin/AdminFieldExplorer";
import { LocalAdminLogout } from "@/components/auth/LocalAdminLogout";
import { adminMetrics } from "@/lib/data";
import { getProperties } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Admin Dashboard",
  description: "BhoomiKonnect admin dashboard for properties, developers, users, leads, media, SEO, analytics, and settings.",
  path: "/admin",
  noIndex: true
});

const moduleLabels = [
  "Properties", "Property Categories", "Property Types", "Projects", "Developers", "Property Owners",
  "Sell Property Requests", "Property Leads", "Site Visits", "Construction Services", "Architecture Services",
  "Interior Services", "Painting Services", "Renovation Services", "Maintenance Services", "Service Categories",
  "Service Providers", "Service Bookings", "Service Leads", "Current Works", "Work Gallery", "Materials",
  "Material Suppliers", "Material Enquiries", "Users", "Cities", "Districts", "Areas", "Localities", "Amenities",
  "Approvals", "Testimonials", "Reviews", "FAQs", "Media Library", "Homepage Sections", "Pages", "Navigation",
  "Footer", "Calculator Settings", "SEO Settings", "Contact Settings", "Social Media", "Site Settings", "User Roles",
  "Notifications", "Audit Logs"
];
const moduleIcons = [Building2, ShieldCheck, MessageSquare, Users, FileImage, SearchCheck, BarChart3, Settings, LayoutDashboard, CheckCircle2];
const modules = moduleLabels.map((label, index) => ({ label, icon: moduleIcons[index % moduleIcons.length], count: index < 9 ? String(8 + index * 7) : "Manage" }));

export default async function AdminPage() {
  const properties = await getProperties();
  const cmsUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const localAdminEnabled = process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_SUPABASE_URL && Boolean(process.env.LOCAL_ADMIN_SESSION_SECRET);

  return (
    <>
      <section className="border-b bg-slate-950 py-8 text-white">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="accent">
              <Gauge className="size-3" aria-hidden /> Administrator
            </Badge>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Marketplace control center</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Manage properties, developers, users, leads, media, SEO, analytics, security, and platform settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2"><Link href="/buy" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950">View marketplace</Link>{cmsUrl ? <Link href={cmsUrl} target="_blank" className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-slate-950">Open Directus CMS</Link> : null}{localAdminEnabled ? <LocalAdminLogout /> : null}</div>
        </div>
      </section>

      <section className="py-8">
        <div className="container grid gap-6">
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/properties/new" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="size-4" aria-hidden /> Add property</Link>
            <Link href="/admin/pages/new" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"><FileText className="size-4" aria-hidden /> Add page</Link>
            <Link href="/admin/properties" className="inline-flex min-h-10 items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted"><Building2 className="size-4" aria-hidden /> Manage properties</Link>
            <Link href="/admin/pages" className="inline-flex min-h-10 items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted"><LayoutDashboard className="size-4" aria-hidden /> Manage pages</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {adminMetrics.map((metric) => (
              <Card key={metric.label} className="p-5">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                <Badge variant={metric.tone === "amber" ? "accent" : metric.tone === "green" ? "secondary" : "default"} className="mt-4">
                  {metric.delta}
                </Badge>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <LayoutDashboard className="size-5 text-primary" aria-hidden /> Modules
              </h2>
              <div className="mt-5 grid max-h-[620px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {modules.map((module) => (
                  <div key={module.label} className="flex items-center justify-between gap-3 rounded-md bg-muted p-3">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <module.icon className="size-4 text-primary" aria-hidden /> {module.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{module.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Activity className="size-5 text-primary" aria-hidden /> Lead queue
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="p-4 font-semibold">Property</th>
                      <th className="p-4 font-semibold">Source</th>
                      <th className="p-4 font-semibold">Value</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.slice(0, 5).map((property, index) => (
                      <tr key={property.id} className="border-t">
                        <td className="p-4 font-semibold">{property.projectName}</td>
                        <td className="p-4">{["WhatsApp", "Site Visit", "Callback", "Quick Enquiry", "Meeting"][index]}</td>
                        <td className="p-4">{formatPrice(property.price)}</td>
                        <td className="p-4">
                          <Badge variant={index % 2 ? "accent" : "secondary"}>{index % 2 ? "Follow-up" : "New"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-5">
              <h2 className="font-bold">SEO operations</h2>
              <div className="mt-5 space-y-3">
                {["Dynamic metadata", "Canonical URLs", "XML sitemap", "JSON-LD schemas"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-secondary" aria-hidden /> {item}
                  </p>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-bold">Security controls</h2>
              <div className="mt-5 space-y-3">
                {["Role-based access", "Input validation", "Spam protection", "Audit logs"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="size-4 text-primary" aria-hidden /> {item}
                  </p>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-bold">Performance checklist</h2>
              <div className="mt-5 space-y-3">
                {["SSR and ISR-ready routes", "Image optimization", "Code splitting", "Caching strategy"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm">
                    <Gauge className="size-4 text-accent" aria-hidden /> {item}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div id="fields" className="scroll-mt-24"><AdminFieldExplorer /></div>
        </div>
      </section>
    </>
  );
}
