import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ChevronRight, Play } from 'lucide-react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'product' && <ProductPage />}
      {currentPage === 'buy' && <BuyPage />}
      
      <Footer />
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

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-text">RealmX</span>
        </a>

        <div className="nav-links">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('product') }}
            className={currentPage === 'product' ? 'active' : ''}
          >
            产品
          </a>
          <a href="#specs">技术规格</a>
          <a href="#applications">应用场景</a>
          <a href="#news">新闻动态</a>
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
          <a href="#" onClick={() => { setCurrentPage('product'); setMenuOpen(false) }}>产品</a>
          <a href="#specs" onClick={() => setMenuOpen(false)}>技术规格</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>应用场景</a>
          <a href="#news" onClick={() => setMenuOpen(false)}>新闻动态</a>
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
      <ApplicationsSection />
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
    <section className="product-showcase-section">
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

/* ==================== APPLICATIONS SECTION ==================== */
function ApplicationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const applications = [
    {
      title: 'RoboCup 竞速',
      description: '专为 RoboCup 无人机竞速比赛打造，极致性能助你夺冠',
      icon: '🏆'
    },
    {
      title: '航拍创作',
      description: '4K 高清摄像头，捕捉每一个精彩瞬间',
      icon: '🎬'
    },
    {
      title: '科研教育',
      description: '开放 API，适合高校科研与教学使用',
      icon: '🔬'
    },
    {
      title: '行业应用',
      description: '巡检、测绘、安防，多场景应用',
      icon: '🏢'
    }
  ]

  return (
    <section id="applications" ref={ref} className="applications-section">
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
              <p className="application-description">{app.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== NEWS SECTION ==================== */
function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const news = [
    {
      date: '2026.03.06',
      title: 'RealmX Racing Edition 正式发布',
      summary: '全新一代竞速无人机，性能全面提升'
    },
    {
      date: '2026.02.15',
      title: 'RoboCup 2026 备战启动',
      summary: 'RealmX 团队积极备战新赛季'
    },
    {
      date: '2026.01.20',
      title: 'RealmX 与多所高校达成合作',
      summary: '共同推进无人机科研与教育'
    }
  ]

  return (
    <section id="news" ref={ref} className="news-section">
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
function ProductPage() {
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
