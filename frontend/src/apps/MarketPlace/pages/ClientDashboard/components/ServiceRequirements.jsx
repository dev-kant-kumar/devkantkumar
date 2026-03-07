import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    ClipboardList,
    Clock,
    Cpu,
    FileText,
    Globe,
    Layout,
    Link2,
    Loader,
    Palette,
    Plus,
    Rocket,
    Target
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSubmitRequirementsMutation } from '../../../store/orders/ordersApi';

// Standard requirement sections
const STANDARD_SECTIONS = [
  {
    id: 'identity',
    title: 'Project Identity',
    icon: Layout,
    color: 'bg-blue-500',
    fields: [
      { id: 'project_title', label: 'Project Title / Name', placeholder: 'Give your project a catchy name...', required: true },
      { id: 'tagline', label: 'One-line Tagline', placeholder: 'Describe it in one sentence...', required: false },
    ]
  },
  {
    id: 'scope',
    title: 'Scope & Purpose',
    icon: Rocket,
    color: 'bg-purple-500',
    fields: [
      { id: 'overview', label: 'Project Overview', placeholder: 'What are we building? (Elevator pitch)', required: true, rows: 3 },
      { id: 'description', label: 'Detailed Description', placeholder: 'Provide as much detail as possible about the concept...', required: true, rows: 6 },
      { id: 'goals', label: 'Key Goals & Objectives', placeholder: 'What do you want to achieve with this project?', required: true, rows: 4 },
    ]
  },
  {
    id: 'audience',
    title: 'Audience & Market',
    icon: Globe,
    color: 'bg-emerald-500',
    fields: [
      { id: 'target_audience', label: 'Target Audience', placeholder: 'Who is this for? (Age, interest, location, etc.)', required: true, rows: 3 },
      { id: 'competitors', label: 'Direct Competitors', placeholder: 'Who else is doing something similar?', required: false, rows: 2 },
    ]
  },
  {
    id: 'technical',
    title: 'Technical Path',
    icon: Cpu,
    color: 'bg-orange-500',
    fields: [
      { id: 'features', label: 'Core Features', placeholder: 'List essential functionalities (e.g., User Login, Payment Gateway...)', required: true, rows: 5 },
      { id: 'tech_stack', label: 'Tech Preferences', placeholder: 'Any specific technologies or platforms you prefer? (e.g., React, Node, AWS)', required: false, rows: 2 },
      { id: 'integrations', label: 'Third-party Integrations', placeholder: 'Any APIs or services to integrate? (e.g., Stripe, Google Maps)', required: false, rows: 2 },
    ]
  },
  {
    id: 'design',
    title: 'Design & Feel',
    icon: Palette,
    color: 'bg-pink-500',
    fields: [
      { id: 'brand_feel', label: 'Look & Feel', placeholder: 'Describe the vibe (Minimalist, Professional, Playful, Bold...)', required: true, rows: 3 },
      { id: 'references', label: 'Reference Links', placeholder: 'Share websites or apps you like the design of (one per line)...', required: false, rows: 3 },
    ]
  }
];

// Question icon mapper for rich display
const QUESTION_ICONS = {
  'title': Layout,
  'identity': Layout,
  'description': FileText,
  'overview': FileText,
  'goals': Target,
  'objectives': Target,
  'audience': Globe,
  'market': Globe,
  'technical': Cpu,
  'stack': Cpu,
  'features': Rocket,
  'design': Palette,
  'look': Palette,
  'feel': Palette,
  'reference': Link2,
  'links': Link2,
};

const getQuestionIcon = (question) => {
  const lowerQ = question?.toLowerCase() || '';
  for (const [key, Icon] of Object.entries(QUESTION_ICONS)) {
    if (lowerQ.includes(key)) return Icon;
  }
  return ClipboardList;
};

const ICON_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-emerald-500',
  'bg-orange-500',
];

const ServiceRequirements = ({ order, liveService }) => {
  const [submitRequirements, { isLoading: isSubmitting }] = useSubmitRequirementsMutation();
  const [formState, setFormState] = useState({});
  const [error, setError] = useState('');

  const reqData = order?.requirementsData || {};
  const status = reqData?.status || 'pending';
  const revision = reqData?.revision || 0;
  const adminFeedback = reqData?.adminFeedback || '';
  const feedbackHistory = reqData?.feedbackHistory || [];
  const attachments = reqData?.attachments || [];

  const isPending = status === 'pending';
  const isApproved = status === 'approved';
  const isChangesRequested = status === 'changes_requested';
  const isSubmitted = status === 'submitted' || status === 'resubmitted';

  const isEditable = isPending || isChangesRequested;

  const responsesFromOrder = reqData?.responses || [];

  // Service specific requirements defined by admin
  const serviceRequirements = liveService?.requirements || [];

  // Pre-fill form state
  useEffect(() => {
    const initial = {};

    // Map existing responses back to form fields if possible
    if (responsesFromOrder.length > 0) {
      responsesFromOrder.forEach(resp => {
        // Try to match question label to form field ID or label
        STANDARD_SECTIONS.forEach(section => {
          section.fields.forEach(field => {
            if (resp.question === field.label) {
              initial[field.id] = resp.answer;
            }
          });
        });

        // Any response that doesn't match standard fields goes into additional
        const isStandard = STANDARD_SECTIONS.some(s => s.fields.some(f => f.label === resp.question));
        if (!isStandard) {
           initial[resp.question] = resp.answer;
        }
      });
    }

    setFormState(initial);
  }, [reqData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (fieldId, val) => {
    setFormState((prev) => ({ ...prev, [fieldId]: val }));
    setError('');
  };

  const handleSubmit = async () => {
    const responsesDTO = [];

    // 1. Process standard sections
    for (const section of STANDARD_SECTIONS) {
      for (const field of section.fields) {
        if (field.required && (!formState[field.id] || !formState[field.id].trim())) {
          setError(`Please fill in the required field: ${field.label}`);
          return;
        }
        if (formState[field.id]) {
          responsesDTO.push({
            question: field.label,
            answer: formState[field.id]
          });
        }
      }
    }

    // 2. Process service-specific requirements
    for (const req of serviceRequirements) {
      if (!formState[req] || !formState[req].trim()) {
        setError(`Please answer: ${req}`);
        return;
      }
      responsesDTO.push({
        question: req,
        answer: formState[req]
      });
    }

    try {
      await submitRequirements({
        orderId: order._id,
        responses: responsesDTO,
        attachments: [],
      }).unwrap();
    } catch (err) {
      console.error('Failed to submit requirements:', err);
      setError(err?.data?.message || 'Failed to submit requirements. Please try again.');
    }
  };

  if (isApproved && responsesFromOrder.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Requirements Confirmed</h3>
        <p className="text-gray-500">
          Your project requirements have been approved. We are now working on your project!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {isEditable ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-inner">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Let's Define Your Vision</h2>
                <p className="text-gray-500">The more detail you provide, the better we can deliver your project.</p>
              </div>
            </div>

            {isChangesRequested && adminFeedback && (
              <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-amber-900">Admin Feedback (Revision #{revision})</h3>
                    <p className="text-sm text-amber-700 mt-1 whitespace-pre-wrap">{adminFeedback}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {STANDARD_SECTIONS.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                  <div className={`h-8 w-8 ${section.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    <section.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs">{section.title}</h3>
                </div>
                <div className="p-8 space-y-6">
                  {section.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        {field.label}
                        {field.required && <span className="text-red-500 text-lg leading-none">*</span>}
                      </label>
                      {field.rows ? (
                        <textarea
                          value={formState[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          rows={field.rows}
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-400"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          type="text"
                          value={formState[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Service-Specific Requirements */}
            {serviceRequirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs">Specific Requirements</h3>
                </div>
                <div className="p-8 space-y-6">
                  {serviceRequirements.map((req, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        {req}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formState[req] || ''}
                        onChange={(e) => handleInputChange(req, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-400"
                        placeholder="Type your answer here..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submission Footer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
               <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
               </div>
               <p>Your progress is saved automatically during your session.</p>
            </div>

            <div className="flex items-center gap-4">
              {error && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {error}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-3 px-10 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-x-0 h-full w-4 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                {isSubmitting ? 'Submitting...' : (isChangesRequested ? 'Update & Resubmit' : 'Finalize & Submit')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // READ-ONLY VIEW
        <div className="space-y-8">
          {/* Status Banners */}
          {isSubmitted && (
            <div className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <Clock className="h-6 w-6 animate-pulse" />
                      Requirements Review
                    </h3>
                    <p className="mt-2 text-blue-100 max-w-md">
                      Our experts are carefully reviewing your requirements. We'll get back to you within 24-48 business hours.
                    </p>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold tracking-wider border border-white/30">
                      STATUS: UNDER REVIEW
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200">Revision #{revision}</p>
                 </div>
               </div>
            </div>
          )}

          {isApproved && (
            <div className="bg-emerald-600 rounded-3xl p-8 shadow-xl shadow-emerald-500/20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <CheckCircle className="h-6 w-6" />
                      Requirements Approved
                    </h3>
                    <p className="mt-2 text-emerald-100">
                      Your vision has been confirmed. The project is officially in production phase!
                    </p>
                 </div>
                 <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 text-center">
                    <p className="text-[10px] uppercase font-bold text-emerald-100 tracking-widest">Confirmed On</p>
                    <p className="text-lg font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                 </div>
               </div>
            </div>
          )}

          {/* Response Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsesFromOrder.map((resp, idx) => {
              const Icon = getQuestionIcon(resp.question);
              const colorClass = ICON_COLORS[idx % ICON_COLORS.length];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`h-12 w-12 ${colorClass} rounded-2xl flex items-center justify-center shadow-md rotate-3`}>
                      <Icon className="h-6 w-6 text-white -rotate-3" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{resp.question}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Response Captured</p>
                    </div>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 flex-grow">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed italic">
                      "{resp.answer || 'Not provided'}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback History section */}
          {feedbackHistory.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3 mb-6">
                <Clock className="h-4 w-4 text-gray-400" />
                Administrative Communication Log
              </h4>
              <div className="space-y-4">
                {feedbackHistory.map((entry, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-amber-400 mt-1.5" />
                      <div className="w-0.5 flex-grow bg-gray-100 mt-1 group-last:hidden" />
                    </div>
                    <div className="pb-6">
                      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                         <p className="text-sm text-amber-900 font-medium leading-relaxed">{entry.feedback}</p>
                         <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-3">
                           Logged at {new Date(entry.timestamp).toLocaleString()}
                         </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ServiceRequirements;
