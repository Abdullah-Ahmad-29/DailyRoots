import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import HabitCard from '../components/Dashboard/HabitCard'
import RootTree from '../components/Dashboard/RootTree'
import AddHabitModal from '../components/Dashboard/AddHabitModal'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const FIELD_GUIDE_DATA = [
  {
    quote: "The creation of a thousand forests is in one acorn.",
    author: "Ralph Waldo Emerson",
    directive: "Watering a seed at the same hour each day coordinates its circadian rhythm. Consistency primes the roots to maximize water uptake.",
    specimenName: "Oak Seedling (Quercus)",
    specimenFact: "Acorns contain high levels of tannins, protecting them from decomposition and pests before rooting.",
    specimenSvg: (
      <svg viewBox="0 0 100 100" className="animated-specimen-svg" style={{ width: 64, height: 64, fill: 'none', stroke: '#8fa074', strokeWidth: 1.5 }}>
        <path d="M50 85 C50 60, 45 40, 45 25 C45 20, 50 15, 55 10 C50 15, 48 22, 50 25 C52 35, 60 45, 65 55 C70 65, 75 75, 50 85 Z" />
        <path d="M47 50 C38 45, 30 35, 33 25 C35 22, 40 25, 42 30 C45 35, 47 42, 47 50 Z" />
        <path d="M50 85 L50 90" strokeDasharray="2,2" />
      </svg>
    )
  },
  {
    quote: "A forest of a thousand miles begins with a single seedling.",
    author: "Lao Tzu",
    directive: "Sprouts require very little water at first, but complete regular cycles. Avoid over-committing to too many habits at once.",
    specimenName: "Fern Sprout (Polystichum)",
    specimenFact: "Ferns reproduce via microscopic spores carried on the wind, rather than seeds.",
    specimenSvg: (
      <svg viewBox="0 0 100 100" className="animated-specimen-svg" style={{ width: 64, height: 64, fill: 'none', stroke: '#8ca86b', strokeWidth: 1.5 }}>
        <path d="M50 90 Q48 50 65 30 Q70 20 60 15 Q50 10 45 35 Q40 60 50 90 Z" />
        <path d="M55 50 Q75 45 70 35 M46 65 Q25 60 30 50" />
      </svg>
    )
  },
  {
    quote: "The clearest way into the Universe is through a forest wilderness.",
    author: "John Muir",
    directive: "Spending just 15 minutes outdoors increases your soil connectivity score. Try adding a daily walking seed to your plots.",
    specimenName: "Birch Sapling (Betula)",
    specimenFact: "Birch bark contains betulin, which makes it waterproof and highly resistant to decay.",
    specimenSvg: (
      <svg viewBox="0 0 100 100" className="animated-specimen-svg" style={{ width: 64, height: 64, fill: 'none', stroke: '#a38d58', strokeWidth: 1.5 }}>
        <path d="M50 90 L50 20 M50 70 C65 60 70 50 65 45 M50 55 C35 45 30 35 35 30 M50 40 C60 30 65 20 60 15" />
      </svg>
    )
  },
  {
    quote: "To dwell is to be gardened.",
    author: "Martin Heidegger",
    directive: "Rest and recovery are vital soil conditions. If you miss a day, do not stress; cultivate patience and re-water the plot tomorrow.",
    specimenName: "Ginkgo Sprout (Ginkgo biloba)",
    specimenFact: "Ginkgo trees are living fossils, unchanged for over 270 million years.",
    specimenSvg: (
      <svg viewBox="0 0 100 100" className="animated-specimen-svg" style={{ width: 64, height: 64, fill: 'none', stroke: '#cfa234', strokeWidth: 1.5 }}>
        <path d="M50 90 Q50 55 45 45 C35 45 25 35 35 20 C42 15 50 30 50 45 C50 30 58 15 65 20 C75 35 65 45 55 45 Z" />
      </svg>
    )
  },
  {
    quote: "He that plants trees loves others besides himself.",
    author: "Thomas Fuller",
    directive: "Shared roots strengthen the entire grove. Share your sketches in the Specimen Album to stay accountable.",
    specimenName: "Maple Seedling (Acer)",
    specimenFact: "Maple seeds have wing-like structures called samaras, enabling them to spin like helicopters.",
    specimenSvg: (
      <svg viewBox="0 0 100 100" className="animated-specimen-svg" style={{ width: 64, height: 64, fill: 'none', stroke: '#8ba87b', strokeWidth: 1.5 }}>
        <path d="M50 90 L50 55 M50 55 C40 50 30 40 45 30 L50 15 L55 30 C70 40 60 50 50 55 Z" />
      </svg>
    )
  }
];

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard({ user }) {
  const [habits, setHabits] = useState([])
  const [logs, setLogs] = useState([]) // all logs
  const [todayLogs, setTodayLogs] = useState([]) // today's completed habit IDs
  const [streaks, setStreaks] = useState({})
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const today = getTodayStr()
  const now = new Date()
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'Gardener'

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    const dayName = DAYS[d.getDay()]
    const completedOnDay = logs.filter(log => log.completed_date === dateStr).length
    const totalOnDay = habits.length
    const pct = totalOnDay > 0 ? (completedOnDay / totalOnDay) * 100 : 0
    return { dayName, dateStr, completedOnDay, pct }
  })

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [{ data: habitsData }, { data: logsData }] = await Promise.all([
      supabase.from('habits').select('*').eq('user_id', user.id).order('created_at'),
      supabase.from('habit_logs').select('*').eq('user_id', user.id),
    ])
    const h = habitsData || []
    const l = logsData || []
    setHabits(h)
    setLogs(l)
    setTodayLogs(l.filter(log => log.completed_date === today).map(log => log.habit_id))
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

  async function handleToggle(habit) {
    const isCompleted = todayLogs.includes(habit.id)
    if (isCompleted) {
      await supabase.from('habit_logs').delete()
        .eq('habit_id', habit.id).eq('completed_date', today)
      setTodayLogs(prev => prev.filter(id => id !== habit.id))
    } else {
      const { data } = await supabase.from('habit_logs').insert({
        habit_id: habit.id, user_id: user.id, completed_date: today
      }).select().single()
      if (data) {
        setTodayLogs(prev => [...prev, habit.id])
        setLogs(prev => [...prev, data])
        setStreaks(prev => ({ ...prev, [habit.id]: (prev[habit.id] || 0) + 1 }))
      }
    }
  }

  async function handleDelete(habitId) {
    await supabase.from('habits').delete().eq('id', habitId)
    setHabits(prev => prev.filter(h => h.id !== habitId))
    setTodayLogs(prev => prev.filter(id => id !== habitId))
  }

  async function handleAddHabit(habitData) {
    const { data, error } = await supabase.from('habits').insert({
      ...habitData, user_id: user.id
    }).select().single()
    if (data) {
      setHabits(prev => [...prev, data])
      setStreaks(prev => ({ ...prev, [data.id]: 0 }))
    }
  }

  const completedCount = todayLogs.length

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
      <p style={{ color: 'var(--text-muted)' }}>Growing your garden...</p>
    </div>
  )

  return (
    <div className="fade-up">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>
          {getGreeting()}, {displayName} 🌿
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
          {DAYS[now.getDay()]}, {MONTHS[now.getMonth()]} {now.getDate()} · {completedCount} of {habits.length} habits done today
        </p>
      </div>

      {/* Quick stats row */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        {[
          { label: 'Today\'s Progress', value: `${completedCount}/${habits.length}`, icon: '🌿', color: 'var(--accent-sage)' },
          { label: 'Longest Streak', value: `${Math.max(0, ...Object.values(streaks))} days`, icon: '🔥', color: 'var(--accent-amber)' },
          { label: 'Total Log Entries', value: logs.length, icon: '📊', color: 'var(--accent-terra)' },
        ].map(stat => (
          <div key={stat.label} className="glass-card stat-card" style={{
            padding: '20px',
            borderRadius: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="stat-label" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 16 }}>{stat.icon}</span>
            </div>
            <div className="stat-value" style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'Playfair Display, serif'
            }}>{stat.value}</div>
          </div>
        ))}
      </div>
      {/* Main layout: habits + root tree */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Habits */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--text-primary)' }}>Active Garden Plots</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Sow Seed
            </button>
          </div>

          {habits.length === 0 ? (
            <div className="glass-card empty-state" style={{ borderRadius: 0, border: '1px solid var(--border-subtle)', padding: '48px 24px', textAlign: 'center' }}>
              <span className="empty-icon" style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>🌱</span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 8 }}>Your garden plots are empty</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Sow your first seed to start growing your root system</p>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setShowModal(true)}>
                + Sow First Seed
              </button>
            </div>
          ) : (
            <>
              <div className="grid-auto">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    isCompleted={todayLogs.includes(habit.id)}
                    streak={streaks[habit.id] || 0}
                    onToggle={() => handleToggle(habit)}
                    onDelete={() => handleDelete(habit.id)}
                  />
                ))}
              </div>

              {/* Daily Study & Field Directives Widget */}
              {(() => {
                const todayData = FIELD_GUIDE_DATA[now.getDay() % FIELD_GUIDE_DATA.length];
                return (
                  <div className="glass-card fade-in" style={{
                    marginTop: 32,
                    padding: '24px 28px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 0,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.015)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 160px',
                    gap: 24,
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 18 }}>📖</span>
                        <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', margin: 0 }}>
                          Daily Study & Field Directives
                        </h3>
                      </div>
                      
                      <blockquote style={{ 
                        margin: '0 0 16px 0', 
                        fontStyle: 'italic', 
                        fontSize: 13, 
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        borderLeft: '2px solid var(--accent-sage)',
                        paddingLeft: 14
                      }}>
                        "{todayData.quote}"
                        <span style={{ fontStyle: 'normal', fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 4 }}>
                          — {todayData.author}
                        </span>
                      </blockquote>
                      
                      <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-amber)', marginBottom: 6 }}>
                        Soil & Rooting Actionable Directive
                      </div>
                      <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {todayData.directive}
                      </p>
                    </div>

                    {/* Botanical Specimen card of the day */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.01)',
                      border: '1px solid var(--border-subtle)',
                      padding: 16,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 0
                    }}>
                      <div style={{ marginBottom: 8, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {todayData.specimenSvg}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                        {todayData.specimenName}
                      </div>
                      <div style={{ fontSize: 9.5, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {todayData.specimenFact}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Weekly Trends Widget */}
              <div className="glass-card fade-in" style={{
                marginTop: 24,
                padding: '24px 28px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 0,
                boxShadow: '0 4px 24px rgba(0,0,0,0.015)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>📈</span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', margin: 0 }}>
                      Weekly Soil Vitality Trends
                    </h3>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                    Cultivation Logs
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 20 }}>
                  {last7Days.map((day, idx) => {
                    const isToday = idx === 6;
                    return (
                      <div key={day.dateStr} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        padding: '12px 6px',
                        background: isToday ? 'rgba(143, 160, 116, 0.08)' : 'rgba(0, 0, 0, 0.01)',
                        border: isToday ? '1px solid var(--accent-sage)' : '1px solid var(--border-subtle)',
                        position: 'relative'
                      }}>
                        <span style={{ fontSize: 10, fontWeight: isToday ? 700 : 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                          {day.dayName}
                        </span>
                        
                        {/* Visual completion indicator */}
                        <div style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          background: day.pct === 100 ? 'var(--accent-sage)' : day.pct > 0 ? 'rgba(143, 160, 116, 0.15)' : 'rgba(0, 0, 0, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          transition: 'all 0.3s'
                        }}>
                          {day.pct === 100 ? '🌿' : day.pct > 0 ? '🌱' : '🟤'}
                        </div>
                        
                        <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 8 }}>
                          {day.completedOnDay}/{habits.length}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.01)', padding: '12px 16px', borderLeft: '3px solid var(--accent-sage)', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong>Cultivation Insight:</strong> {
                    last7Days.filter(d => d.pct === 100).length >= 5
                      ? "Exceptional root density! Your garden plots have reached optimal water assimilation this week."
                      : last7Days.filter(d => d.pct > 0).length >= 3
                      ? "Steady germination. Keep watering your plots daily to stabilize the soil layer horizons."
                      : "Welcome to the sowing phase! Plant more seeds or cultivate daily consistency to start spreading roots."
                  }
                </div>
              </div>
            </>
          )}
        </div>

        {/* Root Tree */}
        <div style={{ position: 'sticky', top: 24 }}>
          <RootTree
            habits={habits}
            completedToday={completedCount}
            totalHabits={habits.length}
          />
        </div>
      </div>

      {/* Motivational quote */}
      {completedCount === habits.length && habits.length > 0 && (
        <div className="glass-card" style={{
          marginTop: 28, padding: '20px 24px', textAlign: 'center',
          borderColor: 'rgba(212,168,83,0.3)',
          background: 'linear-gradient(135deg, rgba(212,168,83,0.05), rgba(107,158,107,0.05))',
          animation: 'pulse-glow 2s ease-in-out infinite'
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🌳</div>
          <h3 style={{ color: 'var(--accent-amber)', marginBottom: 4 }}>Perfect Day!</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            All habits completed. Your roots grow deeper with every consistent day.
          </p>
        </div>
      )}

      {showModal && (
        <AddHabitModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddHabit}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
