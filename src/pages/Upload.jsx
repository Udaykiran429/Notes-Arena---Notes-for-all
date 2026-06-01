import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  FiUploadCloud, FiBook, FiBookOpen, FiArrowLeft, 
  FiFileText, FiTrash2, FiAlertCircle, FiCheckCircle 
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { db, storage } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import './Upload.css'

const BRANCHES = ['BCA', 'CSE', 'ECE', 'EEE', 'Mechanical']
const SEMESTERS = [
  'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
  'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'
]

export default function Upload() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // Form states
  const [title, setTitle] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  
  // Status states
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Handlers for drag & drop
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (selectedFile) => {
    setError('')
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.')
      return
    }
    if (selectedFile.size > 15 * 1024 * 1024) { // 15MB limit
      setError('File size exceeds the 15MB limit.')
      return
    }
    setFile(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !branch || !semester || !subject || !file) {
      setError('Please fill in all required fields and upload a PDF.')
      return
    }

    setUploading(true)
    setError('')
    setProgress(0)

    try {
      // 1. Upload file to Firebase Storage
      const fileRef = ref(storage, `notes/${Date.now()}_${file.name}`)
      const uploadTask = uploadBytesResumable(fileRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(pct)
        },
        (err) => {
          console.error('Storage error:', err)
          setError('Failed to upload file. Please try again.')
          setUploading(false)
        },
        async () => {
          // 2. File uploaded successfully, get download URL
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

          // 3. Save metadata to Firestore
          const noteData = {
            title,
            branch,
            semester,
            subject,
            description: description.trim(),
            fileUrl: downloadUrl,
            fileName: file.name,
            fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            uploadedBy: {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || 'Anonymous Student'
            },
            createdAt: serverTimestamp(),
            downloads: 0,
            likes: 0,
            views: 0
          }

          await addDoc(collection(db, 'notes'), noteData)
          
          setUploading(false)
          setSuccess(true)
          
          // Clear inputs
          setTitle('')
          setBranch('')
          setSemester('')
          setSubject('')
          setDescription('')
          setFile(null)
        }
      )

    } catch (err) {
      console.error('Firestore/App error:', err)
      setError('An error occurred. Please try again.')
      setUploading(false)
    }
  }

  return (
    <div className="upload-page">
      {/* Decorative Orbs */}
      <div className="orb upload-orb-1" />
      <div className="orb upload-orb-2" />
      
      <div className="upload-container animate-fade-up">
        {/* Header link back to dashboard */}
        <div className="upload-header">
          <Link to="/dashboard" className="btn btn-back">
            <FiArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="logo-sm">
            <FiBookOpen size={18} />
            <span>Notes<span className="logo-accent">Arena</span></span>
          </div>
        </div>

        {success ? (
          <div className="success-state animate-fade-in">
            <div className="success-icon"><FiCheckCircle size={48} /></div>
            <h2>Notes Uploaded Successfully!</h2>
            <p>Your peer academic contribution is highly appreciated. Other students can now discover and download your notes!</p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => setSuccess(false)}>
                Upload More Notes
              </button>
              <Link to="/dashboard" className="btn btn-ghost">
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="upload-card">
            <div className="upload-card__header">
              <h1>Upload Study Notes</h1>
              <p>Share high-quality study materials, exam answers, or subject notes to aid the community.</p>
            </div>

            {error && (
              <div className="alert alert-error animate-fade-in">
                <FiAlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="upload-form">
              {/* Note Title */}
              <div className="form-group">
                <label className="form-label">Note Title *</label>
                <div className="input-wrapper">
                  <FiBook className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Operating Systems Complete Lecture Notes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={uploading}
                  />
                </div>
              </div>

              {/* Grid for Branch and Semester */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Branch *</label>
                  <select
                    className="form-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    disabled={uploading}
                  >
                    <option value="" disabled>Select Branch</option>
                    {BRANCHES.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Semester *</label>
                  <select
                    className="form-select"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                    disabled={uploading}
                  >
                    <option value="" disabled>Select Semester</option>
                    {SEMESTERS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label className="form-label">Subject *</label>
                <div className="input-wrapper">
                  <FiBookOpen className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Computer Architecture"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    disabled={uploading}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Summarize what these notes cover (modules, special topics, questions, etc.)..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={uploading}
                />
              </div>

              {/* Drag & Drop File Upload */}
              <div className="form-group">
                <label className="form-label">PDF File Upload *</label>
                {!file ? (
                  <div
                    className={`drop-zone ${dragActive ? 'drop-zone--active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="file-hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="drop-zone__content">
                      <FiUploadCloud size={40} className="drop-icon" />
                      <p className="drop-title">Drag & drop your PDF file here</p>
                      <p className="drop-sub">or click to browse local files (Max 15MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="file-preview animate-fade-in">
                    <div className="file-preview__info">
                      <div className="file-preview__icon"><FiFileText size={24} /></div>
                      <div className="file-preview__details">
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!uploading && (
                      <button type="button" className="btn-remove" onClick={removeFile} title="Remove file">
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              {uploading && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="progress-text">
                    <span>Uploading your notes...</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              )}

              {/* Action Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="spinner" /> Uploading...
                  </>
                ) : (
                  'Publish Notes'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
