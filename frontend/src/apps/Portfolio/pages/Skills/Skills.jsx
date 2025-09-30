import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from "../../store/data/portfolioData";
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';
import Analytics from '../../../../components/SEO/Analytics';
import {
  Palette,
  Settings,
  Wrench,
  Brain,
  Code2,
  Database,
  Globe,
  Smartphone,
  Server,
  GitBranch,
  Terminal,
  Figma,
  Chrome,
  Zap,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

// Devicons (di) - Only for skills you actually have
import {
  DiReact,
  DiJavascript1,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiSass,
  DiNodejs,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiGithubBadge,
  DiNpm
} from "react-icons/di";

// SimpleIcons (si) - Only for skills you actually have
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiNetlify,
  SiWebpack,
  SiFigma,
  SiPostman,
  SiGraphql,
  SiYarn,
  SiMui,
  SiRedux,
  SiPhp,
  SiMysql
} from "react-icons/si";

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});

  // Transform technicalSkills data to match component structure
  const transformSkillsData = () => {
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
  };

  const skills = transformSkillsData();

  const skillCategories = [
    { id: 'frontend', label: 'Frontend', icon: Palette, color: 'from-cyan-500 to-blue-600' },
    { id: 'backend', label: 'Backend', icon: Settings, color: 'from-purple-500 to-pink-600' },
    { id: 'tools', label: 'Tools & DevOps', icon: Wrench, color: 'from-orange-500 to-red-600' },
    { id: 'concepts', label: 'Concepts', icon: Brain, color: 'from-green-500 to-emerald-600' }
  ];

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
          }, index * 100);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, skills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
      // Frontend Skills (from portfolioData)
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

      // Backend Skills (from portfolioData)
      "Node.js": { icon: DiNodejs, color: "#339933" },
      "Express.js": { icon: SiExpress, color: "#000000" },
      "RESTful APIs": { icon: Terminal, color: "#64748B" },
      "MongoDB": { icon: DiMongodb, color: "#47A248" },
      "PHP": { icon: SiPhp, color: "#777BB4" },
      "MySQL": { icon: SiMysql, color: "#4479A1" },
      "PostgreSQL": { icon: DiPostgresql, color: "#336791" },
      "GraphQL": { icon: SiGraphql, color: "#E10098" },

      // Tools (from portfolioData)
      "Git/GitHub": { icon: DiGithubBadge, color: "#181717" },
      "npm/yarn": { icon: DiNpm, color: "#CB3837" },
      "Postman": { icon: SiPostman, color: "#FF6C37" },
      "Netlify": { icon: SiNetlify, color: "#00C7B7" },
      "Figma": { icon: SiFigma, color: "#F24E1E" },

      // Alternative names for same skills
      "React": { icon: DiReact, color: "#61DAFB" },
      "JavaScript": { icon: DiJavascript1, color: "#F7DF1E" },
      "HTML": { icon: DiHtml5, color: "#E34F26" },
      "CSS": { icon: DiCss3, color: "#1572B6" },
      "Git": { icon: DiGit, color: "#F05032" },
      "GitHub": { icon: DiGithubBadge, color: "#181717" },
      "npm": { icon: DiNpm, color: "#CB3837" },
      "yarn": { icon: SiYarn, color: "#2C8EBB" }
    };

    return iconMap[skillName] || { icon: Terminal, color: "#64748B" };
  };

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="Skills"
        description="Explore my technical expertise in frontend, backend, tools, and development concepts. Comprehensive overview of my programming skills and technologies."
        keywords={portfolioData.seoKeywords}
        type="website"
      />
      <StructuredData type="website" />
      <Analytics />

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
            {[...Array(15)].map((_, i) => (
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
                Technical Expertise
              </motion.span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white">
              My <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">Skills</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              A comprehensive overview of my technical skills, tools, and technologies
              that I use to build exceptional digital experiences.
            </motion.p>

          {/* Skills Overview Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {skillCategories.map((category) => (
              <div key={category.id} className="text-center p-6 bg-slate-800/30 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="mb-2">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {skills[category.id]?.length || 0}
                </div>
                <div className="text-sm text-slate-400">{category.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Categories */}
      <section className="py-12 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <category.icon className="w-6 h-6" />
                  <span>{category.label}</span>
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                    {skills[category.id]?.length || 0}
                  </span>
                </span>
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                    onMouseEnter={() => setHoveredSkill(skillKey)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Skill Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0">
                        {(() => {
                          const skillIcon = getSkillIcon(skill.name || skill);
                          return React.createElement(skillIcon.icon, {
                            size: 32,
                            color: skillIcon.color,
                            className: "transition-transform duration-300 group-hover:scale-110"
                          });
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {skill.name || skill}
                        </h3>
                        <span className={`text-sm font-medium ${proficiency.color}`}>
                          {proficiency.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {skill.level || 85}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skillCategories.find(cat => cat.id === selectedCategory)?.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${animatedValue}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Skill Description */}
                    {skill.description && (
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    )}

                    {/* Experience Years */}
                    {skill.experience && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        <span>{skill.experience} years experience</span>
                      </div>
                    )}

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      initial={false}
                      animate={{
                        opacity: hoveredSkill === skillKey ? 1 : 0
                      }}
                    />

                    {/* Skill Level Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 rounded-full ${
                        (skill.level || 85) >= 90 ? 'bg-emerald-400' :
                        (skill.level || 85) >= 80 ? 'bg-cyan-400' :
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

      {/* Skills Summary */}
      <section className="py-20 bg-slate-800/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Continuous <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Learning</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying at the forefront
              of innovation through continuous learning and hands-on practice.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-3">Always Learning</h3>
              <p className="text-slate-400">
                Constantly exploring new technologies, frameworks, and best practices to stay current.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold text-white mb-3">Hands-on Practice</h3>
              <p className="text-slate-400">
                Building real projects and experimenting with cutting-edge tools and technologies.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-white mb-3">Best Practices</h3>
              <p className="text-slate-400">
                Following industry standards and implementing clean, maintainable, and scalable code.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Build Something <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Amazing</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to leverage these skills for your next project? Let's discuss how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
      </div>
    </>
  );
};

export default Skills;
