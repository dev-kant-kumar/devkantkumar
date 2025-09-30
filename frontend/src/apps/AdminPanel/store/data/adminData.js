/**
 * Admin Panel Data Configuration
 *
 * This file contains static configuration data for the admin panel,
 * including navigation items, dashboard widgets, form configurations, etc.
 */

export const adminData = {
  // Navigation configuration
  navigation: {
    main: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/admin',
        icon: 'LayoutDashboard',
        description: 'Overview and analytics',
      },
      {
        id: 'content',
        name: 'Content',
        path: '/admin/content',
        icon: 'FileText',
        description: 'Manage general content',
      },
      {
        id: 'projects',
        name: 'Projects',
        path: '/admin/projects',
        icon: 'FolderOpen',
        description: 'Manage portfolio projects',
      },
      {
        id: 'skills',
        name: 'Skills',
        path: '/admin/skills',
        icon: 'Code',
        description: 'Manage technical skills',
      },
      {
        id: 'blog',
        name: 'Blog',
        path: '/admin/blog',
        icon: 'PenTool',
        description: 'Manage blog posts',
      },
      {
        id: 'settings',
        name: 'Settings',
        path: '/admin/settings',
        icon: 'Settings',
        description: 'System configuration',
      },
    ],

    panels: [
      {
        id: 'portfolio',
        name: 'Portfolio',
        path: '/',
        description: 'Public portfolio site',
      },
      {
        id: 'marketplace',
        name: 'Marketplace',
        path: '/marketplace',
        description: 'Services and products',
      },
      {
        id: 'admin',
        name: 'Admin',
        path: '/admin',
        description: 'Content management',
        current: true,
      },
    ],
  },

  // Dashboard configuration
  dashboard: {
    widgets: [
      {
        id: 'projects_count',
        title: 'Total Projects',
        type: 'stat',
        icon: 'FolderOpen',
        color: 'blue',
        dataSource: 'projects.count',
      },
      {
        id: 'blog_posts_count',
        title: 'Blog Posts',
        type: 'stat',
        icon: 'FileText',
        color: 'green',
        dataSource: 'blog.count',
      },
      {
        id: 'page_views',
        title: 'Page Views',
        type: 'stat',
        icon: 'Eye',
        color: 'purple',
        dataSource: 'analytics.pageViews',
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'stat',
        icon: 'MessageSquare',
        color: 'orange',
        dataSource: 'contact.messages',
      },
    ],

    charts: [
      {
        id: 'traffic_overview',
        title: 'Traffic Overview',
        type: 'line',
        timeRange: '30d',
        dataSource: 'analytics.traffic',
      },
      {
        id: 'project_views',
        title: 'Project Views',
        type: 'bar',
        timeRange: '7d',
        dataSource: 'projects.views',
      },
    ],

    recentActivity: {
      maxItems: 10,
      types: ['project', 'blog', 'skill', 'contact', 'system'],
    },
  },

  // Form configurations
  forms: {
    project: {
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Project Name',
          required: true,
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          validation: {
            minLength: 10,
            maxLength: 500,
          },
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: [
            { value: 'fullstack', label: 'Full Stack' },
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'mobile', label: 'Mobile' },
          ],
        },
        {
          name: 'technologies',
          type: 'multiselect',
          label: 'Technologies',
          required: true,
          options: [
            { value: 'react', label: 'React' },
            { value: 'nodejs', label: 'Node.js' },
            { value: 'mongodb', label: 'MongoDB' },
            { value: 'express', label: 'Express.js' },
            // Add more as needed
          ],
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          required: true,
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'archived', label: 'Archived' },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Project',
          required: false,
        },
        {
          name: 'links',
          type: 'object',
          label: 'Links',
          fields: [
            {
              name: 'live',
              type: 'url',
              label: 'Live Demo URL',
              required: false,
            },
            {
              name: 'github',
              type: 'url',
              label: 'GitHub URL',
              required: false,
            },
          ],
        },
      ],
    },

    blog: {
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          validation: {
            minLength: 5,
            maxLength: 200,
          },
        },
        {
          name: 'slug',
          type: 'text',
          label: 'URL Slug',
          required: true,
          validation: {
            pattern: '^[a-z0-9-]+$',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Excerpt',
          required: true,
          validation: {
            maxLength: 300,
          },
        },
        {
          name: 'content',
          type: 'richtext',
          label: 'Content',
          required: true,
        },
        {
          name: 'tags',
          type: 'tags',
          label: 'Tags',
          required: false,
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          required: true,
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'archived', label: 'Archived' },
          ],
        },
        {
          name: 'publishedAt',
          type: 'datetime',
          label: 'Publish Date',
          required: false,
        },
      ],
    },

    skill: {
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Skill Name',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: [
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'tools', label: 'Tools' },
            { value: 'concepts', label: 'Concepts' },
          ],
        },
        {
          name: 'level',
          type: 'select',
          label: 'Proficiency Level',
          required: true,
          options: [
            { value: 'basic', label: 'Basic' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
            { value: 'expert', label: 'Expert' },
          ],
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          required: false,
          placeholder: 'e.g., SiReact, DiNodejs',
        },
        {
          name: 'color',
          type: 'color',
          label: 'Brand Color',
          required: false,
        },
      ],
    },
  },

  // Table configurations
  tables: {
    projects: {
      columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'featured', label: 'Featured', sortable: false },
        { key: 'updatedAt', label: 'Last Updated', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false },
      ],
      defaultSort: { key: 'updatedAt', order: 'desc'
