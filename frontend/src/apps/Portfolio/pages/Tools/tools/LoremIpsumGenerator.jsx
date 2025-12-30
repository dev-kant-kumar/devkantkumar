import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    RefreshCw,
    Type
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';
import StructuredData from '../../../../../components/SEO/StructuredData';

// Lorem Ipsum word bank
const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt'
];

const LoremIpsumGenerator = () => {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = (minWords = 8, maxWords = 15) => {
    const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = Array.from({ length }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = (minSentences = 4, maxSentences = 8) => {
    const length = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    return Array.from({ length }, () => generateSentence()).join(' ');
  };

  const generate = useCallback(() => {
    let result = '';

    if (type === 'paragraphs') {
      const paragraphs = Array.from({ length: count }, () => generateParagraph());
      if (startWithLorem && paragraphs.length > 0) {
        paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          paragraphs[0].split('. ').slice(1).join('. ');
      }
      result = paragraphs.join('\n\n');
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, () => generateSentence());
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      }
      result = sentences.join(' ');
    } else {
      const words = Array.from({ length: count }, generateWord);
      if (startWithLorem && words.length >= 2) {
        words[0] = 'lorem';
        words[1] = 'ipsum';
      }
      result = words.join(' ');
    }

    setOutput(result);
  }, [count, type, startWithLorem]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  // Generate on mount
  React.useEffect(() => {
    generate();
  }, []);

  const getWordCount = () => {
    return output ? output.split(/\s+/).filter(w => w.length > 0).length : 0;
  };

  return (
    <>
      <SEOHead
        title="Lorem Ipsum Generator - Free Placeholder Text Tool | Dev Kant Kumar"
        description="Generate Lorem Ipsum placeholder text for your designs and mockups. Create paragraphs, sentences, or words instantly. Free online dummy text generator."
        keywords="lorem ipsum generator, placeholder text, dummy text, sample text, filler text, lorem ipsum online"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'Lorem Ipsum Generator',
          description: 'Generate placeholder text for paragraphs, sentences, or words.',
          category: 'DesignTool',
          keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text', 'sample text'],
          slug: 'lorem-ipsum-generator'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg mb-4">
              <Type size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Lorem Ipsum Generator</h1>
            <p className="text-slate-400 mt-2">Generate placeholder text for your designs</p>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {/* Type Selection */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Generate</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                  </select>
                </div>

                {/* Count */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Amount</label>
                  <input
                    type="number"
                    min="1"
                    max={type === 'words' ? 1000 : type === 'sentences' ? 100 : 50}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Start with Lorem */}
                <div className="flex items-end">
                  <label className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-slate-300 text-sm">Start with "Lorem ipsum"</span>
                  </label>
                </div>
              </div>

              <button
                onClick={generate}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <RefreshCw size={20} />
                Generate Lorem Ipsum
              </button>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Generated Text</span>
                  <span className="text-slate-500 text-sm">{getWordCount()} words</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors disabled:opacity-50"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-6 max-h-[400px] overflow-y-auto">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{output || 'Click generate to create placeholder text...'}</p>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is Lorem Ipsum?</h2>
            <p className="text-slate-400 leading-relaxed">
              Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s.
              It's used as placeholder text to demonstrate visual form of a document without meaningful content.
              Designers use it to focus on layout and typography rather than content.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoremIpsumGenerator;
