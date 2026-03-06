import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ChevronRight, Play, Download, Mail, MessageCircle, FileText, HelpCircle, Phone, MapPin, Clock, Users, Target, Award } from 'lucide-react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'product' && <ProductPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'technology' && <TechnologyPage />}
      {currentPage === 'applications' && <ApplicationsPage />}
      {currentPage === 'support' && <SupportPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'buy' && <BuyPage />}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}

/* ==================== NAVIGATION ==================== */
function Navigation({ menuOpen, setMenuOpen, currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'product', label: '产品' },
    { id: 'technology', label: '技术' },
    { id: 'applications', label: '应用场景' },
    { id: 'support', label: '支持' },
    { id: 'about', label: '关于' },
  ]

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-text">RealmX</span>
        </a>

        <div className="nav-links">
          {navItems.map(item => (
            <a 
              key={item.id}
              href="#" 
              onClick={(e) => { e.preventDefault(); setCurrentPage(item.id) }}
              className={currentPage === item.id ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#" 
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); setCurrentPage('buy') }}
          >
            立即购买
          </a>
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
          {navItems.map(item => (
            <a 
              key={item.id}
              href="#" 
              onClick={() => { setCurrentPage(item.id); setMenuOpen(false) }}
            >
              {item.label}
            </a>
          ))}
          <a href="#" onClick={() => { setCurrentPage('buy'); setMenuOpen(false) }}>立即购买</a>
        </motion.div>
      )}
    </nav>
  )
}

/* ==================== HOME PAGE ==================== */
function HomePage({ setCurrentPage }) {
  return (
    <>
      <HeroSection setCurrentPage={setCurrentPage} />
      <ProductShowcase setCurrentPage={setCurrentPage} />
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
      <HomeApplicationsPreview setCurrentPage={setCurrentPage} />
      <NewsSection />
      <HomePurchaseCTA setCurrentPage={setCurrentPage} />
    </>
  )
}

/* ==================== HERO SECTION ==================== */
function HeroSection({ setCurrentPage }) {
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
          <button 
            className="btn-primary"
            onClick={() => setCurrentPage('buy')}
          >
            立即购买
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setCurrentPage('product')}
          >
            了解更多 <ChevronRight size={16} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ==================== PRODUCT SHOWCASE ==================== */
function ProductShowcase({ setCurrentPage }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const products = [
    {
      name: 'RealmX Racing Edition',
      tagline: '为速度而生',
      price: '¥12,999',
      image: '/drone-render.png'
    }
  ]

  return (
    <section ref={ref} className="product-showcase-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          产品系列
        </motion.h2>

        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div 
              key={index}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-tagline">{product.tagline}</p>
                <p className="product-price">从 {product.price}</p>
                <div className="product-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => setCurrentPage('buy')}
                  >
                    购买
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => setCurrentPage('product')}
                  >
                    了解更多 <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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

/* ==================== HOME APPLICATIONS PREVIEW ==================== */
function HomeApplicationsPreview({ setCurrentPage }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const applications = [
    { title: 'RoboCup 竞速', icon: '🏆' },
    { title: '航拍创作', icon: '🎬' },
    { title: '科研教育', icon: '🔬' },
    { title: '行业应用', icon: '🏢' }
  ]

  return (
    <section ref={ref} className="applications-preview-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          应用场景
        </motion.h2>

        <div className="applications-grid">
          {applications.map((app, index) => (
            <motion.div 
              key={index}
              className="application-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="application-icon">{app.icon}</div>
              <h3 className="application-title">{app.title}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="applications-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="btn-secondary"
            onClick={() => setCurrentPage('applications')}
          >
            了解更多应用场景 <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== NEWS SECTION ==================== */
function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const news = [
    { date: '2026.03.06', title: 'RealmX Racing Edition 正式发布', summary: '全新一代竞速无人机，性能全面提升' },
    { date: '2026.02.15', title: 'RoboCup 2026 备战启动', summary: 'RealmX 团队积极备战新赛季' },
    { date: '2026.01.20', title: 'RealmX 与多所高校达成合作', summary: '共同推进无人机科研与教育' }
  ]

  return (
    <section ref={ref} className="news-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          新闻动态
        </motion.h2>

        <div className="news-grid">
          {news.map((item, index) => (
            <motion.div 
              key={index}
              className="news-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="news-date">{item.date}</div>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-summary">{item.summary}</p>
              <a href="#" className="news-link">
                阅读更多 <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== HOME PURCHASE CTA ==================== */
function HomePurchaseCTA({ setCurrentPage }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="home-purchase-section">
      <motion.div 
        className="purchase-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="purchase-title">准备起飞？</h2>
        <p className="purchase-subtitle">RealmX Racing Edition，为速度而生</p>
        <p className="purchase-price">¥12,999</p>
        <button 
          className="btn-primary btn-large"
          onClick={() => setCurrentPage('buy')}
        >
          立即购买
        </button>
      </motion.div>
    </section>
  )
}

/* ==================== PRODUCT PAGE ==================== */
function ProductPage({ setCurrentPage }) {
  return (
    <div className="product-page">
      <section className="product-hero">
        <motion.div 
          className="product-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="product-hero-title">RealmX Racing Edition</h1>
          <p className="product-hero-tagline">为速度而生</p>
          <p className="product-hero-price">¥12,999</p>
        </motion.div>
        <motion.div 
          className="product-hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img src="/drone-render.png" alt="RealmX Racing Edition" />
        </motion.div>
      </section>

      <ProductFeature 
        title="极致速度"
        subtitle="0.8s 从静止到 100km/h"
        description="采用高效能电机和优化的空气动力学设计，RealmX Racing Edition 能够在 0.8 秒内从静止加速到 100km/h，瞬间释放澎湃动力。"
        specs={['极速: 130 km/h', '加速: 0-100km/h 0.8s', '最大过载: 8G']}
      />

      <ProductFeature 
        title="超轻量化"
        subtitle="仅重 120g"
        description="碳纤维机身与模块化设计相结合，在保证结构强度的同时实现极致轻量化，让每一次飞行都更加灵活自如。"
        specs={['重量: 120g', '翼展: 25cm', '材料: 碳纤维']}
        bgColor="#F5F5F7"
      />

      <ProductFeature 
        title="持久续航"
        subtitle="15 分钟飞行时间"
        description="高效能源管理系统与大容量电池的结合，让 RealmX Racing Edition 拥有长达 15 分钟的续航时间，满足长时间训练和比赛需求。"
        specs={['续航: 15 min', '电池: 4S 1500mAh', '充电: 45 min']}
      />

      <ProductFeature 
        title="4K 视觉"
        subtitle="高清摄像系统"
        description="搭载 4K 高清摄像头，支持实时图传，无论是竞速比赛还是航拍创作，都能捕捉清晰流畅的画面。"
        specs={['摄像头: 4K 30fps', '图传: 1080p 实时', 'FOV: 120°']}
        bgColor="#F5F5F7"
      />

      <TechSpecsFull />
      <PackageContents />
      
      <motion.div 
        className="product-page-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button 
          className="btn-primary btn-large"
          onClick={() => setCurrentPage('buy')}
        >
          立即购买 ¥12,999
        </button>
      </motion.div>
    </div>
  )
}

function ProductFeature({ title, subtitle, description, specs, bgColor = '#FFFFFF' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="product-feature-section" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <motion.div 
          className="product-feature-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="product-feature-title">{title}</h2>
          <p className="product-feature-subtitle">{subtitle}</p>
          <p className="product-feature-description">{description}</p>
          
          <div className="product-feature-specs">
            {specs.map((spec, index) => (
              <div key={index} className="spec-badge">{spec}</div>
            ))}
          </div>

          <div className="product-feature-image">
            <div className="image-placeholder">产品特性展示图</div>
          </div>
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
      { label: '翼展', value: '25cm' },
      { label: '长度', value: '30cm' },
      { label: '高度', value: '8cm' },
      { label: '重量', value: '120g' },
    ],
    '性能': [
      { label: '极速', value: '130 km/h' },
      { label: '加速 0-100km/h', value: '0.8s' },
      { label: '最大过载', value: '8G' },
      { label: '飞行时间', value: '15 min' },
    ],
    '动力系统': [
      { label: '电机', value: '4× 2300KV 无刷' },
      { label: '电池', value: '4S 1500mAh LiPo' },
      { label: '桨叶', value: '5寸三叶' },
      { label: '充电时间', value: '45 min' },
    ],
    '摄像系统': [
      { label: '摄像头', value: '4K 30fps' },
      { label: '图传', value: '1080p 实时' },
      { label: 'FOV', value: '120°' },
      { label: '存储', value: 'microSD 128GB' },
    ],
  }

  return (
    <section id="specs" ref={ref} className="tech-specs-full-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          技术规格
        </motion.h2>

        <motion.div 
          className="specs-full-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(specs).map(([category, items], index) => (
            <div key={index} className="specs-category">
              <h3 className="specs-category-title">{category}</h3>
              <div className="specs-list">
                {items.map((item, idx) => (
                  <div key={idx} className="specs-row">
                    <span className="specs-label">{item.label}</span>
                    <span className="specs-value">{item.value}</span>
                  </div>
                ))}
              </div>
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

  const contents = [
    'RealmX Racing Edition 主机 × 1',
    '遥控器 × 1',
    '电池 × 2',
    '充电器 × 1',
    '备用桨叶 × 8',
    '说明书 × 1',
  ]

  return (
    <section ref={ref} className="package-contents-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          包装清单
        </motion.h2>

        <motion.div 
          className="contents-list"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {contents.map((item, index) => (
            <div key={index} className="contents-item">
              <ChevronRight size={16} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== TECHNOLOGY PAGE ==================== */
function TechnologyPage() {
  return (
    <div className="technology-page">
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>科技驱动未来</h1>
          <p>探索 RealmX 背后的核心技术</p>
        </motion.div>
      </section>

      <TechnologySection
        icon={<Target />}
        title="飞控系统"
        subtitle="精准控制，稳定飞行"
        description="采用自主研发的飞行控制系统，结合高精度传感器融合算法，实现毫秒级响应和厘米级定位精度。"
        features={['自研飞控算法', '多传感器融合', '实时姿态调整', '智能避障']}
      />

      <TechnologySection
        icon={<FileText />}
        title="视觉系统"
        subtitle="4K 高清，实时图传"
        description="搭载高性能图像处理芯片，支持 4K 30fps 视频录制和 1080p 实时图传，配合 AI 目标识别算法，实现智能跟踪和避障。"
        features={['4K 高清录制', '1080p 实时图传', 'AI 目标识别', '智能跟踪']}
        bgColor="#F5F5F7"
      />

      <TechnologySection
        icon={<Award />}
        title="材料与设计"
        subtitle="轻量化，高强度"
        description="采用航空级碳纤维材料，结合空气动力学优化设计，在保证结构强度的同时实现极致轻量化。"
        features={['航空级碳纤维', '空气动力学设计', '模块化结构', '快速拆装']}
      />

      <TechnologySection
        icon={<FileText />}
        title="性能数据"
        subtitle="实测验证，数据说话"
        description="经过严格的风洞测试和实地飞行验证，每一项性能指标都经过多次测试和优化。"
        features={['风洞测试验证', '实地飞行数据', '性能对比图表', '持续优化']}
        bgColor="#F5F5F7"
      />

      <DownloadSection />
    </div>
  )
}

function TechnologySection({ icon, title, subtitle, description, features, bgColor = '#FFFFFF' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="technology-section" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <motion.div 
          className="technology-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="technology-icon">{icon}</div>
          <h2 className="technology-title">{title}</h2>
          <p className="technology-subtitle">{subtitle}</p>
          <p className="technology-description">{description}</p>
          
          <div className="technology-features">
            {features.map((feature, index) => (
              <div key={index} className="technology-feature">
                <ChevronRight size={16} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="technology-image">
            <div className="image-placeholder">技术展示图</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DownloadSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const documents = [
    { title: 'RealmX 技术白皮书', type: 'PDF', size: '2.5 MB' },
    { title: '飞控系统架构文档', type: 'PDF', size: '1.8 MB' },
    { title: '性能测试报告', type: 'PDF', size: '3.2 MB' },
  ]

  return (
    <section ref={ref} className="download-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          技术文档下载
        </motion.h2>

        <motion.div 
          className="documents-list"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              <div className="document-icon">
                <FileText size={24} />
              </div>
              <div className="document-info">
                <h4>{doc.title}</h4>
                <p>{doc.type} · {doc.size}</p>
              </div>
              <button className="btn-secondary">
                <Download size={18} />
                下载
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== APPLICATIONS PAGE ==================== */
function ApplicationsPage() {
  return (
    <div className="applications-page">
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>应用场景</h1>
          <p>RealmX 在多个领域展现卓越性能</p>
        </motion.div>
      </section>

      <ApplicationDetail
        icon="🏆"
        title="RoboCup 竞速"
        subtitle="专为竞赛打造"
        description="RealmX Racing Edition 专为 RoboCup 无人机竞速比赛设计，凭借极致的速度和稳定的性能，帮助选手在激烈的竞争中脱颖而出。"
        features={['极速 130 km/h', '0.8s 加速', '8G 过载', '15min 续航']}
        stats={[
          { label: '参赛队伍', value: '50+' },
          { label: '获奖次数', value: '20+' },
          { label: '用户好评', value: '98%' },
        ]}
      />

      <ApplicationDetail
        icon="🎬"
        title="航拍创作"
        subtitle="4K 高清画质"
        description="搭载 4K 高清摄像头和智能稳定系统，RealmX 是航拍创作的理想选择，无论是电影拍摄还是广告制作，都能呈现专业级画面。"
        features={['4K 30fps 录制', '1080p 实时图传', '智能跟踪', '稳定云台']}
        bgColor="#F5F5F7"
        stats={[
          { label: '分辨率', value: '4K' },
          { label: '帧率', value: '30fps' },
          { label: '图传距离', value: '2km' },
        ]}
      />

      <ApplicationDetail
        icon="🔬"
        title="科研教育"
        subtitle="开放 API 接口"
        description="提供完整的开发文档和 API 接口，RealmX 广泛应用于高校科研和教学，是无人机技术和人工智能研究的理想平台。"
        features={['开放 API', '完整文档', '示例代码', '技术支持']}
        stats={[
          { label: '合作高校', value: '10+' },
          { label: '研究项目', value: '30+' },
          { label: '论文发表', value: '15+' },
        ]}
      />

      <ApplicationDetail
        icon="🏢"
        title="行业应用"
        subtitle="多场景解决方案"
        description="从电力巡检到测绘安防，RealmX 提供定制化的行业解决方案，满足不同领域的专业需求。"
        features={['电力巡检', '测绘建模', '安防监控', '农业植保']}
        bgColor="#F5F5F7"
        stats={[
          { label: '应用领域', value: '10+' },
          { label: '企业客户', value: '50+' },
          { label: '成功案例', value: '100+' },
        ]}
      />
    </div>
  )
}

function ApplicationDetail({ icon, title, subtitle, description, features, stats, bgColor = '#FFFFFF' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="application-detail-section" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <motion.div 
          className="application-detail-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="application-detail-icon">{icon}</div>
          <h2 className="application-detail-title">{title}</h2>
          <p className="application-detail-subtitle">{subtitle}</p>
          <p className="application-detail-description">{description}</p>

          <div className="application-detail-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-badge">{feature}</div>
            ))}
          </div>

          <div className="application-detail-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="application-detail-image">
            <div className="image-placeholder">应用场景展示图</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== SUPPORT PAGE ==================== */
function SupportPage() {
  const [activeTab, setActiveTab] = useState('quickstart')

  const tabs = [
    { id: 'quickstart', label: '快速入门', icon: <Play size={20} /> },
    { id: 'docs', label: '技术文档', icon: <FileText size={20} /> },
    { id: 'faq', label: '常见问题', icon: <HelpCircle size={20} /> },
    { id: 'contact', label: '联系我们', icon: <Mail size={20} /> },
  ]

  return (
    <div className="support-page">
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>支持中心</h1>
          <p>获取帮助，解决问题</p>
        </motion.div>
      </section>

      <section className="support-content">
        <div className="container">
          <div className="support-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`support-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="support-tab-content">
            {activeTab === 'quickstart' && <QuickStartTab />}
            {activeTab === 'docs' && <DocsTab />}
            {activeTab === 'faq' && <FAQTab />}
            {activeTab === 'contact' && <ContactTab />}
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickStartTab() {
  const steps = [
    { number: '01', title: '开箱检查', description: '检查包装内的所有配件是否齐全' },
    { number: '02', title: '电池安装', description: '将电池安装到无人机上，确保卡扣锁紧' },
    { number: '03', title: '遥控器配对', description: '打开遥控器，按说明完成与无人机的配对' },
    { number: '04', title: '首次飞行', description: '在开阔场地进行首次飞行测试' },
  ]

  return (
    <div className="quickstart-content">
      <h2>快速入门指南</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="step-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DocsTab() {
  const documents = [
    { title: '用户手册', desc: '完整的产品使用说明', type: 'PDF', size: '5.2 MB' },
    { title: '快速入门指南', desc: '5 分钟上手 RealmX', type: 'PDF', size: '1.5 MB' },
    { title: 'API 开发文档', desc: '完整的 API 接口说明', type: 'Online', size: null },
    { title: '飞控系统说明', desc: '飞行控制系统详解', type: 'PDF', size: '2.8 MB' },
    { title: '维护保养指南', desc: '日常维护和保养建议', type: 'PDF', size: '1.2 MB' },
    { title: '故障排除手册', desc: '常见问题解决方案', type: 'PDF', size: '2.1 MB' },
  ]

  return (
    <div className="docs-content">
      <h2>技术文档</h2>
      <div className="documents-grid">
        {documents.map((doc, index) => (
          <motion.div 
            key={index}
            className="document-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="document-icon">
              <FileText size={32} />
            </div>
            <h3>{doc.title}</h3>
            <p className="document-desc">{doc.desc}</p>
            <p className="document-meta">{doc.type}{doc.size && ` · ${doc.size}`}</p>
            <button className="btn-secondary">
              {doc.type === 'Online' ? <ChevronRight size={18} /> : <Download size={18} />}
              {doc.type === 'Online' ? '查看' : '下载'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FAQTab() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { 
      question: 'RealmX 的续航时间是多少？', 
      answer: 'RealmX Racing Edition 在正常飞行条件下续航时间约为 15 分钟，在竞速模式下约为 12 分钟。实际续航时间会根据飞行环境、速度和使用方式有所差异。'
    },
    { 
      question: 'RealmX 支持哪些操作系统？', 
      answer: 'RealmX 的配套 App 支持 iOS 12.0 及以上版本和 Android 8.0 及以上版本。遥控器无需连接手机也可以独立使用。'
    },
    { 
      question: '如何进行固件升级？', 
      answer: '通过 RealmX App 连接无人机后，系统会自动检测是否有新固件。如有更新，按照 App 内的提示操作即可完成升级。'
    },
    { 
      question: 'RealmX 的保修政策是什么？', 
      answer: 'RealmX 提供一年有限保修服务，涵盖非人为损坏的硬件故障。详细保修条款请查看产品包装内的保修卡或联系客服。'
    },
    { 
      question: '如何购买配件？', 
      answer: '您可以通过我们的官方网站、授权经销商或联系客服购买原装配件。我们提供电池、桨叶、保护罩等多种配件。'
    },
  ]

  return (
    <div className="faq-content">
      <h2>常见问题</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button 
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <ChevronRight size={20} className={openIndex === index ? 'rotate' : ''} />
            </button>
            {openIndex === index && (
              <motion.div 
                className="faq-answer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ContactTab() {
  return (
    <div className="contact-content">
      <h2>联系我们</h2>
      <div className="contact-grid">
        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="contact-icon"><Mail size={32} /></div>
          <h3>邮件支持</h3>
          <p>contact@realmx.tech</p>
          <p className="contact-note">工作日 24 小时内回复</p>
        </motion.div>

        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="contact-icon"><MessageCircle size={32} /></div>
          <h3>在线客服</h3>
          <p>微信: RealmX</p>
          <p className="contact-note">工作日 9:00-18:00 在线</p>
        </motion.div>

        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="contact-icon"><Phone size={32} /></div>
          <h3>电话咨询</h3>
          <p>400-XXX-XXXX</p>
          <p className="contact-note">工作日 9:00-18:00</p>
        </motion.div>

        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="contact-icon"><MapPin size={32} /></div>
          <h3>公司地址</h3>
          <p>北京市海淀区</p>
          <p className="contact-note">来访请提前预约</p>
        </motion.div>
      </div>
    </div>
  )
}

/* ==================== ABOUT PAGE ==================== */
function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>关于 RealmX</h1>
          <p>探索无限可能，超越极限</p>
        </motion.div>
      </section>

      <AboutSection
        title="品牌故事"
        content="RealmX 诞生于对无人机技术的热爱和追求。我们相信，优秀的无人机不仅是技术的结晶，更是设计、性能和用户体验的完美融合。每一款 RealmX 产品，都承载着我们对极致的追求。"
        bgColor="#FFFFFF"
      />

      <AboutSection
        title="品牌愿景"
        content="成为全球领先的无人机品牌，让每个人都能体验到飞行的乐趣。我们致力于推动无人机技术的发展，为用户提供更强大、更智能、更易用的飞行产品。"
        bgColor="#F5F5F7"
      />

      <AboutSection
        title="核心价值观"
        content="创新、品质、用户至上。我们不断创新，追求卓越品质，始终以用户需求为导向，为用户提供最佳的产品体验。"
        bgColor="#FFFFFF"
      />

      <TeamSection />
      <TimelineSection />
      <PartnersSection />
    </div>
  )
}

function AboutSection({ title, content, bgColor }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="about-section" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{title}</h2>
          <p>{content}</p>
        </motion.div>
      </div>
    </section>
  )
}

function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="team-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          核心团队
        </motion.h2>

        <motion.div 
          className="team-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <p>
            RealmX 团队由一群热爱无人机技术的工程师、设计师和行业专家组成。
            我们来自不同的背景，但都对飞行充满热情，致力于打造世界级的无人机产品。
          </p>
        </motion.div>

        <div className="team-stats">
          <motion.div 
            className="team-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-value">20+</div>
            <div className="stat-label">团队成员</div>
          </motion.div>

          <motion.div 
            className="team-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-value">50+</div>
            <div className="stat-label">累计专利</div>
          </motion.div>

          <motion.div 
            className="team-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-value">5+</div>
            <div className="stat-label">行业经验（年）</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const milestones = [
    { year: '2025', title: '品牌创立', desc: 'RealmX 正式成立，开始无人机产品研发' },
    { year: '2026', title: '产品发布', desc: 'RealmX Racing Edition 正式发布' },
    { year: '2026', title: '市场拓展', desc: '产品进入多个国家和地区的市场' },
    { year: '未来', title: '持续创新', desc: '更多产品线和应用场景正在开发中' },
  ]

  return (
    <section ref={ref} className="timeline-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          发展历程
        </motion.h2>

        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline-year">{milestone.year}</div>
              <div className="timeline-content">
                <h3>{milestone.title}</h3>
                <p>{milestone.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="partners-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          合作伙伴
        </motion.h2>

        <motion.div 
          className="partners-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="partner-logo">
              <div className="image-placeholder">合作伙伴 Logo</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== BUY PAGE ==================== */
function BuyPage() {
  const [quantity, setQuantity] = useState(1)
  const price = 12999
  const total = price * quantity

  return (
    <div className="buy-page">
      <section className="buy-hero">
        <h1 className="buy-title">购买 RealmX Racing Edition</h1>
      </section>

      <section className="buy-content">
        <div className="container">
          <div className="buy-layout">
            <div className="buy-product">
              <div className="buy-product-image">
                <img src="/drone-render.png" alt="RealmX Racing Edition" />
              </div>
              <div className="buy-product-info">
                <h2>RealmX Racing Edition</h2>
                <p className="buy-product-tagline">为速度而生</p>
              </div>
            </div>

            <div className="buy-order">
              <h3>订单详情</h3>
              
              <div className="order-row">
                <span>单价</span>
                <span>¥{price.toLocaleString()}</span>
              </div>

              <div className="order-row">
                <span>数量</span>
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="order-divider"></div>

              <div className="order-total">
                <span>总计</span>
                <span className="total-price">¥{total.toLocaleString()}</span>
              </div>

              <button className="btn-primary btn-large btn-full">
                立即购买
              </button>

              <p className="order-note">
                * 目前仅支持联系客服购买，我们会尽快与您联系
              </p>

              <div className="order-contact">
                <h4>联系方式</h4>
                <p>📧 contact@realmx.tech</p>
                <p>📱 微信: RealmX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ==================== FOOTER ==================== */
function Footer({ setCurrentPage }) {
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
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('product') }}>RealmX Racing</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('product') }}>技术规格</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('buy') }}>购买</a>
            </div>
            <div className="footer-column">
              <h4>支持</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>文档</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>联系我们</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>售后服务</a>
            </div>
            <div className="footer-column">
              <h4>关于</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about') }}>品牌故事</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about') }}>新闻</a>
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
