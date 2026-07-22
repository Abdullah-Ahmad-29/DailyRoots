import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { playSoilRustle, playHarvestChime } from '../lib/sound'

const RECOM_POOL = [
  { 
    name: 'Morning Forest Air Walk', 
    category: 'health', 
    icon: '🏃', 
    color: '#6b9e6b', 
    desc: 'Breathe deep in nature to oxygenate your bloodstream and stabilize cortisol.', 
    synergy: 'Pairs with hydration habits for optimal nutrient flow.' 
  },
  { 
    name: 'Gratitude Reflection Log', 
    category: 'mind', 
    icon: '🧘', 
    color: '#8a7fb5', 
    desc: 'Write three occurrences of light. Anchors roots in times of turbulence.', 
    synergy: 'Companion plants beautifully with creative habits.' 
  },
  { 
    name: 'Read Scientific Logs', 
    category: 'productivity', 
    icon: '📚', 
    color: '#d4a853', 
    desc: 'Sow knowledge to expand cognitive canopy layers and analytical density.', 
    synergy: 'Drives long-term cognitive vitality.' 
  },
  { 
    name: 'Soil Hydration check', 
    category: 'health', 
    icon: '💧', 
    color: '#6b9e6b', 
    desc: 'Drink 2L pure water. Essential for transport of organic mineral deposits.', 
    synergy: 'Core companion seed for every active garden plot.' 
  },
  { 
    name: 'Scribble Botanical Sketches', 
    category: 'creative', 
    icon: '🎨', 
    color: '#5c9dc1', 
    desc: 'Sketch a local leaf specimen. Promotes sensory focus and focus-flow loops.', 
    synergy: 'Increases emotional soil resilience.' 
  },
  { 
    name: 'Connect with Fellow Botanist', 
    category: 'social', 
    icon: '🤝', 
    color: '#c17a5c', 
    desc: 'Reach out to a peer to share growth indices. Enhances mycorrhizal grove support.', 
    synergy: 'Strengthens shared root systems against stress storms.' 
  }
];

export default function AIAdvisor({ user }) {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [diagnostics, setDiagnostics] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [addingHabitId, setAddingHabitId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchHabits()
  }, [])

  async function fetchHabits() {
    setLoading(true)
    const { data } = await supabase.from('habits').select('*').eq('user_id', user.id)
    const h = data || []
    setHabits(h)
    generateAdvisorReport(h)
    setLoading(false)
  }

  const triggerAnalysis = () => {
    setAnalyzing(true)
    setDiagnostics([])
    
    // Simulate real-time neural connection logs
    const logs = [
      "Connecting to AI Habit Diagnostics engine...",
      "Scanning active habit registry...",
      "Evaluating category balance (Health, Mind, Productivity, Social, Creative)...",
      "Analyzing 7-day completion rates and consistency trends...",
      "Evaluating ratio of physical vs focus-based habits...",
      "Compiling personal recommendations..."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setDiagnostics(prev => [...prev, log])
        if (index === logs.length - 1) {
          generateAdvisorReport(habits)
          setAnalyzing(false)
          playHarvestChime()
        }
      }, (index + 1) * 600)
    })
  }

  const generateAdvisorReport = (currentHabits) => {
    // Basic AI heuristic diagnostic engine
    const activeCats = currentHabits.map(h => h.category)
    const uniqueCats = [...new Set(activeCats)]
    
    // Find missing categories
    const allCats = ['health', 'mind', 'productivity', 'social', 'creative']
    const missing = allCats.filter(c => !uniqueCats.includes(c))
    
    // filter recommendations that are not already active
    const activeNames = currentHabits.map(h => h.name.toLowerCase())
    const filteredRecoms = RECOM_POOL.filter(p => !activeNames.includes(p.name.toLowerCase()))
    
    // Pick 3 recommendations, prioritizing missing categories
    const sortedRecoms = [...filteredRecoms].sort((a, b) => {
      const aMissing = missing.includes(a.category) ? 1 : 0
      const bMissing = missing.includes(b.category) ? 1 : 0
      return bMissing - aMissing
    })

    setRecommendations(sortedRecoms.slice(0, 3))
  }

  const quickSow = async (item) => {
    setAddingHabitId(item.name)
    const isMuted = localStorage.getItem('roots_sound_muted') === 'true'
    
    const { data, error } = await supabase.from('habits').insert({
      user_id: user.id,
      name: item.name,
      category: item.category,
      frequency: 'daily',
      icon: item.icon,
      color: item.color
    }).select()

    if (!error && data) {
      if (!isMuted) playSoilRustle()
      setToast(`Sowed seed: ${item.name}! 🌿`)
      setTimeout(() => setToast(null), 4000)
      
      // Update local state
      const updated = [...habits, data[0]]
      setHabits(updated)
      generateAdvisorReport(updated)
    }
    setAddingHabitId(null)
  }

  // Calculate soil metrics
  const totalCount = habits.length
  const healthCount = habits.filter(h => h.category === 'health').length
  const mindCount = habits.filter(h => h.category === 'mind').length
  const prodCount = habits.filter(h => h.category === 'productivity').length
  const creativeCount = habits.filter(h => h.category === 'creative').length
  const socialCount = habits.filter(h => h.category === 'social').length

  const taprootScore = Math.min(100, (healthCount * 25) + (mindCount * 15))
  const canopyScore = Math.min(100, (prodCount * 25) + (creativeCount * 25))
  const mycorrhizalScore = Math.min(100, (socialCount * 50) + (totalCount * 5))

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
        <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
        <p style={{ color: 'var(--text-muted)' }}>Connecting to Mycorrhizal AI Advisor...</p>
      </div>
    )
  }

  return (
    <div className="fade-up" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#FAF7F2',
          border: '2px solid #6b9e6b',
          color: '#0b1c0e',
          padding: '12px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 1000,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          animation: 'slide-up 0.25s ease-out'
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="page-header" style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#688c05', marginBottom: 4 }}>
          AI Habit Diagnostician
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
          AI Advisor & Habit Synergies
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
          Analyze your habit structure using our simulated consistency algorithm to receive personalized recommendation suggestions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, flex: 1, overflow: 'hidden' }}>
        
        {/* Left Column: Diagnostics and Synergy Recommendations */}
        <div style={{ overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* AI Advisor Panel */}
          <div className="glass-card" style={{ padding: '24px 28px', background: 'var(--bg-card)', borderRadius: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🧠</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', margin: 0 }}>
                  Habit Diagnostics
                </h3>
              </div>
              <button 
                className="btn" 
                onClick={triggerAnalysis} 
                disabled={analyzing}
                style={{
                  background: 'var(--text-primary)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: 0,
                  cursor: analyzing ? 'not-allowed' : 'pointer'
                }}
              >
                {analyzing ? 'Analyzing Habits...' : 'Run Diagnostics'}
              </button>
            </div>

            {/* Neural Log Terminal */}
            <div style={{
              background: 'rgba(11, 28, 14, 0.03)',
              border: '1px solid var(--border-subtle)',
              padding: '16px',
              fontFamily: 'Special Elite, Courier New, monospace',
              fontSize: 12,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              {diagnostics.length === 0 && !analyzing ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  System ready. Run diagnostics to probe network chemical levels and compile recommendations.
                </div>
              ) : (
                diagnostics.map((log, idx) => (
                  <div key={idx} className="fade-in" style={{ marginBottom: 4 }}>
                    &gt; {log}
                  </div>
                ))
              )}
              {analyzing && <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2, marginTop: 10 }} />}
            </div>
          </div>

          {/* AI Synergy Recommendations */}
          <div>
            <h3 style={{ fontSize: 18, fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
              Sowing Synergy Recommendations
            </h3>
            
            {recommendations.length === 0 ? (
              <div className="glass-card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
                Your garden has reached maximum variety! No recommendations needed at this time.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {recommendations.map(item => (
                  <div key={item.name} className="glass-card fade-in" style={{
                    padding: '20px',
                    borderRadius: 0,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 120px',
                    gap: 16,
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: 24,
                      background: 'rgba(0,0,0,0.02)',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {item.icon}
                    </div>

                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                        {item.name}
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                      <span style={{ fontSize: 10, color: item.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Synergy: {item.synergy}
                      </span>
                    </div>

                    <button
                      className="btn"
                      onClick={() => quickSow(item)}
                      disabled={addingHabitId === item.name}
                      style={{
                        background: 'transparent',
                        border: `1px solid ${item.color}`,
                        color: item.color,
                        padding: '6px 12px',
                        fontSize: 11,
                        fontWeight: 700,
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {addingHabitId === item.name ? 'Planting...' : '🌱 Quick Sow'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Habit Analysis & Calibration */}
        <div style={{ overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Habit Distribution Scores */}
          <div className="glass-card" style={{ padding: '24px 28px', background: 'var(--bg-card)', borderRadius: 0 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', marginBottom: 18 }}>
              Habit Category Balance
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Physical Habits */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Physical Health & Calm Habits</span>
                  <span>{taprootScore}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${taprootScore}%`, height: '100%', background: 'var(--accent-sage)', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Focus Habits */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Mental Focus & Craft Habits</span>
                  <span>{canopyScore}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${canopyScore}%`, height: '100%', background: 'var(--accent-amber)', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Social Habits */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Social Connection Habits</span>
                  <span>{mycorrhizalScore}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${mycorrhizalScore}%`, height: '100%', background: 'var(--accent-terra)', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            </div>
          </div>

          {/* AI companion planting principles */}
          <div className="glass-card" style={{ padding: '24px 28px', background: 'var(--bg-card)', borderRadius: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', marginBottom: 12 }}>
                Botanical Companion Habits
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                Understand how your daily habits populate your garden classifications:
              </p>
              
              <ul style={{ fontSize: 12, color: 'var(--text-secondary)', paddingLeft: 16, lineHeight: 1.7, margin: 0 }}>
                <li style={{ marginBottom: 6 }}>
                  <strong>Health & Calm Habits</strong>: Anchoring your daily routines, grounding your focus, and stabilizing your body.
                </li>
                <li style={{ marginBottom: 6 }}>
                  <strong>Focus & Craft Habits</strong>: Improving cognitive productivity, learning new techniques, and capturing progress.
                </li>
                <li>
                  <strong>Social Connectivity Habits</strong>: Building mutual networks, sharing resources, and communicating with peers.
                </li>
              </ul>
            </div>

            <div style={{ 
              marginTop: 16, 
              padding: '12px 14px', 
              background: 'rgba(107, 158, 107, 0.05)', 
              border: '1px dashed var(--accent-sage)', 
              fontSize: 11, 
              color: 'var(--accent-sage)', 
              textAlign: 'center' 
            }}>
              ✨ Tip: Balance is key to consistency. Try keeping at least 1 active habit in all classifications.
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
