// Rich content components for sessions
import {
    AlertCircle,
    ExternalLink,
    Lightbulb,
    Play,
    Star, Zap
} from 'lucide-react';

// Tip/Highlight Box
export const TipBox = ({ children, type = 'tip' }) => {
  const styles = {
    tip: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', icon: Lightbulb, color: '#4ade80', label: '💡 Pro Tip' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', icon: AlertCircle, color: '#fbbf24', label: '⚠️ Important' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', icon: Zap, color: '#60a5fa', label: 'ℹ️ Did You Know?' },
    success: { bg: 'rgba(168, 85, 247, 0.1)', border: '#a855f7', icon: Star, color: '#c4b5fd', label: '✨ Fun Fact' },
  };
  const s = styles[type] || styles.tip;

  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}30`,
      borderLeft: `4px solid ${s.border}`,
      borderRadius: '0.75rem',
      padding: '1rem 1.25rem',
      margin: '1.5rem 0',
    }}>
      <div style={{ color: s.color, fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
        {s.label}
      </div>
      <div style={{ color: '#e5e7eb', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
};

// Feature Card Grid
export const FeatureGrid = ({ children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    margin: '1.5rem 0',
  }}>
    {children}
  </div>
);

// Feature Card
export const FeatureCard = ({ icon: Icon, title, children, color = '#a855f7' }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    textAlign: 'center',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '0.75rem',
      background: `linear-gradient(135deg, ${color}30, ${color}15)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 0.75rem',
    }}>
      {Icon && <Icon style={{ width: '24px', height: '24px', color }} />}
    </div>
    <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h4>
    <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.5 }}>{children}</p>
  </div>
);

// List with icons
export const IconList = ({ items }) => (
  <div style={{ margin: '1rem 0' }}>
    {items.map((item, i) => (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.5rem 0',
        borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{item.icon}</span>
        <div>
          {item.title && <strong style={{ color: '#ffffff' }}>{item.title}: </strong>}
          <span style={{ color: '#d1d5db' }}>{item.text}</span>
        </div>
      </div>
    ))}
  </div>
);

// Big Quote/Highlight
export const BigQuote = ({ children, author }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
    borderRadius: '1rem',
    padding: '2rem',
    margin: '2rem 0',
    textAlign: 'center',
    position: 'relative',
  }}>
    <div style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '0.5rem' }}>"</div>
    <p style={{ color: '#ffffff', fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', fontWeight: 500, lineHeight: 1.6 }}>
      {children}
    </p>
    {author && <p style={{ color: '#a78bfa', marginTop: '1rem', fontSize: '0.9rem' }}>— {author}</p>}
  </div>
);

// Demo/Interactive Box
export const DemoBox = ({ title, children }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
    border: '2px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '1rem',
    padding: '1.5rem',
    margin: '1.5rem 0',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      color: '#4ade80',
      fontWeight: 600,
    }}>
      <Play style={{ width: '20px', height: '20px' }} />
      {title || 'Try It Yourself!'}
    </div>
    <div style={{ color: '#d1d5db', lineHeight: 1.7 }}>{children}</div>
  </div>
);

// App showcase card
export const AppCard = ({ icon: Icon, name, features, color }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '0.75rem',
    padding: '1rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '0.5rem',
      background: color || 'linear-gradient(135deg, #a855f7, #ec4899)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {Icon && <Icon style={{ width: '20px', height: '20px', color: 'white' }} />}
    </div>
    <div>
      <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.25rem' }}>{name}</h4>
      <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.5 }}>{features}</p>
    </div>
  </div>
);

// Stats/Number highlight
export const StatHighlight = ({ number, label, color = '#a855f7' }) => (
  <div style={{ textAlign: 'center', padding: '1rem' }}>
    <div style={{
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      background: `linear-gradient(135deg, ${color}, #ec4899)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {number}
    </div>
    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{label}</div>
  </div>
);

// Section divider
export const Divider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '2rem 0',
    color: 'rgba(168, 85, 247, 0.3)',
  }}>
    <div style={{ flex: 1, height: '1px', background: 'rgba(168, 85, 247, 0.2)' }} />
    <Star style={{ width: '16px', height: '16px' }} />
    <div style={{ flex: 1, height: '1px', background: 'rgba(168, 85, 247, 0.2)' }} />
  </div>
);

// Code/Command box
export const CodeBox = ({ children, title }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    margin: '1rem 0',
  }}>
    {title && (
      <div style={{
        background: 'rgba(168, 85, 247, 0.1)',
        padding: '0.5rem 1rem',
        color: '#a78bfa',
        fontSize: '0.8rem',
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
      }}>
        {title}
      </div>
    )}
    <div style={{ padding: '1rem', fontFamily: 'monospace', color: '#e5e7eb', fontSize: '0.9rem' }}>
      {children}
    </div>
  </div>
);

// Link card
export const LinkCard = ({ href, title, description }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '0.75rem',
      textDecoration: 'none',
      margin: '1rem 0',
    }}
  >
    <ExternalLink style={{ width: '24px', height: '24px', color: '#60a5fa', flexShrink: 0 }} />
    <div>
      <div style={{ color: '#60a5fa', fontWeight: 600 }}>{title}</div>
      <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{description}</div>
    </div>
  </a>
);

export default {
  TipBox,
  FeatureGrid,
  FeatureCard,
  IconList,
  BigQuote,
  DemoBox,
  AppCard,
  StatHighlight,
  Divider,
  CodeBox,
  LinkCard,
};
