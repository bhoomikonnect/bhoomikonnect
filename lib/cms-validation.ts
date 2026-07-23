import { z } from "zod";

const trimmed = z.string().trim().max(500);
const optionalNumber = z.number().finite().min(0).nullable();

export const cmsPropertySchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z.string().trim().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug"),
  property_type: z.string().trim().min(1).max(80), category: z.string().trim().min(1).max(80),
  listing_purpose: z.enum(["Sale", "Rent"]), developer_id: trimmed, developer_name: trimmed, developer_slug: trimmed,
  project_name: z.string().trim().min(2).max(160), owner_name: trimmed, property_status: z.string().trim().min(1).max(80),
  country: trimmed, state: trimmed, district: trimmed, city: z.string().trim().min(2).max(120), area_name: trimmed,
  locality: trimmed, address: z.string().trim().min(5).max(500), landmark: trimmed, pincode: z.string().trim().max(12),
  latitude: z.number().finite().min(-90).max(90), longitude: z.number().finite().min(-180).max(180),
  total_price: z.number().finite().min(0), price_per_sq_ft: z.number().finite().min(0), price_per_sq_yd: z.number().finite().min(0),
  negotiable: z.boolean(), booking_amount: z.number().finite().min(0), maintenance_charges: z.number().finite().min(0),
  security_deposit: z.number().finite().min(0), rent_amount: z.number().finite().min(0), total_area: z.number().finite().positive(),
  area_unit: z.enum(["sq.ft", "sq.yd"]), plot_area: z.number().finite().min(0), built_up_area: z.number().finite().min(0), carpet_area: z.number().finite().min(0),
  bedrooms: optionalNumber, bathrooms: optionalNumber, balconies: optionalNumber, parking: trimmed, total_floors: optionalNumber,
  property_floor: optionalNumber, facing: trimmed, road_width: trimmed, furnishing: trimmed, property_age: trimmed,
  construction_status: trimmed, possession_date: trimmed, rera_number: trimmed, dtcp_approval: z.boolean(), hmda_approval: z.boolean(),
  municipality_approval: z.boolean(), panchayat_approval: z.boolean(), legal_verification: z.boolean(), bank_loan_available: z.boolean(),
  approvals: z.array(z.string().trim().min(1).max(120)).max(40), description: z.string().trim().min(30).max(12000),
  amenities: z.array(z.string().trim().min(1).max(120)).max(100),
  nearby: z.array(z.object({ label: trimmed, distance: trimmed, type: trimmed })).max(30),
  cover_image: trimmed, gallery: z.array(trimmed).max(80), floor_plans: z.array(trimmed).max(30), layout_plan: trimmed,
  master_plan: trimmed, brochure_url: trimmed, video_url: trimmed, virtual_tour_url: trimmed, seo_title: z.string().trim().max(160),
  meta_description: z.string().trim().max(320), keywords: z.array(z.string().trim().min(1).max(80)).max(40), canonical_url: trimmed,
  og_image: trimmed, image_alt_text: z.string().trim().max(240),
  publishing_status: z.enum(["draft", "pending", "approved", "rejected", "published", "archived"]),
  featured: z.boolean(), verified: z.boolean(), active: z.boolean()
}).superRefine((property, context) => {
  if (property.publishing_status !== "published") return;

  const requiredForPublication: Array<[keyof typeof property, string]> = [
    ["cover_image", "Add a real cover image before publishing"],
    ["image_alt_text", "Add accessible alt text for the primary image"],
    ["seo_title", "Add a unique SEO title before publishing"],
    ["meta_description", "Add a unique meta description before publishing"]
  ];

  requiredForPublication.forEach(([field, message]) => {
    if (!String(property[field] || "").trim()) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
    }
  });

  if (!property.verified) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["verified"],
      message: "Complete verification before publishing"
    });
  }
});

const cmsPageSectionSchema = z.object({
  id: z.string().min(1), block_type: z.enum(["hero", "text", "image", "cta", "statistics", "faq", "gallery", "contact"]),
  eyebrow: trimmed, heading: z.string().trim().max(180), body: z.string().trim().max(12000), image: trimmed,
  image_alt: z.string().trim().max(240), cta_label: z.string().trim().max(80), cta_url: trimmed,
  items: z.array(z.string().trim().min(1).max(500)).max(30)
});

export const cmsPageSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug"),
  template: z.string().trim().min(1).max(80), status: z.enum(["draft", "published", "archived"]),
  seo_title: z.string().trim().max(160), meta_description: z.string().trim().max(320), canonical_url: trimmed,
  sections: z.array(cmsPageSectionSchema).min(1).max(30)
});
