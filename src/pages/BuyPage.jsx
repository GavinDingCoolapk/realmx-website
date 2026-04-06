import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import '../App.css'

export default function BuyPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const price = 12999
  const total = price * quantity
  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="buy-page">
        <section className="buy-hero"><h1 className="buy-title">购买 RealmX Racing Edition</h1></section>
        <section className="buy-content">
          <div className="container">
            <div className="buy-layout">
              <div className="buy-product">
                <div className="buy-product-image"><img src="/drone-render.png" alt="RealmX Racing Edition" /></div>
                <div className="buy-product-info"><h2>RealmX Racing Edition</h2><p className="buy-product-tagline">为速度而生</p></div>
              </div>
              <div className="buy-order">
                <h3>订单详情</h3>
                <div className="order-row"><span>单价</span><span>¥{price.toLocaleString()}</span></div>
                <div className="order-row"><span>数量</span><div className="quantity-selector"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div></div>
                <div className="order-divider"></div>
                <div className="order-total"><span>总计</span><span className="total-price">¥{total.toLocaleString()}</span></div>
                <button className="btn-primary btn-large btn-full">立即购买</button>
                <p className="order-note">* 目前仅支持联系客服购买，我们会尽快与您联系</p>
                <div className="order-contact"><h4>联系方式</h4><p>📧 contact@realmx.tech</p><p>📱 微信: RealmX</p></div>
              </div>
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
