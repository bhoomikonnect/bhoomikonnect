import type { Metadata } from "next";
import { MailCheck, MessageSquareText, Smartphone } from "lucide-react";
import { LeadInbox } from "@/components/admin/LeadInbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { listLeads } from "@/lib/marketplace";
import { notificationConfiguration } from "@/lib/notifications";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({ title: "Lead Inbox", description: "Review BhoomiKonnect enquiries and notification delivery.", path: "/admin/leads", noIndex: true });

export default async function AdminLeadsPage() {
  const [leads, configuration] = await Promise.all([listLeads(), Promise.resolve(notificationConfiguration())]);
  return (
    <section className="py-8">
      <div className="container grid gap-7">
        <div><Badge><MessageSquareText className="size-3" aria-hidden /> Lead operations</Badge><h1 className="mt-3 text-3xl font-bold">Lead inbox</h1><p className="mt-2 text-sm text-muted-foreground">Every enquiry form enters this inbox before email and SMS delivery is attempted.</p></div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5"><MessageSquareText className="size-5 text-primary" aria-hidden /><p className="mt-3 text-3xl font-bold">{leads.length}</p><p className="text-sm text-muted-foreground">Stored enquiries</p></Card>
          <Card className="p-5"><MailCheck className="size-5 text-secondary" aria-hidden /><p className="mt-3 font-bold">{configuration.emailConfigured ? "Connected" : "Setup required"}</p><p className="text-sm text-muted-foreground">Email · {configuration.adminEmailCount} recipient(s)</p></Card>
          <Card className="p-5"><Smartphone className="size-5 text-accent" aria-hidden /><p className="mt-3 font-bold">{configuration.smsConfigured ? "Connected" : "Setup required"}</p><p className="text-sm text-muted-foreground">SMS · {configuration.adminSmsCount} recipient(s)</p></Card>
        </div>
        <LeadInbox leads={leads} />
      </div>
    </section>
  );
}
