import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <FeatureSection 
        title="0.8s"
        subtitle="0-100km/h 加速"
        description="极致的动态响应，瞬间释放澎湃动力"
        bgColor="#F5F5F7"
      />
      <FeatureSection 
        title="120g"
        subtitle="超轻量化设计"
        description="碳纤维机身，轻若无物，稳如泰山"
        bgColor="#FFFFFF"
      />
      <FeatureSection 
        title="15min"
        subtitle="持久续航"
        description="高效能源管理，让飞行更长更远"
        bgColor="#F5F5F7"
      />
      <FeatureSection 
        title="4K"
        subtitle="高清视觉"
        description="每一个细节，都清晰可见"
        bgColor="#FFFFFF"
      />
      <TechSpecsSection />
      <GallerySection />
      <PurchaseSection />
      <Footer />
    </div>
  )
}

/* ==================== NAVIGATION ==================== */
function Navigation({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-text">RealmX</span>
        </a>

        <div className="nav-links">
          <a href="#specs">技术规格</a>
          <a href="#gallery">图库</a>
          <a href="#buy" className="nav-cta">立即购买</a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="#specs" onClick={() => setMenuOpen(false)}>技术规格</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>图库</a>
          <a href="#buy" onClick={() => setMenuOpen(false)}>立即购买</a>
        </motion.div>
      )}
    </nav>
  )
}

/* ==================== HERO SECTION ==================== */
function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          RealmX
        </motion.h1>
        
        <motion.p 
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          BEYOND LIMITS
        </motion.p>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img src="/drone-render.png" alt="RealmX Drone" />
        </motion.div>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#buy" className="btn-primary">立即购买</a>
          <a href="#specs" className="btn-secondary">
            了解更多 <ChevronRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ==================== FEATURE SECTION ==================== */
function FeatureSection({ title, subtitle, description, bgColor }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="feature-section" style={{ backgroundColor: bgColor }}>
      <motion.div 
        className="feature-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="feature-title">{title}</h2>
        <p className="feature-subtitle">{subtitle}</p>
        <p className="feature-description">{description}</p>
        <div className="feature-image">
          <div className="image-placeholder">产品图占位</div>
        </div>
      </motion.div>
    </section>
  )
}

/* ==================== TECH SPECS SECTION ==================== */
function TechSpecsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const specs = [
    { label: '翼展', value: '25cm' },
    { label: '长度', value: '30cm' },
    { label: '高度', value: '8cm' },
    { label: '重量', value: '120g' },
    { label: '极速', value: '130 km/h' },
    { label: '加速', value: '0.8s' },
    { label: '续航', value: '15 min' },
    { label: '摄像头', value: '4K' },
  ]

  return (
    <section id="specs" ref={ref} className="specs-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          技术规格
        </motion.h2>

        <motion.div 
          className="specs-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {specs.map((spec, index) => (
            <div key={index} className="spec-item">
              <span className="spec-label">{spec.label}</span>
              <span className="spec-value">{spec.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== GALLERY SECTION ==================== */
function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const images = [
    { title: '比赛实拍', desc: 'RoboCup 决赛现场' },
    { title: '产品特写', desc: '设计细节' },
    { title: '飞行测试', desc: '极限挑战' },
  ]

  return (
    <section id="gallery" ref={ref} className="gallery-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          图库
        </motion.h2>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="gallery-image">
                <div className="image-placeholder">{img.title}</div>
              </div>
              <p className="gallery-caption">{img.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== PURCHASE SECTION ==================== */
function PurchaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="buy" ref={ref} className="purchase-section">
      <motion.div 
        className="purchase-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="purchase-title">RealmX Racing Edition</h2>
        <p className="purchase-price">¥12,999</p>
        <a href="#" className="btn-primary btn-large">
          立即购买
        </a>
      </motion.div>
    </section>
  )
}

/* ==================== FOOTER ==================== */
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
              <a href="#">RealmX Racing</a>
              <a href="#">技术规格</a>
              <a href="#">配件</a>
            </div>
            <div className="footer-column">
              <h4>支持</h4>
              <a href="#">文档</a>
              <a href="#">联系我们</a>
              <a href="#">售后服务</a>
            </div>
            <div className="footer-column">
              <h4>关于</h4>
              <a href="#">品牌故事</a>
              <a href="#">新闻</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 RealmX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default App
