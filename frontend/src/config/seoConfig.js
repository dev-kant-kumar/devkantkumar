import { portfolioData } from '../apps/Portfolio/store/data/portfolioData';

export const seoConfig = {
  // Default site metadata - All from portfolioData
  site: {
    name: portfolioData.personalInfo.name,
    title: portfolioData.seoConfig.defaultMeta.title,
    description: portfolioData.seoConfig.defaultMeta.description,
    url: portfolioData.seoConfig.site.url,
    image: portfolioData.seoConfig.defaultMeta.image,
    author: portfolioData.seoConfig.defaultMeta.author,
    keywords: portfolioData.seoKeywords,
    language: portfolioData.seoConfig.site.language,
    locale: portfolioData.seoConfig.site.locale,
    type: portfolioData.seoConfig.site.type
  },

  // Social media handles - All from portfolioData
  social: portfolioData.seoConfig.social,

  // Analytics and tracking - All from portfolioData
  analytics: portfolioData.seoConfig.analytics,

  // Page-specific configurations - All from portfolioData
  pages: portfolioData.seoConfig.pages,

  // Open Graph configuration - All from portfolioData
  openGraph: {
    type: portfolioData.seoConfig.site.type,
    locale: portfolioData.seoConfig.site.locale,
    siteName: `${portfolioData.personalInfo.name} - Portfolio`
  },

  // Twitter configuration - All from portfolioData
  twitter: {
    cardType: 'summary_large_image',
    site: portfolioData.seoConfig.social.twitter,
    creator: portfolioData.seoConfig.social.twitter
  },

  // Structured data templates - All from portfolioData
  structuredData: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: portfolioData.personalInfo.name,
      jobTitle: portfolioData.personalInfo.title,
      description: portfolioData.professionalSummary?.overview || `Portfolio of ${portfolioData.personalInfo.name}`,
      url: portfolioData.seoConfig.site.url,
      image: portfolioData.personalInfo.profileImage,
      email: `mailto:${portfolioData.personalInfo.contact.email}`,
      sameAs: portfolioData.socialLinks?.professional ? Object.values(portfolioData.socialLinks.professional) : []
    }
  }
};

// Helper functions
export const getPageSEO = (pageName) => {
  const pageConfig = seoConfig.pages[pageName] || {};
  return {
    title: pageConfig.title ? `${pageConfig.title} | ${seoConfig.site.name}` : seoConfig.site.title,
    description: pageConfig.description || seoConfig.site.description,
    keywords: pageConfig.keywords || seoConfig.site.keywords,
    url: `${seoConfig.site.url}${pageName === 'home' ? '' : `/${pageName}`}`
  };
};

export const getDefaultSEO = () => ({
  title: seoConfig.site.title,
  description: seoConfig.site.description,
  keywords: seoConfig.site.keywords,
  image: seoConfig.site.image,
  url: seoConfig.site.url
});

export default seoConfig;
