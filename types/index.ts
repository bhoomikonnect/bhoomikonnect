export type PropertyType = "Plot" | "Flat" | "Villa" | "Commercial";
export type PropertyStatus = "Ready to Move" | "Under Construction" | "New Launch";
export type SaleType = "Sale" | "Rent";
export type LeadStatus = "New" | "Contacted" | "Site Visit" | "Negotiation" | "Closed" | "Lost";

export type Amenity =
  | "Clubhouse"
  | "Pool"
  | "Gym"
  | "Security"
  | "EV Charging"
  | "Play Area"
  | "Garden"
  | "Coworking"
  | "Power Backup"
  | "Rainwater Harvesting"
  | "Yoga Deck"
  | "Jogging Track";

export interface City {
  name: string;
  slug: string;
  region: string;
  listings: number;
  growth: string;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  profile: string;
  completedProjects: number;
  ongoingProjects: number;
  upcomingProjects: number;
  rating: number;
  reviews: number;
  established: string;
  website: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  category: string;
  developerSlug: string;
  projectName: string;
  status: PropertyStatus;
  saleType: SaleType;
  price: number;
  pricePerSqFt: number;
  bookingAmount: number;
  area: number;
  areaUnit: "sq ft" | "sq yd";
  facing: string;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  parking: string;
  roadWidth?: string;
  approvals: string[];
  reraNumber: string;
  possessionDate: string;
  amenities: Amenity[];
  description: string;
  location: {
    city: string;
    area: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  gallery: string[];
  floorPlans: string[];
  video?: string;
  brochure: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  featured: boolean;
  verified: boolean;
  active: boolean;
  nearby: {
    schools: string[];
    hospitals: string[];
    metro: string[];
    airport: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Lead {
  id: string;
  propertySlug: string;
  buyerName: string;
  phone: string;
  email: string;
  source: "Quick Enquiry" | "Request Callback" | "WhatsApp" | "Book Site Visit" | "Schedule Meeting";
  status: LeadStatus;
  notes: string;
}
