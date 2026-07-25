"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, serviceNavItems } from "@/lib/site";

export function DesktopServicesMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return <div ref={menuRef} className="relative">
    <button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)} className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
      Services <ChevronDown className={`size-3 transition ${open ? "rotate-180" : ""}`} aria-hidden />
    </button>
    {open ? <div role="menu" className="absolute right-0 top-12 grid w-[520px] grid-cols-2 gap-1 rounded-lg border bg-background p-3 shadow-panel">
      {[...serviceNavItems, ...navItems.slice(5)].map((item) => <Link key={item.href} role="menuitem" href={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted hover:text-primary">{item.label}</Link>)}
    </div> : null}
  </div>;
}
