import { BookOpen, Brain, Cpu, FolderOpen, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead, { StructuredData, getAILabStructuredData } from '../../common/components/SEOHead';
const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Sessions',
      description: 'Learn AI concepts through fun, easy-to-understand lessons',
      link: '/ai-lab/sessions',
      color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    },
    {
      icon: HelpCircle,
      title: 'Test Your Knowledge',
      description: 'Take quizzes to check what you\'ve learned',
      link: '/ai-lab/quiz',
      color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    },
    {
      icon: FolderOpen,
      title: 'Resources',
      description: 'Explore videos, articles, and more learning materials',
      link: '/ai-lab/resources',
      color: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    },
  ];

  const aiTopics = [
    { icon: Brain, label: 'What is AI?' },
    { icon: Cpu, label: 'Machine Learning' },
    { icon: MessageSquare, label: 'Chatbots' },
  ];

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '1rem',
    padding: 'clamp(1rem, 3vw, 1.5rem)',
    transition: 'all 0.3s ease',
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    background: 'rgba(168, 85, 247, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#c4b5fd',
    fontSize: '0.875rem',
  };

  const primaryBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    color: '#ffffff',
    fontWeight: 500,
    borderRadius: '0.75rem',
    textDecoration: 'none',
    border: 'none',
    flex: '1 1 auto',
    maxWidth: '200px',
  };

  const secondaryBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontWeight: 500,
    borderRadius: '0.75rem',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    textDecoration: 'none',
    flex: '1 1 auto',
    maxWidth: '200px',
  };

  return (
    <>
      <SEOHead
        title="AI Lab - Learn Artificial Intelligence for Free"
        description="Discover the exciting world of Artificial Intelligence with interactive sessions, quizzes, and hands-on learning. Perfect for students and beginners. Start your AI journey today!"
        keywords="AI, Artificial Intelligence, Machine Learning, AI for Students, Learn AI, AI Tutorial, AI Education, Free AI Course, AI Basics, Introduction to AI"
        url=""
      />
      <StructuredData data={getAILabStructuredData()} />

      <div style={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <section style={{ position: 'relative', padding: 'clamp(3rem, 8vw, 5rem) 1rem', overflow: 'hidden' }}>
        {/* Background Decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: '5rem',
            left: '2.5rem',
            width: 'clamp(10rem, 30vw, 18rem)',
            height: 'clamp(10rem, 30vw, 18rem)',
            background: 'rgba(168, 85, 247, 0.2)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '2.5rem',
            width: 'clamp(12rem, 35vw, 24rem)',
            height: 'clamp(12rem, 35vw, 24rem)',
            background: 'rgba(236, 72, 153, 0.2)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={badgeStyle}>
            <Sparkles style={{ width: '16px', height: '16px' }} />
            <span>Learn AI from Scratch</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
            fontWeight: 'bold',
            color: '#ffffff',
            margin: '1.5rem 0',
            lineHeight: 1.2
          }}>
            Welcome to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              AI Lab
            </span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#d1d5db',
            maxWidth: '42rem',
            margin: '0 auto 2rem',
            padding: '0 0.5rem',
          }}>
            Discover the exciting world of Artificial Intelligence! Learn how computers can think,
            learn, and even talk like humans. 🤖✨
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/ai-lab/sessions" style={primaryBtnStyle}>
              <BookOpen style={{ width: '20px', height: '20px' }} />
              Start Learning
            </Link>
            <Link to="/ai-lab/quiz" style={secondaryBtnStyle}>
              <HelpCircle style={{ width: '20px', height: '20px' }} />
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
          }}>
            What You'll Learn
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {aiTopics.map((topic, index) => (
              <div key={index} style={{ ...cardStyle, textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                  marginBottom: '0.75rem',
                }}>
                  <topic.icon style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(24px, 4vw, 32px)', color: '#a78bfa' }} />
                </div>
                <h3 style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', fontWeight: 600, color: '#ffffff' }}>{topic.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
          }}>
            Explore AI Lab
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                style={{ ...cardStyle, textDecoration: 'none' }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  background: feature.color,
                  marginBottom: '1rem',
                }}>
                  <feature.icon style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Fact Section */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>Did You Know?</h3>
            <p style={{ color: '#d1d5db', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              The human brain has about 86 billion neurons. Modern AI tries to copy how these
              neurons work together to help computers "think" and learn new things!
            </p>
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
