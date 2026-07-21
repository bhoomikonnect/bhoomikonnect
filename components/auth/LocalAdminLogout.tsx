"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LocalAdminLogout() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/local-admin", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" onClick={signOut} className="border-white/30 bg-transparent text-white hover:bg-white/10">
      <LogOut className="size-4" aria-hidden /> Sign out
    </Button>
  );
}
