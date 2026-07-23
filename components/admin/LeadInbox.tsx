"use client";

import { useMemo, useState } from "react";
import { Mail, MessageSquareText, Phone, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { DeliveryState, LeadRecord } from "@/types/leads";

function deliveryVariant(state: DeliveryState) {
  return state === "sent" ? "secondary" as const : state === "failed" ? "accent" as const : "muted" as const;
}

export function LeadInbox({ leads }: { leads: LeadRecord[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const types = [...new Set(leads.map((lead) => lead.leadType || "General Contact"))].sort();
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesType = type === "all" || (lead.leadType || "General Contact") === type;
      const matchesQuery = !normalized || [lead.name, lead.phone, lead.email, lead.city, lead.source, lead.leadType].join(" ").toLowerCase().includes(normalized);
      return matchesType && matchesQuery;
    });
  }, [leads, query, type]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px]">
        <label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search name, phone, location, source, or type" aria-label="Search leads" /></label>
        <select value={type} onChange={(event) => setType(event.target.value)} className="focus-ring min-h-11 rounded-md border bg-background px-3 text-sm" aria-label="Filter lead type"><option value="all">All lead types</option>{types.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-muted text-muted-foreground"><tr><th className="p-4 font-semibold">Contact</th><th className="p-4 font-semibold">Request</th><th className="p-4 font-semibold">Source</th><th className="p-4 font-semibold">Email</th><th className="p-4 font-semibold">SMS</th><th className="p-4 font-semibold">Received</th></tr></thead>
          <tbody>{visible.map((lead) => <tr key={lead.id} className="border-t align-top"><td className="p-4"><p className="font-semibold">{lead.name}</p><div className="mt-2 grid gap-1 text-xs"><a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 text-primary"><Phone className="size-3" aria-hidden />{lead.phone}</a>{lead.email ? <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-primary"><Mail className="size-3" aria-hidden />{lead.email}</a> : null}</div></td><td className="p-4"><Badge>{lead.leadType || "General Contact"}</Badge><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">{lead.message || lead.city || "No additional message"}</p></td><td className="p-4"><p>{lead.source}</p><p className="mt-1 max-w-48 truncate text-xs text-muted-foreground">{lead.sourcePage || "Website"}</p></td><td className="p-4"><div className="grid gap-1"><Badge variant={deliveryVariant(lead.delivery.adminEmail)}>Admin: {lead.delivery.adminEmail}</Badge>{lead.email ? <Badge variant={deliveryVariant(lead.delivery.customerEmail)}>Customer: {lead.delivery.customerEmail}</Badge> : null}</div></td><td className="p-4"><div className="grid gap-1"><Badge variant={deliveryVariant(lead.delivery.adminSms)}>Admin: {lead.delivery.adminSms}</Badge><Badge variant={deliveryVariant(lead.delivery.customerSms)}>Customer: {lead.delivery.customerSms}</Badge></div></td><td className="p-4"><p>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.createdAt))}</p>{lead.delivery.errors.length ? <p className="mt-2 max-w-56 text-xs leading-5 text-red-600">{lead.delivery.errors.join(" · ")}</p> : null}</td></tr>)}</tbody>
        </table>
        {!visible.length ? <div className="grid min-h-40 place-items-center p-8 text-center text-sm text-muted-foreground"><div><MessageSquareText className="mx-auto mb-3 size-6" aria-hidden />No enquiries match this view.</div></div> : null}
      </div>
    </div>
  );
}
