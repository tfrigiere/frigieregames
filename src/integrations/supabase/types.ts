export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_gate_attempts: {
        Row: {
          attempts: number
          key: string
          reset_at: string
        }
        Insert: {
          attempts?: number
          key: string
          reset_at?: string
        }
        Update: {
          attempts?: number
          key?: string
          reset_at?: string
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          banner: string
          collaborators: Json
          content: Json
          created_at: string
          id: string
          images: Json
          projects: string[]
          publish_at: string
          title: string
        }
        Insert: {
          banner?: string
          collaborators?: Json
          content?: Json
          created_at?: string
          id?: string
          images?: Json
          projects?: string[]
          publish_at?: string
          title: string
        }
        Update: {
          banner?: string
          collaborators?: Json
          content?: Json
          created_at?: string
          id?: string
          images?: Json
          projects?: string[]
          publish_at?: string
          title?: string
        }
        Relationships: []
      }
      blog_collaborators: {
        Row: {
          avatar: string
          id: string
          label: string
          name: string
        }
        Insert: {
          avatar?: string
          id?: string
          label: string
          name: string
        }
        Update: {
          avatar?: string
          id?: string
          label?: string
          name?: string
        }
        Relationships: []
      }
      blog_project_tags: {
        Row: {
          color_end: string
          color_start: string
          gradient: boolean
          project_id: string
        }
        Insert: {
          color_end: string
          color_start: string
          gradient?: boolean
          project_id: string
        }
        Update: {
          color_end?: string
          color_start?: string
          gradient?: boolean
          project_id?: string
        }
        Relationships: []
      }
      project_comments: {
        Row: {
          author_name: string
          created_at: string
          id: string
          message: string
          project_id: string
        }
        Insert: {
          author_name?: string
          created_at?: string
          id?: string
          message: string
          project_id: string
        }
        Update: {
          author_name?: string
          created_at?: string
          id?: string
          message?: string
          project_id?: string
        }
        Relationships: []
      }
      project_devices: {
        Row: {
          created_at: string
          device_id: string
          project_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          project_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          project_id?: string
        }
        Relationships: []
      }
      project_stats: {
        Row: {
          clicks: number
          players: number
          project_id: string
          updated_at: string
        }
        Insert: {
          clicks?: number
          players?: number
          project_id: string
          updated_at?: string
        }
        Update: {
          clicks?: number
          players?: number
          project_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_admin_attempt: { Args: { _key: string }; Returns: boolean }
      record_play: {
        Args: { _device_id: string; _project_id: string }
        Returns: {
          clicks: number
          players: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
