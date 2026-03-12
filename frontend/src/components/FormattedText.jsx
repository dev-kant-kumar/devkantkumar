import { memo, useMemo } from "react";

/**
 * FormattedText — intelligently renders plain-text descriptions with
 * preserved formatting: line breaks, emoji/symbol bullets, section headers,
 * and clickable URLs.
 *
 * Props:
 *  - text: string (plain text, possibly with \n, emojis, etc.)
 *  - className: optional wrapper class
 *  - truncate: number | false — if set, truncates to N chars with "..." (for cards)
 *  - variant: "full" (detail page) | "card" (listing card, compact)
 */

// Patterns for bullet-like lines
// Use alternation instead of character class to handle combined emoji (emoji + variation selector)
const BULLET_PATTERNS = [
  /^(?:✅|☑️|✓|✔️|🔹|🔸|▶️|➤|➡️|→|►|●|•|◆|◇|■|□|▪|▫|‣|⭐|⚡|🎯|💡|🔥|📌|🎨|📦|💰|🚀|✨|🛠️|💎|🎁|📊|📈|🏆|🔑|🌟|💪|🎉|📋|🆕|⬆️)/u,
  /^[-–—]\s/,
  /^\d+[.)]\s/,
];

// Patterns for section headers (ALL-CAPS text ending with : or standalone)
const HEADER_PATTERN = /^[A-Z][A-Z\s'&/,]{4,}:?\s*$/;

// URL detection
const URL_PATTERN =
  /(https?:\/\/[^\s<>,;)"']+)/g;

function isBulletLine(line) {
  return BULLET_PATTERNS.some((p) => p.test(line.trim()));
}

function isHeaderLine(line) {
  const trimmed = line.trim();
  return trimmed.length >= 5 && HEADER_PATTERN.test(trimmed);
}

/**
 * Convert inline URLs in text to <a> elements.
 */
function linkify(text) {
  if (!URL_PATTERN.test(text)) return text;

  // Reset regex lastIndex
  URL_PATTERN.lastIndex = 0;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = URL_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[1];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 break-all"
      >
        {url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 50)}
        {url.replace(/^https?:\/\/(www\.)?/, "").length > 50 ? "…" : ""}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

/**
 * Parse plain text into structured blocks for rendering.
 */
function parseBlocks(text) {
  if (!text) return [];

  const lines = text.split("\n");
  const blocks = [];
  let currentBulletGroup = null;

  const flushBullets = () => {
    if (currentBulletGroup) {
      blocks.push(currentBulletGroup);
      currentBulletGroup = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Skip empty lines — they become paragraph separators
    if (!trimmed) {
      flushBullets();
      // Add spacer only if previous block isn't already a spacer
      if (blocks.length > 0 && blocks[blocks.length - 1].type !== "spacer") {
        blocks.push({ type: "spacer" });
      }
      continue;
    }

    // Check if it's a section header (ALL-CAPS)
    if (isHeaderLine(trimmed)) {
      flushBullets();
      blocks.push({
        type: "header",
        content: trimmed.replace(/:$/, "").trim(),
      });
      continue;
    }

    // Check if it's a bullet line
    if (isBulletLine(trimmed)) {
      if (!currentBulletGroup) {
        currentBulletGroup = { type: "bullets", items: [] };
      }
      currentBulletGroup.items.push(trimmed);
      continue;
    }

    // Regular paragraph text
    flushBullets();
    blocks.push({ type: "paragraph", content: trimmed });
  }

  flushBullets();
  return blocks;
}

function FormattedText({
  text,
  className = "",
  truncate = false,
  variant = "full",
}) {
  const rendered = useMemo(() => {
    if (!text) return null;

    // For card variant with truncation, just show plain truncated text
    if (variant === "card" && truncate) {
      const clean = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
      const truncated =
        clean.length > truncate ? clean.slice(0, truncate) + "…" : clean;
      return (
        <p style={{ color: "#4b5563" }} className="leading-relaxed">
          {truncated}
        </p>
      );
    }

    // For card variant without explicit truncation, collapse to single paragraph
    if (variant === "card") {
      const clean = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
      return (
        <p style={{ color: "#4b5563" }} className="leading-relaxed">
          {clean}
        </p>
      );
    }

    // Full variant — parse and render all blocks
    const blocks = parseBlocks(text);

    return blocks.map((block, idx) => {
      switch (block.type) {
        case "spacer":
          return <div key={idx} className="h-3" />;

        case "header":
          return (
            <h4
              key={idx}
              style={{ color: "#111827" }}
              className="text-base font-bold mt-6 mb-2 uppercase tracking-wide"
            >
              {block.content}
            </h4>
          );

        case "bullets":
          return (
            <ul key={idx} className="space-y-2 my-3">
              {block.items.map((item, bIdx) => (
                <li
                  key={bIdx}
                  style={{ color: "#1f2937" }}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-0.5">
                    {extractBulletIcon(item)}
                  </span>
                  <span>{linkify(stripBulletPrefix(item))}</span>
                </li>
              ))}
            </ul>
          );

        case "paragraph":
          return (
            <p
              key={idx}
              style={{ color: "#1f2937" }}
              className="leading-relaxed mb-2"
            >
              {linkify(block.content)}
            </p>
          );

        default:
          return null;
      }
    });
  }, [text, truncate, variant]);

  if (!text) return null;

  return (
    <div className={`formatted-text ${className}`.trim()}>{rendered}</div>
  );
}

/**
 * Extract the emoji/symbol prefix from a bullet line to use as the icon.
 */
function extractBulletIcon(line) {
  const trimmed = line.trim();

  // Numbered bullets: "1." "2)" etc.
  const numMatch = trimmed.match(/^(\d+[.)])\s/);
  if (numMatch) {
    return (
      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm min-w-[1.5rem] text-right">
        {numMatch[1]}
      </span>
    );
  }

  // Dash bullets
  if (/^[-–—]\s/.test(trimmed)) {
    return <span className="text-gray-400">•</span>;
  }

  // Emoji/symbol bullets — extract the leading emoji
  const emojiMatch = trimmed.match(
    /^([\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[✅☑✓✔→►●•◆◇■□▪▫‣⭐⚡➤➡][\uFE0F]?)/u
  );
  if (emojiMatch) {
    return <span>{emojiMatch[1]}</span>;
  }

  return <span className="text-gray-400">•</span>;
}

/**
 * Strip the bullet prefix from a line to get just the content.
 */
function stripBulletPrefix(line) {
  const trimmed = line.trim();

  // Remove numbered prefix: "1. ", "2) "
  const numStripped = trimmed.replace(/^\d+[.)]\s+/, "");
  if (numStripped !== trimmed) return numStripped;

  // Remove dash prefix
  const dashStripped = trimmed.replace(/^[-–—]\s+/, "");
  if (dashStripped !== trimmed) return dashStripped;

  // Remove emoji prefix — match one emoji + optional space
  const emojiStripped = trimmed.replace(
    /^([\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[✅☑✓✔→►●•◆◇■□▪▫‣⭐⚡➤➡][\uFE0F]?)\s*/u,
    ""
  );
  if (emojiStripped !== trimmed) return emojiStripped;

  return trimmed;
}

export default memo(FormattedText);
