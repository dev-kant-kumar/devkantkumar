import { ArrowRight, BookOpen, Calendar, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../common/components/SEOHead';
import { getSessionCount, sessions } from '../DailySessions';

const Sessions = () => {
  const sessionCount = getSessionCount();

  return (
    <>
      <SEOHead
        title="AI Learning Sessions - Interactive AI Courses"
        description="Explore our interactive AI learning sessions. Learn about Artificial Intelligence, Machine Learning, and ChatGPT through engaging lessons designed for beginners."
        keywords="AI Sessions, AI Courses, Learn AI, AI Lessons, Artificial Intelligence Course, Machine Learning Tutorial, AI for Beginners"
        url="/sessions"
      />
      <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c4b5fd',
            fontSize: '0.875rem',
          }}>
            <BookOpen style={{ width: '16px', height: '16px' }} />
            <span>Learning Sessions</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 'bold', color: '#ffffff', margin: '1rem 0' }}>
            AI Learning Sessions
          </h1>
          <p style={{ color: '#9ca3af', maxWidth: '42rem', margin: '0 auto 1.5rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            New sessions are added as the course progresses. Check back regularly for new content!
          </p>

          {/* Session Count Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{sessionCount}</span>
            <span style={{ color: '#c4b5fd' }}>{sessionCount === 1 ? 'Session' : 'Sessions'} Available</span>
          </div>
        </div>

        {/* Sessions List */}
        {sessionCount > 0 ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {sessions.map((session, index) => (
              <div
                key={session.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: '1rem',
                  padding: 'clamp(1rem, 3vw, 2rem)',
                }}
              >
                {/* Top Row: Number + Title (stacks on mobile) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                }}>
                  {/* Session Number */}
                  <span style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.3)',
                    lineHeight: 1,
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title & Description */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 style={{
                      fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.5rem'
                    }}>
                      {session.title}
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                      {session.description}
                    </p>
                  </div>
                </div>

                {/* Session Timing Info + Start Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(168, 85, 247, 0.1)',
                }}>
                  {/* Left side: Session timing info */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    flex: 1,
                    minWidth: '200px',
                  }}>
                    {session.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Calendar style={{ width: '18px', height: '18px', color: '#a78bfa', flexShrink: 0 }} />
                        <span style={{ color: '#9ca3af' }}>Date:</span>
                        <span style={{ color: '#ffffff', fontWeight: 500 }}>
                          {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    {session.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock style={{ width: '18px', height: '18px', color: '#22c55e', flexShrink: 0 }} />
                        <span style={{ color: '#9ca3af' }}>Time:</span>
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>{session.time}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#9ca3af' }}>Duration:</span>
                      <span style={{ color: '#c4b5fd', fontWeight: 500 }}>{session.duration}</span>
                    </div>
                  </div>

                  {/* Right side: Start Button */}
                  <Link
                    to={`/ai-lab/sessions/${session.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 2rem',
                      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
                      width: '100%',
                      maxWidth: '200px',
                    }}
                  >
                    Start Session
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '1rem',
            textAlign: 'center',
            padding: '3rem 1.5rem',
            maxWidth: '32rem',
            margin: '0 auto',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <Plus style={{ width: '32px', height: '32px', color: '#a78bfa' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.75rem' }}>
              Coming Soon! 🚀
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
              Our first session will be available soon. Stay tuned for exciting AI learning content!
            </p>
            <Link
              to="/ai-lab"
              style={{
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
              }}
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Sessions;
