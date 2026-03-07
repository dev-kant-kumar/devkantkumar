import { Helmet } from "@dr.pogodin/react-helmet";

/**
 * Schema.org Product markup component for rich snippets in Google search
 * Use this on product detail pages to get product rich snippets
 */
const ProductSchema = ({
  product,
  reviews = [],
  baseUrl = "https://www.devkantkumar.com"
}) => {
  if (!product) return null;

  const productUrl = `${baseUrl}/marketplace/products/${product._id}`;
  const productImages = product.images?.map(img => img.url).filter(Boolean);
  const productImage = productImages?.length > 0 ? productImages : [`${baseUrl}/og-image.jpg`];

  const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split('T')[0];

  // Calculate aggregate rating from reviews
  const aggregateRating = reviews.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  } : null;

  // Format reviews for schema
  const schemaReviews = reviews.slice(0, 5).map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.user?.firstName || "Customer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.comment || "",
    "datePublished": review.createdAt
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": productImage,
    "url": productUrl,
    "sku": product._id || product.sku,
    ...(product.gtin && { "gtin": product.gtin }),
    "brand": {
      "@type": "Brand",
      "name": "Dev Kant Kumar Marketplace"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": priceValidUntil,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Person",
        "name": "Dev Kant Kumar"
      }
    },
    "category": product.category,
    ...(aggregateRating && { aggregateRating }),
    ...(schemaReviews.length > 0 && { review: schemaReviews })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * Schema.org Service markup for service detail pages
 */
export const ServiceSchema = ({
  service,
  reviews = [],
  baseUrl = "https://www.devkantkumar.com"
}) => {
  if (!service) return null;

  const serviceUrl = `${baseUrl}/marketplace/services/${service._id}`;
  const serviceImage = service.images?.[0]?.url || `${baseUrl}/og-image.jpg`;

  const packages = service.packages?.length > 0 ? service.packages : [];
  const prices = packages.map(pkg => pkg.price).filter(p => typeof p === 'number' && p >= 0);
  const lowPrice = prices.length > 0 ? Math.min(...prices) : (service.startingPrice || 0);
  const highPrice = prices.length > 0 ? Math.max(...prices) : lowPrice;

  // Calculate aggregate rating
  const aggregateRating = reviews.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  } : null;

  const offersSchema = packages.length > 1
    ? {
        "@type": "AggregateOffer",
        "url": serviceUrl,
        "priceCurrency": "INR",
        "lowPrice": lowPrice,
        "highPrice": highPrice,
        "offerCount": packages.length,
        "offers": packages.map(pkg => ({
          "@type": "Offer",
          "name": pkg.name,
          "price": pkg.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }))
      }
    : {
        "@type": "Offer",
        "url": serviceUrl,
        "priceCurrency": "INR",
        "price": lowPrice,
        "availability": "https://schema.org/InStock"
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    "name": service.title,
    "description": service.description,
    "image": serviceImage,
    "url": serviceUrl,
    "serviceType": service.category || "Web Development",
    "provider": {
      "@type": "Person",
      "name": "Dev Kant Kumar",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "offers": offersSchema,
    ...(packages.length > 0 && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.title} Packages`,
        "itemListElement": packages.map(pkg => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": pkg.name,
            "description": pkg.description || pkg.name
          },
          "price": pkg.price,
          "priceCurrency": "INR"
        }))
      }
    }),
    "category": service.category,
    ...(aggregateRating && { aggregateRating }),
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 5).map(review => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": review.user?.firstName || "Customer" },
        "reviewRating": { "@type": "Rating", "ratingValue": review.rating, "bestRating": 5, "worstRating": 1 },
        "reviewBody": review.comment || "",
        "datePublished": review.createdAt
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * Organization schema for the marketplace - add to layout/root
 */
export const OrganizationSchema = ({
  baseUrl = "https://www.devkantkumar.com"
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dev Kant Kumar — Full Stack Developer & Marketplace",
    "description": "Premium React templates, MERN boilerplates, and full-stack web development services by Dev Kant Kumar.",
    "url": `${baseUrl}/marketplace`,
    "logo": `${baseUrl}/logo.png`,
    "priceRange": "₹999 - ₹1,99,999",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services & Digital Products",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React Templates" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API Development" } }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7294177563",
      "contactType": "customer service",
      "email": "hello@devkantkumar.com",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://github.com/dev-kant-kumar",
      "https://linkedin.com/in/devkantkumar",
      "https://twitter.com/dev_kant_kumar"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * Breadcrumb schema for navigation
 */
export const BreadcrumbSchema = ({
  items = [],
  baseUrl = "https://www.devkantkumar.com"
}) => {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * ItemList schema for listing pages (products, services)
 * Helps Google show individual items in search results
 */
export const ItemListSchema = ({
  items = [],
  listName,
  listUrl,
  baseUrl = "https://www.devkantkumar.com"
}) => {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "url": listUrl,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${baseUrl}/marketplace/${item.type === 'service' ? 'services' : 'products'}/${item._id}`,
      "name": item.title
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * FAQPage schema for FAQ pages
 * Enables FAQ rich results in Google Search
 */
export const FAQPageSchema = ({ faqs = [] }) => {
  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;
