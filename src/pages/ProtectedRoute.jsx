import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

let cached = null

export default function ProtectedRoute() {
  const [status, setStatus] = useState(cached || 'checking')

  useEffect(() => {
    if (cached) return
    const check = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { cached = 'unauthorized'; setStatus('unauthorized'); return }
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        cached = profile?.role === 'admin' ? 'authorized' : 'unauthorized'
        setStatus(cached)
      } catch {
        cached = 'unauthorized'; setStatus('unauthorized')
      }
    }
    check()
  }, [])

  if (status === 'authorized') return <Outlet />
  if (status === 'unauthorized') return <Navigate to="/login" replace />
  return null
}
