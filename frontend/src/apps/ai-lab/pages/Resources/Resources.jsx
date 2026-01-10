import { BookOpen, Download, ExternalLink, FileText, Globe, Video } from 'lucide-react';
import SEOHead from '../../common/components/SEOHead';
const resources = [
  {
    category: 'Videos',
    icon: Video,
    color: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    items: [
      { title: 'But what is a Neural Network?', description: 'Amazing visual explanation by 3Blue1Brown', url: 'https://www.youtube.com/watch?v=aircAruvnKk', source: 'YouTube' },
      { title: 'AI for Everyone by Andrew Ng', description: 'Free course explaining AI concepts for beginners', url: 'https://www.coursera.org/learn/ai-for-everyone', source: 'Coursera' },
      { title: 'Machine Learning for Kids', description: 'Fun introduction to ML concepts', url: 'https://www.youtube.com/watch?v=f_uwKZIAeM0', source: 'YouTube' },
    ],
  },
  {
    category: 'Interactive Tools',
    icon: Globe,
    color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    items: [
      { title: 'Teachable Machine', description: 'Train your own AI model without coding!', url: 'https://teachablemachine.withgoogle.com/', source: 'Google' },
      { title: 'Quick, Draw!', description: 'AI guesses what you draw - fun and educational', url: 'https://quickdraw.withgoogle.com/', source: 'Google' },
      { title: 'AI Experiments', description: 'Collection of fun AI experiments to try', url: 'https://experiments.withgoogle.com/collection/ai', source: 'Google' },
    ],
  },
  {
    category: 'Articles & Reading',
    icon: FileText,
    color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    items: [
      { title: 'What is Artificial Intelligence?', description: 'Simple explanation from IBM', url: 'https://www.ibm.com/topics/artificial-intelligence', source: 'IBM' },
      { title: 'Machine Learning for Beginners', description: 'Microsoft\'s free curriculum', url: 'https://github.com/microsoft/ML-For-Beginners', source: 'Microsoft' },
      { title: 'Elements of AI', description: 'Free online course about AI basics', url: 'https://www.elementsofai.com/', source: 'University of Helsinki' },
    ],
  },
  {
    category: 'Learning Platforms',
    icon: BookOpen,
    color: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    items: [
      { title: 'Khan Academy - Computing', description: 'Free lessons on algorithms and computing', url: 'https://www.khanacademy.org/computing', source: 'Khan Academy' },
      { title: 'Scratch', description: 'Learn coding basics with visual programming', url: 'https://scratch.mit.edu/', source: 'MIT' },
      { title: 'Code.org AI Unit', description: 'AI curriculum designed for students', url: 'https://code.org/ai', source: 'Code.org' },
    ],
  },
];

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(168, 85, 247, 0.2)',
  borderRadius: '1rem',
  padding: '1.5rem',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  display: 'block',
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

const btnPrimary = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  color: '#ffffff',
  fontWeight: 500,
  borderRadius: '0.75rem',
  textDecoration: 'none',
};

const Resources = () => {
  return (
    <>
      <SEOHead
        title="AI Learning Resources - Videos, Tools & Articles"
        description="Explore curated AI learning resources including videos, interactive tools, articles, and learning platforms. Free resources to continue your AI education journey."
        keywords="AI Resources, Learn AI, AI Videos, AI Tools, AI Articles, Machine Learning Resources, Free AI Course, Teachable Machine"
        url="/resources"
      />
      <div style={{ minHeight: '100vh', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={badgeStyle}>
            <Download style={{ width: '16px', height: '16px' }} />
            <span>Learning Resources</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#ffffff', margin: '1rem 0' }}>
            Extra Resources
          </h1>
          <p style={{ color: '#9ca3af', maxWidth: '42rem', margin: '0 auto' }}>
            Want to learn more about AI? Here are some amazing free resources to continue your journey!
          </p>
        </div>

        {/* Resources by Category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  background: category.color,
                }}>
                  <category.icon style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{category.category}</h2>
              </div>

              {/* Resources Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {category.items.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cardStyle}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#ffffff' }}>
                        {resource.title}
                      </h3>
                      <ExternalLink style={{ width: '16px', height: '16px', color: '#6b7280', flexShrink: 0, marginTop: '4px' }} />
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      {resource.description}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#9ca3af',
                      fontSize: '0.75rem',
                    }}>
                      {resource.source}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <div style={{ ...cardStyle, display: 'inline-block' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>Ready to Test Your Knowledge? 🧠</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>Take the quiz to see how much you've learned!</p>
            <a href="/ai-lab/quiz" style={btnPrimary}>
              Take the Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Resources;
