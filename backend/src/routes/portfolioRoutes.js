const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const { protect } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Public routes
router.get('/projects', portfolioController.getProjects);
router.get('/projects/:id', portfolioController.getProjectById);
router.get('/skills', portfolioController.getSkills);
router.get('/experience', portfolioController.getExperience);
router.get('/education', portfolioController.getEducation);
router.get('/blog', portfolioController.getBlogPosts);
router.get('/blog/:slug', portfolioController.getBlogPostBySlug);
router.get('/testimonials', portfolioController.getTestimonials);
router.post('/contact', portfolioController.submitContactForm);
router.get('/settings', portfolioController.getSystemSettings);

// Admin routes
router.use(adminAuth);

// Local stats
router.get('/stats', portfolioController.getPortfolioStats);

// Project management
router.post('/projects', portfolioController.createProject);
router.put('/projects/:id', portfolioController.updateProject);
router.delete('/projects/:id', portfolioController.deleteProject);

// Blog management
router.post('/blog', portfolioController.createBlogPost);
router.put('/blog/:id', portfolioController.updateBlogPost);
router.delete('/blog/:id', portfolioController.deleteBlogPost);

// Skills management
router.post('/skills', portfolioController.createSkill);
router.put('/skills/:id', portfolioController.updateSkill);
router.delete('/skills/:id', portfolioController.deleteSkill);

// Contact message management
router.get('/contact', portfolioController.getContactMessages);
router.patch('/contact/:id/read', portfolioController.markMessageAsRead);
router.delete('/contact/:id', portfolioController.deleteMessage);

module.exports = router;
