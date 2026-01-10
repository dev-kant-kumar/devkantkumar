import { Brain, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(15, 23, 42, 0.8)',
      borderTop: '1px solid rgba(168, 85, 247, 0.2)',
      padding: '1.5rem 1rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}>
          {/* Logo */}
          <Link to="/ai-lab" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              padding: '0.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            }}>
              <Brain style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#ffffff' }}>AI Lab</span>
          </Link>

          {/* Copyright */}
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9ca3af', fontSize: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            Made with <Heart style={{ width: '16px', height: '16px', color: '#ec4899', fill: '#ec4899' }} /> for AI Learners
          </p>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/ai-lab/resources" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              Resources
            </Link>
            <a
              href="https://devkantkumar.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#9ca3af', textDecoration: 'none' }}
            >
              Dev Kant Kumar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
