import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  ChevronUp,
  Clock,
  Code,
  ExternalLink,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Twitter,
  Zap,
  Phone,
  Globe,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSubscribeMutation } from "../../store/api/subscriberApiSlice";
import { portfolioData } from "../../store/data/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo, socialLinks, careerObjectives } = portfolioData;

  // Same epoch-clock sync formula used in Header & Hero — all three stay in perfect lockstep
  const skills = [
    personalInfo.title,
    personalInfo.subtitle,
    ...careerObjectives.seekingRoles.slice(0, 3),
    "Full Stack Architect",
    "Product Founder",
  ];

  const [roleIndex, setRoleIndex] = useState(() => Math.floor(Date.now() / 2800) % skills.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(Math.floor(Date.now() / 2800) % skills.length);
    }, 200);
    return () => clearInterval(interval);
  }, [skills.length]);

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
      { name: "Site Map", path: "/sitemap.xml", external: true },
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

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 overflow-hidden text-left">
      {/* Decorative Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Glow sweeps */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-12">

        {/* Top Segment: Brand Grid & Newsletter Input */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-900">

          {/* Brand Intro Card (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              {/* Profile Picture replacing the code icon */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Online indicator dot */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">{personalInfo.name}</h3>
                {/* Synced role ticker — same epoch clock as Header & Hero */}
                <div className="flex items-center gap-1.5 mt-1" style={{ minWidth: '160px', height: '16px', overflow: 'hidden' }}>
                  <Activity size={9} className="text-cyan-500 animate-pulse shrink-0" />
                  <div className="relative flex-1 h-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIndex}
                        className="absolute inset-0 flex items-center text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider whitespace-nowrap"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        {skills[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {personalInfo.tagline}
            </p>

            {/* Quick Status Badges */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{personalInfo.location.current}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{personalInfo.location.timezone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold font-mono">{personalInfo.availability.status}</span>
              </div>
            </div>
          </div>

          {/* Newsletter Segment (5/12 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                Stay Updated
              </h4>
              <p className="text-slate-400 text-xs">
                Subscribe to get notified about new projects, articles, and tech insights.
              </p>
            </div>

            {/* Subscribe Form Box */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-900/80 transition-all text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-xs rounded-xl tracking-wider uppercase shadow-md shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Feedbacks */}
              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2.5 font-bold"
                  >
                    <span>Thank you for subscribing!</span>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/20 border border-rose-500/20 rounded-lg p-2.5 font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Unsubscribe at any time. Clean & Secure.
              </p>
            </form>
          </div>

        </div>

        {/* Center Segment: Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-slate-900 text-sm">

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {footerSections.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 text-xs transition-colors inline-flex items-center gap-1 group font-medium"
                  >
                    <ArrowUpRight className="w-3 h-3 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerSections.services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-slate-400 hover:text-cyan-400 text-xs transition-colors inline-flex items-center gap-1 group font-medium"
                  >
                    <ArrowUpRight className="w-3 h-3 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerSections.resources.map((resource, index) => (
                <li key={index}>
                  {resource.external ? (
                    <a
                      href={resource.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-400 text-xs transition-colors inline-flex items-center gap-1 group font-medium"
                    >
                      <ArrowUpRight className="w-3 h-3 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                      <span>{resource.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link
                      to={resource.path}
                      className="text-slate-400 hover:text-cyan-400 text-xs transition-colors inline-flex items-center gap-1 group font-medium"
                    >
                      <ArrowUpRight className="w-3 h-3 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                      <span>{resource.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contacts */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              Connect
            </h4>
            <ul className="space-y-2.5 mb-5 text-xs text-slate-400 font-medium">
              <li>
                <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-cyan-400 transition-colors inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Developer</span>
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.contact.phone}`} className="hover:text-cyan-400 transition-colors inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Developer</span>
                </a>
              </li>
            </ul>

            {/* Glowing Brand Icon Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {socialPlatforms.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 ${social.color} transition-colors shadow-sm`}
                  title={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Policies */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 text-xs text-slate-500 font-medium">

          {/* Left copyright side */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
            <span>© {currentYear} {personalInfo.name}. All rights reserved.</span>
            <span className="hidden md:inline text-slate-800">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> in India
            </span>
          </div>

          {/* Right policy links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Sitemap</a>

           
          </div>

        </div>

      </div>

      {/* Futuristic Floating Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-cyan-500/10 transition-colors cursor-pointer"
        title="Back to top"
      >
        <ChevronUp className="w-4 h-4 text-cyan-400" />
      </motion.button>
    </footer>
  );
};

export default Footer;
