import { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { LayoutDashboard, Package, ShoppingBag, Newspaper, LogOut, ArrowLeft } from 'lucide-react'
import '../../App.css'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <Link to="/" className="logo"><span className="logo-text">RealmX</span></Link>
          <span className="admin-badge">Admin</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} /><span>仪表盘</span>
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Package size={20} /><span>产品管理</span>
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={20} /><span>订单管理</span>
          </NavLink>
          <NavLink to="/admin/news" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Newspaper size={20} /><span>新闻管理</span>
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-back-link"><ArrowLeft size={16} /><span>返回官网</span></Link>
        </div>
      </div>
      <div className="admin-main">
        <header className="admin-header">
          <h1 className="admin-page-title">管理后台</h1>
          <button className="admin-logout" onClick={handleLogout}><LogOut size={16} /><span>退出登录</span></button>
        </header>
        <div className="admin-content"><Outlet /></div>
      </div>
    </div>
  )
}
