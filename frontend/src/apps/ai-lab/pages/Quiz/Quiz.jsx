import { ArrowRight, Calendar, Clock, HelpCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../common/components/SEOHead';
import { getQuizCount, quizzes } from '../DailyQuizzes';

const Quiz = () => {
  const quizCount = getQuizCount();

  return (
    <>
      <SEOHead
        title="AI Quizzes - Test Your Knowledge"
        description="Challenge yourself with AI quizzes! Test what you've learned about Artificial Intelligence, Machine Learning, and more through fun, interactive questions."
        keywords="AI Quiz, AI Test, Artificial Intelligence Quiz, Machine Learning Quiz, AI Knowledge Test, Learn AI Quiz"
        url="/quiz"
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
            <HelpCircle style={{ width: '16px', height: '16px' }} />
            <span>Knowledge Quizzes</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 'bold', color: '#ffffff', margin: '1rem 0' }}>
            Test Your Knowledge
          </h1>
          <p style={{ color: '#9ca3af', maxWidth: '42rem', margin: '0 auto 1.5rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            Take quizzes after each session to reinforce your learning. See how much you've learned!
          </p>

          {/* Quiz Count Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{quizCount}</span>
            <span style={{ color: '#c4b5fd' }}>{quizCount === 1 ? 'Quiz' : 'Quizzes'} Available</span>
          </div>
        </div>

        {/* Quizzes List */}
        {quizCount > 0 ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: '1rem',
                  padding: 'clamp(1rem, 3vw, 2rem)',
                }}
              >
                {/* Top Row: Number + Title */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                }}>
                  {/* Quiz Number */}
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
                      {quiz.title}
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                      {quiz.description}
                    </p>
                  </div>
                </div>

                {/* Quiz Info + Start Button */}
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
                  {/* Left side: Quiz info */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    flex: 1,
                    minWidth: '200px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle style={{ width: '18px', height: '18px', color: '#a78bfa', flexShrink: 0 }} />
                      <span style={{ color: '#9ca3af' }}>Questions:</span>
                      <span style={{ color: '#ffffff', fontWeight: 500 }}>{quiz.questions?.length || 0}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock style={{ width: '18px', height: '18px', color: '#22c55e', flexShrink: 0 }} />
                      <span style={{ color: '#9ca3af' }}>Duration:</span>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>{quiz.duration}</span>
                    </div>
                    {quiz.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar style={{ width: '18px', height: '18px', color: '#6b7280', flexShrink: 0 }} />
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {new Date(quiz.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right side: Start Button */}
                  <Link
                    to={`/ai-lab/quiz/${quiz.slug}`}
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
                    Start Quiz
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
              Quizzes Coming Soon! 🎯
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
              Complete sessions first, then quizzes will appear here to test your knowledge!
            </p>
            <Link
              to="/ai-lab/sessions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 500,
                borderRadius: '0.75rem',
                textDecoration: 'none',
              }}
            >
              View Sessions
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Quiz;
