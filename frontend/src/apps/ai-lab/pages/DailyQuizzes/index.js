// DailyQuizzes Index - Auto-exports all quizzes

// Import quiz files
import Quiz1 from './Quiz1';

// Export all quizzes as an array
const allQuizzes = [
  Quiz1,
];

// Sort quizzes by order
export const quizzes = allQuizzes.sort((a, b) => {
  if (a.order && b.order) return a.order - b.order;
  if (a.date && b.date) return new Date(a.date) - new Date(b.date);
  return 0;
});

export const getQuizCount = () => quizzes.length;
export const getQuizBySlug = (slug) => quizzes.find(q => q.slug === slug);
