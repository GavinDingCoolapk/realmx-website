import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Menu, X, ChevronDown, Download, ExternalLink, Mail, Github, Twitter } from 'lucide-react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <div className="noise-overlay"></div>
      
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <StatsSection />
      <TechSpecsSection />
      <TeamSection />
      <GallerySection />
      <DocsSection />
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
          <RealmXLogo />
          <span className="logo-text">RealmX</span>
        </a>

        <div className="nav-links">
          <a href="#drone">DRONE</a>
          <a href="#tech">TECH</a>
          <a href="#team">TEAM</a>
          <a href="#docs">DOCS</a>
          <a href="#buy" className="nav-cta">BUY NOW</a>
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
          <a href="#drone" onClick={() => setMenuOpen(false)}>DRONE</a>
          <a href="#tech" onClick={() => setMenuOpen(false)}>TECH</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>TEAM</a>
          <a href="#docs" onClick={() => setMenuOpen(false)}>DOCS</a>
          <a href="#buy" onClick={() => setMenuOpen(false)}>BUY NOW</a>
        </motion.div>
      )}
    </nav>
  )
}

function RealmXLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="realmx-logo-svg">
      <defs>
        <linearGradient id="realmxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      {/* 外框 - 六边形代表 "Realm" 领域 */}
      <polygon 
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" 
        fill="none" 
        stroke="url(#realmxGrad)" 
        strokeWidth="2.5"
        className="logo-hex"
      />
      {/* 内部 X 形状 */}
      <path 
        d="M30 25 L70 75 M70 25 L30 75" 
        fill="none" 
        stroke="url(#realmxGrad)" 
        strokeWidth="3"
        strokeLinecap="round"
        className="logo-x"
      />
      {/* 中心点 */}
      <circle cx="50" cy="50" r="5" fill="url(#realmxGrad)" className="logo-center" />
    </svg>
  )
}

/* ==================== HERO SECTION ==================== */
function HeroSection() {
  return (
    <section id="drone" className="hero-section grid-bg">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
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
            <span className="letter">R</span>
            <span className="letter">E</span>
            <span className="letter">A</span>
            <span className="letter">L</span>
            <span className="letter">M</span>
            <span className="letter letter-x">X</span>
          </motion.h1>
          
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            BEYOND LIMITS
          </motion.p>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            RoboCup 竞赛级无人机 · 宇界 · 极速精准致胜
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <a href="#buy" className="btn-primary">立即购买</a>
            <a href="#tech" className="btn-secondary">查看规格</a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="drone-image-container">
            <div className="drone-image-placeholder">
              <img 
                src="/drone-render.png" 
                alt="RealmX Drone" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="text-align:center;color:var(--muted);font-size:1.25rem;">无人机效果图<br/><span style="font-size:0.875rem;opacity:0.6;">drone-render.png</span></div>';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <ChevronDown size={32} className="bounce" />
      </motion.div>
    </section>
  )
}

/* ==================== STATS SECTION ==================== */
function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { value: 0.8, unit: 's', label: '0-100km/h 加速' },
    { value: 120, unit: 'g', label: '整机重量' },
    { value: 15, unit: 'min', label: '续航时间' },
    { value: 4, unit: 'K', label: '摄像头分辨率' },
  ]

  return (
    <section ref={ref} className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-value">
                <CountUp end={stat.value} isInView={isInView} />
                <span className="stat-unit">{stat.unit}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start * 10) / 10)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, isInView])

  return <span>{count}</span>
}

/* ==================== TECH SPECS SECTION ==================== */
function TechSpecsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const specs = [
    {
      category: 'DIMENSIONS',
      items: [
        { label: '翼展', value: '25cm' },
        { label: '长度', value: '30cm' },
        { label: '高度', value: '8cm' },
      ]
    },
    {
      category: 'PERFORMANCE',
      items: [
        { label: '极速', value: '130 km/h' },
        { label: '加速 0-100', value: '0.8s' },
        { label: '最大过载', value: '8G' },
      ]
    },
    {
      category: 'PROPULSION',
      items: [
        { label: '电机', value: '4× 2300KV' },
        { label: '电池', value: '4S 1500mAh' },
        { label: '桨叶', value: '5寸三叶' },
      ]
    },
    {
      category: 'FLIGHT TIME',
      items: [
        { label: '悬停', value: '18 min' },
        { label: '竞速', value: '12 min' },
        { label: '充电', value: '45 min' },
      ]
    },
  ]

  return (
    <section id="tech" ref={ref} className="tech-section section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          TECHNICAL SPECIFICATIONS
        </motion.h2>

        <div className="specs-grid">
          {specs.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex}
              className="spec-group card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="spec-category">{group.category}</h3>
              <div className="spec-items">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="spec-item">
                    <span className="spec-label">{item.label}</span>
                    <span className="spec-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="spec-downloads"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a href="#" className="btn-secondary">
            <Download size={18} />
            下载完整规格 PDF
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== TEAM SECTION ==================== */
function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const team = [
    {
      name: '张逸飞',
      role: '机械设计',
      desc: '负责无人机结构设计与优化，3年无人机研发经验',
      avatar: 'ZYF'
    },
    {
      name: '李明轩',
      role: '飞控算法',
      desc: '负责飞行控制系统开发，RoboCup 2025 冠军队成员',
      avatar: 'LMX'
    },
    {
      name: '王子涵',
      role: '视觉系统',
      desc: '负责计算机视觉与目标识别，清华电子系研究生',
      avatar: 'WZH'
    },
  ]

  return (
    <section id="team" ref={ref} className="team-section section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          THE TEAM
        </motion.h2>

        <motion.p
          className="team-subtitle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Tsinghua Low-Altitude Economy Association · 清华学生低空经济协会
        </motion.p>

        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
            >
              <div className="member-avatar">
                <span>{member.avatar}</span>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <div className="member-role">{member.role}</div>
              <p className="member-desc">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== GALLERY SECTION ==================== */
function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images = [
    { title: '比赛实拍', desc: 'RoboCup 2025 决赛现场' },
    { title: '测试场景', desc: '清华飞行测试场' },
    { title: '渲染图', desc: 'RealmX 设计稿' },
    { title: '拆解图', desc: '内部结构展示' },
  ]

  return (
    <section ref={ref} className="gallery-section section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          GALLERY
        </motion.h2>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="gallery-placeholder">
                <span>{img.title}</span>
              </div>
              <div className="gallery-info">
                <h4>{img.title}</h4>
                <p>{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== DOCS SECTION ==================== */
function DocsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const docs = [
    { name: '飞控系统配置指南', version: 'v2.1', type: 'PDF', size: '2.4 MB' },
    { name: '机械组装说明书', version: 'v1.8', type: 'PDF', size: '5.1 MB' },
    { name: '视觉识别算法文档', version: 'v1.3', type: 'PDF', size: '1.8 MB' },
    { name: '比赛策略分析', version: 'v1.0', type: 'PDF', size: '3.2 MB' },
    { name: 'API 接口文档', version: 'v3.2', type: 'Online', size: null },
  ]

  return (
    <section id="docs" ref={ref} className="docs-section section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          DOCUMENTATION
        </motion.h2>

        <div className="docs-list">
          {docs.map((doc, index) => (
            <motion.div 
              key={index}
              className="doc-item card"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="doc-icon">
                {doc.type === 'PDF' ? '📄' : '🌐'}
              </div>
              <div className="doc-info">
                <h4>{doc.name} <span className="doc-version">{doc.version}</span></h4>
                <p>{doc.type}{doc.size && ` · ${doc.size}`}</p>
              </div>
              <a href="#" className="doc-link">
                {doc.type === 'PDF' ? <Download size={20} /> : <ExternalLink size={20} />}
              </a>
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
  const isInView = useInView(ref, { once: true })

  return (
    <section id="buy" ref={ref} className="purchase-section section">
      <div className="container">
        <motion.div 
          className="purchase-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
        >
          <div className="purchase-header">
            <RealmXLogo size={48} />
            <h2>GET YOUR RealmX</h2>
          </div>

          <div className="purchase-product">
            <div className="product-visual">
              <div className="drone-image-container" style={{ width: '280px', height: '280px' }}>
                <div className="drone-image-placeholder">
                  <img 
                    src="/drone-render.png" 
                    alt="RealmX Drone" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="text-align:center;color:var(--muted);font-size:1rem;padding:2rem;">RealmX<br/>无人机效果图</div>';
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="product-info">
              <h3>RealmX RACING EDITION</h3>
              <p className="product-desc">RoboCup 竞赛级无人机 · 宇界 · 专为速度与精准打造</p>
              
              <ul className="product-features">
                <li>✓ 竞赛级配置，开箱即飞</li>
                <li>✓ 完整技术支持与文档</li>
                <li>✓ 比赛策略指导</li>
                <li>✓ 终身固件升级</li>
              </ul>

              <div className="product-price">
                <span className="price">¥12,999</span>
                <span className="price-note">含税 · 包邮</span>
              </div>

              <div className="purchase-actions">
                <a href="https://example.com/buy-realmx" className="btn-primary pulse-btn">
                  立即购买
                </a>
                <a href="#contact" className="btn-secondary">
                  联系咨询
                </a>
              </div>
            </div>
          </div>

          <div className="purchase-contact">
            <div className="contact-item">
              <Mail size={20} />
              <span>contact@realmx.tech</span>
            </div>
            <div className="contact-item">
              <span>📱</span>
              <span>WeChat: RealmX</span>
            </div>
          </div>
        </motion.div>
      </div>
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
            <RealmXLogo />
            <span className="logo-text">RealmX</span>
          </div>
          
          <p className="footer-text">
            © 2026 Tsinghua Low-Altitude Economy Association
          </p>
          <p className="footer-text">
            Built for RoboCup · Powered by Passion
          </p>

          <div className="footer-links">
            <a href="#"><Github size={20} /></a>
            <a href="#">B站</a>
            <a href="#">WeChat</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App
