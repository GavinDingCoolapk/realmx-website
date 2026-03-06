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
      {currentPage === 'accessories' && <AccessoriesPage />}
      {currentPage === 'support' && <SupportPage />}
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
    { id: 'product', label: 'RealmX Racing' },
    { id: 'accessories', label: '配件' },
    { id: 'support', label: '技术支持' },
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
            购买
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
          <a href="#" onClick={() => { setCurrentPage('buy'); setMenuOpen(false) }}>购买</a>
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
      <NewsSection />
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

/* ==================== ACCESSORIES PAGE ==================== */
function AccessoriesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const accessories = [
    {
      name: '备用电池',
      desc: '4S 1500mAh LiPo，续航 15 分钟',
      price: '¥299',
      image: '电池'
    },
    {
      name: '备用桨叶套装',
      desc: '5寸三叶桨叶，8 片装',
      price: '¥99',
      image: '桨叶'
    },
    {
      name: '快速充电器',
      desc: '支持快充，45 分钟充满',
      price: '¥399',
      image: '充电器'
    },
    {
      name: '便携收纳包',
      desc: '防水材质，可容纳整机 + 配件',
      price: '¥199',
      image: '收纳包'
    },
    {
      name: '保护罩',
      desc: '轻量化设计，室内训练必备',
      price: '¥149',
      image: '保护罩'
    },
    {
      name: '遥控器',
      desc: '专业级遥控，低延迟响应',
      price: '¥899',
      image: '遥控器'
    },
  ]

  return (
    <div className="accessories-page">
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>配件</h1>
          <p>为你的 RealmX Racing 升级装备</p>
        </motion.div>
      </section>

      <section ref={ref} className="accessories-content">
        <div className="container">
          <div className="accessories-grid">
            {accessories.map((item, index) => (
              <motion.div 
                key={index}
                className="accessory-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <div className="accessory-image">
                  <div className="image-placeholder">{item.image}</div>
                </div>
                <div className="accessory-info">
                  <h3>{item.name}</h3>
                  <p className="accessory-desc">{item.desc}</p>
                  <p className="accessory-price">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
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
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('accessories') }}>配件</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('buy') }}>购买</a>
            </div>
            <div className="footer-column">
              <h4>技术支持</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>快速入门</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>技术文档</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('support') }}>联系我们</a>
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
