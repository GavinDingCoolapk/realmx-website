import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Package, ShoppingBag, LogOut, User } from 'lucide-react'
import { supabase } from '../lib/supabase'
import '../App.css'

export default function AccountPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      setUser(user)

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(prof)

      const { data: ords } = await supabase.from('orders').select('*')
        .eq('user_id', user.id).or(`user_id.is.null,and(user_id.eq.${user.id})`)
        .order('created_at', { ascending: false })
      setOrders(ords || [])
      setLoading(false)
    }
    init()
  }, [navigate])

  const handleLogout = async () => {
    setLogoutLoading(true)
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const statusMap = {
    pending: '待确认', processing: '处理中', shipped: '已发货', completed: '已完成', cancelled: '已取消',
  }

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="buy-page">
        <section className="buy-hero"><h1 className="buy-title">我的账号</h1></section>
        <section className="account-content">
          <div className="container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>加载中...</div>
            ) : (
              <div className="account-layout">
                <div className="account-sidebar">
                  <div className="account-avatar">
                    <User size={40} />
                  </div>
                  <h3>{profile?.username || '用户'}</h3>
                  <p className="account-email">{user?.email}</p>
                  <button className="account-logout-btn" onClick={handleLogout} disabled={logoutLoading}>
                    <LogOut size={16} />
                    {logoutLoading ? '退出中...' : '退出登录'}
                  </button>
                </div>

                <div className="account-main">
                  <div className="account-section">
                    <h3><ShoppingBag size={18} /> 我的订单</h3>
                    {orders.length === 0 ? (
                      <div className="account-empty">
                        <Package size={32} />
                        <p>暂无订单</p>
                        <Link to="/buy" className="btn-primary" style={{ color: '#fff' }}>去购买</Link>
                      </div>
                    ) : (
                      <div className="account-orders">
                        {orders.map(o => (
                          <div key={o.id} className="account-order-card">
                            <div className="account-order-header">
                              <span className="account-order-id">#{o.id}</span>
                              <span className={`status-badge ${(statusMap[o.status] || '').includes('已') ? 'success' : 'pending'}`}>
                                {statusMap[o.status] || o.status}
                              </span>
                            </div>
                            <div className="account-order-body">
                              <p>{(o.items || []).map(i => i.name).join(', ')}</p>
                              <p className="account-order-price">¥{Number(o.total_price).toLocaleString()}</p>
                            </div>
                            <div className="account-order-footer">
                              <span>{new Date(o.created_at).toLocaleDateString('zh-CN')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

function Navigation({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])
  const navItems = [{ id: '/', label: '首页' }, { id: '/product', label: 'RealmX Racing' }, { id: '/support', label: '技术支持' }]
  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo"><span className="logo-text">RealmX</span></Link>
        <div className="nav-links">{navItems.map(item => (<Link key={item.id} to={item.id} className={location.pathname === item.id ? 'active' : ''}>{item.label}</Link>))}<Link to="/buy" className="nav-cta">购买</Link></div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {menuOpen && (<motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>{navItems.map(item => (<Link key={item.id} to={item.id} onClick={() => setMenuOpen(false)}>{item.label}</Link>))}<Link to="/buy" onClick={() => setMenuOpen(false)}>购买</Link></motion.div>)}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand"><span className="logo-text">RealmX</span><p className="footer-tagline">BEYOND LIMITS</p></div>
          <div className="footer-links">
            <div className="footer-column"><h4>产品</h4><Link to="/product">RealmX Racing</Link><Link to="/buy">购买</Link></div>
            <div className="footer-column"><h4>技术支持</h4><Link to="/support">快速入门</Link><Link to="/support">联系我们</Link></div>
            <div className="footer-column"><h4>关于</h4><Link to="/login">登录</Link></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 RealmX. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
