import 'highlight.js/styles/github-dark.css'; // We'll assume a style is available or just rely on basic highlighting
import {
    ArrowLeft,
    Bold,
    Check,
    Code,
    Copy,
    Edit3,
    Eye,
    FileText,
    Heading,
    Italic,
    Link as LinkIcon,
    List
} from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const initialMarkdown = `# Welcome to Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function helloWorld(name) {
  console.log("Hello, " + name);
}

helloWorld("Developer");
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**

There's also [loops](https://www.freecodecamp.org), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
`;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [activeTab, setActiveTab] = useState('both'); // 'write', 'preview', 'both'
  const [copied, setCopied] = useState(false);

  const insertText = (before, after = '') => {
    const textarea = document.getElementById('markdown-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    // Reset selection/focus (simplified)
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const copyHtml = async () => {
    try {
      // Very basic HTML conversion for copy purposes (ReactMarkdown renders usually directly to DOM)
      // For a perfect copy-html feature we'd need a markdown-to-html converter string function
      // But we can just copy the markdown for now as "Copy MD" or try to render static html
      // Let's copy Markdown for now as it's a Markdown tool
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  return (
    <>
      <SEOHead
        title="Markdown Previewer & Editor - Free Online Tool | Dev Kant Kumar"
        description="Write and preview Markdown in real-time. Features syntax highlighting, split-screen view, and easy export. Free online Markdown editor for developers and writers."
        keywords="markdown previewer, markdown editor, online markdown editor, readme generator, markdown to html"
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
          <nav className="mb-6 flex items-center justify-between">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <div className="flex gap-2">
               <button
                 onClick={() => copyHtml()}
                 className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm transition-all"
               >
                 {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                 {copied ? 'Copied' : 'Copy Markdown'}
               </button>
            </div>
          </nav>

          <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
               <div className="flex items-center gap-1">
                 <button onClick={() => insertText('**', '**')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Bold">
                   <Bold size={18} />
                 </button>
                 <button onClick={() => insertText('_', '_')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Italic">
                   <Italic size={18} />
                 </button>
                 <button onClick={() => insertText('[', '](url)')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Link">
                   <LinkIcon size={18} />
                 </button>
                 <div className="w-px h-6 bg-slate-700 mx-1" />
                 <button onClick={() => insertText('`', '`')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Code">
                   <Code size={18} />
                 </button>
                 <button onClick={() => insertText('\n```\n', '\n```\n')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Code Block">
                   <FileText size={18} />
                 </button>
                 <div className="w-px h-6 bg-slate-700 mx-1" />
                 <button onClick={() => insertText('# ')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Heading">
                   <Heading size={18} />
                 </button>
                 <button onClick={() => insertText('- ')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="List">
                   <List size={18} />
                 </button>
               </div>

               {/* View Toggles (Mobile/Desktop) */}
               <div className="flex bg-slate-900 rounded-lg p-1">
                 <button
                   onClick={() => setActiveTab('write')}
                   className={`p-2 rounded md:hidden ${activeTab === 'write' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                 >
                   <Edit3 size={18} />
                 </button>
                 <button
                   onClick={() => setActiveTab('both')}
                   className={`px-3 py-1 rounded text-sm font-medium hidden md:block ${activeTab === 'both' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                 >
                   Split View
                 </button>
                 <button
                   onClick={() => setActiveTab('preview')}
                   className={`p-2 rounded md:hidden ${activeTab === 'preview' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                 >
                   <Eye size={18} />
                 </button>
               </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Writer */}
              <div className={`flex-1 flex flex-col bg-[#0d1117] ${activeTab === 'preview' ? 'hidden' : 'block'} ${activeTab === 'both' ? 'border-r border-slate-800' : ''}`}>
                 <textarea
                   id="markdown-editor"
                   value={markdown}
                   onChange={(e) => setMarkdown(e.target.value)}
                   className="flex-1 w-full h-full p-6 bg-transparent text-slate-300 font-mono text-sm sm:text-base resize-none focus:outline-none leading-relaxed"
                   spellCheck="false"
                   placeholder="Type your markdown here..."
                 />
              </div>

              {/* Preview */}
              <div className={`flex-1 bg-slate-900 overflow-y-auto custom-scrollbar ${activeTab === 'write' ? 'hidden' : 'block'}`}>
                <div className="p-6 prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 prose-code:text-pink-400 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MarkdownPreviewer;
