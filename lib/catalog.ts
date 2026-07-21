import type {
  CurrentWork,
  Faq,
  MarketplaceService,
  Material,
  ServiceFamily,
  ServiceProvider,
  Testimonial
} from "@/types/marketplace";

const apartmentImage = "/images/properties/apartment-grove.png";
const villaImage = "/images/properties/villa-enclave.png";
const plotImage = "/images/properties/plotted-habitat.png";

export const serviceFamilyMeta: Record<ServiceFamily, { title: string; eyebrow: string; description: string }> = {
  construction: {
    title: "Construction Services",
    eyebrow: "Build with clarity",
    description: "Verified civil teams, transparent package scopes, milestone planning, and one accountable quotation workflow."
  },
  architecture: {
    title: "Architecture & Planning",
    eyebrow: "Plan before you build",
    description: "Practical plans, structural coordination, approvals, vastu guidance, elevations, and site-aware design."
  },
  interiors: {
    title: "Interior Design",
    eyebrow: "Spaces made personal",
    description: "From modular kitchens to turnkey homes, compare clear scopes, materials, timelines, and verified designers."
  },
  painting: {
    title: "Painting Services",
    eyebrow: "A cleaner finish",
    description: "Interior, exterior, waterproofing, polishing, and repainting services with inspection-led estimates."
  },
  renovation: {
    title: "Renovation Services",
    eyebrow: "Improve what you have",
    description: "Coordinated remodeling, repairs, waterproofing, and upgrades with before-and-after progress visibility."
  },
  maintenance: {
    title: "Home Maintenance",
    eyebrow: "Reliable everyday help",
    description: "Book verified local professionals for repairs, cleaning, installation, fabrication, and preventive maintenance."
  }
};

const serviceNames: Record<ServiceFamily, string[]> = {
  construction: [
    "House Construction", "Duplex Construction", "Apartment Construction", "Commercial Buildings",
    "Farmhouse Construction", "Compound Wall", "Borewell", "Layout Development", "Turnkey Construction",
    "Structural Construction", "Foundation Work", "RCC Work", "Masonry Work", "Roofing Work",
    "Waterproofing", "Civil Contracting"
  ],
  architecture: [
    "House Plans", "2D Layout", "3D Elevation", "Structural Design", "Vastu Consultation",
    "Municipal Approvals", "Building Permission", "Floor Plans", "Site Planning", "Landscape Design",
    "Commercial Planning", "Renovation Planning"
  ],
  interiors: [
    "Full Home Interiors", "Modular Kitchen", "Bedroom Interiors", "Living Room Interiors", "Dining Room Interiors",
    "False Ceiling", "TV Units", "Wardrobes", "Pooja Room", "Bathroom Interiors", "Balcony Interiors",
    "Office Interiors", "Commercial Interiors", "Shop Interiors", "Restaurant Interiors", "Furniture Design",
    "Lighting Design", "Space Planning", "2D Interior Design", "3D Interior Design", "Turnkey Interiors"
  ],
  painting: [
    "Interior Painting", "Exterior Painting", "Texture Painting", "Waterproof Painting", "Wall Designs",
    "Commercial Painting", "Home Repainting", "Rental Home Painting", "Wood Polishing", "Metal Painting",
    "Putty Work", "Stencil Painting"
  ],
  renovation: [
    "Bathroom Renovation", "Kitchen Remodeling", "Flooring", "Roofing", "Electrical Renovation",
    "Plumbing Renovation", "Full Home Renovation", "Office Renovation", "Commercial Renovation",
    "Structural Repair", "Waterproofing", "Wall Modification", "Door and Window Replacement"
  ],
  maintenance: [
    "Electrical", "Plumbing", "Carpentry", "AC Service", "Cleaning", "Pest Control", "Appliance Repair",
    "Water Purifier Service", "CCTV Installation", "Solar Installation", "Gardening", "Tank Cleaning",
    "Sofa Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Geyser Service", "Inverter Service",
    "Generator Service", "Chimney Service", "Mosquito Mesh", "Glass Work", "Aluminium Work", "Steel Work",
    "Grill Work", "Gate Fabrication", "Granite Work", "Marble Work", "Tile Repair", "Furniture Repair"
  ]
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const serviceImages: Record<ServiceFamily, string> = {
  construction: plotImage,
  architecture: apartmentImage,
  interiors: villaImage,
  painting: apartmentImage,
  renovation: villaImage,
  maintenance: plotImage
};

function createService(family: ServiceFamily, title: string, index: number): MarketplaceService {
  const isMaintenance = family === "maintenance";
  const startingPrice = isMaintenance ? 499 + index * 75 : 3500 + index * 1250;

  return {
    id: `${family}-${String(index + 1).padStart(2, "0")}`,
    title,
    slug: slugify(title),
    family,
    summary: `${title} delivered by screened BhoomiKonnect professionals with a clear scope, timeline, and quotation before work begins.`,
    description: `BhoomiKonnect coordinates ${title.toLowerCase()} through verified specialists, documented requirements, transparent estimates, and progress communication. Every enquiry is reviewed before assignment so the proposed scope fits the property, location, and budget.`,
    startingPrice,
    priceLabel: isMaintenance ? "per visit" : family === "construction" ? "indicative package" : "starting estimate",
    timeline: isMaintenance ? "Same day to 3 days" : `${2 + (index % 5)} to ${5 + (index % 7)} weeks`,
    features: ["Verified professionals", "Scope-first estimate", "Quality checkpoints", "Dedicated coordination"],
    deliverables: ["Requirement review", "Itemised quotation", "Work schedule", "Completion handover"],
    packages: [
      { name: "Essential", price: `From ₹${startingPrice.toLocaleString("en-IN")}`, description: "Core scope with standard materials and workmanship." },
      { name: "Premium", price: "Custom quote", description: "Upgraded materials, expanded supervision, and priority scheduling." }
    ],
    serviceLocations: ["Hyderabad", "Vijayawada", "Guntur", "Visakhapatnam", "Bengaluru", "Chennai"],
    faq: [
      { question: `How is the ${title.toLowerCase()} price calculated?`, answer: "Pricing is based on site conditions, measured scope, selected materials, access, and delivery timeline. A final quote follows the requirement review." },
      { question: "Are the professionals verified?", answer: "Provider identity, service history, skills, and relevant business details are reviewed before marketplace verification." },
      { question: "Can I request an inspection first?", answer: "Yes. Submit the quote form and choose a preferred date for a call or site inspection." }
    ],
    image: serviceImages[family],
    featured: index < 4,
    active: true
  };
}

export const marketplaceServices: MarketplaceService[] = (Object.keys(serviceNames) as ServiceFamily[]).flatMap((family) =>
  serviceNames[family].map((title, index) => createService(family, title, index))
);

const providerNames = [
  "Ananya Buildcraft", "Deccan Design Studio", "Veda Space Works", "TrueCoat Professionals",
  "Renew Habitat", "MetroFix Services", "Sthira Civil Works", "Aakar Architects",
  "Mitra Home Care", "Craftline Interiors", "UrbanShield Waterproofing", "Nava Electricals"
];

const providerTypes = ["Contractor", "Architect", "Interior Designer", "Painter", "Renovation Specialist", "Service Provider"];
const providerCities = ["Hyderabad", "Vijayawada", "Guntur", "Visakhapatnam", "Bengaluru", "Chennai"];

export const serviceProviders: ServiceProvider[] = providerNames.map((name, index) => {
  const family = (Object.keys(serviceNames) as ServiceFamily[])[index % 6];
  return {
    id: `provider-${String(index + 1).padStart(2, "0")}`,
    name,
    slug: slugify(name),
    companyName: name,
    providerType: providerTypes[index % providerTypes.length],
    serviceFamilies: [family],
    services: serviceNames[family].slice(index % 4, index % 4 + 3),
    experience: 6 + (index % 12),
    city: providerCities[index % providerCities.length],
    serviceAreas: ["Central Zone", "Growth Corridors", "Nearby districts"],
    phone: "+91 90000 00000",
    whatsapp: "+91 90000 00000",
    email: `connect${index + 1}@provider.example`,
    description: `${name} is a demo verified ${providerTypes[index % providerTypes.length].toLowerCase()} profile focused on dependable scope delivery and transparent communication.`,
    skills: ["Site assessment", "Cost planning", "Quality control", "Client coordination"],
    completedJobs: 48 + index * 17,
    startingPrice: 750 + index * 250,
    rating: 4.4 + (index % 5) * 0.1,
    reviewCount: 32 + index * 11,
    availability: index % 3 === 0 ? "Available this week" : "Bookings open",
    languages: ["English", "Hindi", index % 2 ? "Telugu" : "Tamil"],
    verified: true,
    image: index % 3 === 0 ? plotImage : index % 3 === 1 ? apartmentImage : villaImage
  };
});

const materialNames = [
  "Cement", "Steel", "Sand", "Bricks", "Blocks", "Tiles", "Granite", "Marble", "Paints",
  "Electrical Materials", "Plumbing Materials", "Wood", "Plywood", "Hardware", "Doors", "Windows",
  "Roofing Materials", "Waterproofing Materials"
];

export const materials: Material[] = materialNames.map((name, index) => ({
  id: `material-${String(index + 1).padStart(2, "0")}`,
  name,
  slug: slugify(name),
  category: name,
  brand: "Multiple verified brands",
  description: `Request a location-specific quotation for quality-checked ${name.toLowerCase()} from screened regional suppliers.`,
  unit: index % 3 === 0 ? "bag" : index % 3 === 1 ? "tonne" : "unit",
  price: 380 + index * 215,
  minimumOrder: index % 2 ? "10 units" : "Site requirement",
  availability: "Quote on request",
  deliveryLocations: providerCities,
  specifications: ["Brand options", "GST invoice", "Delivery coordination", "Quality documentation"],
  image: index % 3 === 0 ? plotImage : index % 3 === 1 ? villaImage : apartmentImage,
  featured: index < 6
}));

export const currentWorks: CurrentWork[] = Array.from({ length: 8 }, (_, index) => {
  const category = (["Construction", "Interiors", "Painting", "Renovation"] as const)[index % 4];
  const status = index > 5 ? "Completed" : "Ongoing";
  return {
    id: `work-${String(index + 1).padStart(2, "0")}`,
    title: `${providerCities[index % providerCities.length]} ${category} Work ${index + 1}`,
    slug: slugify(`${providerCities[index % providerCities.length]}-${category}-work-${index + 1}`),
    category,
    location: `${providerCities[index % providerCities.length]}, India`,
    startDate: `2026-${String((index % 6) + 1).padStart(2, "0")}-10`,
    expectedCompletion: `2026-${String((index % 6) + 7).padStart(2, "0")}-20`,
    status,
    progress: status === "Completed" ? 100 : 28 + index * 9,
    description: `An original demo ${category.toLowerCase()} project showing milestone-based updates, quality checks, and customer-approved progress visibility.`,
    image: index % 3 === 0 ? villaImage : index % 3 === 1 ? apartmentImage : plotImage,
    gallery: [villaImage, apartmentImage, plotImage],
    featured: index < 4
  };
});

export const testimonials: Testimonial[] = [
  ["Riya Menon", "Property buyer", "Approval details and direct conversations made our shortlist much easier."],
  ["Arjun Sethi", "Plot investor", "The comparison view brought price, location, and legal context into one decision."],
  ["Meera Kulkarni", "Developer CRM lead", "Buyers arrive with clearer intent because project information is structured well."],
  ["Sai Kiran", "Construction customer", "The quotation separated materials and work stages clearly before we committed."],
  ["Nandini Rao", "Interior customer", "We could compare scope and timelines without chasing multiple disconnected vendors."],
  ["Vikram Iyer", "Home owner", "One enquiry connected our renovation and painting requirements to the right teams."],
  ["Lavanya Reddy", "Service customer", "The provider profile and availability details made booking feel dependable."],
  ["Joseph Mathew", "Material buyer", "Supplier quotations were easy to compare and tied back to our site requirement."]
].map(([name, role, quote], index) => ({ id: `testimonial-${index + 1}`, name, role, quote, rating: 5 }));

export const platformFaqs: Faq[] = [
  { question: "What does BhoomiKonnect verify?", answer: "Verification can include identity, business details, property approvals, portfolio evidence, service history, and contact ownership depending on the listing type." },
  { question: "Does BhoomiKonnect charge buyers to enquire?", answer: "Browsing and submitting an enquiry are free in the demo marketplace. Commercial terms can be managed from the CMS as the platform launches." },
  { question: "Can property owners submit a listing?", answer: "Yes. Owner submissions enter an admin review workflow before anything can be published." },
  { question: "How are construction quotes prepared?", answer: "The team reviews location, plot size, built-up area, floors, quality level, budget, and timeline before sharing an itemised quotation." },
  { question: "Can I book a site inspection?", answer: "Yes. Property, renovation, and construction pages support preferred dates for visits and inspections." },
  { question: "Are prices final?", answer: "Displayed prices are indicative demo values. Final property, service, and material pricing is confirmed by the responsible provider or supplier." },
  { question: "Where is service available?", answer: "Demo coverage includes Hyderabad, Vijayawada, Guntur, Visakhapatnam, Bengaluru, and Chennai. CMS-managed locations can expand over time." },
  { question: "Can I compare properties?", answer: "Yes. Guests can maintain a local comparison shortlist, with account-based persistence planned through Supabase." },
  { question: "How are leads handled?", answer: "Each enquiry is classified, timestamped, and sent to the admin lead queue with source and related listing context." },
  { question: "Can providers manage their profiles later?", answer: "The database and role model are prepared for provider, contractor, developer, owner, and supplier dashboards." },
  { question: "Is my contact information public?", answer: "No. Enquiry data is submitted privately to the platform workflow and should be protected by role-based access controls." },
  { question: "How can I contact support?", answer: "Use the contact form, global call action, or WhatsApp action shown throughout the website." }
];
