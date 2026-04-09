import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ChevronRight, Play, FileText, HelpCircle, Mail, MessageCircle, Phone, MapPin, Download } from 'lucide-react'
import '../App.css'

export default function SupportPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('quickstart')
  const tabs = [
    { id: 'quickstart', label: '快速入门', icon: <Play size={20} /> },
    { id: 'docs', label: '技术文档', icon: <FileText size={20} /> },
    { id: 'faq', label: '常见问题', icon: <HelpCircle size={20} /> },
    { id: 'contact', label: '联系我们', icon: <Mail size={20} /> },
  ]
  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="support-page">
        <section className="page-hero">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>支持中心</h1><p>获取帮助，解决问题</p>
          </motion.div>
        </section>
        <section className="support-content">
          <div className="container">
            <div className="support-tabs">
              {tabs.map(tab => (<button key={tab.id} className={`support-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.icon}<span>{tab.label}</span></button>))}
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

function QuickStartTab() {
  const steps = [{ number: '01', title: '开箱检查', description: '检查包装内的所有配件是否齐全' }, { number: '02', title: '电池安装', description: '将电池安装到无人机上，确保卡扣锁紧' }, { number: '03', title: '遥控器配对', description: '打开遥控器，按说明完成与无人机的配对' }, { number: '04', title: '首次飞行', description: '在开阔场地进行首次飞行测试' }]
  return (<div className="quickstart-content"><h2>快速入门指南</h2><div className="steps-grid">{steps.map((step, i) => (<motion.div key={i} className="step-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><div className="step-number">{step.number}</div><h3>{step.title}</h3><p>{step.description}</p></motion.div>))}</div></div>)
}

function DocsTab() {
  const documents = [{ title: '用户手册', desc: '完整的产品使用说明', type: 'PDF', size: '5.2 MB' }, { title: '快速入门指南', desc: '5 分钟上手 RealmX', type: 'PDF', size: '1.5 MB' }, { title: 'API 开发文档', desc: '完整的 API 接口说明', type: 'Online', size: null }, { title: '飞控系统说明', desc: '飞行控制系统详解', type: 'PDF', size: '2.8 MB' }, { title: '维护保养指南', desc: '日常维护和保养建议', type: 'PDF', size: '1.2 MB' }, { title: '故障排除手册', desc: '常见问题解决方案', type: 'PDF', size: '2.1 MB' }]
  return (<div className="docs-content"><h2>技术文档</h2><div className="documents-grid">{documents.map((doc, i) => (<motion.div key={i} className="document-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><div className="document-icon"><FileText size={32} /></div><h3>{doc.title}</h3><p className="document-desc">{doc.desc}</p><p className="document-meta">{doc.type}{doc.size && ` · ${doc.size}`}</p><button className="btn-secondary">{doc.type === 'Online' ? <><ChevronRight size={18} />查看</> : <><Download size={18} />下载</>}</button></motion.div>))}</div></div>)
}

function FAQTab() {
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = [{ question: 'RealmX 的续航时间是多少？', answer: '约 15 分钟，竞速模式下约 12 分钟。' }, { question: 'RealmX 支持哪些操作系统？', answer: '配套 App 支持 iOS 12.0+ 和 Android 8.0+。' }, { question: '如何进行固件升级？', answer: '通过 RealmX App 连接无人机后，系统会自动检测新固件。' }, { question: '保修政策是什么？', answer: '一年有限保修，涵盖非人为损坏的硬件故障。' }, { question: '如何购买配件？', answer: '通过官方网站、授权经销商或联系客服购买。' }]
  return (<div className="faq-content"><h2>常见问题</h2><div className="faq-list">{faqs.map((faq, i) => (<motion.div key={i} className="faq-item" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}><span>{faq.question}</span><ChevronRight size={20} className={openIndex === i ? 'rotate' : ''} /></button><div className="faq-answer" style={{ maxHeight: openIndex === i ? '200px' : '0', opacity: openIndex === i ? 1 : 0 }}><p>{faq.answer}</p></div></motion.div>))}</div></div>)
}

function ContactTab() {
  return (<div className="contact-content"><h2>联系我们</h2><div className="contact-grid">{[{icon: <Mail size={32} />, title: '邮件支持', info: 'contact@realmx.tech', note: '工作日 24 小时内回复'}, {icon: <MessageCircle size={32} />, title: '在线客服', info: '微信: RealmX', note: '工作日 9:00-18:00 在线'}, {icon: <Phone size={32} />, title: '电话咨询', info: '400-XXX-XXXX', note: '工作日 9:00-18:00'}, {icon: <MapPin size={32} />, title: '公司地址', info: '北京市海淀区', note: '来访请提前预约'}].map((c, i) => (<motion.div key={i} className="contact-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><div className="contact-icon">{c.icon}</div><h3>{c.title}</h3><p>{c.info}</p><p className="contact-note">{c.note}</p></motion.div>))}</div></div>)
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
