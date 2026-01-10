// ═══════════════════════════════════════════════════════════════════════════
// QUIZ TEMPLATE - Copy this file to create a new quiz
// ═══════════════════════════════════════════════════════════════════════════
//
// How to create a new quiz:
// 1. Copy this file and rename it (e.g., Quiz1.jsx, Quiz2.jsx)
// 2. Update the quizData object with your quiz info
// 3. Add your questions in the questions array
// 4. Import and add to the index.js file
//
// ═══════════════════════════════════════════════════════════════════════════

import { HelpCircle } from 'lucide-react';
// Available icons: Brain, Cpu, MessageSquare, Eye, Shield, Sparkles, Lightbulb, Zap, HelpCircle

const quizData = {
  // Basic Info
  id: 0,                                    // Unique ID (1, 2, 3...)
  order: 0,                                 // Display order
  slug: 'quiz-template',                    // URL slug (use lowercase-with-dashes)
  title: 'Quiz Title Here',                 // Quiz title
  description: 'Brief description of what this quiz covers.',

  // Meta
  duration: '10 min',                       // Estimated duration
  date: '2026-01-11',                       // Quiz date (YYYY-MM-DD)
  icon: HelpCircle,                         // Icon component
  color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',  // Gradient background

  // Related session (optional)
  relatedSession: 'session-1-intro-to-ai',  // Slug of related session

  // Quiz Questions - Add your questions here
  questions: [
    {
      id: 1,
      question: 'Your question here?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0,  // Index of correct answer (0 = A, 1 = B, 2 = C, 3 = D)
      explanation: 'Explanation of why this is the correct answer.',
    },
    // Add more questions...
  ],
};

export default quizData;
