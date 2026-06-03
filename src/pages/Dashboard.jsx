import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiBookOpen, FiUpload, FiLogOut,
  FiTrendingUp, FiDownload, FiBookmark, FiGrid,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const QUICK_STATS = [
  { icon: <FiDownload />, label: 'Downloads',  value: '0',   color: '#6c63ff' },
  { icon: <FiUpload />,   label: 'Uploaded',   value: '0',   color: '#00d4aa' },
  { icon: <FiBookmark />, label: 'Bookmarks',  value: '0',   color: '#ff6b9d' },
  { icon: <FiTrendingUp />,label: 'Points',    value: '0',   color: '#ff9f43' },
]

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : currentUser?.email?.[0]?.toUpperCase() ?? '?'

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await logout()
      navigate('/login')
    } catch {
      setLoggingOut(false)
    }
  }

  return (
    <div className="dash-page">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <Link to="/" className="dash-logo">
          <div className="dash-logo-icon"><FiBookOpen size={18} /></div>
          <span>Notes<span className="logo-accent">Arena</span></span>
        </Link>

        <nav className="dash-nav">
          <a href="#" className="dash-nav-item dash-nav-item--active" id="dash-overview">
            <FiGrid size={18} /> Overview
          </a>
          <a href="#" className="dash-nav-item" id="dash-my-notes">
            <FiBookOpen size={18} /> My Notes
          </a>
          <a href="#" className="dash-nav-item" id="dash-bookmarks">
            <FiBookmark size={18} /> Bookmarks
          </a>
          <Link to="/upload" className="dash-nav-item" id="dash-upload">
            <FiUpload size={18} /> Upload
          </Link>
        </nav>

        {/* User info at bottom */}
        <div className="dash-user">
          <div className="dash-avatar">{initials}</div>
          <div className="dash-user-info">
            <p className="dash-user-name">{currentUser?.displayName || 'Student'}</p>
            <p className="dash-user-email">{currentUser?.email}</p>
          </div>
          <button
            className="dash-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sign out"
            id="dashboard-logout-btn"
          >
            <FiLogOut size={17} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <div>
            <h1 className="dash-greeting">
              Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Student'} 👋
            </h1>
            <p className="dash-greeting-sub">Here's your academic hub</p>
          </div>

          <div className="dash-topbar-actions">
            <Link to="/upload" className="btn btn-primary" id="dash-upload-btn">
              <FiUpload size={15} /> Upload Notes
            </Link>
          </div>
        </header>

        {/* Stats grid */}
        <div className="dash-stats">
          {QUICK_STATS.map(s => (
            <div className="dash-stat-card" key={s.label} style={{ '--stat-color': s.color }}>
              <div className="dash-stat-icon">{s.icon}</div>
              <div>
                <p className="dash-stat-value">{s.value}</p>
                <p className="dash-stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="dash-empty">
          <div className="dash-empty-icon">📚</div>
          <h2>Your notes journey starts here</h2>
          <p>Upload your first set of notes or browse the library to get started.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
            <Link to="/#groups" className="btn btn-primary">Browse Notes</Link>
            <Link to="/upload" className="btn btn-ghost">Upload Notes</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
