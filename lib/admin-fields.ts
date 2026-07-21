export type AdminFieldSection = {
  label: string;
  fields: string[];
};

export type AdminFieldModule = {
  id: string;
  label: string;
  collections: string[];
  description: string;
  sections: AdminFieldSection[];
};

export const adminFieldModules: AdminFieldModule[] = [
  {
    id: "properties",
    label: "Properties",
    collections: ["properties", "property_images", "property_documents"],
    description: "Complete property inventory, verification, media, pricing, and publishing data.",
    sections: [
      { label: "Basic", fields: ["Property title", "Slug", "Property type", "Property category", "Listing purpose", "Project", "Developer", "Owner", "Property status"] },
      { label: "Location", fields: ["Country", "State", "District", "City", "Area", "Locality", "Address", "Landmark", "Pincode", "Latitude", "Longitude", "Map location"] },
      { label: "Pricing", fields: ["Total price", "Price per sq ft", "Price per sq yd", "Negotiable", "Booking amount", "Maintenance charges", "Security deposit", "Rent amount"] },
      { label: "Specifications", fields: ["Total area", "Area unit", "Plot area", "Built-up area", "Carpet area", "Bedrooms", "Bathrooms", "Balconies", "Parking", "Total floors", "Property floor", "Facing", "Road width", "Furnishing", "Property age", "Construction status", "Possession date"] },
      { label: "Legal", fields: ["RERA number", "Approvals", "DTCP approval", "HMDA approval", "Municipality approval", "Panchayat approval", "Legal verification", "Bank-loan availability"] },
      { label: "Content & media", fields: ["Description", "Amenities", "Nearby places", "Cover image", "Gallery", "Floor plans", "Layout plan", "Master plan", "Brochure PDF", "Video URL", "Virtual-tour URL"] },
      { label: "SEO", fields: ["SEO title", "Meta description", "Keywords", "Canonical URL", "Open Graph image", "Image alt text"] },
      { label: "Publishing", fields: ["Publishing status", "Featured", "Verified", "Active", "Display order", "Created at", "Updated at", "Deleted at"] }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    collections: ["projects", "project_images", "project_updates"],
    description: "Developer projects, launch status, location, approvals, progress, and media updates.",
    sections: [
      { label: "Identity", fields: ["Project title", "Slug", "Developer", "Category", "Status", "Description"] },
      { label: "Location", fields: ["City", "Area", "Address", "Latitude", "Longitude"] },
      { label: "Schedule & legal", fields: ["RERA number", "Start date", "Possession date"] },
      { label: "Media & SEO", fields: ["Cover image", "Gallery", "SEO title", "Meta description"] },
      { label: "Publishing", fields: ["Featured", "Verified", "Active", "Display order", "Created at", "Updated at", "Deleted at"] }
    ]
  },
  {
    id: "developers",
    label: "Developers",
    collections: ["developers", "developer_contacts"],
    description: "Company profile, project track record, contacts, social presence, and verification.",
    sections: [
      { label: "Company", fields: ["Name", "Slug", "Company profile", "Logo", "Website", "Established", "Headquarters", "Specialties"] },
      { label: "Contact", fields: ["Contact name", "Designation", "Phone", "WhatsApp", "Email", "Primary contact"] },
      { label: "Track record", fields: ["Completed projects", "Ongoing projects", "Upcoming projects", "Rating", "Review count"] },
      { label: "Social & status", fields: ["LinkedIn", "Instagram", "YouTube", "Verified", "Active", "Created at"] }
    ]
  },
  {
    id: "property-operations",
    label: "Property Operations",
    collections: ["property_owners", "sell_property_requests", "property_visits", "favorites", "property_comparisons"],
    description: "Owner onboarding, sell requests, site visits, favorites, and customer comparisons.",
    sections: [
      { label: "Owner", fields: ["Profile", "Name", "Phone", "WhatsApp", "Email", "Verification status"] },
      { label: "Sell request", fields: ["Property type", "Listing purpose", "Location", "Expected price", "Size", "Approval status", "Photos", "Documents", "Description", "Preferred callback time", "Consent", "Status", "Notes"] },
      { label: "Site visit", fields: ["Property", "Customer", "Name", "Phone", "Visit date and time", "Status", "Notes"] },
      { label: "Saved activity", fields: ["Favorite property", "Compared properties", "Created at", "Updated at"] }
    ]
  },
  {
    id: "services",
    label: "Services",
    collections: ["services", "construction_services", "architecture_services", "interior_services", "painting_services", "renovation_services", "maintenance_services"],
    description: "Shared service catalogue plus fields tailored to every service family.",
    sections: [
      { label: "Common", fields: ["Service family", "Category", "Title", "Slug", "Summary", "Description", "Starting price", "Price label", "Timeline", "Features", "Deliverables", "Packages", "Service locations", "FAQs", "Cover image", "Gallery", "SEO title", "Meta description", "Featured", "Active", "Display order"] },
      { label: "Construction", fields: ["Price per sq ft", "Materials included", "Materials excluded", "Work stages"] },
      { label: "Architecture", fields: ["Deliverable files", "Revision count", "Architect name"] },
      { label: "Interiors", fields: ["Materials", "Warranty", "Before/after gallery"] },
      { label: "Painting", fields: ["Paint brands", "Interior/exterior", "Approximate rate"] },
      { label: "Renovation", fields: ["Inspection required", "Before/after gallery"] },
      { label: "Maintenance", fields: ["Price range", "Same-day availability", "Service packages"] }
    ]
  },
  {
    id: "providers",
    label: "Service Providers",
    collections: ["service_providers", "provider_services", "provider_portfolio"],
    description: "Professional profiles, service assignment, availability, portfolio, and verification.",
    sections: [
      { label: "Profile", fields: ["Name", "Slug", "Profile photo", "Company name", "Provider type", "Service families", "Experience", "Description", "Skills"] },
      { label: "Coverage & contact", fields: ["City", "Service areas", "Phone", "WhatsApp", "Email", "Working hours", "Languages"] },
      { label: "Commercial", fields: ["Services", "Custom price", "Starting price", "Completed jobs", "Availability"] },
      { label: "Trust", fields: ["Rating", "Review count", "Certifications", "Identity verification", "Verified", "Active"] },
      { label: "Portfolio", fields: ["Portfolio title", "Portfolio description", "Portfolio media", "Display order"] }
    ]
  },
  {
    id: "current-works",
    label: "Current Works",
    collections: ["current_works", "work_media", "project_updates"],
    description: "Ongoing and completed project progress, galleries, videos, and customer visibility.",
    sections: [
      { label: "Project", fields: ["Project title", "Slug", "Category", "Location", "Customer-name visibility", "Description", "Related service", "Related property"] },
      { label: "Progress", fields: ["Start date", "Expected completion", "Completion date", "Status", "Progress percentage"] },
      { label: "Media", fields: ["Cover image", "Media type", "File", "Caption", "Progress stage", "Before photos", "Progress photos", "After photos", "Videos", "Display order"] },
      { label: "Publishing", fields: ["Featured", "Active", "Created at", "Updated at"] }
    ]
  },
  {
    id: "materials",
    label: "Materials",
    collections: ["materials", "material_categories", "material_suppliers", "material_enquiries"],
    description: "Material catalogue, verified suppliers, delivery coverage, and quotation enquiries.",
    sections: [
      { label: "Material", fields: ["Material name", "Slug", "Category", "Brand", "Description", "Unit", "Price", "Minimum order", "Availability", "Delivery locations", "Supplier", "Images", "Specifications", "Cover image", "Featured", "Active"] },
      { label: "Supplier", fields: ["Profile", "Supplier name", "Slug", "Phone", "WhatsApp", "Email", "Delivery locations", "Verification status", "Active"] },
      { label: "Enquiry", fields: ["Material", "Customer", "Name", "Phone", "Email", "Quantity", "Delivery location", "Required date", "Message", "Status"] }
    ]
  },
  {
    id: "leads",
    label: "Leads & Bookings",
    collections: ["leads", "service_leads", "service_bookings", "material_enquiries", "property_visits"],
    description: "Unified enquiry pipeline with attribution, assignment, follow-up, and conversion status.",
    sections: [
      { label: "Customer", fields: ["Name", "Phone", "WhatsApp", "Email", "City", "Area", "Message", "Consent"] },
      { label: "Context", fields: ["Lead type", "Related property", "Related project", "Related developer", "Related service", "Related provider", "Related material", "Budget", "Preferred date"] },
      { label: "Attribution", fields: ["Source", "Source page", "UTM source", "UTM medium", "UTM campaign", "Metadata"] },
      { label: "Pipeline", fields: ["Assigned admin", "Status", "Priority", "Follow-up date", "Quotation status", "Notes", "Created at", "Updated at"] },
      { label: "Booking", fields: ["Customer", "Service", "Provider", "Location", "Preferred date", "Budget", "Message", "Status"] }
    ]
  },
  {
    id: "content",
    label: "Pages & Settings",
    collections: ["cms_pages", "cms_sections", "navigation_items", "contact_settings", "calculator_settings", "settings"],
    description: "Composable pages, navigation, contact details, calculators, and site-wide settings.",
    sections: [
      { label: "Page", fields: ["Page title", "Slug", "Template", "Status", "SEO title", "Meta description", "Canonical URL"] },
      { label: "Reusable section", fields: ["Page", "Block type", "Content", "Display order", "Active"] },
      { label: "Navigation", fields: ["Label", "URL", "Parent item", "Header/footer location", "Display order", "Active"] },
      { label: "Contact", fields: ["Phone", "WhatsApp", "Email", "Address", "Office hours", "Map URL", "Social links"] },
      { label: "Platform settings", fields: ["Setting key", "Setting value", "Calculator key", "Calculator value", "Updated at"] }
    ]
  },
  {
    id: "locations",
    label: "Locations & Taxonomy",
    collections: ["cities", "districts", "areas", "localities", "property_categories", "property_types", "amenities", "approvals"],
    description: "Search taxonomy and local SEO hierarchy for cities, areas, property types, and approvals.",
    sections: [
      { label: "Location", fields: ["Name", "Slug", "State", "City", "District", "Area", "Pincode", "Micro markets", "Active"] },
      { label: "Local SEO", fields: ["SEO title", "Meta description", "Keywords"] },
      { label: "Property taxonomy", fields: ["Category name", "Property type", "Description", "Icon", "Display order", "Active"] },
      { label: "Trust taxonomy", fields: ["Amenity name", "Approval name", "Issuing authority", "Active"] }
    ]
  },
  {
    id: "users",
    label: "Users & Access",
    collections: ["profiles", "notifications", "audit_logs"],
    description: "Supabase-authenticated profiles, roles, verification, notifications, and activity history.",
    sections: [
      { label: "Profile", fields: ["User ID", "Full name", "Phone", "Avatar", "Role", "Verified", "Created at", "Updated at"] },
      { label: "Roles", fields: ["Customer", "Buyer", "Property owner", "Developer", "Contractor", "Architect", "Interior designer", "Service provider", "Material supplier", "Admin", "Super admin"] },
      { label: "Notification", fields: ["User", "Title", "Body", "Type", "Read at", "Created at"] },
      { label: "Audit", fields: ["Actor", "Action", "Entity type", "Entity ID", "Metadata", "Created at"] }
    ]
  },
  {
    id: "trust-media",
    label: "Trust, Media & SEO",
    collections: ["reviews", "testimonials", "faqs", "media_assets", "seo_entries"],
    description: "Moderated social proof, media rights, FAQs, and route-level search metadata.",
    sections: [
      { label: "Reviews", fields: ["Author", "Entity type", "Entity ID", "Rating", "Title", "Review body", "Moderation status"] },
      { label: "Testimonials & FAQs", fields: ["Name", "Role", "Quote", "Rating", "Image", "Featured", "Question", "Answer", "Display order", "Active"] },
      { label: "Media rights", fields: ["Storage path", "Alt text", "Media type", "Image source", "Copyright owner", "Permission status", "License URL", "Photographer credit", "Usage expiry"] },
      { label: "Route SEO", fields: ["Path", "Title", "Description", "Canonical URL", "No index", "Structured data", "Open Graph image", "Updated at"] }
    ]
  }
];

export const adminFieldCount = adminFieldModules.reduce(
  (total, module) => total + module.sections.reduce((moduleTotal, section) => moduleTotal + section.fields.length, 0),
  0
);
