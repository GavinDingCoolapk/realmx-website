import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import '../../App.css'

const emptyProduct = { name: '', category: '整机', price: '', stock: '', description: '', image_url: '', status: 'active' }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ ...emptyProduct })
  const [editId, setEditId] = useState(null)

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const row = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editId) {
      await supabase.from('products').update(row).eq('id', editId)
    } else {
      await supabase.from('products').insert(row)
    }
    setModal(false); setForm({ ...emptyProduct }); setEditId(null); fetchProducts()
  }

  const handleDelete = async (id) => {
    if (!confirm('确定删除？')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const handleEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), description: p.description || '', image_url: p.image_url || '', status: p.status })
    setEditId(p.id); setModal(true)
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h3 className="section-subtitle">产品列表</h3>
        <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', color: '#fff' }} onClick={() => { setForm({ ...emptyProduct }); setEditId(null); setModal(true) }}>+ 添加产品</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>名称</th><th>分类</th><th>价格</th><th>库存</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            {products.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>暂无产品</td></tr>}
            {products.map(p => (
              <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>¥{p.price}</td><td>{p.stock}</td>
                <td><span className={`status-badge ${p.status === 'active' ? 'success' : 'draft'}`}>{p.status === 'active' ? '在售' : '下架'}</span></td>
                <td><div className="action-buttons"><button className="action-btn edit" onClick={() => handleEdit(p)}>编辑</button><button className="action-btn delete" onClick={() => handleDelete(p.id)}>删除</button></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModal(false)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: 480, maxWidth: '90vw', maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editId ? '编辑产品' : '添加产品'}</h3>
            <form onSubmit={handleSave} className="login-form">
              <div className="form-group"><label>名称</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-group"><label>分类</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>整机</option><option>配件</option></select></div>
              <div className="form-group"><label>价格 (¥)</label><input type="number" step="0.01" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
              <div className="form-group"><label>库存</label><input type="number" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></div>
              <div className="form-group"><label>描述</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
              <div className="form-group"><label>图片URL</label><input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>状态</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="active">在售</option><option value="inactive">下架</option></select></div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, color: '#fff' }}>保存</button>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setModal(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
