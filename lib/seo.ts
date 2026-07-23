import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { Developer, Faq, MarketplaceService, Material, Property } from "@/types/marketplace";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  keywords = [],
  noIndex = false
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 900,
          alt: title
        }
      ],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/bhoomikonnect-hero.png"),
    slogan: siteConfig.tagline,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.address ? { address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "IN"
    } } : {}),
    sameAs: Object.values(siteConfig.socials).filter(Boolean)
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/buy?city={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function propertySchema(property: Property, developer?: Developer) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    image: property.gallery.map((image) => absoluteUrl(image)),
    description: property.description,
    brand: developer?.name,
    category: `${property.propertyType} ${property.category} Property`,
    sku: property.id,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.rating,
      reviewCount: developer?.reviews || 24
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/property/${property.slug}`),
      seller: {
        "@type": "Organization",
        name: developer?.name || siteConfig.name
      }
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "RERA Number", value: property.reraNumber },
      { "@type": "PropertyValue", name: "Possession", value: property.possessionDate },
      { "@type": "PropertyValue", name: "Area", value: `${property.area} ${property.areaUnit}` },
      { "@type": "PropertyValue", name: "Approvals", value: property.approvals.join(", ") }
    ]
  };
}

export function developerSchema(developer: Developer) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: developer.name,
    url: absoluteUrl(`/developers/${developer.slug}`),
    telephone: developer.contact.phone,
    email: developer.contact.email,
    foundingDate: developer.established,
    address: {
      "@type": "PostalAddress",
      addressLocality: developer.headquarters,
      addressCountry: "IN"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: developer.rating,
      reviewCount: developer.reviews
    }
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function serviceSchema(service: MarketplaceService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    image: absoluteUrl(service.image),
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: service.serviceLocations.map((name) => ({ "@type": "City", name })),
    offers: { "@type": "Offer", price: service.startingPrice, priceCurrency: "INR", url: absoluteUrl(`/${service.family}/${service.slug}`) }
  };
}

export function materialSchema(material: Material) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.name,
    image: absoluteUrl(material.image),
    description: material.description,
    brand: { "@type": "Brand", name: material.brand },
    offers: { "@type": "Offer", price: material.price, priceCurrency: "INR", availability: "https://schema.org/InStock", url: absoluteUrl(`/materials/${material.slug}`) }
  };
}
