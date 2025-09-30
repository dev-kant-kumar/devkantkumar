import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../store/data/portfolioData';

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { workExperience: experience, education, achievements = [] } = portfolioData;
  const educationArray = education ? [education] : [];

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

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return months > 0 ? `${years}y ${months}m` : `${years}y`;
    }
    return `${months}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium">
              Professional Journey
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            A comprehensive overview of my professional journey, achievements, and the impact
            I've made throughout my career in software development.
          </motion.p>

          {/* Career Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2+</div>
              <div className="text-sm text-slate-400">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">{experience.length}</div>
              <div className="text-sm text-slate-400">Companies</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-sm text-slate-400">Projects</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-400 mb-2">{achievements.length}</div>
              <div className="text-sm text-slate-400">Achievements</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Timeline</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-300 max-w-3xl mx-auto">
              My journey through different roles and companies, showcasing growth and expertise development.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timeline Navigation */}
            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8">
                <h3 className="text-xl font-semibold text-white mb-6">Experience Timeline</h3>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedExperience(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedExperience === index
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{exp.position}</span>
                        <span className="text-xs opacity-75">
                          {calculateDuration(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                      <div className="text-sm opacity-75">{exp.company}</div>
                      <div className="text-xs opacity-60 mt-1">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExperience}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10"
                >
                  {experience[selectedExperience] && (
                    <>
                      {/* Company Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {experience[selectedExperience].position}
                          </h3>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-xl text-cyan-400 font-semibold">
                              {experience[selectedExperience].company}
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm rounded-full border border-cyan-500/20">
                              {experience[selectedExperience].type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-slate-400">
                            <span>📅 {experience[selectedExperience].startDate} - {experience[selectedExperience].endDate}</span>
                            <span>📍 {experience[selectedExperience].location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {calculateDuration(experience[selectedExperience].startDate, experience[selectedExperience].endDate)}
                          </div>
                          <div className="text-sm text-slate-400">Duration</div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Role Overview</h4>
                        <p className="text-slate-300 leading-relaxed">
                          {experience[selectedExperience].description}
                        </p>
                      </div>

                      {/* Key Responsibilities */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Responsibilities</h4>
                        <ul className="space-y-3">
                          {experience[selectedExperience].responsibilities.map((responsibility, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-slate-300"
                            >
                              <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              {responsibility}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Used */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Technologies & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience[selectedExperience].technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {experience[selectedExperience].achievements && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {experience[selectedExperience].achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-green-400 text-lg">🏆</span>
                                  <span className="text-slate-300 text-sm">{achievement}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-slate-800/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Educational <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Background</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              My academic foundation and continuous learning journey in technology and software development.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {education && (
              <motion.div
                className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                onMouseEnter={() => setHoveredCard('edu-0')}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {education.degree}
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-2">{education.institution}</p>
                    <p className="text-slate-400 text-sm">{education.duration} • {education.location}</p>
                    <p className="text-slate-400 text-sm">Status: {education.status}</p>
                  </div>
                  <div className="text-3xl">🎓</div>
                </div>

                {education.focusAreas && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.focusAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded border border-slate-600/50"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {education.continuousLearning && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Continuous Learning:</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.continuousLearning.map((learning, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded border border-cyan-500/20"
                        >
                          {learning}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  initial={false}
                  animate={{
                    opacity: hoveredCard === 'edu-0' ? 1 : 0
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Key <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Milestones and recognitions that highlight my professional growth and contributions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {achievement.description}
                  </p>
                  <span className="text-xs text-slate-500">{achievement.year}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Collaborate?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how my experience and expertise can contribute to your next project.
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
                View My Projects
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Experience;
