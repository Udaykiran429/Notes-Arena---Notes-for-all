import { FiBookOpen, FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi'
import './Footer.css'

const LINKS = {
  Platform: ['Browse Notes', 'Upload Notes', 'Top Contributors', 'Recent Uploads'],
  Branches: ['BCA', 'CSE', 'ECE', 'EEE', 'Mechanical'],
  Support: ['About Us', 'FAQ', 'Contact', 'Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><FiBookOpen size={18} /></div>
              <span>Notes<span className="logo-accent">Arena</span></span>
            </div>
            <p className="footer__tagline">
              The smart way for university students to share, discover, and learn
              from academic notes — together.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="GitHub" id="footer-github"><FiGithub size={20} /></a>
              <a href="#" aria-label="Twitter" id="footer-twitter"><FiTwitter size={20} /></a>
              <a href="#" aria-label="Instagram" id="footer-instagram"><FiInstagram size={20} /></a>
              <a href="#" aria-label="Email" id="footer-email"><FiMail size={20} /></a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div className="footer__col" key={group}>
              <h4 className="footer__col-title">{group}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="footer__link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <div className="newsletter-text">
            <h4>Stay in the loop 📬</h4>
            <p>Get notified when new notes drop for your branch.</p>
          </div>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="your@email.com"
              className="newsletter-input"
              id="newsletter-email"
            />
            <button className="btn btn-primary" id="newsletter-submit">Subscribe</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Notes Arena. Made with ❤️ for students.</p>
          <p className="footer__tech">Built with React + Vite · Firebase Ready</p>
        </div>
      </div>
    </footer>
  )
}
