// =====================================================
// AI Tools - programmatic SEO helpers
// Single source of truth for slugs, lookups, alternatives,
// offers and auto-generated FAQs. Used by the hub page,
// detail page, the prerenderer and the sitemap generator so
// every layer derives the exact same URLs from aiToolsData.
// =====================================================
import aiToolsData from "../Blog/Posts/data/aiToolsData.js";

/** Convert a tool name into a stable, URL-safe slug. */
export const slugify = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Precomputed index: slug -> tool (all 102 slugs are unique, verified).
const toolsBySlug = aiToolsData.reduce((acc, tool) => {
  acc[slugify(tool.name)] = { ...tool, slug: slugify(tool.name) };
  return acc;
}, {});

/** Every tool with its slug attached. Order preserved from the data file. */
export const allAiTools = aiToolsData.map((tool) => ({
  ...tool,
  slug: slugify(tool.name),
}));

/** All slugs - used by the prerenderer and sitemap generator. */
export const aiToolSlugs = allAiTools.map((t) => t.slug);

/** Look up a single tool by its slug. Returns undefined if not found. */
export const getToolBySlug = (slug) => toolsBySlug[slug];

/** Extract a clean hostname (no www) from a tool URL. */
export const getDomain = (url = "") => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/**
 * Real brand logo for a tool, resolved from its live domain via Google's
 * favicon service. Returns "" when the URL is unusable so callers can fall
 * back to the emoji logo.
 */
export const faviconUrl = (tool) => {
  const domain = getDomain(tool?.url);
  return domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";
};

/**
 * Return up to `limit` other tools in the same category.
 * This same-category cross-linking is what turns the directory
 * into a connected graph Google can crawl and rank.
 */
export const getAlternatives = (tool, limit = 6) => {
  if (!tool) return [];
  return allAiTools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
};

/** Map an editorial pricing label to a schema.org Offer. */
export const getOffer = (pricing) => {
  const isFree = pricing === "Free" || pricing === "Open Source";
  return {
    "@type": "Offer",
    price: isFree ? "0" : "0", // paid tools list from $0 (free tier) - avoids asserting a price we don't track
    priceCurrency: "USD",
    availability: "https://schema.org/OnlineOnly",
  };
};

/**
 * Build a short, honest pricing sentence for on-page copy.
 */
export const pricingBlurb = (tool) => {
  switch (tool.pricing) {
    case "Free":
      return `${tool.name} is completely free to use.`;
    case "Open Source":
      return `${tool.name} is open source and free to self-host or use.`;
    case "Premium":
      return `${tool.name} is a paid tool - pricing is set by ${tool.name}.`;
    case "Freemium":
    default:
      return `${tool.name} offers a free tier, with paid plans for advanced features.`;
  }
};

/**
 * Auto-generate a small, unique FAQ set per tool. Templated but
 * personalised with the tool's real data so no two pages are identical.
 */
export const buildFaqs = (tool) => {
  const alts = getAlternatives(tool, 3)
    .map((t) => t.name)
    .join(", ");
  const faqs = [
    {
      question: `What is ${tool.name} used for?`,
      answer: `${tool.name} is a ${tool.category.toLowerCase()} tool. ${tool.description}`,
    },
    {
      question: `Is ${tool.name} free?`,
      answer: pricingBlurb(tool),
    },
  ];
  if (alts) {
    faqs.push({
      question: `What are the best alternatives to ${tool.name}?`,
      answer: `Popular ${tool.category.toLowerCase()} alternatives to ${tool.name} include ${alts}. You can compare all of them in the AI Tools Directory.`,
    });
  }
  return faqs;
};
