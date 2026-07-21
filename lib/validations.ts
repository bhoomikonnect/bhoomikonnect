import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().regex(/^[+0-9 ()-]{10,18}$/, "Enter a valid phone number"),
  whatsapp: z.string().regex(/^[+0-9 ()-]{10,18}$/, "Enter a valid WhatsApp number").optional().or(z.literal("")),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().max(1000).optional(),
  source: z.string().min(2).max(80),
  leadType: z.enum([
    "Property Enquiry", "Property Sale Request", "Callback Request", "Site Visit", "Brochure Download",
    "Developer Enquiry", "Construction Quote", "Architecture Enquiry", "Interior Enquiry", "Painting Enquiry",
    "Renovation Enquiry", "Maintenance Booking", "Material Quote", "Service Booking", "General Contact"
  ]).default("General Contact"),
  propertySlug: z.string().optional(),
  developerSlug: z.string().optional(),
  serviceSlug: z.string().optional(),
  providerSlug: z.string().optional(),
  materialSlug: z.string().optional(),
  city: z.string().max(120).optional(),
  budget: z.string().max(120).optional(),
  preferredDate: z.string().max(40).optional(),
  sourcePage: z.string().max(240).optional(),
  consent: z.preprocess((value) => value === true || value === "true", z.boolean()).optional(),
  website: z.string().max(0).optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
});

export const quoteFormSchema = leadSchema.pick({
  name: true,
  phone: true,
  whatsapp: true,
  email: true,
  city: true,
  budget: true,
  preferredDate: true,
  message: true,
  consent: true
}).extend({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[+0-9 ()-]{10,18}$/, "Please enter a valid phone number"),
  city: z.string().min(2, "Please enter the site or service location"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the contact consent" }) })
});

export const propertySubmissionSchema = z.object({
  name: z.string().min(2, "Enter the owner name"),
  phone: z.string().regex(/^[+0-9 ()-]{10,18}$/, "Enter a valid phone number"),
  whatsapp: z.string().regex(/^[+0-9 ()-]{10,18}$/, "Enter a valid WhatsApp number"),
  email: z.string().email("Enter a valid email"),
  propertyType: z.string().min(2, "Select a property type"),
  listingPurpose: z.enum(["Sale", "Rent", "Resale"]),
  location: z.string().min(3, "Enter the property location"),
  expectedPrice: z.string().min(1, "Enter the expected price"),
  size: z.string().min(1, "Enter the property size"),
  approvalStatus: z.string().min(2, "Select an approval status"),
  description: z.string().min(20, "Add at least 20 characters"),
  preferredCallbackTime: z.string().min(2, "Select a callback time"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) })
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
