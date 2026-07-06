import type { AdminMetric, City, Developer, Faq, Property, PropertyType } from "@/types/marketplace";

const apartmentImage = "/images/properties/apartment-grove.png";
const villaImage = "/images/properties/villa-enclave.png";
const plotImage = "/images/properties/plotted-habitat.png";

export const developers: Developer[] = [
  {
    id: "dev-01",
    name: "Aarunya Urban Estates",
    slug: "aarunya-urban-estates",
    logoInitials: "AU",
    profile:
      "Aarunya Urban Estates builds transit-led residential communities with transparent approvals, thoughtful amenities, and strong post-handover support.",
    completedProjects: 18,
    ongoingProjects: 6,
    upcomingProjects: 3,
    contact: {
      phone: "+91 98480 22110",
      email: "sales@aarunya.example",
      website: "https://aarunya.example"
    },
    socials: {
      linkedin: "https://linkedin.com/company/aarunya",
      instagram: "https://instagram.com/aarunya",
      youtube: "https://youtube.com/@aarunya"
    },
    rating: 4.8,
    reviews: 286,
    established: "2010",
    headquarters: "Hyderabad",
    specialties: ["Premium flats", "Transit corridors", "Green-certified towers"],
    projectSlugs: ["emerald-heights-kokapet", "aura-sky-residences-worli"],
    verified: true
  },
  {
    id: "dev-02",
    name: "Nivasa Habitat Co.",
    slug: "nivasa-habitat-co",
    logoInitials: "NH",
    profile:
      "Nivasa Habitat Co. focuses on villa neighborhoods, low-density layouts, and nature-forward master planning for long-term family living.",
    completedProjects: 12,
    ongoingProjects: 4,
    upcomingProjects: 2,
    contact: {
      phone: "+91 99008 44552",
      email: "connect@nivasa.example",
      website: "https://nivasa.example"
    },
    socials: {
      linkedin: "https://linkedin.com/company/nivasa",
      instagram: "https://instagram.com/nivasa",
      youtube: "https://youtube.com/@nivasa"
    },
    rating: 4.7,
    reviews: 214,
    established: "2013",
    headquarters: "Bengaluru",
    specialties: ["Villa communities", "Clubhouse planning", "Low-density design"],
    projectSlugs: ["saffron-villa-estate-sarjapur", "cedar-court-villas-shankarpally"],
    verified: true
  },
  {
    id: "dev-03",
    name: "Prithvi Planned Spaces",
    slug: "prithvi-planned-spaces",
    logoInitials: "PP",
    profile:
      "Prithvi Planned Spaces develops plotted communities with clear titles, wide roads, utility planning, and buyer-friendly possession milestones.",
    completedProjects: 24,
    ongoingProjects: 5,
    upcomingProjects: 5,
    contact: {
      phone: "+91 97979 77881",
      email: "hello@prithvi.example",
      website: "https://prithvi.example"
    },
    socials: {
      linkedin: "https://linkedin.com/company/prithvi",
      instagram: "https://instagram.com/prithvi",
      youtube: "https://youtube.com/@prithvi"
    },
    rating: 4.6,
    reviews: 341,
    established: "2008",
    headquarters: "Chennai",
    specialties: ["RERA plots", "Villa plots", "Infrastructure-first layouts"],
    projectSlugs: ["teal-garden-plots-oragadam", "greenfield-rera-plots-hinjewadi"],
    verified: true
  },
  {
    id: "dev-04",
    name: "Meridian Workspaces",
    slug: "meridian-workspaces",
    logoInitials: "MW",
    profile:
      "Meridian Workspaces delivers Grade-A commercial projects with flexible floor plates, efficient services, and high-visibility business addresses.",
    completedProjects: 9,
    ongoingProjects: 3,
    upcomingProjects: 2,
    contact: {
      phone: "+91 99590 11880",
      email: "leasing@meridian.example",
      website: "https://meridian.example"
    },
    socials: {
      linkedin: "https://linkedin.com/company/meridian",
      instagram: "https://instagram.com/meridian",
      youtube: "https://youtube.com/@meridian"
    },
    rating: 4.5,
    reviews: 128,
    established: "2016",
    headquarters: "Pune",
    specialties: ["Office spaces", "Retail frontage", "Business parks"],
    projectSlugs: ["orbit-commerce-square-kharadi", "northline-business-park-whitefield"],
    verified: true
  }
];

export const properties: Property[] = [
  {
    id: "prop-01",
    title: "Emerald Heights at Kokapet",
    slug: "emerald-heights-kokapet",
    propertyType: "Flat",
    category: "Residential",
    developerSlug: "aarunya-urban-estates",
    projectName: "Emerald Heights",
    status: "Under Construction",
    saleType: "Sale",
    price: 14200000,
    pricePerSqFt: 8750,
    bookingAmount: 500000,
    area: 1625,
    areaUnit: "sq.ft",
    facing: "East",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    parking: "2 covered slots",
    roadWidth: "80 ft approach road",
    approvals: ["RERA", "HMDA", "Fire NOC"],
    reraNumber: "P024000BK001",
    possessionDate: "December 2027",
    amenities: ["Sky deck", "Co-working lounge", "Pool", "Yoga lawn", "EV charging", "Kids studio"],
    description:
      "A refined high-rise address designed for buyers who want skyline living without losing everyday convenience. The plan keeps natural light, storage, and privacy at the center of each home.",
    location: {
      city: "Hyderabad",
      area: "Kokapet",
      address: "Financial District extension, Kokapet, Hyderabad",
      latitude: 17.3984,
      longitude: 78.3428
    },
    gallery: [apartmentImage, villaImage, plotImage],
    floorPlans: ["3 BHK - 1625 sq.ft", "3.5 BHK - 1880 sq.ft"],
    videoUrl: "https://example.com/video/emerald-heights",
    brochureUrl: "/brochures/emerald-heights.pdf",
    seoTitle: "3 BHK Flats in Kokapet by Verified Developer | BhoomiKonnect",
    metaDescription:
      "Explore Emerald Heights Kokapet, verified 3 BHK flats with RERA, amenities, floor plans, map, price, and direct developer enquiry.",
    keywords: ["Kokapet flats", "3 BHK Hyderabad", "RERA flats", "verified developer"],
    featuredProperty: true,
    verifiedProperty: true,
    active: true,
    rating: 4.8,
    nearby: [
      { label: "Oakridge International School", distance: "4.2 km", type: "School" },
      { label: "Continental Hospitals", distance: "6.1 km", type: "Hospital" },
      { label: "Raidurg Metro", distance: "9.4 km", type: "Metro" },
      { label: "Financial District", distance: "3.8 km", type: "Business Hub" }
    ]
  },
  {
    id: "prop-02",
    title: "Saffron Villa Estate",
    slug: "saffron-villa-estate-sarjapur",
    propertyType: "Villa",
    category: "Residential",
    developerSlug: "nivasa-habitat-co",
    projectName: "Saffron Villa Estate",
    status: "New Launch",
    saleType: "Sale",
    price: 28600000,
    pricePerSqFt: 11200,
    bookingAmount: 900000,
    area: 2550,
    areaUnit: "sq.ft",
    facing: "North-East",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    parking: "2 car porch",
    roadWidth: "60 ft internal road",
    approvals: ["RERA", "BMRDA"],
    reraNumber: "PRM/KA/BK002",
    possessionDate: "March 2028",
    amenities: ["Private garden", "Clubhouse", "Pet park", "Solar-ready roofs", "Lap pool", "Guest suites"],
    description:
      "A quiet villa neighborhood with generous setbacks, family-sized plans, and a clubhouse that feels more like a members' retreat than a project amenity.",
    location: {
      city: "Bengaluru",
      area: "Sarjapur Road",
      address: "Near Dommasandra circle, Sarjapur Road, Bengaluru",
      latitude: 12.8618,
      longitude: 77.7863
    },
    gallery: [villaImage, apartmentImage, plotImage],
    floorPlans: ["4 BHK Villa - 2550 sq.ft", "4.5 BHK Corner Villa - 3100 sq.ft"],
    brochureUrl: "/brochures/saffron-villa-estate.pdf",
    seoTitle: "Premium Villas in Sarjapur Road Bengaluru | BhoomiKonnect",
    metaDescription:
      "View verified villas at Saffron Villa Estate, Sarjapur Road with price, amenities, RERA details, map, and direct developer contact.",
    keywords: ["Sarjapur villas", "Bengaluru villas", "gated community villas"],
    featuredProperty: true,
    verifiedProperty: true,
    active: true,
    rating: 4.7,
    nearby: [
      { label: "Indus International School", distance: "5.5 km", type: "School" },
      { label: "Motherhood Hospital", distance: "8.2 km", type: "Hospital" },
      { label: "Wipro SEZ", distance: "7.3 km", type: "Business Hub" },
      { label: "Kempegowda Airport", distance: "52 km", type: "Airport" }
    ]
  },
  {
    id: "prop-03",
    title: "Teal Garden Plots",
    slug: "teal-garden-plots-oragadam",
    propertyType: "Plot",
    category: "Residential",
    developerSlug: "prithvi-planned-spaces",
    projectName: "Teal Garden Plots",
    status: "Ready to Move",
    saleType: "Sale",
    price: 5200000,
    pricePerSqFt: 4330,
    bookingAmount: 200000,
    area: 1200,
    areaUnit: "sq.ft",
    facing: "West",
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    parking: "Plot frontage",
    roadWidth: "40 ft blacktop roads",
    approvals: ["RERA", "DTCP"],
    reraNumber: "TN/01/BK003",
    possessionDate: "Immediate",
    amenities: ["Avenue trees", "Stormwater drains", "Underground power", "Park", "Compound wall", "Street lighting"],
    description:
      "A clear-title plotted habitat for buyers who want to build on their own timeline while still buying into a planned neighborhood with infrastructure already in place.",
    location: {
      city: "Chennai",
      area: "Oragadam",
      address: "Oragadam industrial corridor, Chennai",
      latitude: 12.8382,
      longitude: 79.9791
    },
    gallery: [plotImage, villaImage, apartmentImage],
    floorPlans: ["30 x 40 Plot", "40 x 60 Corner Plot"],
    brochureUrl: "/brochures/teal-garden-plots.pdf",
    seoTitle: "RERA Approved Plots in Oragadam Chennai | BhoomiKonnect",
    metaDescription:
      "Compare Teal Garden Plots in Oragadam with price, approvals, layout amenities, location, and direct developer enquiry.",
    keywords: ["Oragadam plots", "Chennai plots", "RERA plots", "DTCP plots"],
    featuredProperty: true,
    verifiedProperty: true,
    active: true,
    rating: 4.6,
    nearby: [
      { label: "Apollo Engineering College", distance: "6.7 km", type: "School" },
      { label: "SRM Hospital", distance: "18 km", type: "Hospital" },
      { label: "Oragadam SIPCOT", distance: "4.4 km", type: "Business Hub" },
      { label: "Chennai Airport", distance: "38 km", type: "Airport" }
    ]
  },
  {
    id: "prop-04",
    title: "Orbit Commerce Square",
    slug: "orbit-commerce-square-kharadi",
    propertyType: "Commercial",
    category: "Commercial",
    developerSlug: "meridian-workspaces",
    projectName: "Orbit Commerce Square",
    status: "Ready to Move",
    saleType: "Sale",
    price: 9800000,
    pricePerSqFt: 12250,
    bookingAmount: 400000,
    area: 800,
    areaUnit: "sq.ft",
    facing: "South",
    bedrooms: null,
    bathrooms: 1,
    balconies: null,
    parking: "1 reserved slot",
    roadWidth: "100 ft frontage",
    approvals: ["RERA", "PMC", "Fire NOC"],
    reraNumber: "P521000BK004",
    possessionDate: "Immediate",
    amenities: ["Double-height lobby", "CCTV", "Visitor parking", "Cafe court", "Power backup", "High-speed lifts"],
    description:
      "A compact commercial suite designed for consultancies, clinics, boutique offices, and investor-led leasing in a high-demand business district.",
    location: {
      city: "Pune",
      area: "Kharadi",
      address: "EON IT Park corridor, Kharadi, Pune",
      latitude: 18.5511,
      longitude: 73.9349
    },
    gallery: [apartmentImage, plotImage, villaImage],
    floorPlans: ["Office Suite - 800 sq.ft", "Retail Bay - 1120 sq.ft"],
    brochureUrl: "/brochures/orbit-commerce-square.pdf",
    seoTitle: "Commercial Office Space in Kharadi Pune | BhoomiKonnect",
    metaDescription:
      "Find verified commercial spaces at Orbit Commerce Square, Kharadi with price, amenities, RERA, location, and direct developer contact.",
    keywords: ["Kharadi office space", "commercial property Pune", "verified commercial developer"],
    featuredProperty: false,
    verifiedProperty: true,
    active: true,
    rating: 4.5,
    nearby: [
      { label: "EON IT Park", distance: "1.2 km", type: "Business Hub" },
      { label: "Columbia Asia Hospital", distance: "3.8 km", type: "Hospital" },
      { label: "Pune Airport", distance: "8.5 km", type: "Airport" },
      { label: "Magarpatta City", distance: "7.1 km", type: "Business Hub" }
    ]
  },
  {
    id: "prop-05",
    title: "Aura Sky Residences",
    slug: "aura-sky-residences-worli",
    propertyType: "Flat",
    category: "Residential",
    developerSlug: "aarunya-urban-estates",
    projectName: "Aura Sky Residences",
    status: "Under Construction",
    saleType: "Sale",
    price: 51500000,
    pricePerSqFt: 28600,
    bookingAmount: 2500000,
    area: 1800,
    areaUnit: "sq.ft",
    facing: "Sea-facing",
    bedrooms: 3,
    bathrooms: 4,
    balconies: 1,
    parking: "2 basement slots",
    roadWidth: "90 ft arterial road",
    approvals: ["RERA", "MCGM"],
    reraNumber: "P519000BK005",
    possessionDate: "June 2029",
    amenities: ["Sea-view lounge", "Concierge", "Wellness deck", "Infinity pool", "Library", "Business suites"],
    description:
      "A vertical residence for buyers who want a polished Mumbai address with privacy, hospitality-grade services, and a strong developer record.",
    location: {
      city: "Mumbai",
      area: "Worli",
      address: "Worli sea-link precinct, Mumbai",
      latitude: 19.0169,
      longitude: 72.8156
    },
    gallery: [apartmentImage, villaImage, plotImage],
    floorPlans: ["3 BHK - 1800 sq.ft", "4 BHK - 2440 sq.ft"],
    brochureUrl: "/brochures/aura-sky-residences.pdf",
    seoTitle: "Luxury Flats in Worli Mumbai by Verified Developer | BhoomiKonnect",
    metaDescription:
      "Explore Aura Sky Residences Worli with price, sea-facing plans, amenities, RERA details, location, and direct developer enquiry.",
    keywords: ["Worli luxury flats", "Mumbai premium apartments", "sea-facing flats"],
    featuredProperty: false,
    verifiedProperty: true,
    active: true,
    rating: 4.9,
    nearby: [
      { label: "Podar ORT International", distance: "2.1 km", type: "School" },
      { label: "Global Hospital", distance: "3.4 km", type: "Hospital" },
      { label: "Lower Parel Metro", distance: "2.9 km", type: "Metro" },
      { label: "BKC", distance: "12 km", type: "Business Hub" }
    ]
  },
  {
    id: "prop-06",
    title: "Cedar Court Villas",
    slug: "cedar-court-villas-shankarpally",
    propertyType: "Villa",
    category: "Residential",
    developerSlug: "nivasa-habitat-co",
    projectName: "Cedar Court Villas",
    status: "Ready to Move",
    saleType: "Sale",
    price: 23800000,
    pricePerSqFt: 9520,
    bookingAmount: 750000,
    area: 2500,
    areaUnit: "sq.ft",
    facing: "East",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    parking: "2 car porch",
    roadWidth: "45 ft internal road",
    approvals: ["RERA", "HMDA"],
    reraNumber: "P024000BK006",
    possessionDate: "Immediate",
    amenities: ["Forest walk", "Club lounge", "Indoor games", "Rainwater harvesting", "Tennis court", "Clinic room"],
    description:
      "A ready villa community with completed social infrastructure and calm outdoor spaces for buyers who want certainty before moving.",
    location: {
      city: "Hyderabad",
      area: "Shankarpally",
      address: "Mokila-Shankarpally growth corridor, Hyderabad",
      latitude: 17.4655,
      longitude: 78.1318
    },
    gallery: [villaImage, plotImage, apartmentImage],
    floorPlans: ["4 BHK Villa - 2500 sq.ft", "4 BHK Garden Villa - 2765 sq.ft"],
    brochureUrl: "/brochures/cedar-court-villas.pdf",
    seoTitle: "Ready to Move Villas in Shankarpally Hyderabad | BhoomiKonnect",
    metaDescription:
      "View Cedar Court Villas in Shankarpally with ready possession, RERA details, amenities, floor plans, and direct developer contact.",
    keywords: ["Shankarpally villas", "Hyderabad ready villas", "HMDA villa project"],
    featuredProperty: false,
    verifiedProperty: true,
    active: true,
    rating: 4.6,
    nearby: [
      { label: "Gaudium School", distance: "10 km", type: "School" },
      { label: "Citizens Hospital", distance: "18 km", type: "Hospital" },
      { label: "Tellapur", distance: "15 km", type: "Business Hub" },
      { label: "Airport", distance: "48 km", type: "Airport" }
    ]
  },
  {
    id: "prop-07",
    title: "Northline Business Park",
    slug: "northline-business-park-whitefield",
    propertyType: "Commercial",
    category: "Commercial",
    developerSlug: "meridian-workspaces",
    projectName: "Northline Business Park",
    status: "Under Construction",
    saleType: "Sale",
    price: 18200000,
    pricePerSqFt: 13000,
    bookingAmount: 700000,
    area: 1400,
    areaUnit: "sq.ft",
    facing: "East",
    bedrooms: null,
    bathrooms: 2,
    balconies: null,
    parking: "2 reserved slots",
    roadWidth: "120 ft frontage",
    approvals: ["RERA", "BBMP", "Fire NOC"],
    reraNumber: "PRM/KA/BK007",
    possessionDate: "September 2027",
    amenities: ["Flexible floor plates", "Food court", "Meeting suites", "Smart access", "Power backup", "EV charging"],
    description:
      "A business park planned for owner-occupiers and investors who need efficient offices near Bengaluru's deep technology corridor.",
    location: {
      city: "Bengaluru",
      area: "Whitefield",
      address: "Whitefield Main Road, Bengaluru",
      latitude: 12.9698,
      longitude: 77.75
    },
    gallery: [apartmentImage, villaImage, plotImage],
    floorPlans: ["Office - 1400 sq.ft", "Office - 2200 sq.ft"],
    brochureUrl: "/brochures/northline-business-park.pdf",
    seoTitle: "Commercial Office Space in Whitefield Bengaluru | BhoomiKonnect",
    metaDescription:
      "Compare verified commercial offices at Northline Business Park Whitefield with RERA, amenities, location, price, and enquiry options.",
    keywords: ["Whitefield office space", "commercial property Bengaluru", "RERA commercial project"],
    featuredProperty: false,
    verifiedProperty: true,
    active: true,
    rating: 4.5,
    nearby: [
      { label: "ITPL", distance: "2.8 km", type: "Business Hub" },
      { label: "Vydehi Hospital", distance: "2.2 km", type: "Hospital" },
      { label: "Kadugodi Metro", distance: "3.1 km", type: "Metro" },
      { label: "Bengaluru Airport", distance: "38 km", type: "Airport" }
    ]
  },
  {
    id: "prop-08",
    title: "Greenfield RERA Plots",
    slug: "greenfield-rera-plots-hinjewadi",
    propertyType: "Plot",
    category: "Residential",
    developerSlug: "prithvi-planned-spaces",
    projectName: "Greenfield RERA Plots",
    status: "New Launch",
    saleType: "Sale",
    price: 7600000,
    pricePerSqFt: 6330,
    bookingAmount: 250000,
    area: 1200,
    areaUnit: "sq.ft",
    facing: "North",
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    parking: "Plot frontage",
    roadWidth: "45 ft internal road",
    approvals: ["RERA", "PMRDA"],
    reraNumber: "P521000BK008",
    possessionDate: "December 2026",
    amenities: ["Club pavilion", "Security cabin", "Water lines", "Rain gardens", "Street lights", "Jogging track"],
    description:
      "A new plotted release near Pune's employment belt with clear infrastructure phasing, compact ticket sizes, and a practical self-build path.",
    location: {
      city: "Pune",
      area: "Hinjewadi",
      address: "Phase 3 growth corridor, Hinjewadi, Pune",
      latitude: 18.5913,
      longitude: 73.7389
    },
    gallery: [plotImage, apartmentImage, villaImage],
    floorPlans: ["30 x 40 Plot", "30 x 50 Plot"],
    brochureUrl: "/brochures/greenfield-rera-plots.pdf",
    seoTitle: "RERA Plots in Hinjewadi Pune | BhoomiKonnect",
    metaDescription:
      "Explore Greenfield RERA Plots in Hinjewadi with approvals, layout amenities, price, map, nearby hubs, and developer contact.",
    keywords: ["Hinjewadi plots", "Pune RERA plots", "PMRDA approved plots"],
    featuredProperty: false,
    verifiedProperty: true,
    active: true,
    rating: 4.4,
    nearby: [
      { label: "Rajiv Gandhi Infotech Park", distance: "5.3 km", type: "Business Hub" },
      { label: "Ruby Hall Clinic", distance: "9.5 km", type: "Hospital" },
      { label: "Blue Ridge Public School", distance: "6.2 km", type: "School" },
      { label: "Pune Airport", distance: "27 km", type: "Airport" }
    ]
  }
];

export const cities: City[] = [
  {
    name: "Hyderabad",
    slug: "hyderabad",
    state: "Telangana",
    microMarkets: ["Kokapet", "Tellapur", "Shankarpally", "Financial District"],
    avgPrice: "₹8,750/sq.ft",
    activeListings: 124,
    growth: "+14.2%"
  },
  {
    name: "Bengaluru",
    slug: "bengaluru",
    state: "Karnataka",
    microMarkets: ["Sarjapur Road", "Whitefield", "North Bengaluru", "Devanahalli"],
    avgPrice: "₹11,200/sq.ft",
    activeListings: 146,
    growth: "+11.8%"
  },
  {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    microMarkets: ["Oragadam", "OMR", "Sholinganallur", "Pallavaram"],
    avgPrice: "₹6,900/sq.ft",
    activeListings: 86,
    growth: "+9.4%"
  },
  {
    name: "Pune",
    slug: "pune",
    state: "Maharashtra",
    microMarkets: ["Kharadi", "Hinjewadi", "Wakad", "Baner"],
    avgPrice: "₹9,850/sq.ft",
    activeListings: 102,
    growth: "+10.6%"
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    state: "Maharashtra",
    microMarkets: ["Worli", "BKC", "Powai", "Thane"],
    avgPrice: "₹28,600/sq.ft",
    activeListings: 79,
    growth: "+7.9%"
  }
];

export const propertyTypes: PropertyType[] = ["Plot", "Flat", "Villa", "Commercial"];

export const homeFaqs: Faq[] = [
  {
    question: "How does BhoomiKonnect verify developers?",
    answer:
      "Developer profiles are reviewed for project history, contact authenticity, approval details, RERA information where applicable, and listing completeness before they are marked verified."
  },
  {
    question: "Can buyers contact developers directly?",
    answer:
      "Yes. Buyers can send enquiries, request callbacks, use WhatsApp, call, or book a site visit from property pages without broker handoffs."
  },
  {
    question: "Are prices and approvals shown on listings?",
    answer:
      "Each active listing includes price, price per square foot, approvals, RERA number when available, possession timeline, amenities, and nearby location context."
  },
  {
    question: "Does BhoomiKonnect support commercial property?",
    answer:
      "Yes. Commercial projects can include office suites, retail bays, business parks, approvals, parking, frontage, and leasing-oriented enquiry flows."
  }
];

export const adminMetrics: AdminMetric[] = [
  { label: "Active Properties", value: "1,248", delta: "+18 this week", tone: "teal" },
  { label: "Verified Developers", value: "86", delta: "+6 pending review", tone: "green" },
  { label: "Open Leads", value: "312", delta: "42 high intent", tone: "amber" },
  { label: "SEO Health", value: "94%", delta: "7 pages improved", tone: "teal" }
];

export const amenities = [
  "Clubhouse",
  "Pool",
  "EV charging",
  "Power backup",
  "Security",
  "Co-working",
  "Yoga lawn",
  "Street lighting",
  "Visitor parking",
  "Rainwater harvesting"
];

export function getDeveloperBySlug(slug: string) {
  return developers.find((developer) => developer.slug === slug);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getPropertiesByType(type: PropertyType) {
  return properties.filter((property) => property.propertyType === type && property.active);
}

export function getPropertiesByDeveloper(developerSlug: string) {
  return properties.filter((property) => property.developerSlug === developerSlug && property.active);
}

export function getRelatedProperties(property: Property) {
  return properties
    .filter(
      (candidate) =>
        candidate.slug !== property.slug &&
        candidate.active &&
        (candidate.location.city === property.location.city || candidate.propertyType === property.propertyType)
    )
    .slice(0, 3);
}
