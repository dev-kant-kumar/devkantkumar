import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    ChevronDown,
    Clock,
    Code,
    DollarSign,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    Search,
    Sparkles,
    Users,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../components/SEO/SEOHead";
import { useMetadata } from "../../../utils/useMetadata";
import { portfolioData } from "../store/data/portfolioData";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Update metadata for FAQ page
  useMetadata({
    title: 'FAQ - Frequently Asked Questions',
    description: 'Find answers to common questions about my development services, process, pricing, and collaboration approach.',
    keywords: 'FAQ, questions, development services, pricing, process, collaboration'
  });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const faqCategories = [
    { id: "all", name: "All Questions", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "services", name: "Services", icon: <Code className="w-4 h-4" /> },
    { id: "process", name: "Work Process", icon: <Briefcase className="w-4 h-4" /> },
    { id: "pricing", name: "Pricing", icon: <DollarSign className="w-4 h-4" /> },
    { id: "timeline", name: "Timeline", icon: <Calendar className="w-4 h-4" /> },
    { id: "collaboration", name: "Collaboration", icon: <Users className="w-4 h-4" /> },
    { id: "technical", name: "Technical", icon: <Zap className="w-4 h-4" /> },
  ];

  const faqData = [
    {
      id: 1,
      category: "services",
      question: "What development services do you offer?",
      answer: "I specialize in full-stack web development using the MERN stack (MongoDB, Express.js, React.js, Node.js). My services include custom web applications, e-commerce platforms, portfolio websites, API development, database design, and UI/UX implementation. I also offer code reviews, performance optimization, and technical consulting.",
      tags: ["MERN", "Full-stack", "Web Development", "API"]
    },
    {
      id: 2,
      category: "process",
      question: "What is your development process?",
      answer: "My development process follows these key phases: 1) Discovery & Planning - Understanding your requirements and goals, 2) Design & Architecture - Creating wireframes and technical specifications, 3) Development - Iterative coding with regular updates, 4) Testing - Comprehensive quality assurance, 5) Deployment - Launch and optimization, 6) Maintenance - Ongoing support and updates. I use Agile methodology with regular communication throughout.",
      tags: ["Process", "Agile", "Planning", "Quality"]
    },
    {
      id: 3,
      category: "pricing",
      question: "How do you structure your pricing?",
      answer: "I offer flexible pricing models: 1) Fixed Project Price - For well-defined projects with clear scope, 2) Hourly Rate - For ongoing work or consulting ($50-80/hour based on complexity), 3) Retainer - For long-term partnerships with monthly commitments. All projects include a detailed proposal with transparent pricing breakdown. Payment terms are typically 50% upfront, 50% on completion for smaller projects.",
      tags: ["Pricing", "Fixed Price", "Hourly", "Retainer"]
    },
    {
      id: 4,
      category: "timeline",
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity: Simple landing pages (1-2 weeks), Portfolio websites (2-3 weeks), Small business websites (3-4 weeks), E-commerce platforms (4-8 weeks), Custom web applications (6-12 weeks). I provide detailed timeline estimates during the planning phase and maintain regular progress updates throughout development.",
      tags: ["Timeline", "Duration", "Planning", "Delivery"]
    },
    {
      id: 5,
      category: "collaboration",
      question: "How do you communicate during projects?",
      answer: "I believe in transparent, regular communication. I use Slack or email for daily updates, weekly video calls for progress reviews, and project management tools like Trello or Notion for task tracking. You'll have access to development previews and can provide feedback at any stage. I'm available during business hours (9 AM - 6 PM IST) and respond to messages within 24 hours.",
      tags: ["Communication", "Updates", "Feedback", "Availability"]
    },
    {
      id: 6,
      category: "technical",
      question: "What technologies and tools do you use?",
      answer: "Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion. Backend: Node.js, Express.js, MongoDB, PostgreSQL, Redis. Tools: Git, Docker, AWS, Vercel, Netlify, Figma, VS Code. I stay updated with the latest technologies and choose the best stack for each project's requirements. I also ensure all code follows best practices and is well-documented.",
      tags: ["React", "Node.js", "MongoDB", "AWS", "Tools"]
    },
    {
      id: 7,
      category: "services",
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, I offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, content updates, and feature enhancements. I provide different maintenance packages: Basic (monthly health checks), Standard (includes minor updates), Premium (includes feature development). All projects come with 30 days of free support after launch.",
      tags: ["Maintenance", "Support", "Updates", "Monitoring"]
    },
    {
      id: 8,
      category: "process",
      question: "Do you work with existing codebases?",
      answer: "Absolutely! I can work with existing projects, whether it's adding new features, fixing bugs, optimizing performance, or modernizing legacy code. I start with a thorough code review to understand the current architecture and provide recommendations. I'm experienced with various frameworks and can adapt to different coding standards and practices.",
      tags: ["Legacy Code", "Code Review", "Optimization", "Modernization"]
    },
    {
      id: 9,
      category: "collaboration",
      question: "Can you work with my existing team?",
      answer: "Yes, I collaborate effectively with existing development teams, designers, and project managers. I can integrate into your workflow, use your preferred tools and methodologies, and adapt to your team's communication style. I'm comfortable working as a team member or leading specific aspects of the project.",
      tags: ["Team Collaboration", "Integration", "Leadership", "Workflow"]
    },
    {
      id: 10,
      category: "technical",
      question: "How do you ensure code quality and security?",
      answer: "I follow industry best practices including code reviews, automated testing (unit, integration, e2e), ESLint/Prettier for code formatting, security audits, dependency updates, and performance monitoring. All code is version-controlled with Git, and I implement proper error handling, input validation, and security measures like authentication, authorization, and data encryption.",
      tags: ["Code Quality", "Security", "Testing", "Best Practices"]
    },
    {
      id: 11,
      category: "pricing",
      question: "Do you offer discounts for startups or non-profits?",
      answer: "Yes, I offer special pricing for startups, non-profits, and educational institutions. Startup discount: 15-20% off for early-stage companies. Non-profit discount: 25% off for registered non-profits. Student projects: Negotiable rates for educational purposes. I believe in supporting meaningful projects that make a positive impact.",
      tags: ["Discounts", "Startups", "Non-profits", "Education"]
    },
    {
      id: 12,
      category: "timeline",
      question: "Can you handle urgent or rush projects?",
      answer: "I can accommodate urgent projects depending on my current workload. Rush projects (delivery within 1-2 weeks) may include a 25-50% urgency fee. I'll assess the scope and provide an honest timeline estimate. For the best results, I recommend allowing adequate time for proper planning, development, and testing.",
      tags: ["Urgent", "Rush", "Timeline", "Priority"]
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = searchTerm === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Animation variants matching hero section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about my development services, process, pricing, and collaboration approach. Get insights into my work methodology and technical expertise."
        keywords="FAQ, questions, development services, pricing, process, collaboration, MERN stack, web development"
        type="article"
      />

      {/* FAQ Structured Data for Rich Results */}
      <StructuredData
        type="faq"
        pageData={{
          faqs: faqData.map(item => ({
            question: item.question,
            answer: item.answer
          }))
        }}
      />

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Advanced Background Effects - Matching Hero Section */}
        <div className="absolute inset-0">
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

          {/* Dynamic Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 0.15 - 50,
              y: mousePosition.y * 0.15 - 50,
              scale: [1, 1.2, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 30 },
              y: { type: "spring", stiffness: 50, damping: 30 },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"
            animate={{
              x: -mousePosition.x * 0.1 + 50,
              y: -mousePosition.y * 0.1 + 50,
              scale: [1, 1.3, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 30 },
              y: { type: "spring", stiffness: 40, damping: 30 },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
          />

          {/* Sophisticated Grid Pattern */}
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
        </div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            {/* Badge */}
            <motion.div className="mb-8">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-xl shadow-lg shadow-cyan-500/10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                }}
              >
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              <span className="block text-slate-100 mb-2">Got</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Questions?
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
              Find answers to common questions about my development services, process, and collaboration approach.
            </p>

            {/* Breadcrumb */}
            <nav className="flex justify-center" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-slate-300 font-medium">FAQ</li>
              </ol>
            </nav>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants} className="mb-16">
            {/* Search Bar */}
            <div className="relative mb-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-800/50 transition-all duration-300 text-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
              </motion.div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {faqCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:bg-slate-700/40 hover:border-cyan-500/30 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: activeCategory === category.id
                      ? "0 0 30px rgba(34, 211, 238, 0.4)"
                      : "0 0 20px rgba(34, 211, 238, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={itemVariants} className="space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Glassmorphism Card */}
                  <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group-hover:border-cyan-500/30 transition-all duration-300">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <button
                      onClick={() => toggleItem(item.id)}
                      className="relative w-full px-8 py-8 text-left flex items-center justify-between hover:bg-slate-700/20 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                          {item.question}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {item.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-3 py-1.5 bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 text-slate-300 text-sm rounded-lg group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-6">
                        <motion.div
                          animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-full bg-slate-700/50 group-hover:bg-cyan-500/20 transition-colors duration-300"
                        >
                          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                            openItems.has(item.id) ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                          }`} />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openItems.has(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8">
                            <div className="border-t border-slate-700/30 pt-6">
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-300 leading-relaxed text-lg"
                              >
                                {item.answer}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                  >
                    <HelpCircle className="w-12 h-12 text-slate-500" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    No questions found
                  </h3>
                  <p className="text-slate-400 text-lg">
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-20">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl" />

              <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>

                <div className="relative text-center mb-12">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-xl border border-cyan-500/30"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.2)",
                        "0 0 30px rgba(139, 92, 246, 0.3)",
                        "0 0 20px rgba(34, 211, 238, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <MessageCircle className="w-10 h-10 text-cyan-400" />
                  </motion.div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Still have{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                      questions?
                    </span>
                  </h3>

                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Can't find the answer you're looking for? I'm here to help!
                    Reach out through any of these channels and I'll get back to you promptly.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/contact"
                      className="group relative flex items-center justify-center p-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Mail className="w-6 h-6 mr-3 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                      <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={`mailto:${portfolioData.personalInfo.contact.email}`}
                      className="group flex items-center justify-center p-8 bg-slate-700/30 backdrop-blur-xl border border-slate-600/50 rounded-2xl text-white font-semibold text-lg hover:bg-slate-600/40 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <Mail className="w-6 h-6 mr-3 group-hover:text-cyan-400 transition-colors duration-300" />
                      <span>Email Directly</span>
                    </a>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={`tel:${portfolioData.personalInfo.contact.phone}`}
                      className="group flex items-center justify-center p-8 bg-slate-700/30 backdrop-blur-xl border border-slate-600/50 rounded-2xl text-white font-semibold text-lg hover:bg-slate-600/40 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <Phone className="w-6 h-6 mr-3 group-hover:text-cyan-400 transition-colors duration-300" />
                      <span>Call Me</span>
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="inline-flex items-center px-6 py-3 bg-slate-700/30 backdrop-blur-xl border border-slate-600/50 rounded-full text-slate-300">
                    <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                    <span className="font-medium">Response time: {portfolioData.personalInfo.contact.responseTime}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default FAQ;
