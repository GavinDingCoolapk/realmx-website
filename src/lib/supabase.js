import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bphilcufwkfewpfnckqi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaGlsY3Vmd2tmZXdwZm5ja3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDYwNjksImV4cCI6MjA5MTIyMjA2OX0.uQykpIf9bixMrrOPhq2BRWvS1z4kvqQZOqamGKtCPDE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
