import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/dashboard', icon: '🌿', label: 'Today\'s Garden' },
  { to: '/specimen-album', icon: '📖', label: 'Specimen Album' },
  { to: '/ai-advisor', icon: '🔬', label: 'AI Advisor' },
  { to: '/analytics', icon: '📊', label: 'Analytics' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

export default function Navbar({ user }) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gardener'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🌿</div>
          <div>
            <div className="sidebar-logo-name">Daily<span style={{ color: 'var(--accent-amber)' }}>Roots</span></div>
            <div className="sidebar-logo-tagline">Grow every day</div>
          </div>
        </div>

        {/* User Card */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{displayName}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>

        <div className="divider" />

        {/* Nav Links */}
        <div className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button 
            className="btn" 
            onClick={handleSignOut} 
            style={{ 
              width: '100%', 
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              transition: 'all 0.2s',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="mobile-nav">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span>{item.label.split(' ')[0]}</span>
          </NavLink>
        ))}
        <button className="mobile-nav-item" onClick={handleSignOut} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: 18 }}>🚪</span>
          <span>Exit</span>
        </button>
      </nav>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          z-index: 100;
          overflow-y: auto;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px;
          margin-bottom: 28px;
        }

        .sidebar-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent-sage), var(--accent-amber));
          border-radius: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .sidebar-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #f8fdf0;
          font-weight: 700;
        }

        .sidebar-logo-tagline {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 1px;
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }

        .sidebar-avatar {
          width: 36px;
          height: 36px;
          background: var(--accent-amber);
          border-radius: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #0b1c0e;
          flex-shrink: 0;
        }

        .sidebar-user-name {
          font-size: 13px;
          font-weight: 600;
          color: #f8fdf0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-user-email {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-user-info {
          min-width: 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 0px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #a2ff33;
          opacity: 0;
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease;
        }

        .sidebar-link:hover {
          background: rgba(255,255,255,0.02);
          color: #a2ff33;
        }

        .sidebar-link.active {
          background: rgba(162, 255, 51, 0.08);
          color: #a2ff33;
        }

        .sidebar-link.active::before {
          opacity: 1;
          transform: scaleY(1);
        }

        .sidebar-link-icon { font-size: 18px; }

        .sidebar-footer {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          z-index: 100;
          align-items: center;
          justify-content: space-around;
          padding: 0 8px;
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          color: var(--text-muted);
          font-size: 10px;
          text-decoration: none;
          padding: 8px 16px;
          transition: var(--transition);
          cursor: pointer;
        }

        .mobile-nav-item.active {
          color: var(--accent-amber);
        }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-nav { display: flex; }
        }
      `}</style>
    </>
  )
}
