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

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        window.location.href = profile?.role === 'admin' ? '/admin' : '/'
        return
      }
      navigate('/')
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? '邮箱或密码错误' : err.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-logo-link">
          <span className="logo-text">RealmX</span>
        </Link>

        <h1 className="login-title">{isLogin ? '登录 RealmX 账号' : '注册 RealmX 账号'}</h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="login-field">
              <label>用户名</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="请输入用户名" required />
            </div>
          )}
          <div className="login-field">
            <label>邮箱</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="请输入邮箱" required />
          </div>
          <div className="login-field">
            <label>密码</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={isLogin ? '请输入密码' : '至少6位密码'} required minLength={6} />
          </div>

          <button type="submit" className="login-btn" disabled={loading || !email || !password || (!isLogin && !username)}>
            {loading ? '请稍候...' : (isLogin ? '登录' : '注册')}
          </button>
        </form>

        <p className="login-switch">
          {isLogin ? '新用户？' : '已有账号？'}
          <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="login-switch-btn">
            {isLogin ? '注册 RealmX 账号' : '登录'}
          </button>
        </p>
      </div>
    </div>
  )
}
