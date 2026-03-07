import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ClipboardList, Clock, FileText, Globe, Link2, Loader, Save, Target } from 'lucide-react';
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

const ServiceRequirements = ({ order, liveService }) => {
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

  // Editable when pending or changes_requested
  const isEditable = isPending || isChangesRequested;

  const responsesFromOrder = reqData?.responses || [];

  // If already submitted/approved, use the questions that were answered.
  // Otherwise, use the requirements defined in the live service.
  const questions = responsesFromOrder.length > 0
    ? responsesFromOrder.map(r => r.question)
    : (liveService?.requirements || []);

  // Pre-fill responses if changes were requested (so user can edit their previous answers)
  useEffect(() => {
    if (isChangesRequested && responsesFromOrder.length > 0) {
      const prefilled = {};
      responsesFromOrder.forEach((r, idx) => {
        prefilled[idx] = r.answer || '';
      });
      setResponses(prefilled);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (idx, val) => {
    setResponses((prev) => ({ ...prev, [idx]: val }));
    setError('');
  };

  const handleSubmit = async () => {
    // Validate that all questions are answered
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

  if (questions.length === 0) {
    if (['in_progress', 'delivered', 'completed', 'revising'].includes(order.status)) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Requirements Confirmed</h3>
          <p className="text-gray-500">
            Your project is currently {order.status.replace('_', ' ')}. Requirements have been handled.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        No requirements have been specified for this service yet.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {isEditable ? (
        // EDIT MODE (pending or changes_requested)
        <div className="space-y-6">
          {/* Admin Feedback Banner (when changes requested) */}
          {isChangesRequested && adminFeedback && (
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900">Changes Requested</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    The admin has reviewed your requirements and requested the following changes:
                  </p>
                  <div className="mt-3 bg-amber-100/60 rounded-lg p-4 border border-amber-200">
                    <p className="text-sm text-amber-900 whitespace-pre-wrap font-medium">{adminFeedback}</p>
                  </div>
                  {revision > 0 && (
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                      Revision #{revision} — Please update your answers below and resubmit.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Feedback History */}
          {feedbackHistory.length > 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Previous Feedback
              </h4>
              <div className="space-y-2">
                {feedbackHistory.slice(0, -1).map((entry, idx) => (
                  <div key={idx} className="flex gap-3 border-l-2 border-gray-200 pl-4 py-1">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{entry.feedback}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Project Requirements</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isChangesRequested
                    ? 'Please update your answers based on the feedback above and resubmit.'
                    : 'Please provide the necessary information to start your project.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isChangesRequested && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wide border border-amber-200">
                    Revision Needed
                  </span>
                )}
                {isPending && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide border border-yellow-200">
                    Needs Info
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 border border-red-100">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-8">
                {questions.map((question, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      {idx + 1}. {question} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={responses[idx] || ''}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                      placeholder="Type your answer here..."
                    />
                  </div>
                ))}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {isSubmitting ? 'Submitting...' : (isChangesRequested ? 'Resubmit Requirements' : 'Submit Requirements')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // READ-ONLY VIEW
        <div className="space-y-6">
          {/* Status Banner — Submitted / Resubmitted */}
          {(isSubmitted || isResubmitted) && (
            <div className="bg-blue-50/80 rounded-xl p-6 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    {isResubmitted ? 'Revised Requirements Under Review' : 'Requirements Under Review'}
                  </h3>
                  <p className="text-sm text-blue-600 mt-0.5">
                    {isResubmitted && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold mr-2 border border-blue-200">Revision #{revision}</span>}
                    Submitted on {reqData.submittedAt ? new Date(reqData.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold border border-blue-200 animate-pulse">
                   Pending Admin Approval
                 </span>
              </div>
            </div>
          )}

          {/* Status Banner — Approved */}
          {isApproved && (
            <div className="bg-green-50/80 rounded-xl p-6 border border-green-200 flex items-center gap-4">
              <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center shadow-sm">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900">Requirements Approved</h3>
                <p className="text-sm text-green-700 mt-0.5">
                  {revision > 0 && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold mr-2 border border-green-200">After {revision} revision{revision > 1 ? 's' : ''}</span>}
                  Approved on {reqData.approvedAt ? new Date(reqData.approvedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                </p>
              </div>
            </div>
          )}

          {/* Feedback History */}
          {feedbackHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Admin Feedback History
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{feedbackHistory.length}</span>
              </h4>
              <div className="space-y-2">
                {feedbackHistory.map((entry, idx) => (
                  <div key={idx} className="flex gap-3 border-l-2 border-amber-400 pl-4 py-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{entry.feedback}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {responsesFromOrder.map((resp, idx) => {
              const Icon = getQuestionIcon(resp.question);
              const bgColor = ICON_COLORS[idx % ICON_COLORS.length];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-10 w-10 shrink-0 ${bgColor} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900">{resp.question}</h4>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed flex-grow">
                    {resp.answer || 'Not provided by the client.'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Attachments
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{attachments.length}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attachments.map((att, idx) => (
                  <a
                    key={idx}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">{att.name}</p>
                      {att.size > 0 && (
                        <p className="text-xs text-gray-500">{(att.size / 1024).toFixed(1)} KB</p>
                      )}
                    </div>
                    <Link2 className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </a>
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
