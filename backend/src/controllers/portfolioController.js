const logger = require('../utils/logger');

// @desc    Get all projects
// @route   GET /api/v1/portfolio/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    // Mock data for now
    const projects = [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        image: "/images/project1.jpg",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example/project1",
        featured: true
      }
    ];

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    logger.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get project by ID
// @route   GET /api/v1/portfolio/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock data for now
    const project = {
      id: parseInt(id),
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      image: "/images/project1.jpg",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project1",
      featured: true
    };

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get skills
// @route   GET /api/v1/portfolio/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    // Mock data for now
    const skills = [
      {
        category: "Frontend",
        items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel"]
      },
      {
        category: "Database",
        items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
      }
    ];

    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    logger.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get experience
// @route   GET /api/v1/portfolio/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    // Mock data for now
    const experience = [
      {
        id: 1,
        company: "Tech Company",
        position: "Full Stack Developer",
        duration: "2022 - Present",
        description: "Developing web applications using modern technologies"
      }
    ];

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    logger.error('Get experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get education
// @route   GET /api/v1/portfolio/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    // Mock data for now
    const education = [
      {
        id: 1,
        institution: "University Name",
        degree: "Bachelor of Computer Science",
        duration: "2018 - 2022",
        description: "Computer Science fundamentals and software development"
      }
    ];

    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    logger.error('Get education error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get blog posts
// @route   GET /api/v1/portfolio/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    // Import blog data (in production, this would come from database)
    const { getBlogPosts: getBlogPostsData } = require('../data/blogData');
    const blogPosts = getBlogPostsData();

    res.status(200).json({
      success: true,
      data: blogPosts
    });
  } catch (error) {
    logger.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get blog post by slug
// @route   GET /api/v1/portfolio/blog/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Import blog data (in production, this would come from database)
    const { getPostBySlug } = require('../data/blogData');
    const blogPost = getPostBySlug(slug);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    logger.error('Get blog post by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get testimonials
// @route   GET /api/v1/portfolio/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    // Mock data for now
    const testimonials = [
      {
        id: 1,
        name: "John Doe",
        company: "ABC Company",
        position: "CEO",
        content: "Excellent work and professional service",
        rating: 5
      }
    ];

    res.status(200).json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    logger.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Submit contact form
// @route   POST /api/v1/portfolio/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Here you would typically save to database and send email
    logger.info(`Contact form submitted by ${name} (${email}): ${subject}`);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    logger.error('Submit contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Admin functions
// @desc    Create project
// @route   POST /api/v1/portfolio/projects
// @access  Admin
const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    // Mock response for now
    const project = {
      id: Date.now(),
      ...projectData,
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    logger.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/v1/portfolio/projects/:id
// @access  Admin
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Mock response for now
    const project = {
      id: parseInt(id),
      ...updateData,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    logger.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/v1/portfolio/projects/:id
// @access  Admin
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock response for now
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    logger.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create blog post
// @route   POST /api/v1/portfolio/blog
// @access  Admin
const createBlogPost = async (req, res) => {
  try {
    const blogData = req.body;

    // Mock response for now
    const blogPost = {
      id: Date.now(),
      ...blogData,
      slug: blogData.title.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      data: blogPost,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    logger.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/v1/portfolio/blog/:id
// @access  Admin
const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Mock response for now
    const blogPost = {
      id: parseInt(id),
      ...updateData,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: blogPost,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    logger.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/v1/portfolio/blog/:id
// @access  Admin
const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock response for now
    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    logger.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create skill
// @route   POST /api/v1/portfolio/skills
// @access  Admin
const createSkill = async (req, res) => {
  try {
    const { category, items } = req.body;

    // Mock response for now
    res.status(201).json({
      success: true,
      data: {
        id: Date.now(),
        category,
        items
      },
      message: 'Skill created successfully'
    });
  } catch (error) {
    logger.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update skill
// @route   PUT /api/v1/portfolio/skills/:id
// @access  Admin
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, items } = req.body;

    // Mock response for now
    res.status(200).json({
      success: true,
      data: {
        id: parseInt(id),
        category,
        items
      },
      message: 'Skill updated successfully'
    });
  } catch (error) {
    logger.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/v1/portfolio/skills/:id
// @access  Admin
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock response for now
    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    logger.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  getSkills,
  getExperience,
  getEducation,
  getBlogPosts,
  getBlogPostBySlug,
  getTestimonials,
  submitContactForm,
  createProject,
  updateProject,
  deleteProject,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createSkill,
  updateSkill,
  deleteSkill
};
