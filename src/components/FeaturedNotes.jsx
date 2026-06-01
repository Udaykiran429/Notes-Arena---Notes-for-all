import { FiDownload, FiHeart, FiEye, FiBookmark } from 'react-icons/fi'
import './FeaturedNotes.css'

const NOTES = [
  {
    id: 1, branch: 'CSE', color: '#00d4aa',
    subject: 'Data Structures & Algorithms',
    title: 'Complete DSA Notes – Arrays to Graphs',
    author: 'Riya Sharma', avatar: 'RS',
    downloads: 2840, likes: 312, views: '8.2K',
    pages: 94, rating: 4.9, tags: ['BFS', 'DFS', 'Trees'],
  },
  {
    id: 2, branch: 'BCA', color: '#6c63ff',
    subject: 'Database Management Systems',
    title: 'DBMS Master Notes + SQL Cheatsheet',
    author: 'Arjun Patel', avatar: 'AP',
    downloads: 1920, likes: 245, views: '5.7K',
    pages: 62, rating: 4.8, tags: ['SQL', 'Normalization', 'ER Diagram'],
  },
  {
    id: 3, branch: 'ECE', color: '#ff9f43',
    subject: 'Digital Signal Processing',
    title: 'DSP Solved Problems & Formulas',
    author: 'Priya Nair', avatar: 'PN',
    downloads: 1450, likes: 189, views: '4.1K',
    pages: 48, rating: 4.7, tags: ['FFT', 'Filters', 'Z-Transform'],
  },
  {
    id: 4, branch: 'Mechanical', color: '#54a0ff',
    subject: 'Thermodynamics',
    title: 'Thermodynamics Laws & Cycles – Complete',
    author: 'Karan Singh', avatar: 'KS',
    downloads: 1100, likes: 156, views: '3.3K',
    pages: 55, rating: 4.6, tags: ['Carnot', 'Entropy', 'Cycles'],
  },
  {
    id: 5, branch: 'EEE', color: '#ff6b9d',
    subject: 'Power Systems Analysis',
    title: 'Power Systems Short Notes & Diagrams',
    author: 'Meera Iyer', avatar: 'MI',
    downloads: 980, likes: 134, views: '2.9K',
    pages: 40, rating: 4.5, tags: ['Load Flow', 'Faults', 'Protection'],
  },
  {
    id: 6, branch: 'CSE', color: '#00d4aa',
    subject: 'Operating Systems',
    title: 'OS Concepts: Process, Memory, I/O',
    author: 'Dev Chopra', avatar: 'DC',
    downloads: 1680, likes: 198, views: '4.9K',
    pages: 78, rating: 4.8, tags: ['Scheduling', 'Paging', 'Deadlocks'],
  },
]

function StarRating({ rating }) {
  return (
    <span className="star-rating">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="star-value">{rating}</span>
    </span>
  )
}

export default function FeaturedNotes() {
  return (
    <section className="featured section" id="featured">
      <div className="container">
        <div className="featured__header">
          <span className="badge badge-teal">⭐ Trending Now</span>
          <h2 className="section-title">Featured Notes</h2>
          <p className="section-sub">
            Hand‑picked top-rated notes loved by thousands of students.
          </p>
        </div>

        <div className="featured__grid">
          {NOTES.map((note, i) => (
            <div
              key={note.id}
              className="note-card"
              style={{ '--note-color': note.color, animationDelay: `${i * 0.07}s` }}
              id={`note-card-${note.id}`}
            >
              {/* Branch tag */}
              <div className="note-card__branch" style={{ color: note.color, borderColor: note.color + '44', background: note.color + '14' }}>
                {note.branch}
              </div>

              <p className="note-card__subject">{note.subject}</p>
              <h3 className="note-card__title">{note.title}</h3>

              {/* Tags */}
              <div className="note-card__tags">
                {note.tags.map(t => (
                  <span key={t} className="note-tag">{t}</span>
                ))}
              </div>

              {/* Author row */}
              <div className="note-card__author">
                <div className="note-card__avatar" style={{ background: note.color + '33', color: note.color }}>
                  {note.avatar}
                </div>
                <div>
                  <p className="author-name">{note.author}</p>
                  <p className="author-meta">{note.pages} pages</p>
                </div>
                <StarRating rating={note.rating} />
              </div>

              {/* Stats row */}
              <div className="note-card__stats">
                <span><FiDownload size={13} /> {note.downloads.toLocaleString()}</span>
                <span><FiHeart size={13} /> {note.likes}</span>
                <span><FiEye size={13} /> {note.views}</span>
              </div>

              {/* Actions */}
              <div className="note-card__actions">
                <button className="btn btn-primary note-btn-download">
                  <FiDownload size={15} /> Download
                </button>
                <button className="note-btn-bookmark">
                  <FiBookmark size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="featured__footer">
          <button className="btn btn-ghost" id="view-all-btn">
            View All Notes →
          </button>
        </div>
      </div>
    </section>
  )
}
