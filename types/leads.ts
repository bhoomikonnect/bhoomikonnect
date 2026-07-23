export type LeadPayload = {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  message?: string;
  source: string;
  leadType?: string;
  propertySlug?: string;
  developerSlug?: string;
  serviceSlug?: string;
  providerSlug?: string;
  materialSlug?: string;
  city?: string;
  budget?: string;
  preferredDate?: string;
  sourcePage?: string;
  consent?: boolean;
  metadata?: Record<string, string | number | boolean | null>;
};

export type DeliveryState = "sent" | "skipped" | "failed";

export type LeadDeliveryStatus = {
  adminEmail: DeliveryState;
  customerEmail: DeliveryState;
  adminSms: DeliveryState;
  customerSms: DeliveryState;
  errors: string[];
};

export type LeadRecord = LeadPayload & {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  delivery: LeadDeliveryStatus;
};
