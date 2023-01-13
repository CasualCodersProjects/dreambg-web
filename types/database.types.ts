export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      descriptions: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: number
        }
        Update: {
          description?: string
          id?: number
        }
      }
      image_links: {
        Row: {
          height: number
          id: number
          image: number
          link: string
          width: number
        }
        Insert: {
          height: number
          id?: number
          image: number
          link: string
          width: number
        }
        Update: {
          height?: number
          id?: number
          image?: number
          link?: string
          width?: number
        }
      }
      image_metadata: {
        Row: {
          id: number
          image: number
          likes: number
          views: number
        }
        Insert: {
          id?: number
          image: number
          likes: number
          views: number
        }
        Update: {
          id?: number
          image?: number
          likes?: number
          views?: number
        }
      }
      image_tags: {
        Row: {
          id: number
          image: number
          tag: number
        }
        Insert: {
          id?: number
          image: number
          tag: number
        }
        Update: {
          id?: number
          image?: number
          tag?: number
        }
      }
      images: {
        Row: {
          aspect_ratio: string
          id: number
          prompt: number
        }
        Insert: {
          aspect_ratio: string
          id?: number
          prompt: number
        }
        Update: {
          aspect_ratio?: string
          id?: number
          prompt?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      prompts: {
        Row: {
          cfg_scale: number
          created_at: string
          generated: number
          id: number
          prompt: string
          source: string
          steps: number
          tagged: number
        }
        Insert: {
          cfg_scale?: number
          created_at?: string
          generated?: number
          id?: number
          prompt: string
          source?: string
          steps?: number
          tagged?: number
        }
        Update: {
          cfg_scale?: number
          created_at?: string
          generated?: number
          id?: number
          prompt?: string
          source?: string
          steps?: number
          tagged?: number
        }
      }
      tags: {
        Row: {
          id: number
          negative: number
          tag: string
          visible: number
        }
        Insert: {
          id?: number
          negative: number
          tag: string
          visible: number
        }
        Update: {
          id?: number
          negative?: number
          tag?: string
          visible?: number
        }
      }
    }
    Views: {
      image_view: {
        Row: {
          height: number | null
          image_id: number | null
          link: string | null
          prompt: string | null
          width: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
