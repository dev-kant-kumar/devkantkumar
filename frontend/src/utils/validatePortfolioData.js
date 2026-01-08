import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';

/**
 * Validates portfolio data completeness and structure
 * Ensures all components will have the data they need
 */
export const validatePortfolioData = () => {
  const errors = [];
  const warnings = [];

  // Required fields validation
  const requiredFields = [
    'personalInfo.name',
    'personalInfo.title',
    'personalInfo.contact.email',
    'professionalSummary.overview',
    'technicalSkills.frontend',
    'technicalSkills.backend',
    'projects',
    'workExperience',
    'socialLinks.professional.github',
    'socialLinks.professional.linkedin'
  ];

  // Check required fields
  requiredFields.forEach(field => {
    const value = getNestedValue(portfolioData, field);
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate projects structure
  if (portfolioData.projects) {
    portfolioData.projects.forEach((project, index) => {
      const requiredProjectFields = ['name', 'description', 'technologies', 'category'];
      requiredProjectFields.forEach(field => {
        if (!project[field]) {
          errors.push(`Project ${index + 1} missing field: ${field}`);
        }
      });

      // Check if at least one project is featured
      if (!portfolioData.projects.some(p => p.featured)) {
        warnings.push('No featured projects found. At least one project should be featured for the home page.');
      }
    });
  }

  // Validate work experience
  if (portfolioData.workExperience) {
    portfolioData.workExperience.forEach((job, index) => {
      const requiredJobFields = ['position', 'company', 'duration'];
      requiredJobFields.forEach(field => {
        if (!job[field]) {
          errors.push(`Work experience ${index + 1} missing field: ${field}`);
        }
      });
    });
  }

  // Validate SEO data
  if (!portfolioData.seoConfig?.defaultMeta?.title) {
    warnings.push('SEO default title not set. This affects search engine optimization.');
  }

  if (!portfolioData.seoConfig?.defaultMeta?.description) {
    warnings.push('SEO default description not set. This affects search engine optimization.');
  }

  // Check for placeholder/demo data
  const placeholderChecks = [
    { field: 'personalInfo.name', placeholder: 'Sneha Kumari' },
    { field: 'personalInfo.contact.email', placeholder: 'hello@devkantkumar.com' },
  ];

  placeholderChecks.forEach(check => {
    const value = getNestedValue(portfolioData, check.field);
    if (value === check.placeholder) {
      warnings.push(`Placeholder data detected in ${check.field}. Consider updating with actual data.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalProjects: portfolioData.projects?.length || 0,
      featuredProjects: portfolioData.projects?.filter(p => p.featured)?.length || 0,
      workExperience: portfolioData.workExperience?.length || 0,
      skillsCount: Object.values(portfolioData.technicalSkills || {}).flat().length,
      socialLinks: Object.keys(portfolioData.socialLinks?.professional || {}).length,
    }
  };
};

/**
 * Helper function to get nested object values
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Checks if portfolio data is ready for production
 */
export const isProductionReady = () => {
  const validation = validatePortfolioData();

  // Production-critical checks
  const productionErrors = [];

  // Must have real contact info
  if (portfolioData.personalInfo.contact.email === 'hello@devkantkumar.com') {
    productionErrors.push('Using demo email address. Update with real email.');
  }

  // Must have projects
  if (!portfolioData.projects || portfolioData.projects.length === 0) {
    productionErrors.push('No projects found. Add at least 3 projects for a complete portfolio.');
  }

  // Must have work experience
  if (!portfolioData.workExperience || portfolioData.workExperience.length === 0) {
    productionErrors.push('No work experience found. Add professional experience.');
  }

  // Must have valid social links
  const githubUrl = portfolioData.socialLinks?.professional?.github;
  if (!githubUrl || githubUrl.includes('github.com/username')) {
    productionErrors.push('Invalid GitHub URL. Update with real GitHub profile.');
  }

  return {
    ready: validation.valid && productionErrors.length === 0,
    errors: [...validation.errors, ...productionErrors],
    warnings: validation.warnings,
    validation
  };
};

/**
 * Generates a dynamic sitemap based on portfolio data
 */
export const generateSitemap = () => {
  const baseUrl = 'https://devkantkumar.com';
  const urls = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/about', priority: 0.9, changefreq: 'monthly' },
    { loc: '/projects', priority: 0.9, changefreq: 'weekly' },
    { loc: '/skills', priority: 0.8, changefreq: 'monthly' },
    { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
    { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
    { loc: '/marketplace', priority: 0.8, changefreq: 'weekly' },
  ];

  // Add project pages
  if (portfolioData.projects) {
    portfolioData.projects.forEach(project => {
      if (project.id) {
        urls.push({
          loc: `/projects/${project.id}`,
          priority: 0.7,
          changefreq: 'monthly',
          lastmod: project.lastUpdated || new Date().toISOString().split('T')[0]
        });
      }
    });
  }

  return urls.map(url => ({
    ...url,
    loc: baseUrl + url.loc,
    lastmod: url.lastmod || new Date().toISOString().split('T')[0]
  }));
};

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validation = validatePortfolioData();
  const production = isProductionReady();

  console.log('\n🔍 Portfolio Data Validation Report\n');
  console.log('📊 Summary:', validation.summary);

  if (validation.errors.length > 0) {
    console.log('\n❌ Errors:');
    validation.errors.forEach(error => console.log(`  • ${error}`));
  }

  if (validation.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    validation.warnings.forEach(warning => console.log(`  • ${warning}`));
  }

  console.log(`\n🚀 Production Ready: ${production.ready ? '✅ YES' : '❌ NO'}`);

  if (!production.ready) {
    console.log('\n🔧 Fix these issues before production:');
    production.errors.forEach(error => console.log(`  • ${error}`));
  }
}
