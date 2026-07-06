"use client";

import { CalendarCheck, MessageCircle, PhoneCall, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type LeadFormProps = {
  title?: string;
  source?: "Quick Enquiry" | "Request Callback" | "WhatsApp" | "Book Site Visit" | "Schedule Meeting";
};

export function LeadForm({ title = "Contact developer", source = "Quick Enquiry" }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-lg border bg-card p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
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
        <input type="hidden" name="source" value={source} />
      </div>

      {submitted ? (
        <p className="mt-4 rounded-md bg-secondary/10 p-3 text-sm font-semibold text-secondary">
          Thanks. Your enquiry is ready for Supabase lead capture.
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button type="submit" className="col-span-2">
          <Send className="size-4" aria-hidden /> Send enquiry
        </Button>
        <Button type="button" variant="outline">
          <PhoneCall className="size-4" aria-hidden /> Call
        </Button>
        <Button type="button" variant="secondary">
          <MessageCircle className="size-4" aria-hidden /> WhatsApp
        </Button>
        <Button type="button" variant="accent" className="col-span-2">
          <CalendarCheck className="size-4" aria-hidden /> Book site visit
        </Button>
      </div>
    </form>
  );
}
