import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'
import '../App.css'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <FeatureSection title="0.8s" subtitle="0-100km/h 加速" description="极致的动态响应，瞬间释放澎湃动力" bgColor="#F5F5F7" />
      <FeatureSection title="120g" subtitle="超轻量化设计" description="碳纤维机身，轻若无物，稳如泰山" bgColor="#FFFFFF" />
      <FeatureSection title="15min" subtitle="持久续航" description="高效能源管理，让飞行更长更远" bgColor="#F5F5F7" />
      <FeatureSection title="4K" subtitle="高清视觉" description="每一个细节，都清晰可见" bgColor="#FFFFFF" />
      <NewsSection />
      <HomePurchaseSection />
      <Footer />
    </div>
  )
}

function Navigation({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: '/product', label: 'RealmX Racing' },
    { id: '/accessories', label: '配件' },
    { id: '/support', label: '技术支持' },
  ]

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">RealmX</span>
        </Link>
        <div className="nav-links">
          {navItems.map(item => (
            <Link key={item.id} to={item.id} className={location.pathname === item.id ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
          <Link to="/buy" className="nav-cta">购买</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {navItems.map(item => (
            <Link key={item.id} to={item.id} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <Link to="/buy" onClick={() => setMenuOpen(false)}>购买</Link>
        </motion.div>
      )}
    </nav>
  )
}

function HeroSection() {
  const slides = [
    { src: '/hero-desert.jpg', alt: 'RealmX 沙漠飞行' },
    { src: '/hero-flight.jpg', alt: 'RealmX 飞行场景' },
  ]
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="hero-section">
      <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

        <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', height: '100vh', overflow: 'hidden', background: '#000' }}>
          {slides.map((slide, i) => (
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: i === current ? 'auto' : 'none' }}
            />
          ))}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>RealmX</motion.h1>
            <motion.p className="hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>BEYOND LIMITS</motion.p>
          </div>
          <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1D1D1F', zIndex: 10 }}><ChevronLeft size={20} /></button>
          <button onClick={() => goTo((current + 1) % slides.length)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1D1D1F', zIndex: 10 }}><ChevronRight size={20} /></button>
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: current === i ? 24 : 8, height: 8, borderRadius: 4, border: 'none', background: current === i ? '#0071E3' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>

        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Link to="/buy" className="btn-primary">立即购买</Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function FeatureSection({ title, subtitle, description, bgColor }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section ref={ref} className="feature-section" style={{ backgroundColor: bgColor }}>
      <motion.div className="feature-content" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <h2 className="feature-title">{title}</h2>
        <p className="feature-subtitle">{subtitle}</p>
        <p className="feature-description">{description}</p>
        <div className="feature-image"><div className="image-placeholder">产品图占位</div></div>
      </motion.div>
    </section>
  )
}

function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const news = [
    { date: '2026.03.06', title: 'RealmX Racing Edition 正式发布', summary: '全新一代竞速无人机，性能全面提升' },
    { date: '2026.02.15', title: 'RoboCup 2026 备战启动', summary: 'RealmX 团队积极备战新赛季' },
    { date: '2026.01.20', title: 'RealmX 与多所高校达成合作', summary: '共同推进无人机科研与教育' },
  ]
  return (
    <section ref={ref} className="news-section">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>新闻动态</motion.h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <motion.div key={index} className="news-card" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1 }}>
              <div className="news-date">{item.date}</div>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-summary">{item.summary}</p>
              <a href="#" className="news-link">阅读更多 <ChevronRight size={14} /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePurchaseSection() {
  return (
    <section className="home-purchase-section">
      <div className="purchase-content">
        <h2 className="purchase-title">准备好了吗？</h2>
        <p className="purchase-subtitle">RealmX Racing Edition</p>
        <p className="purchase-price">¥12,999</p>
        <Link to="/buy" className="btn-primary">立即购买</Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">RealmX</span>
            <p className="footer-tagline">BEYOND LIMITS</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>产品</h4>
              <Link to="/product">RealmX Racing</Link>
              <Link to="/accessories">配件</Link>
              <Link to="/buy">购买</Link>
            </div>
            <div className="footer-column">
              <h4>技术支持</h4>
              <Link to="/support">快速入门</Link>
              <Link to="/support">技术文档</Link>
              <Link to="/support">联系我们</Link>
            </div>
            <div className="footer-column">
              <h4>关于</h4>
              <Link to="/login">管理后台</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 RealmX. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
