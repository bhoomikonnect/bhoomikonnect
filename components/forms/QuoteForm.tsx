"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { quoteFormSchema } from "@/lib/validations";

type QuoteValues = z.infer<typeof quoteFormSchema>;

type QuoteFormProps = {
  title?: string;
  leadType?: string;
  source?: string;
  serviceSlug?: string;
  providerSlug?: string;
  materialSlug?: string;
  compact?: boolean;
};

export function QuoteForm({
  title = "Request a free quote",
  leadType = "General Contact",
  source = "Service Page",
  serviceSlug,
  providerSlug,
  materialSlug,
  compact = false
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: { consent: true }
  });

  async function submit(values: QuoteValues) {
    setServerError("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        leadType,
        source,
        serviceSlug,
        providerSlug,
        materialSlug,
        sourcePage: window.location.pathname,
        website: ""
      })
    });
    const result = await response.json();
    if (!response.ok) {
      setServerError(result.message || "Unable to send the request.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border bg-secondary/10 p-6" role="status">
        <CheckCircle2 className="size-8 text-secondary" aria-hidden />
        <h2 className="mt-4 text-xl font-bold">Request received</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Our team will review the requirement and contact you with the next step.</p>
      </div>
    );
  }

  const fieldClass = "grid gap-1.5 text-sm font-semibold";
  const errorClass = "text-xs font-medium text-red-600";

  return (
    <form onSubmit={handleSubmit(submit)} className="rounded-lg border bg-card p-5 shadow-sm" noValidate>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-primary">No-obligation enquiry</p>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
        </div>
        <MessageCircle className="size-6 text-secondary" aria-hidden />
      </div>
      <div className={`mt-5 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className={fieldClass}>Name<Input {...register("name")} autoComplete="name" />{errors.name ? <span className={errorClass}>{errors.name.message}</span> : null}</label>
        <label className={fieldClass}>Phone<Input {...register("phone")} inputMode="tel" autoComplete="tel" />{errors.phone ? <span className={errorClass}>{errors.phone.message}</span> : null}</label>
        <label className={fieldClass}>WhatsApp<Input {...register("whatsapp")} inputMode="tel" /></label>
        <label className={fieldClass}>Email<Input {...register("email")} type="email" autoComplete="email" /></label>
        <label className={fieldClass}>Location<Input {...register("city")} placeholder="City or site location" />{errors.city ? <span className={errorClass}>{errors.city.message}</span> : null}</label>
        <label className={fieldClass}>Budget<Input {...register("budget")} placeholder="Approximate budget" /></label>
        <label className={fieldClass}>Preferred date<div className="relative"><CalendarDays className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" aria-hidden /><Input {...register("preferredDate")} type="date" className="pl-10" /></div></label>
        <label className={`${fieldClass} ${compact ? "" : "sm:col-span-2"}`}>Requirement<Textarea {...register("message")} placeholder="Tell us the property, service, size, and timeline" /></label>
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <input {...register("consent")} type="checkbox" className="mt-1 accent-primary" />
        I consent to BhoomiKonnect contacting me about this request and recording the enquiry for follow-up.
      </label>
      {errors.consent ? <p className={errorClass}>{errors.consent.message}</p> : null}
      {serverError ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{serverError}</p> : null}
      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {isSubmitting ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}
