import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioData } from '../../store/data/portfolioData';
import ScrollTriggerComponent from '../../common/components/ui/ScrollTrigger';
import TextReveal from '../../common/components/ui/TextReveal';
import { AdvancedAnimations } from '../../common/utils/animations';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';
import Analytics from '../../../../components/SEO/Analytics';
import {
  BookOpen,
  Rocket,
  Gem,
  Target,
  Zap,
  GraduationCap,
  Handshake
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const {
    personalInfo = {},
    professionalSummary = {},
    workExperience = [],
    education = {},
    achievements = [],
    interests = [],
    careerObjectives = {},
    technicalSkills = {}
  } = portfolioData || {};

  // Extract core skills from technical skills
  const coreSkills = technicalSkills.core || [
    'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript',
    'Python', 'Git', 'AWS', 'Docker', 'GraphQL', 'REST APIs'
  ];



  // Error handling for missing data
  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'story', label: 'My Story', icon: BookOpen },
    { id: 'journey', label: 'Journey', icon: Rocket },
    { id: 'values', label: 'Values', icon: Gem },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
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
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.div variants={itemVariants} className="mb-6">
                <motion.span
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-xl shadow-lg shadow-cyan-500/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                  About Me
                </motion.span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                Crafting Digital
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Experiences
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl lg:text-2xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                {professionalSummary.overview || "Passionate full-stack developer creating innovative digital solutions."}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Let's Connect
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  View My Work
                </Link>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                variants={itemVariants}
                className="flex justify-start"
              >
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
            </div>

            {/* Right Content - Profile Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 rounded-3xl blur-2xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-3xl" />
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 border border-cyan-500/20">
                  <motion.img
                    src={personalInfo.profileImage || "/api/placeholder/320/320"}
                    alt={personalInfo.name || "Profile"}
                    className="w-full h-full object-cover rounded-2xl backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
                {/* Floating elements around image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-60"
                  animate={{
                    y: [10, -10, 10],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Professional Summary Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6 text-center">
                Professional Summary
              </h2>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-purple-500/20 shadow-2xl">
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg text-center">
                    {professionalSummary?.overview || `I'm a passionate ${personalInfo.title} with a strong foundation in modern web development technologies.`}
                  </p>

                  {professionalSummary?.highlights && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 text-center">
                        Key Highlights
                      </h3>
                      <ul className="space-y-3">
                        {professionalSummary.highlights.map((highlight, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 group/item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            />
                            <span className="text-slate-300 group-hover/item:text-slate-200 transition-colors">
                              {highlight}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === 'story' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">My Story</h2>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4">The Beginning</h3>
                    <p className="text-slate-300 leading-relaxed">
                      My journey into web development started with curiosity and a passion for creating digital solutions.
                      What began as experimenting with HTML and CSS evolved into a deep love for full-stack development.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">The Growth</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Through continuous learning and hands-on projects, I've developed expertise in modern technologies
                      like React, Node.js, and MongoDB, always staying current with industry trends.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'journey' && (
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-12 text-center">Professional Journey</h2>
                <div className="space-y-8">
                  {workExperience && workExperience.length > 0 ? workExperience.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      variants={timelineVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative flex gap-8 group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300" />
                        {index < workExperience.length - 1 && (
                          <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-400/50 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                        <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-2xl group-hover:border-cyan-500/40 transition-all duration-300">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{experience.position}</h3>
                            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm rounded-full border border-cyan-500/20 font-medium">
                              {experience.status}
                            </span>
                          </div>
                          <p className="text-cyan-300 font-medium mb-2">{experience.company}</p>
                          <p className="text-slate-400 text-sm mb-4 font-medium bg-slate-700/50 px-3 py-1 rounded-full inline-block">{experience.duration}</p>
                          <p className="text-slate-300 mb-4 leading-relaxed">{experience.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {(experience.technologies || []).map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-slate-700/70 text-slate-300 text-xs rounded border border-slate-600/50 hover:border-cyan-500/30 transition-colors duration-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-12">
                      <p className="text-slate-400">No work experience data available.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Quality First",
                      description: "Every line of code is written with precision and purpose, ensuring robust and maintainable solutions.",
                      icon: Zap
                    },
                    {
                      title: "Continuous Learning",
                      description: "Staying current with emerging technologies and best practices to deliver cutting-edge solutions.",
                      icon: GraduationCap
                    },
                    {
                      title: "Collaboration",
                      description: "Believing in the power of teamwork and open communication to achieve exceptional results.",
                      icon: Handshake
                    }
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="mb-4">
                        <value.icon className="w-10 h-10 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                      <p className="text-slate-300">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Future Goals</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-6">Career Aspirations</h3>
                    <ul className="space-y-3 text-slate-300 text-left">
                      {(careerObjectives.goals || []).map((goal, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-purple-300 mb-6">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {(interests || []).map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-purple-500/10 text-purple-300 text-sm rounded-full border border-purple-500/20"
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



      {/* Core Skills Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Core <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Technologies and tools I work with to create exceptional digital experiences
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-cyan-500/20 shadow-2xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {coreSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="relative group/skill"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-md opacity-0 group-hover/skill:opacity-100 transition-all duration-300" />
                      <div className="relative bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 text-center border border-slate-600/30 group-hover/skill:border-cyan-500/50 transition-all duration-300">
                        <span className="text-slate-300 font-medium group-hover/skill:text-white transition-colors">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Key <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Milestones that define my journey as a developer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(achievements || []).map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                    {achievement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-12 text-center"
          >
            Education
          </motion.h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {education && education.length > 0 ? education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 shadow-2xl group-hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {edu.degree}
                    </h3>
                    <span className="text-slate-400 text-sm font-medium bg-slate-700/50 px-3 py-1 rounded-full">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-lg text-white mb-3 font-medium">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-slate-300 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No education data available.</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Create Something <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Amazing</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and build exceptional digital experiences together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                View My Projects
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default About;
