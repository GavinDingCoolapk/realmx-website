import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bphilcufwkfewpfnckqi.supabase.co'
const supabaseAnonKey = 'ANON_KEY_PLACEHOLDER'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
