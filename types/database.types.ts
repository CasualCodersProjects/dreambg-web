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
      customers: {
        Row: {
          email: string
          expire_date: string
          id: number
          last_paid: string
          stripe_id: string
          subscribed_on: string | null
          subscription: string
          subscription_id: string
        }
        Insert: {
          email: string
          expire_date: string
          id?: number
          last_paid?: string
          stripe_id: string
          subscribed_on?: string | null
          subscription?: string
          subscription_id: string
        }
        Update: {
          email?: string
          expire_date?: string
          id?: number
          last_paid?: string
          stripe_id?: string
          subscribed_on?: string | null
          subscription?: string
          subscription_id?: string
        }
      }
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
      likes: {
        Row: {
          created_at: string
          id: number
          image: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
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
      user_saved_images: {
        Row: {
          created_at: string
          id: number
          image_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          image_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      likes_count: {
        Row: {
          image: string | null
          likes_count: number | null
        }
      }
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
      saved_image_links: {
        Row: {
          link: string | null
          user_id: string | null
          uuid: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
