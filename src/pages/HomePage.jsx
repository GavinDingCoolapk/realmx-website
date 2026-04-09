import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'
import { supabase } from './lib/supabase'
import '../App.css'

// Counter animation hook
function useCountUp(end, duration = 1.5, start = 0) {
  const [count, setCount] = useState(start)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView && !running) {
      setRunning(true)
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(start + (end - start) * eased))
        if (progress >= 1) clearInterval(timer)
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, running, end, duration, start])

  return [count, ref]
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <FeatureSection title="43.2km/h" subtitle="最高时速" description="12m/s 极速飞行，释放澎湃动力" bgColor="#F5F5F7" index={0} />
      <FeatureSection title="1030g" subtitle="轻量机身" description="碳纤维机架，PP轮架，PLA外壳，刚柔并济" bgColor="#FFFFFF" index={1} />
      <FeatureSection title="10min" subtitle="持久续航" description="6S 6000mAh 大容量电池，悬停飞行10分钟" bgColor="#F5F5F7" index={2} />
      <FeatureSection title="10km" subtitle="超远图传" description="无干扰环境下最远10km图传距离" bgColor="#FFFFFF" index={3} />
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
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`} style={{ transition: 'background 0.6s, backdrop-filter 0.6s, box-shadow 0.6s' }}>
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
          <Link to="/login" className="nav-login">登录</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
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
    { src: '/hero-1.png', alt: 'RealmX' },
    { src: '/hero-2.png', alt: 'RealmX' },
    { src: '/hero-3.png', alt: 'RealmX' },
  ]
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent(index)
  }, [])

  const titleChars = 'RealmX'.split('')
  const taglineChars = 'BEYOND LIMITS'.split('')

  return (
    <section className="hero-section">
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', height: '100vh', overflow: 'hidden', background: '#000' }}>
        {slides.map((slide, i) => (
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>RealmX</motion.h1>
          <motion.p className="hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 10px rgba(0,0,0,0.5)', letterSpacing: '0.15em' }}>BEYOND LIMITS</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} style={{ marginTop: '2rem', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => document.querySelector('.feature-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>了解更多</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
              <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.8)', transform: 'rotate(90deg)' }} />
            </motion.div>
          </motion.div>
        </div>
        <motion.button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.95)' }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1D1D1F', zIndex: 10, transition: 'background 0.2s' }}
        ><ChevronLeft size={20} /></motion.button>
        <motion.button
          onClick={() => goTo((current + 1) % slides.length)}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.95)' }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1D1D1F', zIndex: 10, transition: 'background 0.2s' }}
        ><ChevronRight size={20} /></motion.button>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{ width: current === i ? 24 : 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ height: 8, borderRadius: 4, border: 'none', background: current === i ? '#0071E3' : 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureSection({ title, subtitle, description, bgColor, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="feature-section" style={{ backgroundColor: bgColor }}>
      <motion.div
        className="feature-content"
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="feature-title">{title}</h2>
        <motion.p
          className="feature-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >{subtitle}</motion.p>
        <motion.p
          className="feature-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
        >{description}</motion.p>
        <motion.div
          className="feature-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        ><div className="image-placeholder">产品图占位</div></motion.div>
      </motion.div>
    </section>
  )
}

function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [news, setNews] = useState([])

  useEffect(() => {
    supabase.from('news').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(6).then(({ data }) => {
      setNews((data || []).map(n => ({
        date: new Date(n.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
        title: n.title,
        summary: n.summary || '',
      })))
    })
  }, [])
  return (
    <section ref={ref} className="news-section">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>新闻动态</motion.h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <motion.div
              key={index}
              className="news-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <section ref={ref} className="home-purchase-section">
      <div className="purchase-content">
        <motion.h2 className="purchase-title" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>准备好了吗？</motion.h2>
        <motion.p className="purchase-subtitle" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}>RealmX Racing Edition</motion.p>
        <motion.p className="purchase-price" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>¥12,999</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
          <Link to="/buy" className="btn-primary">立即购买</Link>
        </motion.div>
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
              <Link to="/login">登录</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 RealmX. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
