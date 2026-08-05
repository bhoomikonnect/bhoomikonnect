import type { Metadata } from "next";
import { FaqList } from "@/components/sections/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { platformFaqs } from "@/lib/catalog";
import { createMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions | BhoomiKonnect",
  description: "Answers about BhoomiKonnect properties, services, enquiries, approvals, and verified professionals.",
  path: "/faqs"
});

export default function FaqPage() {
  return (
    <>
      <section className="border-b bg-emerald-50/70 py-12 dark:bg-emerald-950/20 sm:py-16">
        <div className="container">
          <SectionHeading as="h1" eyebrow="Help centre" title="Frequently asked questions" description="Clear answers for property buyers, owners, and home-service customers." />
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <FaqList faqs={platformFaqs} />
        </div>
      </section>
      <JsonLd data={faqSchema(platformFaqs)} />
    </>
  );
}
