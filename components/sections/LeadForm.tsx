"use client";

import { CalendarCheck, MessageCircle, PhoneCall, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { publicContactLinks } from "@/lib/env";

type LeadFormProps = {
  title?: string;
  source?: "Quick Enquiry" | "Request Callback" | "WhatsApp" | "Book Site Visit" | "Schedule Meeting";
  propertySlug?: string;
  developerSlug?: string;
};

export function LeadForm({
  title = "Contact developer",
  source = "Quick Enquiry",
  propertySlug,
  developerSlug
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  return (
    <form
      className="rounded-lg border bg-card p-5 shadow-sm"
      onSubmit={async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        const submittedSource = submitter?.value || source;
        const leadType = submittedSource === "Book Site Visit"
          ? "Site Visit"
          : propertySlug
            ? "Property Enquiry"
            : developerSlug
              ? "Developer Enquiry"
              : "General Contact";

        setStatus("loading");
        setMessage("");

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...Object.fromEntries(formData.entries()),
              source: submittedSource,
              leadType,
              sourcePage: window.location.pathname
            })
          });
          const result = (await response.json()) as { ok: boolean; message?: string };

          if (!response.ok || !result.ok) {
            throw new Error(result.message || "Unable to submit enquiry");
          }

          setStatus("success");
          setMessage(submittedSource === "Book Site Visit" ? "Thanks. Your site-visit request has been sent to our team." : "Thanks. Your enquiry has been sent to the developer team.");
          form.reset();
        } catch (error) {
          setStatus("error");
          setMessage(error instanceof Error ? error.message : "Unable to submit enquiry");
        }
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="rounded-sm bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{source}</span>
      </div>

      <div className="mt-5 grid gap-3">
        <Input name="name" placeholder="Full name" required />
        <Input name="phone" placeholder="Phone number" required inputMode="tel" />
        <Input name="email" placeholder="Email address" type="email" />
        <Textarea name="message" placeholder="I am interested in this property" />
        <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input type="checkbox" name="consent" value="true" defaultChecked className="mt-1 accent-primary" />I consent to BhoomiKonnect contacting me about this request.</label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />
        <input type="hidden" name="source" value={source} />
        {propertySlug ? <input type="hidden" name="propertySlug" value={propertySlug} /> : null}
        {developerSlug ? <input type="hidden" name="developerSlug" value={developerSlug} /> : null}
      </div>

      {status !== "idle" ? (
        <p className={`mt-4 rounded-md p-3 text-sm font-semibold ${
          status === "error" ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-100" : "bg-secondary/10 text-secondary"
        }`}>
          {status === "loading" ? "Sending enquiry..." : message}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button type="submit" name="leadAction" value={source} className="col-span-2" disabled={status === "loading"}>
          <Send className="size-4" aria-hidden /> Send enquiry
        </Button>
        <a href={publicContactLinks.phone} className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-semibold">
          <PhoneCall className="size-4" aria-hidden /> Call
        </a>
        <a href={publicContactLinks.whatsapp} className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-secondary px-3 text-sm font-semibold text-white">
          <MessageCircle className="size-4" aria-hidden /> WhatsApp
        </a>
        <Button type="submit" name="leadAction" value="Book Site Visit" variant="accent" className="col-span-2" disabled={status === "loading"}>
          <CalendarCheck className="size-4" aria-hidden /> Book site visit
        </Button>
      </div>
    </form>
  );
}
