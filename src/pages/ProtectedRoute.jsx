import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setChecking(false); return }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setIsAdmin(profile?.role === 'admin')
      setChecking(false)
    }
    check()
  }, [])

  if (checking) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载中...</div>
  if (!isAdmin) return <Navigate to="/login" replace />
  return <Outlet />
}
