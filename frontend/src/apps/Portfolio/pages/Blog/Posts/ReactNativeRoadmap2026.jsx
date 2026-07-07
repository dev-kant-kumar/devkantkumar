import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  RotateCcw,
  Smartphone,
  Tag,
  Trophy,
  User,
  Zap,
  Copy
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import hljs from "highlight.js";

// --- Card Image for Blog Listing Grid ---
export function ReactNativeRoadmapCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0B1120] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800/60 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl ${className}`}>
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {/* Content */}
      <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-500 flex flex-col items-center">
        {/* Glow */}
        <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center gap-3 mb-3 relative">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg">
            <Smartphone size={24} className="text-indigo-400 group-hover:animate-pulse" />
          </div>
          <span className="text-slate-500 font-bold font-mono">2026</span>
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center shadow-lg">
            <Zap size={24} className="text-emerald-400" />
          </div>
        </div>
        <span className="font-black text-slate-200 tracking-wider text-xs uppercase group-hover:text-indigo-300 transition-colors">
          React Native Roadmap
        </span>
      </div>
    </div>
  );
}

// --- Thumbnail Component ---
export function ReactNativeRoadmapThumbnail({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 to-indigo-950 flex items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-indigo-500/10" />
      <div className="relative z-10 flex items-center gap-2">
        <Smartphone size={16} className="text-indigo-400" />
        <span className="text-slate-400 text-xs font-bold font-mono">RN Roadmap 2026</span>
      </div>
    </div>
  );
}

// --- Image helper ---
export function ReactNativeRoadmapFeaturedImage({ className = "" }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img
        src="/images/blog/react-native-roadmap-2026.png"
        alt="React Native 2026 Roadmap"
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </div>
  );
}

// --- Metadata Component ---
function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-indigo-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-400" />
          <span>June 14, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span>15 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-indigo-400" />
          <span>React Native • Expo • Career</span>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Code Editor Component ---
function CodeEditor({ fileName, code, language = "typescript" }) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const trimmedCode = code.trim();

  useEffect(() => {
    try {
      const highlighted = hljs.highlight(trimmedCode, { language }).value;
      setHighlightedCode(highlighted);
    } catch (err) {
      console.error("Highlight error:", err);
      setHighlightedCode(trimmedCode);
    }
  }, [trimmedCode, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(trimmedCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose w-full bg-[#0B0F19] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl my-8">
      {/* Editor Header */}
      <div className="bg-[#0e1320] px-5 py-3 border-b border-slate-800/40 flex items-center justify-between text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2">
          {/* Mac window controls */}
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          {fileName && <span className="ml-4 font-sans text-slate-350 font-semibold tracking-wide">{fileName}</span>}
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors bg-slate-800/40 hover:bg-slate-800/80 px-2.5 py-1.5 rounded-md border border-slate-700/30 cursor-pointer text-xs font-sans font-medium"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      
      {/* Editor Content */}
      <div className="p-5 overflow-x-auto bg-[#070b13]/40 text-sm font-mono leading-7 text-slate-300">
        <pre className="m-0 flex">
          {/* Line numbers */}
          <div 
            className="text-slate-600 text-right pr-4 select-none border-r border-slate-800/40 hidden sm:block"
            style={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'inherit' }}
          >
            {trimmedCode.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <code 
            className={`!pl-8 !py-0 whitespace-pre block flex-1 hljs language-${language}`}
            style={{ background: 'transparent', fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'inherit' }}
            dangerouslySetInnerHTML={{ __html: highlightedCode || trimmedCode }}
          />
        </pre>
      </div>
    </div>
  );
}

// --- Interactive Roadmap Component ---
function InteractiveRoadmap() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("rn_roadmap_tasks_v1");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  const [expandedPhases, setExpandedPhases] = useState({
    p1: true, // Auto-open Phase 1
  });

  useEffect(() => {
    localStorage.setItem("rn_roadmap_tasks_v1", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const togglePhase = (id) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTask = (taskId, e) => {
    e.stopPropagation();
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your roadmap progress?")) {
      setCompletedTasks({});
      toast.success("Progress reset successfully!");
    }
  };

  const phases = [
    {
      id: "p1",
      number: 1,
      title: "Foundation - React Native + TypeScript core",
      duration: "Weeks 1–2",
      subtitle: "Every job listing requires this",
      bgColor: "bg-indigo-500/10 border-indigo-500/20",
      numBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      skills: [
        { id: "p1-s1", label: "Core Components", desc: "View, Text, Image, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform", tag: "must" },
        { id: "p1-s2", label: "StyleSheet + Flexbox", desc: "Mobile-first layout, responsive sizing with Dimensions, platform-specific styles", tag: "must" },
        { id: "p1-s3", label: "TypeScript throughout", desc: "Typed props, typed state, typed navigation params - non-negotiable for 2026 roles", tag: "must" },
        { id: "p1-s4", label: "FlatList / FlashList", desc: "Virtualized lists, keyExtractor, renderItem, ListEmptyComponent, pagination", tag: "must" },
      ]
    },
    {
      id: "p2",
      number: 2,
      title: "Navigation - React Navigation v7",
      duration: "Weeks 3–4",
      subtitle: "Asked in every interview",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      numBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      skills: [
        { id: "p2-s1", label: "Stack + Tab + Drawer", desc: "Native Stack, Bottom Tabs, Drawer navigators and how to compose them", tag: "must" },
        { id: "p2-s2", label: "Typed navigation params", desc: "RootStackParamList, useNavigation with generics, typed route params - interviewers love this", tag: "hot" },
        { id: "p2-s3", label: "Deep linking", desc: "URL scheme config, universal links, linking config object", tag: "plus" },
        { id: "p2-s4", label: "Expo Router v7", desc: "File-based routing - new standard in 2026. If you know Next.js routing you already know this", tag: "new" },
      ]
    },
    {
      id: "p3",
      number: 3,
      title: "State management - Redux Toolkit + RTK Query",
      duration: "Weeks 5–6",
      subtitle: "Your current focus - keep going",
      bgColor: "bg-amber-500/10 border-amber-500/20",
      numBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      skills: [
        { id: "p3-s1", label: "Redux Toolkit", desc: "configureStore, createSlice, createAsyncThunk, feature-based folder structure", tag: "must" },
        { id: "p3-s2", label: "RTK Query", desc: "createApi, endpoints, cache invalidation with tags, optimistic updates", tag: "must" },
        { id: "p3-s3", label: "Typed Redux", desc: "RootState, AppDispatch, typed useSelector + useDispatch hooks", tag: "hot" },
        { id: "p3-s4", label: "Zustand (awareness)", desc: "Lightweight alternative - many startups use this. Know when to choose it over RTK", tag: "plus" },
      ]
    },
    {
      id: "p4",
      number: 4,
      title: "Forms + storage + auth",
      duration: "Weeks 7–8",
      subtitle: "Core of every real app",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      numBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      skills: [
        { id: "p4-s1", label: "React Hook Form + Zod", desc: "Controlled vs uncontrolled, schema validation, error display - industry standard combo", tag: "must" },
        { id: "p4-s2", label: "AsyncStorage + SecureStore", desc: "Persisting tokens, user prefs. SecureStore for sensitive data (Expo)", tag: "must" },
        { id: "p4-s3", label: "JWT auth flow", desc: "Login → store token → attach to headers → refresh token on 401 interceptor", tag: "hot" },
        { id: "p4-s4", label: "Expo SecureStore", desc: "Biometric auth, encrypted key-value storage - shows production awareness", tag: "hot" },
      ]
    },
    {
      id: "p5",
      number: 5,
      title: "Performance + animations",
      duration: "Weeks 9–10",
      subtitle: "What separates mid from senior",
      bgColor: "bg-teal-500/10 border-teal-500/20",
      numBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      skills: [
        { id: "p5-s1", label: "FlatList optimization", desc: "getItemLayout, windowSize, removeClippedSubviews, FlashList over FlatList for large lists", tag: "must" },
        { id: "p5-s2", label: "Reanimated 3", desc: "useSharedValue, useAnimatedStyle, withSpring, withTiming - runs on UI thread at 60fps", tag: "new" },
        { id: "p5-s3", label: "Gesture Handler", desc: "Pan, Tap, Swipe gestures with GestureDetector - pairs with Reanimated", tag: "hot" },
        { id: "p5-s4", label: "memo + useCallback", desc: "Preventing re-renders in list items - critical for smooth scrolling on Android", tag: "must" },
      ]
    },
    {
      id: "p6",
      number: 6,
      title: "New architecture + Expo production",
      duration: "Weeks 11–12",
      subtitle: "2026 table stakes - old arch is EOL",
      bgColor: "bg-rose-500/10 border-rose-500/20",
      numBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      skills: [
        { id: "p6-s1", label: "New Architecture (JSI)", desc: "JSI replaces the old bridge. Synchronous native calls. Default since RN 0.76 - old arch EOL March 2026", tag: "new" },
        { id: "p6-s2", label: "Hermes engine", desc: "Default JS engine - bytecode precompilation, faster startup, lower memory. Mandatory with New Arch", tag: "new" },
        { id: "p6-s3", label: "EAS Build + Submit", desc: "Cloud builds for iOS + Android, OTA updates with EAS Update, App Store submission", tag: "hot" },
        { id: "p6-s4", label: "Expo Router v7", desc: "File-based routing now ships with SDK 55. Know layouts, dynamic routes, auth guards", tag: "new" },
      ]
    },
    {
      id: "p7",
      number: 7,
      title: "Testing + tooling + soft skills",
      duration: "Weeks 13–14",
      subtitle: "The final layer that closes offers",
      bgColor: "bg-slate-500/10 border-slate-500/20",
      numBg: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      skills: [
        { id: "p7-s1", label: "Jest + RNTL", desc: "Unit tests for reducers, component tests with React Native Testing Library - basic coverage is enough", tag: "plus" },
        { id: "p7-s2", label: "Git + PR workflow", desc: "Feature branches, clean commits, PR descriptions - remote teams care about this deeply", tag: "must" },
        { id: "p7-s3", label: "English communication", desc: "Written async communication is the #1 soft skill for remote roles - every job listing says this", tag: "must" },
        { id: "p7-s4", label: "Android Studio + Xcode basics", desc: "Reading build logs, running on simulators, understanding Gradle and iOS folder structure", tag: "plus" },
      ]
    }
  ];

  // Calculate totals
  const totalSkills = phases.flatMap(p => p.skills).length;
  const completedSkillsCount = phases.flatMap(p => p.skills).filter(s => completedTasks[s.id]).length;
  const overallProgress = Math.round((completedSkillsCount / totalSkills) * 100);

  // Motivational quote based on progress
  const getMotivation = (pct) => {
    if (pct === 0) return "Ready to start your remote career journey? Check your first skill above! 🎯";
    if (pct < 30) return "Great start! You're building the core foundations of mobile development. 🚀";
    if (pct < 60) return "You're halfway there! Keep coding and building real-world screens. 💪";
    if (pct < 90) return "Fantastic! You are mastering advanced state, animations, and new mobile standards. 🔥";
    if (pct < 100) return "So close! Complete the final layers, polish your profile, and close that offer! 🎓";
    return "Congratulations! You have completed the roadmap! You are 2026 remote job-ready! 🏆🎉";
  };

  const getTagStyle = (tag) => {
    switch(tag) {
      case "must":
        return "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20";
      case "hot":
        return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
      case "new":
        return "bg-amber-500/10 text-amber-300 border border-amber-500/20";
      case "plus":
      default:
        return "bg-slate-800 text-slate-400 border border-slate-700";
    }
  };



  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-950/20 my-10 font-sans">
      
      {/* Legend & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-amber-400 w-5 h-5" />
            Interactive Career Dashboard
          </h3>
          <p className="text-slate-400 text-xs mt-1">Track your progress and copy prompt worksheets locally</p>
        </div>
        <button 
          onClick={resetProgress}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors bg-slate-800/40 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50"
        >
          <RotateCcw size={12} />
          Reset Progress
        </button>
      </div>

      {/* Legend Tags */}
      <div className="flex flex-wrap gap-4 py-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400/80 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></span>
          <span className="text-slate-300 font-medium">must-have</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
          <span className="text-slate-300 font-medium">hiring signal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
          <span className="text-slate-300 font-medium">2026 new standard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
          <span className="text-slate-400">good to have</span>
        </div>
      </div>

      {/* Overall Progress Tracker */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-inner">
        {/* Radial representation for mobile/desktop layout */}
        <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle cx="40" cy="40" r="34" className="stroke-slate-800" strokeWidth="6" fill="transparent" />
            <circle cx="40" cy="40" r="34" 
              className="stroke-indigo-500 transition-all duration-700 ease-out" 
              strokeWidth="6" 
              fill="transparent" 
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - overallProgress / 100)} 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-black text-white leading-none">{overallProgress}%</span>
            <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">Done</span>
          </div>
        </div>
        
        {/* Progress Message */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-md font-bold text-slate-200">Overall Completion Status</h4>
          <p className="text-sm text-indigo-300/95 font-medium mt-1 leading-relaxed">
            {getMotivation(overallProgress)}
          </p>
          <div className="mt-4 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phases Accordion */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.id];
          const phaseSkills = phase.skills;
          const completedInPhase = phaseSkills.filter(s => completedTasks[s.id]).length;
          const phasePct = Math.round((completedInPhase / phaseSkills.length) * 100);

          return (
            <div 
              key={phase.id} 
              className={`border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 ${phase.bgColor} hover:border-slate-700/60`}
            >
              {/* Header */}
              <div 
                onClick={() => togglePhase(phase.id)}
                className="flex items-center gap-4 p-5 cursor-pointer user-select-none select-none"
              >
                <div className={`w-8 h-8 rounded-full ${phase.numBg} flex items-center justify-center font-bold text-xs flex-shrink-0 border`}>
                  {phase.number}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-100 truncate">{phase.title}</h4>
                    <span className="text-xs text-indigo-300/80 font-semibold flex-shrink-0 whitespace-nowrap bg-indigo-950/40 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{phase.subtitle}</p>
                </div>
                
                {/* Arrow & Progress Indicator */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end text-[10px] font-semibold text-slate-400">
                    <span>{completedInPhase}/{phaseSkills.length} SKILLS</span>
                    <span className="text-indigo-400">{phasePct}%</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-500 transition-transform duration-300 ${isExpanded ? "transform rotate-180 text-white" : ""}`} 
                  />
                </div>
              </div>

              {/* Body */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/40">
                  
                  {/* Skills Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {phaseSkills.map((skill) => {
                      const isChecked = !!completedTasks[skill.id];
                      return (
                        <div 
                          key={skill.id}
                          onClick={(e) => toggleTask(skill.id, e)}
                          className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 select-none ${
                            isChecked 
                              ? "bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-500/5" 
                              : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700/60 hover:bg-slate-900/60"
                          }`}
                        >
                          {/* Checkbox Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {isChecked ? (
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white border border-indigo-400">
                                <Check size={12} strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-700 hover:border-slate-500 transition-colors bg-slate-950" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-sm font-bold transition-all ${isChecked ? "text-slate-400 line-through" : "text-slate-100"}`}>
                                {skill.label}
                              </span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${getTagStyle(skill.tag)}`}>
                                {skill.tag === "must" ? "must-have" : skill.tag === "hot" ? "hiring signal" : skill.tag === "new" ? "2026 standard" : "good-to-have"}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">{skill.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* No divider or action footer needed */}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main Blog Component ---
export default function ReactNativeRoadmap2026() {
  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Featured Header Image */}
      <ReactNativeRoadmapFeaturedImage className="mb-0 border-b border-slate-800/50 min-h-[300px] md:min-h-[450px]" />
      
      {/* Metadata Panel */}
      <ArticleMetadata />

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Intro Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-indigo-500/55"></span>
            <span className="text-xs font-black tracking-widest text-indigo-400 uppercase">The 2026 Paradigm Shift</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 leading-tight">
            The Bridgeless Era is Here. <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Are you ready?</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Stat Card 1 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/60 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center mb-4">
                <Clock size={20} className="text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">14-Week Track</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A structured, battle-tested timeline covering foundational setup to production-grade native pipelines.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/60 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center mb-4">
                <Zap size={20} className="text-purple-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Bridgeless JSI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built specifically for standard React Native 0.76+ architecture with synchronous C++ native interface access.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/60 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-4">
                <Trophy size={20} className="text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Remote Careers</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curated around hiring data from top US/European remote teams seeking deep native-first engineering skills.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
              Building cross-platform mobile apps has undergone a massive paradigm shift. The classic asynchronous "bridge" that powered React Native for a decade is officially <span className="text-slate-200 font-semibold underline decoration-indigo-400/50 underline-offset-4">End of Life (EOL) as of March 2026</span>. It has been replaced entirely by direct, synchronous native access via the <span className="text-indigo-400 font-bold">JavaScript Interface (JSI)</span>.
            </p>
            <p>
              For developers aiming to land remote roles, the bar has risen. Recruiters are no longer looking for "web developers who write a bit of CSS for mobile." They require deep mobile-first optimization, custom TypeScript compilation configurations, React Navigation v7 routing, and native Xcode/Gradle build tool experience.
            </p>
            <p>
              This roadmap maps out the exact track to become production-ready. Use the <strong className="text-white">interactive career dashboard below</strong> to audit your skills, check off milestones, and grab study worksheets as you progress.
            </p>
          </div>
        </div>

        {/* Interactive Checklist Dashboard */}
        <InteractiveRoadmap />

        {/* Deep Dive Article Content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-16 mt-16 blog-content">
          
          {/* Section 1 */}
          <section id="phase-1-foundation" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-indigo-400 font-mono">01.</span>
              Foundation - React Native & TypeScript Core
            </h2>
            
            <p>
              In the early weeks, your main objective is mastering <span className="text-emerald-400 font-extrabold">mobile-first rendering mechanics</span>. On mobile, layouts do not work like web browsers. There is no grid system, document-based text flow, or inherited styling sheet. Everything in React Native revolves around a restricted subset of <span className="text-indigo-400 font-extrabold">Flexbox</span> implemented on top of Facebook's Yoga engine.
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Key Technical Shifts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Viewport Constraints:</strong> Always style components responsively using relative units or the <code>useWindowDimensions()</code> hook. Hardcoded sizing is the number-one reason apps fail QA on small screens (e.g., iPhone SE) or tablets.
              </li>
              <li>
                <strong>Keyboard Layouts:</strong> Input screens must use <code>KeyboardAvoidingView</code> with platform-specific offsets (using <code>Platform.select()</code>) to prevent the virtual keyboard from covering inputs.
              </li>
              <li>
                <strong>FlashList Over FlatList:</strong> Shopify's <code>@shopify/flashlist</code> has replaced standard <code>FlatList</code> for large scroll lists. It recycles layout views rather than garbage-collecting them, achieving consistent 60 FPS scrolling on lower-end Android devices.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Recruiter Talking Point</h3>
            <div className="bg-slate-900/50 border-l-4 border-indigo-500 p-5 rounded-r-2xl my-6">
              <p className="text-sm italic text-slate-300">
                "In interviews, don't just say you know how to display lists. Explain <strong>cell recycling</strong>. Point out how FlashList reuses cell components under the hood, eliminating constant JS garbage collection spikes, which is a major source of frame drops on Android."
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="phase-2-navigation" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-mono">02.</span>
              Navigation Architecture - React Navigation v7 & Expo Router
            </h2>
            
            <p>
              Navigation is the backbone of mobile UX. In 2026, standard apps rely heavily on file-system layouts powered by <span className="text-teal-400 font-extrabold">Expo Router v7</span>, which translates file structures into the underlying native navigators of <span className="text-emerald-400 font-extrabold">React Navigation v7</span>. 
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">TypeScript Params Definition</h3>
            <p>
              A common hiring signal is writing strongly-typed navigation params. If navigators are not typed, passing dynamic IDs across screens quickly leads to runtime exceptions. Here is the standard way to type navigators:
            </p>

            <CodeEditor 
              fileName="types/navigation.ts" 
              code={`import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: string; category: string };
  Profile: { userId: string };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;`}
            />

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Deep Linking & Universal Links</h3>
            <p>
              In 2026, apps must support opening specific routes directly from a web link or email (Universal Links on iOS, App Links on Android). Senior developers understand how to map incoming path domains to nested stacks using custom linking configuration objects.
            </p>
          </section>

          {/* Section 3 */}
          <section id="phase-3-state" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-amber-400 font-mono">03.</span>
              Data Fetching & State - RTK Query & Zustand
            </h2>
            
            <p>
              For global UI state (like themes, user sessions, active filters), startups prefer lightweight stores like <span className="text-teal-400 font-extrabold">Zustand</span>. However, for remote enterprise work, <span className="text-indigo-400 font-extrabold">Redux Toolkit (RTK)</span> paired with <span className="text-indigo-400 font-extrabold">RTK Query</span> remains the dominant stack. 
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Caching & Optimistic Updates</h3>
            <p>
              Mobile network conditions are volatile. The app must feel instant, regardless of latency. RTK Query excels here through its automatic cache tags and <span className="text-emerald-400 font-extrabold">optimistic updates</span> support-allowing the UI to instantly reflect a toggled transaction status before the server responds:
            </p>

            <CodeEditor 
              fileName="store/apiSlice.ts" 
              code={`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    toggleTransaction: builder.mutation<void, { id: string; completed: boolean }>({
      query: ({ id }) => ({ url: \`transactions/\${id}\`, method: 'POST' }),
      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          transactionApi.util.updateQueryData('getTransactions', undefined, (draft) => {
            const item = draft.find(t => t.id === id);
            if (item) item.completed = completed;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),
  }),
});`}
            />
          </section>

          {/* Section 4 */}
          <section id="phase-4-auth" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-blue-400 font-mono">04.</span>
              Forms, Native Storage & JWT Auth
            </h2>
            
            <p>
              Handling user input and sensitive authentication credentials requires specialized storage mechanisms. Standard web <code>localStorage</code> does not exist on mobile. Instead, unencrypted key-value pairs are stored via <strong>AsyncStorage</strong>, while private tokens/keys require hardware-encrypted systems like iOS Keychain and Android Keystore (wrapped by Expo's <strong>SecureStore</strong>).
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">JWT Interception Flow</h3>
            <p>
              A robust JWT structure involves holding a short-lived access token in memory and a secure refresh token in <code>SecureStore</code>. When an access token expires, Axios interceptors or RTK Query base queries must catch the 401 response, request a new token, update the state, and seamlessly replay the failed request.
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Validation with Hook Form & Zod</h3>
            <p>
              Using controlled components with simple React state creates slow typing responses on low-spec Android devices due to constant re-renders across the bridge. The solution is <span className="text-teal-400 font-extrabold">React Hook Form</span>, which handles input state un-controlled, validating against a <span className="text-amber-400 font-extrabold">Zod</span> schema only when triggered.
            </p>
          </section>

          {/* Section 5 */}
          <section id="phase-5-performance" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-teal-400 font-mono">05.</span>
              Performance Tuning & Reanimated 3
            </h2>
            
            <p>
              UI fluidness is the divider between mid-level and senior engineers. If gestures and animations are handled on the main <span className="text-rose-400 font-extrabold">JavaScript thread</span>, any heavy network fetch or database write will block the thread, leading to visual freezing (jank).
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Reanimated Worklets</h3>
            <p>
              <strong>React Native Reanimated 3</strong> solves this by using "worklets"-small JavaScript functions that are serialized and compiled to run directly on the native <span className="text-indigo-400 font-extrabold">UI thread</span>. Since they run independently, your animations will remain at 60/120 FPS even if the <span className="text-rose-400 font-extrabold">JS thread</span> is fully blocked.
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">List Performance Tuning</h3>
            <p>
              For lists, always set <code>getItemLayout</code> when cell heights are constant. This prevents the list from dynamically recalculating heights during scroll, saving valuable CPU cycles.
            </p>
          </section>

          {/* Section 6 */}
          <section id="phase-6-architecture" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-rose-400 font-mono">06.</span>
              The New Architecture (JSI) & EAS Pipelines
            </h2>
            
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 my-6 flex items-start gap-4">
              <AlertTriangle className="text-amber-400 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-md font-bold text-amber-200">The March 2026 Shift</h4>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Historically, JavaScript and Native (C++/Java/Objective-C) layers communicated via asynchronous JSON messaging over "the Bridge". In modern React Native (default since 0.76, old bridge EOL March 2026), the <strong>JavaScript Interface (JSI)</strong> allows JS code to hold direct C++ references to native objects. The communication is now synchronous, eliminating serialization bottlenecks entirely.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">EAS (Expo Application Services)</h3>
            <p>
              Understanding EAS is critical for modern delivery. You should know how to configure <code>eas.json</code> to compile your app on Expo's cloud servers, manage Apple/Android provisioning profiles, and dispatch Over-The-Air (OTA) bug fixes using <code>EAS Update</code>.
            </p>
          </section>

          {/* Section 7 */}
          <section id="phase-7-testing" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-slate-400 font-mono">07.</span>
              Testing & Native Build Systems
            </h2>
            
            <p>
              The final week focuses on robust testing and native troubleshooting. The biggest bottleneck in remote work is dependency mismatching when native compilation fails in Gradle or Xcode. 
            </p>

            <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3">Troubleshooting Native Logs</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Android builds:</strong> Open the <code>android/</code> directory in Android Studio. Inspect Gradle console outputs and fix dependency duplicate class errors.
              </li>
              <li>
                <strong>iOS builds:</strong> Open the <code>ios/</code> directory inside Xcode. Inspect compilation errors in the build log tab, manage Podfiles, and handle cocoapods cache invalidation.
              </li>
              <li>
                <strong>Component Testing:</strong> Write unit and integration tests using Jest and <code>@testing-library/react-native</code> to mock native dependencies (like safe-area contexts or AsyncStorage) using Jest mock APIs.
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section id="roadmap-faqs" className="scroll-mt-24 border-t border-slate-800 pt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
                <h4 className="font-bold text-slate-100 mb-2">Can I learn React Native without knowing React?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  It is not recommended. React Native relies on React paradigms such as rendering schedules, states, memoization, and hooks. Spend at least 2 weeks understanding React web basics before transitioning to mobile.
                </p>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
                <h4 className="font-bold text-slate-100 mb-2">Is the old bridge completely dead?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Yes, for modern projects. React Native 0.76 turned on the New Architecture by default, and legacy bridge support is deprecated and phased out completely as of March 2026. All new projects should target the JSI-based architecture.
                </p>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
                <h4 className="font-bold text-slate-100 mb-2">Should I learn Swift or Java alongside React Native?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You don't need to write them fluently initially, but you must be able to read Gradle/Xcode configurations, manage build configurations, and implement small bridging scripts (TurboModules or Config Plugins) to access native APIs.
                </p>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

// Attach metadata to component
ReactNativeRoadmap2026.FeaturedImage = ReactNativeRoadmapFeaturedImage;
ReactNativeRoadmap2026.ThumbnailImage = ReactNativeRoadmapThumbnail;
ReactNativeRoadmap2026.CardImage = ReactNativeRoadmapCardImage;
ReactNativeRoadmap2026.Image = ReactNativeRoadmapCardImage;

ReactNativeRoadmap2026.info = {
  id: "react-native-roadmap-2026",
  slug: "react-native-roadmap-2026",
  title: "React Native Job-Ready Roadmap 2026",
  excerpt: "The complete 14-week interactive roadmap to land high-paying remote React Native roles in 2026. Focuses on the New Architecture, Expo Router v7, and performance optimization.",
  description: "Master React Native in 14 weeks. Follow our interactive roadmap covering JSI, React Navigation v7, RTK Query, and Reanimated 3.",
  category: "React Native",
  author: "Dev Kant Kumar",
  readTime: "15 min read",
  image: "/images/blog/react-native-roadmap-2026.png",
  featuredImage: "/images/blog/react-native-roadmap-2026.png",
  featured: true,
  publishDate: "2026-06-14",
  modifiedDate: "2026-06-14",
  keywords: "react native roadmap 2026, react native career guide, learn react native expo, react navigation v7 typescript, react native remote jobs, react native new architecture jsi, expo router v7 tutorial, shopify flashlist guide, mobile developer roadmap",
  tags: [
    "react-native",
    "expo",
    "mobile-development",
    "typescript",
    "redux-toolkit",
    "reanimated",
    "software-architecture",
    "career-roadmap"
  ],
  faqs: [
    {
      question: "Can I learn React Native without knowing React?",
      answer: "It is not recommended. React Native relies on React paradigms such as rendering schedules, states, memoization, and hooks. Spend at least 2 weeks understanding React web basics before transitioning to mobile."
    },
    {
      question: "Is the old bridge completely dead?",
      answer: "Yes, for modern projects. React Native 0.76 turned on the New Architecture by default, and legacy bridge support is deprecated and phased out completely as of March 2026. All new projects should target the JSI-based architecture."
    },
    {
      question: "Should I learn Swift or Java alongside React Native?",
      answer: "You don't need to write them fluently initially, but you must be able to read Gradle/Xcode configurations, manage build configurations, and implement small bridging scripts (TurboModules or Config Plugins) to access native APIs."
    }
  ]
};
