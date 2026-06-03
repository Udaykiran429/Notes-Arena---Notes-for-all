import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Chatbot from './components/Chatbot'
import ChatButton from './components/ChatButton'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        {/* Public routes */}
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
      <ChatButton />
    </div>
  )
}

export default App
