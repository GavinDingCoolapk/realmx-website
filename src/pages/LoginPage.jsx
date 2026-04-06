import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('realmx_auth', 'true')
      navigate('/admin')
    } else {
      setError('用户名或密码错误')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <span className="logo-text">RealmX</span>
        </div>
        <h1 className="login-title">管理后台</h1>
        <p className="login-subtitle">请登录以继续</p>
        {error && <div className="login-error">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="请输入用户名" />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" />
          </div>
          <button type="submit" className="btn-primary btn-full" style={{ marginTop: '0.5rem' }}>登录</button>
        </form>
        <p className="login-hint">Demo 账号: admin / admin123</p>
        <Link to="/" className="login-back">← 返回首页</Link>
      </div>
    </div>
  )
}
