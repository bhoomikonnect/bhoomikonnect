"use client";

import Link from "next/link";
import { GitCompareArrows, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { id: string; title: string; compact?: boolean };
const favoriteKey = "bk_property_favorites";
const compareKey = "bk_property_comparison";

function read(key: string): string[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}

export function PropertyActionButtons({ id, title, compact = false }: Props) {
  const [favorite, setFavorite] = useState(false);
  const [compared, setCompared] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { setFavorite(read(favoriteKey).includes(id)); setCompared(read(compareKey).includes(id)); }, [id]);

  function toggleFavorite() {
    const items = read(favoriteKey); const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
    localStorage.setItem(favoriteKey, JSON.stringify(next)); setFavorite(next.includes(id));
  }
  function toggleCompare() {
    const items = read(compareKey);
    if (!items.includes(id) && items.length >= 4) { setNotice("Compare list is limited to four properties."); return; }
    const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
    localStorage.setItem(compareKey, JSON.stringify(next)); setCompared(next.includes(id)); setNotice(next.includes(id) ? "Added to comparison." : "Removed from comparison.");
  }

  return <div className="contents">
    <button type="button" onClick={toggleFavorite} className={cn(buttonVariants({ variant: favorite ? "default" : "outline", size: compact ? "icon" : "sm" }))} title={favorite ? "Remove saved property" : "Save property"} aria-pressed={favorite}><Heart className={`size-4 ${favorite ? "fill-current" : ""}`} aria-hidden />{compact ? null : favorite ? "Saved" : "Save"}</button>
    <button type="button" onClick={toggleCompare} className={cn(buttonVariants({ variant: compared ? "default" : "outline", size: compact ? "icon" : "sm" }))} title={compared ? "Remove from comparison" : "Compare property"} aria-pressed={compared}><GitCompareArrows className="size-4" aria-hidden />{compact ? null : compared ? "Compared" : "Compare"}</button>
    {compact ? <Link href={`https://wa.me/919000000000?text=${encodeURIComponent(`I am interested in ${title}`)}`} target="_blank" className={cn(buttonVariants({ variant: "secondary", size: "icon" }))} title="WhatsApp"><MessageCircle className="size-4" aria-hidden /></Link> : null}
    {notice ? <span className="sr-only" role="status">{notice}</span> : null}
  </div>;
}
