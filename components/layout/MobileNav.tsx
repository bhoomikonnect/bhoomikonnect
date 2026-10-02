"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, PhoneCall, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, serviceNavItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="lg:hidden">
      <Button
        aria-label={open ? "Close menu" : "Open menu"}
        title={open ? "Close menu" : "Open menu"}
        variant="outline"
        size="icon"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
      </Button>

      {open ? (
        <div className="absolute inset-x-4 top-20 z-50 rounded-lg border bg-background p-3 shadow-panel">
          <nav className="grid grid-cols-2 gap-1" aria-label="Mobile navigation">
            {[...navItems, ...serviceNavItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Register
            </Link>
            <a
              href="tel:+919063242304"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-bold text-primary"
            >
              <PhoneCall className="size-4" aria-hidden /> Call +91 90632 42304
            </a>
            <a
              href="https://wa.me/919063242304?text=Hello%20BhoomiKonnect%2C%20I%20would%20like%20to%20know%20more."
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm font-bold text-white"
            >
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
            <Link href="/contact?type=free-quote" onClick={() => setOpen(false)} className="col-span-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white">
              Get Free Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
