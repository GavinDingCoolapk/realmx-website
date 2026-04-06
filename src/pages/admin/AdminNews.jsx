import '../../App.css'

export default function AdminNews() {
  const news = [
    { id: 1, title: 'RealmX Racing Edition 正式发布', date: '2026-03-06', author: 'Admin', status: '已发布', statusClass: 'success' },
    { id: 2, title: 'RoboCup 2026 备战启动', date: '2026-02-15', author: 'Admin', status: '已发布', statusClass: 'success' },
    { id: 3, title: 'RealmX 与多所高校达成合作', date: '2026-01-20', author: 'Admin', status: '已发布', statusClass: 'success' },
    { id: 4, title: '2026 春季新品预告', date: '2026-04-01', author: 'Admin', status: '草稿', statusClass: 'draft' },
    { id: 5, title: '用户飞行技巧系列教程', date: '2026-04-03', author: 'Admin', status: '草稿', statusClass: 'draft' },
  ]
  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h3 className="section-subtitle">新闻管理</h3>
        <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>+ 发布新闻</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>标题</th><th>日期</th><th>作者</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>{news.map(n => (
            <tr key={n.id}><td>{n.id}</td><td>{n.title}</td><td>{n.date}</td><td>{n.author}</td><td><span className={`status-badge ${n.statusClass}`}>{n.status}</span></td>
              <td><div className="action-buttons"><button className="action-btn edit">编辑</button><button className="action-btn delete">删除</button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
