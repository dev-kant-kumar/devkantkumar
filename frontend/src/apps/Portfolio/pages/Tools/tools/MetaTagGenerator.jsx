import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Globe,
    ImageIcon,
    Layout,
    Search
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const MetaTagGenerator = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    robots: 'index, follow',
    ogImage: '',
    ogType: 'website',
  });
  const [copied, setCopied] = useState(false);

  // Generate HTML output
  const generateCode = () => {
    let code = `<!-- Primary Meta Tags -->
<title>${data.title || 'Page Title'}</title>
<meta name="title" content="${data.title || 'Page Title'}" />
<meta name="description" content="${data.description || 'Page description goes here'}" />
<meta name="keywords" content="${data.keywords}" />
<meta name="author" content="${data.author}" />
<meta name="robots" content="${data.robots}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${data.ogType}" />
<meta property="og:url" content="${data.url}" />
<meta property="og:title" content="${data.title || 'Page Title'}" />
<meta property="og:description" content="${data.description || 'Page description goes here'}" />
<meta property="og:image" content="${data.ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${data.url}" />
<meta property="twitter:title" content="${data.title || 'Page Title'}" />
<meta property="twitter:description" content="${data.description || 'Page description goes here'}" />
<meta property="twitter:image" content="${data.ogImage}" />`;

    return code.trim();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <SEOHead
        title="Meta Tag Generator - Free SEO Tool | Dev Kant Kumar"
        description="Generate accurate meta tags for better SEO and social media sharing. Create Title, Description, Open Graph, and Twitter Card tags. Preview how your site looks on Google and social media."
        keywords="meta tag generator, seo tool, open graph generator, twitter card generator, meta tags, seo optimizer"
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                <Search size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Meta Tag Generator</h1>
                <p className="text-slate-400 mt-1">Create SEO-friendly meta tags for your website</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">

                {/* Basic SEO */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe size={18} className="text-blue-400" /> Basic SEO
                  </h3>
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">Page Title</label>
                    <input
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      placeholder="e.g. My Awesome Website - Best Tools"
                      maxLength={60}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-between mt-1 text-xs">
                       <span className={data.title.length > 60 ? 'text-red-400' : 'text-slate-500'}>{data.title.length}/60 chars</span>
                       <span className="text-slate-500">Recommended: 50-60</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">Meta Description</label>
                    <textarea
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      placeholder="e.g. A collection of free tools for developers..."
                      maxLength={160}
                      rows={3}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white resize-none focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-between mt-1 text-xs">
                       <span className={data.description.length > 160 ? 'text-red-400' : 'text-slate-500'}>{data.description.length}/160 chars</span>
                       <span className="text-slate-500">Recommended: 150-160</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">Keywords (Comma separated)</label>
                    <input
                      name="keywords"
                      value={data.keywords}
                      onChange={handleChange}
                      placeholder="e.g. tools, developer, free, seo"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ImageIcon size={18} className="text-pink-400" /> Social Media (Open Graph)
                  </h3>
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">Page URL</label>
                    <input
                      name="url"
                      value={data.url}
                      onChange={handleChange}
                      placeholder="https://example.com/page"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">Image URL</label>
                    <input
                      name="ogImage"
                      value={data.ogImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preview & Code */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">

              {/* Google Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden">
                <h3 className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                   <Globe size={14} /> Google Search Preview
                </h3>
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-500 border border-slate-200">
                      {data.title ? data.title[0] : 'G'}
                    </div>
                    <div>
                      <div className="text-sm text-slate-800 leading-none mb-0.5 max-w-[200px] truncate">{data.title || 'Site Name'}</div>
                      <div className="text-xs text-slate-500 leading-none max-w-[200px] truncate">{data.url || 'https://example.com'}</div>
                    </div>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate font-medium">
                    {data.title || 'Page Title'}
                  </h3>
                  <p className="text-sm text-[#4d5156] line-clamp-2">
                    {data.description || 'This is how your page description will look in Google search results. Make it catchy and relevant to improve click-through rates.'}
                  </p>
                </div>
              </div>

              {/* Facebook/OG Preview */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <div className="p-4 bg-white border-b border-slate-200">
                  <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Layout size={14} /> Social Share Preview
                  </h3>
                </div>
                <div className="bg-white max-w-md mx-auto my-6 border border-slate-300 rounded-lg overflow-hidden shadow-sm">
                   {data.ogImage ? (
                     <img src={data.ogImage} alt="Preview" className="w-full h-48 object-cover bg-slate-100" onError={(e) => e.target.src='https://via.placeholder.com/600x315?text=Preview+Image'} />
                   ) : (
                     <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                       <ImageIcon size={32} />
                     </div>
                   )}
                   <div className="p-3 bg-[#f0f2f5] border-t border-slate-200/50">
                     <div className="uppercase text-xs text-slate-500 mb-1 truncate">{new URL(data.url || 'https://example.com').hostname}</div>
                     <h4 className="font-bold text-slate-800 leading-tight mb-1 line-clamp-2">{data.title || 'Page Title'}</h4>
                     <p className="text-sm text-slate-600 line-clamp-1">{data.description || 'Page description...'}</p>
                   </div>
                </div>
              </div>

              {/* Code Output */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <span className="text-white font-medium">Meta Tag Code</span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy HTML'}
                  </button>
                </div>
                <pre className="p-4 text-sm text-cyan-300 font-mono whitespace-pre-wrap break-all overflow-x-auto">
                  {generateCode()}
                </pre>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaTagGenerator;
