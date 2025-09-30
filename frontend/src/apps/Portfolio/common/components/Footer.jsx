import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  Sparkles,
  Code2,
  Zap,
  Heart,
} from "lucide-react";
import { portfolioData } from "../../store/data/portfolioData";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    personalInfo,
    socialLinks: portfolioSocialLinks,
    availability,
  } = portfolioData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: portfolioSocialLinks.professional.github,
      icon: Github,
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      name: "LinkedIn",
      url: portfolioSocialLinks.professional.linkedin,
      icon: Linkedin,
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      name: "Twitter",
      url: portfolioSocialLinks.social.twitter,
      icon: Twitter,
      gradient: "from-cyan-300 to-blue-400",
    },
    {
      name: "Email",
      url: `mailto:${personalInfo.contact.email}`,
      icon: Mail,
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="relative bg-[#0a1628] overflow-hidden border-t border-cyan-500/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Purple Glow - Top Right */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cyan Glow - Bottom Left */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-block group mb-8">
              <motion.div
                className="text-4xl font-bold tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {personalInfo.name.split(" ").map((word, index) => (
                  <span key={index}>
                    {index === 0 ? (
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      <span className="text-white ml-3">{word}</span>
                    )}
                  </span>
                ))}
              </motion.div>
            </Link>

            <p className="text-slate-400 text-base mb-10 leading-relaxed max-w-md">
              Full-Stack Developer crafting exceptional digital experiences with
              modern technologies. Passionate about clean code, innovative
              solutions, and collaborative development.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Stay updated with my latest projects</span>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                <div className="relative flex gap-2 bg-[#132337] p-1.5 rounded-xl border border-cyan-500/10">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
                  />
                  <motion.button
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg whitespace-nowrap flex items-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links & Status */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Connect
            </h3>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg bg-[#132337] p-4 hover:bg-[#1a2f47] transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative bg-[#132337] rounded-xl p-5 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="relative mt-0.5">
                    <motion.div
                      className="w-2.5 h-2.5 bg-green-400 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(74, 222, 128, 0.7)",
                          "0 0 0 6px rgba(74, 222, 128, 0)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-green-300 font-semibold text-sm mb-1">
                      Available for Work
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">
                      Open to new opportunities and exciting collaborations
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-10" />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-500">
              © {currentYear}{" "}
              <span className="text-slate-400">{personalInfo.name}</span>
            </span>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-slate-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-slate-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </motion.span>
            <span>in</span>
            <span className="text-cyan-400 font-medium">
              {personalInfo.location.current.split(", ").pop()}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </footer>
  );
};

export default Footer;
