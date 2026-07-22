export default function RootTree({ habits, completedToday, totalHabits }) {
  const completionRate = totalHabits > 0 ? completedToday / totalHabits : 0

  // Generate root paths based on habits
  const rootPaths = [
    // Main trunk
    { d: 'M 200 280 Q 200 220 200 160', strokeWidth: 6 },
    // Left main
    { d: 'M 200 200 Q 160 190 120 170 Q 90 155 70 140', strokeWidth: 4 },
    // Right main
    { d: 'M 200 200 Q 240 185 270 165 Q 295 148 320 135', strokeWidth: 4 },
    // Left sub
    { d: 'M 150 178 Q 120 165 95 150 Q 75 138 55 125', strokeWidth: 2.5 },
    // Right sub
    { d: 'M 255 178 Q 285 162 305 148 Q 325 135 340 118', strokeWidth: 2.5 },
    // Left leaf branch
    { d: 'M 120 170 Q 100 145 80 120 Q 65 102 50 85', strokeWidth: 2 },
    // Right leaf branch
    { d: 'M 270 165 Q 295 140 315 112 Q 330 90 345 70', strokeWidth: 2 },
    // Center left
    { d: 'M 200 160 Q 175 140 155 115 Q 140 95 125 75', strokeWidth: 2 },
    // Center right
    { d: 'M 200 160 Q 225 140 242 112 Q 255 90 265 68', strokeWidth: 2 },
    // Tiny left
    { d: 'M 90 145 Q 72 128 58 108', strokeWidth: 1.5 },
    // Tiny right
    { d: 'M 305 148 Q 328 130 345 108', strokeWidth: 1.5 },
  ]

  const visibleRoots = Math.max(1, Math.ceil(rootPaths.length * completionRate))
  const groundRoots = [
    { d: 'M 200 280 Q 190 310 170 330 Q 150 350 130 360', strokeWidth: 4 },
    { d: 'M 200 280 Q 215 315 235 335 Q 255 355 275 365', strokeWidth: 4 },
    { d: 'M 200 280 Q 180 320 155 345 Q 135 365 110 375', strokeWidth: 3 },
    { d: 'M 200 280 Q 222 318 248 340 Q 268 358 295 368', strokeWidth: 3 },
    { d: 'M 200 280 Q 185 330 158 358 Q 138 378 112 392', strokeWidth: 2 },
    { d: 'M 200 280 Q 218 328 244 355 Q 268 375 296 385', strokeWidth: 2 },
  ]

  const visibleGround = Math.max(1, Math.ceil(groundRoots.length * completionRate))

  return (
    <div className="root-tree-container glass-card" style={{
      borderRadius: 0,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      padding: '24px 20px',
      position: 'relative',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }}>
      <div className="root-tree-header">
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Your Root System</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
            {completedToday} of {totalHabits} habits done today
          </p>
        </div>
        <div className="root-score" style={{ borderRadius: 0, background: 'rgba(104,140,5,0.05)', border: '1px solid var(--border-subtle)', padding: '10px 16px' }}>
          <div className="root-score-number" style={{ color: 'var(--accent-amber)', fontSize: 26, fontWeight: 800 }}>{Math.round(completionRate * 100)}%</div>
          <div style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 2, fontWeight: 600 }}>rooted</div>
        </div>
      </div>

      <div className="root-tree-svg-wrap">
        <svg viewBox="0 0 400 450" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'block', background: 'rgba(11,28,14,0.02)' }}>
          <defs>
            <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(104,140,5,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ground ellipse */}
          <ellipse cx="200" cy="285" rx="80" ry="10" fill="rgba(104,140,5,0.06)" />

          {/* Ground roots */}
          {groundRoots.slice(0, visibleGround).map((root, i) => (
            <path key={`g${i}`} d={root.d}
              stroke={`rgba(104,140,5,${0.3 + (i % 2) * 0.1})`}
              strokeWidth={root.strokeWidth}
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 0,
                animation: `rootGrow 1.2s ease ${i * 0.12}s both`,
              }}
            />
          ))}

          {/* Trunk */}
          <path d="M 200 285 Q 198 260 200 240 Q 202 220 200 200 Q 198 175 200 155"
            stroke="var(--accent-sage)"
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Branches */}
          {rootPaths.slice(0, visibleRoots).map((root, i) => (
            <path key={`b${i}`} d={root.d}
              stroke={`rgba(104,140,5,${0.7 - i * 0.04})`}
              strokeWidth={root.strokeWidth}
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 0,
                animation: `rootGrow 1s ease ${0.3 + i * 0.1}s both`,
              }}
            />
          ))}

          {/* Leaf clusters at branch tips when highly complete */}
          {completionRate > 0.5 && (
            <>
              {[
                { cx: 70, cy: 135 }, { cx: 55, cy: 85 }, { cx: 125, cy: 75 },
                { cx: 265, cy: 68 }, { cx: 345, cy: 68 }, { cx: 320, cy: 135 },
              ].slice(0, Math.ceil(6 * (completionRate - 0.5) * 2)).map((leaf, i) => (
                <g key={`leaf${i}`} style={{ animation: `fadeIn 0.5s ease ${i * 0.1}s both` }}>
                  <circle cx={leaf.cx} cy={leaf.cy} r={8 + Math.random() * 6}
                    fill={`rgba(104,140,5,${0.2 + Math.random() * 0.15})`} />
                  <circle cx={leaf.cx + 6} cy={leaf.cy - 5} r={6}
                    fill={`rgba(104,140,5,${0.15 + Math.random() * 0.1})`} />
                </g>
              ))}
            </>
          )}

          {/* Center glow when fully complete */}
          {completionRate === 1 && (
            <ellipse cx="200" cy="200" rx="60" ry="80"
              fill="url(#glowGrad)"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            />
          )}
        </svg>
      </div>

      {/* Clean Solid Progress Bar */}
      <div style={{ padding: '8px 4px 12px' }}>
        <div style={{
          height: 6, background: 'rgba(11,28,14,0.06)', overflow: 'hidden',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            height: '100%',
            width: `${completionRate * 100}%`,
            background: 'var(--accent-amber)',
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(162,255,51,0.2)'
          }} />
        </div>
      </div>

      {/* Soil Horizon Depth Tracker */}
      <div style={{ marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10, color: 'var(--text-primary)' }}>
          Soil Horizons Anchored
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { label: 'Humus Layer', depth: '0-25%', desc: 'Rich organic nutrients', active: completionRate > 0 },
            { label: 'Topsoil Horizon', depth: '26-50%', desc: 'Active mineral root zone', active: completionRate >= 0.25 },
            { label: 'Subsoil Horizon', depth: '51-75%', desc: 'Clay and iron deposits', active: completionRate >= 0.50 },
            { label: 'Bedrock Anchor', depth: '76-100%', desc: 'Deep crystalline baseline', active: completionRate >= 0.75 },
          ].reverse().map((layer) => (
            <div 
              key={layer.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                border: `1px solid ${layer.active ? 'rgba(104,140,5,0.25)' : 'var(--border-subtle)'}`,
                background: layer.active ? 'rgba(104,140,5,0.04)' : 'transparent',
                transition: 'all 0.3s'
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: layer.active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {layer.active ? '✓ ' : '○ '}{layer.label}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{layer.desc}</div>
              </div>
              <div style={{ 
                fontSize: 10.5, 
                fontFamily: 'monospace', 
                color: layer.active ? 'var(--accent-amber)' : 'var(--text-muted)',
                fontWeight: 700
              }}>
                {layer.depth}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .root-tree-container { padding: 24px; }
        .root-tree-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .root-tree-header h2 { font-size: 20px; }
        .root-score {
          text-align: center;
        }
        .root-score-number {
          font-family: 'Playfair Display', serif;
          line-height: 1;
        }
        .root-tree-svg-wrap {
          padding: 8px;
        }
      `}</style>
    </div>
  )
}
