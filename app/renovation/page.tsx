import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Home Renovation Services", description: "Bathroom, kitchen, flooring, roofing, electrical, plumbing, structural, and full home renovation.", path: "/renovation" });
export default function Page() { return <ServiceHub family="renovation" />; }
