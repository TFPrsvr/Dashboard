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
      analytics: {
        Row: {
          id: string
          organization_id: string
          widget_id: string | null
          event_type: string
          data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          widget_id?: string | null
          event_type: string
          data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          widget_id?: string | null
          event_type?: string
          data?: Json
          created_at?: string
        }
      }
      causes: {
        Row: {
          id: string
          widget_id: string
          name: string
          description: string | null
          image_url: string | null
          target_amount: number | null
          current_amount: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          widget_id: string
          name: string
          description?: string | null
          image_url?: string | null
          target_amount?: number | null
          current_amount?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          widget_id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          target_amount?: number | null
          current_amount?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          widget_id: string
          cause_id: string | null
          donor_name: string | null
          donor_email: string | null
          amount: number
          message: string | null
          is_anonymous: boolean
          stripe_payment_intent_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          widget_id: string
          cause_id?: string | null
          donor_name?: string | null
          donor_email?: string | null
          amount: number
          message?: string | null
          is_anonymous?: boolean
          stripe_payment_intent_id?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          widget_id?: string
          cause_id?: string | null
          donor_name?: string | null
          donor_email?: string | null
          amount?: number
          message?: string | null
          is_anonymous?: boolean
          stripe_payment_intent_id?: string | null
          status?: string
          created_at?: string
        }
      }
      initiatives: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          image_url: string | null
          goal_amount: number | null
          current_amount: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          image_url?: string | null
          goal_amount?: number | null
          current_amount?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          goal_amount?: number | null
          current_amount?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          organization_id: string
          amount: number
          status: string
          stripe_invoice_id: string | null
          due_date: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          amount: number
          status?: string
          stripe_invoice_id?: string | null
          due_date?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          amount?: number
          status?: string
          stripe_invoice_id?: string | null
          due_date?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          display_name: string | null
          description: string | null
          website: string | null
          logo_url: string | null
          email: string | null
          phone: string | null
          address: string | null
          subscription_status: string
          stripe_customer_id: string | null
          stripe_account_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          display_name?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          subscription_status?: string
          stripe_customer_id?: string | null
          stripe_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_name?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          subscription_status?: string
          stripe_customer_id?: string | null
          stripe_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      role_assignments: {
        Row: {
          id: string
          user_id: string
          old_role: string | null
          new_role: string
          assigned_by: string
          assigned_at: string
          reason: string | null
        }
        Insert: {
          id?: string
          user_id: string
          old_role?: string | null
          new_role: string
          assigned_by: string
          assigned_at?: string
          reason?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          old_role?: string | null
          new_role?: string
          assigned_by?: string
          assigned_at?: string
          reason?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          organization_id: string | null
          role: "super_admin" | "admin" | "user"
          status: string | null
          invited_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          organization_id?: string | null
          role?: "super_admin" | "admin" | "user"
          status?: string | null
          invited_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          organization_id?: string | null
          role?: "super_admin" | "admin" | "user"
          status?: string | null
          invited_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      widgets: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          is_active: boolean
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          is_active?: boolean
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          is_active?: boolean
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      widget_themes: {
        Row: {
          id: string
          widget_id: string
          name: string
          colors: Json
          fonts: Json
          layout: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          widget_id: string
          name: string
          colors?: Json
          fonts?: Json
          layout?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          widget_id?: string
          name?: string
          colors?: Json
          fonts?: Json
          layout?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}