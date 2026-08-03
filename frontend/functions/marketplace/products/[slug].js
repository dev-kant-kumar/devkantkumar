// Cloudflare Pages Function: /marketplace/products/[slug]
//
// Edge SSR / Dynamic Meta Injector using Cloudflare HTMLRewriter.
//
// Industry-Grade Edge Architecture:
// 1. Intercepts incoming HTTP requests for product detail pages at the CDN Edge.
// 2. Queries the backend API endpoint (/api/v1/marketplace/products/:slug/meta) for product metadata.
// 3. If product exists: Uses Cloudflare's streaming HTMLRewriter to inject title, description,
//    canonical link, Open Graph tags, Twitter Card tags, Meta/Facebook Ads tags, and Schema.org JSON-LD
//    directly into the initial HTML response with HTTP 200 OK.
// 4. If product does not exist in backend: Responds with an explicit HTTP 404 Not Found header,
//    preventing Soft-404 indexing errors in Google Search Console.

export async function onRequest(context) {
  const { request, params, next } = context;
  const slug = params.slug;

  // 1. Fetch the raw app shell response from Cloudflare Pages static CDN
  const response = await next();

  // Skip static asset files or requests missing a slug
  if (!slug || slug.includes(".")) {
    return response;
  }

  // Build backend API URL for product meta
  const origin = new URL(request.url).origin;
  const apiBase =
    context.env?.VITE_API_BASE_URL ||
    (origin.includes("localhost") ? "http://localhost:5000" : origin);

  try {
    // 2. Fetch product metadata from backend
    const metaRes = await fetch(`${apiBase}/api/v1/marketplace/products/${slug}/meta`, {
      headers: {
        "User-Agent": "Cloudflare-Pages-Edge-SSR",
        Accept: "application/json",
      },
    });

    // If backend reports 404 (product not found in DB), return explicit HTTP 404 status
    if (metaRes.status === 404) {
      return new Response(
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>Product Not Found | Dev Kant Kumar Marketplace</title>
  </head>
  <body style="font-family: sans-serif; text-align: center; padding: 50px;">
    <h1>Product Not Found</h1>
    <p>The requested product does not exist or has been removed.</p>
    <a href="/marketplace/products" style="color: #2563eb;">Back to Products</a>
  </body>
</html>`,
        {
          status: 404,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (!metaRes.ok) {
      return response;
    }

    const meta = await metaRes.json();

    // 3. Inject metadata using streaming HTMLRewriter at the CDN Edge
    const ogImage =
      meta.images?.[0] || `${origin}/marketplace-og.jpg`;
    const productPrice = meta.product?.price ?? 0;
    const availability = meta.product?.availability || "in stock";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: meta.title,
      description: meta.description,
      image: meta.images && meta.images.length > 0 ? meta.images : [ogImage],
      url: meta.url,
      sku: meta.id || slug,
      brand: { "@type": "Brand", name: "Dev Kant Kumar Marketplace" },
      offers: {
        "@type": "Offer",
        url: meta.url,
        priceCurrency: "INR",
        price: productPrice,
        priceValidUntil: meta.product?.priceValidUntil || "2027-12-31",
        availability:
          availability === "in stock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: { "@type": "Person", name: "Dev Kant Kumar" },
      },
    };

    const injectedHead = `
    <!-- Edge-Injected SEO -->
    <title>${escapeXml(meta.title)} | Dev Kant Kumar Marketplace</title>
    <meta name="description" content="${escapeXml(meta.description)}" />
    <link rel="canonical" href="${escapeXml(meta.canonical || meta.url)}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="${escapeXml(meta.url)}" />
    <meta property="og:title" content="${escapeXml(meta.title)}" />
    <meta property="og:description" content="${escapeXml(meta.description)}" />
    <meta property="og:image" content="${escapeXml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Dev Kant Kumar Marketplace" />
    <meta property="og:locale" content="en_US" />

    <!-- Meta / Facebook Ads product-specific tags -->
    <meta property="product:price:amount" content="${productPrice}" />
    <meta property="product:price:currency" content="INR" />
    <meta property="product:availability" content="${escapeXml(availability)}" />
    <meta property="product:condition" content="new" />
    <meta property="product:brand" content="Dev Kant Kumar Marketplace" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(meta.title)}" />
    <meta name="twitter:description" content="${escapeXml(meta.description)}" />
    <meta name="twitter:image" content="${escapeXml(ogImage)}" />

    <!-- Schema.org Product (JSON-LD) -->
    <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
    </script>
`;

    return new HTMLRewriter()
      .on("title", {
        element(el) {
          el.remove(); // Remove default title, edge tag replaces it
        },
      })
      .on("head", {
        element(el) {
          el.append(injectedHead, { html: true });
        },
      })
      .transform(response);
  } catch (err) {
    console.error("Edge SSR error for product slug:", slug, err);
    return response;
  }
}

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
