// Top-level imports
import { Copy, Cpu, Layers, Server, Zap } from "lucide-react";
import React from "react";

function RSCFeaturedImage() {
  return (
    <div className="w-full h-[560px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute top-10 left-16 w-72 h-72 bg-cyan-500/25 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-14 right-20 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />
      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-semibold backdrop-blur-md shadow-lg shadow-cyan-500/10 mb-5">
          <Server size={16} /> Server Components • Streaming • Suspense
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
          React Server Components in{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            2025
          </span>
        </h1>
        <p className="text-xl text-slate-300 mt-4">
          Practical patterns, common pitfalls, and performance techniques for
          building fast, modern apps with React Server Components.
        </p>
        <div className="mt-6 flex items-center justify-center gap-6 text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Cpu className="text-cyan-300" size={18} /> Reduced JS payloads
          </span>
          <span className="inline-flex items-center gap-2">
            <Layers className="text-purple-300" size={18} /> Clean separation
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap className="text-yellow-300" size={18} /> Faster TTFB
          </span>
        </div>
      </div>
    </div>
  );
}

function RSCCardImage() {
  return (
    <div className="h-44 w-full bg-gradient-to-br from-cyan-900 via-slate-900 to-purple-900 rounded-xl flex items-center justify-center">
      <div className="flex items-center gap-3 text-cyan-200">
        <Server size={24} />
        <span className="font-semibold">React Server Components</span>
      </div>
    </div>
  );
}

// Reusable code block for readable, copyable code snippets
function CodeBlock({ language = "jsx", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-6 rounded-xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <span className="px-2 py-0.5 rounded bg-cyan-700/30 text-cyan-300 border border-cyan-600/40">
            {language.toUpperCase()}
          </span>
          {filename && <span className="font-mono">{filename}</span>}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors text-sm"
          aria-label="Copy code to clipboard"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <pre className="m-0 p-4 overflow-x-auto text-sm leading-relaxed bg-slate-900/60">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

function RSCGuide2025() {
  return (
    <article className="prose prose-xl prose-invert max-w-none blog-content text-slate-300 leading-loose text-lg font-light">
      <h2>What Are React Server Components?</h2>
      <p>
        React Server Components (RSC) render on the server and stream serialized
        output to the client. They don’t ship client-side JavaScript by default,
        which reduces bundle size and improves performance. Client Components
        still exist for interactive UI and run in the browser.
      </p>

      <h2>Why RSC Is Important in 2025</h2>
      <p>
        With modern frameworks adopting RSC-first architectures, teams are
        building faster apps by default. Streaming and data-fetching on the
        server improve Time To First Byte (TTFB) and Largest Contentful Paint
        (LCP), while client bundles remain lean.
      </p>

      <h3>Core Concepts</h3>
      <ul>
        <li>
          <strong>Server vs Client components:</strong> Server Components fetch
          data and render markup; Client Components handle interactivity.
        </li>
        <li>
          <strong>Suspense & Streaming:</strong> Start rendering early, stream
          content as it resolves, and improve perceived performance.
        </li>
        <li>
          <strong>Colocation:</strong> Keep data access in Server Components;
          pass minimal props to Client Components.
        </li>
      </ul>

      <h3>Common Pitfalls</h3>
      <ul>
        <li>
          <strong>Accidental client-only APIs:</strong> Avoid using browser APIs
          in Server Components. Move those bits to Client Components.
        </li>
        <li>
          <strong>Leaky boundaries:</strong> Keep hooks and state in Client
          Components; avoid importing them in Server Components.
        </li>
        <li>
          <strong>Over-fetching:</strong> Centralize data access at
          page/route-level Server Components to minimize duplicate queries.
        </li>
      </ul>

      <h3>Practical Patterns</h3>
      <p>
        Use Server Components for data-heavy sections like dashboards, lists,
        and detail views; wrap interactive widgets (forms, charts, editors) as
        Client Components. Compose with Suspense for streaming and graceful
        loading states.
      </p>

      <h3>Example: Server + Client Composition</h3>
      <CodeBlock
        language="tsx"
        filename="ProductsPage.tsx"
        code={`// Server Component (data + markup)
export default async function ProductsPage() {
  const products = await getProducts(); // server-side data access
  return (
    <section>
      <h1>Products</h1>
      <ProductTable products={products} /> {/* Client Component */}
    </section>
  );
}

// Client Component (interactivity)
'use client';
import { useState } from 'react';

function ProductTable({ products }) {
  const [q, setQ] = useState('');
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Filter..."
      />
      <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </>
  );
}`}
      />

      <h3>Performance Checklist</h3>
      <ul>
        <li>
          Keep Client Components small and focused; avoid large UI libraries in
          the client.
        </li>
        <li>
          Stream above-the-fold content with Suspense; defer non-critical
          sections.
        </li>
        <li>
          Cache data at the server layer; avoid duplicate requests across
          components.
        </li>
        <li>
          Preload critical assets; lazy-load images and hydrate progressively.
        </li>
      </ul>

      <h3>When Not to Use RSC</h3>
      <p>
        For pure client-side applications or highly interactive real-time
        widgets (canvas, complex editors), prefer Client Components and ship the
        necessary JS. Use RSC for the rest of the page shell.
      </p>

      <h2>Conclusion</h2>
      <p>
        RSC enables faster apps with cleaner boundaries. Adopt a “server-first”
        mindset for data and markup, then sprinkle interactivity via small
        Client Components. Start with pages that fetch heavy data and measure
        LCP and TTFB to validate the gains.
      </p>
    </article>
  );
}

// Attach image helpers used by Blog.jsx and BlogPost.jsx
RSCGuide2025.FeaturedImage = RSCFeaturedImage;
RSCGuide2025.Image = RSCCardImage;
RSCGuide2025.CardImage = RSCCardImage;

// Post metadata used across the blog
RSCGuide2025.info = {
  id: "react-server-components-2025",
  slug: "react-server-components-2025",
  title:
    "React Server Components (RSC) in 2025: Patterns, Pitfalls, and Performance",
  excerpt:
    "A practical guide to building fast apps with React Server Components: streaming, Suspense, and clean server/client boundaries.",
  category: "React",
  author: "Dev Kant Kumar",
  readTime: "12 min read",
  image: "/devkantkumar.jpg",
  featuredImage: "/devkantkumar.jpg",
  featured: true,
  publishDate: "2025-11-18T00:00:00.000Z",
  modifiedDate: "2025-11-18T00:00:00.000Z",
  tags: [
    "react",
    "server-components",
    "suspense",
    "streaming",
    "nextjs",
    "performance",
    "frontend-architecture",
  ],
};

export default RSCGuide2025;
