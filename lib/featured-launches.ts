import type { Developer, Property } from "@/types/marketplace";
import { newFeaturedProjects } from "@/lib/new-projects";

export const eeshanyaDeveloper: Developer = {
  id: "dev-eeshanya",
  name: "Eeshanya Infra Developers",
  slug: "eeshanya-infra-developers",
  logoInitials: "EI",
  profile:
    "Eeshanya Infra Developers creates infrastructure-led plotted communities across the fast-growing south Hyderabad corridor.",
  completedProjects: 0,
  ongoingProjects: 2,
  upcomingProjects: 1,
  contact: { phone: "", email: "", website: "#" },
  socials: { linkedin: "#", instagram: "#", youtube: "#" },
  rating: 4.8,
  reviews: 0,
  established: "2025",
  headquarters: "Hyderabad",
  specialties: ["Plotted developments", "Highway corridors", "Infrastructure-led layouts"],
  projectSlugs: ["eeshanya-samruddhi-rajapur", "eeshanya-shadnagar-heights"],
  verified: true
};

const originalFeaturedLaunches: Property[] = [
  {
    id: "prop-eeshanya-samruddhi",
    title: "Eeshanya Samruddhi",
    slug: "eeshanya-samruddhi-rajapur",
    propertyType: "Plot",
    category: "Residential",
    developerSlug: eeshanyaDeveloper.slug,
    developerName: eeshanyaDeveloper.name,
    developerLogoInitials: "EI",
    projectName: "Eeshanya Samruddhi",
    status: "New Launch",
    saleType: "Sale",
    price: 0,
    pricePerSqFt: 0,
    bookingAmount: 0,
    area: 150,
    areaUnit: "sq.yd",
    facing: "100% Vasthu-compliant layout",
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    parking: "Plot frontage",
    roadWidth: "40 ft and 30 ft BT internal roads",
    approvals: ["Proposed MUDA", "Proposed RERA"],
    reraNumber: "Proposed - final registration awaited",
    possessionDate: "New launch - enquire for schedule",
    amenities: [
      "Proposed luxury resort",
      "Grand entrance arch",
      "Lush landscaping and avenue plantation",
      "Underground electricity and street lights",
      "Children's play area",
      "Overhead water tank",
      "Underground drainage and septic system",
      "Rainwater harvesting pits"
    ],
    description:
      "A grand new plotted-community launch at Rajapur near NH-44. Phase 1 spans approximately 33 acres within a 100+ acre vision, with 1,500+ planned plots and plot sizes starting from 150 sq.yd. The location connects buyers to NH-44, the proposed Regional Ring Road, Polepally Green Industrial SEZ, Shadnagar and the airport corridor.",
    location: {
      city: "Hyderabad",
      area: "Rajapur, NH-44",
      address: "Rajapur, near NH-44 Hyderabad-Bangalore Highway, Telangana",
      latitude: 16.9626,
      longitude: 78.1672
    },
    gallery: [
      "/images/projects/eeshanya-samruddhi-layout.jpg",
      "/images/properties/plotted-habitat.png"
    ],
    floorPlans: ["Plots from 150 sq.yd", "Phase 1 - approximately 33 acres", "Master plan - 100+ acres"],
    brochureUrl: "/brochures/eeshanya-samruddhi-layout.pdf",
    seoTitle: "Eeshanya Samruddhi Plots at Rajapur NH-44 | New Launch",
    metaDescription:
      "Explore Eeshanya Samruddhi at Rajapur, NH-44: proposed MUDA and RERA plotted development with plots from 150 sq.yd and a 100+ acre vision.",
    keywords: ["Rajapur plots", "NH-44 plots", "Eeshanya Samruddhi", "Shadnagar plots"],
    featuredProperty: true,
    verifiedProperty: false,
    active: true,
    rating: 4.8,
    nearby: [
      { label: "NH-44 Hyderabad-Bangalore Highway", distance: "5 min", type: "Business Hub" },
      { label: "Regional Ring Road", distance: "10 min", type: "Business Hub" },
      { label: "Polepally Green Industrial SEZ", distance: "10 min", type: "Business Hub" },
      { label: "Shadnagar Town and Railway MMTS", distance: "20 min", type: "Metro" },
      { label: "Rajiv Gandhi International Airport", distance: "50 min", type: "Airport" }
    ]
  },
  {
    id: "prop-eeshanya-shadnagar-heights",
    title: "Eeshanya's Shadnagar Heights",
    slug: "eeshanya-shadnagar-heights",
    propertyType: "Plot",
    category: "Residential",
    developerSlug: eeshanyaDeveloper.slug,
    developerName: eeshanyaDeveloper.name,
    developerLogoInitials: "EI",
    projectName: "Eeshanya's Shadnagar Heights",
    status: "New Launch",
    saleType: "Sale",
    price: 0,
    pricePerSqFt: 0,
    bookingAmount: 0,
    area: 201.66,
    areaUnit: "sq.yd",
    facing: "Multiple facings available",
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    parking: "Plot frontage",
    roadWidth: "100 ft entrance and 30 ft CC internal roads",
    approvals: ["HMDA Approved", "RERA Registered"],
    reraNumber: "P02400009992",
    possessionDate: "Enquire for development schedule",
    amenities: [
      "Grand entrance with 100 ft road",
      "30 ft CC internal roads",
      "Avenue plantation",
      "Underground drainage system",
      "Underground electricity with street lights",
      "Rainwater harvesting pits",
      "Overhead water tank and septic tank",
      "Children's park with play equipment"
    ],
    description:
      "An HMDA and RERA approved plotted venture at Mogiligidda, Shadnagar Town, with a 200 ft Shadnagar-Parigi Highway frontage. The 25-acre planned community includes Phase 1 and Phase 2 inventory, with plot sizes starting at 201.66 sq.yd and direct access to Shadnagar's industrial, transit and social infrastructure.",
    location: {
      city: "Hyderabad",
      area: "Mogiligidda, Shadnagar",
      address: "Mogiligidda, Shadnagar Town, Ranga Reddy District, Telangana",
      latitude: 17.0734,
      longitude: 78.1772
    },
    gallery: [
      "/images/projects/eeshanya-shadnagar-heights-layout.jpg",
      "/images/properties/plotted-habitat.png"
    ],
    floorPlans: ["Plots from 201.66 sq.yd", "Phase 1 - 8 acres", "Phase 2 - 3 acres", "Total planned layout - 25 acres"],
    brochureUrl: "/brochures/eeshanya-shadnagar-heights-layout.pdf",
    seoTitle: "HMDA Plots in Mogiligidda | Eeshanya Shadnagar Heights",
    metaDescription:
      "Explore HMDA and RERA approved plots at Eeshanya's Shadnagar Heights, Mogiligidda, with plots from 201.66 sq.yd on Shadnagar-Parigi Highway.",
    keywords: ["HMDA plots Shadnagar", "Mogiligidda plots", "Shadnagar Heights", "RERA plots Hyderabad"],
    featuredProperty: true,
    verifiedProperty: true,
    active: true,
    rating: 4.8,
    nearby: [
      { label: "Shadnagar Main Bus Stand", distance: "10 min", type: "Business Hub" },
      { label: "Shadnagar Railway Station (MMTS)", distance: "15 min", type: "Metro" },
      { label: "Adani ConneX Data Center - Elikatta SEZ", distance: "Adjacent corridor", type: "Business Hub" },
      { label: "Regional Ring Road", distance: "Proposed nearby", type: "Business Hub" }
    ]
  }
];

export const featuredLaunches: Property[] = [...newFeaturedProjects, ...originalFeaturedLaunches];

export function getFeaturedLaunchBySlug(slug: string) {
  return featuredLaunches.find((project) => project.slug === slug);
}
