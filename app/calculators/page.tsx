import type { Metadata } from "next";
import { PropertyCalculators } from "@/components/calculators/PropertyCalculators";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({ title: "Property and Construction Calculators", description: "Estimate home loan EMI, construction cost, and convert Indian real-estate area units with BhoomiKonnect calculators.", path: "/calculators", keywords: ["EMI calculator", "construction cost calculator", "square feet to square yards"] });
export default function CalculatorsPage() { return <><section className="border-b bg-muted/50 py-10 sm:py-14"><div className="container"><SectionHeading eyebrow="Planning tools" title="Turn early assumptions into useful numbers." description="Use accessible estimates for loan repayment, construction budgets, and area conversion, then request a detailed quotation when ready." /></div></section><section className="py-10 sm:py-14"><div className="container"><PropertyCalculators /></div></section></>; }
