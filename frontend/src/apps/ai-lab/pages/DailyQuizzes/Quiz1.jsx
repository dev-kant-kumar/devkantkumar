// ═══════════════════════════════════════════════════════════════════════════
// QUIZ 1: Introduction to AI Quiz
// ═══════════════════════════════════════════════════════════════════════════

import { Brain } from 'lucide-react';

const Quiz1 = {
  // Basic Info
  id: 1,
  order: 1,
  slug: 'quiz-1-intro-to-ai',
  title: 'Introduction to AI Quiz',
  description: 'Test your knowledge from Session 1. See how much you learned about Artificial Intelligence basics!',

  // Meta
  duration: '10 min',
  date: '2026-01-11',
  icon: Brain,
  color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',

  // Related session
  relatedSession: 'session-1-intro-to-ai',

  // Quiz Questions
  questions: [
    {
      id: 1,
      question: 'What does AI stand for?',
      options: ['Automatic Intelligence', 'Artificial Intelligence', 'Advanced Internet', 'Awesome Invention'],
      correct: 1,
      explanation: 'AI stands for Artificial Intelligence - the ability of machines to simulate human intelligence.',
    },
    {
      id: 2,
      question: 'Which of these is an example of AI in daily life?',
      options: ['A regular calculator', 'A voice assistant like Alexa', 'A light switch', 'A printed book'],
      correct: 1,
      explanation: 'Voice assistants use AI to understand speech and respond to your questions!',
    },
    {
      id: 3,
      question: 'Who asked "Can machines think?" in 1950?',
      options: ['Albert Einstein', 'Alan Turing', 'Steve Jobs', 'Elon Musk'],
      correct: 1,
      explanation: 'Alan Turing, a famous scientist, asked this question and created the Turing Test.',
    },
    {
      id: 4,
      question: 'What type of AI do we have today?',
      options: ['Super AI', 'General AI', 'Narrow AI', 'Magic AI'],
      correct: 2,
      explanation: 'We currently have Narrow AI (also called Weak AI) that excels at specific tasks.',
    },
    {
      id: 5,
      question: 'Which AI beat the world chess champion in 1997?',
      options: ['ChatGPT', 'Deep Blue', 'Alexa', 'Watson'],
      correct: 1,
      explanation: 'IBM\'s Deep Blue defeated chess champion Garry Kasparov, marking a milestone in AI history!',
    },
  ],
};

export default Quiz1;
