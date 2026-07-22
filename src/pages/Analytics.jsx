import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function getDateStr(daysAgo) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function getIntensity(count, max) {
  if (count === 0) return 0
  if (max === 0) return 0
  return Math.ceil((count / max) * 4)
}

const INTENSITY_COLORS = [
  'rgba(104,140,5,0.06)',
  'rgba(104,140,5,0.20)',
  'rgba(104,140,5,0.45)',
  'rgba(104,140,5,0.70)',
  'rgba(104,140,5,0.95)',
]

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Analytics({ user }) {
  const [habits, setHabits] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHabit, setSelectedHabit] = useState('all')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const [{ data: h }, { data: l }] = await Promise.all([
      supabase.from('habits').select('*').eq('user_id', user.id),
      supabase.from('habit_logs').select('*').eq('user_id', user.id),
    ])
    setHabits(h || [])
    setLogs(l || [])
    setLoading(false)
  }

  // Build 90-day heatmap data
  const heatmapDays = 91
  const heatmapData = []
  const filteredLogs = selectedHabit === 'all'
    ? logs
    : logs.filter(l => l.habit_id === selectedHabit)

  for (let i = heatmapDays - 1; i >= 0; i--) {
    const dateStr = getDateStr(i)
    const count = filteredLogs.filter(l => l.completed_date === dateStr).length
    heatmapData.push({ date: dateStr, count })
  }
  const maxCount = Math.max(1, ...heatmapData.map(d => d.count))

  // Weekly completion for bar chart (last 8 weeks)
  const weeks = []
  for (let w = 7; w >= 0; w--) {
    const weekLogs = []
    for (let d = 0; d < 7; d++) {
      const daysAgo = w * 7 + d
      const dateStr = getDateStr(daysAgo)
      const dayLogs = filteredLogs.filter(l => l.completed_date === dateStr)
      weekLogs.push(dayLogs.length)
    }
    const total = weekLogs.reduce((a, b) => a + b, 0)
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - w * 7 - 6)
    weeks.push({ total, label: `${MONTHS_SHORT[weekStart.getMonth()]} ${weekStart.getDate()}` })
  }
  const maxWeekTotal = Math.max(1, ...weeks.map(w => w.total))

  // Overall stats
  const totalCompletions = filteredLogs.length
  const uniqueDays = new Set(filteredLogs.map(l => l.completed_date)).size
  const thisWeekLogs = filteredLogs.filter(l => {
    const d = new Date(l.completed_date)
    const now = new Date()
    const diff = (now - d) / (1000 * 60 * 60 * 24)
    return diff < 7
  }).length

  // Heatmap grid rows (7 days per row)
  const heatRows = []
  for (let r = 0; r < Math.ceil(heatmapDays / 7); r++) {
    heatRows.push(heatmapData.slice(r * 7, r * 7 + 7))
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
    </div>
  )

  return (
    <div className="fade-up">
      <div className="page-header" style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>Analytics 📊</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>Track your consistency and growth over time</p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        <button
          className={`btn ${selectedHabit === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedHabit('all')}
        >All Habits</button>
        {habits.map(h => (
          <button
            key={h.id}
            className={`btn ${selectedHabit === h.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedHabit(h.id)}
          >
            {h.icon} {h.name}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {[
          { label: 'Total Completions', value: totalCompletions, icon: '✅', color: 'var(--accent-sage)' },
          { label: 'Active Days', value: uniqueDays, icon: '📅', color: 'var(--accent-amber)' },
          { label: 'This Week', value: thisWeekLogs, icon: '⚡', color: 'var(--accent-terra)' },
        ].map(s => (
          <div key={s.label} className="glass-card stat-card" style={{
            padding: '24px 20px',
            borderRadius: 0,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(197, 240, 21, 0.16)',
            position: 'relative',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            {/* Inner cabinet outline */}
            <div style={{
              position: 'absolute', inset: 6,
              border: '1px solid rgba(197, 240, 21, 0.04)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="stat-label" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10.5,
                fontWeight: 800,
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>{s.label}</span>
              <span style={{ fontSize: 13, color: s.color, fontWeight: 800 }}>{s.icon}</span>
            </div>
            <div className="stat-value" style={{
              fontSize: 28,
              fontWeight: 800,
              color: s.color,
              fontFamily: 'DM Sans, sans-serif'
            }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: 24, borderRadius: 0, border: '1px solid rgba(197, 240, 21, 0.16)', background: 'rgba(255, 255, 255, 0.02)' }}>
        <h2 style={{ fontSize: 18, fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>90-Day Activity Heatmap</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>Each cell = number of habits completed that day</p>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 4, minWidth: 'max-content' }}>
            {heatRows.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {row.map((cell, ci) => {
                  const intensity = getIntensity(cell.count, maxCount)
                  return (
                    <div
                      key={ci}
                      data-tooltip={`${cell.date}: ${cell.count} completion${cell.count !== 1 ? 's' : ''}`}
                      style={{
                        width: 14, height: 14,
                        borderRadius: 0, /* Strict 90-degree */
                        background: INTENSITY_COLORS[intensity],
                        border: '1px solid rgba(104,140,5,0.12)',
                        cursor: 'default',
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.35)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Less</span>
          {INTENSITY_COLORS.map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 0, background: c, border: '1px solid rgba(104,140,5,0.12)' }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: 0, border: '1px solid rgba(197, 240, 21, 0.16)', background: 'rgba(255, 255, 255, 0.02)' }}>
        <h2 style={{ fontSize: 18, fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Weekly Completions</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Total habit completions per week (last 8 weeks)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
          {weeks.map((week, i) => {
            const h = maxWeekTotal > 0 ? (week.total / maxWeekTotal) * 140 : 0
            const isCurrentWeek = i === weeks.length - 1
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{week.total}</div>
                <div style={{
                  width: '100%', height: Math.max(4, h),
                  background: isCurrentWeek
                    ? 'linear-gradient(180deg, var(--accent-amber), var(--accent-sage))'
                    : 'linear-gradient(180deg, rgba(104,140,5,0.45), rgba(104,140,5,0.22))',
                  borderRadius: 0, /* Strict 90-degree */
                  transition: 'height 0.8s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: isCurrentWeek ? '0 0 12px rgba(104,140,5,0.35)' : 'none',
                  position: 'relative',
                  minHeight: 4,
                }} />
                <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{week.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {habits.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🌱</span>
          <h3>No habits yet</h3>
          <p>Go to Today's view and plant your first habit to start seeing analytics</p>
        </div>
      )}
    </div>
  )
}
