import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FiMail, FiLock, FiEye, FiEyeOff,
  FiAlertCircle, FiBookOpen, FiLogIn,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

/* ── Firebase error → friendly message ─────────────────── */
function friendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.'
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support.'
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  /* ── form state ── */
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  /* ── validation ── */
  const [touched, setTouched] = useState({ email: false, password: false })
  const emailErr    = touched.email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const passwordErr = touched.password && password.length < 6
  const formValid   = !emailErr && !passwordErr && email && password

  /* ── submit ── */
  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!formValid) return
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="orb-1" />
      <div className="orb-2" />

      <div className="auth-card">
        {/* Brand */}
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon"><FiBookOpen size={18} /></div>
          <span className="auth-brand-name">Notes<span>Arena</span></span>
        </Link>

        <h1 className="auth-title">Welcome back 👋</h1>
        <p className="auth-subtitle">Sign in to continue to your notes.</p>

        {/* Error alert */}
        {error && (
          <div className="auth-alert error" role="alert">
            <FiAlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" size={16} />
              <input
                id="login-email"
                type="email"
                className={`form-input ${emailErr ? 'input-error' : touched.email && email ? 'input-valid' : ''}`}
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                autoComplete="email"
              />
            </div>
            {emailErr && (
              <span className="field-error">
                <FiAlertCircle size={12} /> Enter a valid email address
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" size={16} />
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                className={`form-input has-toggle ${passwordErr ? 'input-error' : touched.password && password ? 'input-valid' : ''}`}
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {passwordErr && (
              <span className="field-error">
                <FiAlertCircle size={12} /> Password must be at least 6 characters
              </span>
            )}
          </div>

          {/* Forgot password */}
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading
              ? <span className="spinner" />
              : <><FiLogIn size={17} /> Sign In</>
            }
          </button>
        </form>

        <div className="auth-divider" style={{ marginTop: 24 }}>or</div>

        <p className="auth-footer" style={{ marginTop: 20 }}>
          Don&rsquo;t have an account?{' '}
          <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  )
}
