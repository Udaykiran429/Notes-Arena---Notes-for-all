import { FiArrowRight, FiFileText } from 'react-icons/fi'
import './BranchCards.css'

const BRANCHES = [
  {
    id: 'bca',
    name: 'BCA',
    full: 'Bachelor of Computer Applications',
    icon: '💻',
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(108,99,255,0.05))',
    border: 'rgba(108,99,255,0.3)',
    notes: 340,
    subjects: ['Programming', 'DBMS', 'Web Dev', 'AI Basics'],
  },
  {
    id: 'cse',
    name: 'CSE',
    full: 'Computer Science & Engineering',
    icon: '⚙️',
    color: '#00d4aa',
    gradient: 'linear-gradient(135deg, rgba(0,212,170,0.18), rgba(0,212,170,0.04))',
    border: 'rgba(0,212,170,0.3)',
    notes: 512,
    subjects: ['DSA', 'OS', 'Networks', 'Compilers'],
  },
  {
    id: 'ece',
    name: 'ECE',
    full: 'Electronics & Communication Engg.',
    icon: '📡',
    color: '#ff9f43',
    gradient: 'linear-gradient(135deg, rgba(255,159,67,0.18), rgba(255,159,67,0.04))',
    border: 'rgba(255,159,67,0.3)',
    notes: 278,
    subjects: ['Signals', 'VLSI', 'Microcontrollers', 'RF'],
  },
  {
    id: 'eee',
    name: 'EEE',
    full: 'Electrical & Electronics Engg.',
    icon: '⚡',
    color: '#ff6b9d',
    gradient: 'linear-gradient(135deg, rgba(255,107,157,0.18), rgba(255,107,157,0.04))',
    border: 'rgba(255,107,157,0.3)',
    notes: 224,
    subjects: ['Power Systems', 'Machines', 'Control', 'Drives'],
  },
  {
    id: 'mech',
    name: 'Mechanical',
    full: 'Mechanical Engineering',
    icon: '🔧',
    color: '#54a0ff',
    gradient: 'linear-gradient(135deg, rgba(84,160,255,0.18), rgba(84,160,255,0.04))',
    border: 'rgba(84,160,255,0.3)',
    notes: 196,
    subjects: ['Thermodynamics', 'Fluid Mech', 'Manufacturing', 'CAD'],
  },
]

export default function BranchCards() {
  return (
    <section className="branches section" id="branches">
      <div className="container">
        <div className="branches__header">
          <span className="badge badge-purple">📚 All Branches</span>
          <h2 className="section-title">Browse by Branch</h2>
          <p className="section-sub">
            Pick your discipline and dive into curated notes from top students.
          </p>
        </div>

        <div className="branches__grid">
          {BRANCHES.map((b, i) => (
            <div
              key={b.id}
              className="branch-card"
              style={{
                '--card-color': b.color,
                '--card-gradient': b.gradient,
                '--card-border': b.border,
                animationDelay: `${i * 0.08}s`,
              }}
              id={`branch-${b.id}`}
            >
              <div className="branch-card__top">
                <div className="branch-card__icon">{b.icon}</div>
                <span className="branch-card__count">
                  <FiFileText size={13} /> {b.notes} notes
                </span>
              </div>

              <h3 className="branch-card__name">{b.name}</h3>
              <p className="branch-card__full">{b.full}</p>

              <div className="branch-card__subjects">
                {b.subjects.map(s => (
                  <span key={s} className="subject-tag">{s}</span>
                ))}
              </div>

              <button className="branch-card__cta">
                Explore Notes <FiArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
