import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AccessoriesPage from './pages/AccessoriesPage'
import SupportPage from './pages/SupportPage'
import BuyPage from './pages/BuyPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import PageTransition from './pages/PageTransition'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminNews from './pages/admin/AdminNews'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
      <Route path="/product" element={<PageTransition><ProductPage /></PageTransition>} />
      <Route path="/accessories" element={<PageTransition><AccessoriesPage /></PageTransition>} />
      <Route path="/support" element={<PageTransition><SupportPage /></PageTransition>} />
      <Route path="/buy" element={<PageTransition><BuyPage /></PageTransition>} />
      <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
      <Route path="/account" element={<PageTransition><AccountPage /></PageTransition>} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="news" element={<AdminNews />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
