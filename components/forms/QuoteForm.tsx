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

const minimalQuoteFormSchema = quoteFormSchema.extend({
  email: z.string().min(1, "Please enter your email").email("Please enter a valid email"),
  message: z.string().min(5, "Please briefly describe your requirement").max(1000)
});

type QuoteFormProps = {
  title?: string;
  leadType?: string;
  source?: string;
  serviceSlug?: string;
  providerSlug?: string;
  materialSlug?: string;
  compact?: boolean;
  minimal?: boolean;
};

export function QuoteForm({
  title = "Request a free quote",
  leadType = "General Contact",
  source = "Service Page",
  serviceSlug,
  providerSlug,
  materialSlug,
  compact = false,
  minimal = false
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteValues>({
    resolver: zodResolver(minimal ? minimalQuoteFormSchema : quoteFormSchema),
    defaultValues: { consent: true, city: minimal ? "Not provided" : "" }
  });

  async function submit(values: QuoteValues) {
    setServerError("");
    try {
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
          metadata: {
            pageTitle: document.title,
            pageUrl: window.location.href,
            referrer: document.referrer || "Direct visit",
            enquiryContext: serviceSlug ? `Service: ${serviceSlug}` : providerSlug ? `Provider: ${providerSlug}` : materialSlug ? `Material: ${materialSlug}` : title
          },
          website: ""
        })
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Unable to send the request.");
      setSubmitted(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to send the request. Please try again.");
    }
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
    <form onSubmit={handleSubmit(submit)} className={`rounded-lg border bg-card shadow-sm ${minimal ? "p-4 sm:p-5" : "p-5"}`} noValidate>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-primary">No-obligation enquiry</p>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
        </div>
        <MessageCircle className="size-6 text-secondary" aria-hidden />
      </div>
      <div className={`${minimal ? "mt-4 gap-3" : "mt-5 gap-4"} grid ${compact || minimal ? "" : "sm:grid-cols-2"}`}>
        <label className={fieldClass}>Name<Input {...register("name")} autoComplete="name" />{errors.name ? <span className={errorClass}>{errors.name.message}</span> : null}</label>
        <label className={fieldClass}>Phone<Input {...register("phone")} inputMode="tel" autoComplete="tel" />{errors.phone ? <span className={errorClass}>{errors.phone.message}</span> : null}</label>
        {minimal ? <label className={fieldClass}>Email<Input {...register("email")} type="email" autoComplete="email" />{errors.email ? <span className={errorClass}>{errors.email.message}</span> : null}</label> : null}
        {minimal ? <input type="hidden" {...register("city")} /> : <>
          <label className={fieldClass}>WhatsApp<Input {...register("whatsapp")} inputMode="tel" /></label>
          <label className={fieldClass}>Email<Input {...register("email")} type="email" autoComplete="email" /></label>
          <label className={fieldClass}>Location<Input {...register("city")} placeholder="City or site location" />{errors.city ? <span className={errorClass}>{errors.city.message}</span> : null}</label>
          <label className={fieldClass}>Budget<Input {...register("budget")} placeholder="Approximate budget" /></label>
          <label className={fieldClass}>Preferred date<div className="relative"><CalendarDays className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" aria-hidden /><Input {...register("preferredDate")} type="date" className="pl-10" /></div></label>
        </>}
        <label className={`${fieldClass} ${compact || minimal ? "" : "sm:col-span-2"}`}>Requirement<Textarea {...register("message")} rows={minimal ? 3 : undefined} placeholder="Tell us briefly what you need" />{errors.message ? <span className={errorClass}>{errors.message.message}</span> : null}</label>
      </div>
      <label className={`${minimal ? "mt-3" : "mt-4"} flex items-start gap-2 text-xs leading-5 text-muted-foreground`}>
        <input {...register("consent")} type="checkbox" className="mt-1 accent-primary" />
        I consent to BhoomiKonnect contacting me about this enquiry.
      </label>
      {errors.consent ? <p className={errorClass}>{errors.consent.message}</p> : null}
      {serverError ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{serverError}</p> : null}
      <Button type="submit" className={`${minimal ? "mt-4" : "mt-5"} w-full`} disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {isSubmitting ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}
