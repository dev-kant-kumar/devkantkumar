import { useEffect } from 'react';

/**
 * SEO Head Component for AI Lab
 * Manages document title, meta tags, Open Graph, and structured data
 */
const SEOHead = ({
  title = 'AI Lab - Learn Artificial Intelligence',
  description = 'Discover the exciting world of Artificial Intelligence with interactive sessions, quizzes, and hands-on learning. Perfect for students and beginners.',
  keywords = 'AI, Artificial Intelligence, Machine Learning, AI for Students, Learn AI, AI Tutorial, AI Education',
  image = '/ai-lab/images/robot-hello.png',
  url = '',
  type = 'website',
  author = 'Dev Kant Kumar',
  publishedTime = '',
  modifiedTime = '',
  section = '',
}) => {
  const baseUrl = 'https://devkantkumar.com';
  const fullUrl = `${baseUrl}/ai-lab${url}`;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullTitle = title.includes('AI Lab') ? title : `${title} | AI Lab`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', author);
    setMeta('robots', 'index, follow');
    setMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:url', fullUrl, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'AI Lab - Dev Kant Kumar', true);
    setMeta('og:locale', 'en_US', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImage);
    setMeta('twitter:site', '@devkantkumar');

    // Article specific meta (for sessions)
    if (type === 'article') {
      if (publishedTime) setMeta('article:published_time', publishedTime, true);
      if (modifiedTime) setMeta('article:modified_time', modifiedTime, true);
      if (section) setMeta('article:section', section, true);
      setMeta('article:author', author, true);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Cleanup
    return () => {
      document.title = 'Dev Kant Kumar';
    };
  }, [fullTitle, description, keywords, fullImage, fullUrl, type, author, publishedTime, modifiedTime, section]);

  return null;
};

/**
 * JSON-LD Structured Data Component
 */
export const StructuredData = ({ data }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';

    // Remove existing
    const existing = document.getElementById('structured-data');
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('structured-data');
      if (el) el.remove();
    };
  }, [data]);

  return null;
};

/**
 * Get structured data for AI Lab pages
 */
export const getAILabStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Lab',
  description: 'Interactive AI learning platform for students and beginners',
  url: 'https://devkantkumar.com/ai-lab',
  author: {
    '@type': 'Person',
    name: 'Dev Kant Kumar',
    url: 'https://devkantkumar.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Dev Kant Kumar',
    logo: {
      '@type': 'ImageObject',
      url: 'https://devkantkumar.com/ai-lab/images/robot-hello.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://devkantkumar.com/ai-lab?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Get structured data for a course/session
 */
export const getSessionStructuredData = (session, index) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: session.title,
  description: session.description,
  provider: {
    '@type': 'Organization',
    name: 'AI Lab',
    url: 'https://devkantkumar.com/ai-lab',
  },
  educationalLevel: 'Beginner',
  isAccessibleForFree: true,
  courseCode: `AI-LAB-${String(index + 1).padStart(2, '0')}`,
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    duration: session.duration,
    startDate: session.date,
  },
  teaches: session.topics?.join(', ') || 'Artificial Intelligence',
  image: session.heroImage ? `https://devkantkumar.com${session.heroImage}` : 'https://devkantkumar.com/ai-lab/images/robot-hello.png',
});

/**
 * Get structured data for a quiz
 */
export const getQuizStructuredData = (quiz, index) => ({
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: quiz.title,
  description: quiz.description,
  educationalLevel: 'Beginner',
  isAccessibleForFree: true,
  numberOfQuestions: quiz.questions?.length || 0,
  about: {
    '@type': 'Thing',
    name: 'Artificial Intelligence',
  },
  provider: {
    '@type': 'Organization',
    name: 'AI Lab',
    url: 'https://devkantkumar.com/ai-lab',
  },
});

/**
 * Breadcrumb structured data
 */
export const getBreadcrumbStructuredData = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://devkantkumar.com${item.url}`,
  })),
});

/**
 * FAQ Structured Data (for sessions with Q&A)
 */
export const getFAQStructuredData = (questions) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.explanation || q.answer,
    },
  })),
});

export default SEOHead;
