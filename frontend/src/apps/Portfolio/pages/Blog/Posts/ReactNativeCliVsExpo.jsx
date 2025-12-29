import { SiExpo, SiReact } from "@icons-pack/react-simple-icons";
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Calendar,
    Check,
    Clock,
    Copy,
    GitBranch,
    Lightbulb,
    RefreshCw,
    Rocket,
    Server,
    Settings,
    Shield,
    Sparkles,
    Tag,
    Terminal,
    User,
    Zap
} from "lucide-react";
import React from "react";

// Card Image for Blog Listing Grid
function ReactNativeCliVsExpoCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0B1120] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800/60 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {/* Content */}
      <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-500 flex flex-col items-center">
        {/* Icons Row */}
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 shadow-xl flex items-center justify-center group-hover:shadow-cyan-500/20 transition-all">
            <SiReact size={24} className="text-cyan-400 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <span className="text-slate-500 font-bold text-lg">vs</span>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-white border border-gray-200/50 shadow-xl flex items-center justify-center transition-all">
            <SiExpo size={24} className="text-black" />
          </div>
        </div>
        <span className="font-bold text-slate-200 tracking-wide text-sm group-hover:text-indigo-300 transition-colors">CLI vs EXPO</span>
      </div>
    </div>
  );
}

// Simple thumbnail for other uses
function ReactNativeCliVsExpoThumbnail({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20" />
      <div className="relative z-10 flex items-center gap-3">
        <SiReact size={20} className="text-cyan-400" />
        <span className="text-slate-500 font-bold">vs</span>
        <SiExpo size={20} className="text-white" />
      </div>
    </div>
  );
}

export const info = {
  slug: "react-native-cli-vs-expo-2025",
  title: "React Native CLI vs Expo in 2025: The Final Verdict",
  description:
    "Stop wondering which tool to use. In 2025, the choice between React Native CLI and Expo has changed dramatically. Here is everything you need to know.",
  category: "React Native",
  publishDate: "2025-12-29",
  tags: ["React Native", "Expo", "Mobile", "2025 Guide"],
  readingTime: "12 min read",
  featured: true,
};

function FeaturedImage({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 relative overflow-hidden min-h-[450px] ${className}`}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_50%,transparent_100%)] opacity-40" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/60 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 6}%`,
              top: `${20 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-16 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/60 border border-indigo-500/40 backdrop-blur-xl mb-10 shadow-lg shadow-indigo-500/10">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-indigo-200 text-sm font-semibold">
            Updated for 2025
          </span>
        </div>

        {/* Icons - Improved Design */}
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-10">
          {/* React Native CLI Icon */}
          <div className="group flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl group-hover:bg-cyan-500/50 transition-all duration-500" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/40 flex items-center justify-center shadow-2xl shadow-cyan-500/20 group-hover:border-cyan-400/60 group-hover:scale-105 transition-all duration-300">
                <SiReact size={44} className="text-cyan-400 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold font-mono tracking-wider">CLI</span>
            </div>
          </div>

          {/* VS Badge */}
          <div className="relative px-4 py-2">
            <div className="absolute inset-0 bg-slate-700/30 rounded-xl blur-lg" />
            <span className="relative text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-600">VS</span>
          </div>

          {/* Expo Icon */}
          <div className="group flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all duration-500" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-white border border-gray-200/50 flex items-center justify-center shadow-2xl shadow-violet-500/10 group-hover:scale-105 transition-all duration-300">
                <SiExpo size={44} className="text-black" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Rocket size={14} className="text-violet-400" />
              <span className="text-violet-300 text-sm font-bold font-mono tracking-wider">EXPO</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-5">
          <span className="text-white drop-shadow-lg">React Native CLI </span>
          <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
            vs Expo
          </span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The debate is over. Here's why the landscape has shifted and what you
          should choose for your next big project.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <span className="text-slate-400 text-xs">Read Time</span>
            <div className="text-white font-bold">12 min</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <span className="text-slate-400 text-xs">Last Updated</span>
            <div className="text-white font-bold">Dec 2025</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm">
            <span className="text-indigo-300 text-xs">Verdict</span>
            <div className="text-indigo-200 font-bold">Expo Wins</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const features = [
    { name: "Setup Time", cli: "Moderate (Hours)", expo: "Instant (Minutes)" },
    {
      name: "Native Code Access",
      cli: "Direct",
      expo: "Via Config Plugins (CNG)",
    },
    {
      name: "OTA Updates",
      cli: "Manual (CodePush)",
      expo: "Built-in (EAS Update)",
    },
    {
      name: "Build Service",
      cli: "Self-hosted / CI",
      expo: "EAS Build (Cloud)",
    },
    {
      name: "Maintenance",
      cli: "High (Manual Upgrades)",
      expo: "Low (Automated)",
    },
    {
      name: "Ecosystem",
      cli: "All RN Libraries",
      expo: "All RN Libraries (+ Expo SDK)",
    },
  ];

  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-slate-700/50 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/50 text-slate-200">
            <th className="p-4 border-b border-slate-700 font-semibold">
              Feature
            </th>
            <th className="p-4 border-b border-slate-700 font-mono text-blue-400">
              React Native CLI
            </th>
            <th className="p-4 border-b border-slate-700 font-mono text-indigo-400">
              Expo (2025)
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-300 text-sm">
          {features.map((feature, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-slate-900/30" : "bg-transparent"}
            >
              <td className="p-4 border-b border-slate-800/50 font-medium">
                {feature.name}
              </td>
              <td className="p-4 border-b border-slate-800/50">
                {feature.cli}
              </td>
              <td className="p-4 border-b border-slate-800/50 font-semibold text-indigo-200">
                {feature.expo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Enhanced code block with better styling
function CodeBlock({ language = "jsx", filename, code, highlight }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-8 rounded-xl border border-slate-700/50 bg-slate-900/80 overflow-hidden shadow-2xl shadow-cyan-500/5">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Terminal size={16} className="text-cyan-400" />
          <span className="px-2.5 py-1 rounded-md bg-cyan-900/40 text-cyan-300 border border-cyan-700/40 font-mono font-semibold">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/20"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-loose bg-slate-950/50">
        <code className={`language-${language} text-slate-200`}>{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    danger: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };
  const style = styles[type];
  return (
    <div
      className={`my-8 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Metadata bar component
function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-indigo-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-400" />
          <span>December 29, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span>12 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-indigo-400" />
          <span>React Native • Expo • 2025</span>
        </div>
      </div>
    </div>
  );
}

export default function ReactNativeCliVsExpo() {
  return (
    <article className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <FeaturedImage className="mb-0 border-b border-slate-800" />
      <ArticleMetadata />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <p className="text-xl leading-relaxed text-slate-200">
            For years, the React Native community was split. On one side, the{" "}
            <strong>CLI</strong> purists who wanted total control. On the other,
            the <strong>Expo</strong> enthusiasts who loved the developer
            experience but feared the "walled garden."
          </p>
          <p className="text-xl leading-relaxed text-slate-200">
            In 2025, that wall has crumbled. Expo is no longer just a
            playground; it is the <strong>standard</strong> way to build
            professional React Native apps. If you are starting a new project
            today, the answer is almost certainly Expo. Here is why.
          </p>
        </div>

        {/* Section 1: The Old World vs. 2025 */}
        <div className="mb-16">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white mb-6">
            <Clock size={32} className="text-indigo-500" />
            The Evolution
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-xl font-bold text-slate-400 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} />
                The Past (Pre-2022)
              </h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex gap-3">
                  <span className="text-red-500">✕</span> Expo "ejecting" was
                  painful
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">✕</span> No custom native code
                  in Expo Go
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">✕</span> Limited background
                  capabilities
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">✕</span> CLI required for
                  serious apps
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-indigo-950/20 border border-indigo-500/30">
              <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <Check size={20} />
                The Present (2025)
              </h3>
              <ul className="space-y-3 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-green-400">✓</span> <strong>CNG</strong>{" "}
                  (Continuous Native Generation)
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400">✓</span>{" "}
                  <strong>Config Plugins</strong> for native code
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400">✓</span>{" "}
                  <strong>Dev Client</strong> runs ANY native code
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400">✓</span> Zero lock-in
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Feature Showdown
          </h2>
          <ComparisonTable />
        </div>

        {/* Deep Dive: CNG */}
        <div className="mb-16">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white mb-6">
            <RefreshCw size={32} className="text-indigo-500" />
            The Game Changer: CNG
          </h2>
          <p className="text-lg mb-6">
            <strong>Continuous Native Generation (CNG)</strong> is the
            philosophy that you should never have to manually edit your
            `android` or `ios` folders. Instead, you generate them on demand.
          </p>

          <CodeBlock
            language="bash"
            filename="Terminal"
            code={`# The old way (CLI)
# You maintain android/ and ios/ folders forever.
# Upgrades are manual hell.

# The new way (Expo CNG)
npx expo prebuild

# This command generates android/ and ios/ folders from scratch
# based on your app.json config. You can delete them anytime!`}
          />

          <InfoBox type="tip" title="Why CNG Matters" icon={Lightbulb}>
            Imagine upgrading React Native versions. <br />
            <br />
            <strong>CLI Way:</strong> Manually diffing massive XML and Gradle
            files, hoping you don't break the build.
            <br />
            <strong>Expo Way:</strong> Run{" "}
            <code className="bg-slate-800 px-1 rounded text-indigo-300">
              npx expo install react-native@latest
            </code>{" "}
            and{" "}
            <code className="bg-slate-800 px-1 rounded text-indigo-300">
              npx expo prebuild
            </code>
            . Done.
          </InfoBox>

          <p className="text-lg mb-4">
            With <strong>Prebuild</strong>, Expo generates the native projects
            for you based on your `app.json` and config plugins. This means your
            project stays clean, JavaScript-focused, and upgradeable.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">
            How to use Native Modules with CNG?
          </h3>
          <p className="text-slate-400 mb-4">
            In the past, you needed to eject to link native libraries. Now, you
            use <strong>Config Plugins</strong>.
          </p>

          <CodeBlock
            language="json"
            filename="app.json"
            code={`{
  "expo": {
    "name": "MyApp",
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
        }
      ],
      "expo-localization"
    ]
  }
}`}
          />
        </div>

        {/* Deep Dive: EAS */}
        <div className="mb-16">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white mb-6">
            <Rocket size={32} className="text-violet-500" />
            EAS: Superpowers for React Native
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-colors">
              <Server size={32} className="text-violet-400 mb-4" />
              <h3 className="font-bold text-white mb-2">EAS Build</h3>
              <p className="text-sm text-slate-400">
                Cloud builds for iOS and Android. No need for a Mac to build iOS
                apps.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-colors">
              <Zap size={32} className="text-yellow-400 mb-4" />
              <h3 className="font-bold text-white mb-2">EAS Update</h3>
              <p className="text-sm text-slate-400">
                Ship bug fixes and updates instantly over the air (OTA) without
                App Store review.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-colors">
              <Shield size={32} className="text-green-400 mb-4" />
              <h3 className="font-bold text-white mb-2">EAS Submit</h3>
              <p className="text-sm text-slate-400">
                One-command submission to the Apple App Store and Google Play
                Store.
              </p>
            </div>
          </div>
        </div>

        {/* When to use CLI */}
        <div className="mb-16">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white mb-6">
            <Terminal size={32} className="text-slate-500" />
            Is React Native CLI Dead?
          </h2>
          <p className="text-lg mb-6">
            Not dead, but specialized. The "Bare Workflow" (CLI) is still the
            foundation of Expo, but you rarely need to interact with it
            directly.
          </p>

          <h3 className="text-xl font-bold text-white mb-4">
            When to consider CLI:
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <GitBranch className="text-slate-500 mt-1" />
              <div>
                <strong className="text-slate-200">Brownfield Apps:</strong>
                <p className="text-slate-400 text-sm">
                  If you are integrating React Native into a massive existing
                  native iOS/Android app, CLI integration might be more
                  straightforward (though Expo works here too).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="text-slate-500 mt-1" />
              <div>
                <strong className="text-slate-200">
                  Platform Development:
                </strong>
                <p className="text-slate-400 text-sm">
                  If you are building a fork of React Native itself or working
                  on the core architecture.
                </p>
              </div>
            </li>
          </ul>

          <InfoBox
            type="warning"
            title="Misconception Alert"
            icon={AlertTriangle}
          >
            "I need CLI because I have native modules." <br />
            <strong>False.</strong> You can use <strong>Config Plugins</strong>{" "}
            to auto-configure native modules in Expo, or simply use the{" "}
            <strong>Dev Client</strong> to run any native code while keeping the
            Expo DX.
          </InfoBox>
        </div>

        {/* Conclusion */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/20 to-violet-900/20 border border-indigo-500/30">
          <h2 className="text-3xl font-black text-white mb-4">The Verdict</h2>
          <p className="text-xl text-slate-200 leading-relaxed mb-6">
            Start with <strong>Expo</strong>.
          </p>
          <p className="text-lg text-slate-300 mb-6">
            It provides the best developer experience, the easiest upgrade path,
            and a suite of cloud services that save you hundreds of hours. The
            limitations of the past are gone. In 2025, Expo is React Native.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all">
              <BookOpen size={20} />
              Read Expo Docs
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all">
              <ArrowRight size={20} />
              Create New App
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Attach component exports for the blog system
ReactNativeCliVsExpo.CardImage = ReactNativeCliVsExpoCardImage;
ReactNativeCliVsExpo.FeaturedImage = FeaturedImage;
ReactNativeCliVsExpo.Image = ReactNativeCliVsExpoCardImage; // fallback alias

// Blog post metadata for the blog system
ReactNativeCliVsExpo.info = {
  id: "react-native-cli-vs-expo-2025",
  slug: "react-native-cli-vs-expo-2025",
  title: "React Native CLI vs Expo in 2025: The Final Verdict",
  excerpt: "Stop wondering which tool to use. In 2025, the choice between React Native CLI and Expo has changed dramatically. Here is everything you need to know.",
  description: "Stop wondering which tool to use. In 2025, the choice between React Native CLI and Expo has changed dramatically. Here is everything you need to know.",
  category: "React Native",
  tags: ["React Native", "Expo", "Mobile", "2025 Guide"],
  author: "Dev Kant Kumar",
  publishDate: "2025-12-29",
  readTime: "12 min read",
  featured: true,
};

// Exports
export { ReactNativeCliVsExpoCardImage, FeaturedImage as ReactNativeCliVsExpoFeaturedImage };
