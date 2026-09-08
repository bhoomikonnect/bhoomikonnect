import type { Metadata } from "next";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { EmptyCatalogState } from "@/components/sections/EmptyCatalogState";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getDevelopers } from "@/lib/marketplace";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Verified Real Estate Developers",
  description:
    "Discover verified real estate developers with company profiles, completed projects, ongoing projects, reviews, contacts, and social links.",
  path: "/developers",
  keywords: ["verified developers", "real estate developers", "builder profiles", "developer projects"]
});

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return (
    <>
      <section className="border-b bg-muted/50 py-10 sm:py-14">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Developers"
            title="A trusted developer directory for serious property buyers."
            description="Each profile is designed for transparency: project count, company story, contact channels, ratings, and active listings."
          />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          {developers.length ? <div className="grid gap-5 md:grid-cols-2">{developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}</div> : <EmptyCatalogState title="Developer profiles are being verified" description="Only reviewed companies and project histories are published. Contact the team for help with a current requirement." actionLabel="Contact the property team" />}
        </div>
      </section>
    </>
  );
}
