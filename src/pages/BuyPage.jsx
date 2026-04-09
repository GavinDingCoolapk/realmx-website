import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import '../App.css'

export default function BuyPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pageError, setPageError] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    supabase.from('products').select('*').eq('status', 'active').then(({ data }) => {
      setProducts(data || [])
      if (data && data.length > 0) setSelected(data[0])
    }).catch(() => setPageError('加载产品失败'))
  }, [])

  const total = selected ? selected.price * quantity : 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selected || !name || !phone) return

    // 检查登录
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('请先登录后再下单')
      navigate('/login')
      return
    }

    setLoading(true)
    const { error } = await supabase.from('orders').insert({
      user_id: user.id,
      items: [{ id: selected.id, name: selected.name, price: selected.price, quantity }],
      total_price: total,
      contact_name: name,
      contact_phone: phone,
      shipping_address: address,
      status: 'pending',
    })

    setLoading(false)
    if (error) { alert('下单失败：' + error.message); return }
    setSubmitted(true)
  }

  if (pageError) {
    return (
      <div className="app">
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="buy-page">
          <section className="buy-hero"><h1 className="buy-title">购买 RealmX</h1></section>
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <p style={{ color: '#86868B', marginBottom: '1rem' }}>{pageError}</p>
            <button className="btn-primary" style={{ color: '#fff' }} onClick={() => window.location.reload()}>刷新重试</button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="buy-page">
        <section className="buy-hero"><h1 className="buy-title">购买 RealmX</h1></section>
        <section className="buy-content">
          <div className="container">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1D1D1F' }}>订单提交成功</h2>
                <p style={{ color: '#86868B', marginBottom: '2rem' }}>我们会尽快与您联系确认订单详情</p>
                <button className="btn-primary" onClick={() => { setSubmitted(false); setSelected(products[0]); setName(''); setPhone(''); setAddress(''); setQuantity(1) }}>继续购买</button>
                <Link to="/" style={{ display: 'block', marginTop: '1rem', color: '#0071E3' }}>返回首页</Link>
              </div>
            ) : (
              <div className="buy-layout">
                <div className="buy-product">
                  {selected ? (
                    <>
                      <div className="buy-product-image">
                        {selected.image_url ? <img src={selected.image_url} alt={selected.name} /> : <div className="image-placeholder">{selected.name}</div>}
                      </div>
                      <div className="buy-product-info">
                        <h2>{selected.name}</h2>
                        <p className="buy-product-tagline">{selected.description || ''}</p>
                      </div>
                      {products.length > 1 && (
                        <div style={{ marginTop: '1.5rem' }}>
                          <p style={{ fontSize: '0.875rem', color: '#86868B', marginBottom: '0.75rem' }}>选择产品</p>
                          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {products.map(p => (
                              <button key={p.id} onClick={() => { setSelected(p); setQuantity(1) }}
                                style={{
                                  padding: '0.5rem 1rem', borderRadius: '8px', border: selected?.id === p.id ? '2px solid #0071E3' : '1px solid #E5E7EB',
                                  background: selected?.id === p.id ? '#0071E31a' : '#fff', color: '#1D1D1F', cursor: 'pointer', fontSize: '0.875rem'
                                }}>
                                {p.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>暂无在售产品</div>
                  )}
                </div>

                <div className="buy-order">
                  <h3>订单详情</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="buy-field">
                      <label>姓名 *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="请输入您的姓名" required />
                    </div>
                    <div className="buy-field">
                      <label>手机号 *</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号" required />
                    </div>
                    <div className="buy-field">
                      <label>收货地址</label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="请输入收货地址（选填）" />
                    </div>

                    <div className="order-divider"></div>

                    <div className="order-row"><span>产品</span><span>{selected?.name || '-'}</span></div>
                    <div className="order-row"><span>单价</span><span>¥{selected ? Number(selected.price).toLocaleString() : '0'}</span></div>
                    <div className="order-row">
                      <span>数量</span>
                      <div className="quantity-selector">
                        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="order-divider"></div>
                    <div className="order-total"><span>总计</span><span className="total-price">¥{total.toLocaleString()}</span></div>

                    <button type="submit" className="btn-primary btn-large btn-full" disabled={loading || !selected} style={{ marginTop: '1.5rem', color: '#fff' }}>
                      {loading ? '提交中...' : '提交订单'}
                    </button>
                    <p className="order-note">* 下单前请先登录</p>
                  </form>
                </div>
              </div>
            )}
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
        <div className="nav-links">{navItems.map(item => (<Link key={item.id} to={item.id} className={location.pathname === item.id ? 'active' : ''}>{item.label}</Link>))}<Link to="/buy" className="nav-cta">购买</Link><Link to="/login" className="nav-login">登录</Link></div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {menuOpen && (<motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>{navItems.map(item => (<Link key={item.id} to={item.id} onClick={() => setMenuOpen(false)}>{item.label}</Link>))}<Link to="/buy" onClick={() => setMenuOpen(false)}>购买</Link></motion.div>)}
    </nav>
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
            <div className="footer-column"><h4>关于</h4><Link to="/login">登录</Link></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 RealmX. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
