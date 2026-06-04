import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  Gem,
  Globe2,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Target,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";

import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import { portfolioData } from "../../store/data/portfolioData";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = personalInfo.contact?.email || "hello@devkantkumar.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    personalInfo = {},
    professionalSummary = {},
    workExperience = [],
    education = {},
    interests = [],
    careerObjectives = {},
  } = portfolioData || {};

  const educationSchema = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: education.degree,
    description: `${education.degree} in ${education.field} from ${education.institution}, ${education.location}`,
    educationalLevel: "Bachelor",
    credentialCategory: "degree",
    recognizedBy: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
      url: education.website,
      address: { "@type": "PostalAddress", addressLocality: "Hazaribagh", addressRegion: "Jharkhand", addressCountry: "IN" },
    },
    holder: { "@type": "Person", name: "Dev Kant Kumar", url: "https://www.devkantkumar.com" },
  }), [education]);

  const tabs = useMemo(
    () => [
      { id: "story", label: "My Story", icon: BookOpen },
      { id: "journey", label: "Journey", icon: Rocket },
      { id: "values", label: "Values", icon: Gem },
      { id: "goals", label: "Goals", icon: Target },
    ],
    [],
  );

  const coreValues = useMemo(
    () => [
      {
        title: "Quality First",
        description:
          "Every line of code is written with precision and purpose, ensuring clean, robust, and maintainable solutions.",
        icon: Zap,
      },
      {
        title: "Continuous Growth",
        description:
          "Constantly exploring new libraries, frameworks, and best practices to stay at the cutting edge.",
        icon: GraduationCap,
      },
      {
        title: "Collaboration",
        description:
          "Believing in clear, friendly teamwork and open communication to bring exceptional digital ideas to life.",
        icon: Handshake,
      },
    ],
    [],
  );

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
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <SEOHead
        title="About"
        description="Learn about Dev Kant Kumar, my journey, values, and goals as a full-stack developer."
        keywords={portfolioData.seoKeywords}
        type="website"
        canonicalUrl="/about"
      />

      <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.15, 1, 1.15],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Cyber Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="text-left space-y-6">
                <motion.div variants={itemVariants}>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-cyan-500/20 rounded-xl text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-cyan-500/5 cursor-default"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="uppercase tracking-wider font-bold">
                      ABOUT ME
                    </span>
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] tracking-tight"
                >
                  My Journey &{" "}
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                    Background
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-slate-400 leading-relaxed font-medium"
                >
                  {professionalSummary.overview}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/contact"
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    Get In Touch
                  </Link>
                  <Link
                    to="/projects"
                    className="px-6 py-3.5 border border-slate-800 bg-slate-900/60 text-slate-300 font-bold text-xs tracking-wider uppercase rounded-xl hover:border-slate-700 hover:text-white transition-all backdrop-blur-xl cursor-pointer"
                  >
                    View My Work
                  </Link>
                </motion.div>
              </div>

              {/* Right Content — Reel Video */}
              <motion.div
                variants={itemVariants}
                className="relative flex justify-center"
              >
                <div className="relative w-64 sm:w-72" style={{ aspectRatio: "9/16", maxHeight: "480px" }}>
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none" />

                  {/* Video */}
                  <div className="relative w-full h-full rounded-3xl border border-slate-800 overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-600/10 pointer-events-none z-10" />
                    <video
                      ref={videoRef}
                      src="https://res.cloudinary.com/dmcdecnoz/video/upload/cap-theorem_z6chek.mp4"
                      poster="https://res.cloudinary.com/dmcdecnoz/video/upload/so_0/cap-theorem_z6chek.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      aria-label="Dev Kant Kumar explaining CAP Theorem in 2 minutes"
                    />
                    {/* Mute/Unmute toggle */}
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/20 transition-all duration-200"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted
                        ? <VolumeX className="w-3.5 h-3.5" />
                        : <Volume2 className="w-3.5 h-3.5" />}
                     </button>

                    {/* Top overlay label */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">System Design</span>
                    </div>
                  </div>

                  {/* Accent nodes */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10 z-20"
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/10 z-20"
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Award className="w-3 h-3 text-purple-400" />
                  </motion.div>
                </div>

                {/* Caption badge below video */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-lg"
                >
                  <span className="text-[11px] font-semibold text-slate-300">CAP Theorem explained</span>
                  <span className="text-slate-600 text-[10px]">·</span>
                  <span className="text-[11px] text-cyan-400 font-mono">2 min</span>
                </motion.div>



              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Interactive Story, Journey, Values, Goals Tabs Section */}
        <section className="py-20 bg-slate-950 border-t border-slate-900/60 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Tab Navigation Menu */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon className="w-4 h-4 text-cyan-400" />
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 rounded-xl shadow-lg shadow-cyan-500/10"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Render Selected Tab Sheet */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Tab 1: Story sheet */}
              {activeTab === "story" && (
                <div className="space-y-8 text-center">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    My Story
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-cyan-300 mb-4 tracking-wide">
                        The Beginning
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        My entry into the digital space was driven by raw
                        curiosity and a clear passion for creating digital
                        solutions. What started as simple experiments writing
                        HTML and CSS grew into a deep, career-long focus on
                        full-stack MERN engineering.
                      </p>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-purple-300 mb-4 tracking-wide">
                        The Growth
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Through continuous learning and building real projects,
                        I've built expertise in building modern, scalable React
                        applications, robust Node.js backend APIs, and efficient
                        MongoDB architectures.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Professional Journey timeline sheet */}
              {activeTab === "journey" && (
                <div className="space-y-12">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide text-center">
                    Professional Journey
                  </h2>
                  <div className="space-y-8 text-left">
                    {workExperience.map((experience, index) => (
                      <motion.div
                        key={experience.id}
                        variants={timelineVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative flex gap-6 group"
                        whileHover={{ y: -4 }}
                      >
                        <div className="flex flex-col items-center mt-1.5">
                          <div className="w-3.5 h-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                          {index < workExperience.length - 1 && (
                            <div className="w-0.5 h-28 bg-slate-900 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <div className="relative bg-slate-950/80 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl shadow-2xl group-hover:border-cyan-500/30 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                              <h3 className="text-lg font-bold text-white tracking-wide">
                                {experience.position}
                              </h3>
                              <span className="px-2.5 py-1 bg-cyan-950/40 text-cyan-300 text-xs rounded-lg border border-cyan-500/20 font-bold uppercase tracking-wider">
                                {experience.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                                {experience.company}
                              </span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-400 font-medium font-mono">
                                {experience.duration}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                              {experience.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {experience.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] rounded font-semibold"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Core Values sheet */}
              {activeTab === "values" && (
                <div className="space-y-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    Core Values
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-950/80 border border-slate-900 rounded-2xl p-7 backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-colors"
                        whileHover={{ y: -4 }}
                      >
                        <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 mb-5 shadow-sm">
                          <value.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                          {value.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Goals and Interests sheet */}
              {activeTab === "goals" && (
                <div className="space-y-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    Future Goals & Interests
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-cyan-300 mb-5 tracking-wide">
                        Career Objectives
                      </h3>
                      <ul className="space-y-3 text-slate-400 text-xs">
                        {careerObjectives.goals.map((goal, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-purple-300 mb-5 tracking-wide">
                        My Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-3 py-1.5 bg-purple-950/30 text-purple-300 text-xs rounded-xl border border-purple-500/20 font-semibold"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>


        {/* Education Section */}
        <section
          className="py-24 bg-slate-950 border-t border-slate-900/60 relative z-10"
          aria-label="Education Background"
          itemScope
          itemType="https://schema.org/EducationalOccupationalCredential"
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: educationSchema }}
          />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                EDUCATION
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                Academic{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Background
                </span>
              </h2>
              <p className="text-slate-400 text-base max-w-xl mx-auto">
                Formal education building the theoretical foundation behind every system I engineer.
              </p>
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="relative bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">

                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                {/* Institution Header */}
                <div className="p-8 sm:p-10 pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-6">

                    {/* Left — Degree + Institution */}
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div className="space-y-1.5">
                        <h3
                          className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight"
                          itemProp="name"
                        >
                          {education.degree}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium" itemProp="description">
                          {education.field}
                        </p>
                        <a
                          href={education.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors group"
                          aria-label={`Visit ${education.institution} official website`}
                          itemProp="url"
                        >
                          {education.institution}
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>

                    {/* Right — Meta badges */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/50 text-emerald-400 text-xs rounded-xl border border-emerald-500/25 font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {education.status}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-slate-400 text-xs rounded-xl border border-slate-800 font-mono">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {education.duration}
                      </span>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 mt-5 mb-8 text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      {education.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-slate-600" />
                      {education.type}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-8 sm:mx-10 border-t border-slate-800/80" />

                {/* Core Subjects */}
                <div className="p-8 sm:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Core Subjects
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {education.focusAreas?.map((subject) => (
                      <div key={subject} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>


                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* CTA Segment */}
        <section className="py-24 bg-slate-950 border-t border-slate-900/60 relative overflow-hidden z-10">
          {/* Ambient Background Lights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.03),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Headline & Main CTA */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                    <Handshake className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    COLLABORATE // 03
                  </span>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-2xl">
                    Ready to build{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                      something amazing?
                    </span>
                  </h2>
                  
                  <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
                    Let's work together to bring your ideas to life with clean, scalable code and exceptional user-centric design.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <Link
                    to="/contact"
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all text-center tracking-wider uppercase text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Get In Touch</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    to="/projects"
                    className="px-8 py-4 border border-slate-800 bg-slate-900/60 text-slate-300 font-bold rounded-xl hover:border-slate-650 hover:text-white transition-all text-center tracking-wider uppercase text-xs sm:text-sm backdrop-blur-xl cursor-pointer"
                  >
                    Explore Projects
                  </Link>
                </motion.div>
              </div>

              {/* Right Column - Status Deck & Copy Card */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl space-y-6 group/deck"
                  whileHover={{ borderColor: "rgba(6, 182, 212, 0.2)" }}
                >
                  {/* Subtle Glowing Corner */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover/deck:bg-cyan-500/15 transition-all duration-500" />
                  
                  {/* Status Item 1: Availability Status */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Availability Status</div>
                      <div className="text-sm font-semibold text-slate-200">{personalInfo.availability?.status || "Open to Opportunities"}</div>
                    </div>
                  </div>

                  {/* Status Item 2: Timezone & Location */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Active Timezone</div>
                      <div className="text-sm font-semibold text-slate-200">{personalInfo.location?.timezone || "IST (UTC+5:30)"}</div>
                      <div className="text-xs text-slate-500">{personalInfo.location?.current || "Patna, India"}</div>
                    </div>
                  </div>

                  {/* Status Item 3: Quick Email Copier Card */}
                  <button
                    onClick={handleCopyEmail}
                    className="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/60 hover:border-cyan-500/40 transition-all cursor-pointer group/email shadow-inner relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${copied ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-violet-500/10 border border-violet-500/20 text-violet-400'}`}>
                        {copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-mono text-violet-400 font-bold uppercase tracking-wider group-hover/email:text-cyan-400 transition-colors">Quick Connect</div>
                        <div className="text-sm font-mono text-slate-300 font-medium select-all">{personalInfo.contact?.email || "hello@devkantkumar.com"}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono group-hover/email:border-cyan-500/30 group-hover/email:text-cyan-400 transition-all flex-shrink-0">
                      {copied ? (
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </div>
                  </button>
                </motion.div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
