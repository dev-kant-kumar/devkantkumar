const aiToolsData = [
  // CHATBOTS & AI ASSISTANTS
  { id: 1, name: "ChatGPT", category: "Chatbots & Assistants", description: "OpenAI's flagship conversational AI powered by GPT-4o and o1 reasoning models. Handles text, images, code, and complex problem-solving.", url: "https://chat.openai.com", pricing: "Freemium", featured: true, tags: [
      "conversation",
      "gpt4",
      "reasoning",
      "multimodal"
    ], logo: "🤖", rating: 4.8, users: "200M+"
  },
  { id: 2, name: "Claude", category: "Chatbots & Assistants", description: "Anthropic's flagship AI with extended 200K context, superior coding abilities, and artifact creation for documents and apps.", url: "https://claude.ai", pricing: "Freemium", featured: true, tags: [
      "coding",
      "documents",
      "long-context",
      "ethical-ai"
    ], logo: "🧠", rating: 4.9, users: "50M+"
  },
  { id: 3, name: "Google Gemini", category: "Chatbots & Assistants", description: "Google's multimodal AI with real-time web access, YouTube analysis, and deep Google Workspace integration.", url: "https://gemini.google.com", pricing: "Freemium", featured: true, tags: [
      "multimodal",
      "google",
      "workspace",
      "search"
    ], logo: "✨", rating: 4.7, users: "100M+"
  },
  { id: 4, name: "Microsoft Copilot", category: "Chatbots & Assistants", description: "GPT-4 powered assistant integrated across Windows, Edge, Office 365, and Bing with enterprise-grade security.", url: "https://copilot.microsoft.com", pricing: "Freemium", featured: false, tags: [
      "microsoft",
      "office",
      "enterprise",
      "integration"
    ], logo: "💼", rating: 4.6, users: "75M+"
  },
  { id: 5, name: "Perplexity AI", category: "Chatbots & Assistants", description: "AI-powered search engine with cited sources, real-time information, and comprehensive research capabilities.", url: "https://perplexity.ai", pricing: "Freemium", featured: true, tags: [
      "research",
      "citations",
      "search",
      "accuracy"
    ], logo: "🔍", rating: 4.8, users: "30M+"
  },
  { id: 6, name: "Grok", category: "Chatbots & Assistants", description: "xAI's conversational AI with real-time X/Twitter integration and direct access to breaking news and trends.", url: "https://grok.x.ai", pricing: "Premium", featured: false, tags: [
      "twitter",
      "real-time",
      "news"
    ], logo: "🔥", rating: 4.5, users: "15M+"
  },
  { id: 7, name: "Pi AI", category: "Chatbots & Assistants", description: "Inflection AI's emotionally intelligent personal assistant focused on supportive conversations and mental wellness.", url: "https://pi.ai", pricing: "Free", featured: false, tags: [
      "emotional",
      "wellness",
      "personal"
    ], logo: "💙", rating: 4.6, users: "10M+"
  },
  { id: 8, name: "Poe", category: "Chatbots & Assistants", description: "Multi-model AI platform giving access to GPT-4, Claude, Gemini, and custom bots in one interface.", url: "https://poe.com", pricing: "Freemium", featured: false, tags: [
      "multi-model",
      "aggregator",
      "custom-bots"
    ], logo: "🎯", rating: 4.4, users: "8M+"
  },
  { id: 9, name: "Character.AI", category: "Chatbots & Assistants", description: "Create and chat with AI characters with distinct personalities. Popular for entertainment and creative roleplay.", url: "https://character.ai", pricing: "Freemium", featured: false, tags: [
      "roleplay",
      "entertainment",
      "characters"
    ], logo: "🎭", rating: 4.5, users: "25M+"
  },
  { id: 10, name: "Replika", category: "Chatbots & Assistants", description: "AI companion for meaningful conversations, mental health support, and personal growth with adaptive personality.", url: "https://replika.com", pricing: "Freemium", featured: false, tags: [
      "companion",
      "mental-health",
      "personalized"
    ], logo: "💬", rating: 4.3, users: "20M+"
  },
  { id: 11, name: "Meta AI", category: "Chatbots & Assistants", description: "Meta's AI assistant powered by Llama 3 integrated into Facebook, Instagram, WhatsApp, and Messenger.", url: "https://meta.ai", pricing: "Free", featured: false, tags: [
      "meta",
      "social-media",
      "llama"
    ], logo: "🔷", rating: 4.4, users: "500M+"
  },
  { id: 12, name: "YouChat", category: "Chatbots & Assistants", description: "AI assistant built into You.com search engine with citations, image generation, and code generation.", url: "https://you.com", pricing: "Free", featured: false, tags: [
      "search",
      "citations",
      "multimodal"
    ], logo: "🌐", rating: 4.2, users: "3M+"
  },
  // WRITING & CONTENT CREATION
  { id: 13, name: "Jasper AI", category: "Writing & Content", description: "Enterprise AI writing platform with 50+ templates, brand voice customization, and team collaboration for marketing content.", url: "https://jasper.ai", pricing: "Premium", featured: true, tags: [
      "marketing",
      "templates",
      "brand-voice",
      "enterprise"
    ], logo: "✍️", rating: 4.7, users: "10M+"
  },
  { id: 14, name: "Copy.ai", category: "Writing & Content", description: "AI copywriting tool with workflow automation for ads, emails, social media, and long-form content creation.", url: "https://copy.ai", pricing: "Freemium", featured: true, tags: [
      "copywriting",
      "workflows",
      "automation"
    ], logo: "📄", rating: 4.6, users: "8M+"
  },
  { id: 15, name: "Writesonic", category: "Writing & Content", description: "All-in-one AI writing suite with SEO optimization, article generation, and Chatsonic conversational interface.", url: "https://writesonic.com", pricing: "Freemium", featured: false, tags: [
      "seo",
      "articles",
      "chatbot"
    ], logo: "🚀", rating: 4.5, users: "6M+"
  },
  { id: 16, name: "Grammarly", category: "Writing & Content", description: "AI-powered writing assistant with grammar checking, tone detection, plagiarism detection, and style suggestions.", url: "https://grammarly.com", pricing: "Freemium", featured: true, tags: [
      "grammar",
      "editing",
      "tone",
      "plagiarism"
    ], logo: "📚", rating: 4.8, users: "30M+"
  },
  { id: 17, name: "QuillBot", category: "Writing & Content", description: "Paraphrasing tool with grammar checker, summarizer, citation generator, and plagiarism detector for academic writing.", url: "https://quillbot.com", pricing: "Freemium", featured: false, tags: [
      "paraphrasing",
      "summarization",
      "citations"
    ], logo: "🪶", rating: 4.5, users: "50M+"
  },
  { id: 18, name: "Rytr", category: "Writing & Content", description: "Affordable AI writing assistant with 40+ use cases and tones for blogs, ads, emails, and social media posts.", url: "https://rytr.me", pricing: "Freemium", featured: false, tags: [
      "affordable",
      "templates",
      "multi-purpose"
    ], logo: "✏️", rating: 4.6, users: "7M+"
  },
  { id: 19, name: "Wordtune", category: "Writing & Content", description: "AI writing companion that rewrites and rephrases for clarity, casual/formal tones, and length adjustment.", url: "https://wordtune.com", pricing: "Freemium", featured: false, tags: [
      "rewriting",
      "clarity",
      "tone-adjustment"
    ], logo: "🎨", rating: 4.7, users: "10M+"
  },
  { id: 20, name: "Notion AI", category: "Writing & Content", description: "Built-in AI for Notion workspace with content generation, editing, summarization, and database operations.", url: "https://notion.so/product/ai", pricing: "Premium", featured: false, tags: [
      "workspace",
      "productivity",
      "database"
    ], logo: "📋", rating: 4.8, users: "100M+"
  },
  { id: 21, name: "Sudowrite", category: "Writing & Content", description: "AI writing tool specifically designed for fiction authors with story development, character building, and creative suggestions.", url: "https://sudowrite.com", pricing: "Premium", featured: false, tags: [
      "fiction",
      "storytelling",
      "creative"
    ], logo: "📖", rating: 4.7, users: "500K+"
  },
  { id: 22, name: "Hypotenuse AI", category: "Writing & Content", description: "AI content generator for eCommerce product descriptions, blog articles, and marketing copy with batch generation.", url: "https://hypotenuse.ai", pricing: "Freemium", featured: false, tags: [
      "ecommerce",
      "bulk",
      "product-descriptions"
    ], logo: "🛍️", rating: 4.5, users: "2M+"
  },
  // IMAGE GENERATION
  { id: 23, name: "Midjourney", category: "Image Generation", description: "Leading AI art generator producing stunning, photorealistic and artistic images via Discord interface with v6 model.", url: "https://midjourney.com", pricing: "Premium", featured: true, tags: [
      "art",
      "photorealistic",
      "discord",
      "v6"
    ], logo: "🎨", rating: 4.9, users: "20M+"
  },
  { id: 24, name: "DALL-E 3", category: "Image Generation", description: "OpenAI's advanced image generator with superior text rendering and prompt understanding, integrated into ChatGPT Plus.", url: "https://openai.com/dall-e-3", pricing: "Freemium", featured: true, tags: [
      "text-rendering",
      "openai",
      "chatgpt"
    ], logo: "🖼️", rating: 4.8, users: "50M+"
  },
  { id: 25, name: "Stable Diffusion", category: "Image Generation", description: "Open-source image generation model that runs locally with complete control, customization, and fine-tuning capabilities.", url: "https://stability.ai", pricing: "Free", featured: true, tags: [
      "open-source",
      "local",
      "customizable"
    ], logo: "🌊", rating: 4.7, users: "100M+"
  },
  { id: 26, name: "Adobe Firefly", category: "Image Generation", description: "Enterprise-ready generative AI from Adobe with commercial-safe training and seamless Creative Cloud integration.", url: "https://firefly.adobe.com", pricing: "Freemium", featured: false, tags: [
      "adobe",
      "commercial-safe",
      "enterprise"
    ], logo: "🔥", rating: 4.7, users: "15M+"
  },
  { id: 27, name: "Leonardo.ai", category: "Image Generation", description: "Game asset and character creation platform with consistent character generation, style control, and real-time canvas.", url: "https://leonardo.ai", pricing: "Freemium", featured: false, tags: [
      "gaming",
      "characters",
      "consistency"
    ], logo: "🎮", rating: 4.8, users: "10M+"
  },
  { id: 28, name: "Ideogram", category: "Image Generation", description: "Text-to-image AI with exceptional text rendering capabilities in images, perfect for logos, posters, and design work.", url: "https://ideogram.ai", pricing: "Freemium", featured: false, tags: [
      "text-in-image",
      "logos",
      "design"
    ], logo: "💡", rating: 4.7, users: "5M+"
  },
  { id: 29, name: "Flux", category: "Image Generation", description: "Black Forest Labs' state-of-the-art open image model with photorealism, prompt adherence, and fast generation.", url: "https://flux1.ai", pricing: "Freemium", featured: true, tags: [
      "open-source",
      "photorealistic",
      "advanced"
    ], logo: "⚡", rating: 4.8, users: "8M+"
  },
  { id: 30, name: "Canva AI", category: "Image Generation", description: "AI image generation and editing built into Canva's design platform with templates and Magic Edit features.", url: "https://canva.com/ai-image-generator", pricing: "Freemium", featured: false, tags: [
      "design",
      "templates",
      "integration"
    ], logo: "🎨", rating: 4.7, users: "150M+"
  },
  // VIDEO GENERATION
  { id: 31, name: "Runway Gen-3", category: "Video Generation", description: "Hollywood-grade AI video generation with motion control, camera movements, cinematic quality, and professional tools.", url: "https://runwayml.com", pricing: "Freemium", featured: true, tags: [
      "cinematic",
      "motion-control",
      "professional"
    ], logo: "🎬", rating: 4.9, users: "3M+"
  },
  { id: 32, name: "Sora", category: "Video Generation", description: "OpenAI's revolutionary text-to-video model creating up to 60-second videos with complex scenes and realistic motion.", url: "https://openai.com/sora", pricing: "Waitlist", featured: true, tags: [
      "openai",
      "text-to-video",
      "revolutionary"
    ], logo: "🌌", rating: 4.8, users: "Waitlist"
  },
  { id: 33, name: "Pika", category: "Video Generation", description: "AI video platform with lip-sync, expand canvas, modify region, and video-to-video transformation features.", url: "https://pika.art", pricing: "Freemium", featured: true, tags: [
      "editing",
      "lip-sync",
      "accessible"
    ], logo: "⚡", rating: 4.7, users: "5M+"
  },
  { id: 34, name: "Synthesia", category: "Video Generation", description: "AI avatar video creation platform for corporate training, marketing, and multilingual content with 140+ avatars.", url: "https://synthesia.io", pricing: "Premium", featured: false, tags: [
      "avatars",
      "corporate",
      "multilingual"
    ], logo: "🎥", rating: 4.8, users: "1M+"
  },
  { id: 35, name: "HeyGen", category: "Video Generation", description: "AI video generator with realistic avatars, voice cloning, and video translation for 40+ languages instantly.", url: "https://heygen.com", pricing: "Freemium", featured: false, tags: [
      "avatars",
      "translation",
      "voice-clone"
    ], logo: "👤", rating: 4.7, users: "2M+"
  },
  { id: 36, name: "Luma Dream Machine", category: "Video Generation", description: "Fast text-to-video generation creating 120 frames in 120 seconds with smooth motion and cinematic quality.", url: "https://lumalabs.ai", pricing: "Freemium", featured: false, tags: [
      "fast",
      "smooth",
      "accessible"
    ], logo: "✨", rating: 4.6, users: "4M+"
  },
  { id: 37, name: "Opus Clip", category: "Video Generation", description: "AI-powered video repurposing tool that creates viral short clips from long videos with auto-captions.", url: "https://opus.pro", pricing: "Freemium", featured: false, tags: [
      "short-form",
      "repurposing",
      "viral"
    ], logo: "🎯", rating: 4.7, users: "1M+"
  },
  // CODING & DEVELOPMENT
  { id: 38, name: "GitHub Copilot", category: "Coding & Development", description: "AI pair programmer by GitHub and OpenAI with code completion, chat, PR assistance across all major languages.", url: "https://github.com/features/copilot", pricing: "Premium", featured: true, tags: [
      "code-completion",
      "github",
      "multi-language"
    ], logo: "💻", rating: 4.8, users: "50M+"
  },
  { id: 39, name: "Cursor", category: "Coding & Development", description: "AI-first code editor with codebase-aware completions, natural language commands, and GPT-4 integration for developers.", url: "https://cursor.sh", pricing: "Freemium", featured: true, tags: [
      "editor",
      "codebase-aware",
      "commands"
    ], logo: "⌨️", rating: 4.9, users: "1M+"
  },
  { id: 40, name: "Replit Ghostwriter", category: "Coding & Development", description: "AI coding assistant built into Replit with code generation, debugging, explanation, and instant cloud deployment.", url: "https://replit.com/ai", pricing: "Freemium", featured: false, tags: [
      "online-ide",
      "deployment",
      "debugging"
    ], logo: "👻", rating: 4.7, users: "25M+"
  },
  { id: 41, name: "Tabnine", category: "Coding & Development", description: "AI code assistant with privacy-first approach, team learning capabilities, and enterprise deployment options.", url: "https://tabnine.com", pricing: "Freemium", featured: false, tags: [
      "privacy",
      "team-learning",
      "enterprise"
    ], logo: "🔷", rating: 4.6, users: "1M+"
  },
  { id: 42, name: "Codeium", category: "Coding & Development", description: "Free AI coding assistant with autocomplete, chat, and search across 70+ languages and 40+ editors.", url: "https://codeium.com", pricing: "Freemium", featured: false, tags: [
      "free",
      "multi-editor",
      "search"
    ], logo: "🚀", rating: 4.7, users: "800K+"
  },
  { id: 43, name: "Windsurf Editor", category: "Coding & Development", description: "Codeium's standalone AI editor with flows for complex multi-file edits, refactoring, and agentic coding.", url: "https://codeium.com/windsurf", pricing: "Free", featured: false, tags: [
      "editor",
      "refactoring",
      "flows"
    ], logo: "🏄", rating: 4.8, users: "200K+"
  },
  { id: 44, name: "v0 by Vercel", category: "Coding & Development", description: "Generate production-ready React components from text prompts with shadcn/ui styling and instant preview.", url: "https://v0.dev", pricing: "Freemium", featured: false, tags: [
      "react",
      "ui",
      "components"
    ], logo: "⚛️", rating: 4.7, users: "1M+"
  },
  { id: 45, name: "Bolt.new", category: "Coding & Development", description: "StackBlitz's AI tool that builds and deploys full-stack web apps from prompts with live preview and editing.", url: "https://bolt.new", pricing: "Freemium", featured: true, tags: [
      "full-stack",
      "deployment",
      "instant"
    ], logo: "⚡", rating: 4.8, users: "500K+"
  },
  { id: 46, name: "Phind", category: "Coding & Development", description: "AI search engine for developers with code examples, technical documentation answers, and real-time web access.", url: "https://phind.com", pricing: "Freemium", featured: false, tags: [
      "search",
      "documentation",
      "examples"
    ], logo: "🔍", rating: 4.6, users: "5M+"
  },
  { id: 47, name: "Lovable", category: "Coding & Development", description: "AI-powered full-stack app builder that creates production-ready web applications with Supabase backend integration.", url: "https://lovable.dev", pricing: "Freemium", featured: false, tags: [
      "full-stack",
      "supabase",
      "apps"
    ], logo: "💜", rating: 4.7, users: "300K+"
  },
  // PRODUCTIVITY & AUTOMATION
  { id: 48, name: "Zapier", category: "Productivity & Automation", description: "Connect 6,000+ apps with automated workflows (Zaps), AI-powered automation builder, and tables database.", url: "https://zapier.com", pricing: "Freemium", featured: true, tags: [
      "automation",
      "integration",
      "workflows"
    ], logo: "⚡", rating: 4.7, users: "5M+"
  },
  { id: 49, name: "Make", category: "Productivity & Automation", description: "Visual automation platform (formerly Integromat) with advanced logic, data transformation, and unlimited API integrations.", url: "https://make.com", pricing: "Freemium", featured: false, tags: [
      "visual",
      "advanced",
      "api"
    ], logo: "🔗", rating: 4.8, users: "500K+"
  },
  { id: 50, name: "n8n", category: "Productivity & Automation", description: "Open-source workflow automation with self-hosting, code execution nodes, AI integrations, and fair-code license.", url: "https://n8n.io", pricing: "Open Source", featured: true, tags: [
      "open-source",
      "self-hosted",
      "code"
    ], logo: "🔄", rating: 4.9, users: "200K+"
  },
  { id: 51, name: "Notion", category: "Productivity & Automation", description: "All-in-one workspace with AI writing, databases, wikis, project management, and team collaboration features.", url: "https://notion.so", pricing: "Freemium", featured: false, tags: [
      "workspace",
      "database",
      "collaboration"
    ], logo: "📓", rating: 4.8, users: "100M+"
  },
  { id: 52, name: "ClickUp", category: "Productivity & Automation", description: "All-in-one project management with AI writing, task automation, docs, whiteboards, and time tracking.", url: "https://clickup.com", pricing: "Freemium", featured: false, tags: [
      "project-management",
      "ai-writing",
      "automation"
    ], logo: "☑️", rating: 4.7, users: "10M+"
  },
  { id: 53, name: "Motion", category: "Productivity & Automation", description: "AI-powered calendar and project manager that automatically schedules your tasks based on priorities and deadlines.", url: "https://usemotion.com", pricing: "Premium", featured: false, tags: [
      "calendar",
      "scheduling",
      "ai-planning"
    ], logo: "📅", rating: 4.8, users: "100K+"
  },
  { id: 54, name: "Reclaim.ai", category: "Productivity & Automation", description: "Smart calendar assistant that defends time for tasks, habits, meetings, and breaks using AI scheduling.", url: "https://reclaim.ai", pricing: "Freemium", featured: false, tags: [
      "calendar",
      "time-blocking",
      "habits"
    ], logo: "⏰", rating: 4.7, users: "200K+"
  },
  // VOICE & AUDIO
  { id: 55, name: "ElevenLabs", category: "Voice & Audio", description: "Industry-leading AI voice generation and cloning with 29 languages, voice design, and emotional control.", url: "https://elevenlabs.io", pricing: "Freemium", featured: true, tags: [
      "voice-cloning",
      "multilingual",
      "realistic"
    ], logo: "🎤", rating: 4.9, users: "5M+"
  },
  { id: 56, name: "Murf AI", category: "Voice & Audio", description: "AI voiceover studio with 120+ voices in 20 languages for videos, presentations, and audiobooks.", url: "https://murf.ai", pricing: "Freemium", featured: false, tags: [
      "voiceover",
      "studio",
      "professional"
    ], logo: "🎙️", rating: 4.7, users: "3M+"
  },
  { id: 57, name: "Play.ht", category: "Voice & Audio", description: "Realistic text-to-speech with voice cloning, ultra-realistic voices, and API for developers.", url: "https://play.ht", pricing: "Freemium", featured: false, tags: [
      "text-to-speech",
      "api",
      "realistic"
    ], logo: "▶️", rating: 4.6, users: "2M+"
  },
  { id: 58, name: "Otter.ai", category: "Voice & Audio", description: "AI meeting assistant with real-time transcription, meeting notes, action items, and calendar integration.", url: "https://otter.ai", pricing: "Freemium", featured: false, tags: [
      "transcription",
      "meetings",
      "notes"
    ], logo: "🦦", rating: 4.6, users: "10M+"
  },
  { id: 59, name: "Fireflies.ai", category: "Voice & Audio", description: "AI notetaker that records, transcribes, and summarizes meetings across Zoom, Teams, and Google Meet.", url: "https://fireflies.ai", pricing: "Freemium", featured: false, tags: [
      "meetings",
      "transcription",
      "integration"
    ], logo: "🔥", rating: 4.7, users: "300K+"
  },
  { id: 60, name: "Adobe Podcast", category: "Voice & Audio", description: "AI-powered audio recording and editing with speech enhancement, noise removal, and studio-quality sound.", url: "https://podcast.adobe.com", pricing: "Free", featured: false, tags: [
      "podcast",
      "enhancement",
      "adobe"
    ], logo: "🎙️", rating: 4.8, users: "2M+"
  },
  // MUSIC GENERATION
  { id: 61, name: "Suno AI", category: "Music Generation", description: "Create full songs with vocals and instrumentals from text prompts in any genre with v3.5 model.", url: "https://suno.ai", pricing: "Freemium", featured: true, tags: [
      "vocals",
      "full-songs",
      "any-genre"
    ], logo: "🎵", rating: 4.8, users: "10M+"
  },
  { id: 62, name: "Udio", category: "Music Generation", description: "AI music creation with high-quality audio, vocal generation, and extended song lengths up to 15 minutes.", url: "https://udio.com", pricing: "Freemium", featured: true, tags: [
      "quality",
      "vocals",
      "extended"
    ], logo: "🎶", rating: 4.7, users: "5M+"
  },
  { id: 63, name: "Soundraw", category: "Music Generation", description: "Royalty-free AI music generator with customizable mood, genre, length, and instruments for content creators.", url: "https://soundraw.io", pricing: "Premium", featured: false, tags: [
      "royalty-free",
      "customizable",
      "creators"
    ], logo: "🎼", rating: 4.6, users: "1M+"
  },
  { id: 64, name: "AIVA", category: "Music Generation", description: "AI composer for soundtracks with preset styles, fine control over composition, and commercial licensing.", url: "https://aiva.ai", pricing: "Freemium", featured: false, tags: [
      "soundtracks",
      "composition",
      "licensing"
    ], logo: "🎹", rating: 4.5, users: "500K+"
  },
  { id: 65, name: "Mubert", category: "Music Generation", description: "Real-time AI music generation for streaming, apps, and content with API access and mood-based creation.", url: "https://mubert.com", pricing: "Freemium", featured: false, tags: [
      "real-time",
      "streaming",
      "api"
    ], logo: "🔊", rating: 4.6, users: "3M+"
  },
  // RESEARCH & DATA
  { id: 66, name: "Elicit", category: "Research & Data", description: "AI research assistant that finds papers, extracts key findings, and synthesizes information across thousands of studies.", url: "https://elicit.com", pricing: "Freemium", featured: true, tags: [
      "research",
      "papers",
      "synthesis"
    ], logo: "📚", rating: 4.8, users: "1M+"
  },
  { id: 67, name: "Consensus", category: "Research & Data", description: "AI-powered academic search engine that extracts and aggregates findings from peer-reviewed research papers.", url: "https://consensus.app", pricing: "Freemium", featured: false, tags: [
      "academic",
      "peer-reviewed",
      "citations"
    ], logo: "🔬", rating: 4.7, users: "500K+"
  },
  { id: 68, name: "Scite", category: "Research & Data", description: "Smart citation tool that shows how papers have been cited and whether findings have been supported or contrasted.", url: "https://scite.ai", pricing: "Premium", featured: false, tags: [
      "citations",
      "context",
      "academic"
    ], logo: "📖", rating: 4.6, users: "300K+"
  },
  { id: 69, name: "Julius AI", category: "Research & Data", description: "AI data analyst that analyzes spreadsheets, creates visualizations, and answers questions about your data.", url: "https://julius.ai", pricing: "Freemium", featured: false, tags: [
      "data-analysis",
      "visualization",
      "spreadsheets"
    ], logo: "📊", rating: 4.7, users: "2M+"
  },
  // DESIGN & UI/UX
  { id: 70, name: "Figma AI", category: "Design & UI/UX", description: "AI-powered design tools within Figma for generating UI, renaming layers, and removing backgrounds automatically.", url: "https://figma.com", pricing: "Freemium", featured: true, tags: [
      "ui-design",
      "figma",
      "automation"
    ], logo: "🎨", rating: 4.8, users: "20M+"
  },
  { id: 71, name: "Framer AI", category: "Design & UI/UX", description: "AI website builder within Framer that generates complete responsive websites from text descriptions.", url: "https://framer.com", pricing: "Freemium", featured: false, tags: [
      "website",
      "no-code",
      "responsive"
    ], logo: "🖼️", rating: 4.7, users: "5M+"
  },
  { id: 72, name: "Galileo AI", category: "Design & UI/UX", description: "AI design tool that creates editable UI designs from text descriptions with production-ready Figma exports.", url: "https://galileo.ai", pricing: "Waitlist", featured: false, tags: [
      "ui-generation",
      "figma-export",
      "text-to-design"
    ], logo: "🚀", rating: 4.6, users: "100K+"
  },
  { id: 73, name: "Uizard", category: "Design & UI/UX", description: "AI-powered prototyping tool that converts sketches and screenshots into editable UI designs.", url: "https://uizard.io", pricing: "Freemium", featured: false, tags: [
      "prototyping",
      "sketch-to-design",
      "wireframes"
    ], logo: "✏️", rating: 4.5, users: "2M+"
  },
  { id: 74, name: "Relume", category: "Design & UI/UX", description: "AI website builder with component library that generates sitemap and wireframes from a single prompt.", url: "https://relume.io", pricing: "Premium", featured: false, tags: [
      "wireframes",
      "sitemap",
      "webflow"
    ], logo: "🔲", rating: 4.7, users: "50K+"
  },
  // MARKETING & SEO
  { id: 75, name: "SurferSEO", category: "Marketing & SEO", description: "AI-powered SEO tool with content editor, keyword research, SERP analyzer, and optimization recommendations.", url: "https://surferseo.com", pricing: "Premium", featured: true, tags: [
      "seo",
      "content",
      "optimization"
    ], logo: "🏄", rating: 4.7, users: "100K+"
  },
  { id: 76, name: "Semrush", category: "Marketing & SEO", description: "Comprehensive marketing toolkit with AI writing, keyword research, competitor analysis, and rank tracking.", url: "https://semrush.com", pricing: "Premium", featured: false, tags: [
      "marketing",
      "keywords",
      "analytics"
    ], logo: "📈", rating: 4.8, users: "10M+"
  },
  { id: 77, name: "Clearscope", category: "Marketing & SEO", description: "AI content optimization platform that helps create highly relevant SEO content with competitive analysis.", url: "https://clearscope.io", pricing: "Premium", featured: false, tags: [
      "content",
      "seo",
      "relevance"
    ], logo: "🔭", rating: 4.6, users: "50K+"
  },
  { id: 78, name: "MarketMuse", category: "Marketing & SEO", description: "AI-powered content strategy and optimization with topic modeling, competitive analysis, and content briefs.", url: "https://marketmuse.com", pricing: "Premium", featured: false, tags: [
      "strategy",
      "topics",
      "competitive"
    ], logo: "🎯", rating: 4.5, users: "30K+"
  },

  // GOOGLE AI PRODUCTS
  { id: 79, name: "Google Imagen 3", category: "Image Generation", description: "Google's most advanced text-to-image AI model with photorealistic output, superior text rendering, and style control.", url: "https://deepmind.google/technologies/imagen-3", pricing: "Freemium", featured: true, tags: [
      "google",
      "photorealistic",
      "text-rendering",
      "deepmind"
    ], logo: "🌈", rating: 4.8, users: "10M+"
  },
  { id: 80, name: "Google Veo", category: "Video Generation", description: "Google DeepMind's text-to-video model generating high-quality 1080p videos with cinematic effects and physics simulation.", url: "https://deepmind.google/technologies/veo", pricing: "Waitlist", featured: true, tags: [
      "google",
      "text-to-video",
      "1080p",
      "deepmind"
    ], logo: "🎬", rating: 4.7, users: "Waitlist"
  },
  { id: 81, name: "NotebookLM", category: "Research & Data", description: "Google's AI-powered research assistant that analyzes your documents, creates summaries, and generates audio overviews.", url: "https://notebooklm.google.com", pricing: "Free", featured: true, tags: [
      "google",
      "research",
      "documents",
      "audio-summaries"
    ], logo: "📓", rating: 4.9, users: "5M+"
  },
  { id: 82, name: "Google AI Studio", category: "Coding & Development", description: "Free web-based IDE for prototyping with Gemini models. Test prompts, tune models, and export code.", url: "https://aistudio.google.com", pricing: "Free", featured: false, tags: [
      "google",
      "developer",
      "prototyping",
      "gemini"
    ], logo: "🧪", rating: 4.6, users: "2M+"
  },
  { id: 83, name: "Vertex AI", category: "Coding & Development", description: "Google Cloud's enterprise ML platform with Gemini API, model training, AutoML, and production deployment.", url: "https://cloud.google.com/vertex-ai", pricing: "Premium", featured: false, tags: [
      "google",
      "enterprise",
      "ml-platform",
      "cloud"
    ], logo: "☁️", rating: 4.7, users: "500K+"
  },
  { id: 84, name: "Google Duet AI", category: "Productivity & Automation", description: "AI assistant integrated into Google Workspace for writing emails, creating presentations, and analyzing spreadsheets.", url: "https://workspace.google.com/solutions/ai", pricing: "Premium", featured: false, tags: [
      "google",
      "workspace",
      "gmail",
      "docs"
    ], logo: "📊", rating: 4.6, users: "10M+"
  },
  { id: 85, name: "MusicLM", category: "Music Generation", description: "Google's AI music generation model that creates high-fidelity music from text descriptions in any genre.", url: "https://aitestkitchen.withgoogle.com/tools/music-fx", pricing: "Free", featured: false, tags: [
      "google",
      "music",
      "text-to-music",
      "experimental"
    ], logo: "🎶", rating: 4.5, users: "1M+"
  },
  { id: 86, name: "Google Cloud Speech-to-Text", category: "Voice & Audio", description: "Enterprise-grade speech recognition supporting 125+ languages with real-time transcription and speaker diarization.", url: "https://cloud.google.com/speech-to-text", pricing: "Premium", featured: false, tags: [
      "google",
      "transcription",
      "enterprise",
      "multilingual"
    ], logo: "🎙️", rating: 4.7, users: "1M+"
  },
];

// Category definitions with icons
export const categories = [
  "All",
  "Chatbots & Assistants",
  "Writing & Content",
  "Image Generation",
  "Video Generation",
  "Coding & Development",
  "Productivity & Automation",
  "Voice & Audio",
  "Music Generation",
  "Research & Data",
  "Design & UI/UX",
  "Marketing & SEO",
];

// Pricing types
export const pricingTypes = [
  "All",
  "Free",
  "Freemium",
  "Premium",
  "Open Source"
];

// Export the data
export default aiToolsData;
export { aiToolsData };
