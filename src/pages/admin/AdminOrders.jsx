import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import '../../App.css'

const statusMap = {
  pending: { label: '待付款', cls: 'pending' },
  processing: { label: '处理中', cls: 'warning' },
  shipped: { label: '已发货', cls: 'success' },
  completed: { label: '已完成', cls: 'success' },
  cancelled: { label: '已取消', cls: 'draft' },
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    fetchOrders()
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header"><h3 className="section-subtitle">订单列表</h3></div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>订单号</th><th>客户</th><th>产品</th><th>金额</th><th>状态</th><th>日期</th><th>操作</th></tr></thead>
          <tbody>
            {orders.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>暂无订单</td></tr>}
            {orders.map(o => (
              <tr key={o.id}><td>#{o.id}</td><td>{o.contact_name || '-'}<br/><small style={{ color: '#999' }}>{o.contact_phone || ''}</small></td>
                <td>{(o.items || []).map(i => i.name).join(', ')}</td>
                <td>¥{Number(o.total_price).toLocaleString()}</td>
                <td><span className={`status-badge ${(statusMap[o.status] || {}).cls || ''}`}>{(statusMap[o.status] || {}).label || o.status}</span></td>
                <td>{new Date(o.created_at).toLocaleDateString('zh-CN')}</td>
                <td>
                  <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ fontSize: '0.8rem', padding: '0.25rem', borderRadius: 6, border: '1px solid #ddd' }}>
                    {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
