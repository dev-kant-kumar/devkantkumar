import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart2,
    CheckCircle2,
    ChevronDown,
    Clock,
    Edit3,
    Info,
    Keyboard,
    Play,
    RotateCcw,
    Share2,
    Trophy,
    Upload,
    Volume2,
    VolumeX,
    X,
    Zap
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Sample texts for Standard Mode with Difficulty Levels
const STANDARD_TEXTS = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Simple words are often the most powerful.",
    "Practice makes perfect in every endeavor.",
    "Focus on the present moment to find peace.",
    "A journey of a thousand miles begins with a single step."
  ],
  medium: [
    "Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. In the middle of difficulty lies opportunity.",
    "Believe you can and you're halfway there. To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail."
  ],
  hard: [
    "The inherent complexity of modern software systems necessitates a rigorous approach to architectural design and documentation to ensure scalability and maintainability.",
    "Synchronous communication protocols exhibit significant latency compared to asynchronous event-driven architectures in high-throughput distributed environments.",
    "The juxtaposition of traditional pedagogical methodologies with contemporary digital paradigms creates a unique challenge for modern educational institutions.",
    "Metacognitive strategies empower learners to monitor their own cognitive processes, thereby enhancing the efficacy of their information acquisition and retention.",
    "Quantum entanglement, a phenomenon where particles become interlinked such that the state of one instantly influences another regardless of distance, defies classical intuition.",
    "The anthropogenic impact on bio-diversity and atmospheric compositions has catalyzed a feedback loop with profound implications for planetary climate stability.",
    "Cryptographic primitives such as elliptic curve digital signature algorithms provide the foundational security layer for decentralized ledger technologies.",
    "Epistemological inquiries into the nature of artificial intelligence often oscillate between recursive functionalism and existential phenomenology."
  ]
};

// Sample code snippets for Developer Mode
const CODE_SNIPPETS = [
  {
    language: 'javascript',
    code: `const calculateWPM = (chars, time) => {
  const words = chars / 5;
  const minutes = time / 60;
  return Math.round(words / minutes);
};`
  },
  {
    language: 'python',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`
  },
  {
    language: 'css',
    code: `.container {
  display: flex;
  justify_content: center;
  align_items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff00cc, #333399);
}`
  }
];

const THEMES = {
  cyan: {
    bg: 'bg-slate-950',
    card: 'bg-slate-900/50',
    border: 'border-slate-800',
    text: 'text-slate-400',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500',
    accentBorder: 'border-cyan-500/30',
    cursor: 'bg-cyan-500/20',
    correct: 'text-green-400',
    wrong: 'text-red-400'
  },
  matrix: {
    bg: 'bg-black',
    card: 'bg-black border-green-900/50',
    border: 'border-green-900/50',
    text: 'text-green-900',
    accent: 'text-green-500',
    accentBg: 'bg-green-600',
    accentBorder: 'border-green-500/50',
    cursor: 'bg-green-500/30',
    correct: 'text-green-400',
    wrong: 'text-red-600'
  },
  synthwave: {
    bg: 'bg-[#0b0e2d]',
    card: 'bg-[#161b40]/50',
    border: 'border-pink-500/20',
    text: 'text-purple-300',
    accent: 'text-pink-500',
    accentBg: 'bg-pink-500',
    accentBorder: 'border-pink-500/50',
    cursor: 'bg-pink-500/20',
    correct: 'text-cyan-400',
    wrong: 'text-red-500'
  }
};

const TypingSpeedTest = () => {
  // State
  const [mode, setMode] = useState('standard'); // 'standard', 'developer'
  const [duration, setDuration] = useState(60);
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [stats, setStats] = useState(null);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [personalBest, setPersonalBest] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('cyan'); // 'cyan', 'matrix', 'synthwave'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [customText, setCustomText] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [charStats, setCharStats] = useState({}); // { char: { correct: 0, total: 0 } }
  const [keystrokeTimings, setKeystrokeTimings] = useState([]); // timestamps of each keystroke
  const [wordStats, setWordStats] = useState([]); // { word: string, wpm: number }
  const [showConfetti, setShowConfetti] = useState(false);

  // Arcade Mode State
  const [isArcadeMode, setIsArcadeMode] = useState(false);
  const [hp, setHp] = useState(100);
  const [maxHp, setMaxHp] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rankTitle, setRankTitle] = useState('Novice');

  const audioCtx = useRef(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playClick = (freq = 400, type = 'sine', duration = 0.05) => {
    if (!soundEnabled || !audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.current.currentTime + duration);

    gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.current.destination);

    osc.start();
    osc.stop(audioCtx.current.currentTime + duration);
  };

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const durationMenuRef = useRef(null);

  // Initialize test
  const startTest = useCallback(() => {
    let newText = '';
    if (mode === 'custom') {
      newText = customText || "Please provide custom text first.";
    } else if (mode === 'standard') {
      const texts = STANDARD_TEXTS[difficulty];
      newText = texts[Math.floor(Math.random() * texts.length)];
    } else {
      // Developer Mode
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      newText = snippet.code;
    }

    setText(newText);
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false); // Don't auto-start
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setStats(null);
    setWpmHistory([]);
    setCharStats({});
    setKeystrokeTimings([]);
    setWordStats([]);
    setShowConfetti(false);

    // Arcade Reset
    setHp(100);
    setMaxHp(100);
    setStreak(0);
    setIsGameOver(false);

    if (inputRef.current) {
        inputRef.current.disabled = true;
    }
  }, [mode, duration, difficulty, customText]);

  // Load personal best
  useEffect(() => {
    const savedStats = localStorage.getItem('typing_test_stats');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      const best = Math.max(...parsed.map(s => s.wpm), 0);
      setPersonalBest(best);
    }
  }, [isFinished]);

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (showCustomModal) return; // Ignore shortcuts when modal is open

      if (e.key === 'Escape') {
        startTest();
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        startTest();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [startTest, showCustomModal]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (durationMenuRef.current && !durationMenuRef.current.contains(event.target)) {
        setShowDurationMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    startTest();
  }, [startTest]);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          // Record WPM every second for chart
          const words = userInput.length / 5;
          const minutes = (duration - (prev - 1)) / 60;
          const currentWpm = minutes > 0 ? Math.round(words / minutes) : 0;
          setWpmHistory(prevHist => [...prevHist, currentWpm]);

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, userInput.length, duration]);

  // Arcade HP Drain & Game Over logic
  useEffect(() => {
    let drainInterval;
    if (isActive && isArcadeMode && hp > 0) {
      drainInterval = setInterval(() => {
        setHp(prev => {
          const drainRate = 1 + (level * 0.2); // HP drains faster at higher levels
          const newHp = Math.max(0, prev - drainRate);
          if (newHp === 0 && isActive) {
            endArcadeGame();
          }
          return newHp;
        });
      }, 500);
    }
    return () => clearInterval(drainInterval);
  }, [isActive, isArcadeMode, level, hp]);

  const endArcadeGame = () => {
    setIsActive(false);
    setIsGameOver(true);
    setIsFinished(true);
    clearInterval(timerRef.current);
    // Final stats will be calculated by the standard endTest if we want,
    // but arcade uses its own fail state.
  };

  // Calculate stats
  useEffect(() => {
    if (isActive && userInput.length > 0) {
      const minutes = (duration - timeLeft) / 60;
      if (minutes > 0) {
        // Net WPM = ((Total Characters / 5) - Errors) / Time
        const netWpm = Math.max(0, Math.round(((userInput.length / 5) - errors) / minutes));
        setWpm(netWpm);
      }
    }
  }, [userInput, timeLeft, duration, isActive, errors]);

  const endTest = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(true);

    // Final stats calculation
    const accuracyVal = calculateAccuracy(userInput, text);
    const minutes = (duration - timeLeft) / 60;
    // Net WPM = ((Total Characters / 5) - Errors) / Time
    const finalWpm = Math.max(0, Math.round(((userInput.length / 5) - errors) / Math.max(minutes, 0.01)));

    if (finalWpm > personalBest && finalWpm > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    }

    const result = {
      wpm: finalWpm,
      accuracy: accuracyVal,
      errors: errors,
      time: duration - timeLeft,
      mode: mode,
      date: new Date().toISOString(),
      wpmHistory: wpmHistory,
      charStats: charStats,
      wordStats: wordStats,
      consistency: calculateConsistency(keystrokeTimings),
      arcade: isArcadeMode ? { level, xp, rankTitle } : null
    };

    setStats(result);

    // Save to history
    const existingHistory = JSON.parse(localStorage.getItem('typing_test_stats') || '[]');
    localStorage.setItem('typing_test_stats', JSON.stringify([result, ...existingHistory].slice(0, 50)));
  };

  const calculateAccuracy = (input, target) => {
    if (input.length === 0) return 0;
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    return Math.round((correct / input.length) * 100);
  };

  const calculateConsistency = (timings) => {
    if (timings.length < 5) return 0;
    const intervals = [];
    for (let i = 1; i < timings.length; i++) {
        intervals.push(timings[i] - timings[i-1]);
    }
    const mean = intervals.reduce((a, b) => a + b) / intervals.length;
    const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    // Consistency score: 100 - (normalized stdDev)
    const score = Math.max(0, 100 - (stdDev / 3));
    return Math.round(score);
  };

  const addXp = (amount) => {
    setXp(prev => {
        const newXp = prev + amount;
        const nextLevelXp = level * 200;
        if (newXp >= nextLevelXp) {
            setLevel(l => l + 1);
            // Rank Title Logic
            const titles = ['Novice', 'Apprentice', 'Scribe', 'Typist', 'Wordsmith', 'Scholar', 'Technomancer', 'Grandmaster', 'Legend'];
            const titleIndex = Math.min(Math.floor((level + 1) / 3), titles.length - 1);
            setRankTitle(titles[titleIndex]);
            return newXp - nextLevelXp;
        }
        return newXp;
    });
  };

  const handleKeyDown = (e) => {
    // Block Delete and Backspace in hard mode
    if (difficulty === 'hard' && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
    }

    // Prevent navigating with arrows/home/end to keep cursor at the end
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    if (isFinished || !isActive) return;

    const value = e.target.value;

    // Force cursor to the end - if they tried to edit in the middle, value length might not change
    // but the content would. We only allow additions or Backspace (if not hard mode) at the end.
    if (inputRef.current) {
        const selectionStart = inputRef.current.selectionStart;
        if (selectionStart < value.length) {
            inputRef.current.setSelectionRange(value.length, value.length);
        }
    }

    const charIndex = userInput.length;
    const isError = value.length > userInput.length && value[charIndex] !== text[charIndex];

    if (soundEnabled && value.length > userInput.length) {
        initAudio();
        if (isError) {
            playClick(150, 'triangle', 0.1);
        } else {
            playClick(600 + Math.random() * 100, 'sine', 0.03);
        }
    }

    // Prevent typing if finished or longer than text
    if (value.length > text.length) return;

    setUserInput(value);

    // Calculate errors and track character stats
    let errorCount = 0;
    const newCharStats = { ...charStats };

    // We only track the latest typed character for stats to avoid double counting during edits
    if (value.length > userInput.length) {
        const index = value.length - 1;
        const targetChar = text[index];
        const typedChar = value[index];

        if (targetChar) {
            if (!newCharStats[targetChar]) newCharStats[targetChar] = { correct: 0, total: 0 };
            newCharStats[targetChar].total++;

            if (typedChar === targetChar) {
                newCharStats[targetChar].correct++;
                // Arcade: Heal and XP on success
                if (isArcadeMode && !isGameOver) {
                    setHp(prev => Math.min(maxHp, prev + 0.5));
                    addXp(1);
                    setStreak(s => s + 1);
                }
            } else {
                // Arcade: Damage and streak break on error
                if (isArcadeMode && !isGameOver) {
                    setHp(prev => Math.max(0, prev - 5));
                    setStreak(0);
                }
            }
        }
    }
    setCharStats(newCharStats);
    setKeystrokeTimings(prev => [...prev, Date.now()]);

    // Word tracking
    if (value.endsWith(' ') || value.length === text.length) {
        const wordsTyped = value.trim().split(/\s+/);
        const lastWord = wordsTyped[wordsTyped.length - 1];
        if (lastWord) {
            // Find timing for this word
            const wordLength = lastWord.length + 1; // +1 for the space
            const relevantTimings = keystrokeTimings.slice(-wordLength);
            if (relevantTimings.length >= 2) {
                const timeTaken = (relevantTimings[relevantTimings.length - 1] - relevantTimings[0]) / 1000 / 60; // in minutes
                if (timeTaken > 0) {
                    const wordWpm = Math.round((lastWord.length / 5) / timeTaken);
                    setWordStats(prev => [...prev, { word: lastWord, wpm: wordWpm }].slice(-20));

                    // Arcade Word Bonus: Heal more and bonus XP
                    if (isArcadeMode && !isGameOver) {
                        setHp(prev => Math.min(maxHp, prev + 5));
                        addXp(10);
                    }
                }
            }
        }
    }

    for (let i = 0; i < value.length; i++) {
        if (value[i] !== text[i]) {
            errorCount++;
        }
    }
    setErrors(errorCount);
    setAccuracy(calculateAccuracy(value, text));

    // Auto-finish if text completed
    if (value.length === text.length) {
      endTest();
    }
  };

  const handleStart = () => {
    setIsActive(true);
    if (inputRef.current) {
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }
  };

  // Render text with highlighting
  const renderText = () => {
    const activeTheme = THEMES[theme];
    return text.split('').map((char, index) => {
      let color = activeTheme.text;
      let bg = 'transparent';

      if (index < userInput.length) {
        const isCorrect = userInput[index] === char;
        color = isCorrect ? activeTheme.correct : activeTheme.wrong;
        bg = isCorrect ? 'transparent' : 'bg-red-500/10';
      } else if (index === userInput.length) {
        bg = isActive ? activeTheme.cursor : 'transparent';
        color = activeTheme.accent;
      }

      return (
        <span key={index} className={`${color} ${bg} font-mono transition-colors duration-75 ${theme === 'matrix' ? 'glow-green' : ''}`}>
          {char}
        </span>
      );
    });
  };

  const activeTheme = THEMES[theme];

  // SEO Data
  const seoTitle = isArcadeMode
    ? `Level ${level} ${rankTitle} | Typer Quest Survival Game`
    : "Typing Speed Test | Master Your WPM & Code Speed";
  const seoDesc = "Test your typing speed with professional analytics, developer-focused code practice, and a survival arcade mode. Track WPM, accuracy, and heatmaps.";

  return (
    <motion.div
        animate={isArcadeMode && streak === 0 && userInput.length > 0 ? {
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.2 }
        } : {}}
        className={`min-h-screen ${activeTheme.bg} py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}
    >
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="keywords" content="typing speed test, wpm test, developer typing practice, code typing, typing game, arcade typing, typing analytics, wpm tracker" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Typer Labs Typing Speed Test",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication, GameApplication",
            "description": seoDesc,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Real-time WPM tracking",
              "Accuracy analytics",
              "Developer code snippet mode",
              "Survival Arcade Mode",
              "Character-level heatmap"
            ]
          })}
        </script>
      </Helmet>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
            <div>
                <Link to="/tools" className={`flex items-center ${activeTheme.text} hover:${activeTheme.accent} mb-4 transition-colors`}>
                    <Keyboard className="mr-2" size={20} />
                    Back to Tools
                </Link>
                <h1 className={`text-4xl font-black text-white mb-2 tracking-tighter ${theme === 'matrix' ? 'glow-green' : ''}`}>
                    {isArcadeMode ? 'TYPER' : 'Typing Speed'} <span className={activeTheme.accent}>{isArcadeMode ? 'QUEST' : 'Test'}</span>
                </h1>
                <p className={`${activeTheme.text} font-medium`}>
                    {isArcadeMode
                        ? `Level ${level}: ${rankTitle} - Type to survive, heal on success.`
                        : 'Test your typing speed and accuracy with standard text or code snippets.'}
                </p>
            </div>
            <button
                onClick={() => setShowInfoModal(true)}
                className={`p-3 rounded-xl bg-slate-800/50 border ${activeTheme.border} ${activeTheme.text} hover:text-white hover:border-cyan-500/50 transition-all group mt-10 md:mt-0`}
                title="How to Play"
            >
                <Info size={20} className="group-hover:scale-110 transition-transform" />
            </button>
        </div>

        {/* Controls */}
        <div className={`${activeTheme.card} border ${activeTheme.border} rounded-2xl p-6 mb-8 shadow-xl transition-all duration-300`}>
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex bg-slate-800/50 rounded-lg p-1">
                    <button
                        onClick={() => { setMode('standard'); setIsActive(false); setUserInput(''); }}
                        className={`px-4 py-2 rounded-md transition-all ${mode === 'standard' ? `${activeTheme.accentBg} text-${theme === 'matrix' ? 'black' : 'white'}` : `${activeTheme.text} hover:text-white`}`}
                    >
                        Standard
                    </button>
                    <button
                        onClick={() => { setMode('developer'); setIsActive(false); setUserInput(''); }}
                        className={`px-4 py-2 rounded-md transition-all ${mode === 'developer' ? `${activeTheme.accentBg === 'bg-cyan-500' ? 'bg-purple-500' : activeTheme.accentBg} text-${theme === 'matrix' ? 'black' : 'white'}` : `${activeTheme.text} hover:text-white`}`}
                    >
                        Developer
                    </button>
                    <button
                        onClick={() => { setMode('custom'); setIsArcadeMode(false); setIsActive(false); setUserInput(''); setShowCustomModal(true); }}
                        className={`px-4 py-2 rounded-md transition-all ${mode === 'custom' && !isArcadeMode ? `${activeTheme.accentBg} text-${theme === 'matrix' ? 'black' : 'white'}` : `${activeTheme.text} hover:text-white`}`}
                    >
                        Custom
                    </button>
                    <button
                        onClick={() => { setIsArcadeMode(true); setMode('standard'); setIsActive(false); setUserInput(''); startTest(); }}
                        className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${isArcadeMode ? `bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]` : `${activeTheme.text} hover:text-white`}`}
                    >
                        Arcade
                        <span className="text-[8px] bg-black/20 px-1 rounded border border-white/10">SURVIVAL</span>
                    </button>
                </div>

                <div className="flex bg-slate-800/50 rounded-lg p-1">
                    {['cyan', 'matrix', 'synthwave'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${theme === t ?
                                (t === 'cyan' ? 'bg-cyan-500 text-white' : t === 'matrix' ? 'bg-green-500 text-black' : 'bg-pink-500 text-white') :
                                'text-slate-500 hover:text-white'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {mode === 'standard' && (
                    <div className="flex bg-slate-800/50 rounded-lg p-1">
                        {['easy', 'medium', 'hard'].map((d) => (
                            <button
                                key={d}
                                onClick={() => { setDifficulty(d); setIsActive(false); setUserInput(''); }}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${difficulty === d ?
                                    (theme === 'matrix' ? 'bg-green-500 text-black' : activeTheme.accentBg + ' text-white') :
                                    'text-slate-500 hover:text-white'}`}
                            >
                                {d}
                                {d === 'hard' && <span className="text-[7px] opacity-70">STRICT</span>}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex bg-slate-800/50 rounded-lg p-1">
                    <button
                        onClick={() => { initAudio(); setSoundEnabled(!soundEnabled); }}
                        className={`p-2 rounded-md transition-all ${soundEnabled ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
                        title={soundEnabled ? 'Sound On' : 'Sound Off'}
                    >
                        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                    <button
                        onClick={() => setIsDyslexicFont(!isDyslexicFont)}
                        className={`p-2 rounded-md transition-all ${isDyslexicFont ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
                        title="Dyslexia Friendly Font"
                    >
                        <span className="text-sm font-bold w-4 h-4 flex items-center justify-center">Ab</span>
                    </button>
                </div>

                {mode === 'custom' && (
                    <button
                        onClick={() => setShowCustomModal(true)}
                        className={`flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${activeTheme.text} hover:text-white transition-all`}
                    >
                        <Edit3 size={14} />
                        Edit Custom Text
                    </button>
                )}

                <div className="relative" ref={durationMenuRef}>
                    <button
                        onClick={() => !isActive && setShowDurationMenu(!showDurationMenu)}
                        disabled={isActive || userInput.length > 0}
                        className={`flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-transparent hover:${activeTheme.border} transition-all ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <Clock size={16} className={activeTheme.text} />
                        <span className="text-white font-medium min-w-[30px]">{duration}s</span>
                        <ChevronDown size={14} className={`${activeTheme.text} transition-transform ${showDurationMenu ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showDurationMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className={`${activeTheme.card} border ${activeTheme.border} backdrop-blur-md absolute top-full left-0 mt-2 w-32 rounded-xl shadow-xl overflow-hidden z-50`}
                            >
                                {[15, 30, 60, 120].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setDuration(time);
                                            setTimeLeft(time);
                                            setShowDurationMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-slate-800/50 transition-colors ${duration === time ? activeTheme.accent : activeTheme.text}`}
                                    >
                                        <span>{time}s</span>
                                        {duration === time && <CheckCircle2 size={14} />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Test Progress Bar */}
            {isActive && !isArcadeMode && (
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-6">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(userInput.length / text.length) * 100}%` }}
                        className={`h-full ${activeTheme.accentBg} shadow-[0_0_10px_rgba(6,182,212,0.5)]`}
                    />
                </div>
            )}

            {/* Arcade HUD */}
            {isArcadeMode && isActive && (
                <div className="mb-8 space-y-4">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 font-bold text-xs uppercase tracking-tighter">HP</span>
                            <div className="w-48 h-3 bg-slate-800 rounded-full overflow-hidden border border-red-500/20">
                                <motion.div
                                    animate={{ width: `${hp}%` }}
                                    className={`h-full ${hp < 30 ? 'bg-red-600 animate-pulse' : 'bg-red-500'} shadow-[0_0_10px_rgba(239,68,68,0.3)]`}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">XP</span>
                            <div className="w-48 h-3 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/20">
                                <motion.div
                                    animate={{ width: `${(xp / (level * 200)) * 100}%` }}
                                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-red-500/80">{Math.round(hp)} / {maxHp}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-500">Rank: <span className="text-white">{rankTitle}</span></span>
                            <span className="text-cyan-500">Level {level}</span>
                        </div>
                    </div>
                    {streak > 5 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                        >
                            <span className="text-orange-500 font-black italic text-xl drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">
                                {streak} STREAK!
                            </span>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {[
                    { label: 'WPM', value: wpm, color: activeTheme.accent },
                    { label: 'Accuracy', value: `${accuracy}%`, color: activeTheme.correct },
                    { label: 'Time Left', value: `${timeLeft}s`, color: 'text-orange-400' },
                    { label: 'Errors', value: errors, color: activeTheme.wrong },
                    { label: 'Best', value: `${personalBest} WPM`, color: 'text-amber-400', icon: Trophy }
                ].map((stat, i) => (
                    <div key={i} className={`bg-slate-800/30 p-4 rounded-xl border ${activeTheme.border} ${i === 4 ? 'hidden lg:block' : ''}`}>
                        <div className={`${activeTheme.text} text-xs mb-1 flex items-center gap-1`}>
                            {stat.icon && <stat.icon size={12} />}
                            {stat.label}
                        </div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Typing Area */}
            {!isFinished ? (
                 <div
                    className={`relative ${activeTheme.bg === 'bg-black' ? 'bg-black' : activeTheme.card} border ${activeTheme.border} rounded-xl p-6 min-h-[200px] ${isDyslexicFont ? 'font-sans font-bold text-xl tracking-wide' : 'font-mono text-lg'} leading-relaxed cursor-text group transition-all duration-300`}
                    onClick={() => {
                        if (isActive && inputRef.current) inputRef.current.focus();
                    }}
                >
                    {/* Strict Mode Badge */}
                    {difficulty === 'hard' && (
                        <div className="absolute top-2 right-4 flex items-center gap-1.5 pointer-events-none">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/80 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">Strict Mode</span>
                        </div>
                    )}

                    <textarea
                        ref={inputRef}
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={!isActive}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none disabled:cursor-not-allowed"
                        spellCheck="false"
                    />

                    {/* Blur overlay when not active */}
                    {!isActive && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl">
                            <button
                                onClick={() => { initAudio(); handleStart(); }}
                                className={`group/btn relative px-8 py-4 ${activeTheme.accentBg} ${theme === 'matrix' ? 'text-black' : 'text-white'} font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-3`}
                            >
                        <Play fill="currentColor" size={24} />
                                <span className="text-xl">{isArcadeMode ? 'Start Survival Game' : 'Start Typing Test'}</span>
                            </button>
                        </div>
                    )}

                    {isGameOver && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 rounded-xl backdrop-blur-sm border-2 border-red-500/50">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center p-8"
                            >
                                <span className="block text-6xl font-black text-red-600 mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">YOU FAILED</span>
                                <p className="text-red-400 font-bold tracking-widest uppercase mb-8">System Overload: HP Reached Zero</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={startTest}
                                        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                                    >
                                        <RotateCcw size={20} />
                                        REBOOT SYSTEM
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    <div className={`whitespace-pre-wrap break-words pointer-events-none transition-opacity duration-300 ${(!isActive || isGameOver) ? 'opacity-30' : 'opacity-100'}`}>
                        {renderText()}
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6">
                        {isArcadeMode ? <Play size={32} className="text-white" /> : <Trophy size={32} className="text-white" />}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{isArcadeMode ? 'Challenge Summary' : 'Test Complete!'}</h2>
                    <p className="text-slate-400 mb-8">{isArcadeMode ? `Final Rank: ${rankTitle}` : 'Great job! Here are your results:'}</p>

                    {isArcadeMode && (
                        <div className="max-w-md mx-auto mb-8 bg-black/20 p-6 rounded-xl border border-cyan-500/20">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-cyan-400 font-black italic tracking-tighter">LEVEL {level}</span>
                                <span className="text-slate-500 text-xs font-bold">{rankTitle}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(xp / (level * 200)) * 100}%` }}
                                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                />
                            </div>
                        </div>
                    )}

                    {showConfetti && (
                        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                            {[...Array(50)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        top: '100%',
                                        left: `${Math.random() * 100}%`,
                                        rotate: 0,
                                        scale: 0
                                    }}
                                    animate={{
                                        top: '-10%',
                                        left: `${Math.random() * 100}%`,
                                        rotate: 360 * 2,
                                        scale: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        delay: Math.random() * 2,
                                        ease: "easeOut"
                                    }}
                                    className={`absolute w-3 h-3 rounded-sm ${['bg-cyan-400', 'bg-pink-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'][Math.floor(Math.random() * 5)]}`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                        <div className={`bg-black/20 p-4 rounded-xl border ${activeTheme.accentBorder}`}>
                            <div className={`${activeTheme.accent} text-xs font-medium mb-1 uppercase tracking-wider`}>WPM</div>
                            <div className="text-3xl font-bold text-white">{stats?.wpm}</div>
                        </div>
                        <div className={`bg-black/20 p-4 rounded-xl border border-green-500/30`}>
                            <div className={`${activeTheme.correct} text-xs font-medium mb-1 uppercase tracking-wider`}>Accuracy</div>
                            <div className="text-3xl font-bold text-white">{stats?.accuracy}%</div>
                        </div>
                        <div className={`bg-black/20 p-4 rounded-xl border border-purple-500/30`}>
                            <div className={`${activeTheme.wrong} text-xs font-medium mb-1 uppercase tracking-wider`}>Errors</div>
                            <div className="text-3xl font-bold text-white">{stats?.errors}</div>
                        </div>
                        <div className={`bg-black/20 p-4 rounded-xl border border-orange-500/30`}>
                            <div className="text-orange-400 text-xs font-medium mb-1 uppercase tracking-wider">Consistency</div>
                            <div className="text-3xl font-bold text-white">{stats?.consistency}%</div>
                        </div>
                    </div>

                    {/* WPM Trend Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                        {stats?.wpmHistory?.length > 0 && (
                            <div className={`bg-black/20 rounded-xl p-6 border ${activeTheme.border}`}>
                                <div className={`${activeTheme.text} text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-between`}>
                                    <span>WPM Trend</span>
                                    <Clock size={12} className="opacity-50" />
                                </div>
                                <div className="h-32 flex items-end gap-1 px-2">
                                    {stats.wpmHistory.map((w, i) => {
                                        const height = Math.min((w / (Math.max(...stats.wpmHistory, 1) * 1.2)) * 100, 100);
                                        return (
                                            <div
                                                key={i}
                                                className={`flex-1 ${activeTheme.accentBg} opacity-40 rounded-t-sm transition-all duration-500 hover:opacity-100`}
                                                style={{ height: `${height}%` }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Character Heatmap */}
                        {stats?.charStats && Object.keys(stats.charStats).length > 0 && (
                            <div className={`bg-black/20 rounded-xl p-6 border ${activeTheme.border}`}>
                                <div className={`${activeTheme.text} text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-between`}>
                                    <span>Worst Characters</span>
                                    <Zap size={12} className="opacity-50" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(stats.charStats)
                                        .filter(([_, data]) => data.total > 1) // Only show keys typed more than once
                                        .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)) // Sort by accuracy asc
                                        .slice(0, 10)
                                        .map(([char, data], i) => {
                                            const accuracy = (data.correct / data.total) * 100;
                                            return (
                                                <div key={i} className="flex flex-col items-center bg-slate-900/50 border border-slate-800 rounded-lg py-2 px-3 min-w-[45px]">
                                                    <span className="text-white font-bold text-lg leading-none mb-1">{char === ' ' ? '␣' : char}</span>
                                                    <span className={`text-[10px] font-bold ${accuracy < 70 ? 'text-red-400' : accuracy < 90 ? 'text-orange-400' : 'text-green-400'}`}>
                                                        {Math.round(accuracy)}%
                                                    </span>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                         {/* Fastest/Slowest Words */}
                         {stats?.wordStats?.length > 0 && (
                            <div className={`bg-black/20 rounded-xl p-6 border ${activeTheme.border}`}>
                                <div className={`${activeTheme.text} text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-between`}>
                                    <span>Word-Specific Speed</span>
                                    <Trophy size={12} className="opacity-50" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-green-400 font-bold uppercase">Fastest</span>
                                        <span className="text-red-400 font-bold uppercase">Slowest</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            {stats.wordStats
                                                .sort((a, b) => b.wpm - a.wpm)
                                                .slice(0, 3)
                                                .map((ws, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5">
                                                        <span className="text-white text-sm font-medium truncate max-w-[80px]">{ws.word}</span>
                                                        <span className="text-green-400 font-bold text-xs">{ws.wpm} <span className="text-[8px] opacity-60">WPM</span></span>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {stats.wordStats
                                                .sort((a, b) => a.wpm - b.wpm)
                                                .slice(0, 3)
                                                .map((ws, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5">
                                                        <span className="text-white text-sm font-medium truncate max-w-[80px]">{ws.word}</span>
                                                        <span className="text-red-400 font-bold text-xs">{ws.wpm} <span className="text-[8px] opacity-60">WPM</span></span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Consistency Visualization */}
                        <div className={`bg-black/20 rounded-xl p-6 border ${activeTheme.border}`}>
                            <div className={`${activeTheme.text} text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-between`}>
                                <span>Typing Consistency</span>
                                <BarChart2 size={12} className="opacity-50" />
                            </div>
                            <div className="flex flex-col items-center justify-center h-24">
                                <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats?.consistency}%` }}
                                        className={`h-full bg-gradient-to-r from-orange-500 to-green-500`}
                                    />
                                </div>
                                <p className="text-slate-400 text-xs text-center leading-relaxed">
                                    {stats?.consistency > 85 ? "Rock solid! Your typing rhythm is very consistent." :
                                     stats?.consistency > 60 ? "Good pace. Try to avoid sudden bursts and pauses." :
                                     "Your rhythm is uneven. Focus on a steady flow for better long-term speed."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-12">
                        <button
                            onClick={startTest}
                            className={`flex items-center px-6 py-3 ${activeTheme.accentBg} ${theme === 'matrix' ? 'text-black' : 'text-white'} font-medium rounded-xl transition-all hover:scale-105 active:scale-95`}
                        >
                            <RotateCcw size={18} className="mr-2" />
                            Try Again
                        </button>
                        <button
                            onClick={() => {
                                const tweetText = `I just reached ${stats.wpm} WPM with ${stats.accuracy}% accuracy on this Typing Speed Test! 🚀 Check it out:`;
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                            }}
                            className={`flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all hover:scale-105 active:scale-95`}
                        >
                            <Share2 size={18} className="mr-2" />
                            Share Result
                        </button>
                    </div>

                    {/* Recent History */}
                    {JSON.parse(localStorage.getItem('typing_test_stats') || '[]').length > 1 && (
                        <div className="max-w-2xl mx-auto text-left">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <BarChart2 size={18} className="text-cyan-400" />
                                    Recent History
                                </h3>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('typing_test_stats');
                                        setStats(prev => ({...prev}));
                                    }}
                                    className="text-[10px] text-slate-500 hover:text-red-400 transition-colors uppercase font-bold tracking-wider"
                                >
                                    Clear History
                                </button>
                            </div>
                            <div className="space-y-2">
                                {JSON.parse(localStorage.getItem('typing_test_stats') || '[]').slice(0, 5).map((h, i) => (
                                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-xs text-slate-500">{new Date(h.date).toLocaleDateString()}</div>
                                            <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${h.mode === 'developer' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                                {h.mode}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 text-sm font-bold text-white">
                                                <Zap size={12} className="text-cyan-400" />
                                                {h.wpm} WPM
                                            </div>
                                            <div className="flex items-center gap-1 text-sm font-bold text-green-400">
                                                <CheckCircle2 size={12} />
                                                {h.accuracy}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>

        {/* Custom Text Modal */}
        <AnimatePresence>
            {showCustomModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCustomModal(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`${activeTheme.card} border ${activeTheme.border} w-full max-w-2xl rounded-2xl p-6 shadow-2xl z-10 relative`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Edit3 className={activeTheme.accent} size={20} />
                                Custom Typing Text
                            </h2>
                            <button
                                onClick={() => setShowCustomModal(false)}
                                className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className={`block text-xs font-bold uppercase tracking-wider ${activeTheme.text} mb-2`}>
                                Paste your text here
                            </label>
                            <textarea
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                placeholder="Start typing or paste your content..."
                                className="w-full h-48 bg-black/40 border border-slate-800 rounded-xl p-4 text-white font-mono text-sm focus:border-cyan-500/50 outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".txt"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                setCustomText(event.target.result);
                                            };
                                            reader.readAsText(file);
                                        }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-all">
                                    <Upload size={16} />
                                    Upload .txt file
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => { setCustomText(''); }}
                                    className="px-4 py-2 text-slate-500 hover:text-red-400 text-sm font-bold transition-all"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => {
                                        setShowCustomModal(false);
                                        startTest();
                                    }}
                                    disabled={!customText.trim()}
                                    className={`px-6 py-2 ${activeTheme.accentBg} ${theme === 'matrix' ? 'text-black' : 'text-white'} font-bold rounded-lg text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Save & Start
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Info Modal */}
        <AnimatePresence>
            {showInfoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowInfoModal(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`${activeTheme.card} border ${activeTheme.border} w-full max-w-3xl rounded-3xl p-8 shadow-2xl z-10 relative overflow-y-auto max-h-[90vh]`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
                                <Info className={activeTheme.accent} size={32} />
                                HOW TO PLAY
                            </h2>
                            <button
                                onClick={() => setShowInfoModal(false)}
                                className="text-slate-500 hover:text-white p-2 rounded-xl transition-colors bg-slate-800/30"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Arcade Mode Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <Zap className="text-red-500" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Arcade Mode (Survival)</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/20 p-4 rounded-2xl border border-slate-800">
                                        <h4 className="text-red-400 font-bold text-xs uppercase mb-2">HP & Damage</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Your HP drains constantly. Correct characters heal you slightly, while completing words gives a massive boost. Errors deal <span className="text-red-500 font-bold">immediate damage</span>.
                                        </p>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-2xl border border-slate-800">
                                        <h4 className="text-cyan-400 font-bold text-xs uppercase mb-2">XP & Ranks</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Earn XP to level up. Higher levels make the HP drain faster but grant more prestigious rank titles (Novice to Legend).
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Difficulties Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <Trophy className="text-amber-500" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Difficulty Tiers</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Easy', desc: 'Common words, no numbers or complex symbols.' },
                                        { label: 'Medium', desc: 'Standard dictionary with moderate punctuation.' },
                                        { label: 'Hard (Strict)', desc: 'Complex texts. Backspace & Delete are DISABLED. Accuracy is mandatory.' }
                                    ].map((tier, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-slate-800">
                                            <span className={`w-24 text-center font-black uppercase text-[10px] px-2 py-1 rounded-full ${i === 2 ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-400'}`}>
                                                {tier.label}
                                            </span>
                                            <p className="text-slate-400 text-sm">{tier.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Analytics Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        <BarChart2 className="text-green-500" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Performance Analytics</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-black/20 p-4 rounded-2xl border border-slate-800">
                                        <h4 className="text-white font-bold text-xs mb-1">Heatmap</h4>
                                        <p className="text-slate-500 text-[11px]">Identifies which keys you struggle with most.</p>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-2xl border border-slate-800">
                                        <h4 className="text-white font-bold text-xs mb-1">Consistency</h4>
                                        <p className="text-slate-500 text-[11px]">Measures the rhythm & stability of your typing.</p>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-2xl border border-slate-800">
                                        <h4 className="text-white font-bold text-xs mb-1">Net WPM</h4>
                                        <p className="text-slate-500 text-[11px]">Calculated as (Typed Characters / 5) - Errors.</p>
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className={`px-8 py-4 ${activeTheme.accentBg} ${theme === 'matrix' ? 'text-black' : 'text-white'} font-black rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20`}
                                >
                                    GOT IT, LET'S TYPE!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TypingSpeedTest;
