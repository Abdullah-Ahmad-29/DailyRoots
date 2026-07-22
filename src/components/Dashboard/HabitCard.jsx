import { useState, useEffect, useRef } from 'react'
import { playWaterDrip } from '../../lib/sound'

function getPlantStage(streak) {
  if (streak >= 30) return { emoji: '🌳', label: 'Ancient Tree', level: 5 }
  if (streak >= 14) return { emoji: '🌲', label: 'Tall Tree', level: 4 }
  if (streak >= 7) return { emoji: '🌿', label: 'Bush', level: 3 }
  if (streak >= 3) return { emoji: '🌱', label: 'Sprout', level: 2 }
  return { emoji: '🪴', label: 'Seedling', level: 1 }
}

function createConfetti(container) {
  const colors = ['#d4a853', '#6b9e6b', '#c17a5c', '#8ec48e', '#e8c27a']
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    el.style.cssText = `
      left: ${30 + Math.random() * 40}%;
      top: ${20 + Math.random() * 30}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.3}s;
      animation-duration: ${0.6 + Math.random() * 0.4}s;
      transform: rotate(${Math.random() * 360}deg);
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `
    container.appendChild(el)
    setTimeout(() => el.remove(), 1000)
  }
}

export default function HabitCard({ habit, isCompleted, streak, onToggle, onDelete }) {
  const [animating, setAnimating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [spores, setSpores] = useState([])
  const cardRef = useRef(null)

  const plant = getPlantStage(streak)

  const handleToggle = async () => {
    if (animating) return
    setAnimating(true)
    
    if (!isCompleted) {
      playWaterDrip()
      
      // Generate spore particles
      const newSpores = Array.from({ length: 14 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 80, // Sideways drift
        y: -Math.random() * 90 - 30,  // Float upwards
        delay: Math.random() * 0.15
      }))
      setSpores(newSpores)
      setTimeout(() => setSpores([]), 1100)
    }
    
    await onToggle()
    setTimeout(() => setAnimating(false), 600)
  }

  const handleDelete = async () => {
    if (!window.confirm(`Remove "${habit.name}"? This will delete all its history.`)) return
    setDeleting(true)
    await onDelete()
  }

  return (
    <div
      ref={cardRef}
      className="glass-card habit-card"
      style={{
        opacity: deleting ? 0.5 : 1,
        borderColor: isCompleted ? 'rgba(104,140,5,0.25)' : 'var(--border-subtle)',
        borderLeft: `4px solid ${habit.color}`,
        borderRadius: 0,
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-card)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
      }}
    >
      {/* Completed glow overlay */}
      {isCompleted && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at top left, ${habit.color}05 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      )}

      <div className="habit-card-top">
        <div className="habit-icon-wrap" style={{ background: `${habit.color}15`, border: `1px solid ${habit.color}25`, borderRadius: 0 }}>
          <span style={{ fontSize: 20 }}>{habit.icon}</span>
        </div>
        <div className="habit-meta">
          <h3 className="habit-name" style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700 }}>{habit.name}</h3>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
            <span className="badge badge-sage" style={{ fontSize: 10, borderRadius: 0, background: 'rgba(104,140,5,0.08)', border: '1px solid rgba(104,140,5,0.15)', color: 'var(--accent-amber)', textTransform: 'uppercase', fontWeight: 700, padding: '2px 6px' }}>{habit.category}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{habit.frequency}</span>
          </div>
        </div>
        <button className="btn btn-ghost delete-btn" onClick={handleDelete} data-tooltip="Remove habit"
          style={{ opacity: 0, fontSize: 13, color: 'var(--accent-terra)', padding: '6px 8px', cursor: 'pointer' }}>🗑</button>
      </div>

      <div className="habit-card-bottom" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, marginTop: 6 }}>
        <div className="habit-plant">
          <span style={{ fontSize: 20, display: 'block', lineHeight: 1 }}>{plant.emoji}</span>
          <div className="habit-streak">
            <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15 }}>{streak}</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block' }}>soil vitality</span>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className={`habit-check-btn ${isCompleted ? 'completed' : ''} ${animating ? 'animating' : ''}`}
            onClick={handleToggle}
            disabled={deleting}
            style={{ 
              borderRadius: '50%',
              border: `2px solid ${habit.color}`,
              background: isCompleted ? habit.color : 'transparent',
              color: '#ffffff',
              width: 34,
              height: 34,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isCompleted ? '✓' : ''}
          </button>
          
          {spores.map(spore => (
            <div
              key={spore.id}
              style={{
                position: 'absolute',
                width: 5, height: 5,
                background: 'var(--accent-amber)',
                borderRadius: '50%',
                boxShadow: '0 0 6px var(--accent-amber)',
                pointerEvents: 'none',
                left: '50%',
                top: '50%',
                zIndex: 10,
                '--tx': `${spore.x}px`,
                '--ty': `${spore.y}px`,
                animation: 'sporeDrift 0.8s ease-out forwards'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .habit-card {
          padding: 20px;
          cursor: default;
          transition: var(--transition);
        }
        .habit-card:hover .delete-btn { opacity: 1 !important; }
        .habit-card-top {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .habit-icon-wrap {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .habit-meta { flex: 1; min-width: 0; }
        .habit-name {
          color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .habit-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .habit-plant {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .habit-streak { line-height: 1.1; }
        .habit-check-btn {
          border: 2px solid;
          font-weight: 800;
          color: var(--bg-primary);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .habit-check-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        }
        .habit-check-btn.completed {
          animation: checkBounce 0.4s ease;
          color: var(--bg-primary);
        }
        .habit-check-btn.animating {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  )
}
