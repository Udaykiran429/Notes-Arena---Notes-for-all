import { FiArrowRight, FiStar } from 'react-icons/fi'
import './Hero.css'

const STATS = [
  { value: '12,000+', label: 'Notes Shared' },
  { value: '5 Branches', label: 'Covered' },
  { value: '8,500+', label: 'Students' },
]

export default function Hero() {
  return (
    <section className="hero">
      {/* Orbs */}
      <div className="orb hero__orb-1" />
      <div className="orb hero__orb-2" />
      <div className="orb hero__orb-3" />

      <div className="container hero__content">
        {/* Badge */}
        <div className="hero__badge animate-fade-up" style={{ animationDelay: '0s' }}>
          <FiStar size={13} />
          <span>The #1 Academic Notes Platform</span>
        </div>

        {/* Heading */}
        <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Ace Your Exams with
          <br />
          <span className="hero__title-gradient">Shared Knowledge</span>
        </h1>

        <p className="hero__subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Upload, discover, and download high‑quality academic notes from peers across
          BCA, CSE, ECE, EEE, and Mechanical — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="hero__ctas animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a href="#branches" className="btn btn-primary hero__cta-main" id="hero-browse-btn">
            Browse Notes <FiArrowRight size={18} />
          </a>
          <button className="btn btn-ghost hero__cta-secondary" id="hero-upload-btn">
            Upload Your Notes
          </button>
        </div>

        {/* Stats */}
        <div className="hero__stats animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {STATS.map((s) => (
            <div className="hero__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
