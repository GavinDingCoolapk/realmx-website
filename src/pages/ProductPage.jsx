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
            <img src="/product-hero.png" alt="RealmX Racing Edition" />
          </motion.div>
        </section>
        <ProductFeature title="极致速度" subtitle="12m/s 最高时速" description="2207.5 1750KV 高效能电机搭配 6 寸桨叶，释放澎湃动力。" specs={['时速: 12m/s', '轴距: 230mm', '桨叶: 6寸']} />
        <ProductFeature title="轻量机身" subtitle="碳纤维 + PP + PLA" description="碳纤维机架保证结构强度，PP轮架耐冲击，PLA外壳精致轻量。" specs={['机身: 1030g', '电池: 660g', '材质: 碳纤维/PP/PLA']} bgColor="#F5F5F7" />
        <ProductFeature title="持久续航" subtitle="10 分钟悬停飞行" description="索尼 18650 6S 6000mAh 大容量电池，1C 快充仅需 1 小时。" specs={['续航: 10min', '电池: 6S 6000mAh', '充电: 1h']} />
        <ProductFeature title="超远图传" subtitle="最远 10km 图传距离" description="无干扰无阻挡环境下图传距离可达 10km，地面上 100-600m。" specs={['最远: 10km', '地面: 100-600m', '电压: 22.2V']} bgColor="#F5F5F7" />
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
    '尺寸与重量': [
      { label: '轴距', value: '230mm' },
      { label: '折叠尺寸', value: '400×450×200mm' },
      { label: '展开尺寸', value: '400×450×350mm' },
      { label: '机身重量', value: '1030g（不含电池）' },
      { label: '电池重量', value: '660g' },
    ],
    '飞行性能': [
      { label: '最高时速', value: '12m/s（43.2km/h）' },
      { label: '飞行时间', value: '10min（悬停）' },
      { label: '图传距离', value: '3-10km（无干扰）' },
      { label: '地面图传', value: '100-600m' },
    ],
    '动力系统': [
      { label: '电机型号', value: '2207.5 1750KV' },
      { label: '桨叶尺寸', value: '6寸' },
      { label: '电池规格', value: '索尼18650 6S 6000mAh' },
      { label: '标称电压', value: '22.2V' },
      { label: '充电时间', value: '1C充电 1h' },
    ],
    '机身材质': [
      { label: '机架', value: '碳纤维' },
      { label: '轮子', value: 'PP材质' },
      { label: '外壳', value: 'PLA材质' },
    ],
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
