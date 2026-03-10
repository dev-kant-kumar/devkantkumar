import { motion } from "framer-motion";
import {
  Activity,
  Bug,
  CheckCircle,
  ClipboardList,
  Clock,
  Cpu,
  Download,
  FileText,
  Globe,
  Link2,
  MessageSquare,
  Palette,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useState } from "react";
import ServiceRequirements from "./ServiceRequirements";

// Question icon mapper for rich display
const QUESTION_ICONS = {
  "project description": FileText,
  description: FileText,
  goals: Target,
  "goals & objectives": Target,
  objectives: Target,
  "target audience": Globe,
  audience: Globe,
  references: Link2,
  "references & links": Link2,
  links: Link2,
};

const getQuestionIcon = (question) => {
  const lowerQ = question?.toLowerCase() || "";
  for (const [key, Icon] of Object.entries(QUESTION_ICONS)) {
    if (lowerQ.includes(key)) return Icon;
  }
  return ClipboardList;
};

const ICON_COLORS = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-orange-500",
];

const PHASES = [
  {
    id: "requirements_gathering",
    label: "Requirements",
    icon: ClipboardList,
    weight: 10,
  },
  { id: "legal_documentation", label: "Legal", icon: ShieldCheck, weight: 5 },
  { id: "planning_scoping", label: "Planning", icon: Target, weight: 10 },
  { id: "design", label: "Design", icon: Palette, weight: 15 },
  { id: "development", label: "Dev", icon: Cpu, weight: 25 },
  { id: "testing_qa", label: "Testing", icon: Bug, weight: 10 },
  { id: "delivery", label: "Delivery", icon: Rocket, weight: 10 },
  { id: "revision_window", label: "Revisions", icon: RefreshCw, weight: 10 },
  { id: "support_window", label: "Support", icon: MessageSquare, weight: 5 },
];

// Client-facing phase descriptions
const CLIENT_PHASE_INFO = {
  legal_documentation: {
    title: "Legal & Agreements",
    clientNote:
      "Your project is protected by formal legal agreements. Please review and sign any documents shared with you promptly.",
    whatToExpect: [
      "Non-Disclosure Agreement (NDA) will be shared for review and signature",
      "Statement of Work (SOW) defining the exact scope and deliverables",
      "Project contract outlining payment terms and timeline",
    ],
    clientAction:
      "Sign all documents and return them as soon as possible to keep your project on schedule.",
  },
  planning_scoping: {
    title: "Planning & Scoping",
    clientNote:
      "Your project is being carefully planned with a detailed roadmap, milestone schedule, and technical architecture.",
    whatToExpect: [
      "A comprehensive Scope of Work document will be shared for your approval",
      "Project milestones and delivery timeline will be confirmed",
      "Technical architecture and technology choices will be documented",
    ],
    clientAction:
      "Review and approve the scope document to keep the project moving forward.",
  },
  design: {
    title: "Design & UX",
    clientNote:
      "Your project's visual identity and user experience are being crafted. Feedback at this stage shapes the final product.",
    whatToExpect: [
      "Wireframes and initial layouts for your review",
      "High-fidelity Figma mockups of all pages/screens",
      "Design revisions based on your feedback",
    ],
    clientAction: "Provide timely feedback on design concepts to avoid delays.",
  },
  development: {
    title: "Development",
    clientNote:
      "Your project is being actively built based on the approved designs. A staging environment will be shared for your review.",
    whatToExpect: [
      "A staging link where you can preview the project in real-time",
      "Regular progress updates via the Messages tab",
      "Opportunity to provide feedback before final delivery",
    ],
    clientAction:
      "Review the staging build when shared and communicate any concerns early.",
  },
  testing_qa: {
    title: "Testing & Quality Assurance",
    clientNote:
      "Your project is undergoing rigorous quality checks to ensure everything works perfectly before delivery.",
    whatToExpect: [
      "All features tested across multiple browsers and devices",
      "Performance optimization and bug fixes",
      "A QA report confirming the project is delivery-ready",
    ],
    clientAction:
      "No action needed. Sit tight — quality checks are in progress!",
  },
  delivery: {
    title: "Project Delivery",
    clientNote:
      "Your completed project is being prepared for final delivery. You will receive access to all deliverables.",
    whatToExpect: [
      "Final project deployed to your live environment",
      "Complete source code and asset package",
      "Admin credentials, user manuals, and handover documentation",
    ],
    clientAction:
      "Confirm receipt of all deliverables and sign off on completion.",
  },
  revision_window: {
    title: "Revision Window",
    clientNote:
      "Your revision window is now open. Submit any change requests within the agreed timeframe and revisions per your package.",
    whatToExpect: [
      "Your requested changes will be implemented promptly",
      "An updated staging/live link will be shared for review",
      "Revisions are limited to changes within the original project scope",
    ],
    clientAction:
      "Submit all revision requests clearly through the Messages tab.",
  },
  support_window: {
    title: "Post-Launch Support",
    clientNote:
      "Your project is live and within the support window. Report any issues or questions and they will be addressed promptly.",
    whatToExpect: [
      "Bug fixes for any post-launch issues",
      "Minor adjustments within the support scope",
      "Guidance on using and managing your project",
    ],
    clientAction:
      "Report any issues via the Messages tab with as much detail as possible.",
  },
};

const ClientPhaseInputContent = ({
  phaseId,
  currentPhaseIndex,
  activePhaseIndex,
}) => {
  const info = CLIENT_PHASE_INFO[phaseId];
  if (!info) return null;

  const isCompleted = currentPhaseIndex < activePhaseIndex;
  const isUpcoming = currentPhaseIndex > activePhaseIndex;

  return (
    <div className="space-y-6">
      {/* Status banner */}
      {isCompleted && (
        <div className="flex items-center gap-3 px-5 py-3 bg-green-50 border border-green-100 rounded-2xl">
          <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
          <p className="text-xs font-bold text-green-700">
            This phase has been successfully completed.
          </p>
        </div>
      )}
      {isUpcoming && (
        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
          <Clock className="h-4 w-4 text-slate-400 shrink-0" />
          <p className="text-xs font-bold text-slate-500">
            This phase will begin once all previous phases are completed.
          </p>
        </div>
      )}

      {/* Phase note for client */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">
          What's Happening
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          {info.clientNote}
        </p>
      </div>

      {/* What to expect */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          What to Expect
        </p>
        <div className="space-y-2.5">
          {info.whatToExpect.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl"
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isCompleted ? "bg-green-500" : "bg-blue-100"}`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                ) : (
                  <span className="text-[10px] font-black text-blue-600">
                    {idx + 1}
                  </span>
                )}
              </div>
              <p
                className={`text-xs font-semibold leading-relaxed ${isCompleted ? "text-slate-400 line-through" : "text-slate-700"}`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Client action required */}
      {!isCompleted && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">
            Your Action
          </p>
          <p className="text-sm text-amber-800 leading-relaxed">
            {info.clientAction}
          </p>
        </div>
      )}
    </div>
  );
};

const ClientPhaseOutputContent = ({
  phaseId,
  phaseEvents,
  isCurrentPhase,
  phaseIndex,
  currentIndex,
}) => {
  const isCompleted = phaseIndex < currentIndex;
  const isUpcoming = phaseIndex > currentIndex;

  const handleDeliverableDownload = (url, name = "download") => {
    if (!url) return;
    let downloadUrl = url;
    try {
      const parsed = new URL(url);
      if (
        (parsed.hostname === "res.cloudinary.com" ||
          parsed.hostname.endsWith(".cloudinary.com")) &&
        parsed.pathname.includes("/upload/")
      ) {
        downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
      }
    } catch (_) {
      // Not a valid absolute URL — use as-is
    }
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const PHASE_OUTPUT_TITLES = {
    legal_documentation: "Signed Legal Documents",
    planning_scoping: "Project Plan & Scope Document",
    design: "Approved Design Assets",
    development: "Staging Build",
    testing_qa: "QA Report & Sign-off",
    delivery: "Final Delivery Package",
    revision_window: "Revised Deliverables",
    support_window: "Support Activity Log",
  };

  return (
    <div className="space-y-6">
      {isUpcoming && (
        <div className="text-center py-10">
          <Clock className="h-10 w-10 text-slate-200 mx-auto mb-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Deliverables Pending
          </p>
          <p className="text-[10px] text-slate-400 mt-2 max-w-xs mx-auto">
            Outputs for this phase will appear here once work is completed.
          </p>
        </div>
      )}

      {!isUpcoming && phaseEvents.length > 0 && (
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {PHASE_OUTPUT_TITLES[phaseId] || "Phase Deliverables"}
          </p>
          {phaseEvents.map((entry, idx) => (
            <div key={idx} className="relative pl-7">
              {idx !== phaseEvents.length - 1 && (
                <div className="absolute left-[0.2rem] top-6 w-px h-full bg-slate-100" />
              )}
              <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-50" />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  <div className="flex gap-3">
                    {entry.deliverableUrl && (
                      <button
                        onClick={() =>
                          handleDeliverableDownload(entry.deliverableUrl)
                        }
                        aria-label={`Download deliverable from ${new Date(entry.timestamp).toLocaleDateString()}`}
                        className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 hover:underline"
                      >
                        <Download className="h-3 w-3" />
                        DOWNLOAD FILE
                      </button>
                    )}
                    {entry.externalLink && (
                      <a
                        href={entry.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open resource link from ${new Date(entry.timestamp).toLocaleDateString()}`}
                        className="text-[10px] font-black text-indigo-600 hover:underline"
                      >
                        OPEN LINK
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {entry.message}
                </p>
                {entry.notes && (
                  <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl italic">
                    "{entry.notes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isUpcoming && phaseEvents.length === 0 && (
        <div className="text-center py-10">
          <Clock className="h-10 w-10 text-slate-200 mx-auto mb-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
            {isCurrentPhase ? "In Progress" : "No outputs logged yet"}
          </p>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[200px] mx-auto opacity-60 italic">
            Deliverables will be accessible here once uploaded by our team.
          </p>
        </div>
      )}
    </div>
  );
};

const ClientPhaseImpactCard = ({
  phase,
  activeSubPhaseIndex,
  currentPhaseIndex,
  totalPhases,
  completedWeight,
}) => {
  if (!phase) return null;
  const isCompleted = activeSubPhaseIndex < currentPhaseIndex;
  const isCurrent = activeSubPhaseIndex === currentPhaseIndex;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Activity className="h-40 w-40" />
        </div>
        <div className="relative z-10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">
            Phase Weight
          </h4>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{phase.weight}%</span>
            <span className="text-sm font-bold opacity-70">of project</span>
          </div>
          <p className="text-xs mt-4 leading-relaxed opacity-80">
            Completing this phase advances your project by {phase.weight}{" "}
            percentage points toward full completion.
          </p>
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">
                Phase Status
              </span>
              <span className="text-xs font-black">
                {isCompleted ? "✓ Done" : isCurrent ? "Active" : "Upcoming"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: isCompleted ? "100%" : isCurrent ? "60%" : "0%",
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
          Overall Progress
        </h4>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-black text-slate-900">
            {completedWeight}%
          </span>
          <span className="text-xs text-slate-400">of project complete</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completedWeight}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Phase
            </p>
            <p className="text-sm font-black text-slate-900 mt-1">
              {activeSubPhaseIndex + 1} / {totalPhases}
            </p>
          </div>
          <div
            className={`rounded-xl p-3 text-center ${isCompleted ? "bg-green-50" : isCurrent ? "bg-blue-50" : "bg-slate-50"}`}
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Status
            </p>
            <p
              className={`text-xs font-black mt-1 ${isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-slate-400"}`}
            >
              {isCompleted
                ? "Completed"
                : isCurrent
                  ? "In Progress"
                  : "Upcoming"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicePhaseActivity = ({ order, liveService }) => {
  const reqData = order?.requirementsData || {};
  const status = reqData?.status || "pending";
  const isPending = status === "pending";
  const isApproved = status === "approved";
  const isChangesRequested = status === "changes_requested";
  const isSubmitted = status === "submitted" || status === "resubmitted";
  const responsesFromOrder = reqData?.responses || [];

  const currentPhase = order?.currentPhase || "requirements_gathering";
  const [activeSubPhase, setActiveSubPhase] = useState(currentPhase);
  const [activeSubTab, setActiveSubTab] = useState("input"); // 'input' or 'output'

  // Filter timeline for phase completions
  const activityHistory = [...(order?.timeline || [])].reverse();

  // Helper to categorize timeline events by phase keywords
  const getEventsForPhase = (phaseId) => {
    const keywords = {
      requirements_gathering: [
        "requirement",
        "responses",
        "initiation",
        "brief",
      ],
      legal_documentation: ["legal", "nda", "sow", "contract", "signature"],
      planning_scoping: ["plan", "scope", "milestone", "timeline", "estimate"],
      design: ["design", "wireframe", "mockup", "figma", "ui", "ux"],
      development: ["build", "staging", "repo", "dev", "pushed", "deployed"],
      testing_qa: ["test", "bug", "qa", "fix", "performance"],
      delivery: ["deliver", "final", "handover", "completion"],
      revision_window: ["revision", "feedback", "update"],
      support_window: ["support", "ticket", "resolved", "help"],
    };

    const phaseKeywords = keywords[phaseId] || [];
    return activityHistory.filter((entry) => {
      // Primary: direct status match (set by completePhase backend)
      if (entry.status === phaseId) return true;
      // Secondary: keyword fallback for backward compatibility
      const msg = entry.message?.toLowerCase() || "";
      const status = entry.status?.toLowerCase() || "";
      return phaseKeywords.some(
        (kw) => msg.includes(kw) || status.includes(kw),
      );
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
          const phaseIndex = PHASES.findIndex((p) => p.id === phase.id);
          const currentIndex = PHASES.findIndex((p) => p.id === currentPhase);
          const isCompleted = phaseIndex < currentIndex;

          return (
            <button
              key={phase.id}
              onClick={() => setActiveSubPhase(phase.id)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border group
                ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 scale-105 z-10"
                    : "text-slate-400 dark:text-slate-500 bg-transparent border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/50"
                }
                ${isCurrent && !isActive ? "ring-2 ring-blue-500 ring-offset-2 !border-transparent bg-transparent" : ""}
              `}
            >
              <div
                className={`
                h-8 w-8 rounded-xl flex items-center justify-center transition-colors
                ${
                  isActive
                    ? "bg-white/10"
                    : isCompleted
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-gray-700 group-hover:text-slate-600"
                }
              `}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <phase.icon className="h-4 w-4" />
                )}
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
          onClick={() => setActiveSubTab("input")}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2
            ${
              activeSubTab === "input"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }
          `}
        >
          Phase Inputs
        </button>
        <button
          onClick={() => setActiveSubTab("output")}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2
            ${
              activeSubTab === "output"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }
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
            <div
              className={`p-8 flex items-center justify-between ${activeSubPhase === currentPhase ? "bg-blue-600" : "bg-slate-900"} text-white`}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                  {(() => {
                    const PhaseIcon = PHASES.find(
                      (p) => p.id === activeSubPhase,
                    )?.icon;
                    return PhaseIcon ? <PhaseIcon className="h-7 w-7" /> : null;
                  })()}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                    {activeSubTab === "input"
                      ? "Objective & Brief"
                      : "Results & Files"}
                  </h3>
                  <p className="text-2xl font-black">
                    {PHASES.find((p) => p.id === activeSubPhase)?.label}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">
                  Status
                </p>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
                   ${
                     activeSubPhase === currentPhase
                       ? "bg-white text-blue-600 border-white"
                       : PHASES.findIndex((p) => p.id === activeSubPhase) <
                           PHASES.findIndex((p) => p.id === currentPhase)
                         ? "bg-green-500 text-white border-green-500"
                         : "bg-white/10 text-white border-white/20"
                   }
                 `}
                >
                  {activeSubPhase === currentPhase
                    ? "In Progress"
                    : PHASES.findIndex((p) => p.id === activeSubPhase) <
                        PHASES.findIndex((p) => p.id === currentPhase)
                      ? "Completed"
                      : "Upcoming"}
                </span>
              </div>
            </div>

            <div className="p-8">
              {activeSubTab === "input" ? (
                /* Input Section Content */
                activeSubPhase === "requirements_gathering" ? (
                  <div>
                    {(isPending || isChangesRequested) &&
                    activeSubPhase === currentPhase ? (
                      <ServiceRequirements
                        order={order}
                        liveService={liveService}
                      />
                    ) : (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Mission Scope &
                            Vision
                          </h4>
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                            Approved at Project Start
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {responsesFromOrder.map((resp, idx) => {
                            const Icon = getQuestionIcon(resp.question);
                            return (
                              <div
                                key={idx}
                                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-600">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                                    {resp.question}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">
                                  "{resp.answer}"
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Rich phase-specific input content for non-requirements phases */
                  <ClientPhaseInputContent
                    phaseId={activeSubPhase}
                    currentPhaseIndex={PHASES.findIndex(
                      (p) => p.id === activeSubPhase,
                    )}
                    activePhaseIndex={PHASES.findIndex(
                      (p) => p.id === currentPhase,
                    )}
                  />
                )
              ) : (
                /* Phase Deliverables Output */
                <ClientPhaseOutputContent
                  phaseId={activeSubPhase}
                  phaseEvents={currentPhaseEvents}
                  isCurrentPhase={activeSubPhase === currentPhase}
                  phaseIndex={PHASES.findIndex((p) => p.id === activeSubPhase)}
                  currentIndex={PHASES.findIndex((p) => p.id === currentPhase)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Phase Impact Card */}
        <div className="lg:col-span-4 space-y-6">
          <ClientPhaseImpactCard
            phase={PHASES.find((p) => p.id === activeSubPhase)}
            activeSubPhaseIndex={PHASES.findIndex(
              (p) => p.id === activeSubPhase,
            )}
            currentPhaseIndex={PHASES.findIndex((p) => p.id === currentPhase)}
            totalPhases={PHASES.length}
            completedWeight={PHASES.slice(
              0,
              PHASES.findIndex((p) => p.id === currentPhase),
            ).reduce((sum, p) => sum + p.weight, 0)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ServicePhaseActivity;
