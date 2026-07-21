"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { propertySubmissionSchema } from "@/lib/validations";

type Values = z.infer<typeof propertySubmissionSchema>;

export function PropertySubmissionForm() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(propertySubmissionSchema),
    defaultValues: { listingPurpose: "Sale", consent: true }
  });

  async function next() {
    const fields: Array<keyof Values> = step === 1
      ? ["name", "phone", "whatsapp", "email"]
      : ["propertyType", "listingPurpose", "location", "expectedPrice", "size", "approvalStatus"];
    if (await trigger(fields)) setStep((value) => Math.min(3, value + 1));
  }

  async function submit(values: Values) {
    setServerError("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name, phone: values.phone, whatsapp: values.whatsapp, email: values.email,
        message: values.description, source: "Sell Property Form", leadType: "Property Sale Request",
        city: values.location, budget: values.expectedPrice, consent: values.consent,
        sourcePage: window.location.pathname, website: "",
        metadata: {
          propertyType: values.propertyType, listingPurpose: values.listingPurpose, size: values.size,
          approvalStatus: values.approvalStatus, preferredCallbackTime: values.preferredCallbackTime
        }
      })
    });
    const result = await response.json();
    if (!response.ok) return setServerError(result.message || "Unable to submit the property.");
    setDone(true);
  }

  if (done) return <div className="rounded-lg border bg-secondary/10 p-8"><CheckCircle2 className="size-10 text-secondary" aria-hidden /><h2 className="mt-4 text-2xl font-bold">Property submitted for review</h2><p className="mt-2 text-muted-foreground">The admin team will validate the details before publishing or requesting documents.</p></div>;

  const label = "grid gap-2 text-sm font-semibold";
  const error = "text-xs text-red-600";
  return (
    <form onSubmit={handleSubmit(submit)} className="rounded-lg border bg-card p-5 shadow-panel" noValidate>
      <div className="flex items-center justify-between gap-4 border-b pb-5">
        <div><p className="text-xs font-bold uppercase text-primary">Step {step} of 3</p><h2 className="mt-1 text-xl font-bold">{["Owner details", "Property details", "Description & media"][step - 1]}</h2></div>
        <div className="flex gap-1" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((item) => <span key={item} className={`h-2 w-10 rounded-full ${item <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
      </div>
      {step === 1 ? <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className={label}>Owner name<Input {...register("name")} />{errors.name ? <span className={error}>{errors.name.message}</span> : null}</label>
        <label className={label}>Phone<Input {...register("phone")} inputMode="tel" />{errors.phone ? <span className={error}>{errors.phone.message}</span> : null}</label>
        <label className={label}>WhatsApp<Input {...register("whatsapp")} inputMode="tel" />{errors.whatsapp ? <span className={error}>{errors.whatsapp.message}</span> : null}</label>
        <label className={label}>Email<Input {...register("email")} type="email" />{errors.email ? <span className={error}>{errors.email.message}</span> : null}</label>
      </div> : null}
      {step === 2 ? <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className={label}>Property type<select {...register("propertyType")} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option value="">Select</option>{["Residential Plot", "Agricultural Land", "Farm Land", "Apartment", "Villa", "Independent House", "Commercial", "Warehouse"].map((item) => <option key={item}>{item}</option>)}</select>{errors.propertyType ? <span className={error}>{errors.propertyType.message}</span> : null}</label>
        <label className={label}>Listing purpose<select {...register("listingPurpose")} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option>Sale</option><option>Rent</option><option>Resale</option></select></label>
        <label className={`${label} sm:col-span-2`}>Location<Input {...register("location")} placeholder="Area, city, district" />{errors.location ? <span className={error}>{errors.location.message}</span> : null}</label>
        <label className={label}>Expected price<Input {...register("expectedPrice")} placeholder="₹" />{errors.expectedPrice ? <span className={error}>{errors.expectedPrice.message}</span> : null}</label>
        <label className={label}>Size<Input {...register("size")} placeholder="e.g. 240 sq.yd" />{errors.size ? <span className={error}>{errors.size.message}</span> : null}</label>
        <label className={`${label} sm:col-span-2`}>Approval status<select {...register("approvalStatus")} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option value="">Select</option><option>RERA Approved</option><option>DTCP Approved</option><option>HMDA Approved</option><option>Municipality Approved</option><option>Panchayat Approved</option><option>Documents available for review</option></select>{errors.approvalStatus ? <span className={error}>{errors.approvalStatus.message}</span> : null}</label>
      </div> : null}
      {step === 3 ? <div className="mt-5 grid gap-4">
        <label className={label}>Property description<Textarea {...register("description")} rows={6} />{errors.description ? <span className={error}>{errors.description.message}</span> : null}</label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>Photos<span className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed bg-muted"><Upload className="size-4" aria-hidden /> Select photos<input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" /></span></label>
          <label className={label}>Documents<span className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed bg-muted"><Upload className="size-4" aria-hidden /> Select documents<input type="file" accept="application/pdf,image/jpeg,image/png" multiple className="sr-only" /></span></label>
        </div>
        <label className={label}>Preferred callback time<select {...register("preferredCallbackTime")} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option value="">Select</option><option>9 AM - 12 PM</option><option>12 PM - 4 PM</option><option>4 PM - 7 PM</option></select>{errors.preferredCallbackTime ? <span className={error}>{errors.preferredCallbackTime.message}</span> : null}</label>
        <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input {...register("consent")} type="checkbox" className="mt-1 accent-primary" />I confirm these details are accurate and allow BhoomiKonnect to contact me and review the submitted property.</label>
        {errors.consent ? <span className={error}>{errors.consent.message}</span> : null}
      </div> : null}
      {serverError ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{serverError}</p> : null}
      <div className="mt-6 flex justify-between gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}><ArrowLeft className="size-4" aria-hidden /> Back</Button>
        {step < 3 ? <Button type="button" onClick={next}>Continue <ArrowRight className="size-4" aria-hidden /></Button> : <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}{isSubmitting ? "Submitting..." : "Submit for review"}</Button>}
      </div>
    </form>
  );
}
