import type { Metadata } from "next";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact BhoomiKonnect",
  description:
    "Contact BhoomiKonnect for buyer support, developer onboarding, property enquiries, site visits, and marketplace partnerships.",
  path: "/contact",
  keywords: ["contact BhoomiKonnect", "developer onboarding", "property enquiry", "site visit"]
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to BhoomiKonnect about property or home work."
            description="Send a property, construction, architecture, interior, painting, renovation, maintenance, material, or partnership enquiry."
          />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="grid gap-4">
            {[
              { label: "Phone", value: siteConfig.phone, icon: Phone },
              { label: "Email", value: siteConfig.email, icon: Mail },
              { label: "Office", value: siteConfig.address, icon: MapPin }
            ].map((item) => (
              <Card key={item.label} className="p-5">
                <item.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </Card>
            ))}
            <Card className="p-5">
              <ShieldCheck className="size-5 text-secondary" aria-hidden />
              <h2 className="mt-4 font-bold">Developer onboarding</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Verification review covers company details, active projects, approvals, media quality, and lead ownership.
              </p>
            </Card>
          </div>
          <QuoteForm title="Send an enquiry" leadType="General Contact" source="Contact Page" />
        </div>
      </section>
    </>
  );
}
