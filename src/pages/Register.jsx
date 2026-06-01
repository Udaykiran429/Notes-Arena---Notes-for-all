import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiAlertCircle, FiCheckCircle, FiBookOpen, FiUserPlus,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

/* ── Password strength scorer ───────────────────────────── */
function getStrength(pw) {
  let score = 0
  if (pw.length >= 8)              score++
  if (/[A-Z]/.test(pw))           score++
  if (/[0-9]/.test(pw))           score++
  if (/[^A-Za-z0-9]/.test(pw))    score++
  return score   // 0-4
}
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLORS = ['', '#ff4d6d', '#ff9f43', '#ffd32a', '#00d4aa']
const STRENGTH_WIDTHS = ['0%', '25%', '50%', '75%', '100%']

/* ── Firebase error → friendly message ─────────────────── */
function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export default function Register() {
  const { register, updateDisplayName } = useAuth()
  const navigate = useNavigate()

  /* ── form state ── */
  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [agreed, setAgreed]         = useState(false)
  const [showPw, setShowPw]         = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState(false)

  /* ── touched tracking ── */
  const [touched, setTouched] = useState({
    firstName: false, lastName: false,
    email: false, password: false, confirm: false,
  })
  const touch = (field) => setTouched(t => ({ ...t, [field]: true }))

  /* ── validation ── */
  const firstNameErr = touched.firstName && firstName.trim().length < 2
  const lastNameErr  = touched.lastName  && lastName.trim().length < 2
  const emailErr     = touched.email     && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const passwordErr  = touched.password  && password.length < 6
  const confirmErr   = touched.confirm   && confirm !== password
  const strength     = getStrength(password)
  const formValid    = !firstNameErr && !lastNameErr && !emailErr &&
                       !passwordErr  && !confirmErr  &&
                       firstName && lastName && email && password && confirm && agreed

  /* ── submit ── */
  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirm: true })
    if (!formValid) return
    setError('')
    setLoading(true)
    try {
      const { user } = await register(email, password)
      await updateDisplayName(`${firstName.trim()} ${lastName.trim()}`)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1500)
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

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Join thousands of students sharing knowledge.</p>

        {/* Error / Success alerts */}
        {error && (
          <div className="auth-alert error" role="alert">
            <FiAlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            {error}
          </div>
        )}
        {success && (
          <div className="auth-alert success" role="status">
            <FiCheckCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            Account created! Redirecting to your dashboard…
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Name row */}
          <div className="form-row">
            {/* First name */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-firstname">First name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" size={15} />
                <input
                  id="reg-firstname"
                  type="text"
                  className={`form-input ${firstNameErr ? 'input-error' : touched.firstName && firstName ? 'input-valid' : ''}`}
                  placeholder="Riya"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  onBlur={() => touch('firstName')}
                  autoComplete="given-name"
                />
              </div>
              {firstNameErr && (
                <span className="field-error"><FiAlertCircle size={12} /> Too short</span>
              )}
            </div>

            {/* Last name */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-lastname">Last name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" size={15} />
                <input
                  id="reg-lastname"
                  type="text"
                  className={`form-input ${lastNameErr ? 'input-error' : touched.lastName && lastName ? 'input-valid' : ''}`}
                  placeholder="Sharma"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  onBlur={() => touch('lastName')}
                  autoComplete="family-name"
                />
              </div>
              {lastNameErr && (
                <span className="field-error"><FiAlertCircle size={12} /> Too short</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" size={16} />
              <input
                id="reg-email"
                type="email"
                className={`form-input ${emailErr ? 'input-error' : touched.email && email ? 'input-valid' : ''}`}
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => touch('email')}
                autoComplete="email"
              />
            </div>
            {emailErr && (
              <span className="field-error"><FiAlertCircle size={12} /> Enter a valid email</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" size={16} />
              <input
                id="reg-password"
                type={showPw ? 'text' : 'password'}
                className={`form-input has-toggle ${passwordErr ? 'input-error' : touched.password && password ? 'input-valid' : ''}`}
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => touch('password')}
                autoComplete="new-password"
              />
              <button type="button" className="input-toggle"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide' : 'Show'}>
                {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {/* Strength meter */}
            {password.length > 0 && (
              <>
                <div className="strength-bar">
                  <div className="strength-bar-fill" style={{
                    width: STRENGTH_WIDTHS[strength],
                    background: STRENGTH_COLORS[strength],
                  }} />
                </div>
                <span className="strength-label" style={{ color: STRENGTH_COLORS[strength] }}>
                  {STRENGTH_LABELS[strength]}
                </span>
              </>
            )}
            {passwordErr && (
              <span className="field-error"><FiAlertCircle size={12} /> At least 6 characters</span>
            )}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" size={16} />
              <input
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                className={`form-input has-toggle ${confirmErr ? 'input-error' : touched.confirm && confirm && !confirmErr ? 'input-valid' : ''}`}
                placeholder="Repeat password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onBlur={() => touch('confirm')}
                autoComplete="new-password"
              />
              <button type="button" className="input-toggle"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? 'Hide' : 'Show'}>
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {confirmErr && (
              <span className="field-error"><FiAlertCircle size={12} /> Passwords do not match</span>
            )}
          </div>

          {/* Terms */}
          <label className="form-check">
            <input
              type="checkbox"
              id="reg-terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
            />
            <span className="check-label">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit-btn"
            className="btn btn-primary auth-submit"
            disabled={loading || success}
          >
            {loading
              ? <span className="spinner" />
              : <><FiUserPlus size={17} /> Create Account</>
            }
          </button>
        </form>

        <div className="auth-divider" style={{ marginTop: 24 }}>or</div>
        <p className="auth-footer" style={{ marginTop: 20 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
