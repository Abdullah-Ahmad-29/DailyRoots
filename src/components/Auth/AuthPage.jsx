import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'

/* ── High-Concept Botanical/Geometric SVG Logo ── */
function PremiumLogo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 6px 16px rgba(197,240,21,0.3))' }}>
      <defs>
        <linearGradient id="emGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B1C0E" />
          <stop offset="50%" stopColor="#122816" />
          <stop offset="100%" stopColor="#0B1C0E" />
        </linearGradient>
        <linearGradient id="goldBright" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fdf0" />
          <stop offset="50%" stopColor="#c5f015" />
          <stop offset="100%" stopColor="#8dbb0a" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dbff70" />
          <stop offset="100%" stopColor="#688c05" />
        </linearGradient>
        <filter id="glowGold" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="120" height="120" fill="url(#emGrad)" stroke="rgba(197,240,21,0.25)" strokeWidth="1" />
      <rect x="15" y="15" width="90" height="90" stroke="rgba(197,240,21,0.18)" strokeWidth="1" />
      <circle cx="60" cy="60" r="45" stroke="rgba(197,240,21,0.2)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="30" stroke="rgba(197,240,21,0.25)" strokeWidth="1" />
      <path d="M60 15 L105 60 L60 105 L15 60 Z" stroke="rgba(197,240,21,0.18)" strokeWidth="1" />
      <path d="M60 90 Q58 100 48 105 M60 90 Q65 98 75 103 M60 95 Q60 102 60 108" stroke="url(#goldBright)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <path d="M60 90 Q57 70 63 55 T60 25" stroke="url(#goldBright)" strokeWidth="4.5" strokeLinecap="round" filter="url(#glowGold)" />
      <path d="M61 68 C45 66 38 52 32 46" stroke="url(#goldBright)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 46 C25 40 28 32 38 34 C42 42 36 46 32 46 Z" fill="url(#leafGrad)" />
      <path d="M44 58 C38 52 40 45 48 48 C48 54 46 58 44 58 Z" fill="url(#leafGrad)" />
      <path d="M62 52 C78 50 85 38 92 34" stroke="url(#goldBright)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92 34 C100 28 102 36 94 40 C88 42 90 36 92 34 Z" fill="url(#leafGrad)" />
      <path d="M76 46 C84 42 86 48 80 52 C76 52 74 48 76 46 Z" fill="url(#leafGrad)" />
      <circle cx="38" cy="34" r="3.5" fill="#f8fdf0" filter="url(#glowGold)" />
      <circle cx="94" cy="40" r="3.5" fill="#f8fdf0" filter="url(#glowGold)" />
      <circle cx="60" cy="22" r="4.5" fill="#dbff70" />
    </svg>
  )
}

/* ── Synthesize Organic Wooden Tapping sound ── */
const playTick = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {}
}

/* ── Satisfying Slide Click for page turns ── */
const playSlideClick = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.13)
  } catch (e) {}
}

/* ── Bass Thud and Hot Wax Chime for sealing stamp ── */
const playStampThud = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime
    
    // Deep low thud
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.frequency.setValueAtTime(75, now)
    osc1.frequency.exponentialRampToValueAtTime(10, now + 0.28)
    gain1.gain.setValueAtTime(0.45, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start()
    osc1.stop(now + 0.29)

    // Sizzling wax sparkle chime
    const freqs = [523.25, 659.25, 783.99, 1046.50] // C major chord
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(f, now + 0.04 + i * 0.04)
      gain.gain.setValueAtTime(0.08, now + 0.04 + i * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04 + i * 0.04 + 0.28)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + 0.04 + i * 0.04)
      osc.stop(now + 0.04 + i * 0.04 + 0.28)
    })
  } catch (e) {}
}

/* ── Gentle synthesized chime for mode toggles ── */
const playBloomChime = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime
    const notes = [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5 arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.06)
      gain.gain.setValueAtTime(0.06, now + idx * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + idx * 0.06)
      osc.stop(now + idx * 0.06 + 0.3)
    })
  } catch (e) {}
}

/* ── Scroll Reveal Component ── */
function Reveal({ children, delay = 0, y = 30, style = {} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.08 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translate3d(0, ${y}px, 0)`,
      transition: `opacity .9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform .9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      willChange: 'transform, opacity',
      ...style
    }}>
      {children}
    </div>
  )
}

/* ── Glowing Fireflies ── */
function Fireflies() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="firefly" style={{
          position: 'absolute',
          left: `${15 + i * 15}%`,
          top: `${20 + (i * 13) % 60}%`,
          width: 6, height: 6, borderRadius: '50%',
          background: i % 2 === 0 ? '#c5f015' : '#e3fd78',
          boxShadow: i % 2 === 0 ? '0 0 12px #c5f015' : '0 0 12px #e3fd78',
          opacity: 0.5,
          animation: `drift ${2.2 + i * 0.8}s infinite alternate ease-in-out`,
          animationDelay: `${i * 0.15}s`,
          willChange: 'transform',
        }} />
      ))}
    </div>
  )
}

/* ── Custom Colorful Cursor Glow ── */
function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX - 22}px, ${e.clientY - 22}px, 0)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={glowRef} className="cursor-glow" style={{
      position: 'fixed', top: 0, left: 0, width: 44, height: 44, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(107,207,151,0.5) 0%, rgba(212,168,83,0.3) 55%, rgba(82,201,138,0) 100%)',
      pointerEvents: 'none', zIndex: 9999,
      mixBlendMode: 'screen', filter: 'blur(4px)', transition: 'transform 0.06s cubic-bezier(0.25, 1, 0.5, 1)',
      transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform',
    }} />
  )
}

/* ── Accordion FAQ Drawer ── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: open ? '1.5px solid var(--accent-sage)' : '1px solid rgba(11,28,14,0.18)',
        padding: '24px 8px',
        background: hovered ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => { setOpen(!open); playTick(); }}
    >
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ 
            fontFamily: 'DM Sans, sans-serif', 
            fontSize: 12, 
            fontWeight: 700, 
            color: hovered ? 'var(--accent-sage)' : '#688c05',
            transition: 'color 0.2s',
            marginTop: 3
          }}>
            0{index} /
          </span>
          <span style={{ 
            fontSize: '17px', 
            fontWeight: 700, 
            color: '#0b1c0e', 
            fontFamily: 'Playfair Display, serif', 
            lineHeight: 1.35,
            transition: 'transform 0.2s',
            transform: hovered ? 'translateX(4px)' : 'none'
          }}>{q}</span>
        </div>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 800,
          color: open ? 'var(--accent-sage)' : '#688c05',
          border: '1.5px solid currentColor',
          padding: '2px 8px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.2s',
          flexShrink: 0
        }}>
          {open ? 'close' : 'open'}
        </span>
      </div>
      <div style={{
        maxHeight: open ? '160px' : '0px', overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <p style={{ 
          fontSize: '14.5px', 
          color: '#1b4d22', 
          fontWeight: 600,
          lineHeight: 1.8, 
          padding: '16px 0 0 44px',
        }}>{a}</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   HIGH-CONCEPT REALISTIC FIELD JOURNAL
══════════════════════════════════════ */
function AuthModal({ defaultTab = 'signup', onClose }) {
  const [mode, setMode] = useState(defaultTab || 'signup') // 'signup' or 'login'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleModeToggle = (nextMode) => {
    playBloomChime()
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  const handleWaxSealSubmit = async (e) => {
    if (e) e.preventDefault()
    if (loading) return
    
    playStampThud()
    setLoading(true)
    setError('')
    setMessage('')
    
    // Smooth transition buffer
    await new Promise(r => setTimeout(r, 400))

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Registry complete. Inspect your mail coordinate to activate roots.')
      }
    }
    setLoading(false)
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(2, 6, 3, 0.94)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      animation: 'fadeIn .3s ease',
    }}>

      {/* ── SPLIT SLIDING AUTH DRAWER PANEL ── */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: 920, height: 580,
        background: '#FCFAF7',
        backgroundImage: 'radial-gradient(rgba(11,28,14,0.03) 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px',
        border: '1px solid rgba(104, 140, 5, 0.3)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(197,240,21,0.06)',
        display: 'flex', overflow: 'hidden', borderRadius: 0
      }}>

        {/* Outer 90-degree decorative trim on form pages */}
        <div style={{
          position: 'absolute', inset: 12,
          border: '1.5px solid rgba(11,28,14,0.06)',
          pointerEvents: 'none', zIndex: 0
        }} />

        {/* 1. SIGN UP PANEL (Exposed on Left when mode === 'signup') */}
        <div style={{
          width: '50%', height: '100%', padding: '56px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'absolute', left: 0, top: 0,
          opacity: mode === 'signup' ? 1 : 0,
          pointerEvents: mode === 'signup' ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 2
        }}>
          {/* Close button (Left side) */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 24, left: 28,
            background: 'none', border: 'none', color: '#0b1c0e',
            fontSize: 22, cursor: 'pointer', outline: 'none', opacity: 0.6, zIndex: 10
          }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}>✕</button>

          <div style={{ marginBottom: 28 }}>
            <span style={{ fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '2.5px', textTransform: 'uppercase' }}>SECURE LOCAL REGISTRY</span>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', color: '#0b1c0e', fontWeight: 900, marginTop: 4, letterSpacing: '-0.5px' }}>
              Plant New Roots
            </h3>
          </div>

          {error && mode === 'signup' && <div style={{ padding: '8px 12px', background: 'rgba(220,80,60,0.06)', borderLeft: '3px solid #dc503c', color: '#a23b2b', fontSize: 12, marginBottom: 14 }}>⚠️ {error}</div>}
          {message && mode === 'signup' && <div style={{ padding: '8px 12px', background: 'rgba(82,201,138,0.06)', borderLeft: '3px solid #6BCF97', color: '#2D6B2D', fontSize: 12, marginBottom: 14 }}>✅ {message}</div>}

          <form onSubmit={handleWaxSealSubmit}>
            <div style={{ fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Grower Appellation (Name)</div>
            <input type="text" placeholder="Gardener Name" value={name} onChange={e => setName(e.target.value)} required={mode === 'signup'} style={{
              width: '100%', padding: '14px 16px', background: '#ffffff',
              border: '1px solid rgba(11,28,14,0.15)', borderLeft: '4px solid var(--accent-sage)',
              color: '#0b1c0e', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, outline: 'none', marginBottom: 16, borderRadius: 0
            }} />

            <div style={{ fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Courier Coordinate (Email)</div>
            <input type="email" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} required style={{
              width: '100%', padding: '14px 16px', background: '#ffffff',
              border: '1px solid rgba(11,28,14,0.15)', borderLeft: '4px solid var(--accent-sage)',
              color: '#0b1c0e', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, outline: 'none', marginBottom: 16, borderRadius: 0
            }} />

            <div style={{ fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Cipher Lockphrase (Password)</div>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={{
              width: '100%', padding: '14px 16px', background: '#ffffff',
              border: '1px solid rgba(11,28,14,0.15)', borderLeft: '4px solid var(--accent-sage)',
              color: '#0b1c0e', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, outline: 'none', marginBottom: 24, borderRadius: 0
            }} />

            <button type="submit" disabled={loading} className="btn-premium" style={{ width: '100%', background: '#0b1c0e', color: '#ffffff', border: 'none', padding: '16px', fontWeight: 800, fontSize: 14, letterSpacing: '1.5px', borderRadius: 0, fontFamily: '"DM Sans", sans-serif' }}>
              {loading ? 'SEALING SIGIL...' : 'SIGIL SEALING STAMP'}
            </button>
          </form>
        </div>

        {/* 2. SIGN IN PANEL (Exposed on Right when mode === 'login') */}
        <div style={{
          width: '50%', height: '100%', padding: '56px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'absolute', left: '50%', top: 0,
          opacity: mode === 'login' ? 1 : 0,
          pointerEvents: mode === 'login' ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 2
        }}>
          {/* Close button (Right side) */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 24, right: 28,
            background: 'none', border: 'none', color: '#0b1c0e',
            fontSize: 22, cursor: 'pointer', outline: 'none', opacity: 0.6, zIndex: 10
          }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}>✕</button>

          <div style={{ marginBottom: 28 }}>
            <span style={{ fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '2.5px', textTransform: 'uppercase' }}>UNSEAL SOIL VAULT</span>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', color: '#0b1c0e', fontWeight: 900, marginTop: 4, letterSpacing: '-0.5px' }}>
              Resume Gardening
            </h3>
          </div>

          {error && mode === 'login' && <div style={{ padding: '8px 12px', background: 'rgba(220,80,60,0.06)', borderLeft: '3px solid #dc503c', color: '#a23b2b', fontSize: 12, marginBottom: 14 }}>⚠️ {error}</div>}

          <form onSubmit={handleWaxSealSubmit}>
            <div style={{ fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Courier Coordinate (Email)</div>
            <input type="email" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} required style={{
              width: '100%', padding: '14px 16px', background: '#ffffff',
              border: '1px solid rgba(11,28,14,0.15)', borderLeft: '4px solid var(--accent-sage)',
              color: '#0b1c0e', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, outline: 'none', marginBottom: 16, borderRadius: 0
            }} />

            <div style={{ fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#688c05', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Cipher Lockphrase (Password)</div>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{
              width: '100%', padding: '14px 16px', background: '#ffffff',
              border: '1px solid rgba(11,28,14,0.15)', borderLeft: '4px solid var(--accent-sage)',
              color: '#0b1c0e', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, outline: 'none', marginBottom: 24, borderRadius: 0
            }} />

            <button type="submit" disabled={loading} className="btn-premium" style={{ width: '100%', background: '#0b1c0e', color: '#ffffff', border: 'none', padding: '16px', fontWeight: 800, fontSize: 14, letterSpacing: '1.5px', borderRadius: 0, fontFamily: '"DM Sans", sans-serif' }}>
              {loading ? 'UNSEALING...' : 'UNSEAL LEDGER'}
            </button>
          </form>
        </div>

        {/* 3. SLIDING OVERLAY PANEL (Living specimen cabinet) */}
        <div style={{
          position: 'absolute', top: 0,
          left: mode === 'signup' ? '50%' : '0%',
          width: '50%', height: '100%',
          background: 'var(--bg-secondary)',
          boxShadow: '0 0 50px rgba(0,0,0,0.6)',
          transition: 'left 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '40px 32px', zIndex: 5, textAlign: 'center'
        }}>
          {/* Diagnostic coordinate grid watermark */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(197,240,21,0.03) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

          {/* Internal brass double border trim */}
          <div style={{
            position: 'absolute', inset: 12,
            border: '1.5px solid rgba(197,240,21,0.2)',
            outline: '1px solid rgba(197,240,21,0.12)',
            outlineOffset: '-10px',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Drifting magic spores inside overlay */}
          {[...Array(6)].map((_, idx) => (
            <div key={idx} style={{
              position: 'absolute',
              width: idx % 2 === 0 ? 5 : 3,
              height: idx % 2 === 0 ? 5 : 3,
              borderRadius: '50%',
              background: 'var(--accent-amber)',
              boxShadow: '0 0 8px var(--accent-amber)',
              top: (15 + (idx * 27) % 70) + '%',
              left: (10 + (idx * 19) % 80) + '%',
              opacity: 0.55,
              animation: 'drift ' + (1.8 + idx * 0.4) + 's infinite alternate ease-in-out',
              pointerEvents: 'none'
            }} />
          ))}

          {mode === 'signup' ? (
            <div style={{ position: 'relative', zIndex: 2, animation: 'fadeIn 0.5s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Sprout seedling graphic */}
              <svg viewBox="0 0 100 80" style={{ width: 85, height: 65, marginBottom: 20 }}>
                <path d="M 50 80 Q 48 50 50 30 Q 52 15 65 10" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 50 80 Q 48 50 50 30 Q 52 15 65 10" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                <path d="M 50 45 Q 32 30 38 18 Q 50 30 50 45" fill="rgba(197,240,21,0.25)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <path d="M 50 30 Q 68 18 64 6 Q 52 15 50 30" fill="rgba(227,253,120,0.3)" stroke="var(--accent-leaf)" strokeWidth="1.5" />
              </svg>

              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '38px', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 900, marginBottom: 12 }}>
                Welcome, Gardener
              </h3>
              <p style={{ fontSize: '15.5px', fontFamily: '"DM Sans", sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
                Already registered your roots? Slide back to unseal your active ledger.
              </p>
              
              <button onClick={() => handleModeToggle('login')} style={{
                background: 'rgba(197,240,21,0.03)', border: '1.5px solid var(--accent-amber)', color: 'var(--accent-amber)',
                boxShadow: '0 0 15px rgba(197,240,21,0.05)',
                padding: '14px 32px', fontWeight: 800, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0,
                transition: 'all 0.3s', fontFamily: '"DM Sans", sans-serif'
              }} onMouseEnter={e => { e.target.style.background = 'var(--accent-amber)'; e.target.style.color = 'var(--bg-primary)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(197,240,21,0.03)'; e.target.style.color = 'var(--accent-amber)'; }}>
                UNSEAL LEDGER
              </button>
            </div>
          ) : (
            <div style={{ position: 'relative', zIndex: 2, animation: 'fadeIn 0.5s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Sprout seedling graphic */}
              <svg viewBox="0 0 100 80" style={{ width: 85, height: 65, marginBottom: 20 }}>
                <path d="M 50 80 Q 48 50 50 30 Q 52 15 65 10" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 50 80 Q 48 50 50 30 Q 52 15 65 10" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                <path d="M 50 45 Q 32 30 38 18 Q 50 30 50 45" fill="rgba(197,240,21,0.25)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <path d="M 50 30 Q 68 18 64 6 Q 52 15 50 30" fill="rgba(227,253,120,0.3)" stroke="var(--accent-leaf)" strokeWidth="1.5" />
              </svg>

              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '38px', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 900, marginBottom: 12 }}>
                Greetings, Traveler
              </h3>
              <p style={{ fontSize: '15.5px', fontFamily: '"DM Sans", sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
                Ready to cultivate discipline? Register your coordinates to plant new roots.
              </p>
              
              <button onClick={() => handleModeToggle('signup')} style={{
                background: 'rgba(197,240,21,0.03)', border: '1.5px solid var(--accent-amber)', color: 'var(--accent-amber)',
                boxShadow: '0 0 15px rgba(197,240,21,0.05)',
                padding: '14px 32px', fontWeight: 800, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0,
                transition: 'all 0.3s', fontFamily: '"DM Sans", sans-serif'
              }} onMouseEnter={e => { e.target.style.background = 'var(--accent-amber)'; e.target.style.color = 'var(--bg-primary)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(197,240,21,0.03)'; e.target.style.color = 'var(--accent-amber)'; }}>
                SIGIL VALIDATION
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
 ══════════════════════════════════════ */
export default function AuthPage() {
  const [modal, setModal] = useState(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [navScrolled, setNavScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Interactive diagnostic microscope states
  const [stretch, setStretch] = useState(60)
  const [bloom, setBloom] = useState(40)
  const [deepen, setDeepen] = useState(50)

  // Interactive simulator state
  const [completedHabits, setCompletedHabits] = useState({ mind: false, body: false, focus: false, social: false })

  const handleHabitToggle = (key) => {
    playTick()
    setCompletedHabits(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const activeCount = Object.values(completedHabits).filter(Boolean).length

  // Determine section theme colors dynamically for the navbar contrast
  const isLightNav = activeSection === 'warm' || activeSection === 'roots' || activeSection === 'testimonials' || activeSection === 'faq'

  useEffect(() => {
    const sections = ['hero', 'warm', 'features', 'roots', 'testimonials', 'faq', 'cta']
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveSection(e.target.id.replace('sec-', ''))
        }
      })
    }, { threshold: 0.12 })

    sections.forEach(s => {
      const el = document.getElementById(`sec-` + s)
      if (el) io.observe(el)
    })

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => { io.disconnect(); window.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <div style={{ fontFamily: 'DM Sans,sans-serif', background: 'var(--bg-primary)', color: '#e8f0e8', overflowX: 'hidden' }}>
      
      <CursorGlow />

      {/* Dynamic Scroll Progress indicator */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 3, width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #6BCF97, #FFECA8)', zIndex: 1000,
        transition: 'width 0.1s ease-out'
      }} />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(25px, -50px, 0); }
        }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes modalPop { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes rotateLock { to{transform:rotate(360deg)} }
        @keyframes shineSweep {
          0% { left: -100%; }
          100% { left: 150%; }
        }
        @keyframes slowZoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        @keyframes textSway {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(82,201,138,0.25); }
          50% { box-shadow: 0 4px 32px rgba(82,201,138,0.5); }
        }
        @keyframes svgFlow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes bannerDrift {
          0% { transform: translate3d(-10px, 0, 0); }
          50% { transform: translate3d(10px, 0, 0); }
          100% { transform: translate3d(-10px, 0, 0); }
        }

        .m-input {
          width:100%; padding:12px; outline:none; transition:all .2s; borderRadius:0 !important;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(107,158,107,0.25); color:#e8f0e8;
          font-size:14px; font-family:'DM Sans',sans-serif;
        }
        .m-input:focus { border-color:#6BCF97; background:rgba(107,158,107,0.06); }

        /* Dynamic 90-Degree Navbar */
        .top-nav {
          position:fixed; top:0; left:0; right:0;
          z-index:200; display:flex; align-items:center; justify-content:space-between;
          padding:16px 36px; border-radius:0 !important;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .top-nav.scrolled-dark {
          background: rgba(4,27,15,0.96);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(90,230,153,0.18);
        }
        .top-nav.scrolled-light {
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(45,107,45,0.15);
        }

        .nav-links { display: flex; gap: 28px; }
        .nav-link {
          font-size: 12.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
          text-decoration: none; cursor: pointer; position: relative; padding: 4px 0;
          transition: color 0.3s ease, letter-spacing 0.3s ease;
        }
        .nav-link:hover {
          letter-spacing: 2px;
          color: var(--accent-amber) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
          background: currentColor; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .nav-link.active-indicator {
          font-weight: 900;
        }
        .nav-link.active-indicator::after {
          width: 100%;
        }

        /* 90-degree Buttons with shine sweep and glow pulse */
        .btn-premium {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 24px; border:none; borderRadius:0 !important;
          background: linear-gradient(90deg, var(--accent-amber), var(--accent-sage), var(--accent-amber));
          background-size: 200% auto;
          color: var(--bg-primary); font-size:13px; font-weight:700;
          font-family:'DM Sans',sans-serif; cursor:pointer;
          box-shadow:0 6px 20px rgba(90,230,153,0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          animation: pulseGlow 2.2s infinite alternate ease-in-out;
        }
        .btn-premium::before {
          content: '';
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: none;
        }
        .btn-premium:hover::before {
          animation: shineSweep 0.75s ease-out;
        }
        .btn-premium:hover {
          background-position: right center;
          transform: translate3d(0, -3px, 0);
          box-shadow: 0 10px 28px rgba(82,201,138,0.45);
        }
        .btn-premium:active { transform: translate3d(0, 0, 0); }

        .btn-ghost-nav {
          display:inline-flex; align-items:center;
          padding:11px 20px; border: 1px solid transparent; borderRadius:0 !important;
          font-size:13px; font-weight:700; font-family:'DM Sans',sans-serif;
          cursor:pointer; transition: all 0.3s ease; letter-spacing: 0.5px;
          background: transparent;
        }
        .btn-ghost-nav:hover {
          border-color: currentColor;
          background: rgba(255,255,255,0.06);
          transform: translate3d(0, -2px, 0);
        }
        .btn-ghost-nav-light:hover {
          border-color: #2D6B2D;
          background: rgba(45,107,45,0.06);
          transform: translate3d(0, -2px, 0);
        }

        /* Responsive Columns */
        .split-grid { display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 40px; align-items: center; }
        @media(max-width:768px) {
          .split-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .nav-links { display: none; }
          .top-nav { width: 100%; top: 0; padding: 12px 18px; }
        }

        /* Floating Cards */
        .feat-card {
          padding:32px; background:rgba(255,255,255,0.02);
          border:1px solid rgba(107,158,107,0.12); borderRadius:0 !important;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          animation: cardFloat 6s ease-in-out infinite;
        }
        .feat-card:hover {
          background:rgba(255,255,255,0.04);
          border-color:rgba(107,158,107,0.3);
          transform: translate3d(0, -6px, 0);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .widget-habit {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border: 1px solid rgba(45,107,45,0.12);
          background: rgba(255,255,255,0.65); cursor: pointer;
          transition: all 0.25s ease; margin-bottom: 8px;
        }
        .widget-habit:hover {
          transform: translate3d(4px, 0, 0);
          background: rgba(255,255,255,0.85);
        }
        .widget-habit.checked {
          background: rgba(82,201,138,0.12);
          border-color: #2D6B2D;
        }
        .checkbox-box {
          width: 20px; height: 20px; border: 2px solid #2D6B2D;
          display: flex; alignItems: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #2D6B2D;
          transition: all 0.2s;
        }
        .widget-habit.checked .checkbox-box {
          background: #2D6B2D;
          color: #fff;
        }

        /* Parallax fixed backdrop settings */
        .parallax-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
          animation: slowZoom 14s alternate infinite ease-in-out;
        }
        @media (max-width: 1024px) {
          .parallax-bg { background-attachment: scroll; }
        }

        /* Diagnostic sliders styling */
        .lab-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          background: rgba(197,240,21,0.15);
          border: 1px solid rgba(197,240,21,0.2);
          outline: none;
          margin: 16px 0;
          transition: background 0.2s;
        }
        .lab-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: var(--accent-amber);
          border: 2.5px solid var(--bg-primary);
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.1s, background 0.2s;
          box-shadow: 0 0 10px rgba(197,240,21,0.5);
        }
        .lab-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: var(--accent-amber-light);
        }
      `}</style>

      {/* ── ADAPTIVE NAVBAR ── */}
      <header className={`top-nav ${
        navScrolled
          ? (isLightNav ? 'scrolled-light' : 'scrolled-dark')
          : ''
      }`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PremiumLogo size={36} />
          <span style={{
            fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 900,
            color: isLightNav ? 'var(--bg-primary)' : '#ffffff',
            transition: 'color 0.4s', letterSpacing: '-0.5px'
          }}>
            Daily<span style={{ color: 'var(--accent-amber)' }}>Roots</span>
          </span>
        </div>

        {/* Links */}
        <nav className="nav-links">
          <a href="#sec-warm" className={`nav-link ${activeSection === 'warm' ? 'active-indicator' : ''}`} style={{ color: isLightNav ? 'var(--bg-primary)' : '#ffffff', textShadow: isLightNav ? 'none' : '0 1px 4px rgba(0,0,0,0.4)', fontWeight: 600 }}>Philosophy</a>
          <a href="#sec-features" className={`nav-link ${activeSection === 'features' ? 'active-indicator' : ''}`} style={{ color: isLightNav ? 'var(--bg-primary)' : '#ffffff', textShadow: isLightNav ? 'none' : '0 1px 4px rgba(0,0,0,0.4)', fontWeight: 600 }}>Features</a>
          <a href="#sec-roots" className={`nav-link ${activeSection === 'roots' ? 'active-indicator' : ''}`} style={{ color: isLightNav ? 'var(--bg-primary)' : '#ffffff', textShadow: isLightNav ? 'none' : '0 1px 4px rgba(0,0,0,0.4)', fontWeight: 600 }}>Interactive Garden</a>
          <a href="#sec-testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active-indicator' : ''}`} style={{ color: isLightNav ? 'var(--bg-primary)' : '#ffffff', textShadow: isLightNav ? 'none' : '0 1px 4px rgba(0,0,0,0.4)', fontWeight: 600 }}>Growers</a>
        </nav>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button className={`btn-ghost-nav ${isLightNav ? 'btn-ghost-nav-light' : ''}`} style={{
            color: isLightNav ? 'var(--bg-primary)' : '#ffffff'
          }} onClick={() => setModal('login')}>Sign in</button>
          
          <button className="btn-premium" onClick={() => setModal('signup')}>
            GET STARTED <span style={{ transition: 'transform 0.2s', display: 'inline-block' }} className="arrow-sym">→</span>
          </button>

          {activeCount > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12,
              padding: '6px 12px', background: isLightNav ? 'rgba(45,107,45,0.1)' : 'rgba(82,201,138,0.12)',
              border: `1px solid ${isLightNav ? 'rgba(45,107,45,0.2)' : 'rgba(82,201,138,0.3)'}`,
              color: isLightNav ? '#2D6B2D' : '#6BCF97', fontSize: 11, fontWeight: 700,
              fontFamily: 'DM Sans,sans-serif', transition: 'all 0.3s ease',
              animation: 'fadeIn 0.3s'
            }}>
              <span>🌳</span> {activeCount} ROOTED
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO (DARK MODE)
      ══════════════════════════════════════ */}
      <section id="sec-hero" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 80px', position: 'relative' }}>
        <div className="parallax-bg" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/hero.jpg")',
          objectPosition: '50% 40%',
          filter: 'hue-rotate(35deg) saturate(1.7) brightness(1.6) contrast(1.1) opacity(0.85)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(197,240,21,0.2) 0%, rgba(227,253,120,0.15) 40%, rgba(104,188,10,0.1) 75%, var(--bg-primary) 100%)'
        }} />

        <Fireflies />

        {/* Ambient drift glow */}
        <div style={{
          position: 'absolute', width: '40vw', height: '40vw', top: '10%', left: '5%',
          background: 'radial-gradient(circle, rgba(197,240,21,0.12) 0%, transparent 70%)',
          animation: 'drift 10s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 880, margin: 'auto', animation: 'textSway 4.5s infinite ease-in-out' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 12, 
            border: '1px solid rgba(197, 240, 21, 0.22)', 
            borderLeft: '4px solid var(--accent-amber)',
            padding: '8px 18px', marginBottom: 32, 
            background: 'rgba(11, 28, 14, 0.82)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
            letterSpacing: '2.5px', textTransform: 'uppercase'
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
              Ledger Index 01 <span style={{ color: 'var(--accent-amber)', margin: '0 8px' }}>|</span> Grow something that lasts
            </span>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.8rem,7.5vw,7rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#E8F5E8', marginBottom: 24, textShadow: '0 4px 50px rgba(0,0,0,0.45)' }}>
            Habits don't stick.<br />
            <span style={{ fontStyle: 'italic', color: 'var(--text-accent)' }}>Roots do.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 40px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Not another checklist. A living visual ecosystem that grows deeper with every habit you complete — beautiful, micro-animated, and completely private.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-premium" onClick={() => setModal('signup')}>
              START GROWING FREE <span style={{ marginLeft: 6 }}>→</span>
            </button>
            <button className="btn-ghost-nav" style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '12px 24px' }}
              onClick={() => document.getElementById('sec-warm').scrollIntoView({ behavior: 'smooth' })}>
              See the garden ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 1 ── */}
      <div style={{
        height: '140px',
        background: 'linear-gradient(to bottom, #041b0f, #f2f7f2)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 2 — THE IDEA (LIGHT MODE)
      ══════════════════════════════════════ */}
      <section id="sec-warm" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '60px 24px 100px', position: 'relative', background: '#f2f7f2', color: '#1A3D1A' }}>
        <div className="parallax-bg" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/light_forest.jpg")',
          opacity: 0.32,
          filter: 'hue-rotate(50deg) saturate(1.3)'
        }} />

        <div style={{
          position: 'absolute', width: '35vw', height: '35vw', bottom: '15%', right: '10%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)',
          animation: 'drift 12s infinite alternate-reverse ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto', width: '100%', animation: 'textSway 6s infinite ease-in-out' }} className="split-grid">
          <Reveal>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#688c05', marginBottom: 16 }}>The daily cycle</p>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.5rem,4.5vw,3.8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 24, color: '#0b1c0e' }}>
              Checklists get forgotten.<br />
              <em style={{ color: '#8dbb0a', fontStyle: 'italic' }}>Gardens thrive.</em>
            </h2>
            <p style={{ fontSize: '17px', color: '#0b1c0e', fontWeight: 600, lineHeight: 1.8, marginBottom: 24 }}>
              Most habit trackers reduce your efforts to cold checkboxes that vanish at midnight. DailyRoots is different. Every action you log feeds a living system.
            </p>
            <p style={{ fontSize: '15px', color: '#1b4d22', fontWeight: 600, lineHeight: 1.8, fontStyle: 'italic' }}>
              Miss a day? The root system still holds. Reconnect? Watch it sprout and bloom back to life.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { n: '21', u: 'days', l: 'To form initial roots', c: '#8dbb0a' },
                { n: '66', u: 'days', l: 'To make it automatic', c: '#688c05' },
                { n: '100%', u: '', l: 'Completely private to you', c: '#688c05' },
                { n: '1', u: 'tap', l: 'To water your garden daily', c: '#8dbb0a' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '24px', background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(141,187,10,0.25)', borderRadius: 0,
                  boxShadow: '0 8px 30px rgba(45,107,45,0.04)',
                  transition: 'all 0.3s ease',
                  animation: `cardFloat ${5 + i}s ease-in-out infinite`
                }} className="feat-card">
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 42, fontWeight: 900, color: s.c, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {s.n}<span style={{ fontSize: 15, fontWeight: 400, color: '#3A6A3A', marginLeft: 3 }}>{s.u}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#3A6A3A', marginTop: 8, lineHeight: 1.4, fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 2 ── */}
      <div style={{
        height: '140px',
        background: 'linear-gradient(to bottom, #f2f7f2, #060D08)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 3 — IMMERSIVE DIAGNOSTIC MICROSCOPE (DARK MODE)
      ══════════════════════════════════════ */}
      <section id="sec-features" style={{ padding: '100px 20px 120px', background: 'var(--bg-primary)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(197,240,21,0.05) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

        {/* Ambient drift glow */}
        <div style={{
          position: 'absolute', width: '50vw', height: '40vw', top: '20%', left: '25%',
          background: 'radial-gradient(circle, rgba(197,240,21,0.04) 0%, transparent 60%)',
          animation: 'drift 14s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto' }}>
          
          <Reveal style={{ animation: 'textSway 5s infinite ease-in-out' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)', opacity: 0.8, marginBottom: 16 }}>Microscopic Specimen View</p>
              <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-primary)' }}>
                Inspect the mechanics of<br />
                <em style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>subterranean growth</em>
              </h2>
            </div>
          </Reveal>

          {/* Immersive Diagnostic Layout */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.3fr 1fr', gap: 40, alignItems: 'center'
          }} className="split-grid">
            
            {/* Left Column: Log Entries */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Reveal>
                <div 
                  style={{ 
                    borderLeft: '3px solid var(--accent-amber)', 
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.02)',
                    borderLeftWidth: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(197,240,21,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(197,240,21,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '2px', textTransform: 'uppercase' }}>LOG I. CELLULAR EXTENSION</span>
                  <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px', letterSpacing: '-0.3px' }}>Tactile Branch Growth</h4>
                  <p style={{ fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.75, letterSpacing: '-0.15px' }}>
                    Adjust the sliders below. Feel the woody core stretch taller as your habit streaks accumulate day by day.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div 
                  style={{ 
                    borderLeft: '3px solid var(--accent-leaf)', 
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.02)',
                    borderLeftWidth: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(197,240,21,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(197,240,21,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: 'var(--accent-leaf)', letterSpacing: '2px', textTransform: 'uppercase' }}>LOG II. BROMELIAD BLOOM</span>
                  <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px', letterSpacing: '-0.3px' }}>Streaks Sprout Blossoms</h4>
                  <p style={{ fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.75, letterSpacing: '-0.15px' }}>
                    Building consistency triggers micro-animations of glowing flowers along your stem, giving you a beautiful reward for showing up.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Center Microscope Viewport */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
              
              {/* Microscope Circular Lens */}
              <div style={{
                width: 290, height: 290, borderRadius: '50%',
                border: '4px solid #142816',
                outline: '1px solid rgba(197,240,21,0.3)',
                outlineOffset: '4px',
                background: 'rgba(5, 10, 6, 0.92)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(197,240,21,0.12), inset 0 0 40px rgba(0,0,0,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                {/* Microscope crosshairs */}
                <div style={{ position: 'absolute', inset: '0 50%', borderLeft: '1px dashed rgba(197,240,21,0.15)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: '50% 0', borderTop: '1px dashed rgba(197,240,21,0.15)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 220, height: 220, border: '1px dashed rgba(197,240,21,0.12)', borderRadius: '50%', pointerEvents: 'none' }} />

                {/* Procedural dynamic SVG botanical seed */}
                <svg viewBox="0 0 100 100" style={{
                  width: '100%', height: '100%', padding: 25,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  <defs>
                    <radialGradient id="sproutGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="stemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-sage)" />
                      <stop offset="100%" stopColor="var(--accent-amber)" />
                    </linearGradient>
                  </defs>

                  {/* Ground Line */}
                  <line x1="15" y1="78" x2="85" y2="78" stroke="rgba(197,240,21,0.18)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Subterranean Roots (Reacts to deepen / Root Depth) */}
                  <path d={`M 50 78 Q 42 86 40 ${78 + deepen/3.5}`} stroke="var(--accent-sage)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
                  <path d={`M 50 78 Q 58 86 60 ${78 + deepen/3.2}`} stroke="var(--accent-sage)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
                  <path d={`M 50 78 C 47 82 53 90 50 ${78 + deepen/2.5}`} stroke="var(--accent-leaf)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />

                  {/* Main Growing Stem (Reacts to stretch / Branch Stretch) */}
                  <path d={`M 50 78 Q 48 ${78 - stretch/2.6} 50 ${78 - stretch/1.2}`} stroke="url(#stemGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />

                  {/* Leaf Branch 1 (Left side, grows if stretch > 30) */}
                  {stretch > 30 && (
                    <>
                      <path d={`M 49 ${78 - stretch/2.5} Q 36 ${78 - stretch/2.5 - bloom/4} 34 ${78 - stretch/2.5 - bloom/5}`} stroke="var(--accent-sage)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      <path d={`M 34 ${78 - stretch/2.5 - bloom/5} Q 28 ${78 - stretch/2.5 - bloom/3} 34 ${78 - stretch/2.5 - bloom/1.8} Q 40 ${78 - stretch/2.5 - bloom/3} 34 ${78 - stretch/2.5 - bloom/5}`} fill="rgba(197,240,21,0.25)" stroke="var(--accent-leaf)" strokeWidth="1" />
                    </>
                  )}

                  {/* Leaf Branch 2 (Right side, grows if stretch > 45) */}
                  {stretch > 45 && (
                    <>
                      <path d={`M 50 ${78 - stretch/1.8} Q 64 ${78 - stretch/1.8 - bloom/4} 66 ${78 - stretch/1.8 - bloom/5}`} stroke="var(--accent-sage)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      <path d={`M 66 ${78 - stretch/1.8 - bloom/5} Q 72 ${78 - stretch/1.8 - bloom/3} 66 ${78 - stretch/1.8 - bloom/1.8} Q 60 ${78 - stretch/1.8 - bloom/3} 66 ${78 - stretch/1.8 - bloom/5}`} fill="rgba(197,240,21,0.25)" stroke="var(--accent-leaf)" strokeWidth="1" />
                    </>
                  )}

                  {/* Glowing Flower Bud at the very top (Reacts to bloom / Blossom Density) */}
                  <circle cx="50" cy={78 - stretch/1.2} r={3 + bloom/12} fill="var(--accent-amber)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-amber))' }} />
                  <circle cx="50" cy={78 - stretch/1.2} r={bloom/22} fill="#ffffff" />
                </svg>
                
                {/* Microscope lens reflections */}
                <div style={{
                  position: 'absolute', top: '5%', left: '15%', width: '70%', height: '30%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)',
                  borderRadius: '150px / 50px', transform: 'rotate(-25deg)', pointerEvents: 'none'
                }} />
              </div>

              {/* Lab Control Knobs (Custom sliders) */}
              <div style={{
                background: 'rgba(11, 28, 14, 0.65)', border: '1px solid rgba(197,240,21,0.18)',
                padding: '24px 28px', width: '100%', borderRadius: 0,
                boxShadow: '0 20px 40px rgba(0,0,0,0.55), inset 0 0 15px rgba(197,240,21,0.05)'
              }}>
                <div style={{ 
                  fontSize: 9, fontFamily: 'DM Sans, sans-serif', fontWeight: 800, 
                  letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(197,240,21,0.4)', 
                  marginBottom: 20, textAlign: 'center', borderBottom: '1px solid rgba(197,240,21,0.08)',
                  paddingBottom: 8
                }}>
                  SPECIMEN CONTROL PANEL
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'DM Sans, sans-serif', fontWeight: 800, letterSpacing: '1px', color: 'var(--accent-amber)' }}>
                  <span>BRANCH STRETCH</span>
                  <span style={{ fontWeight: 800 }}>{stretch}%</span>
                </div>
                <input type="range" min="10" max="90" value={stretch} onChange={e => { playTick(); setStretch(Number(e.target.value)) }} className="lab-slider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'DM Sans, sans-serif', fontWeight: 800, letterSpacing: '1px', color: 'var(--accent-leaf)', marginTop: 14 }}>
                  <span>BLOSSOM DENSITY</span>
                  <span style={{ fontWeight: 800 }}>{bloom}%</span>
                </div>
                <input type="range" min="10" max="90" value={bloom} onChange={e => { playTick(); setBloom(Number(e.target.value)) }} className="lab-slider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'DM Sans, sans-serif', fontWeight: 800, letterSpacing: '1px', color: 'var(--accent-sage)', marginTop: 14 }}>
                  <span>ROOT DEPTH</span>
                  <span style={{ fontWeight: 800 }}>{deepen}%</span>
                </div>
                <input type="range" min="10" max="90" value={deepen} onChange={e => { playTick(); setDeepen(Number(e.target.value)) }} className="lab-slider" />
              </div>

            </div>

            {/* Right Column: Log Entries */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Reveal>
                <div 
                  style={{ 
                    borderLeft: '3px solid var(--accent-sage)', 
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.02)',
                    borderLeftWidth: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(197,240,21,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(197,240,21,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: 'var(--accent-sage)', letterSpacing: '2px', textTransform: 'uppercase' }}>LOG III. ANCHORED STABILITY</span>
                  <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px', letterSpacing: '-0.3px' }}>Deep Soil Anchorage</h4>
                  <p style={{ fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.75, letterSpacing: '-0.15px' }}>
                    Unlike simple streaks that reset to zero, your roots sink deep into the virtual dirt. If you miss a day, the root network still holds.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div 
                  style={{ 
                    borderLeft: '3px solid var(--accent-amber)', 
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.02)',
                    borderLeftWidth: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(197,240,21,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(197,240,21,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '2px', textTransform: 'uppercase' }}>LOG IV. BOTANICAL DEDUCTION</span>
                  <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px', letterSpacing: '-0.3px' }}>Untameable Privacy</h4>
                  <p style={{ fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', opacity: 0.85, lineHeight: 1.75, letterSpacing: '-0.15px' }}>
                    No database tracking, no social stress, no telemetry. Built purely locally on your device with strict client-side coordinates.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 3 ── */}
      <div style={{
        height: '140px',
        background: 'linear-gradient(to bottom, #041b0f, #eef3ee)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 4 — INTERACTIVE ROOT DEMO (LIGHT MODE)
      ══════════════════════════════════════ */}
      <section id="sec-roots" style={{ padding: '60px 24px 100px', background: '#eef3ee', color: '#1a3d1a', position: 'relative' }}>
        <div className="parallax-bg" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/roots.jpg")',
          opacity: 0.09,
          filter: 'hue-rotate(50deg) saturate(1.3)'
        }} />

        {/* Ambient drift glow (Warm sage) */}
        <div style={{
          position: 'absolute', width: '38vw', height: '38vw', top: '15%', left: '10%',
          background: 'radial-gradient(circle, rgba(107,207,151,0.06) 0%, transparent 70%)',
          animation: 'drift 11s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto', width: '100%' }} className="split-grid">
          
          {/* Interactive Widget Panel */}
          <Reveal style={{ animation: 'textSway 5.5s infinite ease-in-out' }}>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#688c05', marginBottom: 16 }}>Interactive Simulator</p>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.5rem,4.5vw,3.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20, color: '#0b1c0e' }}>
              Check off a daily habit<br />
              <em style={{ color: '#8dbb0a', fontStyle: 'italic' }}>to see your roots grow</em>
            </h2>
            <p style={{ fontSize: '17px', color: '#0b1c0e', fontWeight: 600, lineHeight: 1.8, marginBottom: 32 }}>
              Tap on the daily habits below to preview your garden. Watch how your root ecosystem stretches, sprouts leaves, and glows in real-time as you commit to your routines.
            </p>

            <div style={{ maxWidth: 360 }}>
              <div className={`widget-habit ${completedHabits.mind ? 'checked' : ''}`} onClick={() => handleHabitToggle('mind')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>🧘</span>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>10m Morning Meditation</div>
                </div>
                <div className="checkbox-box">{completedHabits.mind ? '✓' : ''}</div>
              </div>

              <div className={`widget-habit ${completedHabits.body ? 'checked' : ''}`} onClick={() => handleHabitToggle('body')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>💪</span>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Drink 3L Water</div>
                </div>
                <div className="checkbox-box">{completedHabits.body ? '✓' : ''}</div>
              </div>

              <div className={`widget-habit ${completedHabits.focus ? 'checked' : ''}`} onClick={() => handleHabitToggle('focus')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>📚</span>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Read 10 Pages</div>
                </div>
                <div className="checkbox-box">{completedHabits.focus ? '✓' : ''}</div>
              </div>

              <div className={`widget-habit ${completedHabits.social ? 'checked' : ''}`} onClick={() => handleHabitToggle('social')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>📞</span>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Call a Friend</div>
                </div>
                <div className="checkbox-box">{completedHabits.social ? '✓' : ''}</div>
              </div>
            </div>
          </Reveal>

          {/* Root Tree Rendering live update with active SVG branch flow animation */}
          <Reveal delay={0.15}>
            <div style={{
              background: '#fff', border: '1px solid rgba(45,107,45,0.15)',
              borderRadius: 0, padding: '36px 24px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
              textAlign: 'center', position: 'relative',
            }}>
              <svg viewBox="0 0 380 340" style={{ width: '100%', maxWidth: 300, margin: '0 auto', display: 'block' }}>
                <ellipse cx="190" cy="215" rx="60" ry="8" fill="rgba(45,107,45,0.08)" />
                
                {/* Mind Root (Meditation) */}
                <path d="M190 215 Q178 245 158 270 Q141 290 122 302" stroke="#6BCF97" strokeWidth={completedHabits.mind ? 5 : 0} opacity={completedHabits.mind ? 1 : 0} fill="none" strokeLinecap="round" strokeDasharray="10 10" style={{ transition: 'stroke-width 0.5s, opacity 0.5s', animation: 'svgFlow 0.8s linear infinite' }} />
                
                {/* Body Root (Water) */}
                <path d="M190 215 Q203 247 222 272 Q240 291 258 303" stroke="#2D6B2D" strokeWidth={completedHabits.body ? 5 : 0} opacity={completedHabits.body ? 1 : 0} fill="none" strokeLinecap="round" strokeDasharray="10 10" style={{ transition: 'stroke-width 0.5s, opacity 0.5s', animation: 'svgFlow 0.8s linear infinite' }} />
                
                {/* Focus Root (Read) */}
                <path d="M190 215 Q172 257 146 285 Q124 307 100 320" stroke="#d4a853" strokeWidth={completedHabits.focus ? 4 : 0} opacity={completedHabits.focus ? 1 : 0} fill="none" strokeLinecap="round" strokeDasharray="8 8" style={{ transition: 'stroke-width 0.5s, opacity 0.5s', animation: 'svgFlow 0.8s linear infinite' }} />
                
                {/* Social Root (Call) */}
                <path d="M190 215 Q208 255 234 283 Q256 305 280 317" stroke="#b07820" strokeWidth={completedHabits.social ? 4 : 0} opacity={completedHabits.social ? 1 : 0} fill="none" strokeLinecap="round" strokeDasharray="8 8" style={{ transition: 'stroke-width 0.5s, opacity 0.5s', animation: 'svgFlow 0.8s linear infinite' }} />

                {/* Trunk */}
                <path d="M190 215 Q188 190 190 165 Q192 137 190 110" stroke="#2D6B2D" strokeWidth={activeCount > 0 ? 6.5 : 2} fill="none" strokeLinecap="round" style={{ transition: 'stroke-width 0.5s' }} />

                {/* Branches based on count */}
                <path d="M190 160 Q162 143 138 125" stroke="#2D6B2D" strokeWidth={3} opacity={activeCount >= 1 ? 0.8 : 0} fill="none" strokeLinecap="round" strokeDasharray="6 6" style={{ transition: 'opacity 0.4s', animation: 'svgFlow 0.7s linear infinite' }} />
                <path d="M190 160 Q218 142 242 123" stroke="#2D6B2D" strokeWidth={3} opacity={activeCount >= 2 ? 0.8 : 0} fill="none" strokeLinecap="round" strokeDasharray="6 6" style={{ transition: 'opacity 0.4s', animation: 'svgFlow 0.7s linear infinite' }} />
                <path d="M138 125 Q118 109 98 95" stroke="#6BCF97" strokeWidth={2} opacity={activeCount >= 3 ? 0.8 : 0} fill="none" strokeLinecap="round" strokeDasharray="4 4" style={{ transition: 'opacity 0.4s', animation: 'svgFlow 0.5s linear infinite' }} />
                <path d="M242 123 Q262 107 280 93" stroke="#d4a853" strokeWidth={2} opacity={activeCount >= 4 ? 0.8 : 0} fill="none" strokeLinecap="round" strokeDasharray="4 4" style={{ transition: 'opacity 0.4s', animation: 'svgFlow 0.5s linear infinite' }} />
              </svg>
              <div style={{ fontSize: 13, color: '#3A6A3A', marginTop: 18, fontWeight: 700 }}>
                {activeCount} of 4 Habits Rooted Today
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 4 ── */}
      <div style={{
        height: '80px',
        background: 'linear-gradient(to bottom, #eef3ee, #F8FBF8)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 5 — TESTIMONIALS (LIGHT MODE)
      ══════════════════════════════════════ */}
      <section id="sec-testimonials" style={{ padding: '60px 24px 100px', background: '#F8FBF8', color: '#1A3D1A', position: 'relative' }}>
        
        {/* Ambient drift blob */}
        <div style={{
          position: 'absolute', width: '40vw', height: '40vw', top: '10%', right: '5%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)',
          animation: 'drift 9s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Reveal style={{ animation: 'textSway 5s infinite ease-in-out' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#688c05', marginBottom: 16 }}>Testimonials</p>
              <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#0b1c0e' }}>
                Stories from the<br />
                <em style={{ color: '#8dbb0a', fontStyle: 'italic' }}>community garden</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {[
              { quote: "Checking off a habit triggers a gorgeous growth flow instead of a generic red dot. It sounds minor, but it makes me look forward to logging my study hours every morning.", user: "Abdullah Ahmad", role: "Student & Writer", streak: "42 Day Streak" },
              { quote: "The 90-day truth heatmap doesn't sugarcoat anything. Seeing my category roots grow thin when I skip gym days motivated me to balance my life.", user: "Omar Khan", role: "Software Engineer", streak: "89 Day Streak" },
              { quote: "DailyRoots actually got me to stay consistent with journaling. Knowing my virtual plant grows into an oak tree with a 60-day streak is weirdly powerful.", user: "Sara Ali", role: "Designer", streak: "112 Day Streak" }
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: '36px 30px', background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(141,187,10,0.25)', borderRadius: 0,
                  boxShadow: '0 8px 30px rgba(45,107,45,0.04)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  animation: `cardFloat ${6 + i}s ease-in-out infinite`
                }} className="feat-card">
                  <p style={{ fontSize: '16.5px', color: '#0b1c0e', fontWeight: 600, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0b1c0e', fontSize: 14 }}>{t.user}</div>
                    <div style={{ fontSize: 12, color: '#1b4d22', marginTop: 2, fontWeight: 600 }}>{t.role} · <span style={{ color: '#8dbb0a', fontWeight: 700 }}>{t.streak}</span></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 4.5 ── */}
      <div style={{
        height: '80px',
        background: 'linear-gradient(to bottom, #F8FBF8, #F4F7F4)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 5.5 — FAQ (LIGHT MODE)
      ══════════════════════════════════════ */}
      <section id="sec-faq" style={{ padding: '80px 24px 120px', background: '#F4F7F4', color: '#1A3D1A', position: 'relative' }}>
        
        {/* Ambient drift blob */}
        <div style={{
          position: 'absolute', width: '30vw', height: '30vw', top: '15%', left: '10%',
          background: 'radial-gradient(circle, rgba(45,107,45,0.04) 0%, transparent 75%)',
          animation: 'drift 10s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Reveal style={{ animation: 'textSway 5s infinite ease-in-out' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#688c05', marginBottom: 16 }}>Common Questions</p>
              <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.5rem,4.5vw,3.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#0b1c0e' }}>
                Curious about<br />
                <em style={{ color: '#8dbb0a', fontStyle: 'italic' }}>DailyRoots?</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px 48px', marginTop: 24 }}>
              <FAQItem
                index={1}
                q="How does the root system represent my habits?"
                a="Every category (Mind, Body, Social, Focus) maps to a specific branch direction. Completing habits grows that specific side of the root tree. Completing all daily habits results in a glowing, fully detailed root structure."
              />
              <FAQItem
                index={2}
                q="What happens if I miss a day?"
                a="We believe in realistic self-improvement. Your root tree will stand bare for that specific day, but the root remains anchored. You don't lose your entire progress; you just continue growing it the next morning."
              />
              <FAQItem
                index={3}
                q="Is my data shared or sold?"
                a="Never. DailyRoots uses Row Level Security (RLS) built directly on top of Supabase Postgres. Only your authenticated user account holds the decryption keys to fetch or write your entries."
              />
              <FAQItem
                index={4}
                q="Can I use DailyRoots completely free?"
                a="Yes. The core habit-root simulator, dashboard, contribution grids, and category organizers are 100% free with no credit card required."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SMOOTH TRANSITION BLOCK 5 ── */}
      <div style={{
        height: '140px',
        background: 'linear-gradient(to bottom, #F4F7F4, #070508)',
        position: 'relative', zIndex: 1
      }} />

      {/* ══════════════════════════════════════
          SECTION 6 — CTA (DARK MODE)
      ══════════════════════════════════════ */}
      <section id="sec-cta" style={{ padding: '80px 20px 80px', position: 'relative', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(197,240,21,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Ambient drift blob */}
        <div style={{
          position: 'absolute', width: '35vw', height: '35vw', top: '10%', right: '15%',
          background: 'radial-gradient(circle, rgba(197,240,21,0.08) 0%, transparent 75%)',
          animation: 'drift 8s infinite alternate ease-in-out', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, animation: 'textSway 4.5s infinite ease-in-out' }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 20 }}>🌾 Begin your discipline ledger</p>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.4rem,6.5vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.98, marginBottom: 28, color: 'var(--text-primary)' }}>
              The best time to<br />plant a habit<br />
              <em style={{ color: 'var(--accent-leaf)', fontStyle: 'italic' }}>was yesterday.</em>
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--text-secondary)', opacity: 0.8, marginBottom: 48, maxWidth: 420, margin: '0 auto 48px', lineHeight: 1.75 }}>
              Unseal your local discipline log today. Start cultivating your habits and witness your botanical coordinates take form.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              <button className="btn-premium" onClick={() => setModal('signup')}>
                START FREE <span style={{ marginLeft: 6 }}>→</span>
              </button>
              <button className="btn-ghost-nav" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.85)', padding: '14px 28px' }} onClick={() => setModal('login')}>Already have roots? Sign in</button>
            </div>
          </Reveal>
        </div>

        {/* ── GIANT TYPOGRAPHIC SIGN-OFF (Highly visible botanical green gradient & sped-up floating translation) ── */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'DM Sans,sans-serif',
          fontSize: 'clamp(4rem, 16vw, 15rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, rgba(197,240,21,0.18) 0%, rgba(141,187,10,0.22) 50%, rgba(104,140,5,0.12) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.06em',
          lineHeight: 0.8,
          textAlign: 'center',
          userSelect: 'none',
          pointerEvents: 'none',
          textTransform: 'uppercase',
          marginTop: 40,
          marginBottom: -40,
          animation: 'bannerDrift 5s infinite ease-in-out'
        }}>
          DAILYROOTS
        </div>
      </section>

      {/* ── GRAND EDITORIAL FOOTER ── */}
      <footer style={{
        background: isLightNav ? '#F4F7F4' : '#040704',
        borderTop: `1px solid ${isLightNav ? 'rgba(45,107,45,0.15)' : 'rgba(82,201,138,0.08)'}`,
        padding: '80px 40px 40px',
        transition: 'all 0.5s ease',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 40, marginBottom: 60 }} className="split-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PremiumLogo size={36} />
                <span style={{ fontFamily: 'Playfair Display,serif', color: isLightNav ? 'var(--bg-primary)' : '#ffffff', fontSize: 18, fontWeight: 900 }}>
                  Daily<span style={{ color: 'var(--accent-amber)' }}>Roots</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: isLightNav ? 'rgba(45,107,45,0.7)' : 'var(--text-secondary)', opacity: 0.75, lineHeight: 1.6 }}>
                Watching your consistency grow into a deep root system. Built organically.
              </p>
            </div>

            <div className={`footer-link-col ${isLightNav ? 'footer-link-col-light' : ''}`}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: isLightNav ? 'var(--bg-primary)' : 'var(--accent-amber)', marginBottom: 6 }}>Product</div>
              <a href="#sec-features">Features</a>
              <a href="#sec-roots">Interactive Garden</a>
              <a href="#sec-faq">FAQ</a>
            </div>

            <div className={`footer-link-col ${isLightNav ? 'footer-link-col-light' : ''}`}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: isLightNav ? 'var(--bg-primary)' : 'var(--accent-amber)', marginBottom: 6 }}>Social</div>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: isLightNav ? 'var(--bg-primary)' : 'var(--accent-amber)', marginBottom: 12 }}>Newsletter</div>
              <p style={{ fontSize: 13, color: isLightNav ? 'rgba(45,107,45,0.7)' : 'var(--text-secondary)', opacity: 0.75, marginBottom: 12, lineHeight: 1.5 }}>
                Weekly seeds of discipline and botanical focus tips.
              </p>
              <div style={{ display: 'flex', gap: 0 }}>
                <input className="m-input" type="email" placeholder="Your email" style={{
                  borderRight: 'none',
                  background: isLightNav ? 'rgba(45,107,45,0.05)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isLightNav ? 'rgba(45,107,45,0.2)' : 'rgba(197,240,21,0.25)'}`,
                  color: isLightNav ? 'var(--bg-primary)' : '#e8f0e8',
                  padding: '8px 12px', fontSize: 13
                }} />
                <button style={{
                  background: isLightNav ? 'var(--bg-primary)' : 'var(--accent-amber)',
                  color: isLightNav ? '#fff' : 'var(--bg-primary)',
                  border: 'none', padding: '0 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                }}>✓</button>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: `1px solid ${isLightNav ? 'rgba(45,107,45,0.1)' : 'rgba(255,255,255,0.05)'}`,
            paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
          }}>
            <span style={{ fontSize: 12, color: isLightNav ? 'rgba(45,107,45,0.5)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.3px' }}>
              Grow quietly. Grow daily. © {new Date().getFullYear()} DailyRoots. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 12, color: isLightNav ? 'rgba(45,107,45,0.5)' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ fontSize: 12, color: isLightNav ? 'rgba(45,107,45,0.5)' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Brutalist "Back to Top" Button */}
      {navScrolled && (
        <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); playTick(); }} style={{
          position: 'fixed', bottom: '24px', right: '24px', width: '40px', height: '40px',
          background: isLightNav ? 'var(--bg-primary)' : 'var(--accent-amber)',
          color: isLightNav ? '#fff' : 'var(--bg-primary)',
          border: 'none', borderRadius: 0, cursor: 'pointer', zIndex: 199,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '900', fontSize: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
          animation: 'fadeIn 0.3s ease'
        }} className="btn-premium">
          ↑
        </button>
      )}

      {/* Auth Modal */}
      {modal && <AuthModal defaultTab={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
