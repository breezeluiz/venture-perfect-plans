import { createClient } from '@supabase/supabase-js';

// Fallback values for development - replace with your actual Supabase URL and key
const supabaseUrl = 'https://placeholder-url.supabase.co';
const supabaseAnonKey = 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ventures: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          location: string;
          total_cost: string;
          vibes: string[];
          activities: any[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          location: string;
          total_cost: string;
          vibes: string[];
          activities: any[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          location?: string;
          total_cost?: string;
          vibes?: string[];
          activities?: any[];
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          venture_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          booking_date: string;
          total_amount: number;
          payment_status: 'pending' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          venture_id: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          booking_date: string;
          total_amount: number;
          payment_status?: 'pending' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          venture_id?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          booking_date?: string;
          total_amount?: number;
          payment_status?: 'pending' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};