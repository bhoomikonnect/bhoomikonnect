import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name").max(80),
  phone: z.string().min(8).max(16),
  email: z.string().email(),
  message: z.string().max(500).optional(),
  source: z.enum(["Quick Enquiry", "Request Callback", "WhatsApp", "Book Site Visit", "Schedule Meeting"])
});

export const propertyFilterSchema = z.object({
  city: z.string().optional(),
  area: z.string().optional(),
  propertyType: z.string().optional(),
  budget: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  areaSize: z.string().optional(),
  facing: z.string().optional(),
  approval: z.string().optional(),
  developer: z.string().optional(),
  possession: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  rera: z.boolean().optional()
});

export const developerOnboardingSchema = z.object({
  companyName: z.string().min(2).max(120),
  website: z.string().url().optional().or(z.literal("")),
  phone: z.string().min(8).max(16),
  email: z.string().email(),
  projectCount: z.number().int().min(0).optional()
});
