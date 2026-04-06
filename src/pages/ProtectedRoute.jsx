import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem('realmx_auth') === 'true'
  if (!isAuth) return <Navigate to="/login" replace />
  return <Outlet />
}
