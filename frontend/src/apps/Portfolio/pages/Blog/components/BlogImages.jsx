// Shared Blog Image Components
// Use these components in your blog posts for consistent image rendering

import React from "react";

/**
 * Creates a consistent blog image component with 3 size variants
 * @param {Object} config - Configuration object
 * @param {string} config.title - Title overlay text
 * @param {string} config.subtitle - Subtitle text
 * @param {string} config.badge - Badge text (e.g., "2025 Guide")
 * @param {string} config.gradientFrom - Gradient start color (e.g., "cyan-500")
 * @param {string} config.gradientTo - Gradient end color (e.g., "blue-600")
 * @param {React.ComponentType} config.icon - Lucide icon component
 * @param {string} config.fallbackImage - Fallback URL image
 */
export function createBlogImages({
  title,
  subtitle,
  badge,
  gradientFrom = "cyan-500",
  gradientTo = "blue-600",
  icon: Icon,
  fallbackImage,
  category
}) {
  // Thumbnail - Small image for search results
  function ThumbnailImage({ className = "" }) {
    return (
      <div className={`bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/20`} />
        {Icon && <Icon size={24} className={`text-${gradientFrom} relative z-10`} />}
        {!Icon && fallbackImage && (
          <img src={fallbackImage} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
    );
  }

  // Card Image - Medium size for blog listing cards
  function CardImage({ className = "" }) {
    return (
      <div className={`bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 relative overflow-hidden ${className}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

        {/* Gradient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-${gradientFrom}/30 rounded-full blur-3xl`} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
          {Icon && (
            <div className={`w-12 h-12 rounded-xl bg-${gradientFrom}/10 border border-${gradientFrom}/20 flex items-center justify-center mb-3`}>
              <Icon size={24} className={`text-${gradientFrom}`} />
            </div>
          )}
          {badge && (
            <span className={`text-xs font-medium text-${gradientFrom} mb-1`}>{badge}</span>
          )}
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">{title}</h3>
        </div>
      </div>
    );
  }

  // Featured Image - Large size for featured carousel
  function FeaturedImage({ className = "" }) {
    return (
      <div className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden ${className}`}>
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Ambient Glows */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-${gradientFrom}/15 rounded-full blur-[100px]`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-${gradientTo}/15 rounded-full blur-[100px]`} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Badge */}
          {badge && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-6`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${gradientFrom} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-${gradientFrom}`}></span>
              </span>
              <span className={`text-${gradientFrom} text-sm font-medium`}>{badge}</span>
            </div>
          )}

          {/* Icon */}
          {Icon && (
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${gradientFrom}/10 to-${gradientTo}/10 border border-${gradientFrom}/20 flex items-center justify-center mb-6`}>
              <Icon size={40} className={`text-${gradientFrom}`} />
            </div>
          )}

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
            <span className="text-white">{title?.split(' ').slice(0, -1).join(' ')} </span>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`}>
              {title?.split(' ').slice(-1)[0]}
            </span>
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-slate-400 max-w-md">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // Assign to component for static access
  ThumbnailImage.displayName = `${title}_Thumbnail`;
  CardImage.displayName = `${title}_Card`;
  FeaturedImage.displayName = `${title}_Featured`;

  return { ThumbnailImage, CardImage, FeaturedImage };
}

// Pre-built theme presets
export const imageThemes = {
  ai: { gradientFrom: "cyan-400", gradientTo: "blue-500" },
  development: { gradientFrom: "emerald-400", gradientTo: "cyan-500" },
  tools: { gradientFrom: "amber-400", gradientTo: "orange-500" },
  git: { gradientFrom: "violet-400", gradientTo: "purple-500" },
  react: { gradientFrom: "cyan-400", gradientTo: "blue-600" },
};
