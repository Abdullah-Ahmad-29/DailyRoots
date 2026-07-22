import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function getPlantInfo(streak) {
  if (streak >= 30) {
    return {
      name: 'Golden Ginkgo',
      scientific: 'Ginkgo biloba',
      desc: 'A golden living fossil. An absolute monument of 30+ days of consistency.',
      stage: 'Ancient Specimen',
      color: '#d4a853',
      svg: (
        <svg viewBox="0 0 100 100" className="botanical-svg">
          <path d="M50,85 Q48,60 50,45 Q52,30 50,20" stroke="#4a3b2c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M50,45 Q35,35 25,40" stroke="#4a3b2c" strokeWidth="2.5" fill="none" />
          <path d="M50,35 Q65,25 75,30" stroke="#4a3b2c" strokeWidth="2.5" fill="none" />
          {/* Ginkgo Golden fan leaves */}
          <path d="M50,20 C38,8 62,8 50,20 Z" fill="#f4d068" opacity="0.9" />
          <path d="M25,40 C15,30 35,30 25,40 Z" fill="#e8b845" opacity="0.9" />
          <path d="M75,30 C65,20 85,20 75,30 Z" fill="#e8b845" opacity="0.9" />
          <circle cx="50" cy="12" r="5" fill="#f4d068" />
          <circle cx="20" cy="34" r="4" fill="#e8b845" />
          <circle cx="80" cy="24" r="4" fill="#e8b845" />
        </svg>
      )
    }
  }
  if (streak >= 14) {
    return {
      name: 'Silver Birch',
      scientific: 'Betula pendula',
      desc: 'Slender white bark reaching upward. Strong taproots hold this stem firm.',
      stage: 'Tall Tree',
      color: '#a3c2a3',
      svg: (
        <svg viewBox="0 0 100 100" className="botanical-svg">
          <path d="M50,85 L50,25" stroke="#7a8a7a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50,50 L35,42" stroke="#7a8a7a" strokeWidth="2" fill="none" />
          <path d="M50,40 L65,32" stroke="#7a8a7a" strokeWidth="2" fill="none" />
          {/* Birch leaf canopy */}
          <ellipse cx="50" cy="28" rx="14" ry="10" fill="#8dbb0a" opacity="0.8" />
          <ellipse cx="33" cy="40" rx="9" ry="7" fill="#7ea344" opacity="0.8" />
          <ellipse cx="67" cy="30" rx="9" ry="7" fill="#7ea344" opacity="0.8" />
        </svg>
      )
    }
  }
  if (streak >= 7) {
    return {
      name: 'Juniper Bonsai',
      scientific: 'Juniperus procumbens',
      desc: 'An ornamental dwarf cedar. A testament to a week of deliberate care.',
      stage: 'Sapling',
      color: '#6b9e6b',
      svg: (
        <svg viewBox="0 0 100 100" className="botanical-svg">
          <path d="M50,85 Q45,70 50,60 Q55,50 48,42" stroke="#5a4a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Bonsai tufts */}
          <circle cx="48" cy="38" r="10" fill="#587d58" opacity="0.85" />
          <circle cx="36" cy="50" r="8" fill="#466346" opacity="0.85" />
          <circle cx="60" cy="48" r="8" fill="#466346" opacity="0.85" />
          {/* Potted plant container */}
          <rect x="35" y="80" width="30" height="8" fill="#d1d9d2" stroke="#6b8270" strokeWidth="1" />
        </svg>
      )
    }
  }
  if (streak >= 3) {
    return {
      name: 'Sword Fern',
      scientific: 'Polystichum munitum',
      desc: 'Deep green fronds emerging. The root structures are beginning to anchor.',
      stage: 'Sprout',
      color: '#558a55',
      svg: (
        <svg viewBox="0 0 100 100" className="botanical-svg">
          <path d="M50,85 C42,65 30,55 25,50" stroke="#7ea344" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M50,85 C50,60 50,45 50,38" stroke="#8dbb0a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50,85 C58,65 70,55 75,50" stroke="#7ea344" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Fern leaflets */}
          <circle cx="25" cy="50" r="3" fill="#688c05" />
          <circle cx="50" cy="38" r="3.5" fill="#688c05" />
          <circle cx="75" cy="50" r="3" fill="#688c05" />
        </svg>
      )
    }
  }
  return {
    name: 'Common Clover',
    scientific: 'Trifolium repens',
    desc: 'Quick to take root, but requires daily moisture to thrive.',
    stage: 'Seedling',
    color: '#88b588',
    svg: (
      <svg viewBox="0 0 100 100" className="botanical-svg">
        <path d="M50,85 Q48,70 50,60" stroke="#7ea344" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Clover leaves */}
        <circle cx="45" cy="56" r="6" fill="#8dbb0a" opacity="0.85" />
        <circle cx="55" cy="56" r="6" fill="#8dbb0a" opacity="0.85" />
        <circle cx="50" cy="49" r="6" fill="#7ea344" opacity="0.85" />
      </svg>
    )
  }
}

export default function SpecimenAlbum({ user }) {
  const [habits, setHabits] = useState([])
  const [logs, setLogs] = useState([])
  const [streaks, setStreaks] = useState({})
  const [loading, setLoading] = useState(true)
  const [exportedCard, setExportedCard] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [{ data: habitsData }, { data: logsData }] = await Promise.all([
      supabase.from('habits').select('*').eq('user_id', user.id).order('created_at'),
      supabase.from('habit_logs').select('*').eq('user_id', user.id),
    ])
    const h = habitsData || []
    const l = logsData || []
    setHabits(h)
    setLogs(l)
    setStreaks(calculateStreaks(h, l))
    setLoading(false)
  }

  function calculateStreaks(habits, logs) {
    const streakMap = {}
    for (const habit of habits) {
      const habitLogs = logs.filter(l => l.habit_id === habit.id)
        .map(l => l.completed_date).sort().reverse()
      let streak = 0
      let checkDate = new Date()
      checkDate.setHours(0, 0, 0, 0)
      for (let i = 0; i < 365; i++) {
        const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth()+1).padStart(2,'0')}-${String(checkDate.getDate()).padStart(2,'0')}`
        if (habitLogs.includes(dateStr)) {
          streak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else if (i === 0) {
          checkDate.setDate(checkDate.getDate() - 1)
        } else break
      }
      streakMap[habit.id] = streak
    }
    return streakMap
  }

  const handleExport = (habit, plant) => {
    setExportedCard({ habit, plant })
    setTimeout(() => setExportedCard(null), 3000)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
        <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
        <p style={{ color: 'var(--text-muted)' }}>Opening the Botanical Archives...</p>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <div className="page-header" style={{ marginBottom: 28 }}>
        <h1>Botanical Specimen Album 📖</h1>
        <p style={{ color: 'var(--text-secondary)' }}>View collected flora sketched during your daily gardening streaks</p>
      </div>

      {habits.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <span style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>📖</span>
          <h3>Archives are empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Sow seeds in your garden to start drawing specimen sketches.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 24,
          paddingBottom: 40
        }}>
          {habits.map(habit => {
            const streak = streaks[habit.id] || 0
            const plant = getPlantInfo(streak)
            
            return (
              <div 
                key={habit.id}
                className="polaroid-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  padding: '16px 16px 20px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Visualizer drawing sketch box */}
                <div style={{
                  background: '#fcfdfb',
                  border: '1.5px solid rgba(11,28,14,0.06)',
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {plant.svg}
                  <span style={{
                    position: 'absolute', bottom: 6, right: 8,
                    fontSize: 10, fontFamily: 'monospace',
                    color: 'var(--text-muted)', opacity: 0.65
                  }}>
                    LVL_0{streak >= 30 ? 5 : streak >= 14 ? 4 : streak >= 7 ? 3 : streak >= 3 ? 2 : 1}
                  </span>
                </div>

                {/* Index study content */}
                <div style={{ marginTop: 4 }}>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 8.5,
                    color: 'var(--accent-amber)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 700
                  }}>
                    {plant.stage} · {streak} days vitality
                  </div>
                  <h3 style={{ 
                    fontFamily: 'Playfair Display, serif', 
                    fontSize: 18, 
                    fontWeight: 700, 
                    color: 'var(--bg-secondary)',
                    marginTop: 4
                  }}>
                    {plant.name}
                  </h3>
                  <div style={{ 
                    fontStyle: 'italic', 
                    fontSize: 11, 
                    color: 'var(--text-muted)', 
                    fontFamily: 'Playfair Display, serif',
                    marginTop: 1
                  }}>
                    {plant.scientific}
                  </div>
                  
                  <p style={{
                    fontSize: 11.5,
                    color: '#445648',
                    lineHeight: 1.5,
                    marginTop: 8,
                    borderTop: '1px dashed rgba(11,28,14,0.08)',
                    paddingTop: 8
                  }}>
                    {plant.desc}
                  </p>
                </div>

                {/* Export button */}
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleExport(habit, plant)}
                  style={{
                    marginTop: 'auto',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '8px 12px',
                    borderColor: 'rgba(11,28,14,0.1)',
                    color: 'var(--bg-secondary)',
                    justifyContent: 'center'
                  }}
                >
                  💾 Export Sketch
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Floating Export Toast Notification */}
      {exportedCard && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'var(--bg-secondary)',
          color: '#ffffff',
          padding: '12px 24px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          border: '1px solid var(--accent-amber)',
          zIndex: 1000,
          animation: 'fadeUp 0.3s ease-out'
        }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>
            🌿 Sketch Exported Successfully!
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
            Saved {exportedCard.plant.name} ({exportedCard.habit.name}) to your directory.
          </div>
        </div>
      )}

      <style>{`
        .polaroid-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11,28,14,0.08);
          border-color: rgba(104,140,5,0.25);
        }
        .botanical-svg {
          width: 70%;
          height: 70%;
        }
      `}</style>
    </div>
  )
}
