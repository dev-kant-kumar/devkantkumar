import { BookOpen, Brain, FolderOpen, HelpCircle, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/ai-lab', label: 'Home', icon: Home, end: true },
    { to: '/ai-lab/sessions', label: 'Sessions', icon: BookOpen },
    { to: '/ai-lab/quiz', label: 'Quiz', icon: HelpCircle },
    { to: '/ai-lab/resources', label: 'Resources', icon: FolderOpen },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link to="/ai-lab" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              padding: '0.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            }}>
              <Brain style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>AI Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  color: isActive ? '#c4b5fd' : '#d1d5db',
                })}
              >
                <link.icon style={{ width: '16px', height: '16px' }} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#d1d5db',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            {isMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className="mobile-nav"
          style={{
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            padding: '1rem 0',
            borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                color: isActive ? '#c4b5fd' : '#d1d5db',
              })}
            >
              <link.icon style={{ width: '20px', height: '20px' }} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
