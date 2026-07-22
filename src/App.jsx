import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import AuthPage from './components/Auth/AuthPage'
import Navbar from './components/shared/Navbar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import SpecimenAlbum from './pages/SpecimenAlbum'
import AIAdvisor from './pages/AIAdvisor'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 20, background: 'var(--bg-primary)',
      }}>
        <div style={{
          width: 64, height: 64, background: 'linear-gradient(135deg, #6b9e6b, #4a7c4a)',
          borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, animation: 'float 2s ease-in-out infinite',
          boxShadow: '0 8px 24px rgba(107,158,107,0.3)',
        }}>🌿</div>
        <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Loading DailyRoots...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/analytics" element={<Analytics user={user} />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/specimen-album" element={<SpecimenAlbum user={user} />} />
            <Route path="/ai-advisor" element={<AIAdvisor user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
