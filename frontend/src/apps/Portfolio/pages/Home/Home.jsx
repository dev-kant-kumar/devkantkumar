import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import { portfolioData } from '../../store/data/portfolioData';
import { useMetadata } from '../../../../utils/useMetadata';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';
import Analytics from '../../../../components/SEO/Analytics';

const Home = () => {
  const { projects, technicalSkills, workExperience } = portfolioData;
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  // Update metadata for home page
  useMetadata({
    title: 'Home',
    description: 'Welcome to my portfolio. Explore my projects, skills, and experience as a Full Stack Developer.',
    keywords: 'portfolio, home, full stack developer, projects, skills'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="Home"
        description={`${portfolioData.personalInfo.name} – Full Stack Developer (MERN), UI/UX Engineer, and Open Source Contributor. Explore projects using React, Node.js, MongoDB, Tailwind CSS, Git, Postman, and more. Available for freelance, remote, and tech collaborations.`}
        keywords={portfolioData.seoKeywords}
        image={portfolioData.personalInfo.profileImage}
        type="website"
      />
      <StructuredData type="person" />
      <Analytics />

      <div className="bg-slate-900">
        <Hero />

      {/* Quick Intro Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Crafting Digital <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              I specialize in building scalable, user-centric applications that bridge the gap between
              innovative design and robust functionality. Every project is an opportunity to push boundaries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance First</h3>
              <p className="text-slate-400">Optimized applications with lightning-fast load times and smooth user interactions.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Modern Design</h3>
              <p className="text-slate-400">Clean, intuitive interfaces that provide exceptional user experiences across all devices.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Scalable Solutions</h3>
              <p className="text-slate-400">Robust architectures built to grow with your business and handle increasing demands.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A showcase of my latest work, demonstrating expertise in full-stack development and modern technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm rounded-full border border-cyan-500/20">
                      {project.category}
                    </span>
                    <span className="text-slate-400 text-sm">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-slate-400 mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.links.github && project.links.github !== '#' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 hover:text-white transition-all duration-300"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              View All Projects
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Overview */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-b from-slate-800 to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Proficient in modern technologies and frameworks, constantly evolving with the industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-6">Frontend</h3>
              <div className="space-y-4">
                {technicalSkills.frontend.expert.map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-white">{skill}</span>
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-purple-300 mb-6">Backend</h3>
              <div className="space-y-4">
                {technicalSkills.backend.advanced.map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-white">{skill}</span>
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-green-300 mb-6">Tools</h3>
              <div className="space-y-4">
                {technicalSkills.tools.expert.map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-white">{skill}</span>
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-slate-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Something <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Amazing?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life with cutting-edge technology and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Start a Project
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                Learn More About Me
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
