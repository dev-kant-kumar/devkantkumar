// Cloudflare Pages Function: /marketplace/services/[slug]
//
// Edge SSR / Dynamic Meta Injector for Service Detail Pages using Cloudflare HTMLRewriter.

export async function onRequest(context) {
  const { request, params, next } = context;
  const slug = params.slug;

  const response = await next();

  if (!slug || slug.includes(".")) {
    return response;
  }

  const origin = new URL(request.url).origin;
  const apiBase =
    context.env?.VITE_API_BASE_URL ||
    (origin.includes("localhost") ? "http://localhost:5000" : origin);

  try {
    const metaRes = await fetch(`${apiBase}/api/v1/marketplace/services/${slug}/meta`, {
      headers: {
        "User-Agent": "Cloudflare-Pages-Edge-SSR",
        Accept: "application/json",
      },
    });

    if (metaRes.status === 404) {
      return new Response(
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>Service Not Found | Dev Kant Kumar Marketplace</title>
  </head>
  <body style="font-family: sans-serif; text-align: center; padding: 50px;">
    <h1>Service Not Found</h1>
    <p>The requested service does not exist or has been removed.</p>
    <a href="/marketplace/services" style="color: #2563eb;">Back to Services</a>
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

    const ogImage =
      meta.images?.[0] || `${origin}/marketplace-og.jpg`;
    const servicePrice = meta.product?.price ?? 0;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": ["Service", "Product"],
      name: meta.title,
      description: meta.description,
      image: meta.images && meta.images.length > 0 ? meta.images : [ogImage],
      url: meta.url,
      brand: { "@type": "Brand", name: "Dev Kant Kumar Marketplace" },
      provider: { "@type": "Person", name: "Dev Kant Kumar", url: origin },
      offers: {
        "@type": "Offer",
        url: meta.url,
        priceCurrency: "INR",
        price: servicePrice,
        availability: "https://schema.org/InStock",
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

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(meta.title)}" />
    <meta name="twitter:description" content="${escapeXml(meta.description)}" />
    <meta name="twitter:image" content="${escapeXml(ogImage)}" />

    <!-- Schema.org Service (JSON-LD) -->
    <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
    </script>
`;

    return new HTMLRewriter()
      .on("title", {
        element(el) {
          el.remove();
        },
      })
      .on("head", {
        element(el) {
          el.append(injectedHead, { html: true });
        },
      })
      .transform(response);
  } catch (err) {
    console.error("Edge SSR error for service slug:", slug, err);
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
