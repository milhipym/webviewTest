// Minimal Database typing compatible with @supabase/postgrest-js v2.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      households: {
        Row: {
          id: string;
          share_code_hash: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          share_code_hash: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          share_code_hash?: string;
          display_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      babies: {
        Row: {
          id: string;
          household_id: string;
          name: string;
          birthdate: string;
          gender: "M" | "F" | "U";
          photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          household_id: string;
          name: string;
          birthdate: string;
          gender?: "M" | "F" | "U";
          photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          household_id?: string;
          name?: string;
          birthdate?: string;
          gender?: "M" | "F" | "U";
          photo_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      records: {
        Row: {
          id: string;
          baby_id: string;
          household_id: string;
          type: string;
          started_at: string;
          ended_at: string | null;
          data: Json;
          note: string | null;
          created_by_device: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          baby_id: string;
          household_id: string;
          type: string;
          started_at: string;
          ended_at?: string | null;
          data?: Json;
          note?: string | null;
          created_by_device?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          baby_id?: string;
          household_id?: string;
          type?: string;
          started_at?: string;
          ended_at?: string | null;
          data?: Json;
          note?: string | null;
          created_by_device?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      photos: {
        Row: {
          id: string;
          baby_id: string;
          household_id: string;
          taken_at: string;
          storage_path: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          baby_id: string;
          household_id: string;
          taken_at?: string;
          storage_path: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          baby_id?: string;
          household_id?: string;
          taken_at?: string;
          storage_path?: string;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      growth_measurements: {
        Row: {
          id: string;
          baby_id: string;
          household_id: string;
          measured_at: string;
          height_cm: number | null;
          weight_kg: number | null;
          head_cm: number | null;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          baby_id: string;
          household_id: string;
          measured_at: string;
          height_cm?: number | null;
          weight_kg?: number | null;
          head_cm?: number | null;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          baby_id?: string;
          household_id?: string;
          measured_at?: string;
          height_cm?: number | null;
          weight_kg?: number | null;
          head_cm?: number | null;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      verify_share_code: {
        Args: { p_code: string };
        Returns: string;
      };
      create_household: {
        Args: { p_code: string; p_name: string };
        Returns: string;
      };
    };
  };
}
