import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';
import StructuredData from '../../../../../components/SEO/StructuredData';

const ToolLayout = ({
  title,
  description,
  icon: Icon,
  seoTitle,
  seoDescription,
  seoKeywords,
  slug,
  category = 'DeveloperApplication',
  features = [],
  faqs = [],
  children
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <>
      {/* SEO & Structured Data */}
      <SEOHead
        title={seoTitle || `${title} - Free Online Tool | Dev Kant Kumar`}
        description={seoDescription || `${description} Simple, secure, and fast developer utility.`}
        keywords={seoKeywords || `${title.toLowerCase()}, online tool, free developer tools, web tools`}
      />
      
      {/* Software Schema */}
      <StructuredData
        type="software"
        pageData={{
          name: title,
          description: description,
          category: category,
          keywords: seoKeywords ? seoKeywords.split(', ') : [title],
          slug: slug
        }}
      />

      {/* FAQ Schema */}
      {faqs && faqs.length > 0 && (
        <StructuredData
          type="faq"
          pageData={{ faqs }}
        />
      )}

      {/* Breadcrumbs Schema */}
      <StructuredData
        type="breadcrumbs"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: title, path: `/tools/${slug}` }
          ]
        }}
      />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden pb-24">
        {/* Background Cyber Grid & Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32">
          {/* Breadcrumbs Navigation */}
          <nav className="mb-10">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group text-sm font-semibold">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
          </nav>

          {/* Interactive Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center max-w-3xl mx-auto space-y-4"
          >
            {Icon && (
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/30 shadow-lg relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
                <Icon size={36} className="text-cyan-400 relative z-10 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight pt-2">
              {title}
            </h1>
            
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Tool Workspace Container */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16 relative z-20"
          >
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-cyan-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.02),transparent_50%)] pointer-events-none" />
              {children}
            </div>
          </motion.section>

          {/* Features Section */}
          {features && features.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="py-16 border-t border-slate-900/60"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <Sparkles size={12} className="text-cyan-400" />
                  Key Features
                </span>
                <h2 className="text-3xl font-black text-white">Powerful Capabilities</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                  Everything you need to work efficiently, fast, and securely right in your browser.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => {
                  const FeatIcon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.25)' }}
                      className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 backdrop-blur-md hover:bg-slate-900/20 hover:shadow-xl transition-all duration-300 flex flex-col items-start text-left gap-4"
                    >
                      {FeatIcon && (
                        <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400">
                          <FeatIcon size={20} />
                        </div>
                      )}
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 tracking-wide">{feature.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* FAQs Section */}
          {faqs && faqs.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="py-16 border-t border-slate-900/60"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                  FAQ
                </span>
                <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                  Have questions about this tool? Find quick answers below.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-350 hover:border-slate-700"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      >
                        <span className="text-white font-semibold text-sm sm:text-base leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-cyan-400' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-1 text-slate-300 text-sm border-t border-slate-800/60 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolLayout;
