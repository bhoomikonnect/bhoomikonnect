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
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { adminMetrics, properties } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Admin Dashboard",
  description: "BhoomiKonnect admin dashboard for properties, developers, users, leads, media, SEO, analytics, and settings.",
  path: "/admin",
  noIndex: true
});

const modules = [
  { label: "Properties", icon: Building2, count: "1,248" },
  { label: "Developers", icon: ShieldCheck, count: "86" },
  { label: "Users", icon: Users, count: "18.4K" },
  { label: "Leads", icon: MessageSquare, count: "312" },
  { label: "Cities", icon: LayoutDashboard, count: "42" },
  { label: "Amenities", icon: CheckCircle2, count: "68" },
  { label: "Media", icon: FileImage, count: "9.6K" },
  { label: "SEO", icon: SearchCheck, count: "94%" },
  { label: "Analytics", icon: BarChart3, count: "Live" },
  { label: "Settings", icon: Settings, count: "RBAC" }
];

export default function AdminPage() {
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
          <Link href="/buy" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950">
            View marketplace
          </Link>
        </div>
      </section>

      <section className="py-8">
        <div className="container grid gap-6">
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
        </div>
      </section>
    </>
  );
}
