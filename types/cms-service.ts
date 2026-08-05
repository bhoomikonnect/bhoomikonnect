import type { Faq, ServiceFamily } from "@/types/marketplace";

export type CmsServiceInput = {
  family: ServiceFamily;
  title: string;
  slug: string;
  summary: string;
  description: string;
  starting_price: number;
  price_label: string;
  timeline: string;
  features: string[];
  deliverables: string[];
  packages: Array<{ name: string; price: string; description: string }>;
  service_locations: string[];
  faq: Faq[];
  cover_image: string;
  seo_title: string;
  meta_description: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
};

export type CmsServiceRecord = CmsServiceInput & {
  id: string;
  created_at: string;
  updated_at: string;
  source: "wordpress" | "supabase";
};
