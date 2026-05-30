import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Palette,
  Settings,
  Terminal as TerminalIcon,
  Wrench,
  BookOpen,
  Sparkles,
  Cpu,
  ArrowRight,
  HelpCircle,
  Activity,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';
import { portfolioData } from "../../store/data/portfolioData";

// Devicons (di)
import {
  DiBootstrap,
  DiCss3,
  DiGit,
  DiGithubBadge,
  DiHtml5,
  DiJavascript1,
  DiMongodb,
  DiNodejs,
  DiNpm,
  DiPostgresql,
  DiReact,
  DiSass
} from "react-icons/di";

// SimpleIcons (si)
import {
  SiExpress,
  SiFigma,
  SiGraphql,
  SiMui,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiPhp,
  SiPostman,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiWebpack,
  SiYarn
} from "react-icons/si";

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});

  // Transform technicalSkills data to match component structure
  const transformSkillsData = useMemo(() => {
    const { technicalSkills } = portfolioData;

    const transformSkillLevel = (skillArray, level) => {
      return skillArray.map(skill => ({
        name: skill,
        level: level,
        category: 'technical'
      }));
    };

    return {
      frontend: [
        ...transformSkillLevel(technicalSkills.frontend.expert || [], 95),
        ...transformSkillLevel(technicalSkills.frontend.advanced || [], 85),
        ...transformSkillLevel(technicalSkills.frontend.intermediate || [], 75)
      ],
      backend: [
        ...transformSkillLevel(technicalSkills.backend.advanced || [], 85),
        ...transformSkillLevel(technicalSkills.backend.intermediate || [], 75),
        ...transformSkillLevel(technicalSkills.backend.basic || [], 65)
      ],
      tools: [
        ...transformSkillLevel(technicalSkills.tools.expert || [], 95),
        ...transformSkillLevel(technicalSkills.tools.advanced || [], 85),
        ...transformSkillLevel(technicalSkills.tools.intermediate || [], 75)
      ],
      concepts: technicalSkills.concepts.map(concept => ({
        name: concept,
        level: 80,
        category: 'concept'
      }))
    };
  }, []);

  const skills = useMemo(() => transformSkillsData, [transformSkillsData]);

  const skillCategories = useMemo(() => [
    { id: 'frontend', label: 'Frontend', icon: Palette, color: 'from-cyan-500 to-blue-600' },
    { id: 'backend', label: 'Backend', icon: Settings, color: 'from-purple-500 to-pink-600' },
    { id: 'tools', label: 'Tools & DevOps', icon: Wrench, color: 'from-orange-500 to-red-600' },
    { id: 'concepts', label: 'Concepts', icon: Brain, color: 'from-green-500 to-emerald-600' }
  ], []);

  // Animate skill progress bars
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedValues = {};
      if (skills[selectedCategory]) {
        skills[selectedCategory].forEach((skill, index) => {
          setTimeout(() => {
            setAnimatedValues(prev => ({
              ...prev,
              [`${selectedCategory}-${index}`]: skill.level || 85
            }));
          }, index * 80);
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, skills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const getProficiencyLevel = (level) => {
    if (level >= 90) return { label: 'Expert', color: 'text-emerald-400' };
    if (level >= 80) return { label: 'Advanced', color: 'text-cyan-400' };
    if (level >= 70) return { label: 'Intermediate', color: 'text-yellow-400' };
    return { label: 'Beginner', color: 'text-orange-400' };
  };

  const getSkillIcon = (skillName) => {
    const iconMap = {
      "React.js": { icon: DiReact, color: "#61DAFB" },
      "JavaScript ES6+": { icon: DiJavascript1, color: "#F7DF1E" },
      "HTML5": { icon: DiHtml5, color: "#E34F26" },
      "CSS3": { icon: DiCss3, color: "#1572B6" },
      "Redux Toolkit": { icon: SiRedux, color: "#764ABC" },
      "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
      "Material-UI": { icon: SiMui, color: "#007FFF" },
      "Bootstrap": { icon: DiBootstrap, color: "#7952B3" },
      "TypeScript": { icon: SiTypescript, color: "#3178C6" },
      "Next.js": { icon: SiNextdotjs, color: "#000000" },
      "SASS/SCSS": { icon: DiSass, color: "#CC6699" },
      "Webpack": { icon: SiWebpack, color: "#8DD6F9" },
      "Node.js": { icon: DiNodejs, color: "#339933" },
      "Express.js": { icon: SiExpress, color: "#000000" },
      "RESTful APIs": { icon: TerminalIcon, color: "#64748B" },
      "MongoDB": { icon: DiMongodb, color: "#47A248" },
      "PHP": { icon: SiPhp, color: "#777BB4" },
      "MySQL": { icon: SiMysql, color: "#4479A1" },
      "PostgreSQL": { icon: DiPostgresql, color: "#336791" },
      "GraphQL": { icon: SiGraphql, color: "#E10098" },
      "Git/GitHub": { icon: DiGithubBadge, color: "#181717" },
      "npm/yarn": { icon: DiNpm, color: "#CB3837" },
      "Postman": { icon: SiPostman, color: "#FF6C37" },
      "Netlify": { icon: SiNetlify, color: "#00C7B7" },
      "Figma": { icon: SiFigma, color: "#F24E1E" },
      "React": { icon: DiReact, color: "#61DAFB" },
      "JavaScript": { icon: DiJavascript1, color: "#F7DF1E" },
      "HTML": { icon: DiHtml5, color: "#E34F26" },
      "CSS": { icon: DiCss3, color: "#1572B6" },
      "Git": { icon: DiGit, color: "#F05032" },
      "GitHub": { icon: DiGithubBadge, color: "#181717" },
      "npm": { icon: DiNpm, color: "#CB3837" },
      "yarn": { icon: SiYarn, color: "#2C8EBB" }
    };

    return iconMap[skillName] || { icon: TerminalIcon, color: "#64748B" };
  };

  return (
    <>
      <SEOHead
        title="Skills"
        description="Explore my technical expertise in frontend, backend, tools, and development concepts. Comprehensive overview of my programming skills and technologies."
        keywords={portfolioData.seoKeywords}
        type="website"
      />
      <StructuredData type="website" />

      <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
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
            className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6"
          >
            {/* Badge */}
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
                <span className="uppercase tracking-wider font-bold">TECHNICAL EXPERTISE</span>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.08]">
              Skills & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Technologies</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              A comprehensive breakdown of my programming languages, frameworks, developer tools, and workflow concepts.
            </motion.p>

            {/* Micro Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-4">
              {skillCategories.map((category) => (
                <div key={category.id} className="text-center p-5 bg-slate-950/80 rounded-2xl border border-slate-900 backdrop-blur-md shadow-2xl">
                  <div className="mb-2 flex justify-center text-cyan-400">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-black text-white mb-0.5">
                    {skills[category.id]?.length || 0}
                  </div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">{category.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Categories Tab selectors */}
        <section className="py-8 bg-slate-950 border-t border-slate-900/60 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.label}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px]">
                      {skills[category.id]?.length || 0}
                    </span>
                  </span>
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeSkillCategory"
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl shadow-lg shadow-cyan-500/10`}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Cards Grid */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {skills[selectedCategory]?.map((skill, index) => {
                  const skillKey = `${selectedCategory}-${index}`;
                  const animatedValue = animatedValues[skillKey] || 0;
                  const proficiency = getProficiencyLevel(skill.level || 85);

                  return (
                    <motion.div
                      key={skill.name || skill}
                      variants={skillVariants}
                      className="group relative bg-slate-950/80 border border-slate-900 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.03)] text-left"
                      onMouseEnter={() => setHoveredSkill(skillKey)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ y: -4 }}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                          {(() => {
                            const skillIcon = getSkillIcon(skill.name || skill);
                            return React.createElement(skillIcon.icon, {
                              size: 24,
                              color: skillIcon.color,
                              className: "transition-transform duration-300 group-hover:scale-110"
                            });
                          })()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-wide">
                            {skill.name || skill}
                          </h3>
                          <span className={`text-xs font-semibold uppercase tracking-wider font-mono ${proficiency.color}`}>
                            {proficiency.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-white font-mono">
                            {skill.level || 85}%
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skillCategories.find(cat => cat.id === selectedCategory)?.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${animatedValue}%` }}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Skill Description */}
                      {skill.description && (
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                          {skill.description}
                        </p>
                      )}

                      {/* Experience Years */}
                      {skill.experience && (
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                          <span>{skill.experience} years experience</span>
                        </div>
                      )}

                      {/* Concentric Glow Indicator */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          (skill.level || 85) >= 90 ? 'bg-emerald-400 animate-pulse' :
                          (skill.level || 85) >= 80 ? 'bg-cyan-400 animate-pulse' :
                          (skill.level || 85) >= 70 ? 'bg-yellow-400' : 'bg-orange-400'
                        }`} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Continuous Learning segment */}
        <section className="py-24 bg-slate-950 border-t border-slate-900/60 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                CONTINUOUS GROWTH // 02
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                Continuous <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Learning & Growth</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                Technology moves rapidly, and I am committed to staying at the forefront of modern engineering through constant study and practice.
              </p>
            </motion.div>

            {/* Grid list using only Lucide icons */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 text-left">
              
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-4 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 shadow-sm">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Always Learning</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Constantly reading documentations, studying advanced patterns, and exploring fresh ecosystems to stay modern.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-4 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 shadow-sm">
                  <Wrench className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Hands-on Practice</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Building real-world web apps, launching cloud modules, and testing advanced tools in active code workspaces.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-4 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 shadow-sm">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Best Practices</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Implementing clean, self-documenting code systems and sticking strictly to secure, standardized workflows.
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </section>

        {/* CTA Banner */}
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
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  INITIATE_PROJECT // 03
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

export default Skills;
