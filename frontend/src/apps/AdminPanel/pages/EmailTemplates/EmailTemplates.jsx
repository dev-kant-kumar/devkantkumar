// React
import { ChevronRight, Code, Eye, Loader2, Mail, RefreshCw, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

// Data / API
import {
    useGetEmailTemplatesQuery,
    usePreviewEmailTemplateMutation
} from '../../store/api/adminApiSlice';

const EmailTemplates = () => {
  // --- State ---
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // --- API ---
  const { data: templatesData, isLoading: isListLoading, refetch: refetchList } = useGetEmailTemplatesQuery();
  const [previewTemplate, { data: previewData, isLoading: isPreviewLoading, error: previewError }] = usePreviewEmailTemplateMutation();

  const templates = templatesData?.data || [];

  // Group templates by category
  const groupedTemplates = templates.reduce((acc, template) => {
    const category = template.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(template);
    return acc;
  }, {});

  // --- Effects ---
  // Auto-select first template on load
  useEffect(() => {
    if (templates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templates[0]);
    }
  }, [templates]);

  // Fetch preview when selected template changes
  useEffect(() => {
    if (selectedTemplate) {
      previewTemplate({ templateId: selectedTemplate.id });
    }
  }, [selectedTemplate]);


  // --- Render Helpers ---
  const renderPreviewContent = () => {
    if (isPreviewLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-cyan-500" />
          <p>Generating preview...</p>
        </div>
      );
    }

    if (previewError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
             <Code className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-white mb-2">Preview Generation Failed</h3>
          <p className="text-sm">{previewError?.data?.message || 'Unknown error occurred'}</p>
          <button
            onClick={() => previewTemplate({ templateId: selectedTemplate.id })}
            className="mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!previewData?.data?.html) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <p>Select a template to view preview</p>
        </div>
      );
    }

    const htmlContent = previewData.data.html;

    if (viewMode === 'code') {
      return (
        <div className="h-full overflow-auto bg-[#1e1e1e] p-6 text-sm font-mono text-gray-300 rounded-xl">
          <pre>{htmlContent}</pre>
        </div>
      );
    }

    // Live Preview (using iframe for isolation)
    return (
      <div className={`h-full transition-all duration-300 mx-auto ${previewDevice === 'mobile' ? 'max-w-[375px]' : 'w-full'}`}>
        <div className={`h-full bg-white rounded-xl overflow-hidden shadow-xl ${previewDevice === 'mobile' ? 'border-[8px] border-slate-800' : ''}`}>
           <iframe
             title="Email Preview"
             srcDoc={htmlContent}
             className="w-full h-full border-0"
             sandbox="allow-same-origin allow-scripts"
           />
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-6rem)] grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">

      {/* Sidebar List */}
      <div className="lg:col-span-3 flex flex-col h-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 z-10">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-500" />
            Email Templates
          </h2>
          <button
            onClick={refetchList}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isListLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
          {Object.entries(groupedTemplates).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {category}
              </h3>
              <div className="space-y-1">
                {items.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                      selectedTemplate?.id === template.id
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <span>{template.name}</span>
                    {selectedTemplate?.id === template.id && (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {templates.length === 0 && !isListLoading && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No templates found.
            </div>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="lg:col-span-9 flex flex-col h-full gap-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-3">
             <div className="text-white font-medium px-2">
               {selectedTemplate?.name || 'Select a template'}
             </div>
             {previewData?.data?.subject && (
               <div className="hidden md:block text-sm text-slate-500 border-l border-slate-700 pl-3">
                 Subject: <span className="text-slate-300">{previewData.data.subject}</span>
               </div>
             )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
                  viewMode === 'preview'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
                  viewMode === 'code'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />HTML
              </button>
            </div>

            {/* Device Toggle (Only for visual preview) */}
            {viewMode === 'preview' && (
              <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700 ml-2">
                 <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-md transition-all ${
                    previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Desktop View"
                >
                  <div className="w-4 h-3 border-2 border-current rounded-[1px] mt-[1px]" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-md transition-all ${
                    previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
               onClick={() => selectedTemplate && previewTemplate({ templateId: selectedTemplate.id })}
               className="ml-2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
               title="Refresh Preview"
            >
              <RefreshCw className={`w-4 h-4 ${isPreviewLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden relative backdrop-blur-sm">
           {renderPreviewContent()}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;
