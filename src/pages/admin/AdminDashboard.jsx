import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import '../../App.css'

export default function AdminDashboard() {
  const stats = [
    { label: '总订单数', value: '1,284', change: '+12.5%', positive: true, icon: <ShoppingBag size={24} /> },
    { label: '总收入', value: '¥386,216', change: '+8.2%', positive: true, icon: <TrendingUp size={24} /> },
    { label: '今日访客', value: '2,456', change: '+23.1%', positive: true, icon: <Users size={24} /> },
    { label: '在售产品', value: '12', change: '+2', positive: true, icon: <Package size={24} /> },
  ]

  const recentOrders = [
    { id: '#RX-20260405-001', customer: '张三', product: 'RealmX Racing Edition', amount: '¥12,999', status: '已发货', statusClass: 'success' },
    { id: '#RX-20260405-002', customer: '李四', product: '备用电池 × 2', amount: '¥598', status: '处理中', statusClass: 'warning' },
    { id: '#RX-20260404-003', customer: '王五', product: 'RealmX Racing Edition + 训练轮', amount: '¥13,148', status: '已完成', statusClass: 'success' },
    { id: '#RX-20260404-004', customer: '赵六', product: '快速充电器', amount: '¥399', status: '待付款', statusClass: 'pending' },
  ]

  return (
    <>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-section">
        <h3 className="section-subtitle">销售趋势</h3>
        <div className="chart-placeholder">
          <TrendingUp size={48} style={{ opacity: 0.3 }} />
          <span>图表区域（可接入 Chart.js / ECharts）</span>
        </div>
      </div>
      <div className="dashboard-section">
        <h3 className="section-subtitle">最近订单</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>订单号</th><th>客户</th><th>产品</th><th>金额</th><th>状态</th></tr></thead>
            <tbody>{recentOrders.map((order, i) => (
              <tr key={i}><td>{order.id}</td><td>{order.customer}</td><td>{order.product}</td><td>{order.amount}</td><td><span className={`status-badge ${order.statusClass}`}>{order.status}</span></td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}
