export type PropertyType = "Plot" | "Flat" | "Villa" | "Commercial";
export type Category = "Residential" | "Commercial";
export type SaleType = "Sale" | "Rent";
export type PropertyStatus = "Ready to Move" | "Under Construction" | "New Launch";

export type NearbyPlace = {
  label: string;
  distance: string;
  type: "School" | "Hospital" | "Metro" | "Airport" | "Business Hub";
};

export type Property = {
  id: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  category: Category;
  developerSlug: string;
  projectName: string;
  status: PropertyStatus;
  saleType: SaleType;
  price: number;
  pricePerSqFt: number;
  bookingAmount: number;
  area: number;
  areaUnit: "sq.ft" | "sq.yd";
  facing: string;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  parking: string;
  roadWidth: string;
  approvals: string[];
  reraNumber: string;
  possessionDate: string;
  amenities: string[];
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
  videoUrl?: string;
  brochureUrl?: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  featuredProperty: boolean;
  verifiedProperty: boolean;
  active: boolean;
  rating: number;
  nearby: NearbyPlace[];
};

export type Developer = {
  id: string;
  name: string;
  slug: string;
  logoInitials: string;
  profile: string;
  completedProjects: number;
  ongoingProjects: number;
  upcomingProjects: number;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
  };
  rating: number;
  reviews: number;
  established: string;
  headquarters: string;
  specialties: string[];
  projectSlugs: string[];
  verified: boolean;
};

export type City = {
  name: string;
  slug: string;
  state: string;
  microMarkets: string[];
  avgPrice: string;
  activeListings: number;
  growth: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  delta: string;
  tone: "teal" | "green" | "amber";
};
