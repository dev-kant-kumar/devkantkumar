import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  Clock,
  Code,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Star,
  Target,
  Twitter,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../../store/data/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo, socialLinks, technicalSkills, achievements } = portfolioData;

  // Newsletter form state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Newsletter submission handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Simulate API call - replace with actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For now, just show success message
      setSubmitStatus('success');
      setEmail('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced navigation with better organization
  const footerSections = {
    quickLinks: [
      { name: "Home", path: "/", icon: "🏠" },
      { name: "About Me", path: "/about", icon: "👨‍💻" },
      { name: "My Skills", path: "/skills", icon: "⚡" },
      { name: "Portfolio", path: "/projects", icon: "🚀" },
      { name: "Blog", path: "/blog", icon: "📝" },
      { name: "Contact", path: "/contact", icon: "💬" },
    ],
    services: [
      { name: "Full Stack Development", path: "/marketplace/services", icon: "🌐", description: "MERN Stack Applications" },
      { name: "Frontend Development", path: "/marketplace/services", icon: "⚛️", description: "React.js & Modern UI" },
      { name: "Backend Development", path: "/marketplace/services", icon: "🔗", description: "Node.js & APIs" },
      { name: "UI/UX Implementation", path: "/marketplace/services", icon: "🎨", description: "Responsive Design" },
      { name: "Code Review", path: "/marketplace/services", icon: "🔍", description: "Quality Assurance" },
      { name: "Consulting", path: "/marketplace/custom-solutions", icon: "💡", description: "Technical Guidance" },
    ],
    resources: [
      { name: "Download Resume", path: "/resume.pdf", icon: "📄", external: true },
      { name: "Tech Stack", path: "/skills", icon: "🛠️" },
      { name: "Case Studies", path: "/projects", icon: "📊" },
      { name: "GitHub Profile", path: portfolioData.socialLinks.professional.github, icon: "💻", external: true },
      { name: "LinkedIn", path: portfolioData.socialLinks.professional.linkedin, icon: "🔗", external: true },
      { name: "Portfolio Source", path: portfolioData.socialLinks.professional.portfolio, icon: "🗺️", external: true },
    ]
  };

  // Enhanced social media with better organization
  const socialPlatforms = {
    professional: [
      {
        name: "GitHub",
        url: socialLinks.professional.github,
        icon: Github,
        color: "hover:text-white hover:bg-gray-800",
        bgColor: "bg-gray-900/50",
        description: "Open source projects",
      },
      {
        name: "LinkedIn",
        url: socialLinks.professional.linkedin,
        icon: Linkedin,
        color: "hover:text-white hover:bg-blue-600",
        bgColor: "bg-blue-900/50",
        description: "Professional network",
      },
    ],
    social: [
      {
        name: "Twitter",
        url: socialLinks.social.twitter,
        icon: Twitter,
        color: "hover:text-white hover:bg-blue-500",
        bgColor: "bg-blue-900/50",
        description: "Tech updates & thoughts",
      },
      {
        name: "Instagram",
        url: socialLinks.social.instagram,
        icon: Instagram,
        color: "hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
        bgColor: "bg-pink-900/50",
        description: "Behind the scenes",
      },
    ],
    communication: [
      {
        name: "WhatsApp",
        url: socialLinks.communication.whatsapp,
        icon: MessageCircle,
        color: "hover:text-white hover:bg-green-500",
        bgColor: "bg-green-900/50",
        description: "Quick chat",
      },
      {
        name: "Telegram",
        url: socialLinks.communication.telegram,
        icon: Send,
        color: "hover:text-white hover:bg-blue-500",
        bgColor: "bg-blue-900/50",
        description: "Instant messaging",
      },
    ]
  };

  // Enhanced stats with better metrics
  const achievementStats = [
    {
      icon: Code,
      label: "Projects Built",
      value: "6+",
      color: "from-cyan-400 to-blue-500",
      description: "Full-stack applications",
    },
    {
      icon: Users,
      label: "Clients Served",
      value: "10+",
      color: "from-green-400 to-emerald-500",
      description: "Satisfied customers",
    },
    {
      icon: Award,
      label: "Experience",
      value: "2+ Years",
      color: "from-purple-400 to-violet-500",
      description: "Professional development",
    },
    {
      icon: Globe,
      label: "Global Reach",
      value: "8+ Countries",
      color: "from-orange-400 to-red-500",
      description: "International projects",
    },
  ];

  // Tech stack highlights
  const techHighlights = [
    "React.js", "Node.js", "TypeScript", "MongoDB",
    "Express.js", "Tailwind CSS", "Next.js", "PostgreSQL"
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-white/5 overflow-hidden">
      {/* Enhanced Background with Modern Effects */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

        {/* Dynamic floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/8 to-teal-500/8 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Modern grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%20opacity%3D%220.05%22/%3E%3C/svg%3E')] opacity-30" />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 border-b border-white/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <motion.div
              variants={sectionVariants}
              className="inline-flex items-center gap-4 mb-6"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                    <Code className="w-10 h-10 text-cyan-400" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-white">{personalInfo.name}</h3>
                <p className="text-cyan-400 font-medium text-lg">{personalInfo.title}</p>
              </div>
            </motion.div>

            <motion.p
              variants={sectionVariants}
              className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>
          </div>

          {/* Key Highlights */}
          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {achievementStats.slice(0, 3).map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                      <stat.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-slate-400">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        className="relative z-10 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* First Row: Quick Links, Connect, Services */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

            {/* Quick Links */}
            <motion.div
              className="lg:col-span-4"
              variants={sectionVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 group-hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                  </div>
                  <div className="space-y-3">
                    {footerSections.quickLinks.map((section, index) => (
                      <Link
                        key={index}
                        to={section.path}
                        className="flex items-center gap-3 text-slate-300 hover:text-purple-400 transition-all duration-300 group/link p-2 rounded-lg hover:bg-white/5"
                      >
                        <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover/link:text-purple-300" />
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                          {section.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connect */}
            <motion.div
              className="lg:col-span-4"
              variants={sectionVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 group-hover:border-orange-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-5 h-5 text-orange-400" />
                    <h4 className="text-lg font-semibold text-white">Connect</h4>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-all duration-300 group/contact p-2 rounded-lg hover:bg-white/5"
                    >
                      <Mail className="w-4 h-4 text-orange-400" />
                      <span className="text-sm group-hover/contact:translate-x-1 transition-transform duration-300">
                        Email
                      </span>
                    </a>
                    <a
                      href={`tel:${personalInfo.contact.phone}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-all duration-300 group/contact p-2 rounded-lg hover:bg-white/5"
                    >
                      <Phone className="w-4 h-4 text-orange-400" />
                      <span className="text-sm group-hover/contact:translate-x-1 transition-transform duration-300">
                        Call
                      </span>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(socialPlatforms).flat().slice(0, 4).map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300 group/social"
                          variants={socialVariants}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="w-4 h-4 text-orange-400 group-hover/social:text-orange-300 transition-colors" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-emerald-400 font-medium text-xs">
                        Available for projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              className="lg:col-span-4"
              variants={sectionVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 group-hover:border-emerald-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-lg font-semibold text-white">Services</h4>
                  </div>
                  <div className="space-y-3">
                    {footerSections.services.slice(0, 6).map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="group/service p-2 rounded-lg hover:bg-white/5 transition-all duration-300 block"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{service.icon}</span>
                          <div className="text-slate-300 group-hover/service:text-emerald-400 transition-colors duration-300 font-medium text-sm">
                            {service.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Second Row: About Me and Stay Updated */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* About Me */}
            <motion.div
              className="lg:col-span-6"
              variants={sectionVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">About Me</h3>
                      <p className="text-slate-300 leading-relaxed">
                        {personalInfo.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300 text-sm">{personalInfo.location.current}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300 text-sm">{personalInfo.location.timezone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-3 h-3 bg-emerald-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-emerald-400 font-medium text-sm">{personalInfo.availability.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stay Updated */}
            <motion.div
              className="lg:col-span-6"
              variants={sectionVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-xl font-bold text-white">Stay Updated</h4>
                  </div>

                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Get notified about new projects, blog posts, and tech insights. Join the community of developers and tech enthusiasts.
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </span>
                      </button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-emerald-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Successfully subscribed! Thank you for joining.</span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <p className="text-slate-500 text-xs">
                      No spam, unsubscribe at any time. Privacy policy compliant.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Bottom Section */}
      <motion.div
        className="relative z-10 border-t border-white/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            variants={sectionVariants}
            className="flex flex-col lg:flex-row justify-between items-center gap-8"
          >
            {/* Copyright & Brand */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-slate-400 text-sm">
                © {currentYear} {personalInfo.name}. All rights reserved.
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <span>Crafted with</span>
                <motion.span
                  className="text-red-400 mx-2 text-lg"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ♥
                </motion.span>
                <span>in India</span>
              </div>
            </div>

            {/* Legal Links & Version */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
              <div className="flex items-center gap-6 text-slate-400">
                <Link
                  to="/privacy"
                  className="hover:text-cyan-300 transition-colors duration-300 relative group"
                >
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-cyan-300 transition-colors duration-300 relative group"
                >
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  to="/sitemap"
                  className="hover:text-cyan-300 transition-colors duration-300 relative group"
                >
                  Sitemap
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
              <motion.div
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium">v2.1.0</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Fixed Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            title="Back to Top"
          >
            <ArrowUpRight className="w-5 h-5 rotate-[-45deg] group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
