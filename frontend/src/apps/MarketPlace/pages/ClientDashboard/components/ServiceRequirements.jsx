import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader, Save } from 'lucide-react';
import { useState } from 'react';
import { useSubmitRequirementsMutation } from '../../../store/orders/ordersApi';

const ServiceRequirements = ({ order, liveService }) => {
  const [submitRequirements, { isLoading: isSubmitting }] = useSubmitRequirementsMutation();
  const [responses, setResponses] = useState({});
  const [error, setError] = useState('');

  const questions = liveService?.requirements || [];
  const reqData = order?.requirementsData || {};
  const status = reqData?.status || 'pending';

  const isPending = status === 'pending';
  const isSubmitted = status === 'submitted';
  const isApproved = status === 'approved';

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
        responses: formattedResponses
      }).unwrap();
    } catch (err) {
      console.error('Failed to submit requirements:', err);
      setError(err?.data?.message || 'Failed to submit requirements. Please try again.');
    }
  };

  if (questions.length === 0) {
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Project Requirements</h3>
            <p className="text-sm text-gray-500 mt-1">
              Please provide the necessary information to start your project.
            </p>
          </div>
          {/* Status Badge */}
          {isPending && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide border border-yellow-200">
              Needs Info
            </span>
          )}
          {isSubmitted && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-200">
              Under Review
            </span>
          )}
          {isApproved && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Approved
            </span>
          )}
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 border border-red-100">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {isPending ? (
              // EDIT MODE
              <>
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
                    {isSubmitting ? 'Submitting...' : 'Submit Requirements'}
                  </button>
                </div>
              </>
            ) : (
              // READ-ONLY VIEW
              <>
                {(reqData.responses || []).map((resp, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {idx + 1}. {resp.question}
                    </h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{resp.answer}</p>
                  </div>
                ))}

                {isSubmitted && (
                  <div className="mt-6 flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                      Your requirements have been submitted and are currently being reviewed. We will notify you once they are approved and the project begins.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceRequirements;
