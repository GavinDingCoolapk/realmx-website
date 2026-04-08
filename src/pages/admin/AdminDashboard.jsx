import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import '../../App.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, users: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: orders }, { data: orderData }, { count: products }] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('id, contact_name, items, total_price, status, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('products').select('*', { count: 'exact', head: true }),
      ])
      const revenue = orderData?.reduce((sum, o) => sum + Number(o.total_price), 0) || 0
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      setStats({ orders: orders || 0, revenue, products: products || 0, users: users || 0 })
      setRecentOrders(orderData || [])
    }
    fetchStats()
  }, [])

  const formatPrice = (p) => `¥${Number(p).toLocaleString()}`

  const statusMap = {
    pending: { label: '待付款', cls: 'pending' },
    processing: { label: '处理中', cls: 'warning' },
    shipped: { label: '已发货', cls: 'success' },
    completed: { label: '已完成', cls: 'success' },
    cancelled: { label: '已取消', cls: 'draft' },
  }

  const statCards = [
    { label: '总订单数', value: stats.orders, icon: <ShoppingBag size={24} /> },
    { label: '总收入', value: formatPrice(stats.revenue), icon: <TrendingUp size={24} /> },
    { label: '在售产品', value: stats.products, icon: <Package size={24} /> },
    { label: '用户数量', value: stats.users, icon: <Users size={24} /> },
  ]

  return (
    <>
      <div className="stats-grid">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card"><div className="stat-icon">{s.icon}</div><div className="stat-info"><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div></div>
        ))}
      </div>
      <div className="dashboard-section">
        <h3 className="section-subtitle">最近订单</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>订单号</th><th>客户</th><th>金额</th><th>状态</th><th>日期</th></tr></thead>
            <tbody>
              {recentOrders.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>暂无订单</td></tr>}
              {recentOrders.map(o => (
                <tr key={o.id}><td>#{o.id}</td><td>{o.contact_name || '-'}</td><td>{formatPrice(o.total_price)}</td>
                  <td><span className={`status-badge ${(statusMap[o.status] || {}).cls || ''}`}>{(statusMap[o.status] || {}).label || o.status}</span></td>
                  <td>{new Date(o.created_at).toLocaleDateString('zh-CN')}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
