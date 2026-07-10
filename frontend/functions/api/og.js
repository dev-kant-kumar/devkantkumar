// Cloudflare Pages Function: /api/og?url=<page>
//
// Server-side fetch for the OG / Social Preview tool. Because this runs on our
// own origin, there is no browser CORS restriction and no dependency on flaky
// public CORS proxies. It returns the target page's HTML as JSON so the client
// can parse the Open Graph / meta tags.
//
// Response shape mirrors a proxy: { status, contents } on success, or { error }.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS,
      ...extraHeaders,
    },
  });
}

// Block obvious SSRF targets (localhost / private ranges / metadata IPs).
function isBlockedHost(host) {
  const h = host.toLowerCase();
  if (
    h === "localhost" ||
    h === "0.0.0.0" ||
    h === "::1" ||
    h.endsWith(".localhost") ||
    h.endsWith(".internal") ||
    h === "metadata.google.internal"
  ) {
    return true;
  }
  if (
    /^127\./.test(h) ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^169\.254\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h)
  ) {
    return true;
  }
  return false;
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestGet(context) {
  const reqUrl = new URL(context.request.url);
  const target = reqUrl.searchParams.get("url");

  if (!target) {
    return json({ error: "Missing 'url' query parameter." }, 400);
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json({ error: "Invalid URL." }, 400);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return json({ error: "Only http and https URLs are supported." }, 400);
  }
  if (isBlockedHost(parsed.hostname)) {
    return json({ error: "This host is not allowed." }, 400);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // A real-ish UA avoids some sites serving a bot page.
        "User-Agent":
          "Mozilla/5.0 (compatible; DevKantOGPreview/1.0; +https://www.devkantkumar.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const contentType = res.headers.get("content-type") || "";
    if (!/html|xml/i.test(contentType)) {
      return json(
        {
          error: `The URL returned "${contentType || "unknown"}", not an HTML page.`,
          status: res.status,
        },
        200
      );
    }

    // Cap the body so a huge page cannot exhaust memory.
    const raw = await res.text();
    const contents = raw.length > 1_500_000 ? raw.slice(0, 1_500_000) : raw;

    return json({ status: res.status, contents });
  } catch (err) {
    const aborted = err && err.name === "AbortError";
    return json(
      {
        error: aborted
          ? "The request timed out while fetching the page."
          : "Could not fetch the page. It may be down or blocking requests.",
      },
      502
    );
  } finally {
    clearTimeout(timer);
  }
}
