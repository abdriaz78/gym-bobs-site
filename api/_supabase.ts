// Shared Supabase client for the Vercel functions. Files starting with "_" are
// not turned into endpoints.
//
// Uses the service-role key, which bypasses Row Level Security — so it must
// stay server-only. Never give it a VITE_ prefix.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

// Returns a Supabase client, or null if SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
// aren't set (so the site keeps working before the database is configured).
export function getSupabase(): SupabaseClient | null {
  if (cached) return cached

  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    console.error('[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set')
    return null
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}
