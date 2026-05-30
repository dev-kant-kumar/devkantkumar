import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  Github,
  Twitter,
  Instagram,
  Smartphone,
  Send,
  Sparkles,
  Clock,
  Target,
  Users,
  Cpu,
  Globe,
  Wrench,
  Briefcase,
  Lightbulb,
  ArrowUpRight,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Activity,
  Layers
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { sendToDiscord } from "../../common/utils/Discords/sendContactFormData";
import { useSubmitContactFormMutation } from "../../store/api/baseApi";
import { portfolioData } from "../../store/data/portfolioData";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "web-development",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { personalInfo, socialLinks } = portfolioData;

  const projectTypes = useMemo(() => [
    { value: "web-development", label: "Web Development", icon: Globe },
    { value: "mobile-app", label: "Mobile App", icon: Smartphone },
    { value: "api-development", label: "API Development", icon: Cpu },
    { value: "consulting", label: "Consulting", icon: Lightbulb },
    { value: "other", label: "Other", icon: Sparkles },
  ], []);

  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.contact?.email || "Contact via form",
      href: personalInfo.contact?.email ? `mailto:${personalInfo.contact.email}` : "#",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.contact?.phone || "Contact via form",
      href: personalInfo.contact?.phone ? `tel:${personalInfo.contact.phone}` : "#",
      description: "Call me during business hours",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location?.current || "Remote",
      href: "#",
      description: "Based in Patna, Bihar, India",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: socialLinks.professional?.linkedin || "#",
      description: "Professional networking",
    },
  ], [personalInfo, socialLinks]);

  const whyWorkWithMe = useMemo(() => [
    {
      icon: Clock,
      title: "Fast Response",
      description: "I typically get back to you within 2-4 hours."
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Focused entirely on delivering results that matter."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Working closely with you throughout the entire cycle."
    },
    {
      icon: Cpu,
      title: "Technical Quality",
      description: "Writing clean, scalable, and maintainable code."
    }
  ], []);

  const [submitContact] = useSubmitContactFormMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContact(formData).unwrap();

      try {
        sendToDiscord(formData);
      } catch (discordError) {
        console.error("Discord notification failed:", discordError);
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "web-development",
      });
    } catch (error) {
      console.error("Submission error details:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="Contact"
        description="Get in touch for web development, mobile apps, and consulting services."
        keywords={portfolioData.seoKeywords}
        type="website"
      />
      <StructuredData type="person" />

      <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
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
                opacity: [0.4, 0.7, 0.4],
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
            {/* Beacon Badge */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-900/80 border border-cyan-500/20 rounded-xl text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-cyan-500/5 cursor-default"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="uppercase tracking-wider font-bold">LET'S CONNECT</span>
              </motion.div>
            </motion.div>

            {/* Dynamic Page Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.08]"
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>

            {/* Subtext description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Have an idea or project in mind? Let's work together to bring it to life with clean code and great design.
            </motion.p>
          </motion.div>
        </section>

        {/* Contact Methods Grid */}
        <section className="py-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : "_self"}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                  className="group block p-6 bg-slate-950/80 border border-slate-900 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.03)] text-left flex flex-col items-start gap-4"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-colors">
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-cyan-300 transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-base font-extrabold text-white mb-1.5 break-words">
                      {method.value}
                    </p>
                    <p className="text-xs text-slate-500 leading-normal">
                      {method.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Form & Side Information */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Glass Contact Form (7/12 cols) */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-7 bg-slate-950/80 border border-slate-900 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-8"
              >
                <div className="text-left space-y-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    Send a Message
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">
                    Fill out the details below and I'll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {/* Name & Email inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-900/80 transition-all text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-900/80 transition-all text-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Project Type Selection */}
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Project Category
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500/60 transition-all text-sm cursor-pointer [&>option]:bg-slate-950 [&>option]:text-slate-100 [&>option]:py-2"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-900/80 transition-all text-sm"
                      placeholder="What is this about?"
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-900/80 transition-all text-sm resize-none"
                      placeholder="Please tell me about your project ideas, requirements, and timeline..."
                    />
                  </div>

                  {/* Submit Action */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Status Alerts */}
                  <AnimatePresence mode="wait">
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 p-3.5 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl font-bold"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Message sent successfully! I will contact you soon.</span>
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 p-3.5 bg-rose-950/20 border border-rose-500/20 text-rose-400 text-sm rounded-xl font-bold"
                      >
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                        <span>Failed to send. Please try again or email me directly.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              </motion.div>

              {/* Right Column: Why Work With Me & FAQ (5/12 cols) */}
              <div className="lg:col-span-5 space-y-8 text-left">
                
                {/* Specialties panel */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-slate-950/80 border border-slate-900 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6"
                >
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Why Work With Me?
                  </h3>
                  <div className="space-y-4">
                    {whyWorkWithMe.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mt-0.5 shadow-sm">
                          <item.icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                          <p className="text-xs text-slate-400 leading-normal">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* FAQ section */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-slate-950/80 border border-slate-900 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6"
                >
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Quick FAQ
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-cyan-400" />
                        Do you work with global clients?
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed pl-6">
                        Yes! I work with clients worldwide and support flexible, remote time zone alignments.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-cyan-400" />
                        What is your preferred project size?
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed pl-6">
                        I build everything from single modules and clean prototypes to fully scaled web services.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;
