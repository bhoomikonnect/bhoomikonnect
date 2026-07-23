import type { Metadata } from "next";
import { Database, Gauge, LockKeyhole, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About BhoomiKonnect",
  description:
    "Learn how BhoomiKonnect connects buyers with trusted developers through verified listings, SEO-first discovery, secure architecture, and direct enquiries.",
  path: "/about",
  keywords: ["about BhoomiKonnect", "verified real estate marketplace", "trusted developers"]
});

const pillars = [
  {
    title: "Trust before traffic",
    icon: ShieldCheck,
    copy: "The product is structured around verified developers, approval visibility, and enquiry ownership."
  },
  {
    title: "SEO without clutter",
    icon: SearchCheck,
    copy: "Every public page is shaped around metadata, internal links, crawlable content, canonical URLs, and structured data."
  },
  {
    title: "Scalable data model",
    icon: Database,
    copy: "Properties, projects, services, providers, works, materials, leads, media, and SEO map cleanly to Supabase and Directus."
  },
  {
    title: "Performance discipline",
    icon: Gauge,
    copy: "Server rendering, static routes, optimized images, small components, and focused animations protect Core Web Vitals."
  },
  {
    title: "Secure workflows",
    icon: LockKeyhole,
    copy: "Role-based permissions, validation, spam controls, storage rules, and audit logs are planned into the architecture."
  },
  {
    title: "Premium originality",
    icon: Sparkles,
    copy: "The design uses original copy, generated visuals, custom composition, and a restrained luxury brand system."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="BhoomiKonnect connects every stage of the property journey."
            description="Our mission is to make buying, selling, building, designing, renovating, maintaining, and sourcing property work easier to understand and safer to coordinate."
          />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-5">
              <span className="grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
                <pillar.icon className="size-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-lg font-bold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-10 text-white sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Operating model"
            title="Customer confidence grows when every handoff keeps its context."
            description="BhoomiKonnect standardizes property details, service scopes, provider profiles, quotations, progress visibility, lead capture, media, and admin review into one operating system."
            className="[&_*]:text-white [&_p]:text-slate-300"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {["Property verification", "Professional onboarding", "Lead and quote routing", "Progress visibility"].map((step, index) => (
              <div key={step} className="rounded-lg border border-white/10 bg-white/8 p-5">
                <p className="text-sm font-semibold text-amber-200">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-bold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Clear records, repeatable checks, and structured admin review keep the marketplace consistent as inventory grows.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
