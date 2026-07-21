export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type UserRole = "guest" | "customer" | "buyer" | "property_owner" | "developer" | "contractor" | "architect" | "interior_designer" | "service_provider" | "material_supplier" | "administrator" | "admin" | "super_admin";

export type Database = {
  public: {
    Tables: {
      profiles: { Row: { id: string; full_name: string; phone: string | null; role: UserRole; is_verified: boolean; created_at: string; updated_at: string }; Insert: { id: string; full_name: string; phone?: string | null; role?: UserRole }; Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]> };
      properties: { Row: { id: string; title: string; slug: string; property_type: string; listing_purpose: string; price: number; city: string | null; publishing_status: string; verified: boolean; active: boolean; created_at: string; updated_at: string }; Insert: { title: string; slug: string; property_type: string; category: string; developer_id: string; project_name: string; property_status: string; price: number; area: number; description: string }; Update: Record<string, unknown> };
      leads: { Row: { id: string; buyer_name: string; phone: string; lead_type: string; source: string; status: string; metadata: Json; created_at: string }; Insert: { buyer_name: string; phone: string; lead_type?: string; source: string; email?: string | null; metadata?: Json }; Update: { status?: string; notes?: string | null; follow_up_at?: string | null } };
      services: { Row: { id: string; family: string; title: string; slug: string; starting_price: number | null; is_featured: boolean; is_active: boolean }; Insert: { family: string; title: string; slug: string; summary?: string; starting_price?: number }; Update: Record<string, unknown> };
      service_providers: { Row: { id: string; name: string; slug: string; provider_type: string; city: string | null; is_verified: boolean; is_active: boolean }; Insert: { name: string; slug: string; provider_type: string }; Update: Record<string, unknown> };
      service_bookings: { Row: { id: string; name: string; phone: string; location: string; status: string; created_at: string }; Insert: { name: string; phone: string; location: string; service_id?: string; provider_id?: string }; Update: { status?: string } };
      current_works: { Row: { id: string; title: string; slug: string; category: string; status: string; progress: number; is_active: boolean }; Insert: { title: string; slug: string; category: string; location: string }; Update: Record<string, unknown> };
      materials: { Row: { id: string; name: string; slug: string; unit: string; price: number | null; is_active: boolean }; Insert: { name: string; slug: string; unit: string }; Update: Record<string, unknown> };
      favorites: { Row: { profile_id: string; property_id: string; created_at: string }; Insert: { profile_id: string; property_id: string }; Update: never };
      property_comparisons: { Row: { id: string; profile_id: string; property_ids: string[]; created_at: string; updated_at: string }; Insert: { profile_id: string; property_ids: string[] }; Update: { property_ids?: string[] } };
    };
    Views: Record<string, never>;
    Functions: { is_admin: { Args: Record<string, never>; Returns: boolean } };
    Enums: { user_role: UserRole };
  };
};
