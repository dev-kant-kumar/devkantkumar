import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      url: "https://github.com/devkantkumar",
      icon: Github
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/devkantkumar",
      icon: Linkedin
    },
    {
      name: "Twitter",
      url: "https://twitter.com/devkantkumar",
      icon: Twitter
    },
    {
      name: "Email",
      url: "mailto:hello@devkantkumar.com",
      icon: Mail
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-600/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to="/" className="inline-block group">
              <motion.div
                className="text-3xl font-bold mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Dev Kant
                </span>
                <span className="text-white ml-2">Kumar</span>
              </motion.div>
            </Link>

            <p className="text-slate-300 max-w-md mb-8 leading-relaxed">
              Full-Stack Developer crafting exceptional digital experiences with modern technologies.
              Passionate about clean code, innovative solutions, and collaborative development.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <p className="text-sm text-slate-400 font-medium">
                Stay updated with my latest projects and insights
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links & Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-lg">Connect</h3>
            <div className="space-y-4 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-400 hover:text-cyan-300 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    <social.icon className="w-5 h-5" />
                  </span>
                  {social.name}
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-2">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full mr-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-green-300 font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Open to new opportunities and collaborations
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} Dev Kant Kumar. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <Link to="/privacy" className="hover:text-cyan-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-cyan-300 transition-colors duration-300">
              Terms of Service
            </Link>
            <span className="flex items-center">
              Made with <span className="text-red-400 mx-1">♥</span> in India
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
