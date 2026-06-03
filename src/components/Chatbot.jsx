import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSend, FiMessageCircle, FiLoader, FiX } from 'react-icons/fi'
import './Chatbot.css'

const FALLBACK_RESPONSES = [
  { keywords: ['upload', 'pdf', 'file'], answer: 'The upload feature is temporarily disabled while we improve it. Use the Browse section to view available notes, and check back soon for uploads.' },
  { keywords: ['bcom', 'bca', 'bba', 'bsc', 'semester', 'branch'], answer: 'You can browse notes by selecting a college group and semester in the Groups section. Each card shows the PDF title and direct Drive link.' },
  { keywords: ['login', 'register', 'sign in', 'account'], answer: 'Sign in or register to access the dashboard and upload features. If you do not have an account yet, use the Get Started button to create one.' },
  { keywords: ['dashboard', 'profile'], answer: 'The dashboard is your student hub for saved notes and note management. You must be logged in to visit it.' },
]

function getFallbackAnswer(question) {
  const lower = question.toLowerCase()
  const matched = FALLBACK_RESPONSES.find(item =>
    item.keywords.some(keyword => lower.includes(keyword))
  )
  return matched
    ? matched.answer
    : 'I can help with questions about Notes Arena navigation, groups, semesters, and the upload status. If you want richer AI responses, add a valid OpenAI API key to VITE_OPENAI_API_KEY.'
}

async function fetchOpenAIResponse(question) {
  const key = import.meta.env.VITE_OPENAI_API_KEY
  if (!key) {
    return getFallbackAnswer(question)
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for Notes Arena. Answer user questions about the site, note browsing, college groups, semesters, upload status, login, and navigation.'
        },
        { role: 'user', content: question }
      ],
      temperature: 0.6,
      max_tokens: 400
    })
  })

  if (!response.ok) {
    throw new Error('AI request failed')
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate an answer.'
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! Ask me anything about Notes Arena and I will answer questions about the site, available notes, groups, and how to use it.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim()
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const reply = await fetchOpenAIResponse(userMessage.content)
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error(err)
      setError('Sorry, I could not fetch an answer right now. Please try again.')
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getFallbackAnswer(userMessage.content)
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot-page">
      <div className="chatbot-card animate-fade-up">
        <div className="chatbot-header">
          <div>
            <h1>Notes Arena Assistant</h1>
            <p>Ask anything about the site, groups, semesters, and note browsing.</p>
          </div>
          <div className="chatbot-header-actions">
            <div className="chatbot-header-icon">
              <FiMessageCircle size={24} />
            </div>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={() => navigate('/')}
              aria-label="Close chat"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-message chatbot-message--${message.role}`}
            >
              <div className="chatbot-message-content">{message.content}</div>
            </div>
          ))}
        </div>

        {error && <div className="chatbot-error">{error}</div>}

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            aria-label="Chat question"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><FiLoader className="spinner" /> Sending...</> : <><FiSend /> Send</>}
          </button>
        </form>

        {!import.meta.env.VITE_OPENAI_API_KEY && (
          <div className="chatbot-note">
            Add a valid OpenAI API key in `VITE_OPENAI_API_KEY` to enable richer AI-powered answers.
          </div>
        )}
      </div>
    </div>
  )
}
