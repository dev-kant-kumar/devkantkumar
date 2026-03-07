import { motion } from 'framer-motion';
import { Activity, AlertCircle, ArrowLeft, Building2, CalendarDays, Check, CheckCircle, CircleUserRound, ClipboardList, Clock, Cpu, CreditCard, FileText, Globe, Hash, History as HistoryIcon, Layout, Link2, Mail, MapPin, MessageSquare, Palette, Phone, RefreshCw, Rocket, ShoppingCart, Target, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetServiceByIdQuery } from '../../../../MarketPlace/store/api/marketplaceApi';
import PremiumButton from '../../../common/components/PremiumButton';
import { useApproveRequirementsMutation, useCompletePhaseMutation, useGetAdminOrderByIdQuery, useGetCustomerByIdQuery, useRequestRequirementsChangesMutation } from '../../../store/api/adminApiSlice';

import ServicePhaseHistory from '../../../../MarketPlace/pages/ClientDashboard/components/ServicePhaseHistory';
import AdminProjectFiles from './AdminProjectFiles';
import AdminProjectMessages from './AdminProjectMessages';
import AdminProjectTimeline from './AdminProjectTimeline';

// --- Constants & Helpers ---

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  awaiting_requirements: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  completed: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
  revising: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
};

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
  'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
];

// The unified phases across the system
const PHASES = [
  { id: 'requirements_gathering', label: 'Requirements', icon: ClipboardList, weight: 10 },
  { id: 'legal_documentation', label: 'Legal', icon: FileText, weight: 5 },
  { id: 'planning_scoping', label: 'Planning', icon: Target, weight: 10 },
  { id: 'design', label: 'Design', icon: Palette, weight: 15 },
  { id: 'development', label: 'Dev', icon: Cpu, weight: 25 },
  { id: 'testing_qa', label: 'Testing', icon: Activity, weight: 10 },
  { id: 'delivery', label: 'Delivery', icon: Rocket, weight: 10 },
  { id: 'revision_window', label: 'Revisions', icon: RefreshCw, weight: 10 },
  { id: 'support_window', label: 'Support', icon: Phone, weight: 5 },
  { id: 'completed', label: 'Done', icon: Check, weight: 0 }
];

// Robust phase index calculator that looks at actual completed events
const getActivePhaseIndex = (order) => {
  if (!order) return 0;
  if (order.status === 'completed') return PHASES.length - 1;

  // 1. Get all completed phases from the timeline, reverse them to start from latest
  const completedEvents = [...(order.timeline || [])].reverse();

  // 2. Find the highest phase ID that actually exists in our PHASES array
  let highestCompletedIndex = -1;
  const phaseIds = PHASES.map(p => p.id);

  // Fallback map for legacy or mismatched statuses if any exist in the database
  const legacyMap = {
    'payment_completed': 'requirements_gathering',
    'in_progress': 'development',
    'delivered': 'delivery',
    'revision_window_closed': 'support_window'
  };

  for (const event of completedEvents) {
    const rawStatus = event.status;
    const mappedStatus = legacyMap[rawStatus] || rawStatus;
    const idx = phaseIds.indexOf(mappedStatus);

    // Once we find the most recent completed phase that matches our track
    if (idx !== -1) {
      highestCompletedIndex = Math.max(highestCompletedIndex, idx);
    }
  }

  // 3. Fallback to order.currentPhase if available and higher
  if (order.currentPhase) {
    const mappedCurrent = legacyMap[order.currentPhase] || order.currentPhase;
    const currentIdx = phaseIds.indexOf(mappedCurrent);
    if (currentIdx > highestCompletedIndex) {
      highestCompletedIndex = currentIdx;
    }
  }

  // Active phase is usually the one *after* the highest completed phase, capped at the end
  const activeIndex = highestCompletedIndex + 1;
  return Math.min(activeIndex, PHASES.length - 1);
};

const PHASE_CHECKLISTS = {
  requirements_gathering: {
    title: "Requirements Gathering",
    checklist: ["Requirements summary document verified"],
    requiresUpload: true,
    uploadLabel: "Requirements Summary",
    nextPhase: "legal_documentation"
  },
  legal_documentation: {
    title: "Legal & Documentation",
    checklist: ["All required legal documents sent out", "All signatures received"],
    requiresUpload: true,
    uploadLabel: "Signed Legal Documents",
    nextPhase: "planning_scoping"
  },
  planning_scoping: {
    title: "Planning & Scoping",
    checklist: ["Scope of Work Document", "Internal Timeline Set"],
    requiresUpload: true,
    uploadLabel: "Scope Document",
    nextPhase: "design"
  },
  design: {
    title: "Design",
    checklist: ["Wireframes / Initial Concepts", "Figma Design Link"],
    requiresUpload: true,
    requiresLink: true,
    uploadLabel: "Mockup Files",
    nextPhase: "development"
  },
  development: {
    title: "Development",
    checklist: ["Codebase updated", "Staging Environment Link"],
    requiresLink: true,
    nextPhase: "testing_qa"
  },
  testing_qa: {
    title: "Testing & QA",
    checklist: ["Test Report", "Bugs fixed & verified"],
    requiresUpload: true,
    uploadLabel: "QA Report",
    nextPhase: "delivery"
  },
  delivery: {
    title: "Delivery",
    checklist: ["Final source files", "Deployment/Live Link"],
    requiresUpload: true,
    requiresLink: true,
    uploadLabel: "Final Delivery Package",
    nextPhase: "revision_window"
  },
  revision_window: {
    title: "Revision Window",
    checklist: ["Handle all requested changes"],
    nextPhase: "support_window"
  },
  support_window: {
    title: "Support Window",
    checklist: ["Ensure open tickets are resolved"],
    nextPhase: "completed"
  }
};

// --- Minor Components ---

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-96" />
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 bg-gray-200 dark:bg-gray-700 rounded-xl h-96" />
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16"
  >
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load project</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
      {error?.data?.message || error?.message || 'Something went wrong while loading project details.'}
    </p>
    <PremiumButton
      onClick={onRetry}
      label="Try Again"
      icon={RefreshCw}
    />
  </motion.div>
);

// --- Admin Phase Activity Tab Component ---

const AdminPhaseActivity = ({ order, refetch }) => {
  const [activeSubPhase, setActiveSubPhase] = useState(order?.currentPhase || 'requirements_gathering');
  const [activeSubTab, setActiveSubTab] = useState('input');
  const [feedback, setFeedback] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const reqData = order?.requirementsData || {};
  const status = reqData.status || 'pending';
  const responses = reqData.responses || [];
  const attachments = reqData.attachments || [];
  const feedbackHistory = reqData.feedbackHistory || [];
  const currentPhase = order?.currentPhase || 'requirements_gathering';

  const [approveRequirements, { isLoading: isApproving }] = useApproveRequirementsMutation();
  const [requestChanges, { isLoading: isRequesting }] = useRequestRequirementsChangesMutation();
  const [completePhase, { isLoading: isCompleting }] = useCompletePhaseMutation();

  const currentPhaseConfig = PHASE_CHECKLISTS[activeSubPhase];
  const isCurrentlyActivePhase = activeSubPhase === currentPhase;

  const handleCompletePhase = async () => {
    if (currentPhaseConfig?.requiresUpload && !fileUrl) {
      toast.error(`Please provide the required file upload.`);
      return;
    }
    if (currentPhaseConfig?.requiresLink && !externalLink) {
      toast.error(`Please provide the required link.`);
      return;
    }

    try {
      await completePhase({
        id: order._id,
        phase: activeSubPhase,
        notes: adminNotes,
        deliverableUrl: fileUrl,
        externalLink: externalLink
      }).unwrap();

      toast.success(`${currentPhaseConfig.title} phase completed!`);
      setAdminNotes('');
      setFileUrl('');
      setExternalLink('');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to complete phase');
    }
  };

  const getEventsForPhase = (phaseId) => {
    const activityHistory = [...(order?.timeline || [])].reverse();
    const keywords = {
      requirements_gathering: ['requirement', 'responses', 'initiation', 'brief', 'submitted', 'provided'],
      legal_documentation: ['legal', 'nda', 'sow', 'contract', 'signature'],
      planning_scoping: ['plan', 'scope', 'milestone', 'timeline', 'estimate'],
      design: ['design', 'wireframe', 'mockup', 'figma', 'ui', 'ux'],
      development: ['build', 'staging', 'repo', 'dev', 'pushed', 'deployed'],
      testing_qa: ['test', 'bug', 'qa', 'fix', 'performance'],
      delivery: ['deliver', 'final', 'handover', 'completion'],
      revision_window: ['revision', 'feedback', 'update'],
      support_window: ['support', 'ticket', 'resolved', 'help']
    };

    const phaseKeywords = keywords[phaseId] || [];
    return activityHistory.filter(entry => {
      const msg = entry.message?.toLowerCase() || '';
      const st = entry.status?.toLowerCase() || '';
      return phaseKeywords.some(kw => msg.includes(kw) || st.includes(kw));
    });
  };

  const phaseEvents = getEventsForPhase(activeSubPhase);

  const handleApprove = async () => {
    try {
      await approveRequirements({ id: order._id }).unwrap();
      toast.success('Requirements approved!');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to approve');
    }
  };

  const handleRequestChanges = async () => {
    if (!feedback.trim()) {
      toast.error('Providing feedback is necessary.');
      return;
    }
    try {
      await requestChanges({ id: order._id, feedback: feedback.trim() }).unwrap();
      toast.success('Feedback sent!');
      setFeedback('');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send feedback');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
      {/* Phase Nav */}
      <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] border border-gray-200/50 dark:border-gray-700/50 p-2 flex overflow-x-auto no-scrollbar gap-2 shadow-sm">
        {PHASES.map((phase) => {
          const isActive = activeSubPhase === phase.id;
          const isCurrent = currentPhase === phase.id;
          const phaseIndex = PHASES.findIndex(p => p.id === phase.id);
          const currentIndex = PHASES.findIndex(p => p.id === currentPhase);
          const isCompleted = phaseIndex < currentIndex;

          return (
            <button
              key={phase.id}
              onClick={() => setActiveSubPhase(phase.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap
                ${isActive ? 'bg-slate-900 text-white shadow-xl scale-105 z-10' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'}
                ${isCurrent && !isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
            >
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/10' : (isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800')}`}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : <phase.icon className="h-4 w-4" />}
              </div>
              {phase.label}
              {isCurrent && <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-8 px-4">
        <button onClick={() => setActiveSubTab('input')} className={`pb-4 text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeSubTab === 'input' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 dark:text-gray-400'}`}>Phase Input</button>
        <button onClick={() => setActiveSubTab('output')} className={`pb-4 text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeSubTab === 'output' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 dark:text-gray-400'}`}>Phase Output</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-gray-900/60 rounded-[2.5rem] shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className={`p-8 flex items-center justify-between ${activeSubPhase === currentPhase ? 'bg-blue-600' : 'bg-slate-900'} text-white`}>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  {(() => {
                    const PhaseIcon = PHASES.find(p => p.id === activeSubPhase)?.icon;
                    return PhaseIcon ? <PhaseIcon className="h-7 w-7" /> : null;
                  })()}
                </div>
                <div>
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60">{activeSubTab === 'input' ? 'Inputs' : 'Deliverables'}</h3>
                   <p className="text-2xl font-black">{PHASES.find(p => p.id === activeSubPhase)?.label}</p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 truncate max-w-[150px]">
                {activeSubPhase === currentPhase ? 'Active Phase' : (PHASES.findIndex(p => p.id === activeSubPhase) < PHASES.findIndex(p => p.id === currentPhase) ? 'Completed' : 'Upcoming')}
              </span>
            </div>

            <div className="p-8">
              {activeSubTab === 'input' ? (
                activeSubPhase === 'requirements_gathering' ? (
                  <div className="space-y-8">
                    {responses.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center opacity-80 dark:opacity-60">
                        <ClipboardList className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" />
                        <h4 className="text-lg font-bold uppercase">No Requirements Submitted</h4>
                        <p className="text-sm max-w-xs">Client hasn't provided details yet, or this brief is handled externally.</p>
                      </div>
                    ) : (
                      <>
                        {(status === 'submitted' || status === 'resubmitted') && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                <CheckCircle className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900 dark:text-white uppercase">Action Required</h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">Review client submission.</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button onClick={handleApprove} disabled={isApproving} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50">APPROVE</button>
                              <button onClick={() => document.getElementById('fb-box')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 rounded-xl font-bold text-sm">REVISION</button>
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {responses.map((resp, idx) => {
                             const Icon = getQuestionIcon(resp.question);
                             return (
                               <div key={idx} className="bg-slate-50 dark:bg-gray-800/40 rounded-2xl p-6 border border-slate-100 dark:border-gray-800">
                                 <div className="flex items-center gap-3 mb-4">
                                   <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${ICON_COLORS[idx % 5]}`}><Icon className="h-4 w-4" /></div>
                                   <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{resp.question}</h4>
                                 </div>
                                 <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{resp.answer || 'N/A'}"</p>
                               </div>
                             );
                          })}
                        </div>
                        {isCurrentlyActivePhase && (status === 'submitted' || status === 'resubmitted') && (
                          <div id="fb-box" className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-3xl p-6 mt-8">
                             <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full h-32 bg-white dark:bg-gray-900/50 border border-amber-100 dark:border-amber-800/20 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Feedback for client..." />
                             <button onClick={handleRequestChanges} disabled={isRequesting || !feedback.trim()} className="mt-4 px-8 py-3 bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-colors">SEND FEEDBACK</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 opacity-60 dark:opacity-40">
                     <Layout className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                     <p className="text-sm font-black uppercase tracking-widest">Phase Documentation & Scoping</p>
                  </div>
                )
              ) : (
                <div className="space-y-8">
                  <div className="space-y-6">
                    {phaseEvents.map((entry, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-blue-600" />
                        <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                          <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                          {entry.deliverableUrl && <a href={entry.deliverableUrl} target="_blank" className="text-blue-500 hover:text-blue-400 font-black">VIEW ASSET</a>}
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{entry.message}</p>
                        {entry.notes && <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-2">{entry.notes}</p>}
                      </div>
                    ))}
                    {isCurrentlyActivePhase && status === 'approved' && (
                      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-6">
                        <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-800">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase mb-4">FINALIZE {currentPhaseConfig?.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentPhaseConfig?.requiresUpload && (
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase">{currentPhaseConfig.uploadLabel}</label>
                                <input className="w-full bg-white dark:bg-gray-900 border border-gray-200 rounded-xl px-4 py-2 text-xs" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="Link to Deliverable" />
                              </div>
                            )}
                            {currentPhaseConfig?.requiresLink && (
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase">Resource Link</label>
                                <input className="w-full bg-white dark:bg-gray-900 border border-gray-200 rounded-xl px-4 py-2 text-xs" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} placeholder="https://..." />
                              </div>
                            )}
                          </div>
                          <textarea className="w-full h-24 mt-4 bg-white dark:bg-gray-900 border border-gray-200 rounded-xl px-4 py-3 text-xs" value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Client notes..." />
                          <button onClick={handleCompletePhase} disabled={isCompleting} className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black">COMPLETE PHASE</button>
                        </div>
                      </div>
                    )}
                    {phaseEvents.length === 0 && !isCurrentlyActivePhase && <p className="text-center py-12 text-gray-400 text-xs">No logs for this phase</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <Activity className="absolute -top-10 -right-10 h-40 w-40 opacity-10" />
             <h4 className="text-[10px] font-black uppercase opacity-70 tracking-widest mb-4">Phase Impact</h4>
             <div className="flex items-baseline gap-2">
               <span className="text-4xl font-black">{PHASES.find(p => p.id === activeSubPhase)?.weight}%</span>
               <span className="text-sm opacity-70">Weight</span>
             </div>
             <div className="mt-8 pt-8 border-t border-white/20">
               <div className="w-full bg-white/10 rounded-full h-1"><div className="bg-white h-1 rounded-full" style={{ width: PHASES.findIndex(p => p.id === activeSubPhase) <= PHASES.findIndex(p => p.id === currentPhase) ? '100%' : '0%' }} /></div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Workspace Component ---

const AdminProjectWorkspace = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  const { data: orderResponse, isLoading, isError, error, refetch } = useGetAdminOrderByIdQuery(id, {
    skip: !id,
    pollingInterval: 30000,
  });

  const order = orderResponse?.data || orderResponse;

  const calculateProgress = (order) => {
    if (order?.status === 'completed') return 100;
    if (order?.status === 'cancelled') return 0;
    if (!order?.timeline || order.timeline.length === 0) return 0;

    let progress = 0;
    const completedStatuses = order.timeline.map(entry => entry.status);

    if (completedStatuses.includes('payment_completed')) progress = 10;
    if (completedStatuses.includes('legal_documentation')) progress = 15;
    if (completedStatuses.includes('planning_scoping')) progress = 25;
    if (completedStatuses.includes('design')) progress = 40;
    if (completedStatuses.includes('in_progress')) progress = 65;
    if (completedStatuses.includes('testing_qa')) progress = 75;
    if (completedStatuses.includes('delivered')) progress = 85;
    if (completedStatuses.includes('revision_window_closed')) progress = 95;

    return progress;
  };

  // Move hook calls BEFORE any conditional returns to follow Rules of Hooks
  const serviceItem = order?.items?.find(item => item.itemType === 'service') || order?.items?.[0];
  const serviceIdToFetch = typeof serviceItem?.itemId === 'object' ? serviceItem?.itemId?._id : serviceItem?.itemId;

  const { data: liveService } = useGetServiceByIdQuery(serviceIdToFetch, {
    skip: !serviceIdToFetch,
  });

  const { data: customerDataResponse } = useGetCustomerByIdQuery(order?.user?._id, {
    skip: !order?.user?._id,
  });
  const customerData = customerDataResponse?.data || {};

  const progress = calculateProgress(order);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount || 0);
  };

  if (isLoading) return <div className="p-6"><LoadingSkeleton /></div>;
  if (isError) return <div className="p-6"><ErrorState error={error} onRetry={refetch} /></div>;
  if (!order) return <div className="p-6 text-center py-16 text-gray-500">Project not found</div>;

  const livePackage = liveService?.packages?.find(p =>
    p.name?.toLowerCase() === serviceItem?.selectedPackage?.name?.toLowerCase()
  );

  const displayPackage = livePackage || serviceItem?.selectedPackage;

  const dynamicDeadline = (() => {
    if (order.revisionDeadline) return order.revisionDeadline;

    // Find the 'delivered' status in the timeline
    const deliveryEvent = order.timeline?.find(e => e.status === 'delivered');
    const deliveryDate = deliveryEvent?.timestamp;

    if (!displayPackage?.revisionWindow || !deliveryDate) return null;

    const { duration, unit } = displayPackage.revisionWindow;
    const deadline = new Date(deliveryDate);
    const num = Number(duration);
    if (isNaN(num)) return null;
    switch (unit) {
      case 'days': deadline.setDate(deadline.getDate() + num); break;
      case 'weeks': deadline.setDate(deadline.getDate() + num * 7); break;
      case 'months': deadline.setMonth(deadline.getMonth() + num); break;
      case 'years': deadline.setFullYear(deadline.getFullYear() + num); break;
      default: deadline.setDate(deadline.getDate() + num);
    }
    return deadline.toISOString();
  })();

  const serviceName = serviceItem?.title || 'Unknown Service Project';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/admin/marketplace/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{serviceName}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                {order.status?.replace('_', ' ')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Project ID: #{order._id.substring(order._id.length - 8).toUpperCase()} • Client: {order.billing?.firstName} {order.billing?.lastName}
            </p>
          </div>
          <PremiumButton onClick={() => setActiveTab('messages')} label="Message Client" icon={MessageSquare} />
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Clock },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'files', label: 'Files', icon: FileText },
            { id: 'activity', label: 'Phase Activity', icon: HistoryIcon },
            { id: 'client', label: 'Client Details', icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${activeTab === tab.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === 'activity' && order.requirementsData?.status === 'submitted' && <span className="h-2 w-2 rounded-full bg-red-500" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
            {/* Mission Trajectory */}
            <div className="w-full bg-white dark:bg-gray-900/60 rounded-[2.5rem] shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 pt-10 pb-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-transparent to-purple-50/10 opacity-50" />
               <div className="relative z-10">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" /> Mission Trajectory
                      </h3>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-2 border-l-2 border-blue-500 pl-3">Initiated: {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                       <span className="text-4xl font-black text-gray-900 dark:text-gray-100">{progress}%</span>
                       <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Completion</p>
                    </div>
                  </div>

                  <div className="relative w-full mt-12 pb-4">
                    <svg viewBox="0 0 1000 160" className="w-full h-auto overflow-visible">
                      <path d="M 50,110 Q 500,20 950,110" fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 50,110 Q 500,20 950,110" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: '950', strokeDashoffset: `${950 - (getActivePhaseIndex(order) / (PHASES.length - 1)) * 950}`, transition: 'stroke-dashoffset 1.5s ease' }} />
                      {PHASES.map((ph, idx) => {
                         const t = idx / (PHASES.length - 1);
                         const x = Math.pow(1-t, 2)*50 + 2*(1-t)*t*500 + Math.pow(t, 2)*950;
                         const y = Math.pow(1-t, 2)*110 + 2*(1-t)*t*20 + Math.pow(t, 2)*110;
                         const activeIdx = getActivePhaseIndex(order);
                         const isComp = idx < activeIdx || order.status === 'completed';
                         const isCurr = idx === activeIdx && order.status !== 'completed';
                         return (
                           <g key={ph.id}>
                             <circle cx={x} cy={y} r={isCurr ? "10" : "6"} fill={isComp || isCurr ? (isCurr ? "#3b82f6" : "#8b5cf6") : "#e5e7eb"} stroke="white" strokeWidth="2" />
                             {isCurr && (
                                <circle cx={x} cy={y} r="16" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-ping" opacity="0.6" style={{ transformOrigin: `${x}px ${y}px` }} />
                             )}
                             <text x={x} y={y + 35} textAnchor="middle" fill="currentColor" className={`text-[9px] font-black tracking-tighter ${isComp || isCurr ? "text-gray-900 dark:text-gray-100" : "text-gray-400"}`}>{ph.label}</text>
                           </g>
                         );
                      })}
                    </svg>
                  </div>
               </div>
            </div>

            {/* Bottom Details Grid (Matching Client Side 8-4 Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
               {/* Timeline & Activity (Left 2/3) */}
               <div className="lg:col-span-2 space-y-8">
                  <AdminProjectTimeline order={order} refetch={refetch} />
                  <ServicePhaseHistory timeline={order.timeline} />
               </div>

               {/* Sidebar Stats (Right 1/3) - 1:1 Content Sync with Client Side */}
               <div className="space-y-6">
                  {/* Project Stats Card */}
                  <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-6 shadow-sm">
                     <h3 className="text-sm font-bold text-gray-100 tracking-widest mb-6">Project Stats</h3>
                     <div className="space-y-4">
                        {/* Overall Progress */}
                        <div className="space-y-2 pb-3 border-b border-gray-800/50">
                           <div className="flex justify-between items-center text-[10px] font-bold tracking-widest">
                              <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                              <span className="text-white">{progress}%</span>
                           </div>
                           <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                           </div>
                        </div>

                        {/* Start Date */}
                        <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Start Date</span>
                           <span className="text-xs font-black text-white">{formatDate(order.createdAt)}</span>
                        </div>

                        {/* Est. Delivery */}
                        <div className="flex justify-between items-start py-2 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Est. Delivery</span>
                           <div className="text-right">
                              <span className="text-xs font-black text-red-500">{formatDate(order.estimatedDelivery)}</span>
                              {(() => {
                                 const diff = Math.ceil((new Date() - new Date(order.estimatedDelivery)) / (1000 * 60 * 60 * 24));
                                 return diff > 0 ? (
                                    <p className="text-[9px] font-black text-red-500 tracking-tighter mt-0.5">Delayed by {diff} days</p>
                                 ) : null;
                              })()}
                           </div>
                        </div>

                        {/* Total Amount */}
                        <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Total Amount</span>
                           <span className="text-sm font-black text-white">{formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}</span>
                        </div>

                        {/* Payment Status */}
                        <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Payment Status</span>
                           <span className={`text-[10px] font-black capitalize ${order.payment?.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                              {order.payment?.status || 'pending'}
                           </span>
                        </div>

                         {/* Revisions Used */}
                        <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Revisions Used</span>
                           <span className="text-xs font-black text-white">
                              {order.revisionsUsed || 0} / {
                                 displayPackage?.revisions === -1 || displayPackage?.revisions === 'Unlimited'
                                 ? '∞'
                                 : displayPackage?.revisions || 0
                              }
                           </span>
                        </div>

                        {/* Revision Deadline */}
                        <div className="flex justify-between items-start py-2">
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-widest">Revision Deadline</span>
                           <div className="text-right">
                              {dynamicDeadline ? (
                                 <>
                                    <span className="text-xs font-black text-blue-400">{formatDate(dynamicDeadline)}</span>
                                    {(() => {
                                       const diff = Math.ceil((new Date(dynamicDeadline) - new Date()) / (1000 * 60 * 60 * 24));
                                       return diff > 0 ? (
                                          <p className="text-[9px] font-black text-gray-500 tracking-tighter mt-0.5">Revisions end in {diff} days</p>
                                       ) : (
                                          <p className="text-[9px] font-black text-red-500 tracking-tighter mt-0.5">Window Expired</p>
                                       );
                                    })()}
                                 </>
                              ) : (
                                 <span className="text-xs font-black text-gray-400 whitespace-nowrap">
                                    {order.timeline?.some(e => e.status === 'delivered') ? 'N/A' : 'Pending Delivery'}
                                 </span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Order Items Card */}
                  {order.items && order.items.length > 0 && (
                     <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-100 tracking-widest mb-6">Order Items</h3>
                        <div className="space-y-4">
                           {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-800/50 last:border-0">
                                 <div>
                                    <p className="text-sm font-black text-white">{item.title}</p>
                                     <p className="text-[10px] text-gray-600 dark:text-gray-400 capitalize font-black">{item.itemType}</p>
                                 </div>
                                 <span className="text-sm font-black text-white">{formatCurrency(item.price, order.payment?.amount?.currency)}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Package Details Card */}
                  <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-6 shadow-sm">
                     <h3 className="text-sm font-bold text-gray-100 tracking-widest mb-6">Package Details</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-500 tracking-widest">Package</span>
                           <span className="text-[10px] font-black capitalize bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
                              {displayPackage?.name || 'Standard'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-500 tracking-widest">Support Window</span>
                           <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              {displayPackage?.revisionWindow?.duration || 1} {displayPackage?.revisionWindow?.unit || 'Months'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-800/50">
                           <span className="text-[10px] font-bold text-gray-500 tracking-widest">Delivery Time</span>
                           <span className="text-xs font-black text-white">{displayPackage?.deliveryTime || 7} Days</span>
                        </div>

                        {((liveService?.features || []).length > 0 || (displayPackage?.features || []).length > 0) && (
                           <div className="pt-4 space-y-3">
                              <h4 className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">Included Features</h4>
                              <div className="space-y-2.5">
                                 {[...(liveService?.features || []), ...(displayPackage?.features || [])].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 group">
                                       <div className="mt-0.5 h-4 w-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                                          <Check className="h-2.5 w-2.5 text-green-500" />
                                       </div>
                                       <span className="text-[11px] font-medium text-gray-300 leading-tight">
                                          {typeof feature === 'string' ? feature : feature.name}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'client' && (
           <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Primary Contact Card */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-8 shadow-sm">
                 <div className="flex items-center gap-4 mb-8">
                    {order.user?.avatar?.url ? (
                       <img src={order.user.avatar.url} alt="Client Avatar" className="h-14 w-14 rounded-full object-cover border-2 border-blue-500/30" />
                    ) : (
                       <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                          <CircleUserRound className="h-7 w-7 text-blue-500" />
                       </div>
                    )}
                    <div>
                       <h3 className="text-xl font-bold text-white">{order.billing?.firstName} {order.billing?.lastName}</h3>
                       <p className="text-xs text-blue-400 font-bold tracking-widest uppercase mt-0.5">Primary Contact</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <Mail className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                          <a href={`mailto:${order.billing?.email}`} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
                             {order.billing?.email || 'N/A'}
                          </a>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <Phone className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                          <a href={`tel:${order.billing?.phone}`} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
                             {order.billing?.phone || 'Not provided'}
                          </a>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Marketplace Stats Card */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-8 shadow-sm">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <ShoppingCart className="h-7 w-7 text-emerald-500" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white">Client Metrics</h3>
                       <p className="text-xs text-emerald-400 font-bold tracking-widest uppercase mt-0.5">Marketplace Activity</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <ShoppingCart className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Orders</p>
                          <p className="text-sm font-bold text-white">{customerData?.stats?.totalOrders || 0} Orders</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Lifetime Value</p>
                          <p className="text-sm font-black text-emerald-400 tracking-wider">
                             {formatCurrency(customerData?.stats?.totalSpent || 0, order.payment?.amount?.currency)}
                          </p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Member Since</p>
                          <p className="text-sm font-medium text-white">{formatDate(order.user?.createdAt)}</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Billing Details Card */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-8 shadow-sm">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                       <Building2 className="h-7 w-7 text-purple-500" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white">{order.billing?.company || 'Personal Account'}</h3>
                       <p className="text-xs text-purple-400 font-bold tracking-widest uppercase mt-0.5">Billing Entity</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                          <MapPin className="h-4 w-4 text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Billing Address</p>
                          <div className="text-sm font-medium text-white space-y-1">
                             <p>{order.billing?.address?.street || 'No street provided'}</p>
                             <p>{order.billing?.address?.city || ''}, {order.billing?.address?.state || ''} {order.billing?.address?.zipCode || ''}</p>
                             <p className="text-gray-400 pt-1">{order.billing?.address?.country || ''}</p>
                          </div>
                       </div>
                    </div>

                    {order.billing?.taxId && (
                       <div className="flex items-start gap-4">
                          <div className="mt-0.5 h-8 w-8 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                             <Hash className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">VAT / Tax ID</p>
                             <p className="text-sm font-medium text-white font-mono break-all bg-gray-800/50 px-2 py-0.5 rounded border border-gray-700/50 inline-block">
                                {order.billing.taxId}
                             </p>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === 'messages' && <AdminProjectMessages orderId={order._id} />}
        {activeTab === 'files' && <AdminProjectFiles orderId={order._id} order={order} />}
        {activeTab === 'activity' && <AdminPhaseActivity order={order} refetch={refetch} />}
      </div>
    </motion.div>
  );
};

export default AdminProjectWorkspace;
