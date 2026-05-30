import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink, FolderKanban, Github, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { AdvancedAnimations } from "../../common/utils/animations";
import { portfolioData } from "../../store/data/portfolioData";

// Brand/technology icons
import {
  DiMongodb,
  DiNodejs,
  DiReact,
  DiHtml5,
  DiCss3,
  DiGit,
  DiJavascript1,
  DiSass
} from "react-icons/di";
import {
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiNextdotjs,
  SiGraphql,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiFirebase,
  SiAmazonwebservices,
  SiTypescript,
  SiSocketdotio,
  SiPrisma,
  SiPython,
  SiDjango,
  SiFramer
} from "react-icons/si";

// Map normalized names to icon components
const techIconMap = {
  mongodb: DiMongodb,
  mongo: DiMongodb,
  express: SiExpress,
  expressjs: SiExpress,
  react: DiReact,
  reactjs: DiReact,
  node: DiNodejs,
  nodejs: DiNodejs,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  javascript: DiJavascript1,
  js: DiJavascript1,
  typescript: SiTypescript,
  ts: SiTypescript,
  html: DiHtml5,
  html5: DiHtml5,
  css: DiCss3,
  css3: DiCss3,
  git: DiGit,
  github: Github,
  sass: DiSass,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  graphql: SiGraphql,
  docker: SiDocker,
  firebase: SiFirebase,
  aws: SiAmazonwebservices,
  nextjs: SiNextdotjs,
  socketio: SiSocketdotio,
  prisma: SiPrisma,
  python: SiPython,
  django: SiDjango,
  framer: SiFramer,
  framermotion: SiFramer
};

const getTechIcon = (tech) => {
  if (!tech) return Code2;
  const normalized = tech.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return techIconMap[normalized] || Code2;
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projectsRef = useRef(null);
  const cardRefs = useRef([]);

  const { projects = [] } = portfolioData || {};

  // Stable particle positions — avoid Math.random() in render
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 17 + 13) % 100,
      top: (i * 23 + 7) % 100,
      duration: 3 + (i % 4),
      delay: (i * 0.7) % 5,
    })),
  []);

  // Filter projects based on category and search term
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    return projects.filter((project) => {
      if (!project) return false;

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        (project.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (project.technologies || []).some((tech) =>
          (tech || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  const categories = useMemo(
    () => [
      { id: "all", label: "All Projects", count: projects?.length || 0 },
      {
        id: "fullstack",
        label: "Full Stack",
        count: projects?.filter((p) => p?.category === "fullstack").length || 0,
      },
      {
        id: "frontend",
        label: "Frontend",
        count: projects?.filter((p) => p?.category === "frontend").length || 0,
      },
      {
        id: "backend",
        label: "Backend",
        count: projects?.filter((p) => p?.category === "backend").length || 0,
      },
    ],
    [projects]
  );

  useEffect(() => {
    try {
      // Apply card tilt effects to each project card
      cardRefs.current.forEach((card, index) => {
        if (card) {
          try {
            AdvancedAnimations.cardTilt(card, {
              maxTilt: 15,
              perspective: 1000,
              scale: 1.05,
            });
          } catch (error) {
            console.warn(
              `Card tilt animation failed for card ${index}:`,
              error
            );
          }
        }
      });

      // Reveal on scroll animation
      if (projectsRef.current) {
        try {
          AdvancedAnimations.revealOnScroll([projectsRef.current], {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
          });
        } catch (error) {
          console.warn("Reveal on scroll animation failed:", error);
        }
      }
    } catch (error) {
      console.error("Animation initialization failed:", error);
    }
  }, [filteredProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Basic":
        return "from-green-500 to-emerald-600";
      case "Intermediate":
        return "from-yellow-500 to-orange-600";
      case "Advanced":
        return "from-orange-500 to-red-600";
      case "Enterprise":
        return "from-purple-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes projectMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-project-marquee {
          display: flex;
          width: max-content;
          animation: projectMarquee 20s linear infinite;
        }
        .animate-project-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      {/* SEO Components */}
      <SEOHead
        title="Projects"
        description="Explore my portfolio of full-stack development projects showcasing modern technologies and creative problem-solving."
        keywords={portfolioData.seoKeywords}
        type="website"
      />
      {/* ItemList JSON-LD for the Projects listing */}
      <StructuredData
        type="itemList"
        pageData={{
          items: filteredProjects.map(p => ({ id: p.id }))
        }}
      />
      {/* Breadcrumbs for /projects */}
      <StructuredData
        type="breadcrumbs"
        pageData={{
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" }
          ]
        }}
      />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Sophisticated Background Effects */}
          <div className="absolute inset-0">
            {/* Subtle Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
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
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                animate={{ y: [-20, 20], x: [-10, 10], opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              />
            ))}

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-xl shadow-lg shadow-cyan-500/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                Portfolio Showcase
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white"
            >
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                Projects
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              A collection of projects that showcase my expertise in full-stack
              development, modern technologies, and creative problem-solving.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900/80 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-500/40"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-slate-950 border-y border-slate-900/60 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                    selectedCategory === category.id
                      ? "text-white border-transparent"
                      : "text-slate-400 border-slate-800/80 bg-slate-900/40 hover:text-white hover:bg-slate-900/80 hover:border-slate-700/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {category.label}
                    <span className="px-2 py-0.5 bg-slate-900/80 border border-slate-800 rounded-full text-xs font-mono">
                      {category.count}
                    </span>
                  </span>
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                ref={projectsRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-8 max-w-5xl mx-auto"
              >
                {filteredProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    href={project.links.live || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={projectVariants}
                    layout
                    className="group relative bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:bg-slate-900/40 transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_50px_rgba(6,182,212,0.03)] cursor-pointer block"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex flex-col md:flex-row h-full min-h-[320px]">
                      {/* Left: Image / Graphic */}
                      <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 relative min-h-[240px] md:min-h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-900 bg-slate-950">
                        {project.projectImage ? (
                          <img
                            src={project.projectImage}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center overflow-hidden">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-[0.03]">
                              <div
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(6, 182, 212, 0.1) 35px, rgba(6, 182, 212, 0.1) 70px)",
                                }}
                              />
                            </div>

                            {/* Icon container */}
                            <div className="relative z-10 flex flex-col items-center gap-4">
                              <div className="relative group-hover:scale-105 transition-transform duration-500">
                                <FolderKanban
                                  className="w-16 h-16 text-cyan-400/80"
                                  strokeWidth={1.2}
                                />
                                <Code2
                                  className="w-6 h-6 text-purple-400/60 absolute -top-1 -right-1"
                                  strokeWidth={2}
                                />
                                <Sparkles
                                  className="w-5 h-5 text-blue-400/60 absolute -bottom-1 -left-1"
                                  strokeWidth={2}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-slate-400 text-sm font-semibold">
                                  Project {index + 1}
                                </p>
                                <p className="text-slate-500 text-xs font-mono mt-0.5 uppercase tracking-wider">
                                  {project.category}
                                </p>
                              </div>
                            </div>

                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                          </div>
                        )}

                        {/* Status Badge */}
                        {project.status && (
                          <div className="absolute top-4 left-4 z-20">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
                                project.status === "Live" || project.status === "In Production"
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          {/* Top Meta info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2.5 py-0.5 bg-gradient-to-r ${getComplexityColor(
                                  project.complexity
                                )} text-white text-[10px] font-bold rounded font-mono uppercase`}
                              >
                                {project.complexity}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-900 text-cyan-400 text-[10px] font-mono rounded border border-cyan-500/20 uppercase font-bold tracking-wider">
                                {project.category}
                              </span>
                            </div>
                            <span className="text-slate-500 text-xs font-mono font-bold">
                              {project.year}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                            {project.name}
                          </h3>

                          {/* Description */}
                          <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Key Features */}
                          {project.keyFeatures && (
                            <div className="mb-6 hidden sm:block">
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                {project.keyFeatures
                                  .slice(0, 4)
                                  .map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-slate-400"
                                    >
                                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                                      <span className="line-clamp-1">{feature}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Bottom row: Tech + Action buttons */}
                        <div className="border-t border-slate-900/60 pt-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                          {/* Technologies Marquee */}
                          <div className="relative w-full max-w-full lg:max-w-[420px] overflow-hidden border border-slate-900 bg-slate-950/40 rounded-xl py-2 px-3 flex items-center z-10 select-none">
                            {/* Faders */}
                            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
                            
                            <div className="animate-project-marquee whitespace-nowrap flex gap-3">
                              {/* Render 4 times for infinite loop fallback, ensuring it's wide enough */}
                              {[...project.technologies, ...project.technologies, ...project.technologies, ...project.technologies].map((tech, idx) => {
                                const TechIcon = getTechIcon(tech);
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 text-[10px] font-mono font-bold uppercase shrink-0 transition-all duration-300 hover:border-cyan-500/30 hover:text-white"
                                  >
                                    <TechIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                    {tech}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 w-full lg:w-auto self-stretch lg:self-auto">
                            <span className="flex-1 lg:flex-initial py-2.5 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                              <ExternalLink className="w-3.5 h-3.5" />
                              View Live
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 max-w-md mx-auto"
              >
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FolderKanban className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Projects Found
                </h3>
                <p className="text-slate-400 mb-8 text-sm">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 text-xs tracking-wider uppercase"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

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
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  COLLABORATE // PROJECTS
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                  Have a project <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">in mind?</span>
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
                  START A PROJECT
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

export default Projects;
