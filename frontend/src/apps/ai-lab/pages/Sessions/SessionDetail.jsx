import {
    AlertCircle,
    ArrowLeft, ArrowRight,
    BookOpen,
    Brain,
    Calendar,
    Camera,
    ChartBar,
    CheckCircle,
    CheckCircle2,
    ChevronDown, ChevronUp,
    Clock,
    Ear,
    ExternalLink,
    Eye,
    FileText,
    FlaskConical,
    GraduationCap,
    Instagram,
    Keyboard,
    Lightbulb,
    Lock,
    Map,
    MessageSquare,
    Mic,
    Music,
    PenLine,
    PenTool,
    Play,
    Search,
    Shield,
    Star,
    Youtube,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead, {
    StructuredData,
    getBreadcrumbStructuredData,
    getFAQStructuredData,
    getSessionStructuredData
} from '../../common/components/SEOHead';
import { getSessionBySlug, sessions } from '../DailySessions';

// Icon mapping
const iconMap = {
  Eye, Ear, MessageSquare, PenTool, Camera, Keyboard, Lock, Mic, Shield,
  Youtube, Map, Instagram, Music, Search, Brain, FileText, PenLine, FlaskConical,
  ChartBar, GraduationCap, BookOpen, Lightbulb, AlertCircle, Star, Zap, CheckCircle2
};

const getIcon = (iconName) => iconMap[iconName] || Star;

// ============================================
// RICH CONTENT COMPONENTS
// ============================================

// Highlighted text box
const Highlight = ({ children, color = 'purple' }) => {
  const colors = {
    purple: { bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', text: '#c4b5fd' },
    green: { bg: 'rgba(34, 197, 94, 0.2)', border: '#22c55e', text: '#4ade80' },
    blue: { bg: 'rgba(59, 130, 246, 0.2)', border: '#3b82f6', text: '#60a5fa' },
    orange: { bg: 'rgba(245, 158, 11, 0.2)', border: '#f59e0b', text: '#fbbf24' },
  };
  const c = colors[color] || colors.purple;
  return (
    <div style={{
      background: c.bg,
      border: `2px solid ${c.border}`,
      borderRadius: '0.75rem',
      padding: '1rem 1.5rem',
      margin: '1rem 0',
      textAlign: 'center',
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      fontWeight: 600,
      color: c.text,
    }}>
      {children}
    </div>
  );
};

// Tip/Info Box
const TipBox = ({ type = 'tip', children }) => {
  const styles = {
    tip: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', icon: '💡', color: '#4ade80', label: 'Pro Tip' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', icon: '⚠️', color: '#fbbf24', label: 'Important' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', icon: 'ℹ️', color: '#60a5fa', label: 'Did You Know?' },
    success: { bg: 'rgba(168, 85, 247, 0.1)', border: '#a855f7', icon: '✨', color: '#c4b5fd', label: 'Fun Fact' },
  };
  const s = styles[type] || styles.tip;
  return (
    <div style={{
      background: s.bg,
      borderLeft: `4px solid ${s.border}`,
      borderRadius: '0.5rem',
      padding: '1rem 1.25rem',
      margin: '1.5rem 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: s.color, fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
        <span>{s.icon}</span> {s.label}
      </div>
      <div style={{ color: '#e5e7eb', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
};

// Big Text/Quote
const BigText = ({ children }) => (
  <div style={{
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    fontWeight: 700,
    color: '#ffffff',
    textAlign: 'center',
    padding: '1.5rem',
    margin: '1rem 0',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
    borderRadius: '1rem',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  }}>
    {children}
  </div>
);

// Comparison boxes
const Comparison = ({ left, right }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
    <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
      <h4 style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.75rem', textAlign: 'center' }}>{left.title}</h4>
      {left.items.map((item, i) => (
        <div key={i} style={{ color: '#d1d5db', padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#a855f7' }}>→</span> {item}
        </div>
      ))}
    </div>
    <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
      <h4 style={{ color: '#4ade80', fontWeight: 600, marginBottom: '0.75rem', textAlign: 'center' }}>{right.title}</h4>
      {right.items.map((item, i) => (
        <div key={i} style={{ color: '#d1d5db', padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#22c55e' }}>→</span> {item}
        </div>
      ))}
    </div>
  </div>
);

// Feature Cards Grid
const FeatureCards = ({ cards }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
    {cards.map((card, i) => {
      const Icon = getIcon(card.icon);
      return (
        <div key={i} style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${card.color}40`,
          borderRadius: '1rem',
          padding: '1.25rem',
          textAlign: 'center',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '1rem',
            background: `linear-gradient(135deg, ${card.color}30, ${card.color}15)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
          }}>
            <Icon style={{ width: '28px', height: '28px', color: card.color }} />
          </div>
          <h4 style={{ color: card.color, fontWeight: 700, fontSize: '1.1rem' }}>{card.title}</h4>
          {card.subtitle && <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{card.subtitle}</p>}
          <div style={{ textAlign: 'left', marginTop: '0.75rem' }}>
            {card.items.map((item, j) => (
              <div key={j} style={{ color: '#d1d5db', fontSize: '0.875rem', padding: '0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ width: '14px', height: '14px', color: card.color, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

// Category Cards
const CategoryCards = ({ cards }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
    {cards.map((card, i) => (
      <div key={i} style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '0.75rem',
        padding: '1rem',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.emoji}</div>
        <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>{card.title}</h4>
        {card.items.map((item, j) => (
          <div key={j} style={{ color: '#9ca3af', fontSize: '0.875rem', padding: '0.2rem 0' }}>• {item}</div>
        ))}
      </div>
    ))}
  </div>
);

// Checklist
const Checklist = ({ items, title }) => (
  <div style={{ margin: '1rem 0', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '0.75rem', padding: '1rem' }}>
    {title && <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h4>}
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', color: '#d1d5db' }}>
        <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e', flexShrink: 0 }} />
        {item}
      </div>
    ))}
  </div>
);

// App Showcase
const AppShowcase = ({ apps }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
    {apps.map((app, i) => {
      const Icon = getIcon(app.icon);
      return (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          borderRadius: '0.75rem',
          padding: '1rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '0.75rem',
            background: app.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>{app.name}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {app.features.map((f, j) => (
                <span key={j} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#9ca3af',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// Prompt Examples
const PromptExamples = ({ prompts, title }) => (
  <div style={{ margin: '1.5rem 0' }}>
    {title && <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h4>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {prompts.map((prompt, i) => (
        <div key={i} style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontFamily: 'monospace',
          color: '#c4b5fd',
          fontSize: '0.9rem',
        }}>
          "{prompt}"
        </div>
      ))}
    </div>
  </div>
);

// Steps
const Steps = ({ steps, title }) => (
  <div style={{ margin: '1.5rem 0' }}>
    {title && <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '1rem' }}>{title}</h4>}
    {steps.map((step, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {i + 1}
        </div>
        <div style={{ color: '#d1d5db', paddingTop: '0.25rem' }}>{step}</div>
      </div>
    ))}
  </div>
);

// Link Card
const LinkCard = ({ url, title, description }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    margin: '1rem 0',
  }}>
    <ExternalLink style={{ width: '24px', height: '24px', color: '#60a5fa', flexShrink: 0 }} />
    <div>
      <div style={{ color: '#60a5fa', fontWeight: 600 }}>{title}</div>
      <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{description}</div>
    </div>
  </a>
);

// Safety Rules
const SafetyRules = ({ rules }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
    {rules.map((rule, i) => {
      const Icon = getIcon(rule.icon);
      return (
        <div key={i} style={{
          background: `${rule.color}10`,
          border: `1px solid ${rule.color}30`,
          borderRadius: '0.75rem',
          padding: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Icon style={{ width: '20px', height: '20px', color: rule.color }} />
            <h4 style={{ color: '#ffffff', fontWeight: 600 }}>{rule.title}</h4>
          </div>
          {rule.items.map((item, j) => (
            <div key={j} style={{ color: '#d1d5db', fontSize: '0.875rem', padding: '0.2rem 0' }}>• {item}</div>
          ))}
        </div>
      );
    })}
  </div>
);

// Warning Box
const WarningBox = ({ title, items }) => (
  <div style={{
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    margin: '1.5rem 0',
  }}>
    <h4 style={{ color: '#f87171', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h4>
    {items.map((item, i) => (
      <div key={i} style={{ color: '#fecaca', fontSize: '0.9rem', padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
        {item}
      </div>
    ))}
  </div>
);

// Quote
const Quote = ({ children, author }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
    borderRadius: '1rem',
    padding: '1.5rem 2rem',
    margin: '1.5rem 0',
    textAlign: 'center',
    position: 'relative',
  }}>
    <div style={{ fontSize: '2rem', opacity: 0.3, marginBottom: '0.25rem' }}>"</div>
    <p style={{ color: '#ffffff', fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.6 }}>
      {children}
    </p>
    {author && <p style={{ color: '#a78bfa', marginTop: '0.75rem', fontSize: '0.875rem' }}>— {author}</p>}
  </div>
);

// Stat Highlight
const StatHighlight = ({ number, label }) => (
  <div style={{
    textAlign: 'center',
    padding: '2rem',
    margin: '1.5rem 0',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
    borderRadius: '1rem',
    border: '1px solid rgba(168, 85, 247, 0.3)',
  }}>
    <div style={{
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {number}
    </div>
    <div style={{ color: '#d1d5db', fontSize: '1rem' }}>{label}</div>
  </div>
);

// Creative Examples
const CreativeExamples = ({ examples }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
    {examples.map((ex, i) => (
      <div key={i} style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '0.75rem',
        padding: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{ex.emoji}</span>
          <h4 style={{ color: '#ffffff', fontWeight: 600 }}>{ex.title}</h4>
        </div>
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          fontFamily: 'monospace',
          color: '#c4b5fd',
          fontSize: '0.85rem',
        }}>
          "{ex.prompt}"
        </div>
      </div>
    ))}
  </div>
);

// Interactive Box
const InteractiveBox = ({ title, children }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
    border: '2px dashed rgba(34, 197, 94, 0.4)',
    borderRadius: '1rem',
    padding: '1.5rem',
    margin: '1.5rem 0',
    textAlign: 'center',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#4ade80', fontWeight: 600, marginBottom: '0.75rem' }}>
      <Play style={{ width: '20px', height: '20px' }} />
      {title}
    </div>
    <div style={{ color: '#d1d5db', fontSize: '1rem' }}>{children}</div>
  </div>
);

// Icon List Groups
const IconListGroups = ({ groups }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
    {groups.map((group, i) => (
      <div key={i} style={{
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(168, 85, 247, 0.15)',
      }}>
        <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.75rem' }}>{group.title}</h4>
        {group.items.map((item, j) => (
          <div key={j} style={{ display: 'flex', padding: '0.35rem 0', borderBottom: j < group.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span style={{ color: '#a78bfa', fontWeight: 500, minWidth: '120px' }}>{item.bold}</span>
            <span style={{ color: '#9ca3af' }}>{item.text}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// Recap List
const RecapList = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
    {items.map((item, i) => (
      <div key={i} style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(34, 197, 94, 0.2)',
      }}>
        <h4 style={{ color: '#4ade80', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h4>
        {item.points.map((point, j) => (
          <div key={j} style={{ color: '#d1d5db', fontSize: '0.9rem', padding: '0.2rem 0' }}>• {point}</div>
        ))}
      </div>
    ))}
  </div>
);

// Key Takeaway
const KeyTakeaway = ({ children }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
    border: '2px solid rgba(168, 85, 247, 0.4)',
    borderRadius: '1rem',
    padding: '1.5rem 2rem',
    margin: '1.5rem 0',
    textAlign: 'center',
  }}>
    <div style={{ color: '#c4b5fd', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>🌟 Key Takeaway</div>
    <p style={{ color: '#ffffff', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 500, lineHeight: 1.6 }}>{children}</p>
  </div>
);

// Next Session
const NextSession = ({ children }) => (
  <div style={{
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.75rem',
    padding: '1rem 1.5rem',
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  }}>
    <ArrowRight style={{ width: '24px', height: '24px', color: '#60a5fa', flexShrink: 0 }} />
    <span style={{ color: '#60a5fa' }}>{children}</span>
  </div>
);

// Demo Header
const DemoHeader = ({ children }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.15))',
    borderRadius: '0.75rem',
    padding: '1rem',
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  }}>
    <Play style={{ width: '24px', height: '24px', color: '#4ade80', flexShrink: 0 }} />
    <span style={{ color: '#4ade80', fontWeight: 500 }}>{children}</span>
  </div>
);

// Example Box
const ExampleBox = ({ title, children }) => (
  <div style={{
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.75rem',
    padding: '1rem 1.25rem',
    margin: '1rem 0',
  }}>
    <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>💡 {title}</div>
    <div style={{ color: '#fef3c7' }}>{children}</div>
  </div>
);

// Image Component with animation
const ImageBlock = ({ src, alt, caption }) => (
  <div className="ai-image-container ai-fade-in">
    <img
      src={src}
      alt={alt}
      className="ai-image"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
    {caption && (
      <div className="ai-image-caption">{caption}</div>
    )}
  </div>
);

// ============================================
// CONTENT RENDERER
// ============================================

const RenderContent = ({ item }) => {
  switch (item.type) {
    case 'text':
      return <p style={{ color: '#d1d5db', lineHeight: 1.7, margin: '0.75rem 0' }}>{item.value}</p>;
    case 'highlight':
      return <Highlight color={item.color}>{item.value}</Highlight>;
    case 'tip':
      return <TipBox type={item.tipType}>{item.value}</TipBox>;
    case 'bigText':
      return <BigText>{item.value}</BigText>;
    case 'comparison':
      return <Comparison left={item.left} right={item.right} />;
    case 'featureCards':
      return <div className="ai-stagger"><FeatureCards cards={item.cards} /></div>;
    case 'categoryCards':
      return <div className="ai-stagger"><CategoryCards cards={item.cards} /></div>;
    case 'checklist':
      return <Checklist items={item.items} title={item.title} />;
    case 'appShowcase':
      return <div className="ai-stagger"><AppShowcase apps={item.apps} /></div>;
    case 'promptExamples':
      return <PromptExamples prompts={item.prompts} title={item.title} />;
    case 'steps':
      return <Steps steps={item.steps} title={item.title} />;
    case 'link':
      return <LinkCard url={item.url} title={item.title} description={item.description} />;
    case 'safetyRules':
      return <div className="ai-stagger"><SafetyRules rules={item.rules} /></div>;
    case 'warning':
      return <WarningBox title={item.title} items={item.items} />;
    case 'quote':
      return <Quote author={item.author}>{item.value}</Quote>;
    case 'stat':
      return <div className="ai-pulse"><StatHighlight number={item.number} label={item.label} /></div>;
    case 'creativeExamples':
      return <div className="ai-stagger"><CreativeExamples examples={item.examples} /></div>;
    case 'interactive':
      return <InteractiveBox title={item.title}>{item.value}</InteractiveBox>;
    case 'iconList':
      return <IconListGroups groups={item.groups} />;
    case 'recapList':
      return <div className="ai-stagger"><RecapList items={item.items} /></div>;
    case 'keyTakeaway':
      return <div className="ai-pulse"><KeyTakeaway>{item.value}</KeyTakeaway></div>;
    case 'nextSession':
      return <NextSession>{item.value}</NextSession>;
    case 'demoHeader':
      return <DemoHeader>{item.value}</DemoHeader>;
    case 'example':
      return <ExampleBox title={item.title}>{item.value}</ExampleBox>;
    case 'image':
      return <ImageBlock src={item.src} alt={item.alt} caption={item.caption} />;
    default:
      return <p style={{ color: '#d1d5db' }}>{item.value || JSON.stringify(item)}</p>;
  }
};

// ============================================
// QUIZ COMPONENT
// ============================================

const QuizQuestion = ({ question, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(168, 85, 247, 0.15)',
      borderRadius: '0.75rem',
      padding: 'clamp(1rem, 2vw, 1.25rem)',
      marginBottom: '1rem',
    }}>
      <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }}>
        Q{index + 1}. {question.question}
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {question.options.map((option, optIndex) => (
          <button
            key={optIndex}
            onClick={() => setSelectedOption(optIndex)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: showAnswer && optIndex === question.correct
                ? '2px solid #22c55e'
                : showAnswer && selectedOption === optIndex && optIndex !== question.correct
                  ? '2px solid #ef4444'
                  : selectedOption === optIndex
                    ? '2px solid #a855f7'
                    : '1px solid rgba(255, 255, 255, 0.1)',
              background: showAnswer && optIndex === question.correct
                ? 'rgba(34, 197, 94, 0.2)'
                : showAnswer && selectedOption === optIndex && optIndex !== question.correct
                  ? 'rgba(239, 68, 68, 0.2)'
                  : selectedOption === optIndex
                    ? 'rgba(168, 85, 247, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
              color: '#ffffff',
              textAlign: 'left',
              cursor: showAnswer ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
            }}
            disabled={showAnswer}
          >
            <span style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.25rem',
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: '0.75rem',
              fontWeight: 500,
              flexShrink: 0,
            }}>
              {String.fromCharCode(65 + optIndex)}
            </span>
            {option}
            {showAnswer && optIndex === question.correct && (
              <CheckCircle style={{ width: '18px', height: '18px', color: '#4ade80', marginLeft: 'auto', flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: showAnswer ? 'rgba(34, 197, 94, 0.2)' : 'rgba(168, 85, 247, 0.2)',
          border: '1px solid ' + (showAnswer ? 'rgba(34, 197, 94, 0.3)' : 'rgba(168, 85, 247, 0.3)'),
          borderRadius: '0.5rem',
          color: showAnswer ? '#4ade80' : '#c4b5fd',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
        {showAnswer ? <ChevronUp style={{ width: '16px', height: '16px' }} /> : <ChevronDown style={{ width: '16px', height: '16px' }} />}
      </button>

      {showAnswer && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '0.5rem',
        }}>
          <p style={{ color: '#4ade80', fontWeight: 500, marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            ✓ Correct: {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
          </p>
          <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN SESSION DETAIL COMPONENT
// ============================================

const SessionDetail = () => {
  const { sessionId } = useParams();
  const currentSession = getSessionBySlug(sessionId);
  const currentIndex = sessions.findIndex(s => s.slug === sessionId);

  const prevSession = currentIndex > 0 ? sessions[currentIndex - 1] : null;
  const nextSession = currentIndex < sessions.length - 1 ? sessions[currentIndex + 1] : null;

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '1rem',
    padding: 'clamp(1.25rem, 3vw, 2rem)',
  };

  // Session not found
  if (!currentSession) {
    return (
      <div style={{ minHeight: '100vh', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...cardStyle, textAlign: 'center', maxWidth: '24rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.5rem' }}>Session Not Found</h1>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>This session doesn't exist yet.</p>
          <Link to="/ai-lab/sessions" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#ffffff',
            fontWeight: 500,
            borderRadius: '0.75rem',
            textDecoration: 'none',
          }}>
            View All Sessions
          </Link>
        </div>
      </div>
    );
  }

  // Breadcrumb data for structured data
  const breadcrumbs = [
    { name: 'AI Lab', url: '/ai-lab' },
    { name: 'Sessions', url: '/ai-lab/sessions' },
    { name: currentSession.title, url: `/ai-lab/sessions/${currentSession.slug}` },
  ];

  return (
    <>
      <SEOHead
        title={`${currentSession.title} - AI Lab Session`}
        description={currentSession.description}
        keywords={`${currentSession.topics?.join(', ') || 'AI'}, AI Tutorial, Learn AI, AI Session, ${currentSession.title}`}
        image={currentSession.heroImage || '/ai-lab/images/robot-hello.png'}
        url={`/sessions/${currentSession.slug}`}
        type="article"
        publishedTime={currentSession.date}
        section="AI Education"
      />
      <StructuredData data={getSessionStructuredData(currentSession, currentIndex)} />
      <StructuredData data={getBreadcrumbStructuredData(breadcrumbs)} />
      {currentSession.quiz?.questions && (
        <StructuredData data={getFAQStructuredData(currentSession.quiz.questions)} />
      )}

      <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        {/* Back Link */}
        <Link to="/ai-lab/sessions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to Sessions
        </Link>

        {/* Session Header */}
        <div className="ai-fade-in" style={{ ...cardStyle, marginBottom: '2rem' }}>
          {/* Hero Image */}
          {currentSession.heroImage && (
            <div className="ai-image-container" style={{ marginBottom: '1.5rem', borderRadius: '0.75rem', overflow: 'hidden' }}>
              <img
                src={currentSession.heroImage}
                alt={currentSession.title}
                className="ai-image"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="ai-gradient-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold' }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', fontWeight: 'bold', color: '#ffffff', flex: 1 }}>
              {currentSession.title}
            </h1>
          </div>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            {currentSession.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#9ca3af', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock style={{ width: '16px', height: '16px' }} />
              {currentSession.duration}
            </span>
            {currentSession.date && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar style={{ width: '16px', height: '16px' }} />
                {new Date(currentSession.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {currentSession.time && (
              <span style={{ color: '#22c55e', fontWeight: 500 }}>{currentSession.time}</span>
            )}
          </div>
        </div>

        {/* Topics */}
        {currentSession.topics && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {currentSession.topics.map((topic, i) => (
              <span key={i} style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(168, 85, 247, 0.15)',
                color: '#c4b5fd',
                fontSize: '0.875rem',
              }}>
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Session Content */}
        {currentSession.sections && currentSession.sections.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {currentSession.sections.map((section, index) => (
              <div
                key={index}
                className="ai-card ai-hover-lift"
                style={{
                  ...cardStyle,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <h2 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
                  {section.heading}
                </h2>

                {/* Render rich content */}
                {Array.isArray(section.content) ? (
                  section.content.map((item, i) => <RenderContent key={i} item={item} />)
                ) : (
                  <div style={{ color: '#d1d5db', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                    {section.content}
                  </div>
                )}
              </div>
            ))}

            {/* Quiz Section */}
            {currentSession.quiz && currentSession.quiz.questions && (
              <div style={{
                ...cardStyle,
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                border: '2px solid rgba(168, 85, 247, 0.3)',
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  🎯 {currentSession.quiz.title}
                </h2>
                <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                  Test your knowledge! Select an answer and click "Show Answer" to check.
                </p>

                {currentSession.quiz.questions.map((question, index) => (
                  <QuizQuestion key={question.id} question={question} index={index} />
                ))}
              </div>
            )}

            {/* Completion */}
            <div style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              textAlign: 'center',
            }}>
              <CheckCircle style={{ width: '48px', height: '48px', color: '#4ade80', margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
                Great Job! 🎉
              </h3>
              <p style={{ color: '#d1d5db' }}>You've completed this session!</p>
            </div>
          </div>
        ) : (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>Content Coming Soon</h3>
            <p style={{ color: '#9ca3af' }}>The content for this session will be available soon!</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          {prevSession ? (
            <Link to={`/ai-lab/sessions/${prevSession.slug}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontWeight: 500,
              borderRadius: '0.75rem',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              textDecoration: 'none',
            }}>
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              Previous
            </Link>
          ) : <div />}

          {nextSession ? (
            <Link to={`/ai-lab/sessions/${nextSession.slug}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#ffffff',
              fontWeight: 500,
              borderRadius: '0.75rem',
              textDecoration: 'none',
            }}>
              Next Session
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          ) : (
            <Link to="/ai-lab/quiz" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#ffffff',
              fontWeight: 500,
              borderRadius: '0.75rem',
              textDecoration: 'none',
            }}>
              More Quizzes
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SessionDetail;
