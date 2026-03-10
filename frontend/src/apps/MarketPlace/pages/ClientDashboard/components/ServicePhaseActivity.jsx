import { motion } from 'framer-motion';
import {
    Activity,
    Bug,
    CheckCircle,
    ClipboardList,
    Clock,
    Cpu,
    FileText,
    Globe,
    History as HistoryIcon,
    Layout,
    Link2,
    MessageSquare,
    Palette,
    RefreshCw,
    Rocket,
    ShieldCheck,
    Target
} from 'lucide-react';
import { useState } from 'react';
import ServiceRequirements from './ServiceRequirements';

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

const PHASES = [
  { id: 'requirements_gathering', label: 'Requirements', icon: ClipboardList, weight: 10 },
  { id: 'legal_documentation', label: 'Legal', icon: ShieldCheck, weight: 5 },
  { id: 'planning_scoping', label: 'Planning', icon: Target, weight: 10 },
  { id: 'design', label: 'Design', icon: Palette, weight: 15 },
  { id: 'development', label: 'Dev', icon: Cpu, weight: 25 },
  { id: 'testing_qa', label: 'Testing', icon: Bug, weight: 10 },
  { id: 'delivery', label: 'Delivery', icon: Rocket, weight: 10 },
  { id: 'revision_window', label: 'Revisions', icon: RefreshCw, weight: 10 },
  { id: 'support_window', label: 'Support', icon: MessageSquare, weight: 5 },
];

const ServicePhaseActivity = ({ order, liveService }) => {
  const reqData = order?.requirementsData || {};
  const status = reqData?.status || 'pending';
  const isPending = status === 'pending';
  const isApproved = status === 'approved';
  const isChangesRequested = status === 'changes_requested';
  const isSubmitted = status === 'submitted' || status === 'resubmitted';
  const responsesFromOrder = reqData?.responses || [];

  const currentPhase = order?.currentPhase || 'requirements_gathering';
  const [activeSubPhase, setActiveSubPhase] = useState(currentPhase);
  const [activeSubTab, setActiveSubTab] = useState('input'); // 'input' or 'output'

  // Filter timeline for phase completions
  const activityHistory = [...(order?.timeline || [])].reverse();

  // Helper to categorize timeline events by phase keywords
  const getEventsForPhase = (phaseId) => {
    const keywords = {
      requirements_gathering: ['requirement', 'responses', 'initiation', 'brief'],
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
      const status = entry.status?.toLowerCase() || '';
      return phaseKeywords.some(kw => msg.includes(kw) || status.includes(kw));
    });
  };

  const currentPhaseEvents = getEventsForPhase(activeSubPhase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 1st Level: Phase Navigation Bar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2 flex overflow-x-auto no-scrollbar gap-4">
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
              className={`
                flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border group
                ${isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 scale-105 z-10'
                  : 'text-slate-400 dark:text-slate-500 bg-transparent border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/50'
                }
                ${isCurrent && !isActive ? 'ring-2 ring-blue-500 ring-offset-2 !border-transparent bg-transparent' : ''}
              `}
            >
              <div className={`
                h-8 w-8 rounded-xl flex items-center justify-center transition-colors
                ${isActive
                  ? 'bg-white/10'
                  : (isCompleted
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-gray-700 group-hover:text-slate-600')}
              `}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : <phase.icon className="h-4 w-4" />}
              </div>
              {phase.label}
              {isCurrent && (
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2nd Level: Section Tabs (Input/Output) */}
      <div className="flex border-b border-slate-100 gap-8 px-4">
        <button
          onClick={() => setActiveSubTab('input')}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2
            ${activeSubTab === 'input'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'}
          `}
        >
          Phase Inputs
        </button>
        <button
          onClick={() => setActiveSubTab('output')}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2
            ${activeSubTab === 'output'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'}
          `}
        >
          Phase Deliverables
        </button>
      </div>

      {/* Main Phase Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className={`p-8 flex items-center justify-between ${activeSubPhase === currentPhase ? 'bg-blue-600' : 'bg-slate-900'} text-white`}>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                  {(() => {
                    const PhaseIcon = PHASES.find(p => p.id === activeSubPhase)?.icon;
                    return PhaseIcon ? <PhaseIcon className="h-7 w-7" /> : null;
                  })()}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                    {activeSubTab === 'input' ? 'Objective & Brief' : 'Results & Files'}
                  </h3>
                  <p className="text-2xl font-black">{PHASES.find(p => p.id === activeSubPhase)?.label}</p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
                   ${activeSubPhase === currentPhase ? 'bg-white text-blue-600 border-white' :
                     (PHASES.findIndex(p => p.id === activeSubPhase) < PHASES.findIndex(p => p.id === currentPhase)
                       ? 'bg-green-500 text-white border-green-500'
                       : 'bg-white/10 text-white border-white/20')}
                 `}>
                   {activeSubPhase === currentPhase ? 'In Progress' :
                    (PHASES.findIndex(p => p.id === activeSubPhase) < PHASES.findIndex(p => p.id === currentPhase)
                      ? 'Completed' : 'Upcoming')}
                 </span>
              </div>
            </div>

            <div className="p-8">
              {activeSubTab === 'input' ? (
                /* Input Section Content */
                activeSubPhase === 'requirements_gathering' ? (
                  <div>
                    {(isPending || isChangesRequested) && activeSubPhase === currentPhase ? (
                      <ServiceRequirements order={order} liveService={liveService} />
                    ) : (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                           <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <Activity className="h-4 w-4" /> Mission Scope & Vision
                           </h4>
                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">Approved at Project Start</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {responsesFromOrder.map((resp, idx) => {
                            const Icon = getQuestionIcon(resp.question);
                            return (
                              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-600">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">{resp.question}</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">"{resp.answer}"</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                         <Layout className="h-10 w-10 text-slate-300" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Phase Documentation</h4>
                      <p className="text-sm text-slate-500 mt-2 max-w-sm">Detailed inputs and brief for this phase will appear here as the project progresses.</p>
                      <button className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                        Download Phase Brief
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Output Section Content */
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <HistoryIcon className="h-4 w-4" /> Accomplishments
                    </h4>
                  </div>

                  <div className="space-y-6">
                    {currentPhaseEvents.length > 0 ? (
                      currentPhaseEvents.map((entry, idx) => (
                        <div key={idx} className="relative pl-8">
                          {idx !== currentPhaseEvents.length - 1 && (
                            <div className="absolute left-[0.25rem] top-6 w-px h-full bg-slate-100" />
                          )}
                          <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-50" />
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(entry.timestamp).toLocaleDateString()}</span>
                              {entry.deliverableUrl && (
                                <a href={entry.deliverableUrl} target="_blank" rel="noreferrer" className="text-[10px] font-black text-blue-600 hover:underline">ACCESS FILE</a>
                              )}
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">{entry.message}</p>
                            {entry.notes && (
                              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl italic">"{entry.notes}"</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                         <Clock className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose text-center">No results<br/>logged yet</p>
                         <p className="text-[10px] text-slate-400 mt-4 max-w-[200px] mx-auto opacity-60 italic">Deliverables will be accessible here once uploaded by the admin team.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats/Impact Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Activity className="h-40 w-40" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/90">Project Impact</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black">{PHASES.find(p => p.id === activeSubPhase)?.weight}%</span>
                <span className="text-sm font-bold text-white/90">Progress Weight</span>
              </div>
              <p className="text-xs mt-6 leading-relaxed opacity-80">Completion of this phase significantly advances the mission trajectory.</p>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Phase Readiness</span>
                   <span className="text-xs font-black">
                     {PHASES.findIndex(p => p.id === activeSubPhase) < PHASES.findIndex(p => p.id === currentPhase) ? '100%' :
                      PHASES.findIndex(p => p.id === activeSubPhase) === PHASES.findIndex(p => p.id === currentPhase) ? '5%' : '0%'}
                   </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: PHASES.findIndex(p => p.id === activeSubPhase) < PHASES.findIndex(p => p.id === currentPhase) ? '100%' :
                              PHASES.findIndex(p => p.id === activeSubPhase) === PHASES.findIndex(p => p.id === currentPhase) ? '5%' : '0%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicePhaseActivity;
