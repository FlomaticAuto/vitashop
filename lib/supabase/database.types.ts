export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string;
          street: string;
          suburb: string | null;
          city: string;
          province: string;
          postal_code: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          label?: string;
          street: string;
          suburb?: string | null;
          city: string;
          province: string;
          postal_code: string;
          is_default?: boolean;
        };
        Update: {
          label?: string;
          street?: string;
          suburb?: string | null;
          city?: string;
          province?: string;
          postal_code?: string;
          is_default?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          brand: string;
          name: string;
          description: string | null;
          category: 'multivitamins' | 'calcium' | 'energy';
          price: number;
          original_price: number | null;
          image_url: string | null;
          barcode: string | null;
          badge: 'popular' | 'new' | 'sale' | null;
          badge_label: string | null;
          stock: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: OrderStatus;
          subtotal: number;
          delivery_fee: number;
          total: number;
          address_id: string | null;
          delivery_street: string | null;
          delivery_suburb: string | null;
          delivery_city: string | null;
          delivery_province: string | null;
          delivery_postal: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Pick<Database['public']['Tables']['orders']['Row'], 'status' | 'notes'>>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_brand: string;
          unit_price: number;
          qty: number;
          line_total: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'line_total' | 'created_at'>;
        Update: never;
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          qty: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
          qty?: number;
        };
        Update: { qty?: number };
      };
    };
  };
}
