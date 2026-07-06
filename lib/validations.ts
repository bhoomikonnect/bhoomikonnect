import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
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
  developer: z.string().optional(),
  possession: z.string().optional(),
  rera: z.string().optional()
});
