import { useState } from 'react'
import { FiSearch, FiSliders } from 'react-icons/fi'
import './SearchBar.css'

const SUGGESTIONS = [
  'Data Structures', 'Digital Electronics', 'Engineering Maths',
  'Operating Systems', 'Thermodynamics', 'Network Theory',
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const filtered = query.length > 0
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <section className="searchbar-section section">
      <div className="container">
        <div className="searchbar-wrapper">
          <p className="searchbar-label">🔍 What are you looking for today?</p>
          <div className={`searchbar ${focused ? 'searchbar--focused' : ''}`}>
            <FiSearch className="searchbar__icon" size={20} />
            <input
              id="search-input"
              type="text"
              placeholder="Search notes by subject, topic, or branch…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              autoComplete="off"
            />
            <button className="searchbar__filter-btn" id="search-filter-btn">
              <FiSliders size={18} /> Filters
            </button>
            <button className="searchbar__submit btn btn-primary" id="search-submit-btn">
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {focused && filtered.length > 0 && (
            <ul className="searchbar__suggestions">
              {filtered.map(s => (
                <li
                  key={s}
                  className="searchbar__suggestion-item"
                  onMouseDown={() => setQuery(s)}
                >
                  <FiSearch size={14} />
                  {s}
                </li>
              ))}
            </ul>
          )}

          {/* Popular tags */}
          <div className="searchbar__tags">
            <span className="tags-label">Popular:</span>
            {SUGGESTIONS.slice(0, 5).map(tag => (
              <button
                key={tag}
                className="tag-pill"
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
