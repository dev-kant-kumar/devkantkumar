import { motion } from "framer-motion";
import {
  CreditCard,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  Truck,
  Twitter
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", path: "/marketplace/services/web-development" },
        { name: "Mobile Apps", path: "/marketplace/services/mobile-apps" },
        { name: "Consulting", path: "/marketplace/services/consulting" },
        { name: "Maintenance", path: "/marketplace/services/maintenance" },
      ]
    },
    {
      title: "Products",
      links: [
        { name: "Templates", path: "/marketplace/products/templates" },
        { name: "Components", path: "/marketplace/products/components" },
        { name: "Tools", path: "/marketplace/products/tools" },
        { name: "Courses", path: "/marketplace/products/courses" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/marketplace/support" },
        { name: "Documentation", path: "/marketplace/docs" },
        { name: "Contact Us", path: "/marketplace/contact" },
        { name: "FAQ", path: "/marketplace/faq" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/marketplace/terms" },
        { name: "Privacy Policy", path: "/marketplace/privacy" },
        { name: "Refund Policy", path: "/marketplace/refunds" },
        { name: "License", path: "/marketplace/license" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/dev-kant-kumar", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/dev-kant-kumar", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/devkantkumar", label: "Twitter" },
  ];

  const trustBadges = [
    { icon: Shield, text: "Secure Payments" },
    { icon: Truck, text: "Fast Delivery" },
    { icon: CreditCard, text: "Money Back" },
    { icon: ShoppingBag, text: "Quality Products" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 text-center md:text-left"
              >
                <div className="flex-shrink-0">
                  <badge.icon className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">{badge.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/marketplace" className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Market
                  </span>
                  <span className="text-white ml-1">Place</span>
                </div>
              </Link>

              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner for premium digital services and products.
                Building the future of web development, one project at a time.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@devkantkumar.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Dev Kant Kumar. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>

            {/* Panel Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-4 text-sm"
            >
              <Link
                to="/"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Portfolio
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/admin"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Admin
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
