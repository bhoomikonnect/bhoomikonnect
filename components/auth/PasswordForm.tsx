"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function PasswordForm({ mode }: { mode: "request" | "reset" }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget); const supabase = createClient();
    if (!supabase) { setMessage("Supabase is not configured."); setLoading(false); return; }
    const result = mode === "request"
      ? await supabase.auth.resetPasswordForEmail(String(form.get("email")), { redirectTo: `${window.location.origin}/reset-password` })
      : await supabase.auth.updateUser({ password: String(form.get("password")) });
    setMessage(result.error ? result.error.message : mode === "request" ? "Password reset link sent." : "Password updated. You can now sign in."); setLoading(false);
  }
  return <form onSubmit={submit} className="mt-6 grid gap-4"><label className="grid gap-2 text-sm font-semibold">{mode === "request" ? "Email" : "New password"}<Input name={mode === "request" ? "email" : "password"} type={mode === "request" ? "email" : "password"} minLength={mode === "reset" ? 8 : undefined} required /></label>{message ? <p className="rounded-md bg-muted p-3 text-sm" role="status">{message}</p> : null}<Button type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "request" ? "Send reset link" : "Update password"}</Button></form>;
}
