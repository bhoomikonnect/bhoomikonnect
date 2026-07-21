export type PropertyType =
  | "Plot"
  | "Agricultural Land"
  | "Farm Land"
  | "Flat"
  | "Villa"
  | "Independent House"
  | "Commercial"
  | "Office"
  | "Shop"
  | "Warehouse"
  | "Industrial";
export type Category = "Residential" | "Commercial" | "Agricultural" | "Industrial";
export type SaleType = "Sale" | "Rent";
export type PropertyStatus = "Ready to Move" | "Under Construction" | "New Launch";

export type NearbyPlace = {
  label: string;
  distance: string;
  type: "School" | "Hospital" | "Metro" | "Airport" | "Business Hub";
};

export type Property = {
  id: string;
  directusId?: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  category: Category;
  developerSlug: string;
  developerName?: string;
  developerLogoInitials?: string;
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
  directusId?: string;
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
  id?: string;
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

export type ServiceFamily =
  | "construction"
  | "architecture"
  | "interiors"
  | "painting"
  | "renovation"
  | "maintenance";

export type MarketplaceService = {
  id: string;
  directusId?: string;
  title: string;
  slug: string;
  family: ServiceFamily;
  summary: string;
  description: string;
  startingPrice: number;
  priceLabel: string;
  timeline: string;
  features: string[];
  deliverables: string[];
  packages: Array<{ name: string; price: string; description: string }>;
  serviceLocations: string[];
  faq: Faq[];
  image: string;
  featured: boolean;
  active: boolean;
};

export type ServiceProvider = {
  id: string;
  directusId?: string;
  name: string;
  slug: string;
  companyName: string;
  providerType: string;
  serviceFamilies: ServiceFamily[];
  services: string[];
  experience: number;
  city: string;
  serviceAreas: string[];
  phone: string;
  whatsapp: string;
  email: string;
  description: string;
  skills: string[];
  completedJobs: number;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  availability: string;
  languages: string[];
  verified: boolean;
  image: string;
};

export type Material = {
  id: string;
  directusId?: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  unit: string;
  price: number;
  minimumOrder: string;
  availability: string;
  deliveryLocations: string[];
  specifications: string[];
  image: string;
  featured: boolean;
};

export type CurrentWork = {
  id: string;
  directusId?: string;
  title: string;
  slug: string;
  category: "Construction" | "Interiors" | "Painting" | "Renovation";
  location: string;
  startDate: string;
  expectedCompletion: string;
  status: "Ongoing" | "Completed";
  progress: number;
  description: string;
  image: string;
  gallery: string[];
  featured: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};
