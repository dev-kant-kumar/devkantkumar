import { portfolioData } from '../apps/Portfolio/store/data/portfolioData';

/**
 * Updates HTML metadata dynamically using portfolioData
 */
export const updateHTMLMetadata = () => {
  const { personalInfo } = portfolioData;

  // Update document title
  document.title = `${personalInfo.name} - ${personalInfo.title}`;

  // Update or create favicon
  updateFavicon(personalInfo.profileImage);

  // Update meta description
  updateMetaDescription();

  // Update other meta tags
  updateMetaTags();
};

/**
 * Creates a rounded favicon from the profile image
 */
const updateFavicon = (profileImageUrl) => {
  // Remove existing favicon
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }

  // Create canvas to generate rounded favicon
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 64; // Favicon size

  canvas.width = size;
  canvas.height = size;

  // Create image element
  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    // Draw image
    ctx.drawImage(img, 0, 0, size, size);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create and append new favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = dataURL;

    document.head.appendChild(favicon);
  };

  img.onerror = () => {
    // Fallback to original image if canvas fails
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = profileImageUrl;

    document.head.appendChild(favicon);
  };

  img.src = profileImageUrl;
};

/**
 * Updates meta description
 */
const updateMetaDescription = () => {
  const { personalInfo, professionalSummary } = portfolioData;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }

  metaDescription.content = `${personalInfo.name} - ${personalInfo.title}. ${professionalSummary.overview.split('.')[0]}.`;
};

/**
 * Updates other important meta tags
 */
const updateMetaTags = () => {
  const { personalInfo, seoKeywords } = portfolioData;

  // Update or create keywords meta tag
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = seoKeywords.join(', ');

  // Update or create author meta tag
  let metaAuthor = document.querySelector('meta[name="author"]');
  if (!metaAuthor) {
    metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    document.head.appendChild(metaAuthor);
  }
  metaAuthor.content = personalInfo.name;

  // Update or create viewport meta tag (ensure it exists)
  let metaViewport = document.querySelector('meta[name="viewport"]');
  if (!metaViewport) {
    metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(metaViewport);
  }

  // Add Open Graph meta tags for social sharing
  updateOpenGraphTags();
};

/**
 * Updates Open Graph meta tags for better social media sharing
 */
const updateOpenGraphTags = () => {
  const { personalInfo, professionalSummary } = portfolioData;

  const ogTags = [
    { property: 'og:title', content: `${personalInfo.name} - ${personalInfo.title}` },
    { property: 'og:description', content: professionalSummary.overview.split('.')[0] },
    { property: 'og:image', content: personalInfo.profileImage },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${personalInfo.name} - ${personalInfo.title}` },
    { name: 'twitter:description', content: professionalSummary.overview.split('.')[0] },
    { name: 'twitter:image', content: personalInfo.profileImage }
  ];

  ogTags.forEach(tag => {
    const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
    let metaTag = document.querySelector(selector);

    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (tag.property) {
        metaTag.setAttribute('property', tag.property);
      } else {
        metaTag.setAttribute('name', tag.name);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.content = tag.content;
  });
};
