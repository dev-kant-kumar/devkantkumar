import { AnimatePresence, motion } from "framer-motion";
import { Code2, FolderKanban, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { AdvancedAnimations } from "../../common/utils/animations";
import { portfolioData } from "../../store/data/portfolioData";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);

  const projectsRef = useRef(null);
  const cardRefs = useRef([]);

  const { projects = [] } = portfolioData || {};

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

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Sophisticated Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
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

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-10, 10],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
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
                    className="w-full px-6 py-4 bg-slate-800/50 border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-500/40"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors"
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
        <section className="py-12 bg-slate-800/30 backdrop-blur-xl border-y border-slate-700/30">
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
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {category.label}
                    <span className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-xs backdrop-blur-sm">
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
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    variants={projectVariants}
                    layout
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform-gpu"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ y: -10 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div>
                      {project.projectImage ? (
                        <img src={project.projectImage} alt={project.name} />
                      ) : (
                        <div className="relative h-64 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10">
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
                            <div className="relative">
                              <FolderKanban
                                className="w-20 h-20 text-cyan-400/80"
                                strokeWidth={1.5}
                              />
                              <Code2
                                className="w-8 h-8 text-purple-400/60 absolute -top-2 -right-2"
                                strokeWidth={2}
                              />
                              <Sparkles
                                className="w-6 h-6 text-blue-400/60 absolute -bottom-1 -left-1"
                                strokeWidth={2}
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-slate-400 text-sm font-medium">
                                Project {index + 1}
                              </p>
                              <p className="text-slate-500 text-xs mt-1">
                                {project.category}
                              </p>
                            </div>
                          </div>

                          {/* Subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                        </div>
                      )}
                    </div>
                    {/* Project Header */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 bg-gradient-to-r ${getComplexityColor(
                              project.complexity
                            )} text-white text-xs font-semibold rounded-full`}
                          >
                            {project.complexity}
                          </span>
                          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">
                            {project.category}
                          </span>
                        </div>
                        <span className="text-slate-400 text-sm">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-600/50">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Key Features */}
                      {project.keyFeatures && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-300 mb-3">
                            Key Features:
                          </h4>
                          <ul className="space-y-2">
                            {project.keyFeatures
                              .slice(0, 3)
                              .map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2 text-sm text-slate-400"
                                >
                                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.links.github &&
                          project.links.github !== "#" && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-3 px-4 border border-slate-600 text-slate-300 rounded-xl hover:border-slate-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                    />

                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            project.status === "Live" ||
                            project.status === "In Production"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Projects Found
                </h3>
                <p className="text-slate-400 mb-8">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-slate-800/50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Have a Project in{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Mind?
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let's collaborate and bring your vision to life with
                cutting-edge technology and exceptional design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Start a Project
                </a>
                <a
                  href="/about"
                  className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  Learn More About Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Projects;
