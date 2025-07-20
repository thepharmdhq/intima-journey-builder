export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      assessment_questions: {
        Row: {
          assessment_id: string | null
          created_at: string
          domain: string | null
          id: string
          options: Json | null
          question_number: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          updated_at: string
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string
          domain?: string | null
          id?: string
          options?: Json | null
          question_number: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          updated_at?: string
        }
        Update: {
          assessment_id?: string | null
          created_at?: string
          domain?: string | null
          id?: string
          options?: Json | null
          question_number?: number
          question_text?: string
          question_type?: Database["public"]["Enums"]["question_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          areas_for_growth: string[] | null
          assessment_id: string | null
          completed_at: string
          domain_scores: Json
          executive_summary: string | null
          id: string
          next_action_days: number | null
          overall_score: number
          recommendations: string[] | null
          session_id: string
          top_strengths: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          areas_for_growth?: string[] | null
          assessment_id?: string | null
          completed_at?: string
          domain_scores: Json
          executive_summary?: string | null
          id?: string
          next_action_days?: number | null
          overall_score: number
          recommendations?: string[] | null
          session_id: string
          top_strengths?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          areas_for_growth?: string[] | null
          assessment_id?: string | null
          completed_at?: string
          domain_scores?: Json
          executive_summary?: string | null
          id?: string
          next_action_days?: number | null
          overall_score?: number
          recommendations?: string[] | null
          session_id?: string
          top_strengths?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      assessments: {
        Row: {
          category: Database["public"]["Enums"]["assessment_category"]
          created_at: string
          description: string
          estimated_time: number
          id: string
          is_recommended: boolean | null
          name: string
          sex_specific: Database["public"]["Enums"]["sex_specific"] | null
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["assessment_category"]
          created_at?: string
          description: string
          estimated_time: number
          id: string
          is_recommended?: boolean | null
          name: string
          sex_specific?: Database["public"]["Enums"]["sex_specific"] | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["assessment_category"]
          created_at?: string
          description?: string
          estimated_time?: number
          id?: string
          is_recommended?: boolean | null
          name?: string
          sex_specific?: Database["public"]["Enums"]["sex_specific"] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          biological_sex: string | null
          created_at: string
          first_name: string | null
          gender_identity: string | null
          last_name: string | null
          relationship_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          biological_sex?: string | null
          created_at?: string
          first_name?: string | null
          gender_identity?: string | null
          last_name?: string | null
          relationship_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          biological_sex?: string | null
          created_at?: string
          first_name?: string | null
          gender_identity?: string | null
          last_name?: string | null
          relationship_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_assessment_responses: {
        Row: {
          assessment_id: string | null
          completed_at: string
          id: string
          question_id: string | null
          response_value: string
          session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assessment_id?: string | null
          completed_at?: string
          id?: string
          question_id?: string | null
          response_value: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assessment_id?: string | null
          completed_at?: string
          id?: string
          question_id?: string | null
          response_value?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_assessment_responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_assessment_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_assessment_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_assessment_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          session_type: string
          started_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          session_type: string
          started_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          session_type?: string
          started_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      assessment_category:
        | "Relationship Health"
        | "Physical Intimacy"
        | "Self-Assessment"
        | "Emotional Connection"
      question_type: "scale" | "multiple_choice" | "yes_no"
      sex_specific: "male" | "female"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_category: [
        "Relationship Health",
        "Physical Intimacy",
        "Self-Assessment",
        "Emotional Connection",
      ],
      question_type: ["scale", "multiple_choice", "yes_no"],
      sex_specific: ["male", "female"],
    },
  },
} as const
