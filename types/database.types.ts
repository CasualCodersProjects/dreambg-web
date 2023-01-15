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
          image: string
          link: string
          width: number
        }
        Insert: {
          height: number
          id?: number
          image: string
          link: string
          width: number
        }
        Update: {
          height?: number
          id?: number
          image?: string
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
      images: {
        Row: {
          aspect_ratio: string
          created_at: string
          id: number
          prompt: number
          uuid: string
        }
        Insert: {
          aspect_ratio: string
          created_at: string
          id?: number
          prompt: number
          uuid: string
        }
        Update: {
          aspect_ratio?: string
          created_at?: string
          id?: number
          prompt?: number
          uuid?: string
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
      prompt_tags: {
        Row: {
          id: number
          prompt: number
          tag: number
        }
        Insert: {
          id?: number
          prompt: number
          tag: number
        }
        Update: {
          id?: number
          prompt?: number
          tag?: number
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
      random_tags: {
        Row: {
          id: number | null
          tag: string | null
        }
        Insert: {
          id?: number | null
          tag?: string | null
        }
        Update: {
          id?: number | null
          tag?: string | null
        }
      }
      single_images: {
        Row: {
          id: number | null
          link: string | null
          prompt: string | null
          prompt_id: number | null
          uuid: string | null
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
