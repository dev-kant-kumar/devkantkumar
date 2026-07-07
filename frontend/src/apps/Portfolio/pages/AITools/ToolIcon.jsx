import { useState } from "react";
import { faviconUrl } from "./utils";

/**
 * Renders a tool's real brand logo (favicon from its live domain), falling
 * back to the emoji logo from the data if the image fails to load. Used on
 * the directory hub, detail hero and the alternatives grid so icons stay
 * consistent everywhere.
 */
const ToolIcon = ({ tool, size = 40, className = "" }) => {
  const [errored, setErrored] = useState(false);
  const src = faviconUrl(tool);

  if (errored || !src) {
    return (
      <span
        role="img"
        aria-label={`${tool?.name || "tool"} logo`}
        className={className}
        style={{ fontSize: Math.round(size * 0.8), lineHeight: 1 }}
      >
        {tool?.logo || "🤖"}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${tool.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setErrored(true)}
      className={`object-contain rounded-md bg-white/5 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default ToolIcon;
