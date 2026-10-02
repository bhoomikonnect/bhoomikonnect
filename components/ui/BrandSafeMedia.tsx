"use client";

import Image from "next/image";

type BrandSafeMediaProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

type RedactionArea = { left: string; top: string; width: string; height: string };

// Only source images that contain third-party identity marks get a local blur.
// All other property photos remain clear.
const logoRedactions: Record<string, RedactionArea[]> = {
  "/images/projects/sri-tirumala-fortune/hero.jpeg": [
    { left: "1%", top: "10%", width: "29%", height: "13%" },
    { left: "76%", top: "10%", width: "22%", height: "10%" }
  ],
  "/images/projects/eapl-legacy/hero.jpeg": [
    { left: "5%", top: "3%", width: "31%", height: "10%" },
    { left: "73%", top: "2%", width: "23%", height: "13%" },
    { left: "25%", top: "94%", width: "50%", height: "6%" }
  ],
  "/images/projects/achyutha-villas/hero-wide.jpeg": [
    { left: "2%", top: "2%", width: "28%", height: "29%" },
    { left: "87%", top: "1%", width: "11%", height: "18%" }
  ],
  "/images/projects/achyutha-villas/hero-square.jpeg": [
    { left: "2%", top: "2%", width: "34%", height: "22%" }
  ],
  "/images/projects/shripuram-sannidhi/hero.jpeg": [
    { left: "2%", top: "2%", width: "96%", height: "15%" }
  ],
  "/images/projects/shripuram-sannidhi/layout.jpeg": [
    { left: "2%", top: "2%", width: "96%", height: "16%" }
  ],
  "/images/projects/eeshanya-samruddhi-layout.jpg": [
    { left: "67%", top: "3%", width: "29%", height: "6%" },
    { left: "57%", top: "13%", width: "37%", height: "12%" },
    { left: "67%", top: "35%", width: "27%", height: "9%" }
  ],
  "/images/projects/eeshanya-shadnagar-heights-layout.jpg": [
    { left: "1%", top: "1%", width: "16%", height: "6%" },
    { left: "72%", top: "13%", width: "27%", height: "33%" }
  ],
  "/images/projects/indis-sia-prospera/price-sheet.jpeg": [
    { left: "2%", top: "2%", width: "38%", height: "15%" }
  ]
};

export function BrandSafeMedia({ src, alt, sizes, priority = false, className = "" }: BrandSafeMediaProps) {
  const redactions = logoRedactions[src] || [];
  return (
    <>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover ${className}`} />
      {redactions.map((area, index) => <span key={index} className="absolute rounded-sm bg-slate-100/20 backdrop-blur-xl" style={area} aria-label="Third-party logo blurred" />)}
    </>
  );
}
