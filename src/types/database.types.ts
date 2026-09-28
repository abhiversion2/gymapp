export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          member_since: string;
          membership_plan: string;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          member_since?: string;
          membership_plan?: string;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          member_since?: string;
          membership_plan?: string;
          status?: string;
        };
      };
      memberships: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          profile_id: string;
          plan_name: string;
          status: string;
          start_date: string;
          valid_until: string;
          total_days: number;
          price_monthly: number;
          auto_renew: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          profile_id: string;
          plan_name: string;
          status?: string;
          start_date: string;
          valid_until: string;
          total_days: number;
          price_monthly?: number;
          auto_renew?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          profile_id?: string;
          plan_name?: string;
          status?: string;
          start_date?: string;
          valid_until?: string;
          total_days?: number;
          price_monthly?: number;
          auto_renew?: boolean;
        };
      };
      exercises: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          target_muscle: string;
          secondary_muscles: string[] | null;
          equipment: string;
          difficulty: string;
          description: string;
          instructions: string[];
          sample_image_url: string | null;
          calories_per_hour_estimate: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          target_muscle: string;
          secondary_muscles?: string[] | null;
          equipment: string;
          difficulty: string;
          description: string;
          instructions: string[];
          sample_image_url?: string | null;
          calories_per_hour_estimate?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          target_muscle?: string;
          secondary_muscles?: string[] | null;
          equipment?: string;
          difficulty?: string;
          description?: string;
          instructions?: string[];
          sample_image_url?: string | null;
          calories_per_hour_estimate?: number;
        };
      };
      workouts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          subtitle: string | null;
          description: string | null;
          category: string;
          target_muscles: string[];
          duration_minutes: number;
          difficulty: string;
          estimated_calories: number;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          subtitle?: string | null;
          description?: string | null;
          category: string;
          target_muscles: string[];
          duration_minutes: number;
          difficulty: string;
          estimated_calories: number;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          subtitle?: string | null;
          description?: string | null;
          category?: string;
          target_muscles?: string[];
          duration_minutes?: number;
          difficulty?: string;
          estimated_calories?: number;
          image_url?: string | null;
        };
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          sets: number;
          reps: number;
          target_weight_kg: number | null;
          rest_seconds: number | null;
        };
        Insert: {
          id?: string;
          workout_id: string;
          exercise_id: string;
          order_index?: number;
          sets: number;
          reps: number;
          target_weight_kg?: number | null;
          rest_seconds?: number | null;
        };
        Update: {
          id?: string;
          workout_id?: string;
          exercise_id?: string;
          order_index?: number;
          sets?: number;
          reps?: number;
          target_weight_kg?: number | null;
          rest_seconds?: number | null;
        };
      };
      workout_sessions: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          workout_id: string;
          duration_minutes: number;
          calories_burned: number;
          completed: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          workout_id: string;
          duration_minutes: number;
          calories_burned: number;
          completed?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          workout_id?: string;
          duration_minutes?: number;
          calories_burned?: number;
          completed?: boolean;
        };
      };
      workout_sets: {
        Row: {
          id: string;
          session_id: string;
          exercise_id: string;
          set_number: number;
          reps: number;
          weight_kg: number;
          completed: boolean;
        };
        Insert: {
          id?: string;
          session_id: string;
          exercise_id: string;
          set_number: number;
          reps: number;
          weight_kg: number;
          completed?: boolean;
        };
        Update: {
          id?: string;
          session_id?: string;
          exercise_id?: string;
          set_number?: number;
          reps?: number;
          weight_kg?: number;
          completed?: boolean;
        };
      };
      measurements: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          date: string;
          weight_kg: number;
          height_cm: number;
          body_fat_percentage: number;
          chest_cm: number;
          waist_cm: number;
          arms_cm: number;
          thigh_cm: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          date: string;
          weight_kg: number;
          height_cm: number;
          body_fat_percentage: number;
          chest_cm: number;
          waist_cm: number;
          arms_cm: number;
          thigh_cm: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          date?: string;
          weight_kg?: number;
          height_cm?: number;
          body_fat_percentage?: number;
          chest_cm?: number;
          waist_cm?: number;
          arms_cm?: number;
          thigh_cm?: number;
          notes?: string | null;
        };
      };
      announcements: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          category: string;
          is_important: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          category: string;
          is_important?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          category?: string;
          is_important?: boolean;
        };
      };
      personal_records: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          exercise_name: string;
          muscle: string;
          record_value: number;
          unit: string;
          previous_record: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          exercise_name: string;
          muscle: string;
          record_value: number;
          unit?: string;
          previous_record?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          exercise_name?: string;
          muscle?: string;
          record_value?: number;
          unit?: string;
          previous_record?: number | null;
        };
      };
      gym_settings: {
        Row: {
          id: string;
          profile_id: string;
          appearance: string;
          workout_reminders: boolean;
          gym_announcements: boolean;
          units: string;
          language: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          appearance?: string;
          workout_reminders?: boolean;
          gym_announcements?: boolean;
          units?: string;
          language?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          appearance?: string;
          workout_reminders?: boolean;
          gym_announcements?: boolean;
          units?: string;
          language?: string;
        };
      };
    };
  };
}
