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
  // Product-specific Open Graph tags (used when type="product")
  product = {},
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

  const baseSiteAppend = ` | ${personalInfo.name}`;
  const fullSiteAppend = ` | ${personalInfo.name} - ${personalInfo.title}`;
  
  // Use provided title directly if provided
  let pageTitle = title || pageSEO.title;
  if (!pageTitle.includes(personalInfo.name)) {
      if (pageTitle.length + fullSiteAppend.length <= 70) {
          pageTitle += fullSiteAppend;
      } else if (pageTitle.length + baseSiteAppend.length <= 70) {
          pageTitle += baseSiteAppend;
      }
      // If it's already long, do not append anything to avoid Google truncating.
  }
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

  // Helper to ensure canonical URL is always absolute (required for correct SEO)
  const getAbsoluteCanonical = (rawCanonical) => {
    if (!rawCanonical) return null;
    if (rawCanonical.startsWith("http")) return rawCanonical;
    const baseUrl = seoConfig.site.url.replace(/\/$/, "");
    const path = rawCanonical.startsWith("/") ? rawCanonical : `/${rawCanonical}`;
    return `${baseUrl}${path}`;
  };

  // Normalize the canonical URL: drop hash + query, and strip any trailing slash
  // (except root). So /blog/x, /blog/x/, and /blog/x#section all resolve to ONE
  // canonical. Without this, pages that don't pass an explicit canonical fall back
  // to window.location.href and self-duplicate (the "/x" vs "/x/" coverage errors).
  const normalizeCanonical = (u) => {
    if (!u) return u;
    try {
      const parsed = new URL(u);
      parsed.hash = "";
      parsed.search = "";
      if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
        parsed.pathname = parsed.pathname.replace(/\/+$/, "");
      }
      return parsed.toString();
    } catch {
      return u;
    }
  };

  const canonicalHref = normalizeCanonical(
    getAbsoluteCanonical(canonical) ||
      getAbsoluteCanonical(canonicalUrl) ||
      pageUrl
  );

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
      <link rel="canonical" href={canonicalHref} />

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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="Dev Kant Kumar Marketplace" />
      <meta property="og:locale" content="en_US" />

      {/* Product-specific Open Graph tags (Facebook/Meta Ads, Google Merchant) */}
      {type === "product" && product.price != null && (
        <>
          <meta property="product:price:amount" content={String(product.price)} />
          <meta property="product:price:currency" content={product.currency || "INR"} />
          <meta
            property="product:availability"
            content={product.availability ?? "in stock"}
          />
          <meta property="product:condition" content="new" />
          {product.retailerItemId && (
            <meta property="product:retailer_item_id" content={product.retailerItemId} />
          )}
          {product.brand && (
            <meta property="product:brand" content={product.brand} />
          )}
          {product.category && (
            <meta property="product:category" content={product.category} />
          )}
        </>
      )}

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
