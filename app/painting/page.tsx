import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Painting Services", description: "Interior, exterior, texture, waterproof, repainting, polishing, and commercial painting services.", path: "/painting" });
export default function Page() { return <ServiceHub family="painting" />; }
