import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/ServiceHub";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Home Maintenance Services", description: "Book verified electricians, plumbers, carpenters, cleaning, AC, appliance, solar, CCTV, and repair professionals.", path: "/maintenance" });
export default function Page() { return <ServiceHub family="maintenance" />; }
