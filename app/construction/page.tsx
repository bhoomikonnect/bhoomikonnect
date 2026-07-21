import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Construction Services", description: "Compare verified house, duplex, commercial, turnkey, civil, RCC, masonry, roofing, and waterproofing services.", path: "/construction", keywords: ["house construction", "construction cost", "civil contractor"] });
export default function Page() { return <ServiceHub family="construction" />; }
