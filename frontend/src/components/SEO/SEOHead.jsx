import { Helmet } from "@dr.pogodin/react-helmet";
import { portfolioData } from "../../apps/Portfolio/store/data/portfolioData";

const SEOHead = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  article = {},
  noindex = false,
  canonical,
  canonicalUrl,
}) => {
  const { personalInfo, seoKeywords, seoConfig } = portfolioData;

  const getPageSEO = (pageName) => {
    return seoConfig.pages[pageName] || seoConfig.pages.home;
  };

  // Use pathname to infer page key (home, about, blog, content, etc.)
  const getCurrentPage = () => {
    if (typeof window === "undefined") return "home";
    const path = window.location.pathname.toLowerCase();
    const segments = path.split("/").filter(Boolean);
    const firstSegment = segments[0] || "home";

    // Handle specific tools matching
    if (firstSegment === "tools" && segments[1]) {
       // Map specific tool slugs to config keys if needed, or return segments[1] camelCased
       if (segments[1] === "json-formatter") return "jsonFormatter";
       // Add other tools here as you build them
       return "tools"; // fallback if specific tool config not found, or use 'tools' generic
    }

    return firstSegment;
  };

  const currentPage = getCurrentPage();
  const pageSEO = getPageSEO(currentPage);

  // Use provided title directly; otherwise build from page config + branding
  const pageTitle = title
    ? title
    : `${pageSEO.title} | ${personalInfo.name} - ${personalInfo.title}`;
  const pageDescription =
    description || pageSEO.description || seoConfig.defaultMeta.description;

  // Helper to ensure image URL is absolute (required for OG tags)
  const getAbsoluteImageUrl = (imgUrl) => {
    if (!imgUrl) return null;
    if (imgUrl.startsWith("http")) return imgUrl;
    const baseUrl = seoConfig.site.url.replace(/\/$/, "");
    const path = imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`;
    return `${baseUrl}${path}`;
  };

  // Fallback to profile image if no specific image provided
  const rawImage = image || personalInfo.profileImage;
  const pageImage = getAbsoluteImageUrl(rawImage);

  const pageUrl =
    url ||
    (typeof window !== "undefined" ? window.location.href : seoConfig.site.url);
  const pageKeywords = [...seoKeywords, ...keywords].join(", ");

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={personalInfo.name} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={canonical || canonicalUrl || pageUrl} />

      {/* Site Verifications */}
      <meta
        name="google-site-verification"
        content={seoConfig.analytics.googleSiteVerification}
      />
      <meta
        name="p:domain_verify"
        content={seoConfig.analytics.pinterestVerification}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />

      {/* Article specific (for blog posts) */}
      {type === "article" && (
        <>
          <meta property="article:author" content={personalInfo.name} />
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}
          {article.modifiedTime && (
            <meta
              property="article:modified_time"
              content={article.modifiedTime}
            />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags &&
            article.tags.map((tag) => (
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
    </Helmet>
  );
};

export default SEOHead;
