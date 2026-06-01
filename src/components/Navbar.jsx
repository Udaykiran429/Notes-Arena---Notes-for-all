import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiBookOpen, FiMenu, FiX, FiUpload, FiLogIn,
  FiLogOut, FiUser, FiGrid, FiChevronDown,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : currentUser?.email?.[0]?.toUpperCase() ?? '?'

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon"><FiBookOpen size={20} /></div>
          <span>Notes<span className="logo-accent">Arena</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          <a href="#branches">Branches</a>
          <a href="#featured">Featured</a>
          <a href="#about">About</a>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost" id="nav-dashboard-btn">
                <FiGrid size={16} /> Dashboard
              </Link>
              {/* User dropdown */}
              <div className="nav-user-dropdown" ref={dropRef}>
                <button
                  className="nav-user-btn"
                  onClick={() => setDropOpen(v => !v)}
                  id="nav-user-btn"
                >
                  <div className="nav-avatar">{initials}</div>
                  <span className="nav-user-name">
                    {currentUser.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <FiChevronDown size={14} className={dropOpen ? 'chevron-up' : ''} />
                </button>
                {dropOpen && (
                  <div className="nav-dropdown-menu">
                    <p className="nav-dropdown-email">{currentUser.email}</p>
                    <hr className="nav-dropdown-divider" />
                    <Link to="/dashboard" className="nav-dropdown-item" onClick={() => setDropOpen(false)}>
                      <FiUser size={14} /> My Profile
                    </Link>
                    <button className="nav-dropdown-item nav-dropdown-logout" onClick={handleLogout}>
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/upload" className="btn btn-ghost" id="nav-upload-btn">
                <FiUpload size={16} /> Upload Notes
              </Link>
              <Link to="/login" className="btn btn-ghost" id="nav-login-btn">
                <FiLogIn size={16} /> Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" id="nav-register-btn">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          id="hamburger-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-links">
          <a href="#branches" onClick={() => setMenuOpen(false)}>Branches</a>
          <a href="#featured" onClick={() => setMenuOpen(false)}>Featured</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <div className="mobile-actions">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost btn-full" onClick={() => setMenuOpen(false)}>
                  <FiGrid size={16} /> Dashboard
                </Link>
                <button className="btn btn-ghost btn-full" onClick={handleLogout}>
                  <FiLogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-full" onClick={() => setMenuOpen(false)}>
                  <FiLogIn size={16} /> Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
