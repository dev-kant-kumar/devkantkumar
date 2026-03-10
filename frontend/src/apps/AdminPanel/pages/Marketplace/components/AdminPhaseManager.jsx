import { AlertCircle, CheckCircle, Link as LinkIcon, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCompleteAdminPhaseMutation } from '../../../store/api/adminApiSlice';

const PHASE_DELIVERABLES = {
  requirements_gathering: {
    title: "Requirements Gathering",
    checklist: ["Requirements summary document verified"],
    requiresUpload: true,
    uploadLabel: "Requirements Summary (PDF/Text)",
    nextPhase: "legal_documentation"
  },
  legal_documentation: {
    title: "Legal & Documentation",
    checklist: ["All required legal documents sent out", "All signatures received"],
    requiresUpload: true,
    uploadLabel: "Signed Legal Documents (Zip/PDF)",
    nextPhase: "planning_scoping"
  },
  planning_scoping: {
    title: "Planning & Scoping",
    checklist: ["Scope of Work Document", "Internal Timeline Set", "Delivery Date Configured"],
    requiresUpload: true,
    uploadLabel: "Scope Document (PDF/Text)",
    nextPhase: "design"
  },
  design: {
    title: "Design",
    checklist: ["Wireframes / Initial Concepts", "Figma Design Link", "Mobile layouts (if applicable)"],
    requiresUpload: true,
    requiresLink: true,
    uploadLabel: "Mockup Files (PNG/PDF/Zip)",
    nextPhase: "development"
  },
  development: {
    title: "Development",
    checklist: ["Codebase updated", "Staging Environment Link", "Build notes"],
    requiresLink: true,
    nextPhase: "testing_qa"
  },
  testing_qa: {
    title: "Testing & QA",
    checklist: ["Test Report", "Bugs fixed & verified"],
    requiresUpload: true,
    uploadLabel: "QA Report (PDF/CSV)",
    nextPhase: "delivery"
  },
  delivery: {
    title: "Delivery",
    checklist: ["Final source files", "Deployment/Live Link", "Handover notes"],
    requiresUpload: true,
    requiresLink: true,
    uploadLabel: "Final Delivery Package (Zip)",
    nextPhase: "revision_window"
  },
  revision_window: {
    title: "Revision Window",
    checklist: ["Handle all requested changes", "Update delivery files"],
    requiresUpload: false,
    nextPhase: "support_window"
  },
  support_window: {
    title: "Support Window",
    checklist: ["Ensure all open tickets are resolved"],
    requiresUpload: false,
    nextPhase: "completed"
  }
};

const AdminPhaseManager = ({ order }) => {
  const [completePhase, { isLoading }] = useCompleteAdminPhaseMutation();
  const [adminNotes, setAdminNotes] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const currentPhase = order?.currentPhase || 'requirements_gathering';
  const phaseConfig = PHASE_DELIVERABLES[currentPhase];

  const handleCompletePhase = async () => {
    if (phaseConfig?.requiresUpload && !fileUrl) {
      toast.error(`Please provide the required file upload for the ${phaseConfig.title} phase.`);
      return;
    }
    if (phaseConfig?.requiresLink && !externalLink) {
      toast.error(`Please provide the required link for the ${phaseConfig.title} phase.`);
      return;
    }

    try {
      await completePhase({
        id: order._id,
        phase: currentPhase,
        notes: adminNotes,
        deliverableUrl: fileUrl,
        externalLink: externalLink
      }).unwrap();

      toast.success(`${phaseConfig.title} phase marked as complete. Order moved to ${PHASE_DELIVERABLES[currentPhase].nextPhase?.replace('_', ' ')}.`);
      setAdminNotes('');
      setFileUrl('');
      setExternalLink('');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to complete phase.');
    }
  };

  const isBlockedByClient = currentPhase === 'requirements_gathering' && order?.requirementsData?.status !== 'approved';
  const clientStatus = order?.requirementsData?.status || 'pending';

  if (order?.status === 'completed' || order?.status === 'cancelled') {
    return null;
  }

  return (
    <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Phase Checkpoint: {phaseConfig?.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Provide the required deliverables to advance the order to the next phase.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Checklist */}
        {phaseConfig?.checklist && (
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-3">Required Deliverables</h4>
            <ul className="space-y-2">
              {phaseConfig.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-200 font-medium">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Client Block Warning */}
        {isBlockedByClient && (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-sm">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">Client Input Required</h4>
              <p className="text-sm text-amber-800/80 dark:text-amber-400 mt-1 leading-relaxed">
                {clientStatus === 'pending'
                  ? "The client has not yet submitted their project requirements. You are blocked from completing this phase until requirements are approved."
                  : "Requirements have been submitted but are not yet marked as 'Approved'. Please review and approve them in the Requirements tab."
                }
              </p>
            </div>
          </div>
        )}

        {/* Deliverables Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phaseConfig?.requiresUpload && (
             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                 <Upload className="h-4 w-4" /> {phaseConfig.uploadLabel} <span className="text-red-500">*</span>
               </label>
               <input
                 type="text"
                 placeholder="Enter direct file URL (e.g. AWS S3 link)"
                 value={fileUrl}
                 onChange={(e) => setFileUrl(e.target.value)}
                 className="w-full px-3 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur-sm"
               />
               <p className="text-xs text-gray-400 dark:text-gray-400">Mock Phase: Please paste a URL to simulate upload.</p>
             </div>
          )}

          {phaseConfig?.requiresLink && (
             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                 <LinkIcon className="h-4 w-4" /> External Resource Link <span className="text-red-500">*</span>
               </label>
               <input
                 type="url"
                 placeholder="https://..."
                 value={externalLink}
                 onChange={(e) => setExternalLink(e.target.value)}
                 className="w-full px-3 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur-sm"
               />
             </div>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin Notes Summary</label>
          <textarea
            rows="3"
            placeholder="Summarize the work completed in this phase. This may be visible to the customer."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none backdrop-blur-sm"
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleCompletePhase}
            disabled={isLoading || isBlockedByClient}
            className={`
              flex items-center gap-2 px-6 py-2.5 font-medium rounded-xl transition-all
              ${isLoading || isBlockedByClient
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5'
              }
            `}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
            {isLoading ? 'Processing...' : isBlockedByClient ? 'Blocked by Client Input' : `Complete ${phaseConfig?.title} Phase`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPhaseManager;
