import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { sendToDiscord } from "../../common/utils/Discords/sendContactFormData";
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
  const youtubeUrl = socialLinks?.professional?.youtube;

  const projectTypes = [
    { value: "web-development", label: "Web Development", icon: Globe },
    { value: "mobile-app", label: "Mobile App", icon: Smartphone },
    { value: "api-development", label: "API Development", icon: Link },
    { value: "consulting", label: "Consulting", icon: Lightbulb },
    { value: "other", label: "Other", icon: Rocket },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.contact?.email || "Contact via form",
      href: personalInfo.contact?.email
        ? `mailto:${personalInfo.contact.email}`
        : "#",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.contact?.phone || "Contact via form",
      href: personalInfo.contact?.phone
        ? `tel:${personalInfo.contact.phone}`
        : "#",
      description: "Call me during business hours",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location?.current || "Remote",
      href: "#",
      description: "Based in India",
    },
    {
      icon: Briefcase,
      label: "LinkedIn",
      value: "Connect with me",
      href: socialLinks.professional?.linkedin || "#",
      description: "Professional networking",
    },
    {
      icon: Globe,
      label: "YouTube",
      value: "Watch my latest videos",
      href: youtubeUrl || "#",
      description: "AI, development, and tech content",
    },
  ];

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

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      sendToDiscord(formData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "web-development",
      });
    } catch (error) {
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="Contact"
        description="Get in touch to discuss your project ideas. I'm available for web development, mobile apps, and consulting services."
        keywords={portfolioData.seoKeywords}
        type="website"
      />
      <StructuredData type="person" />

      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
                Let's Connect
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white"
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                Touch
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Ready to bring your ideas to life? Let's discuss your project and
              explore how we can work together to create something amazing.
            </motion.p>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-full border border-white/10 backdrop-blur-sm"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                Available for new projects
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 bg-slate-800/30">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href || "#"}
                  target={
                    method.href && method.href.startsWith("http")
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    method.href && method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : ""
                  }
                  className="group block p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center">
                    <div className="text-cyan-400 mb-4 flex justify-center">
                      <method.icon size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {method.label}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-2">
                      {method.value}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {method.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="h-fit bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Send Me a Message
                  </h2>
                  <p className="text-slate-300">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>

                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 [&>option]:bg-slate-800 [&>option]:text-white [&>option]:py-2"
                    >
                      {projectTypes.map((type) => (
                        <option
                          key={type.value}
                          value={type.value}
                          className="bg-slate-800 text-white py-2 px-4"
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/25"
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>

                  {/* Submit Status */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl ${
                        submitStatus === "success"
                          ? "bg-green-500/10 border border-green-500/20 text-green-300"
                          : "bg-red-500/10 border border-red-500/20 text-red-300"
                      }`}
                    >
                      {submitStatus === "success" ? (
                        <span className="flex items-center gap-2">
                          <span>✅</span>
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>❌</span>
                          Something went wrong. Please try again or contact me
                          directly.
                        </span>
                      )}
                    </motion.div>
                  )}
                </motion.form>
              </motion.div>

              {/* Contact Info & Social */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Why Work With Me */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Why Work With Me?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-cyan-400 text-xl">⚡</span>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Fast Response
                        </h4>
                        <p className="text-slate-400 text-sm">
                          I typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-cyan-400 text-xl">🎯</span>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Goal-Oriented
                        </h4>
                        <p className="text-slate-400 text-sm">
                          Focused on delivering results that matter
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-cyan-400 text-xl">🤝</span>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Collaborative
                        </h4>
                        <p className="text-slate-400 text-sm">
                          I work closely with clients throughout the process
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-cyan-400 text-xl">🔧</span>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Technical Excellence
                        </h4>
                        <p className="text-slate-400 text-sm">
                          Clean, scalable, and maintainable code
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Connect on Social
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(socialLinks)
                      .map(([category, links]) =>
                        Object.entries(links).map(([platform, url]) => (
                          <a
                            key={`${category}-${platform}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <span>
                              {platform === "github" && (
                                <Github className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "linkedin" && (
                                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "twitter" && (
                                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "instagram" && (
                                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "facebook" && (
                                <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "telegram" && (
                                <Smartphone className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "discord" && (
                                <Smartphone className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "whatsapp" && (
                                <Phone className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "reddit" && (
                                <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                              {platform === "portfolio" && (
                                <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                              )}
                            </span>
                            <span className="text-white font-medium capitalize group-hover:text-cyan-300 transition-colors duration-300">
                              {platform}
                            </span>
                          </a>
                        ))
                      )
                      .flat()}
                  </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Quick FAQ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        What's your typical response time?
                      </h4>
                      <p className="text-slate-400 text-sm">
                        I usually respond within 24 hours, often much sooner.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Do you work with international clients?
                      </h4>
                      <p className="text-slate-400 text-sm">
                        Yes! I work with clients worldwide and am flexible with
                        time zones.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        What's your preferred project size?
                      </h4>
                      <p className="text-slate-400 text-sm">
                        I work on projects of all sizes, from small features to
                        full applications.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-slate-800/50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Let's Create Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Extraordinary
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Every great project starts with a conversation. I'm excited to
                hear about your ideas and explore how we can bring them to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Email Me Directly
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

export default Contact;
