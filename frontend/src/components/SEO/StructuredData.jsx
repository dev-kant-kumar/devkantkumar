import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const StructuredData = ({ type = 'person', pageData = {} }) => {
  const { personalInfo, professionalSummary, workExperience, projects, technicalSkills, seoConfig } = portfolioData;

  const getPersonSchema = () => {
    // Safely extract social links from the nested structure
    const socialLinks = portfolioData.socialLinks || {};
    const allSocialLinks = [
      socialLinks.professional?.github,
      socialLinks.professional?.linkedin,
      socialLinks.professional?.portfolio,
      socialLinks.social?.twitter,
      socialLinks.social?.instagram,
      socialLinks.social?.facebook,
      socialLinks.social?.threads,
      socialLinks.communication?.telegram,
      socialLinks.communication?.whatsapp,
      socialLinks.community?.reddit,
      socialLinks.community?.quora,
      socialLinks.creative?.pinterest,
      socialLinks.creative?.tumblr,
      socialLinks.creative?.tiktok,
      socialLinks.creative?.twitch,
    ].filter(Boolean);

    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personalInfo.name,
      "alternateName": "devkantkumar",
      "url": portfolioData.seoConfig?.site?.url || "https://devkantkumar.com",
      "image": personalInfo.profileImage,
      "jobTitle": personalInfo.title || "Full Stack Web Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "HostelEase"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": portfolioData.education?.institution || "Vinoba Bhave University"
      },
      "knowsAbout": [
        "MERN Stack",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Tailwind CSS",
        "UI/UX Design",
        "Git",
        "Open Source",
        "Full Stack Development",
        "Frontend Engineering",
        "Backend Engineering",
        "Postman",
        "TypeScript",
        "HTML",
        "CSS",
        "PHP",
        "Agile Development",
        "REST API",
        "Freelancing",
        "Remote Work",
        "Software Architecture"
      ],
      "sameAs": allSocialLinks,
      "email": `mailto:${personalInfo.contact.email}`,
      "description": `${personalInfo.name} is a MERN Stack Developer with strong experience in frontend/backend development, UI/UX, and building scalable SaaS apps. Open source contributor and founder of HostelEase.`
    };
  };

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${personalInfo.name} - Portfolio`,
    "description": professionalSummary?.overview || `Portfolio of ${personalInfo.name}, ${personalInfo.title}`,
    "url": portfolioData.seoConfig?.site?.url || "https://devkantkumar.com",
    "author": {
      "@type": "Person",
      "name": personalInfo.name,
      "jobTitle": personalInfo.title,
      "url": portfolioData.seoConfig?.site?.url || "https://devkantkumar.com"
    },
    "publisher": {
      "@type": "Person",
      "name": personalInfo.name,
      "url": portfolioData.seoConfig?.site?.url || "https://devkantkumar.com"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${portfolioData.seoConfig?.site?.url || "https://devkantkumar.com"}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });

  const getProjectSchema = (project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": project.liveUrl || project.githubUrl,
    "image": project.image,
    "author": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "dateCreated": project.completedDate,
    "programmingLanguage": project.technologies,
    "applicationCategory": "WebApplication"
  });

  const getBlogPostSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "publisher": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "datePublished": post.publishDate,
    "dateModified": post.modifiedDate || post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${portfolioData.seoConfig?.site?.url || "https://devkantkumar.com"}/blog/${post.slug}`
    }
  });

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": personalInfo.name,
    "description": "Professional Full Stack Developer",
    "url": portfolioData.seoConfig?.site?.url || "https://devkantkumar.com",
    "logo": personalInfo.profileImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": personalInfo.contact.email,
      "contactType": "customer service"
    },
    "founder": {
      "@type": "Person",
      "name": personalInfo.name
    }
  });

  const getSchemaData = () => {
    switch (type) {
      case 'person':
        return getPersonSchema();
      case 'website':
        return getWebsiteSchema();
      case 'project':
        return getProjectSchema(pageData);
      case 'blog':
        return getBlogPostSchema(pageData);
      case 'organization':
        return getOrganizationSchema();
      default:
        return getPersonSchema();
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchemaData(), null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
