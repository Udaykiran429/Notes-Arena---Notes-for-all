import { Link } from 'react-router-dom'
import { FiMessageCircle } from 'react-icons/fi'
import './ChatButton.css'

export default function ChatButton() {
  return (
    <Link to="/chat" className="chat-button" aria-label="Open chat assistant">
      <div className="chat-button__icon">
        <FiMessageCircle size={20} />
      </div>
      <span className="chat-button__label">Chat</span>
    </Link>
  )
}
