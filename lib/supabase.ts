import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client - works on both client and server (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client - only call this on server side where service role key is available
export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}


// Type definitions
export type Championship = {
  id: string
  slug: string
  title: string
  description: string
  long_description?: string
  date: string
  end_date?: string
  location: string
  participants: number
  status: 'upcoming' | 'ongoing' | 'completed'
  year: number
  image_url?: string
  images?: string[]
  results: { position: number; player: string; points: number }[]
  created_at: string
  updated_at: string
}

export type News = {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  date: string
  category: string
  image_url?: string
  images?: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export type SocialResponsibility = {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  date: string
  category: string
  image_url?: string
  images?: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export type GalleryItem = {
  id: string
  title: string
  description?: string
  category: 'campeonatos' | 'eventos' | 'comunidade' | 'treinos'
  image_url?: string
  type: 'photo' | 'video'
  created_at: string
}

export type Player = {
  id: string
  name: string
  club?: string
  rank: number
  points: number
  wins: number
  losses: number
  matches: number
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  read: boolean
  created_at: string
}
