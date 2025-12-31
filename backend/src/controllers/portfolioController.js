const logger = require('../utils/logger');
const SystemSetting = require('../models/SystemSetting');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const BlogPost = require('../models/BlogPost');
const ContactMessage = require('../models/ContactMessage');
const Visit = require('../models/Visit');
const { getGAOverview } = require('../services/googleAnalytics');

// @desc    Get all projects
// @route   GET /api/v1/portfolio/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ priority: -1, createdAt: -1 });

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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

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
    const skills = await Skill.find().sort({ priority: -1 });

    // Group by category for frontend convenience
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    const formattedSkills = Object.entries(groupedSkills).map(([category, items]) => ({
      category,
      items: items.map(i => i.name),
      details: items // Keep detailed objects for admin/advanced use
    }));

    res.status(200).json({
      success: true,
      data: formattedSkills
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
    // For now keeping this as is, can be moved to model later if needed
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
    const blogPosts = await BlogPost.find({ status: 'published' }).sort({ createdAt: -1 });

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
    const blogPost = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    blogPost.viewCount += 1;
    await blogPost.save();

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
    const { name, email, subject, message, projectType } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      projectType
    });

    logger.info(`Contact form submitted by ${name} (${email}): ${subject}`);

    res.status(200).json({
      success: true,
      data: contactMessage,
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
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    logger.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/v1/portfolio/projects/:id
// @access  Admin
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.deleteOne();

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
    const blogPost = await BlogPost.create({
      ...req.body,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      data: blogPost,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    logger.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/v1/portfolio/blog/:id
// @access  Admin
const updateBlogPost = async (req, res) => {
  try {
    let blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await blogPost.deleteOne();

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
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
      message: 'Skill created successfully'
    });
  } catch (error) {
    logger.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update skill
// @route   PUT /api/v1/portfolio/skills/:id
// @access  Admin
const updateSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: skill,
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
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await skill.deleteOne();

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

// @desc    Get all contact messages
// @route   GET /api/v1/portfolio/contact
// @access  Admin
const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    logger.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Mark message as read
// @route   PATCH /api/v1/portfolio/contact/:id/read
// @access  Admin
const markMessageAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
      message: 'Message marked as read'
    });
  } catch (error) {
    logger.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/v1/portfolio/contact/:id
// @access  Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    logger.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get portfolio stats
// @route   GET /api/v1/portfolio/stats
// @access  Admin
const getPortfolioStats = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const blogCount = await BlogPost.countDocuments();
    const skillCount = await Skill.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

    // Get recent activity (last 5 items across projects, blogs, messages)
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(3).select('title createdAt');
    const recentBlogs = await BlogPost.find().sort({ createdAt: -1 }).limit(3).select('title createdAt');
    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(3).select('name createdAt');

    const activity = [
      ...recentProjects.map(p => ({ action: `New project added: ${p.title}`, time: p.createdAt, type: 'project' })),
      ...recentBlogs.map(b => ({ action: `Blog post published: ${b.title}`, time: b.createdAt, type: 'blog' })),
      ...recentMessages.map(m => ({ action: `New message from ${m.name}`, time: m.createdAt, type: 'contact' }))
    ].sort((a, b) => b.time - a.time).slice(0, 5);

    const visitCount = await Visit.countDocuments();

    // Add Google Analytics page views if available
    let gaData = null;
    try {
      gaData = await getGAOverview().catch(() => null);
    } catch (err) {
      logger.error('Error fetching GA in portfolio stats:', err);
    }

    res.status(200).json({
      success: true,
      data: {
        stats: {
          projects: projectCount,
          blogs: blogCount,
          skills: skillCount,
          messages: unreadMessages,
          pageViews: gaData ? gaData.pageViews : visitCount,
          gaData // Optional for frontend deeper dive
        },
        recentActivity: activity
      }
    });
  } catch (error) {
    logger.error('Get portfolio stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const getSystemSettings = async (req, res) => {
  try {
    const settings = await SystemSetting.findOne();
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    logger.error('Get system settings error:', error);
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
  deleteSkill,
  getContactMessages,
  markMessageAsRead,
  deleteMessage,
  getPortfolioStats,
  getSystemSettings
};
