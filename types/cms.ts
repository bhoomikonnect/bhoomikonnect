import type { LeadRecord } from "@/types/leads";

export type PropertyPublishingStatus = "draft" | "pending" | "approved" | "rejected" | "published" | "archived";

export type CmsPropertyInput = {
  title: string;
  slug: string;
  property_type: string;
  category: string;
  listing_purpose: "Sale" | "Rent";
  developer_id: string;
  developer_name: string;
  developer_slug: string;
  project_name: string;
  owner_name: string;
  property_status: string;
  country: string;
  state: string;
  district: string;
  city: string;
  area_name: string;
  locality: string;
  address: string;
  landmark: string;
  pincode: string;
  latitude: number;
  longitude: number;
  total_price: number;
  price_per_sq_ft: number;
  price_per_sq_yd: number;
  negotiable: boolean;
  booking_amount: number;
  maintenance_charges: number;
  security_deposit: number;
  rent_amount: number;
  total_area: number;
  area_unit: "sq.ft" | "sq.yd";
  plot_area: number;
  built_up_area: number;
  carpet_area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  parking: string;
  total_floors: number | null;
  property_floor: number | null;
  facing: string;
  road_width: string;
  furnishing: string;
  property_age: string;
  construction_status: string;
  possession_date: string;
  rera_number: string;
  dtcp_approval: boolean;
  hmda_approval: boolean;
  municipality_approval: boolean;
  panchayat_approval: boolean;
  legal_verification: boolean;
  bank_loan_available: boolean;
  approvals: string[];
  description: string;
  amenities: string[];
  nearby: Array<{ label: string; distance: string; type: string }>;
  cover_image: string;
  gallery: string[];
  floor_plans: string[];
  layout_plan: string;
  master_plan: string;
  brochure_url: string;
  video_url: string;
  virtual_tour_url: string;
  seo_title: string;
  meta_description: string;
  keywords: string[];
  canonical_url: string;
  og_image: string;
  image_alt_text: string;
  publishing_status: PropertyPublishingStatus;
  featured: boolean;
  verified: boolean;
  active: boolean;
};

export type CmsPropertyRecord = CmsPropertyInput & {
  id: string;
  created_at: string;
  updated_at: string;
  source?: "local" | "demo" | "directus" | "supabase";
};

export type CmsSectionType = "hero" | "text" | "image" | "cta" | "statistics" | "faq" | "gallery" | "contact";

export type CmsPageSection = {
  id: string;
  block_type: CmsSectionType;
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  image_alt: string;
  cta_label: string;
  cta_url: string;
  items: string[];
};

export type CmsPageInput = {
  title: string;
  slug: string;
  template: string;
  status: "draft" | "published" | "archived";
  seo_title: string;
  meta_description: string;
  canonical_url: string;
  sections: CmsPageSection[];
};

export type CmsPageRecord = CmsPageInput & {
  id: string;
  created_at: string;
  updated_at: string;
  source?: "local" | "directus" | "supabase";
};

export type LocalCmsStore = {
  properties: CmsPropertyRecord[];
  deleted_property_slugs: string[];
  pages: CmsPageRecord[];
  leads: LeadRecord[];
};
