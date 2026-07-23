"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  role: z.enum(["customer", "buyer", "property_owner", "developer", "contractor", "architect", "interior_designer", "service_provider", "material_supplier"]).default("customer")
});
type Values = z.infer<typeof schema>;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "customer",
      email: "",
      password: ""
    }
  });

  async function submit(values: Values) {
    setError(""); setMessage("");
    const supabase = createClient();
    if (!supabase) return setError("Authentication is unavailable. The site administrator must configure Supabase.");
    if (mode === "login") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });
      if (authError) return setError(authError.message);
      const nextPath = new URLSearchParams(window.location.search).get("next");
      router.push(nextPath?.startsWith("/") ? nextPath : "/dashboard"); router.refresh(); return;
    }
    const { data, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { full_name: values.fullName, phone: values.phone, role: values.role } }
    });
    if (authError) return setError(authError.message);
    if (data.user) await supabase.from("profiles").upsert({ id: data.user.id, full_name: values.fullName || "BhoomiKonnect user", phone: values.phone || null, role: values.role });
    setMessage("Account created. Check your email to verify the account, then sign in.");
  }

  async function googleLogin() {
    const supabase = createClient();
    if (!supabase) return setError("Supabase is not configured.");
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
  }

  async function magicLink() {
    const email = getValues("email");
    if (!email) return setError("Enter your email first.");
    const supabase = createClient();
    if (!supabase) return setError("Supabase is not configured.");
    const { error: authError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    if (authError) return setError(authError.message);
    setMessage("Magic link sent. Check your email.");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit(submit)} noValidate>
      {mode === "register" ? <><div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Full name<Input {...register("fullName")} required /></label><label className="grid gap-2 text-sm font-semibold">Phone<Input {...register("phone")} inputMode="tel" /></label></div><label className="grid gap-2 text-sm font-semibold">Account type<select {...register("role")} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option value="customer">Customer</option><option value="buyer">Buyer</option><option value="property_owner">Property Owner</option><option value="developer">Developer</option><option value="contractor">Contractor</option><option value="architect">Architect</option><option value="interior_designer">Interior Designer</option><option value="service_provider">Service Provider</option><option value="material_supplier">Material Supplier</option></select></label></> : null}
      <label className="grid gap-2 text-sm font-semibold">Email<Input {...register("email")} type="email" autoComplete="email" />{errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}</label>
      <label className="grid gap-2 text-sm font-semibold">Password<Input {...register("password")} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} />{errors.password ? <span className="text-xs text-red-600">{errors.password.message}</span> : null}</label>
      {error ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
      {message ? <p className="rounded-md bg-secondary/10 p-3 text-sm font-semibold text-secondary" role="status">{message}</p> : null}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Mail className="size-4" aria-hidden />}{isSubmitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</Button>
      <Button type="button" variant="outline" onClick={googleLogin}><ShieldCheck className="size-4" aria-hidden />Continue with Google</Button>
      {mode === "login" ? <Button type="button" variant="ghost" onClick={magicLink}>Email me a magic link</Button> : null}
    </form>
  );
}
