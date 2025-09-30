import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const SEOHead = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  article = {},
  noindex = false,
  canonical
}) => {
  const { personalInfo, seoKeywords, seoConfig } = portfolioData;

  // Get page-specific SEO data from portfolioData
  const getPageSEO = (pageName) => {
    return seoConfig.pages[pageName] || seoConfig.pages.home;
  };

  // Determine current page from title or URL
  const currentPage = title ? title.toLowerCase() : 'home';
  const pageSEO = getPageSEO(currentPage);

  // All values from portfolioData
  const pageTitle = title ? `${pageSEO.title} | ${personalInfo.name} - ${personalInfo.title}` : seoConfig.defaultMeta.title;
  const pageDescription = description || pageSEO.description || seoConfig.defaultMeta.description;
  const pageImage = image || personalInfo.profileImage;
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : seoConfig.site.url);
  const pageKeywords = [
    ...seoKeywords,
    ...keywords
  ].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={personalInfo.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || pageUrl} />

      {/* Site Verifications */}
      <meta name="google-site-verification" content={seoConfig.analytics.googleSiteVerification} />
      <meta name="p:domain_verify" content={seoConfig.analytics.pinterestVerification} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={personalInfo.name} />
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seoConfig.social.twitter} />
        <meta name="twitter:creator" content={seoConfig.social.twitter} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:domain" content={seoConfig.site.domain} />

      {/* Performance & Crawl */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <meta name="theme-color" content="#0f172a" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

export default SEOHead;
