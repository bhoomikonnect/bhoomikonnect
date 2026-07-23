import type { CmsPageInput, CmsPageSection, CmsPropertyInput } from "@/types/cms";

export function createEmptyProperty(): CmsPropertyInput {
  return {
    title: "", slug: "", property_type: "Flat", category: "Residential", listing_purpose: "Sale",
    developer_id: "", developer_name: "", developer_slug: "", project_name: "", owner_name: "", property_status: "Under Construction",
    country: "India", state: "", district: "", city: "", area_name: "", locality: "", address: "", landmark: "", pincode: "",
    latitude: 0, longitude: 0, total_price: 0, price_per_sq_ft: 0, price_per_sq_yd: 0, negotiable: false,
    booking_amount: 0, maintenance_charges: 0, security_deposit: 0, rent_amount: 0,
    total_area: 0, area_unit: "sq.ft", plot_area: 0, built_up_area: 0, carpet_area: 0,
    bedrooms: null, bathrooms: null, balconies: null, parking: "Available", total_floors: null, property_floor: null,
    facing: "East", road_width: "", furnishing: "Unfurnished", property_age: "New", construction_status: "Under Construction", possession_date: "",
    rera_number: "", dtcp_approval: false, hmda_approval: false, municipality_approval: false, panchayat_approval: false,
    legal_verification: false, bank_loan_available: false, approvals: [], description: "", amenities: [], nearby: [],
    cover_image: "", gallery: [], floor_plans: [], layout_plan: "", master_plan: "",
    brochure_url: "", video_url: "", virtual_tour_url: "", seo_title: "", meta_description: "", keywords: [],
    canonical_url: "", og_image: "", image_alt_text: "", publishing_status: "draft", featured: false, verified: false, active: true
  };
}

export function createEmptySection(type: CmsPageSection["block_type"] = "text"): CmsPageSection {
  return {
    id: crypto.randomUUID(), block_type: type, eyebrow: "", heading: "", body: "", image: "", image_alt: "",
    cta_label: "", cta_url: "", items: []
  };
}

export function createEmptyPage(): CmsPageInput {
  return {
    title: "", slug: "", template: "standard", status: "draft", seo_title: "", meta_description: "", canonical_url: "",
    sections: [createEmptySection("hero"), createEmptySection("text")]
  };
}
