import { FiBookOpen, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './Footer.css'

const LINKS = {
  Platform: ['Browse Notes', 'Upload Notes', 'Top Contributors', 'Recent Uploads'],
  Groups: ['BCA', 'BBA', 'BCOM', 'BSc'],
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
            <div className="footer__contact">
              <p className="footer__contact-title">Contact</p>
              <p><strong>Uday Kiran</strong></p>
              <p>Mail: <a href="mailto:boduguudayedu@gmail.com">boduguudayedu@gmail.com</a></p>
              <p>Mobile: <a href="tel:+919392662420">+91 93926 62420</a></p>
              <p>BCA student | Aspiring web developer | Integrating AI into web development</p>
              <p>Founder &amp; Creator, Notes Arena</p>
            </div>
            <div className="footer__socials">
              <a href="https://github.com/Udaykiran429" aria-label="GitHub" id="footer-github" target="_blank" rel="noopener noreferrer"><FiGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/udaykiran-bodugu-15001b363" aria-label="LinkedIn" id="footer-linkedin" target="_blank" rel="noopener noreferrer"><FiLinkedin size={20} /></a>
              <a href="mailto:boduguudayedu@gmail.com" aria-label="Email" id="footer-email"><FiMail size={20} /></a>
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
