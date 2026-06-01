import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiAlertCircle, FiCheckCircle, FiBookOpen, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [sent, setSent]       = useState(false)
  const [touched, setTouched] = useState(false)

  const emailErr = touched && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (emailErr || !email) return
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Don't reveal whether email exists — show success anyway (security best practice)
        setSent(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
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

        <h1 className="auth-title">Reset password 🔑</h1>
        <p className="auth-subtitle">
          Enter your email and we&rsquo;ll send you a reset link.
        </p>

        {error && (
          <div className="auth-alert error" role="alert">
            <FiAlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            {error}
          </div>
        )}

        {sent ? (
          <div className="auth-alert success" role="status">
            <FiCheckCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            If that email exists, a reset link has been sent. Check your inbox (and spam).
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="forgot-email">Email address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" size={16} />
                <input
                  id="forgot-email"
                  type="email"
                  className={`form-input ${emailErr ? 'input-error' : touched && email ? 'input-valid' : ''}`}
                  placeholder="you@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  autoComplete="email"
                />
              </div>
              {emailErr && (
                <span className="field-error">
                  <FiAlertCircle size={12} /> Enter a valid email address
                </span>
              )}
            </div>

            <button
              type="submit"
              id="forgot-submit-btn"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="auth-footer" style={{ marginTop: 24 }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FiArrowLeft size={14} /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
