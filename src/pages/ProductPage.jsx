import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ChevronRight, Download, FileText } from 'lucide-react'
import '../App.css'

export default function ProductPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="product-page">
        <section className="product-hero">
          <motion.div className="product-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="product-hero-title">RealmX Racing Edition</h1>
            <p className="product-hero-tagline">为速度而生</p>
            <p className="product-hero-price">¥12,999</p>
          </motion.div>
          <motion.div className="product-hero-image" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <img src="/drone-render.png" alt="RealmX Racing Edition" />
          </motion.div>
        </section>
        <ProductFeature title="极致速度" subtitle="0.8s 从静止到 100km/h" description="采用高效能电机和优化的空气动力学设计，RealmX Racing Edition 能够在 0.8 秒内从静止加速到 100km/h。" specs={['极速: 130 km/h', '加速: 0-100km/h 0.8s', '最大过载: 8G']} />
        <ProductFeature title="超轻量化" subtitle="仅重 120g" description="碳纤维机身与模块化设计相结合，在保证结构强度的同时实现极致轻量化。" specs={['重量: 120g', '翼展: 25cm', '材料: 碳纤维']} bgColor="#F5F5F7" />
        <ProductFeature title="持久续航" subtitle="15 分钟飞行时间" description="高效能源管理系统与大容量电池的结合，让 RealmX 拥有长达 15 分钟的续航时间。" specs={['续航: 15 min', '电池: 4S 1500mAh', '充电: 45 min']} />
        <ProductFeature title="4K 视觉" subtitle="高清摄像系统" description="搭载 4K 高清摄像头，支持实时图传。" specs={['摄像头: 4K 30fps', '图传: 1080p 实时', 'FOV: 120°']} bgColor="#F5F5F7" />
        <TechSpecsFull />
        <PackageContents />
        <motion.div className="product-page-cta" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/buy" className="btn-primary btn-large">立即购买 ¥12,999</Link>
        </motion.div>
      </div>
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
        <Link to="/" className="logo"><span className="logo-text">RealmX</span></Link>
        <div className="nav-links">
          {navItems.map(item => (
            <Link key={item.id} to={item.id} className={location.pathname === item.id ? 'active' : ''}>{item.label}</Link>
          ))}
          <Link to="/buy" className="nav-cta">购买</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {navItems.map(item => (<Link key={item.id} to={item.id} onClick={() => setMenuOpen(false)}>{item.label}</Link>))}
          <Link to="/buy" onClick={() => setMenuOpen(false)}>购买</Link>
        </motion.div>
      )}
    </nav>
  )
}

function ProductFeature({ title, subtitle, description, specs, bgColor = '#FFFFFF' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section ref={ref} className="product-feature-section" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <motion.div className="product-feature-content" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="product-feature-title">{title}</h2>
          <p className="product-feature-subtitle">{subtitle}</p>
          <p className="product-feature-description">{description}</p>
          <div className="product-feature-specs">{specs.map((s, i) => <div key={i} className="spec-badge">{s}</div>)}</div>
          <div className="product-feature-image"><div className="image-placeholder">产品特性展示图</div></div>
        </motion.div>
      </div>
    </section>
  )
}

function TechSpecsFull() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const specs = {
    '尺寸与重量': [{ label: '翼展', value: '25cm' }, { label: '长度', value: '30cm' }, { label: '高度', value: '8cm' }, { label: '重量', value: '120g' }],
    '性能': [{ label: '极速', value: '130 km/h' }, { label: '加速 0-100km/h', value: '0.8s' }, { label: '最大过载', value: '8G' }, { label: '飞行时间', value: '15 min' }],
    '动力系统': [{ label: '电机', value: '4× 2300KV 无刷' }, { label: '电池', value: '4S 1500mAh LiPo' }, { label: '桨叶', value: '5寸三叶' }, { label: '充电时间', value: '45 min' }],
    '摄像系统': [{ label: '摄像头', value: '4K 30fps' }, { label: '图传', value: '1080p 实时' }, { label: 'FOV', value: '120°' }, { label: '存储', value: 'microSD 128GB' }],
  }
  return (
    <section id="specs" ref={ref} className="tech-specs-full-section">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>技术规格</motion.h2>
        <motion.div className="specs-full-grid" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {Object.entries(specs).map(([cat, items]) => (
            <div key={cat} className="specs-category">
              <h3 className="specs-category-title">{cat}</h3>
              <div className="specs-list">{items.map((item, idx) => (
                <div key={idx} className="specs-row"><span className="specs-label">{item.label}</span><span className="specs-value">{item.value}</span></div>
              ))}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PackageContents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const contents = ['RealmX Racing Edition 主机 × 1', '遥控器 × 1', '电池 × 2', '充电器 × 1', '备用桨叶 × 8', '说明书 × 1']
  return (
    <section ref={ref} className="package-contents-section">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>包装清单</motion.h2>
        <motion.div className="contents-list" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {contents.map((item, i) => (<div key={i} className="contents-item"><ChevronRight size={16} /><span>{item}</span></div>))}
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
