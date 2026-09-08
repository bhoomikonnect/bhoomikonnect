"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandSafeMedia } from "@/components/ui/BrandSafeMedia";

export function MediaGallery({ images, title, compact = false }: { images: string[]; title: string; compact?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + images.length) % images.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active, images.length]);

  if (!images.length) return null;
  return (
    <>
      <div className={compact ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-3 md:grid-cols-[1.4fr_0.8fr]"}>
        {images.slice(0, compact ? images.length : 3).map((image, index) => (
          <button key={image} type="button" onClick={() => setActive(index)} className={`group relative overflow-hidden rounded-lg bg-muted text-left ${compact ? "aspect-[4/3]" : index === 0 ? "aspect-[16/10] md:row-span-2" : "aspect-[16/10]"}`} aria-label={`Open ${title} image ${index + 1} of ${images.length}`}>
            <BrandSafeMedia src={image} alt={`BhoomiKonnect property preview ${index + 1}`} priority={index === 0} sizes={compact ? "(min-width: 1024px) 33vw, 50vw" : index === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"} />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-black/65 px-3 py-2 text-xs font-bold text-white backdrop-blur"><Expand className="size-4" aria-hidden /> {index === 0 && images.length > 3 ? `View all ${images.length}` : "Open"}</span>
          </button>
        ))}
      </div>
      {active !== null ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`${title} image gallery`} onClick={() => setActive(null)}>
          <button type="button" onClick={() => setActive(null)} className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Close gallery"><X className="size-6" /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-6" aria-label="Previous image"><ChevronLeft className="size-8" /></button>
          <div className="relative h-[82vh] w-[88vw] overflow-hidden rounded-lg" onClick={(event) => event.stopPropagation()}><BrandSafeMedia src={images[active]} alt={`BhoomiKonnect property preview ${active + 1}`} priority sizes="90vw" className="object-contain" /></div>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-6" aria-label="Next image"><ChevronRight className="size-8" /></button>
          <p className="absolute bottom-4 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">{active + 1} / {images.length}</p>
        </div>
      ) : null}
    </>
  );
}
