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
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const pageTitle = options.title
      ? `${options.title} | ${personalInfo.name} - ${personalInfo.title}`
      : `${personalInfo.name} - ${personalInfo.title}`;

    document.title = pageTitle;

  }, [personalInfo.name, personalInfo.title, options.title]);
};
