import { useState } from 'react'
import './GroupNotes.css'

const GROUPS = [
  { id: 'bca', label: 'BCA', description: 'Bachelor of Computer Applications notes for every semester.' },
  { id: 'bba', label: 'BBA', description: 'Bachelor of Business Administration notes for every semester.' },
  { id: 'bcom', label: 'BCOM', description: 'Bachelor of Commerce notes for every semester.' },
  { id: 'bsc', label: 'BSc', description: 'Bachelor of Science notes for every semester.' },
]

const SEMESTERS = [
  'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'
]

const GROUP_NOTES = {
  bca: {
    'Sem 1': [
      { title: '(R17A1204) Artificial Intelligence.pdf', url: 'https://drive.google.com/file/d/1hcwwL77EicfmtO2ADviKFUPCWWdo1Dvp/view?usp=drive_link' },
      { title: 'DIGITAL SIGNAL PROCESSING_30112018.pdf', url: 'https://drive.google.com/file/d/1pFekkBj-GqS7B7ihhh00EaDUJtQabln7/view?usp=drive_link' },
      { title: 'Fundamentals of Cyber Security.pdf', url: 'https://drive.google.com/file/d/1FdMi-8WU5yLvaHmBaY7Sm1ZR_yhsW3wr/view?usp=drive_link' },
      { title: 'DATA STRUCTURES DIGITAL NOTES.pdf', url: 'https://drive.google.com/file/d/1U_VI76qb-b1AZ-oSEbXEbPDdRlSrH0aY/view?usp=drive_link' },
      { title: 'Artificial Intelligence in Mechanical Engineering.pdf', url: 'https://drive.google.com/file/d/1dGUAjNexLdryMu9KkIKk3FdT5tl6r-iv/view?usp=drive_link' },
    ],
    'Sem 2': [],
    'Sem 3': [],
    'Sem 4': [],
    'Sem 5': [],
    'Sem 6': [],
  },
  bba: {
    'Sem 1': [
      { title: '__PG_Computer Applications_315 21 Accounting and Financial Management_5777.pdf', url: 'https://drive.google.com/file/d/1bfXX8Nu9Px2QtgynXopj3bagGdYyzghM/view?usp=drive_link' },
      { title: 'Business economics.pdf', url: 'https://drive.google.com/file/d/1SIAOmUQ7kSRu_9xTRk2hHujCB4Q7jKsB/view?usp=drive_link' },
      { title: 'HRM.pdf', url: 'https://drive.google.com/file/d/1mYciGcukKS8ZBDsfgDgXlS3m6LUjMA2n/view?usp=drive_link' },
      { title: 'Marketing management.pdf', url: 'https://drive.google.com/file/d/1lVTABSh0hSEH9QCAt9f8K22BPrhyH77S/view?usp=drive_link' },
      { title: 'principles of managment.pdf', url: 'https://drive.google.com/file/d/1jaokjwviLnmufRrRZMjDL1cCeE9QAg4M/view?usp=drive_link' },
    ],
    'Sem 2': [],
    'Sem 3': [],
    'Sem 4': [],
    'Sem 5': [],
    'Sem 6': [],
  },
  bcom: {
    'Sem 1': [
      { title: 'SLM-B.COM - INCOME TAX AND GST.pdf', url: 'https://drive.google.com/file/d/1roWe2gmN8hQ3AS_nb_koDnCIHlNhejD0/view?usp=drive_link' },
      { title: 'financial accounting bcom.pdf', url: 'https://drive.google.com/file/d/1RhWOI4czeD33QOqpnavJNd-InGI3QBoA/view?usp=drive_link' },
      { title: 'Cost and Management Accounting bcom.pdf', url: 'https://drive.google.com/file/d/1pGHYYbrNCA9nf9TLFqG1cbWc8h1tj95L/view?usp=drive_link' },
      { title: 'Business law bcom.pdf', url: 'https://drive.google.com/file/d/1UU4f8p4bDHIQY9JCsS_FNV81xegwye_Y/view?usp=drive_link' },
      { title: 'Business economics.pdf', url: 'https://drive.google.com/file/d/1SIAOmUQ7kSRu_9xTRk2hHujCB4Q7jKsB/view?usp=drive_link' },
    ],
    'Sem 2': [],
    'Sem 3': [],
    'Sem 4': [],
    'Sem 5': [],
    'Sem 6': [],
  },
  bsc: {
    'Sem 1': [
      { title: 'DBMS.pdf', url: 'https://drive.google.com/file/d/1dQLhmkfneZS0ENydk3fYBrvBPiy4M1CV/view?usp=drive_link' },
      { title: 'OPERATING SYSTEMS NOTES R18.pdf', url: 'https://drive.google.com/file/d/1b9XAWEgDXBQvQjKJkWzweQ4eJH7XstaX/view?usp=drive_link' },
      { title: 'Power Systems-II.pdf', url: 'https://drive.google.com/file/d/1yU0ISVKN6TMc373HKvBaOM-t4HVcS4cG/view?usp=drive_link' },
      { title: 'Innovation, Start-Up & Entrepreneurship.pdf', url: 'https://drive.google.com/file/d/1K396hnSwwj5BPyYiAPHJBEO-Msug_FHC/view?usp=drive_link' },
      { title: 'COMPUTER NETWORKS NOTES.pdf', url: 'https://drive.google.com/file/d/1aBU6VSgluMeOe0pJUyfxtgQz6QGtug1-/view?usp=drive_link' },
    ],
    'Sem 2': [],
    'Sem 3': [],
    'Sem 4': [],
    'Sem 5': [],
    'Sem 6': [],
  },
}

export default function GroupNotes() {
  const [activeGroup, setActiveGroup] = useState('bca')
  const [activeSemester, setActiveSemester] = useState('Sem 1')

  const notes = GROUP_NOTES[activeGroup]?.[activeSemester] ?? []
  const currentGroup = GROUPS.find((g) => g.id === activeGroup)

  return (
    <section className="group-notes section" id="groups">
      <div className="container">
        <div className="group-notes__header">
          <span className="badge badge-purple">College Groups</span>
          <h2 className="section-title">Only BCA, BBA, BCOM & BSc Notes</h2>
          <p className="section-sub">
            Select your group and semester to open the matching PDF notes list. Click any drive link to download.
          </p>
        </div>

        <div className="group-tabs">
          {GROUPS.map((group) => (
            <button
              key={group.id}
              className={`group-tab ${activeGroup === group.id ? 'active' : ''}`}
              onClick={() => {
                setActiveGroup(group.id)
                setActiveSemester('Sem 1')
              }}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="group-notes__info">
          <p>{currentGroup?.description}</p>
        </div>

        <div className="semester-buttons">
          {SEMESTERS.map((semester) => (
            <button
              key={semester}
              className={`semester-btn ${activeSemester === semester ? 'active' : ''}`}
              onClick={() => setActiveSemester(semester)}
            >
              {semester}
            </button>
          ))}
        </div>

        <div className="semester-panel">
          <div className="semester-panel__header">
            <div>
              <span className="badge badge-teal">Selected</span>
              <h3>{currentGroup?.label} • {activeSemester}</h3>
            </div>
            <span className="semester-count">{notes.length} note{notes.length === 1 ? '' : 's'}</span>
          </div>

          {notes.length === 0 ? (
            <div className="semester-empty">
              <p>These notes will be uploaded soon.</p>
              <p>Check back later for the latest files for this semester.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note, index) => (
                <article key={note.title + index} className="note-box">
                  <div>
                    <h4>{note.title}</h4>
                    <p>Drive link for download</p>
                  </div>
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Download PDF
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
