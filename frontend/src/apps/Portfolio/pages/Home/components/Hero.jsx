import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Clock,
  Cpu,
  Database,
  Layers,
  Mail,
  MapPin,
  Play,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParticleBackground from "../../../common/components/3D/ParticleBackground";
import { portfolioData } from "../../../store/data/portfolioData";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [clockTime, setClockTime] = useState("");

  const {
    personalInfo,
    professionalSummary,
    projects,
    careerObjectives,
    technicalSkills,
  } = portfolioData;
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
        {/* Dynamic mesh gradients - Enhanced */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(236,72,153,0.08),transparent_60%)]" />

        {/* Dynamic Interactive Gradient Orbs - Enhanced */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.15 - 50,
            y: mousePosition.y * 0.15 - 50,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-600/15 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.12 + 50,
            y: -mousePosition.y * 0.12 + 50,
            scale: [1, 1.25, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 40, damping: 20 },
            y: { type: "spring", stiffness: 40, damping: 20 },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-bl from-emerald-500/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.08,
            y: -mousePosition.y * 0.08,
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 60, damping: 25 },
            y: { type: "spring", stiffness: 60, damping: 25 },
            scale: {
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        />

        {/* Tactical Cyber Grid Pattern - Enhanced */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_50%,black,transparent)]" />

        {/* Enhanced Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,23,42,0.8)_100%)]" />

        {/* Floating particle accents */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-50"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-40"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
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
                className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-slate-900/80 to-slate-800/60 border-2 border-cyan-500/50 rounded-full text-cyan-300 text-xs sm:text-sm font-bold backdrop-blur-xl shadow-lg shadow-cyan-500/10 cursor-default"
                whileHover={{
                  scale: 1.06,
                  borderColor: "rgba(34, 211, 238, 0.8)",
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                <span className="uppercase tracking-widest font-bold">
                  {personalInfo.availability.status}
                </span>
              </motion.div>
            </motion.div>

            {/* Glowing Cyber Title */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 lg:space-y-6"
            >
              <div className="space-y-1">
                <span className="text-cyan-400 text-sm sm:text-base font-mono font-bold uppercase tracking-[0.3em] block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✦ FULL STACK DEVELOPER
                  </motion.span>
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter text-slate-100">
                <span className="block overflow-hidden py-1">
                  <motion.span
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                    }}
                  >
                    Ready to Build
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-1">
                  <motion.span
                    className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-45% to-violet-500 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      y: {
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.25,
                      },
                      opacity: {
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.25,
                      },
                      backgroundPosition: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Something Amazing?
                  </motion.span>
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl"
              >
                Let's work together to bring your ideas to life with clean code
                and great design
              </motion.p>
            </motion.div>

            {/* Immersive CTA Operations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6"
            >
              <Link to="/projects">
                <motion.button
                  className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden shadow-2xl shadow-cyan-500/20 cursor-pointer w-full sm:w-auto"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2.5">
                    <Play className="w-5 h-5" />
                    View My Work
                    <motion.span
                      animate={{ x: 0 }}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="group relative px-8 sm:px-10 py-4 sm:py-5 border-2 border-cyan-500/60 bg-gradient-to-br from-slate-900/40 to-slate-950/60 rounded-xl sm:rounded-2xl text-cyan-300 font-bold text-sm sm:text-base tracking-wider uppercase hover:border-cyan-400 transition-all backdrop-blur-xl cursor-pointer w-full sm:w-auto hover:bg-gradient-to-br hover:from-slate-900/60 hover:to-slate-950/80 hover:shadow-lg hover:shadow-cyan-500/10 overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(34, 211, 238, 1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Recurring Glossy Flash/Shimmer Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.0,
                      repeatDelay: 3.5,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2.5">
                    <Mail className="w-5 h-5" />
                    Let's Connect
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Integrated Real-Time Clock & Location HUD */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-6 pt-6 sm:pt-8 border-t border-slate-800/60 max-w-2xl"
            >
              <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                <div className="w-8 h-8 bg-rose-500/15 border border-rose-500/30 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-rose-500" />
                </div>
                <span className="font-medium">
                  {personalInfo.location.current}
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-700" />
              <div className="flex items-center gap-3 text-cyan-300 text-xs sm:text-sm">
                <div className="w-8 h-8 bg-cyan-500/15 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-mono tracking-wider font-bold">
                  IST: {clockTime || "13:24:39"}
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-700" />
              <div className="flex items-center gap-3 text-emerald-300 text-xs sm:text-sm">
                <div className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <span className="font-mono font-bold">ONLINE & READY</span>
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
                    alt={`${personalInfo.name} - ${personalInfo.title} Profile Picture`}
                    className="w-full h-full object-cover rounded-full filter brightness-95 contrast-105"
                    loading="eager"
                    width={256}
                    height={256}
                    decoding="async"
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
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
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
      </motion.div>
    </section>
  );
};

export default Hero;
