import '../../App.css'

export default function AdminProducts() {
  const products = [
    { id: 1, name: 'RealmX Racing Edition', category: '整机', price: '¥12,999', stock: 156, status: '在售', statusClass: 'success' },
    { id: 2, name: '备用电池', category: '配件', price: '¥299', stock: 520, status: '在售', statusClass: 'success' },
    { id: 3, name: '备用桨叶套装', category: '配件', price: '¥99', stock: 1200, status: '在售', statusClass: 'success' },
    { id: 4, name: '快速充电器', category: '配件', price: '¥399', stock: 89, status: '在售', statusClass: 'success' },
    { id: 5, name: '训练轮套装', category: '配件', price: '¥149', stock: 340, status: '在售', statusClass: 'success' },
    { id: 6, name: '碳纤维机壳', category: '配件', price: '¥599', stock: 0, status: '缺货', statusClass: 'warning' },
  ]
  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h3 className="section-subtitle">产品列表</h3>
        <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>+ 添加产品</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>名称</th><th>分类</th><th>价格</th><th>库存</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>{products.map(p => (
            <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>{p.price}</td><td>{p.stock}</td><td><span className={`status-badge ${p.statusClass}`}>{p.status}</span></td>
              <td><div className="action-buttons"><button className="action-btn view">查看</button><button className="action-btn edit">编辑</button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
