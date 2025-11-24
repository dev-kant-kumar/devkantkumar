import { Brain, CheckCircle, ChevronLeft, ChevronRight, Code, Download, Instagram, Rocket, Terminal, Zap } from 'lucide-react';
import { useState } from 'react';

const AntigravityCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      gradient: 'from-purple-900 via-blue-900 to-indigo-900',
      icon: Zap,
      title: 'Google Antigravity',
      subtitle: 'The Future of AI Coding',
      description: 'Google\'s revolutionary AI-powered code editor that writes, tests, and validates code autonomously',
      accentColor: 'text-yellow-400',
      iconBg: 'bg-yellow-400/20',
      iconColor: 'text-yellow-400'
    },
    {
      gradient: 'from-cyan-900 via-blue-900 to-purple-900',
      icon: Brain,
      title: 'Powered by Gemini 3',
      subtitle: 'Next-Gen AI Intelligence',
      description: 'Advanced multi-model AI agents that understand context and build complete applications end-to-end',
      accentColor: 'text-cyan-400',
      iconBg: 'bg-cyan-400/20',
      iconColor: 'text-cyan-400'
    },
    {
      gradient: 'from-pink-900 via-purple-900 to-indigo-900',
      icon: Rocket,
      title: 'Autonomous Agents',
      subtitle: 'Code While You Sleep',
      description: 'AI agents work across editor, terminal, and browser simultaneously - like having 10 developers',
      accentColor: 'text-pink-400',
      iconBg: 'bg-pink-400/20',
      iconColor: 'text-pink-400'
    },
    {
      gradient: 'from-emerald-900 via-teal-900 to-cyan-900',
      icon: CheckCircle,
      title: 'Key Features',
      subtitle: 'Everything You Need',
      features: [
        'Multi-agent task management',
        'Real-time code validation',
        'Integrated browser testing',
        'Support for all languages',
        'Free with generous limits'
      ],
      accentColor: 'text-emerald-400',
      iconBg: 'bg-emerald-400/20',
      iconColor: 'text-emerald-400'
    },
    {
      gradient: 'from-orange-900 via-red-900 to-pink-900',
      icon: Code,
      title: 'Antigravity vs Others',
      subtitle: 'Clear Winner',
      comparison: [
        { name: 'Antigravity', price: 'FREE', agents: 'Yes' },
        { name: 'Cursor', price: '$20/mo', agents: 'Limited' },
        { name: 'Copilot', price: '$10/mo', agents: 'No' }
      ],
      accentColor: 'text-orange-400',
      iconBg: 'bg-orange-400/20',
      iconColor: 'text-orange-400'
    },
    {
      gradient: 'from-blue-900 via-indigo-900 to-purple-900',
      icon: Download,
      title: 'Get Started Today',
      subtitle: 'Download & Install',
      steps: [
        'Visit antigravity.google',
        'Download for your OS',
        'Install & launch',
        'Start building with AI'
      ],
      accentColor: 'text-blue-400',
      iconBg: 'bg-blue-400/20',
      iconColor: 'text-blue-400'
    },
    {
      gradient: 'from-violet-900 via-purple-900 to-fuchsia-900',
      icon: Terminal,
      title: 'Ready to Code?',
      subtitle: 'Join the AI Revolution',
      description: 'Transform your development workflow with autonomous AI agents. Build faster, smarter, better.',
      cta: true,
      accentColor: 'text-violet-400',
      iconBg: 'bg-violet-400/20',
      iconColor: 'text-violet-400'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="flex items-center gap-6">
        {/* Left Arrow - Outside */}
        <button
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Main Carousel Slide */}
        <div className="w-[1080px] h-[1080px] relative overflow-hidden rounded-3xl shadow-2xl">
          <div
            className={`w-full h-full bg-gradient-to-br ${currentSlideData.gradient} p-16 flex flex-col justify-between relative`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Google Antigravity Logo at Top */}
            <div className="relative z-10 flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-3xl">A</span>
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">Google Antigravity</h3>
                <p className="text-white/60 text-sm">AI Code Editor</p>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {/* Icon */}
              <div className={`${currentSlideData.iconBg} w-32 h-32 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10`}>
                <Icon className={`w-16 h-16 ${currentSlideData.iconColor}`} />
              </div>

              {/* Title */}
              <h1 className={`text-6xl font-black mb-4 ${currentSlideData.accentColor} tracking-tight leading-tight`}>
                {currentSlideData.title}
              </h1>
              <p className="text-white/80 text-3xl font-semibold mb-8">
                {currentSlideData.subtitle}
              </p>

              {/* Description or Features */}
              {currentSlideData.description && (
                <p className="text-white/70 text-2xl leading-relaxed max-w-3xl">
                  {currentSlideData.description}
                </p>
              )}

              {currentSlideData.features && (
                <div className="space-y-5">
                  {currentSlideData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${currentSlideData.accentColor.replace('text-', 'bg-')}`}></div>
                      <span className="text-white/80 text-2xl">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentSlideData.comparison && (
                <div className="space-y-4">
                  {currentSlideData.comparison.map((item, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-3xl">{item.name}</span>
                        <div className="text-right">
                          <div className={`${idx === 0 ? currentSlideData.accentColor : 'text-white/60'} font-bold text-2xl`}>
                            {item.price}
                          </div>
                          <div className="text-white/50 text-xl">Agents: {item.agents}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentSlideData.steps && (
                <div className="space-y-5">
                  {currentSlideData.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-5">
                      <div className={`${currentSlideData.iconBg} ${currentSlideData.accentColor} w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl flex-shrink-0`}>
                        {idx + 1}
                      </div>
                      <span className="text-white/80 text-2xl pt-2">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentSlideData.cta && (
                <div className="mt-12">
                  <div className={`${currentSlideData.iconBg} backdrop-blur-sm rounded-3xl p-10 border border-white/20`}>
                    <p className="text-white/90 text-center text-3xl font-semibold">
                      Follow for more AI coding tips! 🚀
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Instagram ID */}
            <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Instagram className="w-9 h-9 text-white" />
                </div>
                <span className="text-white font-bold text-2xl">@devkantkumar.in</span>
              </div>
              <div className="text-white/40 text-xl font-medium">
                {currentSlide + 1}/{slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow - Outside */}
        <button
          onClick={nextSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default AntigravityCarousel;
