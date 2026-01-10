// ═══════════════════════════════════════════════════════════════════════════
// SESSION 1: Introduction to AI - Your First Step into the AI World
// ═══════════════════════════════════════════════════════════════════════════

import { Brain } from 'lucide-react';

const Session1 = {
  // Basic Info
  id: 1,
  order: 1,
  slug: 'session-1-intro-to-ai',
  title: 'Introduction to AI',
  description: 'Your first step into the exciting world of Artificial Intelligence. Discover how AI is already part of your daily life!',

  // Meta
  duration: '1 hour',
  date: '2026-01-11',
  time: '7:00 PM',
  icon: Brain,
  color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',

  // Topics covered
  topics: ['What is AI?', 'AI in Daily Life', 'AI Tools for Students', 'AI Safety'],

  // Hero Image for session header
  heroImage: '/ai-lab/images/robot-hello.png',

  // Rich Session Content - Now with component types!
  sections: [
    // 1. Icebreaker
    {
      heading: '🎯 You Already Use AI Every Day!',
      type: 'intro',
      content: [
        { type: 'image', src: '/ai-lab/images/robot-hello.png', alt: 'Friendly AI Robot', caption: 'Hello, Future Creators! AI is learning to help!' },
        { type: 'text', value: 'Before we start, let me tell you a secret...' },
        { type: 'highlight', color: 'purple', value: "You're already an AI user! 🎉" },
        { type: 'text', value: 'Have you ever done any of these?' },
        {
          type: 'checklist',
          items: [
            'Asked Siri or Google Assistant a question?',
            'Used autocomplete while typing a message?',
            'Watched YouTube recommendations?',
            'Used a face filter on Instagram or Snapchat?',
          ]
        },
        { type: 'tip', tipType: 'success', value: "If you answered YES to any of these, congratulations — you've been using AI without even knowing it!" },
        { type: 'text', value: "Today, we'll explore what's really happening behind the scenes when you use these apps." },
      ],
    },

    // 2. What is AI
    {
      heading: '🤖 What is Artificial Intelligence?',
      type: 'concept',
      content: [
        { type: 'image', src: '/ai-lab/images/ai-brain.png', alt: 'AI Neural Network Brain', caption: 'AI mimics how our brain works with neural networks' },
        { type: 'bigText', value: 'AI = Teaching computers to think and learn like humans' },
        { type: 'text', value: "Let's break it down with a simple comparison:" },
        {
          type: 'comparison',
          left: { title: 'Humans', items: ['Learn from experience', 'Recognize faces', 'Understand speech'] },
          right: { title: 'AI', items: ['Learns from data', 'Can recognize faces too!', 'Can understand speech too!'] },
        },
        { type: 'tip', tipType: 'info', value: "AI doesn't actually \"think\" like us. It uses patterns and math to make smart guesses!" },
        {
          type: 'example',
          title: 'Example In Action',
          value: 'When you type "Good mor..." and your phone suggests "morning" — that\'s AI recognizing patterns from millions of messages!',
        },
      ],
    },

    // 3. What AI Can Do
    {
      heading: '👀 What Can AI Do?',
      type: 'features',
      content: [
        { type: 'text', value: 'Modern AI has some amazing superpowers:' },
        {
          type: 'featureCards',
          cards: [
            {
              icon: 'Eye',
              title: 'SEE',
              subtitle: 'Computer Vision',
              color: '#3b82f6',
              items: ['Recognize faces in photos', 'Read text from images', 'Identify objects (cat or dog?)']
            },
            {
              icon: 'Ear',
              title: 'LISTEN',
              subtitle: 'Speech Recognition',
              color: '#22c55e',
              items: ['Understand voice commands', 'Convert speech to text', 'Recognize languages']
            },
            {
              icon: 'MessageSquare',
              title: 'TALK',
              subtitle: 'Natural Language',
              color: '#f59e0b',
              items: ['Answer your questions', 'Have conversations', 'Translate instantly']
            },
            {
              icon: 'PenTool',
              title: 'CREATE',
              subtitle: 'Generative AI',
              color: '#ec4899',
              items: ['Write stories & poems', 'Generate images', 'Help with homework']
            },
          ]
        },
        { type: 'quote', value: 'AI is like having a super-smart assistant that never gets tired!', author: null },
      ],
    },

    // 4. AI in Daily Life
    {
      heading: '🌟 AI in Your Daily Life',
      type: 'examples',
      content: [
        { type: 'image', src: '/ai-lab/images/ai-daily-life.png', alt: 'AI in Daily Life', caption: 'AI connects all your favorite apps and devices!' },
        { type: 'text', value: "Let's see where AI is hiding in your everyday activities:" },
        {
          type: 'categoryCards',
          cards: [
            {
              emoji: '🏠',
              title: 'At Home',
              items: ['Smart speakers (Alexa, Google Home)', 'Smart TVs recommending shows', 'Robot vacuum cleaners']
            },
            {
              emoji: '🚗',
              title: 'On the Go',
              items: ['Google Maps predicting traffic', 'Uber/Ola matching drivers', 'Self-driving features']
            },
            {
              emoji: '🛒',
              title: 'Shopping',
              items: ['Amazon product suggestions', 'Personalized deals', 'Voice search']
            },
            {
              emoji: '📱',
              title: 'On Your Phone',
              items: ['Autocorrect fixing typos', 'Face unlock', 'Photo filters']
            },
          ]
        },
        {
          type: 'stat',
          number: '100+',
          label: 'times you interact with AI every day without realizing it!'
        },
      ],
    },

    // 5. AI in Mobile Phones
    {
      heading: '📱 AI in Your Mobile Phone',
      type: 'deep-dive',
      content: [
        { type: 'bigText', value: 'Your smartphone is an AI powerhouse!' },
        {
          type: 'iconList',
          groups: [
            {
              icon: 'Camera',
              title: '📸 Camera Features',
              items: [
                { bold: 'Portrait Mode', text: 'AI blurs the background' },
                { bold: 'Night Mode', text: 'AI brightens dark photos' },
                { bold: 'Face Detection', text: 'Better selfies automatically' },
                { bold: 'Scene Recognition', text: 'Detects food, sunset, pets' },
              ]
            },
            {
              icon: 'Keyboard',
              title: '⌨️ Keyboard Intelligence',
              items: [
                { bold: 'Predictive Text', text: 'Suggests next words' },
                { bold: 'Autocorrect', text: 'Learns your style' },
                { bold: 'Emoji Suggestions', text: 'Based on your words' },
              ]
            },
            {
              icon: 'Lock',
              title: '🔒 Security',
              items: [
                { bold: 'Face ID', text: 'Recognizes your face' },
                { bold: 'Fingerprint', text: 'Biometric scanning' },
                { bold: 'Spam Detection', text: 'Blocks suspicious calls' },
              ]
            },
          ]
        },
        { type: 'tip', tipType: 'tip', value: 'Your phone is constantly using AI to make your life easier!' },
      ],
    },

    // 6. AI in Apps Students Use
    {
      heading: '📲 AI in Apps You Use Daily',
      type: 'apps',
      content: [
        { type: 'text', value: "Let's look at your favorite apps and the AI inside them:" },
        {
          type: 'appShowcase',
          apps: [
            {
              icon: 'Youtube',
              name: 'YouTube',
              color: '#ef4444',
              features: ['Recommends videos you\'ll like', 'Auto-generates subtitles', 'Filters inappropriate content', 'Suggests thumbnails'],
            },
            {
              icon: 'Map',
              name: 'Google Maps',
              color: '#22c55e',
              features: ['Predicts traffic jams', 'Finds fastest route', 'Estimates arrival time', 'Discovers nearby places'],
            },
            {
              icon: 'Instagram',
              name: 'Instagram',
              color: '#e11d48',
              features: ['Face filters that track you', 'Personalized Explore page', 'Caption suggestions', 'Spam detection'],
            },
            {
              icon: 'Music',
              name: 'Spotify',
              color: '#22c55e',
              features: ['Discover Weekly playlists', 'Mood-based recommendations', '"Fans also like" suggestions'],
            },
            {
              icon: 'Search',
              name: 'Google Search',
              color: '#3b82f6',
              features: ['Understands questions', 'Shows relevant results', '"Did you mean..." corrections', 'Voice search'],
            },
          ]
        },
        { type: 'highlight', color: 'green', value: 'Every scroll, every tap — AI is working for you!' },
      ],
    },

    // 7. Live Demo: Asking AI Questions
    {
      heading: '🎬 Live Demo: Let\'s Ask AI!',
      type: 'demo',
      content: [
        { type: 'text', value: "Time for some fun! Let's see AI in action." },
        { type: 'demoHeader', value: "We'll use ChatGPT or Google Gemini to ask questions:" },
        {
          type: 'promptExamples',
          prompts: [
            'Explain photosynthesis like I\'m 10 years old',
            'What are 5 fun facts about the moon?',
            'Help me understand fractions with pizza examples',
          ]
        },
        {
          type: 'checklist',
          title: 'Watch how AI:',
          items: [
            'Understands your question',
            'Gives a helpful answer',
            'Adjusts to your level',
            'Can explain in different ways',
          ]
        },
        {
          type: 'comparison',
          left: { title: '❌ Instead of', items: ['Tell me about history'] },
          right: { title: '✅ Try this', items: ['What were 3 important events in Indian independence?'] },
        },
        { type: 'tip', tipType: 'tip', value: 'The more specific your question, the better the answer!' },
      ],
    },

    // 8. Live Demo: Homework Help
    {
      heading: '📚 Live Demo: AI for Homework Help',
      type: 'demo',
      content: [
        { type: 'bigText', value: 'AI can be your study buddy!' },
        {
          type: 'categoryCards',
          cards: [
            {
              emoji: '🔢',
              title: 'Math Problems',
              items: ['"Solve step by step: 2x + 5 = 15"', '"Explain how to find area of a triangle"']
            },
            {
              emoji: '🔬',
              title: 'Science Concepts',
              items: ['"Explain Newton\'s 3 laws with examples"', '"What happens during evaporation?"']
            },
            {
              emoji: '📝',
              title: 'Essay Writing',
              items: ['"Give me 5 points about water conservation"', '"Help outline an essay on festivals"']
            },
            {
              emoji: '🌐',
              title: 'Language Learning',
              items: ['"Translate this Hindi sentence"', '"Correct grammar in this sentence"']
            },
          ]
        },
        {
          type: 'warning',
          title: '⚠️ Important Rules',
          items: [
            'Use AI to UNDERSTAND, not to copy',
            'Always verify important facts',
            'Tell your teacher if you used AI help',
            'AI can make mistakes — double check!',
          ]
        },
        { type: 'quote', value: 'AI is a tool to help you learn, not to do your homework for you!' },
      ],
    },

    // 9. Live Demo: Creative AI
    {
      heading: '🎨 Live Demo: Creative AI Fun!',
      type: 'demo',
      content: [
        { type: 'text', value: 'AI can be super creative! Let\'s explore:' },
        {
          type: 'creativeExamples',
          examples: [
            { emoji: '📖', title: 'Story Writing', prompt: 'Write a short story about a robot who wants to become a chef' },
            { emoji: '🎵', title: 'Song Lyrics', prompt: 'Write a fun song about studying for exams' },
            { emoji: '🎭', title: 'Role Play', prompt: "Pretend you're a friendly alien visiting Earth" },
            { emoji: '🎮', title: 'Game Ideas', prompt: 'Create a game idea about saving the environment' },
            { emoji: '🖼️', title: 'Image Creation', prompt: 'A cat wearing a graduation cap reading a book' },
            { emoji: '🎬', title: 'Script Writing', prompt: 'Write a funny dialogue between a student and homework' },
          ]
        },
        {
          type: 'interactive',
          title: '🎯 Try It Yourself!',
          value: 'Ask AI to write a poem about your school!'
        },
        { type: 'tip', tipType: 'success', value: 'Remember: AI is a creative partner, but YOUR ideas make it special!' },
      ],
    },

    // 10. NotebookLM Introduction
    {
      heading: '📓 NotebookLM: Your AI Study Partner',
      type: 'tool',
      content: [
        { type: 'bigText', value: 'Google\'s NotebookLM is a special AI tool for students!' },
        {
          type: 'steps',
          title: 'How it works:',
          steps: [
            'Upload your notes, PDFs, or documents',
            'AI reads and understands them',
            'Ask questions about YOUR content',
            'Get explanations from YOUR material',
          ]
        },
        {
          type: 'promptExamples',
          title: 'What you can ask:',
          prompts: [
            'Summarize chapter 5 in bullet points',
            'Create quiz questions from my history notes',
            'Explain this concept in simpler words',
            'Connect ideas from page 2 and page 10',
          ]
        },
        {
          type: 'checklist',
          title: 'Why it\'s amazing:',
          items: [
            'Personalized to YOUR study material',
            'No random internet information',
            'Helps you prepare for exams',
            'Works like a personal tutor',
          ]
        },
        {
          type: 'link',
          url: 'https://notebooklm.google.com',
          title: '🔗 Try NotebookLM',
          description: 'notebooklm.google.com'
        },
        { type: 'highlight', color: 'purple', value: 'This is the future of studying!' },
      ],
    },

    // 11. AI for Students
    {
      heading: '🎓 How AI Can Help You Study Better',
      type: 'guide',
      content: [
        { type: 'image', src: '/ai-lab/images/ai-students.png', alt: 'Students Learning with AI', caption: 'AI Study Buddy helps students learn together!' },
        { type: 'text', value: 'AI is your secret weapon for learning!' },
        {
          type: 'featureCards',
          cards: [
            {
              icon: 'FileText',
              title: 'Note Taking',
              color: '#3b82f6',
              items: ['Summarize long chapters', 'Create mind maps', 'Generate flashcards']
            },
            {
              icon: 'Brain',
              title: 'Understanding',
              color: '#8b5cf6',
              items: ['Simple explanations', 'Real life examples', 'Learn at your pace']
            },
            {
              icon: 'ChartBar',
              title: 'Study Planning',
              color: '#22c55e',
              items: ['Create schedules', 'Break down topics', 'Track progress']
            },
            {
              icon: 'PenLine',
              title: 'Writing Help',
              color: '#f59e0b',
              items: ['Grammar check', 'Essay structure', 'Vocabulary boost']
            },
            {
              icon: 'FlaskConical',
              title: 'Research',
              color: '#ef4444',
              items: ['Find info quickly', 'Multiple perspectives', 'Organize findings']
            },
            {
              icon: 'GraduationCap',
              title: 'Practice',
              color: '#ec4899',
              items: ['Generate questions', 'Instant feedback', 'Learn from mistakes']
            },
          ]
        },
        { type: 'quote', value: 'The key: Use AI to ENHANCE your learning, not replace it!' },
      ],
    },

    // 12. AI Safety
    {
      heading: '🛡️ AI Safety & Responsible Use',
      type: 'safety',
      content: [
        { type: 'bigText', value: 'With great power comes great responsibility!' },
        {
          type: 'safetyRules',
          rules: [
            {
              icon: 'Lock',
              title: '🔒 Privacy First',
              items: ['Never share personal information with AI', 'Don\'t upload private photos', 'Avoid sharing address or school name'],
              color: '#ef4444',
            },
            {
              icon: 'CheckCircle2',
              title: '✅ Verify Information',
              items: ['AI can make mistakes', 'Double-check important facts', 'Use multiple sources'],
              color: '#f59e0b',
            },
            {
              icon: 'Shield',
              title: '🚫 Don\'t Trust Blindly',
              items: ['AI doesn\'t know everything', 'It can be wrong confidently', 'Use your own judgment'],
              color: '#3b82f6',
            },
            {
              icon: 'BookOpen',
              title: '📚 Academic Honesty',
              items: ['Don\'t copy AI answers as your own', 'Tell teachers when you use AI', 'Use it to learn, not cheat'],
              color: '#8b5cf6',
            },
          ]
        },
        { type: 'tip', tipType: 'warning', value: 'Ask parents/teachers about AI use. Report anything that seems wrong!' },
        { type: 'highlight', color: 'green', value: 'Remember: YOU are in control. AI is just a tool!' },
      ],
    },

    // 13. Recap
    {
      heading: '📋 Quick Recap: What We Learned Today',
      type: 'recap',
      content: [
        {
          type: 'recapList',
          items: [
            { title: '✅ AI is Already Part of Your Life', points: ['You use AI every day through apps', 'It\'s in your phone, YouTube, Google Maps'] },
            { title: '✅ What AI Can Do', points: ['See, Listen, Talk, Write, Create', 'Learn from patterns and data'] },
            { title: '✅ AI in Your Apps', points: ['YouTube recommends videos', 'Instagram filters use AI', 'Google Maps predicts traffic'] },
            { title: '✅ AI for Learning', points: ['Ask questions to ChatGPT/Gemini', 'Get homework help', 'Use NotebookLM for studying'] },
            { title: '✅ Stay Safe', points: ['Don\'t share personal info', 'Verify facts', 'Use AI responsibly'] },
          ]
        },
        {
          type: 'keyTakeaway',
          value: 'AI is a powerful tool that can help you learn, create, and explore — but YOU are still in charge!'
        },
        { type: 'nextSession', value: "Next session, we'll dive deeper into how AI actually learns! 🚀" },
      ],
    },
  ],

  // Quiz remains the same
  quiz: {
    title: 'Session 1 Quick Quiz',
    questions: [
      {
        id: 1,
        question: 'What does AI stand for?',
        options: ['Automatic Intelligence', 'Artificial Intelligence', 'Advanced Internet', 'Apple Intelligence'],
        correct: 1,
        explanation: 'AI stands for Artificial Intelligence — the technology that helps computers think and learn like humans.',
      },
      {
        id: 2,
        question: 'Which of these is NOT an example of AI in daily life?',
        options: ['YouTube recommendations', 'Face filters on Instagram', 'A simple calculator', 'Google Assistant'],
        correct: 2,
        explanation: 'A simple calculator just does math calculations. It doesn\'t learn or adapt — that\'s what makes AI different!',
      },
      {
        id: 3,
        question: 'What can AI SEE?',
        options: ['Only text', 'Faces and objects in photos', 'Nothing, AI is blind', 'Only videos'],
        correct: 1,
        explanation: 'AI can "see" through Computer Vision — recognizing faces, objects, text, and more in images and videos.',
      },
      {
        id: 4,
        question: 'How does Google Maps know about traffic?',
        options: ['Magic', 'AI analyzing data from many phones', 'Someone watches every road', 'It just guesses'],
        correct: 1,
        explanation: 'Google Maps uses AI to analyze speed data from millions of phones to predict traffic conditions!',
      },
      {
        id: 5,
        question: 'What is NotebookLM best used for?',
        options: ['Playing games', 'Studying your own notes with AI help', 'Social media', 'Taking photos'],
        correct: 1,
        explanation: 'NotebookLM is Google\'s AI tool that reads YOUR notes and helps you study and understand them better!',
      },
      {
        id: 6,
        question: 'When using AI for homework, you should:',
        options: ['Copy everything it says', 'Never use it at all', 'Use it to understand and learn', 'Keep it secret from teachers'],
        correct: 2,
        explanation: 'AI should be used as a learning tool to help you UNDERSTAND concepts, not to copy answers!',
      },
      {
        id: 7,
        question: 'What should you NEVER share with AI?',
        options: ['Questions about science', 'Personal information like address', 'Homework problems', 'Story ideas'],
        correct: 1,
        explanation: 'Never share personal information like your address, phone number, or private photos with AI tools!',
      },
      {
        id: 8,
        question: 'Your phone\'s face unlock uses:',
        options: ['Regular photos', 'AI face recognition', 'Password only', 'No technology'],
        correct: 1,
        explanation: 'Face unlock uses AI-powered facial recognition to identify your unique face features!',
      },
      {
        id: 9,
        question: 'Can AI make mistakes?',
        options: ['No, AI is always correct', 'Yes, AI can give wrong answers', 'Only in math', 'Never in English'],
        correct: 1,
        explanation: 'Yes! AI can make mistakes and give wrong answers confidently. Always verify important information!',
      },
      {
        id: 10,
        question: 'The best way to use AI for studying is:',
        options: ['Replace your brain with AI', 'Use it to enhance and support your learning', 'Never study, just use AI', 'Only for entertainment'],
        correct: 1,
        explanation: 'AI is best used to ENHANCE your learning — helping you understand, practice, and explore topics deeper!',
      },
    ],
  },
};

export default Session1;
