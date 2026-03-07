import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    ClipboardList,
    Clock,
    ExternalLink,
    FileText,
    Globe,
    History as HistoryIcon,
    Link2,
    Loader,
    Save,
    Target
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSubmitRequirementsMutation } from '../../../store/orders/ordersApi';

// Question icon mapper for rich display
const QUESTION_ICONS = {
  'project description': FileText,
  'description': FileText,
  'goals': Target,
  'goals & objectives': Target,
  'objectives': Target,
  'target audience': Globe,
  'audience': Globe,
  'references': Link2,
  'references & links': Link2,
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
  'bg-purple-500',
  'bg-blue-500',
  'bg-pink-500',
  'bg-emerald-500',
  'bg-orange-500',
];

const PHASE_DISPLAY_NAMES = {
  requirements_gathering: 'Requirements',
  legal_documentation: 'Legal & Documentation',
  planning_scoping: 'Planning & Scoping',
  design: 'Design & Prototyping',
  development: 'Development Phase',
  testing_qa: 'Testing & QA',
  delivery: 'Final Delivery',
  revision_window: 'Revision Window',
  support_window: 'Support Window',
  completed: 'Project Completed'
};

const ServicePhaseActivity = ({ order, liveService }) => {
  const [submitRequirements, { isLoading: isSubmitting }] = useSubmitRequirementsMutation();
  const [responses, setResponses] = useState({});
  const [error, setError] = useState('');

  const reqData = order?.requirementsData || {};
  const status = reqData?.status || 'pending';
  const revision = reqData?.revision || 0;
  const adminFeedback = reqData?.adminFeedback || '';
  const feedbackHistory = reqData?.feedbackHistory || [];
  const attachments = reqData?.attachments || [];

  const isPending = status === 'pending';
  const isSubmitted = status === 'submitted';
  const isResubmitted = status === 'resubmitted';
  const isApproved = status === 'approved';
  const isChangesRequested = status === 'changes_requested';

  const currentPhase = order?.currentPhase || 'requirements_gathering';
  const isRequirementsPhase = currentPhase === 'requirements_gathering';
  const showRequirementsForm = isRequirementsPhase && (isPending || isChangesRequested);

  const responsesFromOrder = reqData?.responses || [];
  const questions = responsesFromOrder.length > 0
    ? responsesFromOrder.map(r => r.question)
    : (liveService?.requirements || []);

  useEffect(() => {
    if (isChangesRequested && responsesFromOrder.length > 0) {
      const prefilled = {};
      responsesFromOrder.forEach((r, idx) => {
        prefilled[idx] = r.answer || '';
      });
      setResponses(prefilled);
    }
  }, [status, isChangesRequested]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (idx, val) => {
    setResponses((prev) => ({ ...prev, [idx]: val }));
    setError('');
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      setError('No requirements defined for this service. Please contact the administrator.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!responses[i] || !responses[i].trim()) {
        setError('Please answer all required questions before submitting.');
        return;
      }
    }

    try {
      const formattedResponses = questions.map((q, idx) => ({
        question: q,
        answer: responses[idx]
      }));

      await submitRequirements({
        orderId: order._id,
        responses: formattedResponses,
        attachments: [],
      }).unwrap();
    } catch (err) {
      console.error('Failed to submit requirements:', err);
      setError(err?.data?.message || 'Failed to submit requirements. Please try again.');
    }
  };

  // Filter timeline for phase completions (items with deliverableUrl or specific status)
  const activityHistory = (order?.timeline || []).filter(entry =>
    entry.notes || entry.deliverableUrl || entry.externalLink ||
    ['payment_completed', 'delivered', 'completed'].includes(entry.status)
  ).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 1. CURRENT PHASE CONTEXT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Phase</h3>
              <p className="text-xl font-black text-slate-900 leading-tight">
                {PHASE_DISPLAY_NAMES[currentPhase] || currentPhase}
              </p>
            </div>
          </div>
          <div className="text-right">
             <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-200">
               In Progress
             </span>
          </div>
        </div>

        {/* Requirements Form Section */}
        {showRequirementsForm ? (
          <div className="p-8">
            {isChangesRequested && adminFeedback && (
              <div className="mb-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-900">Changes Requested</h3>
                    <p className="text-sm text-amber-700 mt-1">{adminFeedback}</p>
                    {revision > 0 && (
                      <p className="text-xs text-amber-600 mt-2 font-medium italic">Revision #{revision} requested by Admin</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 border border-red-100 italic font-medium">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8">
                {questions.length > 0 ? (
                  questions.map((question, idx) => (
                    <div key={idx} className="space-y-3 group">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 group-focus-within:bg-blue-100 group-focus-within:text-blue-600">
                          {idx + 1}
                        </span>
                        {question}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <textarea
                        value={responses[idx] || ''}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        rows={4}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none shadow-sm"
                        placeholder="Type your detailed answer here..."
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <ClipboardList className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No requirement questions found</p>
                    <p className="text-xs text-slate-400 mt-2 italic">Please wait for the administrator to define requirements or contact support.</p>
                  </div>
                )}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || questions.length === 0}
                  className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-slate-200 active:scale-95"
                >
                  {isSubmitting ? <Loader className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 group-hover:rotate-12 transition-transform" />}
                  {isSubmitting ? 'Submitting Responses...' : (isChangesRequested ? 'Resubmit Revisions' : 'Launch Project Initiation')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white">
             {isRequirementsPhase && isSubmitted && (
               <div className="py-12">
                 <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HistoryIcon className="h-10 w-10 text-blue-600 animate-pulse" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900">Awaiting Validation</h4>
                 <p className="text-slate-500 mt-2 max-w-sm mx-auto">Your responses have been transmitted to mission control. We are currently verifying the project requirements.</p>
               </div>
             )}
             {!isRequirementsPhase && (
               <div className="py-12">
                 <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900">Requirements Approved</h4>
                 <p className="text-slate-500 mt-2 max-w-sm mx-auto">Project is currently in the <b>{PHASE_DISPLAY_NAMES[currentPhase]}</b> phase. Check the activity history below for updates.</p>
               </div>
             )}
          </div>
        )}
      </div>

      {/* 2. ACTIVITY HISTORY / DELIVERABLES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            Project Activity History
          </h3>
          <span className="text-xs font-mono text-slate-400">{activityHistory.length} EVENTS RECORDED</span>
        </div>

        <div className="space-y-4">
          {activityHistory.length > 0 ? (
            activityHistory.map((entry, idx) => (
              <motion.div
                key={entry._id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-white rounded-2xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
              >
                {/* Visual Connector Line */}
                {idx !== activityHistory.length - 1 && (
                  <div className="absolute left-[2.25rem] top-[4.5rem] w-px h-12 bg-slate-100" />
                )}

                <div className="flex items-start gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                          {entry.status?.replace('_', ' ')}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{entry.message}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(entry.timestamp).toLocaleDateString()} • {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {entry.notes && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
                      </div>
                    )}

                    {(entry.deliverableUrl || entry.externalLink) && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {entry.deliverableUrl && (
                          <a
                            href={entry.deliverableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Access Deliverable
                          </a>
                        )}
                        {entry.externalLink && (
                          <a
                            href={entry.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:border-blue-500 hover:text-blue-600 transition-all"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View External Assets
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <HistoryIcon className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No activity records found</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. ORIGINAL REQUIREMENTS DATA (As an expandable "Project Brief") */}
      {isApproved && responsesFromOrder.length > 0 && (
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ClipboardList className="h-32 w-32 text-white" />
          </div>

          <div className="relative z-10">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Mission Scope & Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {responsesFromOrder.map((resp, idx) => {
                const Icon = getQuestionIcon(resp.question);
                return (
                  <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{resp.question}</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic line-clamp-3">"{resp.answer}"</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ServicePhaseActivity;
