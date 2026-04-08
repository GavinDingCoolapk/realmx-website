import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import '../../App.css'

const emptyNews = { title: '', summary: '', content: '', image_url: '', status: 'draft' }

export default function AdminNews() {
  const [news, setNews] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ ...emptyNews })
  const [editId, setEditId] = useState(null)

  const fetchNews = async () => {
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false })
    setNews(data || [])
  }

  useEffect(() => { fetchNews() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (editId) {
      await supabase.from('news').update(form).eq('id', editId)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('news').insert({ ...form, author_id: user?.id })
    }
    setModal(false); setForm({ ...emptyNews }); setEditId(null); fetchNews()
  }

  const handleDelete = async (id) => {
    if (!confirm('确定删除？')) return
    await supabase.from('news').delete().eq('id', id)
    fetchNews()
  }

  const handleEdit = (n) => {
    setForm({ title: n.title, summary: n.summary || '', content: n.content || '', image_url: n.image_url || '', status: n.status })
    setEditId(n.id); setModal(true)
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h3 className="section-subtitle">新闻管理</h3>
        <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', color: '#fff' }} onClick={() => { setForm({ ...emptyNews }); setEditId(null); setModal(true) }}>+ 发布新闻</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>标题</th><th>状态</th><th>日期</th><th>操作</th></tr></thead>
          <tbody>
            {news.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>暂无新闻</td></tr>}
            {news.map(n => (
              <tr key={n.id}><td>{n.id}</td><td>{n.title}</td>
                <td><span className={`status-badge ${n.status === 'published' ? 'success' : 'draft'}`}>{n.status === 'published' ? '已发布' : '草稿'}</span></td>
                <td>{new Date(n.created_at).toLocaleDateString('zh-CN')}</td>
                <td><div className="action-buttons"><button className="action-btn edit" onClick={() => handleEdit(n)}>编辑</button><button className="action-btn delete" onClick={() => handleDelete(n.id)}>删除</button></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModal(false)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: 560, maxWidth: '90vw', maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editId ? '编辑新闻' : '发布新闻'}</h3>
            <form onSubmit={handleSave} className="login-form">
              <div className="form-group"><label>标题</label><input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div className="form-group"><label>摘要</label><input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} /></div>
              <div className="form-group"><label>内容</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} /></div>
              <div className="form-group"><label>图片URL</label><input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>状态</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="draft">草稿</option><option value="published">已发布</option></select></div>
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
