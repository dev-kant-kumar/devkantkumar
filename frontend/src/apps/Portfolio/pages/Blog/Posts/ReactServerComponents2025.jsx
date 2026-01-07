// Top-level imports
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Calendar,
    Check,
    Clock,
    Code2,
    Copy,
    Cpu,
    Layers,
    Lightbulb,
    Rocket,
    Server,
    Shield,
    Tag,
    Target,
    Terminal,
    TrendingUp,
    User,
    Zap
} from "lucide-react";
import React from "react";

function RSCFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 text-sm font-medium">2025 Guide</span>
        </div>

        {/* Icon Grid - larger */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Cpu size={28} className="text-cyan-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Server size={40} className="text-cyan-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Layers size={28} className="text-purple-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">React Server </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Components</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          The Complete 2025 Mastery Guide
        </p>
      </div>
    </div>
  );
}

function RSCCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Server size={32} className="text-cyan-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-cyan-50">
          React Server Components
        </span>
      </div>
    </div>
  );
}

// Enhanced code block with better styling
function CodeBlock({ language = "jsx", filename, code, highlight }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-8 rounded-xl border border-slate-700/50 bg-slate-900/80 overflow-hidden shadow-2xl shadow-cyan-500/5">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Terminal size={16} className="text-cyan-400" />
          <span className="px-2.5 py-1 rounded-md bg-cyan-900/40 text-cyan-300 border border-cyan-700/40 font-mono font-semibold">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/20"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-loose bg-slate-950/50">
        <code className={`language-${language} text-slate-200`}>{code}</code>
      </pre>
    </div>
  );
}

// Info box component for tips and warnings
function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    danger: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-8 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Metadata bar component
function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-cyan-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-cyan-400" />
          <span>November 18, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-cyan-400" />
          <span>15 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-cyan-400" />
          <span>React • Server Components • Performance</span>
        </div>
      </div>
    </div>
  );
}

// Table of contents


function RSCGuide2025() {
  return (
    <div className="min-h-screen">
      <RSCFeaturedImage />
      <ArticleMetadata />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
            React Server Components represent the most significant shift in
            React architecture since Hooks.This comprehensive guide explores how
            RSC enables developers to build faster, more maintainable
            applications by moving rendering and data fetching to the server
            while keeping interactivity on the client.
          </p>

        </section>

        {/* Section 1: Understanding RSC */}
        <section id="introduction" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Server size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Understanding RSC Architecture
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              React Server Components (RSC) fundamentally change how we think
              about React applications. Unlike traditionalReact components that
              run entirely in the browser, Server Components render on the
              server and stream theiroutput to the client as a serialized
              format.
            </p>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <Layers size={24} className="text-purple-400" />
              The Two-Component System
            </h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-cyan-900/20 border border-cyan-700/30">
                <h4 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                  <Server size={20} />
                  Server Components
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Render on the server during build or request time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Direct access to backend resources (databases, APIs,
                      filesystem)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Zero JavaScript shipped to the client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Can use Node.js packages without bundle bloat</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-purple-900/20 border border-purple-700/30">
                <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Zap size={20} />
                  Client Components
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-purple-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Run in the browser with full interactivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-purple-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Access to browser APIs and React hooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-purple-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Maintain state and handle user interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-purple-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Marked with 'use client' directive</span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="Key Insight" icon={Lightbulb}>
              Server Components are the default in RSC-enabled frameworks. You
              only need to add 'use client' when you need interactivity, state,
              or browser APIs. This "server-first" approach dramatically reduces
              your JavaScript bundle size.
            </InfoBox>
          </div>
        </section>

        {/* Section 2: Why RSC Matters */}
        <section id="why-rsc" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Why RSC Matters in 2025
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              The web has evolved. Users expect instant page loads, and Google's
              Core Web Vitals directly impact your search rankings. RSC
              addresses these challenges by fundamentally improving how React
              applications deliver content.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-700/30">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <Cpu size={24} className="text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-green-300 mb-3">
                  Reduced Bundle Size
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Average 40-60% reduction in JavaScript payload. Heavy
                  dependencies like date libraries, markdown parsers, and data
                  utilities stay on the server.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-700/30">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-blue-300 mb-3">
                  Faster TTFB
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Server-side data fetching eliminates client-side waterfall
                  requests. Users see content 200-500ms faster on average.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-700/30">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Shield size={24} className="text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-purple-300 mb-3">
                  Better Security
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  API keys, database credentials, and sensitive logic never
                  reach the client. Server-side validation and authorization are
                  built-in.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              Industry Adoption
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Major frameworks have embraced RSC as the default architecture:
            </p>
            <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3 text-slate-300">
                <ArrowRight
                  size={20}
                  className="text-cyan-400 mt-1 flex-shrink-0"
                />
                <span>
                  <strong className="text-white">Next.js 13+</strong> - Full RSC
                  support with App Router, making server-first the default
                  pattern
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ArrowRight
                  size={20}
                  className="text-cyan-400 mt-1 flex-shrink-0"
                />
                <span>
                  <strong className="text-white">Remix</strong> - Integrating
                  RSC alongside their loader pattern for optimal data handling
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ArrowRight
                  size={20}
                  className="text-cyan-400 mt-1 flex-shrink-0"
                />
                <span>
                  <strong className="text-white">
                    Vercel, Netlify, Cloudflare
                  </strong>{" "}
                  - Edge runtime optimizations specifically for RSC workloads
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Core Concepts */}
        <section id="core-concepts" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Layers size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Core Concepts & Mental Models
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              1. Component Boundaries
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Understanding where to draw the line between server and client
              components is crucial. The general rule:keep as much on the server
              as possible, only moving to the client when you need
              interactivity.
            </p>

            <CodeBlock
              language="tsx"
              filename="app/dashboard/page.tsx"
              code={`// ✅ Server Component (default)
async function DashboardPage() {
  // Direct database access - stays on server
  const stats = await db.analytics.getStats();
  const users = await db.users.getRecent();

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Static content rendered on server */}
      <StatsDisplay stats={stats} />
      {/* Interactive chart is a Client Component */}
      <InteractiveChart data={stats.timeseries} />
      {/* Data table with sorting/filtering */}
      <UserTable users={users} />
    </div>
  );
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              2. Suspense & Streaming
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              One of RSC's most powerful features is progressive rendering.
              Instead of waiting for all data to load,you can stream content as
              it becomes available.
            </p>

            <CodeBlock
              language="tsx"
              filename="app/product/[id]/page.tsx"
              code={`import { Suspense } from 'react';

async function ProductPage({ params }) {
  // Fast data loads immediately
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />

      {/* Show product info immediately */}
      <ProductDetails product={product} />

      {/* Stream slow data with loading state */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={params.id} />
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations productId={params.id} />
      </Suspense>
    </div>
  );
}

// This component loads slowly but doesn't block the page
async function Reviews({ productId }) {
  // Slow API call - but page already rendered
  const reviews = await fetchReviews(productId);
  return <ReviewList reviews={reviews} />;
}`}
            />

            <InfoBox type="tip" title="Performance Tip" icon={Rocket}>
              Wrap slow data fetches in Suspense boundaries. The page shell
              renders immediately while heavy data streams in. This dramatically
              improves perceived performance and Core Web Vitals scores.
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              3. Data Colocation
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Fetch data close to where it's used. RSC enables component-level
              data fetching without prop drillingor complex state management.
            </p>

            <CodeBlock
              language="tsx"
              filename="components/BlogPost.tsx"
              code={`// Each component fetches its own data
async function BlogPost({ slug }) {
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* Child component fetches related data */}
      <RelatedPosts category={post.category} />
      <Comments postId={post.id} />
    </article>
  );
}

async function RelatedPosts({ category }) {
  const posts = await getPostsByCategory(category);
  return <PostList posts={posts} />;
}

async function Comments({ postId }) {
  const comments = await getComments(postId);
  return <CommentList comments={comments} />;
}`}
            />
          </div>
        </section>

        {/* Section 4: Common Pitfalls */}
        <section id="pitfalls" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Common Pitfalls to Avoid
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <div className="space-y-8">
              <InfoBox
                type="warning"
                title="Pitfall #1: Using Client-Only APIs in Server Components"
                icon={AlertTriangle}
              >
                <p className="mb-4">
                  Browser APIs like localStorage, window, or document don't
                  exist on the server. Attempting to use themwill cause runtime
                  errors.
                </p>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-red-500/20 mb-4">
                  <p className="text-red-400 font-mono text-sm mb-2">
                    ❌ Wrong:
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`// Server Component - ERROR!
function UserProfile() {
  const theme = localStorage.getItem('theme'); // ❌ No localStorage on server
  return <div className={theme}>...</div>;
}`}</code>
                  </pre>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-mono text-sm mb-2">
                    ✅ Correct:
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`// Client Component
'use client';
import { useState, useEffect } from 'react';

function UserProfile() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  return <div className={theme}>...</div>;
}`}</code>
                  </pre>
                </div>
              </InfoBox>

              <InfoBox
                type="warning"
                title="Pitfall #2: Leaking State and Hooks to Server Components"
                icon={AlertTriangle}
              >
                <p className="mb-4">
                  React hooks (useState, useEffect, useContext) only work in
                  Client Components. Trying to importthem in Server Components
                  breaks the boundary.
                </p>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-red-500/20 mb-4">
                  <p className="text-red-400 font-mono text-sm mb-2">
                    ❌ Wrong:
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`// Server Component - ERROR!
import { useState } from 'react';

function ProductList() {
  const [filter, setFilter] = useState('all'); // ❌ Hooks don't work here
  const products = await getProducts(); // Can't mix async/await with hooks
  return <div>...</div>;
}`}</code>
                  </pre>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-mono text-sm mb-2">
                    ✅ Correct:
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`// Server Component fetches data
async function ProductList() {
  const products = await getProducts();
  return <ProductListClient products={products} />;
}

// Client Component handles interactivity
'use client';
import { useState } from 'react';

function ProductListClient({ products }) {
  const [filter, setFilter] = useState('all');
  const filtered = products.filter(p => filter === 'all' || p.category === filter);
  return <div>...</div>;
}`}</code>
                  </pre>
                </div>
              </InfoBox>

              <InfoBox
                type="warning"
                title="Pitfall #3: Over-Fetching and Request Waterfalls"
                icon={AlertTriangle}
              >
                <p className="mb-4">
                  Without proper planning, you can create sequential data
                  fetches that slow down your app. Alwaysparallelize independent
                  requests.
                </p>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-red-500/20 mb-4">
                  <p className="text-red-400 font-mono text-sm mb-2">
                    ❌ Sequential (Slow):
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`async function Dashboard() {
  const user = await getUser();           // Wait 200ms
  const posts = await getPosts(user.id);  // Wait another 300ms
  const stats = await getStats(user.id);  // Wait another 150ms
  // Total: 650ms
  return <div>...</div>;
}`}</code>
                  </pre>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-mono text-sm mb-2">
                    ✅ Parallel (Fast):
                  </p>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{`async function Dashboard() {
  const user = await getUser(); // Wait 200ms

  // Fetch independent data in parallel
  const [posts, stats] = await Promise.all([
    getPosts(user.id),
    getStats(user.id)
  ]); // Wait 300ms (longest request)

  // Total: 500ms (150ms savings!)
  return <div>...</div>;
}`}</code>
                  </pre>
                </div>
              </InfoBox>

              <InfoBox
                type="warning"
                title="Pitfall #4: Forgetting to Mark Client Boundaries"
                icon={AlertTriangle}
              >
                <p className="mb-4">
                  If you forget 'use client', React will try to render your
                  component on the server, causing cryptic errors when you use
                  client-only features.
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Rule of thumb:</strong> Add
                  'use client' to any component that uses:
                </p>
                <ul className="mt-3 space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      React hooks (useState, useEffect, useContext, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Browser APIs (window, document, localStorage)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Event handlers (onClick, onChange, onSubmit)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-cyan-400 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Third-party libraries that depend on browser features
                    </span>
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Section 5: Production Patterns */}
        <section id="patterns" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Code2 size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Production-Ready Patterns
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-white mt-8 mb-6">
              Pattern 1: The Composition Pattern
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Build your page as a server component that composes smaller client
              components for interactive pieces. This keeps your main bundle
              small while enabling rich interactions where needed.
            </p>

            <CodeBlock
              language="tsx"
              filename="app/products/page.tsx"
              code={`// Server Component - Page shell
export default async function ProductsPage({ searchParams }) {
  // Server-side data fetching
  const products = await db.products.findMany({
    where: { category: searchParams.category },
    include: { reviews: true, inventory: true }
  });

  const categories = await db.categories.findMany();
  const featuredProducts = await db.products.featured();

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
        {/* Static breadcrumbs - server rendered */}
        <Breadcrumbs category={searchParams.category} />
      </header>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar with filters - Client Component for interactivity */}
        <aside className="col-span-1">
          <FilterSidebar
            categories={categories}
            currentCategory={searchParams.category}
          />
        </aside>

        <main className="col-span-3">
          {/* Featured banner - Server Component */}
          <FeaturedBanner products={featuredProducts} />

          {/* Product grid - Client Component for sorting/filtering */}
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}

// Client Component for interactive filters
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

function FilterSidebar({ categories, currentCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', categoryId);
    router.push(\`/products?\${params.toString()}\`);
  };

  return (
    <div className="space-y-4">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={currentCategory === cat.id ? 'active' : ''}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

// Client Component for interactive product grid
'use client';
import { useState } from 'react';

function ProductGrid({ products }) {
  const [sortBy, setSortBy] = useState('name');

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <div className="mb-4">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sorted.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              Pattern 2: Progressive Enhancement with Streaming
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Deliver the critical content immediately and stream in secondary
              content as it loads. This pattern is perfect for dashboards,
              analytics pages, and content-heavy applications.
            </p>

            <CodeBlock
              language="tsx"
              filename="app/dashboard/page.tsx"
              code={`import { Suspense } from 'react';

export default async function DashboardPage() {
  // Fast critical data - loads immediately
  const user = await getCurrentUser();
  const quickStats = await getQuickStats(user.id);

  return (
    <div className="dashboard">
      {/* Instant render - no waiting */}
      <DashboardHeader user={user} stats={quickStats} />

      {/* Stream heavy data independently */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart userId={user.id} />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <UserGrowthChart userId={user.id} />
        </Suspense>
      </div>

      {/* Low-priority content streams last */}
      <Suspense fallback={<TableSkeleton />}>
        <RecentTransactions userId={user.id} />
      </Suspense>

      <Suspense fallback={<div>Loading activity...</div>}>
        <ActivityFeed userId={user.id} />
      </Suspense>
    </div>
  );
}

// Slow data component - doesn't block page render
async function RevenueChart({ userId }) {
  // Simulate slow analytics query (2-3 seconds)
  const data = await analytics.getRevenue(userId, {
    startDate: '2025-01-01',
    aggregation: 'daily'
  });

  // Return Client Component with the data
  return <RevenueChartClient data={data} />;
}

// Loading skeleton for better UX
function ChartSkeleton() {
  return (
    <div className="h-64 bg-slate-800 rounded-lg animate-pulse" />
  );
}`}
            />

            <InfoBox type="tip" title="Best Practice" icon={Target}>
              Prioritize your Suspense boundaries strategically. Put critical,
              fast content outside Suspense boundaries to render immediately.
              Wrap slow or non-critical content in Suspense to avoid blocking
              the initial render.
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">
              Pattern 3: Smart Data Caching
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Leverage React's built-in caching and framework-specific cache
              layers to avoid duplicate requestsand improve performance across
              your application.
            </p>

            <CodeBlock
              language="tsx"
              filename="lib/data.ts"
              code={`import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// React cache - deduplicates requests within a single render
export const getUser = cache(async (userId: string) => {
  console.log('Fetching user:', userId); // Only logs once per render
  const user = await db.user.findUnique({ where: { id: userId } });
  return user;
});

// Next.js cache - persists across requests with revalidation
export const getProducts = unstable_cache(
  async (category?: string) => {
    const products = await db.products.findMany({
      where: category ? { category } : undefined,
      include: { images: true }
    });
    return products;
  },
  ['products'], // Cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['products'] // For on-demand revalidation
  }
);

// Usage across components - automatically deduplicated
async function UserProfile({ userId }) {
  const user = await getUser(userId); // First call
  return <div>{user.name}</div>;
}

async function UserSettings({ userId }) {
  const user = await getUser(userId); // Returns cached result
  return <div>{user.email}</div>;
}

async function UserActivity({ userId }) {
  const user = await getUser(userId); // Returns cached result
  const activity = await getActivity(userId);
  return <div>...</div>;
}`}
            />
          </div>
        </section>

        {/* Section 6: Performance */}
        <section id="performance" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Rocket size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Performance Optimization Checklist
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Here's your comprehensive performance optimization guide for RSC
              applications. Follow these practices to achieve Google's Core Web
              Vitals targets and deliver exceptional user experiences.
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-r from-green-900/20 to-emerald-900/10 border border-green-700/30">
                <h4 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <Check size={20} />
                  1. Minimize Client JavaScript
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span>
                      Keep Client Components small and focused on interactivity
                      only
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span>
                      Move heavy dependencies (date libraries, markdown parsers)
                      to Server Components
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span>
                      Use dynamic imports for rarely-used Client Components
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span>
                      Audit bundle size regularly with tools like
                      webpack-bundle-analyzer
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border border-blue-700/30">
                <h4 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <Check size={20} />
                  2. Optimize Streaming & Suspense
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-blue-400" />
                    </div>
                    <span>
                      Wrap slow database queries in Suspense boundaries
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-blue-400" />
                    </div>
                    <span>
                      Stream above-the-fold content first, defer below-the-fold
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-blue-400" />
                    </div>
                    <span>
                      Create granular loading states with skeleton UI components
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-blue-400" />
                    </div>
                    <span>Use nested Suspense for progressive enhancement</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/10 border border-purple-700/30">
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <Check size={20} />
                  3. Implement Smart Caching
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-purple-400" />
                    </div>
                    <span>
                      Use React's cache() for request-level memoization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-purple-400" />
                    </div>
                    <span>
                      Implement framework-level caching with revalidation
                      strategies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-purple-400" />
                    </div>
                    <span>
                      Use CDN edge caching for static and semi-static content
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-purple-400" />
                    </div>
                    <span>
                      Set appropriate cache headers and revalidation times
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-900/20 to-orange-900/10 border border-yellow-700/30">
                <h4 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  <Check size={20} />
                  4. Database & API Optimization
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-yellow-400" />
                    </div>
                    <span>
                      Parallelize independent data fetches with Promise.all()
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-yellow-400" />
                    </div>
                    <span>
                      Use database connection pooling and query optimization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-yellow-400" />
                    </div>
                    <span>Implement pagination and limit result sets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-yellow-400" />
                    </div>
                    <span>
                      Add database indexes on frequently queried columns
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-10 p-8 rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-700/40">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target size={28} className="text-cyan-400" />
                Core Web Vitals Targets
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-cyan-400 font-bold text-lg mb-2">
                    LCP (Largest Contentful Paint)
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    &lt; 2.5s
                  </div>
                  <p className="text-slate-300 text-sm">
                    Main content should render quickly with server-side data
                    fetching
                  </p>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-lg mb-2">
                    FID (First Input Delay)
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    &lt; 100ms
                  </div>
                  <p className="text-slate-300 text-sm">
                    Small client bundles ensure fast interactivity
                  </p>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-lg mb-2">
                    CLS (Cumulative Layout Shift)
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    &lt; 0.1
                  </div>
                  <p className="text-slate-300 text-sm">
                    Server-rendered content prevents layout shifts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: When Not to Use */}
        <section id="when-not" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              When Not to Use RSC
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              While RSC is powerful, it's not always the right solution.
              Understanding when to use traditional Client Components will help
              you build better applications.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-red-900/20 border border-red-700/30">
                <h4 className="text-xl font-bold text-red-300 mb-4">
                  Not Ideal For:
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-1">×</span>
                    <span>
                      Highly interactive real-time applications (collaboration
                      tools, games)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-1">×</span>
                    <span>Canvas-based editors or WebGL applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-1">×</span>
                    <span>
                      Apps requiring extensive client-side state management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-1">×</span>
                    <span>
                      Pure client-side SPAs without server infrastructure
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-green-900/20 border border-green-700/30">
                <h4 className="text-xl font-bold text-green-300 mb-4">
                  Perfect For:
                </h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-green-400 mt-1 flex-shrink-0"
                    />
                    <span>
                      Content-heavy sites (blogs, documentation, e-commerce)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-green-400 mt-1 flex-shrink-0"
                    />
                    <span>
                      Dashboards with real-time data from APIs/databases
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-green-400 mt-1 flex-shrink-0"
                    />
                    <span>
                      Marketing sites requiring fast initial page loads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={18}
                      className="text-green-400 mt-1 flex-shrink-0"
                    />
                    <span>
                      Applications with mix of static and dynamic content
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="Hybrid Approach" icon={Lightbulb}>
              The best applications often use RSC for the page shell and
              data-heavy sections, while leveraging Client Components for highly
              interactive widgets. This hybrid approach gives you the best of
              both worlds.
            </InfoBox>
          </div>
        </section>

        {/* Section 8: Conclusion */}
        <section id="conclusion" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Rocket size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Getting Started with RSC
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              React Server Components mark a paradigm shift in how we build
              React applications. By moving renderingand data fetching to the
              server, we can deliver faster, more efficient applications while
              maintaining the developer experience React is known for.
            </p>

            <div className="p-8 rounded-xl bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border border-cyan-700/40 my-10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Your RSC Adoption Roadmap
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">
                      Start Small
                    </h4>
                    <p className="text-slate-300">
                      Begin with a single page or feature. Convert a static page
                      to RSC and measure the performance improvements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">
                      Learn the Boundaries
                    </h4>
                    <p className="text-slate-300">
                      Master when to use Server vs Client Components. Practice
                      identifying the right boundaries in your existing code.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">
                      Implement Streaming
                    </h4>
                    <p className="text-slate-300">
                      Add Suspense boundaries to improve perceived performance.
                      Start with slow-loading sections like analytics or
                      recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">
                      Optimize Aggressively
                    </h4>
                    <p className="text-slate-300">
                      Measure your Core Web Vitals, implement caching
                      strategies, and continuously optimize your data fetching
                      patterns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300">
                    5
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">
                      Scale Gradually
                    </h4>
                    <p className="text-slate-300">
                      Once comfortable, expand RSC to more pages. Refactor
                      existing Client Components to use the composition pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10 p-8 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <BookOpen size={24} className="text-cyan-400" />
                Essential Resources
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <ArrowRight
                    size={20}
                    className="text-cyan-400 mt-1 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-white">React Documentation:</strong>{" "}
                    The official guide to Server Components with examples and
                    best practices
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight
                    size={20}
                    className="text-cyan-400 mt-1 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-white">Next.js App Router:</strong>{" "}
                    Production-ready framework with full RSC support and
                    streaming
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight
                    size={20}
                    className="text-cyan-400 mt-1 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-white">
                      Vercel's RSC Showcase:
                    </strong>{" "}
                    Real-world examples and performance benchmarks
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight
                    size={20}
                    className="text-cyan-400 mt-1 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-white">
                      Web.dev Core Web Vitals:
                    </strong>{" "}
                    Learn how to measure and optimize your app's performance
                  </div>
                </div>
              </div>
            </div>

            <div className="my-12 p-8 rounded-xl bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50">
              <h3 className="text-2xl font-bold text-white mb-4">
                Final Thoughts
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                React Server Components aren't just another React feature—they
                represent a fundamental rethinking ofhow we architect web
                applications. By embracing a server-first mindset and strategic
                use of client interactivity, you can build applications that are
                faster, more maintainable, and provide better user experiences.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                The future of React is server-first. Companies like Vercel,
                Shopify, and countless startups are already seeingdramatic
                improvements in load times and user engagement. Start
                experimenting with RSC today, and you'll be well-positioned to
                build the next generation of web applications.
              </p>
            </div>
          </div>
        </section>
        {/* Related Articles */}
        <section className="mt-16 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen size={28} className="text-cyan-400" />
            Related Articles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Mastering Next.js 14 App Router",
                excerpt:
                  "Deep dive into the new App Router and how it leverages RSC for better performance",
                tag: "Next.js",
              },
              {
                title: "Web Performance Optimization Guide",
                excerpt:
                  "Comprehensive strategies for achieving perfect Core Web Vitals scores",
                tag: "Performance",
              },
              {
                title: "React Hooks Deep Dive",
                excerpt:
                  "Advanced patterns and best practices for using React Hooks effectively",
                tag: "React",
              },
            ].map((article, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="text-cyan-400 text-sm font-semibold mb-3">
                  {article.tag}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h4>
                <p className="text-slate-400 text-sm mb-4">{article.excerpt}</p>
                <span className="text-cyan-400 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

// Attach image helpers
RSCGuide2025.FeaturedImage = RSCFeaturedImage;
RSCGuide2025.Image = RSCCardImage;
RSCGuide2025.CardImage = RSCCardImage;

// Enhanced post metadata
RSCGuide2025.info = {
  id: "react-server-components-2025",
  slug: "react-server-components-2025",
  title: "React Server Components (RSC) Complete Guide 2026: Architecture & Best Practices",
  excerpt:
    "Master React Server Components with this comprehensive 2026 guide. Learn RSC architecture, Suspense streaming, client vs server components, and Next.js App Router patterns for lightning-fast apps.",
  category: "React",
  author: "Dev Kant Kumar",
  readTime: "15 min read",
  image: "/images/blog/react-server-components.png",
  featuredImage: "/images/blog/react-server-components.png",
  featured: true,
  publishDate: "2025-11-18",
  modifiedDate: "2026-01-07",
  keywords: "react server components, rsc tutorial, react 19 server components, nextjs app router, suspense streaming, client vs server components, react server components vs client components, rsc architecture, react 2026, next.js 15",
  tags: [
    "react",
    "server-components",
    "suspense",
    "streaming",
    "nextjs",
    "performance",
    "frontend-architecture",
    "web-development",
    "core-web-vitals",
  ],
  faqs: [
    {
      question: "What are React Server Components?",
      answer: "React Server Components (RSC) are components that render entirely on the server and send only HTML to the client. They reduce JavaScript bundle size and allow direct database/API access without exposing secrets."
    },
    {
      question: "What is the difference between Server Components and Client Components?",
      answer: "Server Components render on the server with zero client JavaScript, can access databases directly, but cannot use hooks or browser APIs. Client Components render on the client with full React interactivity but increase bundle size."
    },
    {
      question: "Do I need Next.js to use React Server Components?",
      answer: "While you can use RSC without Next.js, Next.js App Router provides the best production-ready implementation of React Server Components with built-in streaming and caching."
    },
    {
      question: "How does Suspense work with Server Components?",
      answer: "Suspense enables streaming HTML for Server Components. Slow components can be wrapped in Suspense boundaries, allowing the rest of the page to render immediately while the slow content streams in later."
    }
  ]
};

export default RSCGuide2025;
