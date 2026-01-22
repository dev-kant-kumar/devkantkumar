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
  const productImage = product.images?.[0]?.url || `${baseUrl}/og-image.jpg`;

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
    "brand": {
      "@type": "Brand",
      "name": "Dev Kant Kumar Marketplace"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "INR",
      "price": product.price,
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
  const startingPrice = service.packages?.[0]?.price || service.startingPrice || 0;

  // Calculate aggregate rating
  const aggregateRating = reviews.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  } : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "image": serviceImage,
    "url": serviceUrl,
    "provider": {
      "@type": "Person",
      "name": "Dev Kant Kumar",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "offers": {
      "@type": "Offer",
      "url": serviceUrl,
      "priceCurrency": "INR",
      "price": startingPrice,
      "availability": "https://schema.org/InStock"
    },
    "category": service.category,
    ...(aggregateRating && { aggregateRating })
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
    "@type": "Organization",
    "name": "Dev Kant Kumar Marketplace",
    "url": `${baseUrl}/marketplace`,
    "logo": `${baseUrl}/logo.png`,
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

export default ProductSchema;
