import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      if (!cancelled) { setChecking(false) }
    }, 3000)

    const check = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (cancelled) return
        if (!user) { setChecking(false); return }

        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (cancelled) return
        setIsAdmin(profile?.role === 'admin')
      } catch {
        // ignore
      }
      if (!cancelled) setChecking(false)
    }
    check()

    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  if (checking) return null
  if (!isAdmin) return <Navigate to="/login" replace />
  return <Outlet />
}
