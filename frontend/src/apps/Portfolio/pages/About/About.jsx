import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Gem,
  GraduationCap,
  Handshake,
  Rocket,
  Target,
  Zap,
  Code,
  MapPin,
  Clock,
  ArrowUpRight,
  Award,
  Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "../../store/data/portfolioData";
import SEOHead from "../../../../components/SEO/SEOHead";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const {
    personalInfo = {},
    professionalSummary = {},
    workExperience = [],
    education = {},
    achievements = [],
    interests = [],
    careerObjectives = {},
  } = portfolioData || {};

  const tabs = useMemo(() => [
    { id: "story", label: "My Story", icon: BookOpen },
    { id: "journey", label: "Journey", icon: Rocket },
    { id: "values", label: "Values", icon: Gem },
    { id: "goals", label: "Goals", icon: Target },
  ], []);

  const coreValues = useMemo(() => [
    {
      title: "Quality First",
      description: "Every line of code is written with precision and purpose, ensuring clean, robust, and maintainable solutions.",
      icon: Zap
    },
    {
      title: "Continuous Growth",
      description: "Constantly exploring new libraries, frameworks, and best practices to stay at the cutting edge.",
      icon: GraduationCap
    },
    {
      title: "Collaboration",
      description: "Believing in clear, friendly teamwork and open communication to bring exceptional digital ideas to life.",
      icon: Handshake
    }
  ], []);

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
                    <span className="uppercase tracking-wider font-bold">ABOUT ME</span>
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

              {/* Right Content - Elegant Profile Image Deck */}
              <motion.div variants={itemVariants} className="relative flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none" />
                  
                  <div className="relative w-full h-full bg-slate-950/80 rounded-3xl p-2.5 border border-slate-900 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                    {/* Floating HUD ring */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-600/10 pointer-events-none" />

                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-105"
                    />
                  </div>

                  {/* High Tech Accent Nodes */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10"
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10"
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Award className="w-3 h-3 text-purple-400" />
                  </motion.div>
                </div>
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
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">My Story</h2>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-cyan-300 mb-4 tracking-wide">The Beginning</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        My entry into the digital space was driven by raw curiosity and a clear passion for creating digital solutions. What started as simple experiments writing HTML and CSS grew into a deep, career-long focus on full-stack MERN engineering.
                      </p>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-lg font-bold text-purple-300 mb-4 tracking-wide">The Growth</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Through continuous learning and building real projects, I've built expertise in building modern, scalable React applications, robust Node.js backend APIs, and efficient MongoDB architectures.
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
                              <span className="text-cyan-400 font-bold uppercase tracking-wider">{experience.company}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-400 font-medium font-mono">{experience.duration}</span>
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
                        <p className="text-slate-400 text-xs leading-relaxed">{value.description}</p>
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
                          <li key={index} className="flex items-start gap-2.5 leading-relaxed">
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

        {/* Key Achievements Grid Section */}
        <section className="py-24 bg-slate-950 border-t border-slate-900/60 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                ACCOMPLISHMENTS // 02
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                Milestones & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Achievements</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                Core milestones that showcase my dedicated progression as a MERN full-stack developer.
              </p>
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-all duration-300 group flex items-start gap-3.5"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-colors flex-shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 font-medium pt-1">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Segment */}
        <section className="py-24 bg-slate-950 border-t border-slate-900/60 relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <motion.div 
              variants={itemVariants}
              className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-10 sm:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center space-y-8"
              whileHover={{ borderColor: "rgba(6, 182, 212, 0.25)" }}
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <Handshake className="w-3.5 h-3.5 text-cyan-400" />
                  COLLABORATE // 03
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                  Ready to build <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">something amazing?</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                  Let's work together to bring your ideas to life with clean code and great design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all text-center tracking-wider uppercase text-xs sm:text-sm cursor-pointer"
                >
                  GET IN TOUCH
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-4 border border-slate-800 bg-slate-900/60 text-slate-300 font-bold rounded-xl hover:border-slate-600 hover:text-white transition-all text-center tracking-wider uppercase text-xs sm:text-sm backdrop-blur-xl cursor-pointer"
                >
                  EXPLORE PROJECTS
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
