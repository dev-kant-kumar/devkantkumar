import { useEffect } from 'react';
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData';

/**
 * Custom hook to update page metadata dynamically
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title (will be appended to name)
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Additional keywords
 * @param {string} options.image - Page specific image
 */
export const useMetadata = (options = {}) => {
  const { personalInfo, professionalSummary, seoKeywords } = portfolioData;

  useEffect(() => {
    // Update title
    const pageTitle = options.title
      ? `${options.title} | ${personalInfo.name} - ${personalInfo.title}`
      : `${personalInfo.name} - ${personalInfo.title}`;

    document.title = pageTitle;

    // Update description
    const description = options.description ||
      `${personalInfo.name} - ${personalInfo.title}. ${professionalSummary.overview.split('.')[0]}.`;

    updateMetaTag('name', 'description', description);

    // Update keywords
    const keywords = options.keywords
      ? [...seoKeywords, ...options.keywords.split(',').map(k => k.trim())].join(', ')
      : seoKeywords.join(', ');

    updateMetaTag('name', 'keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', options.image || personalInfo.profileImage);
    updateMetaTag('property', 'og:url', window.location.href);

    // Update Twitter tags
    updateMetaTag('name', 'twitter:title', pageTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', options.image || personalInfo.profileImage);

  }, [options.title, options.description, options.keywords, options.image]);
};

/**
 * Helper function to update meta tags
 */
const updateMetaTag = (attribute, value, content) => {
  const selector = `meta[${attribute}="${value}"]`;
  let metaTag = document.querySelector(selector);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    document.head.appendChild(metaTag);
  }

  metaTag.content = content;
};
