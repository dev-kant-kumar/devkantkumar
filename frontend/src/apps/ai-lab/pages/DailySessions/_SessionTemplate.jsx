// ═══════════════════════════════════════════════════════════════════════════
// SESSION TEMPLATE - Copy this file to create a new session
// ═══════════════════════════════════════════════════════════════════════════
//
// How to create a new session:
// 1. Copy this file and rename it (e.g., Session1.jsx, Session2.jsx)
// 2. Update the sessionData object with your session info
// 3. Add your content in the sections array
// 4. Import and add to the index.js file
//
// ═══════════════════════════════════════════════════════════════════════════

import { Brain } from 'lucide-react';
// Available icons: Brain, Cpu, MessageSquare, Eye, Shield, Sparkles, Lightbulb, Zap, Code, Database, Globe

const sessionData = {
  // Basic Info
  id: 0,                                    // Unique ID (1, 2, 3...)
  order: 0,                                 // Display order
  slug: 'session-template',                 // URL slug (use lowercase-with-dashes)
  title: 'Session Title Here',              // Session title
  description: 'Brief description of what this session covers.',

  // Meta
  duration: '45 min',                       // Estimated duration
  date: '2026-01-11',                       // Session date (YYYY-MM-DD)
  icon: Brain,                              // Icon component
  color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',  // Gradient background

  // Topics covered (shown as tags)
  topics: ['Topic 1', 'Topic 2', 'Topic 3'],

  // Session Content - Add your sections here
  sections: [
    {
      heading: '🎯 Section 1 Title',
      content: `Your content here...

You can write multiple paragraphs.

• Use bullet points like this
• Another point
• And another`,
    },
    {
      heading: '📚 Section 2 Title',
      content: `More content here...`,
    },
    {
      heading: '💡 Key Takeaways',
      content: `Summarize the main points of the session here.`,
    },
  ],
};

export default sessionData;
