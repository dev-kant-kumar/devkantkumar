import { motion } from 'framer-motion';
import {
    ArrowRight,
    Code,
    FileJson,
    Hash,
    Lock,
    Palette,
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
        description="Collection of free online developer tools including JSON Formatter, Base64 Encoder, Password Generator, Color Palette Generator and more. Fast, secure, and no signup required."
        keywords="free developer tools, online tools, json formatter, base64 encoder, password generator, color palette, web tools"
      />

      {/* Structured Data for Software Collection */}
      <StructuredData type="website" />

      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium mb-6"
              >
                <Zap size={16} />
                100% Free • No Signup Required
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Free Developer{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Tools
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Powerful online tools to boost your productivity. Format JSON, generate passwords,
                create color palettes, and more — all in your browser.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                    }`}
                  >
                    <Icon size={18} />
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
                      className={`block h-full p-6 bg-slate-900/50 border ${tool.borderColor} rounded-2xl hover:bg-slate-900/80 hover:border-opacity-50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        {tool.popular && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium">
                            <TrendingUp size={12} />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      {/* Category Tag */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 ${tool.bgColor} ${tool.textColor} text-xs font-medium rounded-full border ${tool.borderColor}`}>
                          {tool.category}
                        </span>
                        <span className="flex items-center gap-1 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Use Tool <ArrowRight size={14} />
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
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Search size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">No tools found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-medium transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Need a Custom{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Tool?
                  </span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  I can build custom developer tools tailored to your specific needs.
                  Let's discuss your requirements!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Request a Tool
                  </Link>
                  <Link
                    to="/blog"
                    className="px-8 py-4 border border-slate-600 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Read Development Tips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tools;
