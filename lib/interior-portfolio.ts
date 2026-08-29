export type InteriorPortfolioProject = { slug: string; title: string; category: string; description: string; images: string[] };

const root = "/images/interiors/portfolio";
const paths = (...images: string[]) => images.map((image) => `${root}/${image}`);

export const interiorPortfolio: InteriorPortfolioProject[] = [
  { slug: "tailored-kitchens-and-utility", title: "Tailored Kitchen & Utility Collection", category: "Modular kitchens", description: "A practical collection of modular kitchens, utility counters, display storage, and breakfast-led layouts shaped around everyday movement, durable finishes, and clutter-free organisation.", images: paths("kitchen-display-cabinet.jpeg", "charcoal-modular-kitchen.jpeg", "teal-modular-kitchen.jpeg", "utility-storage-unit.jpeg", "utility-storage-side.jpeg") },
  { slug: "warm-living-spaces", title: "Warm Living Spaces", category: "Living rooms & TV units", description: "Layered timber, calm neutrals, display niches, soft lighting, and marble-inspired surfaces come together in living areas that feel polished without losing their welcoming character.", images: paths("living-room-divider.jpeg", "tv-feature-wall-blue.jpeg", "illuminated-plant-wall.jpeg", "contemporary-living-room.jpeg", "marble-tv-wall.jpeg", "floral-wall-art.jpeg") },
  { slug: "bedrooms-and-smart-storage", title: "Personal Bedrooms & Smart Storage", category: "Bedrooms & wardrobes", description: "Full-height wardrobes, integrated dressing zones, compact study corners, and expressive feature walls give each bedroom a distinct identity while using every available inch thoughtfully.", images: paths("bedroom-dresser.jpeg", "graphite-walnut-wardrobe.jpeg", "geometric-white-wardrobe.jpeg", "sliding-pattern-wardrobe.jpeg", "corner-study-unit.jpeg", "full-wall-bedroom-storage.jpeg", "blue-floral-bedroom.jpeg", "bird-mural-bedroom.jpeg", "tropical-bedroom.jpeg") },
  { slug: "display-and-devotional-corners", title: "Crafted Display & Devotional Corners", category: "Custom furniture & pooja units", description: "Purpose-built cabinets, illuminated glasswork, graceful partitions, and devotional motifs turn overlooked corners into useful focal points with warmth and presence.", images: paths("display-crockery-unit.jpeg", "arched-entry-console.jpeg", "gold-glass-pooja-unit.jpeg", "white-pooja-partition.jpeg", "tall-display-cabinet.jpeg", "lit-display-niche.jpeg") },
  { slug: "false-ceilings-and-lighting", title: "Light Drawn Across the Ceiling", category: "False ceilings & lighting", description: "Linear profiles and geometric compositions create clean visual rhythm across halls and rooms, balancing ambient warmth with crisp task lighting and architectural definition.", images: paths("geometric-led-ceiling.jpeg", "hallway-linear-ceiling.jpeg", "dual-tone-ceiling.jpeg", "dual-tone-ceiling-close.jpeg", "square-led-ceiling.jpeg", "warm-geometric-ceiling.jpeg", "pendant-lighting.jpeg", "linear-wall-lighting.jpeg") },
  { slug: "decorative-privacy-solutions", title: "Decorative Privacy, Naturally Lit", category: "Windows, films & aluminium work", description: "Sliding systems and decorative privacy films soften direct views while preserving daylight, adding colour and pattern to kitchens, bedrooms, balconies, and utility openings.", images: paths("aluminium-sliding-door.jpeg", "dotted-privacy-window.jpeg", "dotted-kitchen-window.jpeg", "leaf-privacy-window.jpeg", "blossom-privacy-window.jpeg", "floral-privacy-window.jpeg") }
];

export function getInteriorPortfolioProject(slug: string) {
  return interiorPortfolio.find((project) => project.slug === slug);
}

export const interiorShowcaseVideo = `${root}/interior-work-showcase.mp4`;
