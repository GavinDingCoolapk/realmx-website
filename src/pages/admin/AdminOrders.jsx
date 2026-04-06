import '../../App.css'

export default function AdminOrders() {
  const orders = [
    { id: '#RX-20260405-001', customer: '张三', product: 'RealmX Racing Edition', amount: '¥12,999', date: '2026-04-05', status: '已发货', statusClass: 'success' },
    { id: '#RX-20260405-002', customer: '李四', product: '备用电池 × 2', amount: '¥598', date: '2026-04-05', status: '处理中', statusClass: 'warning' },
    { id: '#RX-20260404-003', customer: '王五', product: 'RealmX Racing Edition + 训练轮', amount: '¥13,148', date: '2026-04-04', status: '已完成', statusClass: 'success' },
    { id: '#RX-20260404-004', customer: '赵六', product: '快速充电器', amount: '¥399', date: '2026-04-04', status: '待付款', statusClass: 'pending' },
    { id: '#RX-20260403-005', customer: '孙七', product: '备用桨叶套装 × 3', amount: '¥297', date: '2026-04-03', status: '已取消', statusClass: 'draft' },
    { id: '#RX-20260403-006', customer: '周八', product: 'RealmX Racing Edition', amount: '¥12,999', date: '2026-04-03', status: '已完成', statusClass: 'success' },
  ]
  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h3 className="section-subtitle">订单列表</h3>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>订单号</th><th>客户</th><th>产品</th><th>金额</th><th>日期</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>{orders.map((o, i) => (
            <tr key={i}><td>{o.id}</td><td>{o.customer}</td><td>{o.product}</td><td>{o.amount}</td><td>{o.date}</td><td><span className={`status-badge ${o.statusClass}`}>{o.status}</span></td>
              <td><div className="action-buttons"><button className="action-btn view">详情</button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
