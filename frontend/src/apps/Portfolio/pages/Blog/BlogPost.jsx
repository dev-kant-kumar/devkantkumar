import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useGetBlogPostBySlugQuery } from '../../store/api/baseApi';

const BlogPost = () => {
  const { slug } = useParams();
  const { data: blogResponse, isLoading, error } = useGetBlogPostBySlugQuery(slug);
  const blogPost = blogResponse?.data;

  // Mock blog post data for demonstration
  const mockPost = {
    id: 1,
    title: "Getting Started with React Hooks",
    slug: "getting-started-with-react-hooks",
    content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks revolutionized the way we write React components by allowing us to use state and other React features in functional components. In this comprehensive guide, we'll explore the most commonly used hooks and how to implement them effectively.</p>

      <h3>What are React Hooks?</h3>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have since become the preferred way to write React components.</p>

      <h3>useState Hook</h3>
      <p>The useState hook is the most fundamental hook that allows you to add state to functional components:</p>

      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>

      <h3>useEffect Hook</h3>
      <p>The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined:</p>

      <pre><code>import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Always use hooks at the top level of your React function</li>
        <li>Don't call hooks inside loops, conditions, or nested functions</li>
        <li>Use the ESLint plugin for React Hooks to enforce these rules</li>
        <li>Create custom hooks to share stateful logic between components</li>
      </ul>

      <h3>Conclusion</h3>
      <p>React Hooks provide a more direct API to the React concepts you already know. They offer a powerful way to compose components and share logic between them. Start incorporating hooks into your React applications today!</p>
    `,
    category: "React",
    readTime: "5 min read",
    publishedAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    author: "Dev Kant Kumar",
    tags: ["React", "JavaScript", "Frontend", "Hooks", "Tutorial"]
  };

  const post = blogPost || mockPost;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-slate-300 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative py-20 lg:py-32 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/30">
                {post.category}
              </span>
              <span className="text-slate-400 text-sm">
                {post.readTime} • {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                DK
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-slate-400 text-sm">Full Stack Developer</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-slate-400 text-sm">Share:</span>
              <button className="p-2 bg-slate-800/50 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="p-2 bg-slate-800/50 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="p-2 bg-slate-800/50 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Image */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-8"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* Article Content */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex gap-12">
            {/* Main Content */}
            <motion.article variants={itemVariants} className="lg:w-3/4">
              <div
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-strong:text-white prose-strong:font-semibold
                  prose-code:text-cyan-300 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg
                  prose-ul:text-slate-300 prose-li:mb-2
                  prose-blockquote:border-l-cyan-400 prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && (
                <div className="mt-12 pt-8 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300 text-sm hover:border-cyan-400/50 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* Sidebar */}
            <motion.aside variants={itemVariants} className="lg:w-1/4 mt-12 lg:mt-0">
              <div className="sticky top-8 space-y-8">
                {/* Table of Contents */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold mb-4">Table of Contents</h4>
                  <nav className="space-y-2">
                    <a href="#introduction" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      Introduction to React Hooks
                    </a>
                    <a href="#what-are-hooks" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      What are React Hooks?
                    </a>
                    <a href="#usestate" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      useState Hook
                    </a>
                    <a href="#useeffect" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      useEffect Hook
                    </a>
                    <a href="#best-practices" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      Best Practices
                    </a>
                    <a href="#conclusion" className="block text-slate-300 hover:text-cyan-300 transition-colors text-sm">
                      Conclusion
                    </a>
                  </nav>
                </div>

                {/* Author Info */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold mb-4">About the Author</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      DK
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.author}</p>
                      <p className="text-slate-400 text-sm">Full Stack Developer</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Passionate about creating modern web applications and sharing knowledge with the developer community.
                  </p>
                  <Link
                    to="/about"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.section>

      {/* Related Posts */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-t border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Related Articles</h2>
            <p className="text-slate-300">Continue reading with these related posts</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogPost;
