import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "../../../store/data/portfolioData";
import ParticleBackground from "../../../common/components/3D/ParticleBackground";
import {
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Database,
  Shield,
  Activity,
  Globe,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Radio,
  Play,
} from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [clockTime, setClockTime] = useState("");

  const {
    personalInfo,
    professionalSummary,
    projects,
    careerObjectives,
    technicalSkills,
  } = portfolioData;

  // Dynamic seek roles and descriptors
  const skills = useMemo(
    () => [
      personalInfo.title,
      personalInfo.subtitle,
      ...careerObjectives.seekingRoles.slice(0, 3),
      "Full Stack Architect",
      "Product Founder",
    ],
    [personalInfo, careerObjectives],
  );

  // Terminal logging messages
  const bootLogs = useMemo(
    () => [
      ">> SYSTEM BOOT SEQUENCE: INITIALIZED",
      ">> SECURING SHELL ENCRYPTION [SSL V3]...",
      ">> STACK DETECTED: [MERN FULL-STACK + TS]",
      ">> GEO_REF: PATNA, BIHAR, INDIA [25.5941° N, 85.1376° E]",
      ">> CORE MODULES: REACT, NODE, MONGO, EXPRESS",
      ">> GLOBAL HIREABILITY STATUS: IMMEDIATE [REMOTE FIRST]",
      ">> SECURITY CLEARANCE: LEVEL_01 SECURED. READY.",
    ],
    [],
  );

  // Update clock every second with Asia/Kolkata timezone
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setClockTime(
        new Intl.DateTimeFormat("en-US", options).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate Terminal Boot logs
  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        setTerminalLogs((prev) => [...prev, bootLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [bootLogs]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamic Scroll Up Role switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % skills.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [skills.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const hudVariants = {
    hidden: { opacity: 0, scale: 0.85, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 py-16">
      {/* 3D Particle Canvas Background */}
      <ParticleBackground />

      {/* Advanced Aesthetic Background Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dynamic mesh gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.05),transparent_50%)]" />

        {/* Dynamic Interactive Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.12 - 50,
            y: mousePosition.y * 0.12 - 50,
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 60, damping: 25 },
            y: { type: "spring", stiffness: 60, damping: 25 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.1 + 50,
            y: -mousePosition.y * 0.1 + 50,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 25 },
            y: { type: "spring", stiffness: 50, damping: 25 },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
        />

        {/* Tactical Cyber Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.85)_100%)]" />
      </div>

      {/* Main Layout Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-screen py-10">
          {/* Left Column - Cyber Console and Profile Information (7/12 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Status Beacon Badge */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-cyan-500/5 cursor-default"
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(34, 211, 238, 0.6)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="uppercase tracking-wider font-bold">
                  {personalInfo.availability.status}
                </span>
              </motion.div>
            </motion.div>

            {/* Glowing Cyber Title */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-slate-100">
                <span className="block text-slate-400 text-lg sm:text-xl font-medium uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Welcome to my portfolio
                </span>
                <span className="block font-black">
                  {personalInfo.name.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent hover:brightness-125"
                      whileHover={{
                        y: -3,
                        scale: 1.03,
                        textShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* High-Fidelity Scrolling Role Subtitle */}
              <div className="h-8 sm:h-10 flex items-center text-lg sm:text-xl lg:text-2xl font-bold">
                <span className="text-slate-400 mr-2 uppercase tracking-wide text-sm font-semibold">
                  Role:
                </span>
                <div
                  className="relative overflow-hidden h-8 sm:h-10 flex items-center"
                  style={{ minWidth: "280px" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      className="absolute bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-black"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {skills[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Micro Terminal/Console Dashboard */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 font-mono text-xs sm:text-sm text-cyan-400/90 shadow-2xl relative overflow-hidden backdrop-blur-xl max-w-xl"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-slate-400 text-xs font-bold tracking-wider uppercase">
                    Developer Console
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/40 animate-pulse" />
                </div>
              </div>

              {/* Boot Log Stream */}
              <div className="space-y-1.5 min-h-[135px] text-left">
                <AnimatePresence>
                  {terminalLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        index === bootLogs.length - 1
                          ? "text-emerald-400 font-bold"
                          : log.startsWith(">> STACK")
                            ? "text-purple-400"
                            : "text-slate-300"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Immersive CTA Operations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-3"
            >
              <Link to="/projects">
                <motion.button
                  className="group relative px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 rounded-xl text-white font-bold text-sm tracking-wider uppercase overflow-hidden shadow-lg shadow-cyan-500/15 cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                  {/* Glowing hover sweep overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="px-7 py-3.5 border border-slate-700 bg-slate-900/60 rounded-xl text-slate-300 font-bold text-sm tracking-wider uppercase hover:border-cyan-500/50 hover:text-white transition-all backdrop-blur-xl cursor-pointer"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 15px rgba(34, 211, 238, 0.1)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Let's Talk
                </motion.button>
              </Link>
            </motion.div>

            {/* Integrated Real-Time Clock & Location HUD */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-5 pt-2 text-xs sm:text-sm border-t border-slate-900/80 max-w-xl"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{personalInfo.location.current}</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-2 text-cyan-400">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="font-mono tracking-wider font-bold">
                  IST: {clockTime || "13:24:39"}
                </span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-mono">ONLINE & READY</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Fully Holographic Dashboard Control Grid (5/12 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              variants={hudVariants}
              className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
            >
              {/* Rotating Telemetry Ring 1 (Dashed Outer) */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Rotating Telemetry Ring 2 (Double Ring Inner) */}
              <motion.div
                className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-double border-purple-500/10 pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />

              {/* Circular Hologram Core Image Deck */}
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-2 bg-slate-950/80 border border-slate-800/80 backdrop-blur-2xl overflow-hidden group shadow-2xl shadow-cyan-500/5 cursor-pointer z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Horizontal Laser Scanning Line */}
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-cyan-400/40 shadow-[0_0_8px_#22d3ee] z-20 pointer-events-none"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Rotating Profile Ring Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-purple-600/20 opacity-70 blur-md group-hover:opacity-100 transition-opacity pointer-events-none"
                  animate={{ rotate: 360 }}
                  style={{
                    animationDuration: "12s",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                  }}
                />

                {/* Actual Profile Image container */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-full p-1.5 overflow-hidden">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-full filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-cyan-500/5 rounded-full pointer-events-none" />
                </div>
              </motion.div>

              {/* Counter-Rotating Interactive Skill Nodes */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {/* Node 1: React (Top Center) */}
                <motion.div
                  className="absolute top-[4%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className="flex items-center gap-1.5 bg-slate-950/90 border border-cyan-400/40 px-3 py-1.5 rounded-xl text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/20 backdrop-blur-md cursor-pointer">
                    <Cpu
                      className="w-3.5 h-3.5 text-cyan-400"
                      style={{ animation: "spin 8s linear infinite" }}
                    />
                    <span>React</span>
                  </div>
                </motion.div>

                {/* Node 2: Node.js (Upper Right) */}
                <motion.div
                  className="absolute top-[34%] left-[93.7%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className="flex items-center gap-1.5 bg-slate-950/90 border border-emerald-400/40 px-3 py-1.5 rounded-xl text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-md cursor-pointer">
                    <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Node.js</span>
                  </div>
                </motion.div>

                {/* Node 3: Express (Lower Right) */}
                <motion.div
                  className="absolute top-[87%] left-[76.7%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className="flex items-center gap-1.5 bg-slate-950/90 border border-purple-400/40 px-3 py-1.5 rounded-xl text-purple-300 text-xs font-bold shadow-lg shadow-purple-500/20 backdrop-blur-md cursor-pointer">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>Express</span>
                  </div>
                </motion.div>

                {/* Node 4: MongoDB (Lower Left) */}
                <motion.div
                  className="absolute top-[87%] left-[23.3%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className="flex items-center gap-1.5 bg-slate-950/90 border border-green-400/40 px-3 py-1.5 rounded-xl text-green-300 text-xs font-bold shadow-lg shadow-green-500/20 backdrop-blur-md cursor-pointer">
                    <Database className="w-3.5 h-3.5 text-green-400" />
                    <span>MongoDB</span>
                  </div>
                </motion.div>

                {/* Node 5: TypeScript (Upper Left) */}
                <motion.div
                  className="absolute top-[34%] left-[6.3%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className="flex items-center gap-1.5 bg-slate-950/90 border border-blue-400/40 px-3 py-1.5 rounded-xl text-blue-300 text-xs font-bold shadow-lg shadow-blue-500/20 backdrop-blur-md cursor-pointer">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>TypeScript</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Stat Widget Left - Experience Tactician Card */}
              <motion.div
                className="absolute -left-12 bottom-6 bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl z-25 max-w-[120px] pointer-events-auto"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -4, borderColor: "rgba(34, 211, 238, 0.6)" }}
              >
                <div className="text-center space-y-1">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {professionalSummary.experience.split(" ")[0]}
                  </span>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Experience
                  </div>
                  {/* Decorative Micro Vector Grid */}
                  <svg
                    className="w-full h-4 mt-1 text-cyan-400/40"
                    viewBox="0 0 100 20"
                  >
                    <path
                      d="M0 10 Q25 15 50 5 T100 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="2"
                    />
                    <line
                      x1="0"
                      y1="10"
                      x2="100"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeOpacity="0.2"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Floating Stat Widget Right - Projects Tactician Card */}
              <motion.div
                className="absolute -right-12 top-6 bg-slate-950/90 border border-purple-500/30 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl z-25 max-w-[120px] pointer-events-auto"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.6)" }}
              >
                <div className="text-center space-y-1">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-rose-500 bg-clip-text text-transparent">
                    {projects.length}+
                  </span>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Projects
                  </div>
                  {/* Decorative Radar Target UI */}
                  <div className="flex justify-center items-center h-4 mt-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tactile Immersive Scroll Controller */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              SYSTEM_ENGAGED_SCROLL
            </span>
            <div className="w-5 h-9 border border-slate-800 group-hover:border-cyan-500/60 rounded-full flex justify-center transition-colors">
              <motion.div
                className="w-1 h-2 bg-slate-500 group-hover:bg-cyan-400 rounded-full mt-1.5"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
