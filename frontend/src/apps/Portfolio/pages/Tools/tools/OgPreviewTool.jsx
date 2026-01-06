import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    Check,
    CheckCircle,
    Edit3,
    Eye,
    Globe,
    ImageIcon,
    Link2,
    Loader2,
    Search,
    Share2,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';
import StructuredData from '../../../../../components/SEO/StructuredData';

const OgPreviewTool = () => {
  // Mode: 'url' for fetch mode, 'manual' for manual input
  const [mode, setMode] = useState('url');
  const [fetchUrl, setFetchUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [data, setData] = useState({
    title: '',
    description: '',
    ogImage: '',
    url: '',
    siteName: '',
    twitterHandle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch OG tags from URL using a CORS proxy
  const fetchOgTags = async () => {
    if (!fetchUrl.trim() || !fetchUrl.startsWith('http')) {
      setFetchError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsLoading(true);
    setFetchError('');

    try {
      // Using allorigins.win as CORS proxy
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fetchUrl)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch the URL');
      }

      const result = await response.json();
      const html = result.contents;

      // Parse HTML to extract OG tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract meta tags
      const getMetaContent = (property) => {
        const meta = doc.querySelector(`meta[property="${property}"]`) ||
                     doc.querySelector(`meta[name="${property}"]`);
        return meta?.getAttribute('content') || '';
      };

      const ogTitle = getMetaContent('og:title') || doc.querySelector('title')?.textContent || '';
      const ogDescription = getMetaContent('og:description') || getMetaContent('description') || '';
      const ogImage = getMetaContent('og:image') || '';
      const ogUrl = getMetaContent('og:url') || fetchUrl;
      const ogSiteName = getMetaContent('og:site_name') || '';
      const twitterHandle = getMetaContent('twitter:site') || getMetaContent('twitter:creator') || '';

      setData({
        title: ogTitle,
        description: ogDescription,
        ogImage: ogImage,
        url: ogUrl,
        siteName: ogSiteName,
        twitterHandle: twitterHandle,
      });

      setFetchError('');
    } catch (error) {
      console.error('Fetch error:', error);
      setFetchError('Failed to fetch OG tags. The website may be blocking requests or the URL is invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key in URL input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchOgTags();
    }
  };

  // Extract domain from URL
  const getDomain = (url) => {
    try {
      return new URL(url || 'https://example.com').hostname.replace('www.', '');
    } catch {
      return 'example.com';
    }
  };

  // Validation checks
  const validations = [
    {
      label: 'OG Title',
      valid: data.title.length >= 10 && data.title.length <= 60,
      warning: data.title.length > 60,
      message: data.title.length === 0 ? 'Missing' : data.title.length < 10 ? 'Too short' : data.title.length > 60 ? 'Too long' : 'Good'
    },
    {
      label: 'OG Description',
      valid: data.description.length >= 50 && data.description.length <= 160,
      warning: data.description.length > 160,
      message: data.description.length === 0 ? 'Missing' : data.description.length < 50 ? 'Too short' : data.description.length > 160 ? 'Too long' : 'Good'
    },
    {
      label: 'OG Image',
      valid: data.ogImage.length > 0 && data.ogImage.startsWith('http'),
      warning: false,
      message: data.ogImage.length === 0 ? 'Missing' : !data.ogImage.startsWith('http') ? 'Invalid URL' : 'Good'
    },
    {
      label: 'Page URL',
      valid: data.url.length > 0 && data.url.startsWith('http'),
      warning: false,
      message: data.url.length === 0 ? 'Missing' : !data.url.startsWith('http') ? 'Invalid URL' : 'Good'
    },
  ];

  const allValid = validations.every(v => v.valid);
  const validCount = validations.filter(v => v.valid).length;

  return (
    <>
      <SEOHead
        title="OG / Social Preview Tool - Free Meta Tag Validator | Dev Kant Kumar"
        description="Preview how your links appear on Facebook, Twitter, LinkedIn, and Discord. Validate Open Graph meta tags and optimize your social sharing."
        keywords="og preview, open graph preview, social media preview, twitter card preview, linkedin share preview, meta tag validator"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'OG / Social Preview Tool',
          description: 'Preview how your links will appear when shared on Facebook, Twitter, LinkedIn, and Discord.',
          category: 'DeveloperApplication',
          keywords: ['og preview', 'open graph', 'social share preview', 'twitter card'],
          slug: 'og-preview'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                  <Eye size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">OG / Social Preview</h1>
                  <p className="text-slate-400 mt-1">Preview how your links appear on social media</p>
                </div>
              </div>

              {/* Mode Toggle Switch */}
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setMode('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'url'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Link2 size={16} />
                  Fetch from URL
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'manual'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Edit3 size={16} />
                  Manual Input
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Form - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">

                {/* URL Fetch Mode */}
                {mode === 'url' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                        <Search size={18} className="text-orange-400" /> Analyze URL
                      </h3>
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="url"
                            value={fetchUrl}
                            onChange={(e) => setFetchUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="https://example.com/page"
                            className="w-full p-4 pr-12 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                          />
                          <Globe size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>
                        <button
                          onClick={fetchOgTags}
                          disabled={isLoading || !fetchUrl.trim()}
                          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Fetching...
                            </>
                          ) : (
                            <>
                              <Search size={18} />
                              Fetch OG Tags
                            </>
                          )}
                        </button>
                        {fetchError && (
                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            {fetchError}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Extracted Data Display */}
                    {data.title && (
                      <div className="border-t border-slate-800 pt-4 space-y-3">
                        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-400" />
                          Extracted OG Tags
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-500 text-xs block mb-1">og:title</span>
                            <span className="text-white">{data.title || '—'}</span>
                          </div>
                          <div className="p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-500 text-xs block mb-1">og:description</span>
                            <span className="text-white text-sm">{data.description || '—'}</span>
                          </div>
                          <div className="p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-500 text-xs block mb-1">og:image</span>
                            <span className="text-cyan-400 text-sm break-all">{data.ogImage || '—'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Manual Input Mode */}
                {mode === 'manual' && (
                  <>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Share2 size={18} className="text-orange-400" /> Meta Tag Data
                    </h3>

                    {/* Title */}
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">OG Title</label>
                      <input
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        placeholder="e.g. Complete yt-dlp Guide 2026"
                        maxLength={70}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className={data.title.length > 60 ? 'text-red-400' : 'text-slate-500'}>{data.title.length}/60 chars</span>
                        <span className="text-slate-500">Recommended: 50-60</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">OG Description</label>
                      <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="e.g. The most comprehensive guide to downloading videos..."
                        maxLength={200}
                        rows={3}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white resize-none focus:outline-none focus:border-orange-500 transition-colors"
                      />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className={data.description.length > 160 ? 'text-red-400' : 'text-slate-500'}>{data.description.length}/160 chars</span>
                        <span className="text-slate-500">Recommended: 150-160</span>
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">OG Image URL</label>
                      <input
                        name="ogImage"
                        value={data.ogImage}
                        onChange={handleChange}
                        placeholder="https://example.com/og-image.png"
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                      <p className="text-xs text-slate-500 mt-1">Recommended: 1200×630 pixels</p>
                    </div>

                    {/* Page URL */}
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Page URL</label>
                      <input
                        name="url"
                        value={data.url}
                        onChange={handleChange}
                        placeholder="https://yourdomain.com/page"
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Site Name */}
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Site Name (Optional)</label>
                      <input
                        name="siteName"
                        value={data.siteName}
                        onChange={handleChange}
                        placeholder="e.g. Dev Kant Kumar"
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Validation Panel - Always visible */}
                <div className="border-t border-slate-800 pt-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {allValid ? <CheckCircle size={16} className="text-green-400" /> : <AlertCircle size={16} className="text-yellow-400" />}
                      Validation
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${allValid ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {validCount}/{validations.length} passed
                    </span>
                  </h4>
                  <div className="space-y-2">
                    {validations.map((v, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{v.label}</span>
                        <span className={`flex items-center gap-1 ${v.valid ? 'text-green-400' : v.warning ? 'text-yellow-400' : 'text-red-400'}`}>
                          {v.valid ? <Check size={14} /> : <X size={14} />}
                          {v.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preview Cards - 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Facebook Preview */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="text-white font-medium">Facebook / Meta</span>
                </div>
                <div className="p-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg border border-slate-200">
                    {data.ogImage ? (
                      <img
                        src={data.ogImage}
                        alt="Preview"
                        className="w-full h-52 object-cover bg-slate-100"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div className="w-full h-52 bg-slate-200 flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-400" />
                      </div>
                    )}
                    <div className="p-3 bg-[#f0f2f5] border-t border-slate-200">
                      <div className="uppercase text-xs text-slate-500 mb-1 truncate">{getDomain(data.url)}</div>
                      <h4 className="font-bold text-slate-800 leading-tight mb-1 line-clamp-2">
                        {data.title || 'Page Title'}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {data.description || 'Your page description will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter/X Preview */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <X size={14} className="text-white" />
                  </div>
                  <span className="text-white font-medium">Twitter / X</span>
                </div>
                <div className="p-6">
                  <div className="bg-black rounded-2xl overflow-hidden max-w-lg border border-slate-700">
                    {data.ogImage ? (
                      <img
                        src={data.ogImage}
                        alt="Preview"
                        className="w-full h-52 object-cover bg-slate-900"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div className="w-full h-52 bg-slate-800 flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-600" />
                      </div>
                    )}
                    <div className="p-3 border-t border-slate-800">
                      <h4 className="font-medium text-white leading-tight mb-1 truncate">
                        {data.title || 'Page Title'}
                      </h4>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-1">
                        {data.description || 'Your page description will appear here...'}
                      </p>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <Globe size={12} />
                        <span>{getDomain(data.url)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LinkedIn Preview */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#0A66C2] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <span className="text-white font-medium">LinkedIn</span>
                </div>
                <div className="p-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg border border-slate-300">
                    {data.ogImage ? (
                      <img
                        src={data.ogImage}
                        alt="Preview"
                        className="w-full h-48 object-cover bg-slate-100"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-400" />
                      </div>
                    )}
                    <div className="p-4 bg-[#f3f2ef]">
                      <h4 className="font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">
                        {data.title || 'Page Title'}
                      </h4>
                      <p className="text-xs text-slate-500">{getDomain(data.url)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discord Preview */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#5865F2] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium">Discord</span>
                </div>
                <div className="p-6 bg-[#313338]">
                  <div className="flex gap-4 max-w-lg">
                    <div className="w-1 rounded-full bg-[#5865F2] shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      {data.siteName && (
                        <div className="text-xs text-[#00AFF4] font-medium mb-1">{data.siteName}</div>
                      )}
                      <h4 className="font-semibold text-[#00AFF4] hover:underline cursor-pointer leading-tight mb-1 line-clamp-2">
                        {data.title || 'Page Title'}
                      </h4>
                      <p className="text-sm text-[#dbdee1] line-clamp-3 mb-3">
                        {data.description || 'Your page description will appear here...'}
                      </p>
                      {data.ogImage && (
                        <img
                          src={data.ogImage}
                          alt="Preview"
                          className="w-full max-w-md h-48 object-cover rounded bg-slate-700"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-orange-400" /> OG Image Best Practices
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span><strong>Dimensions:</strong> 1200×630 pixels (1.91:1 ratio) for Facebook/LinkedIn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span><strong>File size:</strong> Keep under 5MB for faster loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span><strong>Format:</strong> PNG or JPG with clear, high-contrast text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span><strong>Safe zone:</strong> Keep important content in the center 80%</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OgPreviewTool;
