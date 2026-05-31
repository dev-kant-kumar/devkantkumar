import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { useMetadata } from "../../../../utils/useMetadata";
import { portfolioData } from "../../store/data/portfolioData";
import Hero from "./components/Hero";
import {
  Zap,
  Palette,
  Cpu,
  ArrowRight,
  Eye,
  Code,
  Layers,
  Wrench,
  Sparkles,
  TrendingUp,
  Activity,
  Terminal,
  Server,
  Mail,
  User,
} from "lucide-react";

const Home = () => {
  const { projects, technicalSkills } = portfolioData;
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  // Update metadata for home page
  useMetadata({
    title: "Home",
    description:
      "Welcome to my portfolio. Explore my projects, skills, and experience as a Full Stack Developer.",
    keywords: "portfolio, home, full stack developer, projects, skills",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="Home"
        description="Dev Kant Kumar – Full Stack Developer (MERN) and UI/UX Engineer. Specialist in React, Node.js, and scalable web apps. Available for remote collaborations."
        keywords={portfolioData.seoKeywords}
        image={portfolioData.personalInfo.profileImage}
        type="website"
      />
      <StructuredData type="person" pageData={portfolioData} />
      <StructuredData type="website" pageData={portfolioData} />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300">
        {/* Dynamic Re-imagined Immersive Hero Section */}
        <Hero />

        {/* Section 01: Specialties */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
        >
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            {/* Friendly Section Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16 space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                MY SPECIALTIES // 01
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                Building Exceptional{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Web Applications
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                I focus on creating fast, responsive, and beautiful websites
                using modern technologies that help businesses grow.
              </p>
            </motion.div>

            {/* Specialties Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Specialty 1: Speed */}
              <motion.div
                variants={itemVariants}
                className="group relative bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-cyan-500/40 hover:bg-slate-900/40 transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] text-left"
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/50 transition-colors">
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  Speed & Performance
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Websites that load instantly, work smoothly, and keep your
                  visitors engaged from the very first second.
                </p>
                {/* Friendly status tag */}
                <div className="font-mono text-[10px] text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 rounded px-2.5 py-1 inline-block font-bold">
                  LIGHTNING FAST
                </div>
              </motion.div>

              {/* Specialty 2: Design */}
              <motion.div
                variants={itemVariants}
                className="group relative bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-violet-500/40 hover:bg-slate-900/40 transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] text-left"
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-violet-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/10 group-hover:border-violet-400/50 transition-colors">
                  <Palette className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  Clean & Modern Design
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Beautiful, simple, and friendly layouts built to be highly
                  interactive and easy for everyone to enjoy.
                </p>
                <div className="font-mono text-[10px] text-violet-400 bg-violet-950/30 border border-violet-500/20 rounded px-2.5 py-1 inline-block font-bold">
                  SMOOTH ANIMATIONS
                </div>
              </motion.div>

              {/* Specialty 3: Backend */}
              <motion.div
                variants={itemVariants}
                className="group relative bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-emerald-500/40 hover:bg-slate-900/40 transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] text-left"
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-400/50 transition-colors">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  Full-Stack Solutions
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Secure databases and robust backend servers built to store
                  your data safely and grow with your traffic.
                </p>
                <div className="font-mono text-[10px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded px-2.5 py-1 inline-block font-bold">
                  SECURE & RELIABLE
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 02: Featured Projects */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-slate-950 border-t border-slate-900/60"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Friendly Section Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16 space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                FEATURED WORK // 02
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                My Latest{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                Here are a few select projects I've built using React, Node.js,
                MongoDB, and TypeScript.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative bg-slate-950/90 rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 text-left flex flex-col justify-between"
                  whileHover={{ y: -6 }}
                >
                  <div>
                    {/* Top Spec Bar */}
                    <div className="flex items-center justify-between mb-4 text-xs font-mono">
                      <span className="px-2.5 py-1 bg-cyan-950/40 text-cyan-300 rounded border border-cyan-500/20 font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-slate-500 font-bold">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Heading */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors tracking-wide">
                      {project.name}
                    </h3>

                    {/* Project Description */}
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px] rounded font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px] rounded font-bold">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Operation Buttons with Lucide Icons */}
                  <div className="flex gap-3 mt-auto">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                    {project.links.github && project.links.github !== "#" && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 border border-slate-800 bg-slate-900/40 text-slate-400 font-bold text-xs rounded-xl hover:border-slate-700 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>VIEW CODE</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div variants={itemVariants} className="text-center mt-14">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60 rounded-2xl text-slate-300 font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-cyan-500/5 transition-all cursor-pointer group"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 03: Technical Matrix (Skills) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-900/60 relative overflow-hidden"
        >
          {/* Accent orbs */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            {/* Friendly Section Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16 space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                TECH STACK // 03
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                Skills &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Technologies
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                Here is a breakdown of the programming languages, frontend
                libraries, and backend frameworks I use.
              </p>
            </motion.div>

            {/* Skills Deck Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend Card */}
              <motion.div
                variants={itemVariants}
                className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between text-left"
                whileHover={{
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 0 25px rgba(6, 182, 212, 0.03)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-6 text-cyan-400">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      Frontend Core
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {technicalSkills.frontend.expert.map((skill) => (
                      <div key={skill} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-200 font-bold">
                            {skill}
                          </span>
                          <span className="text-cyan-400 font-bold font-mono text-[10px]">
                            EXPERT
                          </span>
                        </div>
                        {/* Dynamic Mini Tech Bar */}
                        <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-6 font-bold border-t border-slate-900 pt-3">
                  EXPERT LEVEL
                </div>
              </motion.div>

              {/* Backend Card */}
              <motion.div
                variants={itemVariants}
                className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between text-left"
                whileHover={{
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  boxShadow: "0 0 25px rgba(139, 92, 246, 0.03)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-6 text-purple-400">
                    <Server className="w-5 h-5 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      Backend Core
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {technicalSkills.backend.advanced.map((skill) => (
                      <div key={skill} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-200 font-bold">
                            {skill}
                          </span>
                          <span className="text-purple-400 font-bold font-mono text-[10px]">
                            ADVANCED
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                          <div className="w-5/6 h-full bg-gradient-to-r from-purple-500 to-rose-600 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-6 font-bold border-t border-slate-900 pt-3">
                  ADVANCED LEVEL
                </div>
              </motion.div>

              {/* Tools Card */}
              <motion.div
                variants={itemVariants}
                className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between text-left"
                whileHover={{
                  borderColor: "rgba(16, 185, 129, 0.3)",
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.03)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-6 text-emerald-400">
                    <Wrench className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      Control Tools
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {technicalSkills.tools.expert.map((skill) => (
                      <div key={skill} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-200 font-bold">
                            {skill}
                          </span>
                          <span className="text-emerald-400 font-bold font-mono text-[10px]">
                            EXPERT
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-6 font-bold border-t border-slate-900 pt-3">
                  DAILY TOOLS
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 04: Call to Action (CTA) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-slate-950 border-t border-slate-900/60 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
            <motion.div
              variants={itemVariants}
              className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-10 sm:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center space-y-8"
              whileHover={{ borderColor: "rgba(6, 182, 212, 0.25)" }}
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  GET IN TOUCH // 04
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                  Ready to build{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                    something amazing?
                  </span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                  Let's work together to bring your ideas to life with clean
                  code and great design.
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
                  to="/about"
                  className="px-8 py-4 border border-slate-800 bg-slate-900/60 text-slate-300 font-bold rounded-xl hover:border-slate-600 hover:text-white transition-all text-center tracking-wider uppercase text-xs sm:text-sm backdrop-blur-xl cursor-pointer"
                >
                  ABOUT ME
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Home;
