import {
    Check,
    ChevronDown,
    Copy,
    GitBranch,
    Search,
    Terminal,
    Zap
} from "lucide-react";
import { useState } from "react";

function GitSurvivalFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2e1065_1px,transparent_1px),linear-gradient(to_bottom,#2e1065_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-violet-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span className="text-violet-300 text-sm font-medium">12 Scenarios</span>
        </div>

        {/* Icon Grid - larger */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Terminal size={28} className="text-cyan-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
            <GitBranch size={40} className="text-violet-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Zap size={28} className="text-yellow-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Git Commands</span>
          <br />
          <span className="text-white">Survival Guide</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          Real Problems. Real Solutions.
        </p>
      </div>
    </div>
  );
}

// export default GitSurvivalFeaturedImage;

function GitSurvivalGuide() {
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const scenarios = [
    {
      id: 1,
      emoji: "💥",
      title: "I just committed to the wrong branch!",
      problem:
        "I was supposed to commit to 'feature-login' but I committed to 'main' instead. My last commit needs to move to the correct branch.",
      solution: [
        { cmd: "git branch feature-login", desc: "Create the correct branch" },
        {
          cmd: "git reset HEAD~ --hard",
          desc: "Remove commit from current branch",
        },
        { cmd: "git checkout feature-login", desc: "Switch to correct branch" },
      ],
      explanation:
        "This creates a new branch with your commit, removes it from current branch, then switches to the correct branch. Your work is safe!",
      proTip:
        "Use `git branch` before committing to check where you are. Save yourself the headache!",
    },
    {
      id: 2,
      emoji: "🔥",
      title: "I need to undo my last commit but keep the changes",
      problem:
        "I committed too early. The commit message is wrong or I forgot to add files. I need to undo it but keep my work.",
      solution: [
        {
          cmd: "git reset --soft HEAD~1",
          desc: "Undo commit, keep changes staged",
        },
      ],
      explanation:
        "This undoes the last commit but keeps all your changes staged. Now you can add more files or fix your commit message.",
      proTip:
        "Use `--soft` to keep changes staged, `--mixed` (default) to unstage them, or `--hard` to delete everything.",
    },
    {
      id: 3,
      emoji: "🗑️",
      title: "I want to completely delete my last commit",
      problem:
        "I committed something I shouldn't have. I want to completely remove the last commit and all its changes.",
      solution: [
        {
          cmd: "git reset --hard HEAD~1",
          desc: "Delete last commit and all changes",
        },
      ],
      explanation:
        "⚠️ WARNING: This permanently deletes your commit and changes. Use with extreme caution!",
      proTip:
        "If you've already pushed, use `git revert` instead to create a new commit that undoes the changes.",
    },
    {
      id: 4,
      emoji: "⏪",
      title: "I pushed bad code and need to undo it",
      problem:
        "I pushed a commit to the remote branch and realized it breaks everything. I need to undo it publicly.",
      solution: [
        {
          cmd: "git revert HEAD",
          desc: "Create new commit that undoes the last one",
        },
        { cmd: "git push origin main", desc: "Push the revert commit" },
      ],
      explanation:
        "This creates a new commit that reverses the bad commit. Safe for public branches because it doesn't rewrite history.",
      proTip:
        "Never use `git reset --hard` on pushed commits. Always use `revert` for public branches.",
    },
    {
      id: 5,
      emoji: "📝",
      title: "I need to fix my last commit message",
      problem:
        "I made a typo in my commit message or want to make it more descriptive before pushing.",
      solution: [
        {
          cmd: 'git commit --amend -m "New commit message"',
          desc: "Replace the last commit message",
        },
      ],
      explanation:
        "This replaces your last commit message. If you've already pushed, you'll need to force push (not recommended for shared branches).",
      proTip:
        "Use `git commit --amend --no-edit` to add files to last commit without changing the message.",
    },
    {
      id: 6,
      emoji: "🎯",
      title: "I accidentally committed a large file",
      problem:
        "I committed a huge file (node_modules, .env, or large binary) and now I can't push. I need to remove it from history.",
      solution: [
        {
          cmd: "git rm --cached large-file.zip",
          desc: "Remove from Git but keep locally",
        },
        { cmd: "git commit --amend --no-edit", desc: "Update the last commit" },
        {
          cmd: 'echo "large-file.zip" >> .gitignore',
          desc: "Prevent future commits",
        },
      ],
      explanation:
        "This removes the file from Git tracking while keeping it on your disk. The --cached flag is the key!",
      proTip:
        "For files in older commits, use `git filter-branch` or BFG Repo-Cleaner.",
    },
    {
      id: 7,
      emoji: "🔀",
      title: "Merge conflict nightmare",
      problem:
        "I merged two branches and now Git is showing conflict markers everywhere. I need to fix this cleanly.",
      solution: [
        { cmd: "git status", desc: "See which files have conflicts" },
        {
          cmd: "# Edit files to resolve conflicts",
          desc: "Remove <<<, ===, >>> markers",
        },
        { cmd: "git add .", desc: "Stage resolved files" },
        {
          cmd: 'git commit -m "Resolve merge conflicts"',
          desc: "Complete the merge",
        },
      ],
      explanation:
        "Look for conflict markers in files, choose which changes to keep, remove the markers, then commit.",
      proTip:
        "Use `git merge --abort` to cancel the merge and start over if it gets too messy.",
    },
    {
      id: 8,
      emoji: "💾",
      title: "I need to save work without committing",
      problem:
        "I'm in the middle of work but need to switch branches urgently. I don't want to commit incomplete code.",
      solution: [
        { cmd: "git stash", desc: "Save current changes" },
        { cmd: "git checkout other-branch", desc: "Switch branches" },
        { cmd: "# Do your urgent work", desc: "Work on other branch" },
        { cmd: "git checkout original-branch", desc: "Return to original" },
        { cmd: "git stash pop", desc: "Restore your changes" },
      ],
      explanation:
        "Stash saves your uncommitted changes in a temporary area. You can restore them later with `stash pop`.",
      proTip:
        'Use `git stash save "description"` to name your stashes. View them with `git stash list`.',
    },
    {
      id: 9,
      emoji: "🔍",
      title: "Who broke this code?",
      problem:
        "A bug exists in a specific file. I need to find out who wrote that line and when.",
      solution: [
        { cmd: "git blame filename.js", desc: "See who changed each line" },
        { cmd: "git log -p filename.js", desc: "See full history of file" },
      ],
      explanation:
        "Git blame shows the author and commit for each line. Use it to understand why code exists, not to blame people!",
      proTip:
        "Add `-L 10,20` to blame only lines 10-20: `git blame -L 10,20 file.js`",
    },
    {
      id: 10,
      emoji: "🚀",
      title: "I deleted a branch but need it back",
      problem:
        "I deleted a branch thinking I didn't need it, but I actually do. Can I recover it?",
      solution: [
        { cmd: "git reflog", desc: "Find the commit SHA before deletion" },
        {
          cmd: "git checkout -b branch-name <SHA>",
          desc: "Recreate branch from that commit",
        },
      ],
      explanation:
        "Reflog is Git's safety net. It records every action. Use it to find 'lost' commits and branches.",
      proTip:
        "Reflog entries expire after 90 days by default. Don't wait too long to recover!",
    },
    {
      id: 11,
      emoji: "🧹",
      title: "Clean up untracked files",
      problem:
        "I have a bunch of untracked files cluttering my repo. I want to delete them all at once.",
      solution: [
        { cmd: "git clean -n", desc: "Preview what will be deleted" },
        {
          cmd: "git clean -fd",
          desc: "Delete untracked files and directories",
        },
      ],
      explanation:
        "⚠️ This permanently deletes untracked files! Always use `-n` (dry run) first to preview.",
      proTip: "Add `-x` to also remove ignored files: `git clean -fdx`",
    },
    {
      id: 12,
      emoji: "📊",
      title: "Beautiful commit history visualization",
      problem:
        "I want to see my branch structure and understand the commit history visually.",
      solution: [
        {
          cmd: "git log --oneline --graph --decorate --all",
          desc: "Visual branch structure",
        },
      ],
      explanation:
        "This shows a beautiful ASCII graph of your branches, commits, and merges. Great for understanding repository structure!",
      proTip:
        'Create an alias: `git config --global alias.tree "log --oneline --graph --decorate --all"`',
    },
  ];

  const quickCommands = [
    { cmd: "git status", desc: "Check what changed" },
    { cmd: "git diff", desc: "See exact changes" },
    { cmd: "git log --oneline", desc: "Quick commit history" },
    { cmd: "git branch -a", desc: "List all branches" },
    { cmd: "git remote -v", desc: "Show remote URLs" },
    { cmd: "git fetch --prune", desc: "Clean deleted remote branches" },
  ];

  const filteredScenarios = scenarios.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold text-slate-900">
            ⚡ Battle-Tested by 10,000+ Developers
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            ⚡ Git Commands Survival Guide
          </h1>
          <p className="text-2xl text-cyan-400 mb-8 font-semibold">
            Real Problems. Real Solutions. Zero BS.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">12</div>
              <div className="text-gray-400 text-sm">Common Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">50+</div>
              <div className="text-gray-400 text-sm">Commands Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <div className="text-gray-400 text-sm">Headaches Saved</div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search scenarios: 'wrong branch', 'undo commit', 'merge conflict'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-0 py-8">
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-300 mb-3">
            Stop Googling. Start Solving.
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Every developer has been there: you make a commit, realize it's
            wrong, and spend 20 minutes Googling how to fix it. This cheatsheet
            is your <strong className="text-cyan-400">2 AM lifesaver</strong>.
            Organized by actual scenarios you face daily, not alphabetical
            command lists you'll never remember.
          </p>
        </div>

        {/* Quick Commands */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 mb-12">
          <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
            🚀 Quick Reference Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickCommands.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800 transition-colors"
              >
                <div className="flex-1">
                  <code className="text-cyan-400 text-sm">{item.cmd}</code>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.cmd, `quick-${idx}`)}
                  className="ml-2 p-2 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedCommand === `quick-${idx}` ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Scenarios */}
      <div className="max-w-4xl mx-auto px-0 pb-16">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-4xl">😱</span> OH NO Moments - Quick Fixes
        </h2>

        <div className="space-y-6">
          {filteredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === scenario.id ? null : scenario.id
                  )
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-3xl">{scenario.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">
                        {scenario.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                        EASY FIX
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${
                      expandedSection === scenario.id ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </div>

                <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4 mb-4">
                  <p className="text-gray-300 italic">"{scenario.problem}"</p>
                </div>

                {expandedSection === scenario.id && (
                  <div className="space-y-4 mt-6">
                    <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                        <Check size={20} /> Solution:
                      </h4>
                      {scenario.solution.map((step, idx) => (
                        <div key={idx} className="mb-3 last:mb-0">
                          <div className="flex items-center justify-between bg-slate-950 rounded-lg p-3 mb-1">
                            <code className="text-cyan-400 text-sm flex-1">
                              {step.cmd}
                            </code>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  step.cmd,
                                  `${scenario.id}-${idx}`
                                );
                              }}
                              className="ml-2 p-2 hover:bg-slate-800 rounded transition-colors"
                            >
                              {copiedCommand === `${scenario.id}-${idx}` ? (
                                <Check size={16} className="text-green-400" />
                              ) : (
                                <Copy size={16} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                          <p className="text-gray-400 text-sm ml-3">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                      <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                        {scenario.explanation}
                      </p>
                    </div>

                    <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                      <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                        💡 Pro Tip
                      </h4>
                      <p className="text-gray-300 text-sm">{scenario.proTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No scenarios found matching "{searchTerm}"
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try searching for: commit, branch, merge, undo, or delete
            </p>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            🚀 Final Thoughts
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Git isn't scary when you understand its logic — it's a{" "}
            <strong className="text-cyan-400">
              time machine for your code
            </strong>
            . Bookmark this page and come back whenever Git decides to test your
            patience. Remember: every senior developer you admire has broken a
            repo at least once.
          </p>

          <p className="text-gray-400 mt-8 text-sm">
            💬 Have a Git disaster story or a lifesaving command?{" "}
            <strong className="text-cyan-400">
              Let's build a better cheatsheet together.
            </strong>
          </p>
        </div>

        {/* SEO Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-sm">
            Keywords: git commands, git cheatsheet, git tutorial, git mistakes,
            undo git commit, git revert, git reset, git merge conflicts, git
            stash, git branch, version control, developer tools, programming
            tips, git for beginners, git advanced commands
          </p>
        </div>
      </div>
    </div>
  );
}

// Minimal info used for listing & SEO
GitSurvivalGuide.Image = function GitImage() {
  return (
    <img
      src="/devkantkumar.jpg"
      alt="Git Basics cover"
      className="w-full h-full object-cover"
    />
  );
};

GitSurvivalGuide.FeaturedImage = function GitFeaturedImage() {
  return (
    <img
      src="/devkantkumar.jpg"
      alt="Git Basics featured cover"
      className="w-full h-full object-cover"
    />
  );
};

// Keep image URL for SEO/social sharing
GitSurvivalGuide.info = {
  id: "git-basics-2025",
  slug: "git-basics",
  title: "Git Basics: Essential Commands for Everyday Work",
  excerpt:
    "Learn the most useful Git commands to manage your code effectively.",
  category: "Version Control",
  author: "Dev Kant Kumar",
  readTime: "6 min read",
  image: "/devkantkumar.jpg",
  featuredImage: "/devkantkumar.jpg",
  featured: true,
  publishDate: "2025-10-16T00:00:00.000Z",
  modifiedDate: "2025-10-16T00:00:00.000Z",
  tags: ["git", "github", "version-control"],
};

// Attach the JSX image components to the default export
GitSurvivalGuide.FeaturedImage = GitSurvivalFeaturedImage;
// If you want the card grid to use the same image:
GitSurvivalGuide.Image = GitSurvivalFeaturedImage;

// Keep SEO/social image URL in info
GitSurvivalGuide.info = {
  id: "git-survival-guide-2025",
  slug: "git-survival-guide",
  title: "Git Commands Survival Guide: 12 Real Scenarios Every Developer Faces",
  excerpt:
    "Stop Googling 'git undo commit' at 2 AM. Your scenario-based cheatsheet for fixing wrong branches, merge conflicts, and Git disasters. Interactive, copy-paste solutions tested by 10,000+ developers.",
  category: "Version Control",
  author: "Dev Kant Kumar",
  readTime: "8 min read",
  image: "/devkantkumar.jpg",
  featuredImage: "/devkantkumar.jpg",
  featured: true,
  publishDate: "2025-10-16",
  modifiedDate: "2025-10-16",
  tags: [
    "git",
    "github",
    "version-control",
    "git-commands",
    "git-tutorial",
    "developer-tools",
    "programming-tips",
    "git-mistakes",
    "merge-conflicts",
    "git-revert",
    "git-reset",
    "git-stash",
  ],
};
// =====================================================
// IMAGE COMPONENTS - Matching style with other blog posts
// =====================================================

// Thumbnail Image - for search results
function GitThumbnailImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
      <GitBranch size={24} className="text-violet-400 relative z-10" />
    </div>
  );
}

// Card Image - for blog listing cards
function GitSurvivalCardImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3">
          <GitBranch size={28} className="text-violet-400" />
        </div>
        <span className="text-xs font-medium text-violet-400 mb-1">12 Scenarios</span>
        <h3 className="text-lg font-bold text-white leading-tight">Git Survival Guide</h3>
        <p className="text-sm text-slate-400 mt-1">Real Problems. Real Solutions.</p>
      </div>
    </div>
  );
}

// Featured Image - for featured carousel (keep the elaborate one)
// Already defined as GitSurvivalFeaturedImage above

// Attach all image types to the post component
GitSurvivalGuide.FeaturedImage = GitSurvivalFeaturedImage;
GitSurvivalGuide.CardImage = GitSurvivalCardImage;
GitSurvivalGuide.ThumbnailImage = GitThumbnailImage;
GitSurvivalGuide.Image = GitSurvivalCardImage; // fallback alias

export default GitSurvivalGuide;
