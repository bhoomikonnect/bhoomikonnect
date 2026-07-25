"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, FileText, LayoutDashboard, ListChecks, LogOut, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: MessageSquare },
  { href: "/admin#fields", label: "Field reference", icon: ListChecks, exact: true }
];

export function AdminNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <nav className="border-b bg-background" aria-label="CMS navigation">
      <div className="container flex gap-1 overflow-x-auto py-2">
        {links.map((item) => {
          const active = item.exact ? pathname === item.href.split("#")[0] : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" aria-hidden /> {item.label}
            </Link>
          );
        })}
        <Button type="button" variant="ghost" onClick={signOut} disabled={signingOut} className="ml-auto shrink-0 text-muted-foreground">
          <LogOut className="size-4" aria-hidden /> {signingOut ? "Signing out..." : "Logout"}
        </Button>
      </div>
    </nav>
  );
}
