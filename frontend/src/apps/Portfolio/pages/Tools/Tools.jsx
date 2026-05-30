import { motion } from 'framer-motion';
import {
    ArrowRight,
    Code,
    Eye,
    FileJson,
    Hash,
    Lock,
    Palette,
    QrCode,
    Search,
    Sparkles,
    Star,
    TrendingUp,
    Type,
    Zap
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';

// Tool definitions with SEO-optimized data
const tools = [
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortName: 'JSON Formatter',
    description: 'Format, beautify, minify, and validate JSON data online. Free JSON formatter with syntax highlighting and error detection.',
    icon: FileJson,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    category: 'Developer',
    popular: true,
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier']
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    shortName: 'Base64 Tool',
    description: 'Encode and decode Base64 strings online. Convert text, files, and URLs to Base64 format instantly.',
    icon: Hash,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    category: 'Developer',
    popular: true,
    keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'encode base64']
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Strong Password Generator',
    shortName: 'Password Generator',
    description: 'Generate secure random passwords with customizable length and character types. Create unbreakable passwords instantly.',
    icon: Lock,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    category: 'Security',
    popular: true,
    keywords: ['password generator', 'random password', 'secure password', 'strong password']
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    shortName: 'Lorem Ipsum',
    description: 'Generate placeholder text for your designs and mockups. Create paragraphs, sentences, or words of Lorem Ipsum.',
    icon: Type,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    category: 'Text',
    popular: false,
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text', 'sample text']
  },
  {
    id: 'color-palette-generator',
    slug: 'color-palette-generator',
    name: 'Color Palette Generator',
    shortName: 'Color Palette',
    description: 'Generate beautiful color palettes for your designs. Export as CSS, SCSS, or Tailwind. Create harmonious color schemes.',
    icon: Palette,
    color: 'from-rose-500 to-violet-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    category: 'Design',
    popular: true,
    keywords: ['color palette generator', 'color scheme', 'color picker', 'palette generator']
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortName: 'QR Creator',
    description: 'Create custom QR codes for URLs, text, and more. Customize colors and download high-quality PNGs instantly.',
    icon: QrCode,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    category: 'Design',
    popular: true,
    keywords: ['qr code generator', 'qr creator', 'qrcode maker', 'free qr code']
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    shortName: 'UUID Generator',
    description: 'Generate bulk UUIDs (Version 1 & 4) instantly. Customizable format with uppercase/hyphen support.',
    icon: Hash,
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    category: 'Developer',
    popular: true,
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'unique identifier']
  },
  {
    id: 'css-gradient-generator',
    slug: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    shortName: 'Gradient Maker',
    description: 'Create beautiful linear and radial CSS gradients visually. Randomize colors and copy CSS code instantly.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
    category: 'Design',
    popular: true,
    keywords: ['css gradient', 'gradient generator', 'css background', 'color gradient']
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortName: 'SEO Tags',
    description: 'Generate SEO-friendly meta tags, Open Graph, and Twitter Cards. Preview how your site looks on social media.',
    icon: Search,
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/30',
    textColor: 'text-blue-400',
    category: 'Developer',
    popular: true,
    keywords: ['meta tags', 'seo generator', 'open graph', 'twitter cards']
  },
  {
    id: 'markdown-previewer',
    slug: 'markdown-previewer',
    name: 'Markdown Previewer',
    shortName: 'MD Editor',
    description: 'Write and preview Markdown in real-time. Features split-screen editing and easy syntax tools.',
    icon: Code,
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    textColor: 'text-slate-400',
    category: 'Text',
    popular: false,
    keywords: ['markdown editor', 'markdown preview', 'readme generator', 'md viewer']
  },
  {
    id: 'og-preview',
    slug: 'og-preview',
    name: 'OG / Social Preview Tool',
    shortName: 'OG Preview',
    description: 'Preview how your links appear on Facebook, Twitter, LinkedIn, and Discord. Validate Open Graph meta tags.',
    icon: Eye,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    category: 'Developer',
    popular: true,
    keywords: ['og preview', 'open graph', 'social share preview', 'twitter card', 'meta tags validator']
  },
  {
    id: 'typing-speed-test',
    slug: 'typing-speed-test',
    name: 'Typing Speed Test',
    shortName: 'Typing Test',
    description: 'Test your typing speed with code snippets and standard text. Real-time WPM, accuracy tracking, and developer modes.',
    icon: Type,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    category: 'Developer',
    popular: true,
    keywords: ['typing test', 'wpm test', 'typing speed', 'developer typing', 'code typing']
  }
];

const categories = [
  { id: 'all', name: 'All Tools', icon: Sparkles },
  { id: 'Developer', name: 'Developer', icon: Code },
  { id: 'Security', name: 'Security', icon: Lock },
  { id: 'Text', name: 'Text', icon: Type },
  { id: 'Design', name: 'Design', icon: Palette }
];

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = searchTerm === '' ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <SEOHead
        title="Free Online Developer Tools | Dev Kant Kumar"
        description="Free online developer tools: JSON Formatter, Base64 Encoder, Password Generator, and more. Fast, secure, and no signup required."
        keywords="free developer tools, online tools, json formatter, base64 encoder, password generator, color palette, web tools"
      />

      {/* Structured Data for Software Collection */}
      <StructuredData type="website" />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            {/* Subtle Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-6"
              >
                <Zap size={14} className="text-cyan-400 animate-pulse" />
                100% Free • No Signup Required // TOOLS
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                Free Developer{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Tools
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                Powerful online tools to boost your productivity. Format JSON, generate passwords,
                create color palettes, and more — all in your browser.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-cyan-400 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900/80 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-500/40"
                  />
                </div>
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all border ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900/80 hover:text-white border-slate-800/80 hover:border-slate-700/50'
                    }`}
                  >
                    <Icon size={16} />
                    {cat.name}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats Row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-slate-400">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Star size={14} className="text-amber-400" />
                <span>Popular tools marked</span>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="block h-full p-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl hover:bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:-translate-y-1 backdrop-blur-xl"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        {tool.popular && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider text-[10px]">
                            <TrendingUp size={10} className="text-amber-400" />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Category Tag */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 ${tool.bgColor} ${tool.textColor} text-[10px] font-mono font-bold rounded border ${tool.borderColor} uppercase`}>
                          {tool.category}
                        </span>
                        <span className="flex items-center gap-1 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          Use Tool <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* No Results */}
            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 max-w-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Search size={24} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Tools Found</h3>
                <p className="text-slate-400 mb-6 text-sm">Try adjusting your search or category filters</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all text-xs tracking-wider uppercase"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Section: Call to Action (CTA) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-slate-950 border-t border-slate-900/60 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
            <motion.div 
              variants={itemVariants}
              className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-10 sm:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center space-y-8"
              whileHover={{ borderColor: "rgba(6, 182, 212, 0.25)" }}
            >

              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  CUSTOM BUILD // TOOLS
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                  Need a custom <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">developer tool?</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                  I can build secure, high-performance offline-first web utilities tailored to your exact needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all text-center tracking-wider uppercase text-xs sm:text-sm cursor-pointer"
                >
                  REQUEST A TOOL
                </Link>
                <Link
                  to="/blog"
                  className="px-8 py-4 border border-slate-800 bg-slate-900/60 text-slate-300 font-bold rounded-xl hover:border-slate-600 hover:text-white transition-all text-center tracking-wider uppercase text-xs sm:text-sm backdrop-blur-xl cursor-pointer"
                >
                  DEVELOPMENT TIPS
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Tools;
