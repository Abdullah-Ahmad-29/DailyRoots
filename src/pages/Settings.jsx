import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Settings({ user }) {
  const [name, setName] = useState(user?.user_metadata?.full_name || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [soundMuted, setSoundMuted] = useState(localStorage.getItem('roots_sound_muted') === 'true')

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.auth.updateUser({ data: { full_name: name } })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleToggleSound = (val) => {
    setSoundMuted(val)
    localStorage.setItem('roots_sound_muted', val ? 'true' : 'false')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="fade-up">
      <div className="page-header">
        <h1>Settings ⚙️</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your account and preferences</p>
      </div>

      <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Profile */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, marginBottom: 20, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Profile</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input className="input" type="text" value={name}
                onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="input" type="email" value={user?.email || ''} disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Email cannot be changed here
              </span>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={saving}>
              {saving ? <span className="spinner" style={{ width: 16, height: 16 }} /> : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>
 
        {/* Preferences */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, marginBottom: 16, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Preferences</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>Audio Feedback</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                Play organic synth clicks and drip sounds on actions
              </div>
            </div>
            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: 44, height: 22 }}>
              <input 
                type="checkbox" 
                checked={!soundMuted} 
                onChange={(e) => handleToggleSound(!e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute', cursor: 'pointer', inset: 0,
                background: soundMuted ? 'rgba(11,28,14,0.06)' : 'var(--accent-amber)',
                transition: 'all 0.3s',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{
                  position: 'absolute', height: 16, width: 16,
                  left: soundMuted ? 3 : 23, bottom: 2,
                  background: soundMuted ? 'var(--text-muted)' : '#ffffff',
                  transition: 'all 0.3s'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* About */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, marginBottom: 16, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>About DailyRoots</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56,
              background: 'var(--bg-primary)',
              border: '1px solid rgba(197,240,21,0.35)',
              outline: '1.5px solid rgba(197,240,21,0.15)',
              outlineOffset: '2px',
              borderRadius: 0,
              display: 'flex', alignItems: 'center', justifycontent: 'center',
              fontSize: 28, boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>🌿</div>
            <div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 20, color: 'var(--text-primary)' }}>DailyRoots</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Version 1.0 · Built with ❤️</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
            DailyRoots is a habit tracker designed around the idea that consistency is like growing a root system — 
            invisible at first, but the foundation of everything strong.
          </p>
        </div>
 
        {/* Danger Zone */}
        <div className="glass-card" style={{ padding: 28, borderColor: 'rgba(193,122,92,0.2)' }}>
          <h2 style={{ fontSize: 18, marginBottom: 8, color: 'var(--accent-terra)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
            Sign out of your DailyRoots account on this device.
          </p>
          <button className="btn btn-danger" onClick={handleSignOut}>
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
