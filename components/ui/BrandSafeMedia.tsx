import Image from "next/image";

type BrandSafeMediaProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Project assets are supplied by third parties and can contain their marks or
 * contact details. Keep the visual context while preventing those identifiers
 * from being readable in public listing surfaces.
 */
export function BrandSafeMedia({ src, alt, sizes, priority = false, className = "" }: BrandSafeMediaProps) {
  return (
    <>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`scale-110 object-cover blur-xl ${className}`} />
      <div className="absolute inset-0 bg-slate-950/20" aria-hidden />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-md border border-white/35 bg-slate-950/70 px-4 py-3 text-center text-white shadow-lg backdrop-blur-md" aria-hidden>
        <p className="text-base font-bold tracking-tight sm:text-lg">BhoomiKonnect</p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">Verified property preview</p>
      </div>
    </>
  );
}
