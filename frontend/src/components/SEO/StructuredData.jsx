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

  const getProjectSchema = (project) => {
    const siteUrl = portfolioData.seoConfig?.site?.url || "https://devkantkumar.com";
    const imageUrl = project.image?.startsWith('http')
      ? project.image
      : project.image
        ? `${siteUrl}${project.image.startsWith('/') ? '' : '/'}${project.image}`
        : "";

    return {
      "@context": "https://schema.org",
      "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
      "name": project.title || project.name,
      "description": project.description,
      "url": project.liveUrl || project.links?.live || project.githubUrl || project.links?.github,
      "image": imageUrl,
      "codeRepository": project.githubUrl || project.links?.github,
      "programmingLanguage": Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies,
      "runtimePlatform": "Web",
      "author": { "@type": "Person", "name": personalInfo.name },
      "dateCreated": project.completedDate || project.year,
      "applicationCategory": "WebApplication"
    };
  };

  const getBlogPostSchema = (post) => {
    const siteUrl = portfolioData.seoConfig?.site?.url || "https://devkantkumar.com";
    const imageUrl = post.image?.startsWith('http')
      ? post.image
      : `${siteUrl}${post.image?.startsWith('/') ? '' : '/'}${post.image || ''}`;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": imageUrl,
      "author": {
        "@type": "Person",
        "name": personalInfo.name,
        "url": siteUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": personalInfo.name,
        "logo": {
          "@type": "ImageObject",
          "url": personalInfo.profileImage
        }
      },
      "datePublished": post.publishDate,
      "dateModified": post.modifiedDate || post.publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${post.slug}`
      },
      "video": post.videos?.map(video => ({
        "@type": "VideoObject",
        "name": video.name,
        "description": video.description,
        "thumbnailUrl": video.thumbnailUrl,
        "uploadDate": video.uploadDate,
        "embedUrl": video.embedUrl,
        "contentUrl": video.embedUrl
      }))
    };
  };

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

  // Add ItemList for projects listing
  const getItemListSchema = () => {
    const items = (pageData.items || projects || []).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${seoConfig?.site?.url || "https://devkantkumar.com"}/projects/${p.id}`
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": items
    };
  };
  // Add BreadcrumbList for pages
  const getBreadcrumbsSchema = () => {
    const crumbs = (pageData.breadcrumbs || []).map((c, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": c.name,
      "item": `${seoConfig?.site?.url || "https://devkantkumar.com"}${c.path}`
    }));
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": crumbs
    };
  };
  const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (pageData.faqs || []).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const getSoftwareApplicationSchema = (tool) => {
    const siteUrl = portfolioData.seoConfig?.site?.url || "https://devkantkumar.com";

    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "operatingSystem": "Web Browser",
      "applicationCategory": tool.category || "DeveloperApplication",
      "oferring": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      // Removed hardcoded aggregateRating to avoid misleading schema
      "featureList": tool.keywords ? tool.keywords.join(", ") : "Online Tool",
      "author": {
        "@type": "Person",
        "name": personalInfo.name,
        "url": siteUrl
      },
      "image": personalInfo.profileImage, // Using profile image as fallback icon if no screenshot
      "url": `${siteUrl}/tools/${tool.slug || ''}`,
      "description": tool.description
    };
  };

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
      case 'itemList':
        return getItemListSchema();
      case 'breadcrumbs':
        return getBreadcrumbsSchema();
      case 'faq':
        return getFAQSchema();
      case 'software':
        return getSoftwareApplicationSchema(pageData);
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
