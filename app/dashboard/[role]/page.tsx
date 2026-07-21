import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, CalendarCheck, CheckCircle2, FileText, MessageSquare, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboards/DashboardShell";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
const roleConfig: Record<string, { title: string; description: string; modules: string[] }> = {
  customer: { title: "Customer Dashboard", description: "Track property decisions and service requests in one place.", modules: ["Saved properties", "Compared properties", "Property enquiries", "Site visits", "Service bookings", "Quotations"] },
  developer: { title: "Developer Dashboard", description: "Manage developer profile, project inventory, properties, and incoming buyer demand.", modules: ["Developer profile", "Projects", "Properties", "Leads", "Site visits", "Analytics"] },
  "property-owner": { title: "Property Owner Dashboard", description: "Follow submitted listings from review through publication and closure.", modules: ["Owner profile", "Submitted properties", "Review status", "Published listings", "Enquiries", "Documents"] },
  "service-provider": { title: "Service Provider Dashboard", description: "Manage services, portfolio, availability, leads, bookings, and reviews.", modules: ["Provider profile", "Services", "Portfolio", "Leads", "Bookings", "Availability"] },
  contractor: { title: "Contractor Dashboard", description: "Turn construction enquiries into quotations and visible project delivery.", modules: ["Construction leads", "Quotations", "Project status", "Progress updates", "Gallery", "Customer approvals"] },
  supplier: { title: "Supplier Dashboard", description: "Manage material catalogue, locations, availability, and quotation requests.", modules: ["Materials", "Enquiries", "Quotations", "Availability", "Delivery areas", "Supplier profile"] },
  profile: { title: "Profile", description: "Manage account and contact information.", modules: ["Personal details", "Contact settings", "Role", "Verification", "Security", "Preferences"] },
  saved: { title: "Saved Properties", description: "Your property shortlist.", modules: ["Favorites", "Collections", "Price updates", "Availability", "Compare", "Share"] },
  enquiries: { title: "Enquiries", description: "Track conversations and follow-ups.", modules: ["Property enquiries", "Service leads", "Developer enquiries", "Status", "Messages", "Follow-ups"] },
  bookings: { title: "Bookings", description: "Manage visits, inspections, and service appointments.", modules: ["Site visits", "Inspections", "Service bookings", "Schedule", "Provider", "Status"] },
  quotations: { title: "Quotations", description: "Review property, construction, service, and material quotations.", modules: ["Open requests", "Received quotes", "Comparisons", "Approvals", "Revisions", "History"] },
  listings: { title: "Listings", description: "Manage authorised property or service inventory.", modules: ["Draft", "Pending", "Published", "Archived", "Media", "Performance"] },
  notifications: { title: "Notifications", description: "Stay current on marketplace activity.", modules: ["New leads", "Booking updates", "Quote updates", "Listing review", "Reminders", "Announcements"] },
  settings: { title: "Settings", description: "Control account preferences and privacy.", modules: ["Account", "Security", "Notifications", "Privacy", "Consent", "Sessions"] }
};
type Props = { params: { role: string } };
export function generateStaticParams() { return Object.keys(roleConfig).map((role) => ({ role })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const config = roleConfig[params.role]; return createMetadata({ title: config?.title || "Dashboard", description: config?.description || "BhoomiKonnect dashboard.", path: `/dashboard/${params.role}`, noIndex: true }); }
export default function RoleDashboard({ params }: Props) { const config = roleConfig[params.role]; if (!config) notFound(); const icons = [UserRound, FileText, MessageSquare, CalendarCheck, BarChart3, CheckCircle2]; return <DashboardShell title={config.title} description={config.description}><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{config.modules.map((module, index) => { const Icon = icons[index % icons.length]; return <Card key={module} className="p-5"><Icon className="size-5 text-primary" aria-hidden /><h2 className="mt-4 font-bold">{module}</h2><p className="mt-2 text-sm text-muted-foreground">Ready for role-authorised Supabase records.</p></Card>; })}</div></DashboardShell>; }
