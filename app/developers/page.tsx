import type { Metadata } from "next";
import { Award, BadgeCheck, Building2, Users } from "lucide-react";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { EmptyCatalogState } from "@/components/sections/EmptyCatalogState";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { getDevelopers } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Verified Real Estate Developers",
  description:
    "Discover verified real estate developers with company profiles, completed projects, ongoing projects, reviews, contacts, and social links.",
  path: "/developers",
  keywords: ["verified developers", "real estate developers", "builder profiles", "developer projects"]
});

export default async function DevelopersPage() {
  const developers = await getDevelopers();
  const verifiedDevelopers = developers.filter((developer) => developer.verified).length;
  const trackedProjects = developers.reduce((total, developer) => total + developer.completedProjects + developer.ongoingProjects + developer.upcomingProjects, 0);
  const buyerReviews = developers.reduce((total, developer) => total + developer.reviews, 0);

  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            as="h1"
            eyebrow="Developers"
            title="A trusted developer directory for serious property buyers."
            description="Each profile is designed for transparency: project count, company story, contact channels, ratings, and active listings."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Verified partners", value: formatNumber(verifiedDevelopers), icon: BadgeCheck },
              { label: "Projects tracked", value: formatNumber(trackedProjects), icon: Building2 },
              { label: "Buyer reviews", value: formatNumber(buyerReviews), icon: Users }
            ].map((metric) => (
              <Card key={metric.label} className="p-4">
                <metric.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-4 text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          {developers.length ? <div className="grid gap-5 md:grid-cols-2">{developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}</div> : <EmptyCatalogState title="Developer profiles are being verified" description="Only reviewed companies and project histories are published. Contact the team for help with a current requirement." actionLabel="Contact the property team" />}
        </div>
      </section>

      <section className="bg-muted/55 py-10 sm:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Verification"
            title="Developer trust signals are visible across the marketplace."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {["Project history", "Approval completeness", "Lead ownership"].map((item) => (
              <Card key={item} className="p-5">
                <Award className="size-6 text-accent" aria-hidden />
                <h2 className="mt-4 font-bold">{item}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Designed as a structured review signal for buyers and administrators.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
