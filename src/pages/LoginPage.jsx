import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../App.css'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
      } else {
        if (!username.trim()) { setError('请输入用户名'); setLoading(false); return }
        const { error: authError } = await supabase.auth.signUp({
          email, password,
          options: { data: { username: username.trim() } }
        })
        if (authError) throw authError
        setError('')
        setLoading(false)
        alert('注册成功！请查收邮箱确认链接，确认后即可登录。')
        return
      }

      // 检查是否是 admin
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

      navigate(profile?.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? '邮箱或密码错误'
        : err.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Link to="/" className="logo" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          <span className="logo-text">RealmX</span>
        </Link>

        <div className="login-card">
          <h2 className="login-title">{isLogin ? '登录' : '注册'}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>用户名</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="请输入用户名" required />
              </div>
            )}
            <div className="form-group">
              <label>邮箱</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="请输入邮箱" required />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={isLogin ? '请输入密码' : '至少6位密码'} required minLength={6} />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn-primary login-btn" disabled={loading} style={{ color: '#fff' }}>
              {loading ? '请稍候...' : (isLogin ? '登录' : '注册')}
            </button>
          </form>

          <p className="login-switch">
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="login-switch-btn">
              {isLogin ? '立即注册' : '去登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
