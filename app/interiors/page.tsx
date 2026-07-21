import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Interior Design Services", description: "Turnkey home interiors, modular kitchens, wardrobes, ceilings, lighting, and commercial interior design.", path: "/interiors" });
export default function Page() { return <ServiceHub family="interiors" />; }
