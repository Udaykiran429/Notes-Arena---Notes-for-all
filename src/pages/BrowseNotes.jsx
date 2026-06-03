import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebase/config'
import { FiDownload } from 'react-icons/fi'
import './BrowseNotes.css'

export default function BrowseNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const fetchNotes = async () => {
      setLoading(true)
      setError('')
      try {
        const snap = await getDocs(collection(db, 'notes'))
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        if (mounted) setNotes(data)
      } catch (err) {
        console.error('Failed to fetch notes', err)
        if (mounted) setError('Failed to load notes. Please try again.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchNotes()
    return () => { mounted = false }
  }, [])

  const handleDownload = async (note) => {
    if (!note.fileUrl) return
    try {
      window.open(note.fileUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('Open file error', err)
    }

    try {
      const refDoc = doc(db, 'notes', note.id)
      await updateDoc(refDoc, { downloads: increment(1) })
      setNotes(prev => prev.map(n => n.id === note.id ? { ...n, downloads: (n.downloads || 0) + 1 } : n))
    } catch (err) {
      console.error('Failed to increment downloads', err)
      setError('Could not update download count.')
    }
  }

  return (
    <div className="browse-page">
      <header className="browse-header">
        <h1>Browse Notes</h1>
        <p>Discover peer shared study materials across branches and semesters.</p>
      </header>

      {loading ? (
        <div className="status status-loading">Loading notes…</div>
      ) : error ? (
        <div className="status status-error">{error}</div>
      ) : (
        <section className="notes-grid">
          {notes.length === 0 && <div className="status status-empty">No notes available.</div>}
          {notes.map(note => (
            <article key={note.id} className="note-card glass">
              <div className="note-card__content">
                <h2 className="note-title">{note.title}</h2>
                <div className="note-meta">
                  <span className="chip">{note.branch}</span>
                  <span className="chip">{note.semester}</span>
                  <span className="chip">{note.subject}</span>
                </div>
                <p className="note-desc">{note.description}</p>
              </div>

              <div className="note-card__footer">
                <div className="uploader">Uploaded by: {note.uploadedBy?.displayName || note.uploadedBy?.email || 'Unknown'}</div>
                <div className="actions">
                  <button className="btn-download" onClick={() => handleDownload(note)}>
                    <FiDownload /> Download
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
