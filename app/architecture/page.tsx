import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Architecture and Planning Services", description: "House plans, 2D layouts, 3D elevations, structural design, vastu, permissions, and site planning.", path: "/architecture" });
export default function Page() { return <ServiceHub family="architecture" />; }
