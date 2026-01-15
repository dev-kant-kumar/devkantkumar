import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowUpRight,
    Award,
    Briefcase,
    CheckCircle,
    ChevronUp,
    Clock,
    Code,
    ExternalLink,
    Github,
    Globe,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Sparkles,
    Twitter,
    Users,
    Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSubscribeMutation } from "../../store/api/subscriberApiSlice";
import { portfolioData } from "../../store/data/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo, socialLinks, technicalSkills, achievements } =
    portfolioData;

  // Newsletter form state
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const [subscribe, { isLoading: isSubmitting }] = useSubscribeMutation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await subscribe(email).unwrap();
      setSubmitStatus("success");
      setEmail("");
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error?.data?.message || "Failed to subscribe. Please try again later.");
    }
  };

  const footerSections = {
    quickLinks: [
      { name: "Home", path: "/" },
      { name: "About Me", path: "/about" },
      { name: "My Skills", path: "/skills" },
      { name: "Portfolio", path: "/projects" },
      { name: "Content", path: "/content" },
      { name: "Blog", path: "/blog" },
      { name: "Free Tools", path: "/tools" },
      { name: "Contact", path: "/contact" },
    ],
    services: [
      { name: "Full Stack Development", path: "/marketplace/services" },
      { name: "Frontend Development", path: "/marketplace/services" },
      { name: "Backend Development", path: "/marketplace/services" },
      { name: "UI/UX Implementation", path: "/marketplace/services" },
      { name: "Code Review", path: "/marketplace/services" },
      { name: "Consulting", path: "/marketplace/custom-solutions" },
    ],
    resources: [
      {
        name: "Download Resume",
        path: "/devkantkumar-resume.pdf",
        external: true,
      },
      { name: "Tech Stack", path: "/skills" },
      { name: "Case Studies", path: "/projects" },
      { name: "Site Map", path: "/sitemap" },
      { name: "FAQ", path: "/faq" },
    ],
  };

  const socialPlatforms = [
    {
      name: "GitHub",
      url: socialLinks.professional.github,
      icon: Github,
      color: "hover:text-cyan-400",
    },
    {
      name: "LinkedIn",
      url: socialLinks.professional.linkedin,
      icon: Linkedin,
      color: "hover:text-cyan-400",
    },
    {
      name: "Twitter",
      url: socialLinks.social.twitter,
      icon: Twitter,
      color: "hover:text-cyan-400",
    },
    {
      name: "Instagram",
      url: socialLinks.social.instagram,
      icon: Instagram,
      color: "hover:text-cyan-400",
    },
    {
      name: "WhatsApp",
      url: socialLinks.communication.whatsapp,
      icon: MessageCircle,
      color: "hover:text-cyan-400",
    },
    {
      name: "Telegram",
      url: socialLinks.communication.telegram,
      icon: Send,
      color: "hover:text-cyan-400",
    },
  ];

  const achievementStats = [
    {
      icon: Code,
      label: "Projects Built",
      value: "6+",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Users,
      label: "Clients Served",
      value: "10+",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Award,
      label: "Experience",
      value: "2+ Years",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Globe,
      label: "Global Reach",
      value: "8+ Countries",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <footer className="relative bg-[#0f1729] border-t border-cyan-500/10 overflow-hidden">
      {/* Background matching hero section */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729] via-[#1a2332] to-[#0f1729]" />

        {/* Animated orbs matching hero */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Top Section - Brand & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 mb-20 pb-20 border-b border-cyan-500/10"
          >
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0f1729] shadow-lg shadow-emerald-500/50"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {personalInfo.name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    {personalInfo.title}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed max-w-md text-lg">
                {personalInfo.tagline}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>{personalInfo.location.current}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>{personalInfo.location.timezone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50"
                  />
                  <span className="text-sm text-emerald-400 font-semibold">
                    {personalInfo.availability.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  Stay Updated
                </h4>
                <p className="text-slate-300 text-sm">
                  Get notified about new projects, blog posts, and tech
                  insights.
                </p>
              </div>

              <div className="space-y-4">
                {/* Mobile Layout - Stacked */}
                <div className="flex flex-col gap-3 sm:hidden">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 bg-[#1a2332] border border-cyan-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#1e2838] transition-all duration-300 disabled:opacity-50"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    disabled={isSubmitting}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Desktop Layout - Inline */}
                <div className="relative group hidden sm:block">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 pr-40 bg-[#1a2332] border border-cyan-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#1e2838] transition-all duration-300 disabled:opacity-50"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    disabled={isSubmitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Successfully subscribed! Thank you for joining.</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <p className="text-slate-500 text-xs">
                  No spam, unsubscribe at any time. Privacy policy compliant.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20"
          >
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerSections.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-3 h-3 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                Services
              </h4>
              <ul className="space-y-3">
                {footerSections.services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Resources
              </h4>
              <ul className="space-y-3">
                {footerSections.resources.map((resource, index) => (
                  <li key={index}>
                    {resource.external ? (
                      <a
                        href={resource.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {resource.name}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        to={resource.path}
                        className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {resource.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                Contact
              </h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Email Me
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${personalInfo.contact.phone}`}
                    className="text-slate-300 hover:text-cyan-400 text-sm transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Call Me
                    </span>
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2">
                {socialPlatforms.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center ${social.color} transition-all duration-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20`}
                    title={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-cyan-500/10"
          >
            {achievementStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 mb-3 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Bar */}
          {/* Bottom Bar - Mobile Layout (Optimized for small devices) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex md:hidden flex-col items-center gap-6"
          >
            {/* Copyright */}
            <div className="flex flex-col items-center gap-2 text-sm text-slate-400 text-center">
              <span>
                © {currentYear} {personalInfo.name}
              </span>
              <span className="flex items-center gap-1.5">
                Crafted with{" "}
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> in
                India
              </span>
            </div>

            {/* Policy Links - Centered Grid for Mobile */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4">
              <Link
                to="/privacy"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Sitemap
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium">
                  v2.0.0
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar - Desktop Layout (Original) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>
                © {currentYear} {personalInfo.name}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                Crafted with{" "}
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> in
                India
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Sitemap
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium">
                  v2.0.0
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/20"
        title="Back to top"
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  );
};

export default Footer;
