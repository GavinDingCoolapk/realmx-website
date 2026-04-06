import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import '../App.css'

export default function AccessoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const accessories = [
    { name: '备用电池', desc: '4S 1500mAh LiPo，续航 15 分钟', price: '¥299', image: '电池' },
    { name: '备用桨叶套装', desc: '5寸三叶桨叶，8 片装', price: '¥99', image: '桨叶' },
    { name: '快速充电器', desc: '支持快充，45 分钟充满', price: '¥399', image: '充电器' },
    { name: '训练轮套装', desc: '室内训练必备，降低碰撞风险', price: '¥149', image: '训练轮' },
  ]
  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="accessories-page">
        <section className="page-hero">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>配件</h1><p>为你的 RealmX Racing 升级装备</p>
          </motion.div>
        </section>
        <section ref={ref} className="accessories-content">
          <div className="container">
            <div className="accessories-grid">
              {accessories.map((item, index) => (
                <motion.div key={index} className="accessory-card" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1 }}>
                  <div className="accessory-image"><div className="image-placeholder">{item.image}</div></div>
                  <div className="accessory-info"><h3>{item.name}</h3><p className="accessory-desc">{item.desc}</p><p className="accessory-price">{item.price}</p></div>
                </motion.div>
              ))}
            </div>
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
  const navItems = [{ id: '/product', label: 'RealmX Racing' }, { id: '/accessories', label: '配件' }, { id: '/support', label: '技术支持' }]
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
            <div className="footer-column"><h4>产品</h4><Link to="/product">RealmX Racing</Link><Link to="/accessories">配件</Link><Link to="/buy">购买</Link></div>
            <div className="footer-column"><h4>技术支持</h4><Link to="/support">快速入门</Link><Link to="/support">技术文档</Link><Link to="/support">联系我们</Link></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 RealmX. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
