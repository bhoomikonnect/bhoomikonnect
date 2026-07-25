import { z } from "zod";

const line = z.string().trim().min(1).max(300);

export const cmsServiceSchema = z.object({
  family: z.enum(["construction", "architecture", "interiors", "painting", "renovation", "maintenance"]),
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  summary: z.string().trim().min(10).max(300),
  description: z.string().trim().min(20).max(5000),
  starting_price: z.coerce.number().min(0),
  price_label: z.string().trim().max(80),
  timeline: z.string().trim().max(100),
  features: z.array(line).max(40),
  deliverables: z.array(line).max(40),
  packages: z.array(z.object({ name: line, price: line, description: z.string().trim().max(500) })).max(20),
  service_locations: z.array(line).max(100),
  faq: z.array(z.object({ question: line, answer: z.string().trim().min(1).max(1000) })).max(30),
  cover_image: z.string().trim().max(1000),
  seo_title: z.string().trim().max(160),
  meta_description: z.string().trim().max(320),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  display_order: z.coerce.number().int().min(0).max(10000)
});
