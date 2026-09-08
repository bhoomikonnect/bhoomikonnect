import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";

type DeveloperPageProps = { params: { slug: string } };

// Partner profiles are intentionally not public: BhoomiKonnect is the sole
// customer contact for every verified listing.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  return createMetadata({
    title: "Listing Partner | BhoomiKonnect",
    description: "BhoomiKonnect coordinates enquiries, documents and property visits.",
    path: `/developers/${params.slug}`,
    noIndex: true
  });
}

export default function DeveloperProfilePage() {
  notFound();
}
