/**
 * Portfolio Data Store
 * Single source of truth for all portfolio information
 * This data will be used throughout the portfolio application
 */

export const portfolioData = {
  personalInfo: {
    name: "Dev Kant Kumar",
    title: "Full Stack Developer",
    subtitle: "MERN Stack Developer",
    tagline:
      "Building Scalable Web Applications | Available for Remote Work Globally",
    location: {
      current: "Patna, Bihar, India",
      availability: "Available Worldwide (Remote)",
      timezone: "IST (UTC+5:30)",
      workPreference: "Remote First, Open to Relocation",
    },
    contact: {
      email: "dev.techdeveloper@gmail.com",
      phone: "+91 7294177563",
      whatsapp: "https://wa.me/917294177563",
      responseTime: "Within 2-4 hours",
    },
    availability: {
      status: "Open to Opportunities",
      workTypes: ["Full-time", "Contract", "Freelance", "Part-time"],
      startAvailability: "Immediate",
      globalAvailability: true,
    },
    profileImage: "https://avatars.githubusercontent.com/u/101362859?v=4",
  },

  professionalSummary: {
    overview:
      "Self-driven Full-Stack Web Developer with expertise in building modern, scalable, and user-friendly web applications using React.js, Node.js, TypeScript, and MongoDB. Strong foundation in JavaScript ES6+, HTML5, CSS3, and REST API development, specializing in creating responsive, cross-browser compatible solutions that deliver exceptional user experiences.",
    experience: "2+ years of hands-on development experience",
    projectCount:
      "10+ full-stack applications built from concept to deployment",
    keyStrengths: [
      "Production Experience with real applications serving actual users",
      "Full Stack Expertise from database to user interface",
      "Remote Work Ready with distributed team collaboration experience",
      "Strong problem-solving and debugging skills",
      "Continuous learner exploring new technologies and best practices",
      "Open Source contributor active in developer community",
    ],
    uniqueValue:
      "What sets me apart: Strong problem-solving skills with focus on efficient, elegant solutions. Experience with modern development workflows and version control. Passionate about continuous learning and staying current with industry trends. Excellent communication skills and experience collaborating with distributed teams.",
  },

  technicalSkills: {
    frontend: {
      expert: [
        "React.js",
        "JavaScript ES6+",
        "HTML5",
        "CSS3",
        "Responsive Design",
      ],
      advanced: ["Redux Toolkit", "Tailwind CSS", "Material-UI", "Bootstrap"],
      intermediate: ["TypeScript", "Next.js", "SASS/SCSS", "Webpack"],
    },
    backend: {
      advanced: ["Node.js", "Express.js", "RESTful APIs", "MongoDB"],
      intermediate: ["PHP", "Database Design", "JWT Authentication"],
      basic: ["MySQL", "PostgreSQL", "GraphQL"],
    },
    tools: {
      expert: ["Git/GitHub", "VS Code", "npm/yarn"],
      advanced: ["Postman", "MongoDB Compass", "Chrome DevTools"],
      intermediate: ["Webpack", "Vercel", "Netlify", "Figma"],
    },
    concepts: [
      "Responsive Web Design",
      "Cross-browser Compatibility",
      "Performance Optimization",
      "Code Review",
      "Agile Development",
      "Version Control",
      "API Integration",
      "UI/UX Implementation",
    ],
  },

  workExperience: [
    {
      id: 1,
      position: "Founder & Full Stack Developer",
      company: "HostelEase",
      companyType: "SaaS Startup",
      duration: "June 2024 - Present",
      location: "Remote",
      status: "Current",
      website: "https://hostelease.com",
      description:
        "Founded and developing comprehensive SaaS-based hostel management platform serving real users. Leading full-stack development from concept to production deployment.",
      keyAchievements: [
        "Architected and developed full-stack SaaS platform serving active users",
        "Built secure user authentication, payment integration, and real-time data management",
        "Designed responsive UI/UX with room allocation and booking features",
        "Implemented RESTful APIs with comprehensive database design",
        "Optimized application performance achieving high Lighthouse scores",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Redux Toolkit",
        "JWT",
        "Payment Integration",
      ],
      impact:
        "Building scalable hostel management solutions for the accommodation sector",
    },
    {
      id: 2,
      position: "Web Developer",
      company: "Techies Gateway",
      companyType: "Digital Agency",
      duration: "March 2024 - November 2024",
      location: "Hazaribag, India (Hybrid)",
      status: "Completed",
      description:
        "Contributed to diverse client projects including travel, finance, and social media management sectors. Focused on frontend development and full-stack solutions.",
      keyAchievements: [
        "Collaborated on 8+ client projects including tanvi-cabs, best-cabs, smm-frontend",
        "Built responsive web interfaces using React.js, HTML5, CSS3, JavaScript",
        "Integrated REST APIs and worked with PHP backend systems",
        "Delivered projects on time while maintaining code quality standards",
        "Maintained 100% task completion rate with consistent code quality",
      ],
      technologies: [
        "React.js",
        "JavaScript",
        "HTML5",
        "CSS3",
        "PHP",
        "Git",
        "GitHub",
      ],
      impact:
        "Successfully delivered client projects across multiple industry verticals",
    },
  ],

  projects: [
    // -------------------------
    // ADVANCED & FULLSTACK WORK
    // -------------------------
    {
      id: 1,
      name: "Hostelease – Hostel Management System",
      category: "fullstack",
      status: "In Production",
      featured: true,
      year: "2024",
      complexity: "Enterprise",
      projectImage: "", // add image link
      description:
        "Enterprise-grade hostel management platform with real-time analytics, automated room allocation algorithms, and a full admin dashboard. Includes booking, payments, notifications, and student lifecycle management.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Stripe",
      ],
      links: {
        live: "https://hostelease.com/",
        github: "#",
      },
      metrics: {
        users: "Active user base",
        uptime: "Production ready",
        performance: "Optimized",
      },
      keyFeatures: [
        "Real-time room availability",
        "Payment integration",
        "Admin dashboard",
        "Authentication & Authorization",
        "Responsive UI",
      ],
    },

    {
      id: 2,
      name: "Advanced MERN To-Do System",
      category: "fullstack",
      status: "Live",
      featured: true,
      year: "2024",
      complexity: "Advanced",
      projectImage: "", // add image link
      description:
        "Full-stack productivity tool with drag-and-drop interface, real-time collaboration, analytics, and priority-based task management using Redux and MongoDB.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Redux",
        "CSS3",
        "WebSocket",
      ],
      links: {
        live: "https://todo.devkantkumar.com/",
        github: "https://github.com/dev-kant-kumar/To-Do",
      },
      metrics: {
        functionality: "Full CRUD operations",
        rating: "Advanced features",
        performance: "Optimized",
      },
      keyFeatures: [
        "Real-time sync",
        "Drag and drop",
        "Redux state management",
        "Filtering & sorting",
        "User auth",
      ],
    },

    // -------------------------
    // REACT PROJECTS
    // -------------------------
    {
      id: 3,
      name: "Freshers Party Event Page",
      category: "frontend",
      status: "Live",
      featured: false,
      year: "2024",
      complexity: "Intermediate",
      projectImage: "", // add image link
      description:
        "A responsive event landing page built using React with reusable components, gradient hero sections, and a clean layout. Created for my college Freshers Party.",
      technologies: ["React.js", "JavaScript", "CSS3", "Vite / CRA"],
      links: {
        live: "https://bcafreshers.devkantkumar.com",
        github: "https://github.com/dev-kant-kumar/Freshers-Party-2024",
      },
      metrics: {
        purpose: "Real-world UI practice",
        features: "Hero section, event details, responsive layout",
        learning: "React components, props, folder structure",
      },
    },

    {
      id: 4,
      name: "Farewell Party Invitation Card Maker",
      category: "frontend",
      status: "Live",
      featured: true,
      year: "2025",
      complexity: "Intermediate",
      projectImage: "",
      description:
        "Interactive invitation card maker with themed templates, drag-and-drop customization, animations, and local save support.",
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "LocalStorage"],
      links: {
        live: "https://farewell.devkantkumar.com/",
        github: "https://github.com/dev-kant-kumar/farewell",
      },
      metrics: {
        designs: "Themes included",
        engagement: "Interactive editor",
        speed: "Instant generation",
      },
      keyFeatures: [
        "Customizable templates",
        "Drag-and-drop editor",
        "Social export",
        "Print-ready output",
        "Mobile responsive",
      ],
    },

    // -------------------------
    // INTERMEDIATE JS PROJECTS
    // -------------------------
    {
      id: 5,
      name: "Movie Manager – CRUD Application",
      category: "frontend",
      status: "Live",
      featured: false,
      year: "2024",
      complexity: "Beginner–Intermediate",
      projectImage: "", // add image link
      description:
        "A movie management app built to learn CRUD operations using JavaScript. Includes modal forms, dynamic cards, validation, and LocalStorage for persistence.",
      technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage API"],
      links: {
        live: "https://acmegrade-web-dev-crud-assignment.vercel.app/",
        github:
          "https://github.com/dev-kant-kumar/Acmegrade-Web-Dev/tree/master/Classworks/CRUD%20Operation",
      },
      metrics: {
        purpose: "Learning CRUD deeply",
        features: "Add/edit/delete movies",
        learning: "DOM manipulation, events, storage",
      },
    },

    {
      id: 6,
      name: "E-Commerce UI Prototype",
      category: "frontend",
      status: "Live",
      featured: false,
      year: "2024",
      complexity: "Beginner–Intermediate",
      projectImage: "", // add image link
      description:
        "Front-end e-commerce UI including product cards, forms, buttons, and basic JS interactions. Built to practice responsive layout and clean design.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      links: {
        live: "https://acmegrade-web-dev-assignment.devkantkumar.com",
        github:
          "https://github.com/dev-kant-kumar/Acmegrade-Web-Dev/tree/master/Classworks/Ecommerce%20UI",
      },
      metrics: {
        purpose: "UI development practice",
        features: "Cards, forms, navigation",
        learning: "Layout, UI components, JS basics",
      },
    },

    // -------------------------
    // EARLY JS PROJECTS
    // -------------------------
    {
      id: 7,
      name: "Swift Type – Typing Speed Test",
      category: "frontend",
      status: "Live",
      featured: false,
      year: "2024",
      complexity: "Beginner",
      projectImage: "", // add image link
      description:
        "A typing test built to practice DOM events, timers, and dynamic UI updates. Shows WPM, CPM, error count, and accuracy.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      links: {
        live: "https://dev-kant-kumar.github.io/Swift-Type/",
        github: "https://github.com/dev-kant-kumar/Swift-Type",
      },
      metrics: {
        purpose: "Early JavaScript practice",
        features: "WPM/CPM calculation",
        learning: "Timers, DOM, UI updates",
      },
    },

    {
      id: 8,
      name: "Basic Calculator",
      category: "frontend",
      status: "Live",
      featured: false,
      year: "2024",
      complexity: "Beginner",
      projectImage: "", // add image link
      description:
        "My first JavaScript project: a simple calculator performing basic arithmetic with a clean interface.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      links: {
        live: "https://dev-kant-kumar.github.io/Calculator/",
        github: "https://github.com/dev-kant-kumar/Calculator",
      },
      metrics: {
        purpose: "First step into JavaScript",
        features: "Basic arithmetic",
        learning: "Events, DOM, UI basics",
      },
    },
  ],

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Vinoba Bhave University",
    location: "Hazaribagh, Jharkhand, India",
    duration: "2023 - 2026",
    status: "Pursuing",
    focusAreas: [
      "Software Development",
      "Data Structures",
      "Web Technologies",
      "Database Management",
    ],
    continuousLearning: [
      "Advanced React.js patterns and hooks",
      "Node.js backend optimization",
      "Modern JavaScript ES6+ features",
      "Cloud deployment and DevOps practices",
    ],
  },

  socialLinks: {
    professional: {
      github: "https://github.com/dev-kant-kumar",
      linkedin: "https://linkedin.com/in/devkantkumar",
      portfolio: "https://devkantkumar.com",
      youtube: "https://www.youtube.com/@dev-kant-kumar",
    },
    social: {
      twitter: "https://x.com/dev_kant_kumar",
      instagram: "https://instagram.com/devkantkumar.in",
      facebook: "https://facebook.com/devkantkumar.in",
      threads: "https://threads.com/@devkantkumar.in",
    },
    communication: {
      telegram: "https://t.me/devkantkumar",
      discord: "devkantkumar.in",
      whatsapp: "https://wa.me/917294177563",
    },
    community: {
      reddit: "https://reddit.com/user/dev_kant_kumar",
      quora: "https://quora.com/profile/Dev-Kant-Kumar",
    },
    creative: {
      pinterest: "https://in.pinterest.com/imdevkantkumar/",
      tumblr: "https://tumblr.com/blog/devkantkumar",
      tiktok: "https://tiktok.com/@devkantkumar.in",
      twitch: "https://twitch.tv/imdevkantkumar",
    },
  },

  seoKeywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Web Developer",
    "Remote Developer",
    "Frontend Developer",
    "Backend Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "Redux Developer",
    "Responsive Web Design",
    "REST API Developer",
    "Git Version Control",
    "Agile Development",
    "Cross-browser Compatibility",
    "Performance Optimization",
    "UI/UX Implementation",
  ],

  careerObjectives: {
    seekingRoles: [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "MERN Stack Developer",
      "JavaScript Developer",
      "React Developer",
      "Node.js Developer",
    ],
    workPreferences: {
      remote: true,
      onsite: true,
      hybrid: true,
      globalAvailability: true,
      relocationWilling: true,
    },
    companyTypes: [
      "Tech Startups",
      "Product Companies",
      "SaaS Companies",
      "Digital Agencies",
      "E-commerce",
      "FinTech",
      "EdTech",
    ],
    goals: [
      "Work with cutting-edge technologies",
      "Contribute to innovative products",
      "Grow alongside talented developers",
      "Build scalable, user-centric applications",
      "Collaborate with distributed teams globally",
    ],
  },

  achievements: [
    "Built and deployed production applications serving real users",
    "Founded successful SaaS startup (HostelEase)",
    "Completed 10+ full-stack projects from concept to deployment",
    "Successfully collaborated on 8+ client projects across various industries",
    "Maintained 100% project delivery rate with quality standards",
    "Expert in modern JavaScript frameworks and full-stack development",
    "Active open-source contributor with growing GitHub profile",
    "Strong problem-solving skills with focus on scalable solutions",
  ],

  testimonials: [],

  certifications: [],

  languages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Hindi", proficiency: "Native" },
    { language: "Bhojpuri", proficiency: "Native" },
  ],

  interests: [
    "Open Source Contribution",
    "Web Performance Optimization",
    "Modern JavaScript Frameworks",
    "UI/UX Design Principles",
    "Cloud Computing",
    "DevOps Practices",
    "Tech Community Building",
    "Continuous Learning",
  ],

  // SEO Configuration - All SEO data centralized here
  seoConfig: {
    site: {
      url: "https://devkantkumar.com",
      domain: "devkantkumar.com",
      language: "en",
      locale: "en_US",
      type: "website",
    },
    social: {
      twitter: "@dev_kant_kumar",
      github: "dev-kant-kumar",
      linkedin: "devkantkumar",
      instagram: "devkantkumar.in",
    },
    analytics: {
      googleAnalyticsId: "G-SC4Q0YTRSW",
      googleSiteVerification: "1R7-ajqFcl9Qoi6f1TmmrJvhRyWjxRmGORdmYQyrnfw",
      pinterestVerification: "a95cec32a52f12ecaf270b710e5bff14",
    },
    pages: {
      home: {
        title: "Home",
        description:
          "Welcome to Kant Kumar's portfolio. Explore projects, skills, and experience as a Full Stack Developer specializing in MERN stack development.",
        keywords: [
          "portfolio",
          "home",
          "full stack developer",
          "MERN stack",
          "React",
          "Node.js",
          "MongoDB",
        ],
      },
      about: {
        title: "About",
        description:
          "Learn about Kant Kumar, a passionate Full Stack Developer specializing in MERN stack development. Discover my journey, skills, and professional experience.",
        keywords: [
          "about",
          "developer story",
          "experience",
          "skills",
          "journey",
          "full stack developer",
          "MERN stack",
        ],
      },
      projects: {
        title: "Projects",
        description:
          "Explore Kant Kumar's portfolio of full-stack projects including MERN stack applications, React projects, and innovative web solutions.",
        keywords: [
          "projects",
          "portfolio",
          "MERN stack",
          "React",
          "Node.js",
          "full stack",
          "web development",
          "applications",
        ],
      },
      skills: {
        title: "Skills",
        description:
          "Explore Kant Kumar's technical skills and expertise in MERN stack, React, Node.js, MongoDB, JavaScript, and modern web development technologies.",
        keywords: [
          "skills",
          "technical expertise",
          "MERN stack",
          "React",
          "Node.js",
          "JavaScript",
          "MongoDB",
          "web development",
        ],
      },
      contact: {
        title: "Contact",
        description:
          "Get in touch with Kant Kumar for web development projects, collaborations, or freelance opportunities. Available for MERN stack development and consulting.",
        keywords: [
          "contact",
          "hire developer",
          "freelance",
          "collaboration",
          "web development",
          "MERN stack",
          "consulting",
        ],
      },
      blog: {
        title: "Blog",
        description:
          "Read the latest articles and insights from Kant Kumar on web development, programming, and technology trends.",
        keywords: [
          "blog",
          "articles",
          "web development",
          "programming",
          "technology",
          "tutorials",
        ],
      },
    },
    defaultMeta: {
      title:
        "Kant Kumar | MERN Stack, React, Node.js, Tailwind, Open Source Developer Portfolio",
      description:
        "Kant Kumar – Full Stack Developer (MERN), UI/UX Engineer, and Open Source Contributor. Explore projects using React, Node.js, MongoDB, Tailwind CSS, Git, Postman, and more. Available for freelance, remote, and tech collaborations.",
      image: "https://avatars.githubusercontent.com/u/203783910?v=4",
      author: "Kant Kumar",
    },
  },

  metadata: {
    lastUpdated: "2025-01-17",
    version: "2.0",
    dataAccuracy: "100% verified and authentic",
    globalHireability: true,
    searchOptimized: true,
    remoteReady: true,
  },
};

// Helper functions to access data easily
export const getPersonalInfo = () => portfolioData.personalInfo;
export const getProjects = () => portfolioData.projects;
export const getFeaturedProjects = () =>
  portfolioData.projects.filter((project) => project.featured);
export const getWorkExperience = () => portfolioData.workExperience;
export const getTechnicalSkills = () => portfolioData.technicalSkills;
export const getSocialLinks = () => portfolioData.socialLinks;
export const getProfessionalSummary = () => portfolioData.professionalSummary;
export const getEducation = () => portfolioData.education;
export const getAchievements = () => portfolioData.achievements;

// Stats calculations
export const getPortfolioStats = () => {
  const projects = portfolioData.projects;
  const experience = portfolioData.workExperience;
  const skills = portfolioData.technicalSkills;

  return {
    yearsExperience: "2+",
    projectsCompleted: projects.length,
    technologiesUsed: Object.values(skills).flat().length,
    isRemoteReady: portfolioData.personalInfo.availability.globalAvailability,
  };
};
