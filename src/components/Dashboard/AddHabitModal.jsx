import { useState } from 'react'

const CATEGORIES = [
  { value: 'health', label: '💪 Health', color: '#6b9e6b' },
  { value: 'mind', label: '🧠 Mind', color: '#8a7fb5' },
  { value: 'productivity', label: '⚡ Productivity', color: '#d4a853' },
  { value: 'social', label: '🤝 Social', color: '#c17a5c' },
  { value: 'creative', label: '🎨 Creative', color: '#5c9dc1' },
]

const FREQUENCIES = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekdays', label: 'Weekdays only' },
  { value: 'weekends', label: 'Weekends only' },
]

const ICONS = ['🌱', '💧', '🏃', '📚', '🧘', '✍️', '🎯', '🌙', '☀️', '🍎', '💪', '🎨', '🎵', '🧹', '💊', '🌊']

export default function AddHabitModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('health')
  const [frequency, setFrequency] = useState('daily')
  const [icon, setIcon] = useState('🌱')
  const [loading, setLoading] = useState(false)

  const selectedCat = CATEGORIES.find(c => c.value === category)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await onAdd({ name: name.trim(), category, frequency, icon, color: selectedCat.color })
    setLoading(false)
    onClose()
  }

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11, 28, 14, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '16px',
      overflowY: 'auto',
      animation: 'fade-in 0.25s ease-out'
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      
      <div style={{
        background: '#FAF7F2',
        border: '3px double #d4cbb8',
        borderRadius: 0,
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        width: '740px',
        maxWidth: '100%',
        padding: '20px 24px',
        position: 'relative',
        fontFamily: 'DM Sans, sans-serif',
        color: '#2d3326',
        animation: 'slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        {/* Decorative page elements */}
        <div style={{
          position: 'absolute',
          top: 6,
          left: 6,
          right: 6,
          bottom: 6,
          border: '1px solid rgba(107,158,107,0.12)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#6b9e6b', marginBottom: 2 }}>
              Botanical Field Catalogue
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 900, color: '#0b1c0e', margin: 0 }}>
              Sow New Garden Plot
            </h2>
          </div>
          <button type="button" onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            color: '#8b8a80',
            padding: '2px 6px',
            transition: 'color 0.2s'
          }} onMouseEnter={e => e.target.style.color = '#0b1c0e'} onMouseLeave={e => e.target.style.color = '#8b8a80'}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          {/* Left Column: Form Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Specimen Name */}
            <div>
              <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#688c05', display: 'block', marginBottom: 4 }}>
                Specimen Name / Habit
              </label>
              <input 
                type="text" 
                placeholder="e.g., Morning Meditation, Forest Walk..."
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                maxLength={60} 
                autoFocus 
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #d4cbb8',
                  padding: '4px 0',
                  fontSize: 13.5,
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#0b1c0e',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#6b9e6b'}
                onBlur={e => e.target.style.borderColor = '#d4cbb8'}
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#688c05', display: 'block', marginBottom: 4 }}>
                Icon Specimen
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {ICONS.map(ic => (
                  <button 
                    key={ic} 
                    type="button" 
                    onClick={() => setIcon(ic)}
                    style={{
                      width: 28, 
                      height: 28, 
                      fontSize: 14, 
                      borderRadius: 0,
                      border: icon === ic ? '1px solid #6b9e6b' : '1px solid #e5dfd3',
                      background: icon === ic ? '#f0f7f0' : 'rgba(255,255,255,0.6)',
                      cursor: 'pointer', 
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#688c05', display: 'block', marginBottom: 4 }}>
                Classification
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.value} 
                    type="button" 
                    onClick={() => setCategory(cat.value)}
                    style={{
                      padding: '4px 8px', 
                      borderRadius: 0, 
                      fontSize: 10.5, 
                      fontWeight: 600,
                      border: category === cat.value ? `1px solid ${cat.color}` : '1px solid #e5dfd3',
                      background: category === cat.value ? `${cat.color}15` : 'rgba(255,255,255,0.6)',
                      color: category === cat.value ? cat.color : '#656e5c',
                      cursor: 'pointer', 
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#688c05', display: 'block', marginBottom: 4 }}>
                Watering Schedule
              </label>
              <div style={{ display: 'flex', gap: 5 }}>
                {FREQUENCIES.map(f => (
                  <button 
                    key={f.value} 
                    type="button" 
                    onClick={() => setFrequency(f.value)}
                    style={{
                      flex: 1, 
                      padding: '5px 8px', 
                      borderRadius: 0, 
                      fontSize: 10.5, 
                      fontWeight: 600,
                      border: frequency === f.value ? '1px solid #6b9e6b' : '1px solid #e5dfd3',
                      background: frequency === f.value ? 'rgba(107,158,107,0.1)' : 'rgba(255,255,255,0.6)',
                      color: frequency === f.value ? '#6b9e6b' : '#656e5c',
                      cursor: 'pointer', 
                      transition: 'all 0.15s',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Specimen Tag Preview */}
          <div style={{
            border: '1px dashed #d4cbb8',
            padding: '16px',
            background: 'rgba(255,255,255,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Stamp decoration */}
            <div style={{
              position: 'absolute',
              top: 6,
              right: 6,
              border: '1.5px solid rgba(107,158,107,0.2)',
              borderRadius: 3,
              padding: '1px 4px',
              fontSize: 8,
              fontWeight: 800,
              color: 'rgba(107,158,107,0.2)',
              textTransform: 'uppercase',
              transform: 'rotate(15deg)',
              letterSpacing: '1px'
            }}>
              DAILY ROOTS
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: 24, marginBottom: 4, display: 'inline-block' }}>{icon}</div>
              <div style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontSize: 14.5, 
                fontStyle: 'italic', 
                fontWeight: 700,
                color: '#0b1c0e', 
                marginBottom: 4,
                wordBreak: 'break-word',
                minHeight: 20
              }}>
                {name.trim() || 'unnamed specimen'}
              </div>
              <div style={{
                display: 'inline-block',
                padding: '1px 6px',
                fontSize: 9,
                fontWeight: 700,
                color: '#ffffff',
                background: selectedCat.color,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {category}
              </div>
            </div>

            <div style={{ width: '100%', marginTop: 12, fontSize: 10, borderTop: '1px solid #e5dfd3', paddingTop: 10 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#656e5c' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '2px 0', fontWeight: 600 }}>INDEX NO:</td>
                    <td style={{ padding: '2px 0', textAlign: 'right' }}>#SOW-{Math.floor(1000 + Math.random() * 9000)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0', fontWeight: 600 }}>SCHEDULE:</td>
                    <td style={{ padding: '2px 0', textAlign: 'right', textTransform: 'capitalize' }}>{frequency}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0', fontWeight: 600 }}>STATUS:</td>
                    <td style={{ padding: '2px 0', textAlign: 'right', color: '#6b9e6b', fontWeight: 700 }}>GERMINATING</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', gap: 6, width: '100%', marginTop: 12 }}>
              <button type="button" onClick={onClose} style={{
                flex: 1,
                padding: '8px',
                background: 'transparent',
                border: '1px solid #d4cbb8',
                color: '#656e5c',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }} onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={e => e.target.style.background = 'transparent'}>
                Discard
              </button>
              
              <button type="submit" disabled={loading || !name.trim()} style={{
                flex: 1.4,
                padding: '8px',
                background: loading || !name.trim() ? '#d4cbb8' : '#0b1c0e',
                border: 'none',
                color: '#FAF7F2',
                fontSize: 11,
                fontWeight: 700,
                cursor: loading || !name.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }} onMouseEnter={e => { if (!loading && name.trim()) e.target.style.background = '#1b331f' }} onMouseLeave={e => { if (!loading && name.trim()) e.target.style.background = '#0b1c0e' }}>
                {loading ? 'Planting...' : 'Sow Seed'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
