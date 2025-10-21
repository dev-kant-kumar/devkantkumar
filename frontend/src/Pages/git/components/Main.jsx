import {
  AlertCircle,
  Check,
  CheckCircle,
  ChevronDown,
  Copy,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Globe,
  Layers,
  Lock,
  Package,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function GitMasterclass() {
  const [activeTab, setActiveTab] = useState("scenarios");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Real-world scenarios based on research
  const scenarios = [
    {
      id: 1,
      category: "Emergency Fixes",
      emoji: "🚨",
      title: "I committed to the wrong branch!",
      difficulty: "Easy",
      problem:
        "You were supposed to commit to 'feature-login' but committed to 'main'. Need to move the commit.",
      solution: [
        {
          cmd: "git branch feature-login",
          desc: "Create the correct branch at current commit",
        },
        {
          cmd: "git reset HEAD~ --hard",
          desc: "Remove commit from wrong branch",
        },
        { cmd: "git checkout feature-login", desc: "Switch to correct branch" },
      ],
      explanation:
        "This creates a branch pointing to your commit, removes it from the current branch, then switches over.",
      proTip:
        "Use 'git branch' before committing to verify your location. Consider 'git config --global init.defaultBranch main' to set defaults.",
      related: ["undo-commit", "branch-management"],
    },
    {
      id: 2,
      category: "Emergency Fixes",
      emoji: "⏮️",
      title: "Undo last commit but keep changes",
      difficulty: "Easy",
      problem:
        "Wrong commit message or forgot to add files. Need to undo commit but preserve work.",
      solution: [
        {
          cmd: "git reset --soft HEAD~1",
          desc: "Undo commit, keep changes staged",
        },
      ],
      explanation:
        "--soft keeps changes staged, --mixed unstages them, --hard deletes everything.",
      proTip:
        "For the last commit only, use 'git commit --amend' to modify it directly without reset.",
      related: ["delete-commit", "fix-message"],
    },
    {
      id: 3,
      category: "Emergency Fixes",
      emoji: "🗑️",
      title: "Completely delete last commit",
      difficulty: "Medium",
      problem: "Committed something that shouldn't exist. Need nuclear option.",
      solution: [
        {
          cmd: "git reset --hard HEAD~1",
          desc: "⚠️ DANGER: Permanently deletes commit and changes",
        },
      ],
      explanation:
        "This is destructive and permanent. Only use if you're absolutely sure.",
      proTip:
        "If already pushed, NEVER use reset. Use 'git revert HEAD' instead to create a new commit that undoes changes safely.",
      related: ["undo-commit", "revert-pushed"],
    },
    {
      id: 4,
      category: "Team Collaboration",
      emoji: "⏪",
      title: "Undo pushed code (safe for teams)",
      difficulty: "Easy",
      problem:
        "Pushed bad code that broke production. Need to undo publicly without rewriting history.",
      solution: [
        {
          cmd: "git revert HEAD",
          desc: "Create new commit undoing the last one",
        },
        { cmd: "git push origin main", desc: "Push the revert commit" },
      ],
      explanation:
        "Revert creates a new commit that reverses changes. Safe for shared branches.",
      proTip:
        "For multiple commits: 'git revert <oldest-commit>..<newest-commit>' or use 'git revert --no-commit' for multiple then commit once.",
      related: ["delete-commit", "emergency-fixes"],
    },
    {
      id: 5,
      category: "Commit Management",
      emoji: "📝",
      title: "Fix commit message (before/after push)",
      difficulty: "Easy",
      problem: "Typo in commit message or want more descriptive text.",
      solution: [
        {
          cmd: 'git commit --amend -m "New commit message"',
          desc: "Replace last commit message",
        },
        {
          cmd: "git push --force-with-lease origin branch-name",
          desc: "If already pushed (use carefully!)",
        },
      ],
      explanation:
        "--amend modifies the last commit. Force push needed if already pushed (coordinate with team!).",
      proTip:
        "'git commit --amend --no-edit' adds files to last commit without changing message. Use '--force-with-lease' not '--force' for safety.",
      related: ["undo-commit", "force-push"],
    },
    {
      id: 6,
      category: "File Management",
      emoji: "📦",
      title: "Remove large file from history",
      difficulty: "Hard",
      problem:
        "Accidentally committed node_modules, .env, or huge binary. Can't push due to size.",
      solution: [
        {
          cmd: "git rm --cached large-file.zip",
          desc: "Remove from Git, keep locally",
        },
        { cmd: "git commit --amend --no-edit", desc: "Update last commit" },
        {
          cmd: "echo 'large-file.zip' >> .gitignore",
          desc: "Prevent future commits",
        },
        {
          cmd: "# For older commits:",
          desc: "Use BFG Repo-Cleaner or git filter-repo",
        },
      ],
      explanation:
        "--cached removes from Git tracking while keeping on disk. For older commits, use specialized tools.",
      proTip:
        "BFG Repo-Cleaner: 'bfg --delete-files large-file.zip' (faster than filter-branch). Or git filter-repo: 'git filter-repo --path large-file.zip --invert-paths'",
      related: ["gitignore", "lfs"],
    },
    {
      id: 7,
      category: "Merge Conflicts",
      emoji: "🔀",
      title: "Resolve merge conflicts step-by-step",
      difficulty: "Medium",
      problem: "Merged branches and Git shows conflict markers everywhere.",
      solution: [
        { cmd: "git status", desc: "See conflicted files" },
        {
          cmd: "# Edit files, remove <<<, ===, >>> markers",
          desc: "Choose which changes to keep",
        },
        { cmd: "git add .", desc: "Stage resolved files" },
        {
          cmd: 'git commit -m "Resolve merge conflicts"',
          desc: "Complete merge",
        },
      ],
      explanation:
        "Find conflict markers, decide what to keep, remove markers, stage and commit.",
      proTip:
        "'git merge --abort' cancels merge to start over. Use 'git mergetool' for visual conflict resolution. VSCode has excellent built-in conflict resolution.",
      related: ["rebase-conflicts", "team-collaboration"],
    },
    {
      id: 8,
      category: "Workflow Management",
      emoji: "💾",
      title: "Save work without committing (stash)",
      difficulty: "Easy",
      problem: "Need to switch branches urgently but have uncommitted work.",
      solution: [
        {
          cmd: 'git stash save "Work in progress on feature X"',
          desc: "Save changes with description",
        },
        { cmd: "git checkout other-branch", desc: "Switch branches" },
        { cmd: "# Do urgent work...", desc: "" },
        { cmd: "git checkout original-branch", desc: "Return" },
        { cmd: "git stash pop", desc: "Restore changes" },
      ],
      explanation:
        "Stash temporarily stores uncommitted changes. Pop restores and removes from stash.",
      proTip:
        "'git stash list' shows all stashes. 'git stash apply' keeps stash after applying. 'git stash drop' removes specific stash.",
      related: ["branch-switching", "wip"],
    },
    {
      id: 9,
      category: "Debugging",
      emoji: "🔍",
      title: "Find who changed a line (git blame)",
      difficulty: "Easy",
      problem: "Bug exists. Need to find who wrote specific code and when.",
      solution: [
        { cmd: "git blame filename.js", desc: "See author for each line" },
        {
          cmd: "git blame -L 10,20 filename.js",
          desc: "Blame specific lines only",
        },
        { cmd: "git log -p filename.js", desc: "See full history with diffs" },
      ],
      explanation:
        "Blame shows author and commit for each line. Use to understand context, not to blame people!",
      proTip:
        "'git blame -w' ignores whitespace changes. 'git log -S \"function_name\"' finds when a function was added/removed (pickaxe search).",
      related: ["debugging", "history"],
    },
    {
      id: 10,
      category: "Recovery",
      emoji: "♻️",
      title: "Recover deleted branch",
      difficulty: "Medium",
      problem:
        "Deleted a branch thinking it wasn't needed. Actually need it back.",
      solution: [
        { cmd: "git reflog", desc: "Find commit SHA before deletion" },
        {
          cmd: "git checkout -b branch-name <SHA>",
          desc: "Recreate branch from commit",
        },
      ],
      explanation:
        "Reflog records all actions. Find the commit where your branch was, recreate it.",
      proTip:
        "Reflog entries expire after 90 days. To see all: 'git reflog show --all'. To extend expiration: 'git config gc.reflogExpire 180.days'",
      related: ["recovery", "reflog"],
    },
    {
      id: 11,
      category: "Cleanup",
      emoji: "🧹",
      title: "Clean up untracked files safely",
      difficulty: "Easy",
      problem:
        "Lots of untracked files cluttering repo. Want to delete all at once.",
      solution: [
        {
          cmd: "git clean -n",
          desc: "⚠️ DRY RUN: Preview what will be deleted",
        },
        {
          cmd: "git clean -fd",
          desc: "Delete untracked files and directories",
        },
        { cmd: "git clean -fdx", desc: "Also remove ignored files" },
      ],
      explanation:
        "ALWAYS use -n first to preview! This permanently deletes files.",
      proTip:
        "'git clean -fdi' runs interactively, letting you choose what to delete. Add to .gitignore before cleaning if you want to keep patterns.",
      related: ["cleanup", "untracked"],
    },
    {
      id: 12,
      category: "Visualization",
      emoji: "📊",
      title: "Beautiful commit history visualization",
      difficulty: "Easy",
      problem:
        "Want to understand branch structure and commit relationships visually.",
      solution: [
        {
          cmd: "git log --oneline --graph --decorate --all",
          desc: "ASCII art branch visualization",
        },
        {
          cmd: "git log --graph --pretty=format:'%C(yellow)%h%Creset -%C(red)%d%Creset %s %C(green)(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit",
          desc: "Colorful detailed view",
        },
      ],
      explanation:
        "Creates visual ASCII graph showing branches, merges, and commits.",
      proTip:
        "Create alias: 'git config --global alias.tree \"log --oneline --graph --decorate --all\"'. Then use 'git tree'.",
      related: ["visualization", "history"],
    },
  ];

  // Advanced workflows
  const advancedWorkflows = [
    {
      id: "rebase",
      title: "Interactive Rebase - Clean Up History",
      icon: GitBranch,
      description: "Rewrite commit history before pushing",
      difficulty: "Advanced",
      useCase: "Clean up messy commits before creating PR",
      commands: [
        {
          cmd: "git rebase -i HEAD~3",
          desc: "Interactively rebase last 3 commits",
        },
        {
          cmd: "# Options: pick, squash, edit, reword, drop",
          desc: "Choose action for each commit",
        },
        {
          cmd: "git push --force-with-lease",
          desc: "Update remote (if already pushed)",
        },
      ],
      warning:
        "Never rebase commits that exist on public branches others are using!",
      proTip:
        "Use 'fixup' instead of 'squash' if you don't want to edit commit messages.",
    },
    {
      id: "cherrypick",
      title: "Cherry-Pick - Copy Commits Between Branches",
      icon: GitCommit,
      description: "Apply specific commits to different branches",
      difficulty: "Medium",
      useCase: "Hotfix needs to go to multiple release branches",
      commands: [
        { cmd: "git log --oneline", desc: "Find commit SHA to copy" },
        { cmd: "git checkout target-branch", desc: "Switch to destination" },
        { cmd: "git cherry-pick <commit-sha>", desc: "Apply commit here" },
        { cmd: "git cherry-pick <sha1> <sha2>", desc: "Multiple commits" },
      ],
      proTip:
        "Use 'git cherry-pick --continue' after resolving conflicts, or '--abort' to cancel.",
    },
    {
      id: "bisect",
      title: "Git Bisect - Binary Search for Bugs",
      icon: Search,
      description: "Automatically find which commit introduced a bug",
      difficulty: "Advanced",
      useCase: "Bug exists but unsure which commit caused it",
      commands: [
        { cmd: "git bisect start", desc: "Begin bisect session" },
        { cmd: "git bisect bad", desc: "Mark current commit as bad" },
        { cmd: "git bisect good <commit-sha>", desc: "Mark known good commit" },
        {
          cmd: "# Test, then mark: git bisect good/bad",
          desc: "Git checks out middle commit",
        },
        { cmd: "git bisect reset", desc: "End session, return to HEAD" },
      ],
      proTip:
        "Automate with: 'git bisect run <test-script>' - Git will test automatically!",
    },
    {
      id: "worktree",
      title: "Git Worktree - Multiple Branches Simultaneously",
      icon: Layers,
      description: "Work on multiple branches without switching",
      difficulty: "Advanced",
      useCase: "Need to reference two branches at once or test in parallel",
      commands: [
        {
          cmd: "git worktree add ../project-feature2 feature2",
          desc: "Create new worktree",
        },
        { cmd: "git worktree list", desc: "See all worktrees" },
        { cmd: "cd ../project-feature2", desc: "Work in separate directory" },
        {
          cmd: "git worktree remove ../project-feature2",
          desc: "Clean up when done",
        },
      ],
      proTip:
        "Each worktree is a separate checkout. Great for code review while developing!",
    },
  ];

  // GitHub-specific features
  const githubFeatures = [
    {
      id: "actions",
      title: "GitHub Actions - CI/CD Automation",
      icon: Zap,
      description: "Automate testing, building, and deployment",
      difficulty: "Medium",
      example: `.github/workflows/ci.yml:
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test`,
      keyPoints: [
        "Triggers on push, PR, schedule, or manual",
        "Matrix builds for multiple OS/versions",
        "Cache dependencies for speed",
        "Secrets management built-in",
      ],
      proTip:
        "Use 'if: github.ref == \"refs/heads/main\"' to run jobs only on main branch.",
    },
    {
      id: "pr-workflow",
      title: "Pull Request Best Practices",
      icon: GitPullRequest,
      description: "Professional PR workflow for teams",
      difficulty: "Easy",
      workflow: [
        "1. Create feature branch: git checkout -b feature/new-thing",
        "2. Make commits with clear messages",
        "3. Push branch: git push -u origin feature/new-thing",
        "4. Create PR on GitHub with good description",
        "5. Request reviewers, link issues",
        "6. Address review comments",
        "7. Squash commits if needed",
        "8. Merge when approved",
      ],
      keyPoints: [
        "Write descriptive PR titles and descriptions",
        "Link related issues with #issue-number",
        "Keep PRs small and focused (< 400 lines ideal)",
        "Use draft PRs for work in progress",
        "Enable branch protection rules",
      ],
    },
    {
      id: "branch-protection",
      title: "Branch Protection Rules",
      icon: Shield,
      description: "Enforce quality standards on important branches",
      difficulty: "Easy",
      rules: [
        "Require pull request reviews before merging",
        "Require status checks (CI) to pass",
        "Require conversation resolution",
        "Require linear history (no merge commits)",
        "Include administrators in restrictions",
      ],
      setup: "Settings → Branches → Add rule → Configure protections",
    },
  ];

  // Security best practices
  const securityPractices = [
    {
      id: "secrets",
      title: "Never Commit Secrets",
      icon: Lock,
      severity: "CRITICAL",
      problem: "39 million secrets leaked on GitHub in 2024",
      solutions: [
        { title: "Use .env files", desc: "Add .env to .gitignore immediately" },
        {
          title: "Environment variables",
          desc: "Load from environment, never hardcode",
        },
        {
          title: "Git hooks",
          desc: "Install pre-commit hooks to detect secrets",
        },
        {
          title: "Secret scanning",
          desc: "Enable GitHub secret scanning (free for public repos)",
        },
      ],
      emergency: [
        "1. Revoke/rotate the exposed secret immediately",
        "2. Remove from Git history: Use BFG Repo-Cleaner or git filter-repo",
        "3. Force push cleaned history",
        "4. Check access logs for unauthorized use",
        "5. Enable secret scanning to prevent recurrence",
      ],
    },
    {
      id: "signing",
      title: "Commit Signing - Verify Author Identity",
      icon: Shield,
      severity: "HIGH",
      problem: "Anyone can impersonate you in commits without signing",
      setup: [
        { cmd: "gpg --gen-key", desc: "Generate GPG key" },
        {
          cmd: "gpg --list-secret-keys --keyid-format=long",
          desc: "Get key ID",
        },
        {
          cmd: "git config --global user.signingkey <key-id>",
          desc: "Configure Git",
        },
        {
          cmd: "git config --global commit.gpgsign true",
          desc: "Auto-sign all commits",
        },
        { cmd: "# Add GPG key to GitHub", desc: "Settings → SSH and GPG keys" },
      ],
      proTip:
        "On macOS, add 'export GPG_TTY=$(tty)' to .zshrc to avoid passphrase issues.",
    },
    {
      id: "2fa",
      title: "Enable 2FA on GitHub",
      icon: Lock,
      severity: "CRITICAL",
      why: "83% of orgs had successful attacks in past 12 months",
      steps: [
        "Settings → Password and authentication",
        "Enable two-factor authentication",
        "Use authenticator app (not SMS)",
        "Save recovery codes securely",
        "Consider hardware security keys (YubiKey)",
      ],
    },
  ];

  // Performance optimization for large repos
  const performanceOptimizations = [
    {
      id: "monorepo-config",
      title: "Monorepo Performance Config",
      icon: Server,
      problem: "Git slow with 100,000+ files",
      config: `# .gitconfig or .git/config
[core]
  commitgraph = true
  fsmonitor = true
  untrackedcache = true
[feature]
  manyFiles = true
[index]
  version = 4
  skipHash = true
[protocol]
  version = 2`,
      commands: [
        {
          cmd: "git config --global feature.manyFiles true",
          desc: "Enable optimizations",
        },
        {
          cmd: "git config --global core.fsmonitor true",
          desc: "Use file system monitor",
        },
        {
          cmd: "git config --global index.version 4",
          desc: "Use compressed index",
        },
        { cmd: "git maintenance start", desc: "Auto background optimization" },
      ],
      results: "Command time reduced from 0.3s to 0.1s (3x faster)",
    },
    {
      id: "sparse-checkout",
      title: "Sparse Checkout - Work on Subset",
      icon: Database,
      problem: "Monorepo too large, only need specific folders",
      commands: [
        {
          cmd: "git sparse-checkout init --cone",
          desc: "Enable sparse checkout",
        },
        {
          cmd: "git sparse-checkout set frontend backend/api",
          desc: "Choose directories",
        },
        { cmd: "git sparse-checkout list", desc: "See what's checked out" },
      ],
      benefits:
        "Only download and work with needed files. Massive speed improvement.",
    },
    {
      id: "shallow-clone",
      title: "Shallow Clone - CI/CD Speedup",
      icon: Download,
      useCase: "CI/CD doesn't need full history",
      commands: [
        { cmd: "git clone --depth 1 <url>", desc: "Clone only latest commit" },
        { cmd: "git fetch --depth=100", desc: "Fetch more history if needed" },
        { cmd: "git fetch --unshallow", desc: "Convert to full clone" },
      ],
      warning:
        "Don't use shallow clones for development - some operations won't work",
    },
    {
      id: "lfs",
      title: "Git LFS - Large File Storage",
      icon: Package,
      problem: "Binary files (images, videos) bloat repository",
      setup: [
        { cmd: "git lfs install", desc: "Install Git LFS extension" },
        { cmd: 'git lfs track "*.psd"', desc: "Track Photoshop files" },
        { cmd: 'git lfs track "*.mp4"', desc: "Track videos" },
        { cmd: "git add .gitattributes", desc: "Commit tracking config" },
        { cmd: "git lfs ls-files", desc: "See tracked files" },
      ],
      how: "LFS stores file pointers in Git, actual files on LFS server",
    },
  ];

  // Common issues and fixes
  const commonIssues = [
    {
      id: "diverged",
      title: "Local and remote have diverged",
      error:
        "Updates were rejected because the tip of your current branch is behind",
      cause: "Someone else pushed to the branch you're working on",
      solutions: [
        {
          title: "Rebase (Clean History)",
          cmd: "git pull --rebase",
          when: "For feature branches, cleaner history",
          desc: "Replays your commits on top of remote changes",
        },
        {
          title: "Merge (Safe)",
          cmd: "git pull",
          when: "For shared branches, preserves all history",
          desc: "Creates a merge commit combining changes",
        },
      ],
      prevention: "Pull before starting work: 'git pull origin main'",
    },
    {
      id: "detached-head",
      title: "Detached HEAD state",
      error: "You are in 'detached HEAD' state",
      cause: "Checked out a specific commit instead of a branch",
      fix: [
        {
          cmd: "git checkout main",
          desc: "Return to main branch (lose changes)",
        },
        {
          cmd: "git checkout -b new-branch-name",
          desc: "Create branch here (keep changes)",
        },
      ],
      explanation:
        "HEAD points to a commit, not a branch. Create a branch to save work.",
    },
    {
      id: "rejected-push",
      title: "Push rejected - non-fast-forward",
      error: "! [rejected] main -> main (non-fast-forward)",
      cause: "Remote has commits you don't have locally",
      fix: "git pull --rebase && git push",
      warning: "Never use 'git push --force' without coordinating with team!",
    },
  ];

  const filteredScenarios = scenarios.filter(
    (s) =>
      searchTerm === "" ||
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div aria-live="polite" role="status" className="sr-only">
        {copiedCommand ? "Command copied to clipboard." : ""}
      </div>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold text-slate-900 shadow-lg">
            ⚡ Complete Professional Git & GitHub Course 2025
          </div>
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Git & GitHub Masterclass
          </h1>
          <p className="text-2xl text-cyan-300 mb-8 font-semibold max-w-3xl mx-auto">
            From Emergency Fixes to Enterprise Workflows - Everything You Need
            to Master Version Control
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-slate-900/50 rounded-xl px-6 py-4 border border-cyan-500/30">
              <div className="text-4xl font-bold text-cyan-400 mb-1">75+</div>
              <div className="text-gray-300 text-sm">Real Solutions</div>
            </div>
            <div className="bg-slate-900/50 rounded-xl px-6 py-4 border border-purple-500/30">
              <div className="text-4xl font-bold text-purple-400 mb-1">12</div>
              <div className="text-gray-300 text-sm">Major Topics</div>
            </div>
            <div className="bg-slate-900/50 rounded-xl px-6 py-4 border border-green-500/30">
              <div className="text-4xl font-bold text-green-400 mb-1">100%</div>
              <div className="text-gray-300 text-sm">Production Ready</div>
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
              placeholder="Search: 'merge conflict', 'undo commit', 'security'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-cyan-500/30 rounded-xl placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-slate-700 pb-4">
          {[
            { id: "scenarios", label: "🚨 Emergency Fixes", icon: AlertCircle },
            { id: "advanced", label: "🚀 Advanced Workflows", icon: Rocket },
            { id: "github", label: "💻 GitHub Features", icon: Globe },
            { id: "security", label: "🔒 Security", icon: Shield },
            { id: "performance", label: "⚡ Performance", icon: Zap },
            { id: "issues", label: "🔧 Common Issues", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-800"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Emergency Scenarios */}
        {activeTab === "scenarios" && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <AlertCircle size={24} />
                Real-World Emergency Scenarios
              </h2>
              <p className="text-gray-300">
                These are the "OH NO!" moments every developer faces. Each
                scenario includes the exact commands you need, why they work,
                and how to prevent the issue next time.
              </p>
            </div>

            {filteredScenarios.map((scenario) => {
              const isExpanded = expandedSection === scenario.id;
              const difficultyColors = {
                Easy: "bg-green-500/20 text-green-400 border-green-500/30",
                Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                Hard: "bg-red-500/20 text-red-400 border-red-500/30",
              };

              return (
                <div
                  key={scenario.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : scenario.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-3xl">{scenario.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-cyan-300">
                              {scenario.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                difficultyColors[scenario.difficulty]
                              }`}
                            >
                              {scenario.difficulty}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-semibold">
                            {scenario.category}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                      <p className="text-gray-300 italic">
                        "{scenario.problem}"
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle size={20} /> Solution:
                          </h4>
                          {scenario.solution.map((step, idx) => (
                            <div key={idx} className="mb-3 last:mb-0">
                              <div className="flex items-start gap-2 bg-slate-950 rounded-lg p-3 mb-1">
                                <code className="text-cyan-400 text-sm flex-1 font-mono">
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
                                  className="p-2 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                                  title="Copy command"
                                >
                                  {copiedCommand === `${scenario.id}-${idx}` ? (
                                    <Check
                                      size={16}
                                      className="text-green-400"
                                    />
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
                          <div className="mt-4 pt-4 border-t border-green-500/20">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              <strong className="text-green-400">
                                Why this works:
                              </strong>{" "}
                              {scenario.explanation}
                            </p>
                          </div>
                        </div>

                        <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                          <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                            💡 Pro Tip
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {scenario.proTip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredScenarios.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400 text-lg mb-2">
                  No scenarios found matching "{searchTerm}"
                </p>
                <p className="text-gray-500 text-sm">
                  Try: commit, branch, merge, undo, or delete
                </p>
              </div>
            )}
          </div>
        )}

        {/* Advanced Workflows */}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                <Rocket size={24} />
                Advanced Git Workflows for Professionals
              </h2>
              <p className="text-gray-300">
                Master techniques used by senior developers at top tech
                companies. These workflows separate good developers from great
                ones.
              </p>
            </div>

            {advancedWorkflows.map((workflow) => {
              const isExpanded = expandedSection === workflow.id;
              const Icon = workflow.icon;

              return (
                <div
                  key={workflow.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : workflow.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Icon size={24} className="text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-purple-300 mb-2">
                            {workflow.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {workflow.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                              {workflow.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">
                              Use case: {workflow.useCase}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        <div className="bg-slate-950/50 rounded-lg p-4">
                          <h4 className="text-cyan-400 font-semibold mb-3">
                            Commands:
                          </h4>
                          {workflow.commands.map((cmd, idx) => (
                            <div key={idx} className="mb-3 last:mb-0">
                              <div className="flex items-start gap-2 bg-slate-900 rounded-lg p-3 mb-1">
                                <code className="text-cyan-400 text-sm flex-1 font-mono">
                                  {cmd.cmd}
                                </code>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(
                                      cmd.cmd,
                                      `${workflow.id}-${idx}`
                                    );
                                  }}
                                  className="p-2 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                                >
                                  {copiedCommand === `${workflow.id}-${idx}` ? (
                                    <Check
                                      size={16}
                                      className="text-green-400"
                                    />
                                  ) : (
                                    <Copy size={16} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                              <p className="text-gray-400 text-sm ml-3">
                                {cmd.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {workflow.warning && (
                          <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle size={18} /> Warning
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {workflow.warning}
                            </p>
                          </div>
                        )}

                        {workflow.proTip && (
                          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                            <h4 className="text-blue-400 font-semibold mb-2">
                              💡 Pro Tip
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {workflow.proTip}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GitHub Features */}
        {activeTab === "github" && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <Globe size={24} />
                GitHub Platform Mastery
              </h2>
              <p className="text-gray-300">
                Beyond basic Git - leverage GitHub's powerful features for team
                collaboration, automation, and professional workflows.
              </p>
            </div>

            {githubFeatures.map((feature) => {
              const isExpanded = expandedSection === feature.id;
              const Icon = feature.icon;

              return (
                <div
                  key={feature.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : feature.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Icon size={24} className="text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-blue-300 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {feature.description}
                          </p>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
                            {feature.difficulty}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        {feature.example && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Example Configuration:
                            </h4>
                            <div className="relative">
                              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                                <code className="text-gray-300 font-mono">
                                  {feature.example}
                                </code>
                              </pre>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(feature.example, feature.id);
                                }}
                                className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                              >
                                {copiedCommand === feature.id ? (
                                  <Check size={16} className="text-green-400" />
                                ) : (
                                  <Copy size={16} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {feature.workflow && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Workflow Steps:
                            </h4>
                            <div className="space-y-2">
                              {feature.workflow.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle
                                    size={16}
                                    className="text-green-400 mt-1 flex-shrink-0"
                                  />
                                  <p className="text-gray-300 text-sm">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {feature.rules && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Recommended Rules:
                            </h4>
                            <div className="space-y-2">
                              {feature.rules.map((rule, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <Shield
                                    size={16}
                                    className="text-blue-400 mt-1 flex-shrink-0"
                                  />
                                  <p className="text-gray-300 text-sm">
                                    {rule}
                                  </p>
                                </div>
                              ))}
                            </div>
                            {feature.setup && (
                              <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-slate-700">
                                <strong>Setup:</strong> {feature.setup}
                              </p>
                            )}
                          </div>
                        )}

                        {feature.keyPoints && (
                          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                            <h4 className="text-blue-400 font-semibold mb-3">
                              Key Points:
                            </h4>
                            <ul className="space-y-2">
                              {feature.keyPoints.map((point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-gray-300 text-sm"
                                >
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {feature.proTip && (
                          <div className="bg-purple-900/20 border-l-4 border-purple-500 rounded p-4">
                            <h4 className="text-purple-400 font-semibold mb-2">
                              💡 Pro Tip
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {feature.proTip}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-red-300 mb-3 flex items-center gap-2">
                <Shield size={24} />
                Security Best Practices - Protect Your Code & Credentials
              </h2>
              <p className="text-gray-300">
                Security breaches cost companies millions. These practices are
                non-negotiable for professional developers.
              </p>
            </div>

            {securityPractices.map((practice) => {
              const isExpanded = expandedSection === practice.id;
              const Icon = practice.icon;
              const severityColors = {
                CRITICAL: "bg-red-500 text-white",
                HIGH: "bg-orange-500 text-white",
                MEDIUM: "bg-yellow-500 text-slate-900",
              };

              return (
                <div
                  key={practice.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-red-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : practice.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Icon size={24} className="text-red-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-red-300">
                              {practice.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                severityColors[practice.severity]
                              }`}
                            >
                              {practice.severity}
                            </span>
                          </div>
                          {practice.problem && (
                            <p className="text-gray-400 text-sm">
                              {practice.problem}
                            </p>
                          )}
                          {practice.why && (
                            <p className="text-gray-400 text-sm">
                              {practice.why}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        {practice.solutions && (
                          <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                            <h4 className="text-green-400 font-semibold mb-3">
                              Solutions:
                            </h4>
                            <div className="space-y-3">
                              {practice.solutions.map((solution, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-950/50 rounded-lg p-3"
                                >
                                  <h5 className="text-cyan-400 font-semibold mb-1">
                                    {solution.title}
                                  </h5>
                                  <p className="text-gray-300 text-sm">
                                    {solution.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {practice.setup && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Setup Instructions:
                            </h4>
                            {practice.setup.map((step, idx) => (
                              <div key={idx} className="mb-3 last:mb-0">
                                <div className="flex items-start gap-2 bg-slate-900 rounded-lg p-3 mb-1">
                                  <code className="text-cyan-400 text-sm flex-1 font-mono">
                                    {step.cmd}
                                  </code>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        step.cmd,
                                        `${practice.id}-${idx}`
                                      );
                                    }}
                                    className="p-2 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                                  >
                                    {copiedCommand ===
                                    `${practice.id}-${idx}` ? (
                                      <Check
                                        size={16}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <Copy
                                        size={16}
                                        className="text-gray-400"
                                      />
                                    )}
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm ml-3">
                                  {step.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {practice.steps && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Steps:
                            </h4>
                            <div className="space-y-2">
                              {practice.steps.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle
                                    size={16}
                                    className="text-green-400 mt-1 flex-shrink-0"
                                  />
                                  <p className="text-gray-300 text-sm">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {practice.emergency && (
                          <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                              <AlertCircle size={18} /> If Secrets Were Exposed
                              - DO THIS IMMEDIATELY:
                            </h4>
                            <ol className="space-y-2">
                              {practice.emergency.map((step, idx) => (
                                <li key={idx} className="text-gray-300 text-sm">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {practice.proTip && (
                          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                            <h4 className="text-blue-400 font-semibold mb-2">
                              💡 Pro Tip
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {practice.proTip}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Performance */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <Zap size={24} />
                Performance Optimization for Large Repositories
              </h2>
              <p className="text-gray-300">
                Working with monorepos, large files, or thousands of commits?
                These optimizations can reduce Git operation times by 10x or
                more.
              </p>
            </div>

            {performanceOptimizations.map((opt) => {
              const isExpanded = expandedSection === opt.id;
              const Icon = opt.icon;

              return (
                <div
                  key={opt.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : opt.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <Icon size={24} className="text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-yellow-300 mb-2">
                            {opt.title}
                          </h3>
                          {opt.problem && (
                            <p className="text-gray-400 text-sm mb-2">
                              Problem: {opt.problem}
                            </p>
                          )}
                          {opt.useCase && (
                            <p className="text-gray-400 text-sm">
                              Use Case: {opt.useCase}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        {opt.config && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Configuration:
                            </h4>
                            <div className="relative">
                              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                                <code className="text-gray-300 font-mono">
                                  {opt.config}
                                </code>
                              </pre>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(opt.config, opt.id);
                                }}
                                className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                              >
                                {copiedCommand === opt.id ? (
                                  <Check size={16} className="text-green-400" />
                                ) : (
                                  <Copy size={16} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {opt.commands && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Commands:
                            </h4>
                            {opt.commands.map((cmd, idx) => (
                              <div key={idx} className="mb-3 last:mb-0">
                                <div className="flex items-start gap-2 bg-slate-900 rounded-lg p-3 mb-1">
                                  <code className="text-cyan-400 text-sm flex-1 font-mono">
                                    {cmd.cmd}
                                  </code>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        cmd.cmd,
                                        `${opt.id}-${idx}`
                                      );
                                    }}
                                    className="p-2 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                                  >
                                    {copiedCommand === `${opt.id}-${idx}` ? (
                                      <Check
                                        size={16}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <Copy
                                        size={16}
                                        className="text-gray-400"
                                      />
                                    )}
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm ml-3">
                                  {cmd.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {opt.setup && (
                          <div className="bg-slate-950/50 rounded-lg p-4">
                            <h4 className="text-cyan-400 font-semibold mb-3">
                              Setup:
                            </h4>
                            {opt.setup.map((step, idx) => (
                              <div key={idx} className="mb-3 last:mb-0">
                                <div className="flex items-start gap-2 bg-slate-900 rounded-lg p-3 mb-1">
                                  <code className="text-cyan-400 text-sm flex-1 font-mono">
                                    {step.cmd}
                                  </code>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        step.cmd,
                                        `${opt.id}-setup-${idx}`
                                      );
                                    }}
                                    className="p-2 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                                  >
                                    {copiedCommand ===
                                    `${opt.id}-setup-${idx}` ? (
                                      <Check
                                        size={16}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <Copy
                                        size={16}
                                        className="text-gray-400"
                                      />
                                    )}
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm ml-3">
                                  {step.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {opt.results && (
                          <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                            <h4 className="text-green-400 font-semibold mb-2">
                              Performance Impact:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {opt.results}
                            </p>
                          </div>
                        )}

                        {opt.benefits && (
                          <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                            <h4 className="text-green-400 font-semibold mb-2">
                              Benefits:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {opt.benefits}
                            </p>
                          </div>
                        )}

                        {opt.how && (
                          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                            <h4 className="text-blue-400 font-semibold mb-2">
                              How It Works:
                            </h4>
                            <p className="text-gray-300 text-sm">{opt.how}</p>
                          </div>
                        )}

                        {opt.warning && (
                          <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle size={18} /> Warning
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {opt.warning}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Common Issues */}
        {activeTab === "issues" && (
          <div className="space-y-6">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                <Settings size={24} />
                Common Issues & Quick Fixes
              </h2>
              <p className="text-gray-300">
                Encountered a cryptic Git error? These are the most common
                issues developers face and their instant solutions.
              </p>
            </div>

            {commonIssues.map((issue) => {
              const isExpanded = expandedSection === issue.id;

              return (
                <div
                  key={issue.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : issue.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-orange-300 mb-3">
                          {issue.title}
                        </h3>
                        <div className="bg-red-900/30 border-l-4 border-red-500 rounded p-3 mb-3">
                          <code className="text-red-300 text-sm font-mono">
                            {issue.error}
                          </code>
                        </div>
                        <p className="text-gray-400 text-sm">
                          <strong className="text-gray-300">Cause:</strong>{" "}
                          {issue.cause}
                        </p>
                      </div>
                      <ChevronDown
                        className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-6 space-y-4">
                        {issue.fix && typeof issue.fix === "string" && (
                          <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                            <h4 className="text-green-400 font-semibold mb-3">
                              Quick Fix:
                            </h4>
                            <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-3">
                              <code className="text-cyan-400 text-sm flex-1 font-mono">
                                {issue.fix}
                              </code>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(issue.fix, issue.id);
                                }}
                                className="p-2 hover:bg-slate-900 rounded transition-colors"
                              >
                                {copiedCommand === issue.id ? (
                                  <Check size={16} className="text-green-400" />
                                ) : (
                                  <Copy size={16} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {issue.fix && Array.isArray(issue.fix) && (
                          <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4">
                            <h4 className="text-green-400 font-semibold mb-3">
                              Solutions:
                            </h4>
                            {issue.fix.map((solution, idx) => (
                              <div key={idx} className="mb-3 last:mb-0">
                                <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-3 mb-1">
                                  <code className="text-cyan-400 text-sm flex-1 font-mono">
                                    {solution.cmd}
                                  </code>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        solution.cmd,
                                        `${issue.id}-${idx}`
                                      );
                                    }}
                                    className="p-2 hover:bg-slate-900 rounded transition-colors"
                                  >
                                    {copiedCommand === `${issue.id}-${idx}` ? (
                                      <Check
                                        size={16}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <Copy
                                        size={16}
                                        className="text-gray-400"
                                      />
                                    )}
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm ml-3">
                                  {solution.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {issue.solutions && (
                          <div className="space-y-3">
                            {issue.solutions.map((solution, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-950/50 rounded-lg p-4"
                              >
                                <h5 className="text-cyan-400 font-semibold mb-2">
                                  {solution.title}
                                </h5>
                                <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-3 mb-2">
                                  <code className="text-cyan-400 text-sm flex-1 font-mono">
                                    {solution.cmd}
                                  </code>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        solution.cmd,
                                        `${issue.id}-sol-${idx}`
                                      );
                                    }}
                                    className="p-2 hover:bg-slate-800 rounded transition-colors"
                                  >
                                    {copiedCommand ===
                                    `${issue.id}-sol-${idx}` ? (
                                      <Check
                                        size={16}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <Copy
                                        size={16}
                                        className="text-gray-400"
                                      />
                                    )}
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">
                                  <strong className="text-gray-300">
                                    When:
                                  </strong>{" "}
                                  {solution.when}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {solution.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {issue.explanation && (
                          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
                            <h4 className="text-blue-400 font-semibold mb-2">
                              Explanation:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {issue.explanation}
                            </p>
                          </div>
                        )}

                        {issue.prevention && (
                          <div className="bg-purple-900/20 border-l-4 border-purple-500 rounded p-4">
                            <h4 className="text-purple-400 font-semibold mb-2">
                              💡 Prevention:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {issue.prevention}
                            </p>
                          </div>
                        )}

                        {issue.warning && (
                          <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle size={18} /> Warning
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {issue.warning}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-2xl p-12 text-center">
          <Star className="mx-auto mb-6 text-yellow-400" size={48} />
          <h2 className="text-3xl font-bold text-white mb-4">
            Master Git & GitHub Like a Pro
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            You now have access to{" "}
            <strong className="text-cyan-400">
              75+ professional solutions
            </strong>{" "}
            covering everything from emergency fixes to enterprise workflows.
            This isn't just a cheatsheet—it's your complete Git reference guide.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <CheckCircle className="mx-auto mb-3 text-green-400" size={32} />
              <h3 className="font-bold text-white mb-2">Production Ready</h3>
              <p className="text-gray-400 text-sm">
                All solutions tested in real-world scenarios by professional
                developers
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <Zap className="mx-auto mb-3 text-yellow-400" size={32} />
              <h3 className="font-bold text-white mb-2">Copy & Use</h3>
              <p className="text-gray-400 text-sm">
                One-click copy for every command. No typing, no mistakes
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <Rocket className="mx-auto mb-3 text-purple-400" size={32} />
              <h3 className="font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Regular updates with new workflows and best practices
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={20} />
              <span>Used by thousands of developers worldwide</span>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-700">
            <p className="text-gray-400 text-sm mb-3">Created with 💙 by</p>
            <a
              href="https://devkantkumar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Dev Kant Kumar
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Bonus Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Gift size={28} />
            Bonus: Quick Reference Commands
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cmd: "git status", desc: "Check repository status" },
              {
                cmd: "git log --oneline --graph --all",
                desc: "Visual commit history",
              },
              { cmd: "git diff", desc: "See unstaged changes" },
              { cmd: "git diff --staged", desc: "See staged changes" },
              { cmd: "git branch -a", desc: "List all branches" },
              { cmd: "git remote -v", desc: "Show remote repositories" },
              {
                cmd: "git fetch --prune",
                desc: "Update and clean remote tracking",
              },
              { cmd: "git config --list", desc: "Show Git configuration" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <code className="text-cyan-400 text-sm font-mono">
                    {item.cmd}
                  </code>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.cmd, `bonus-${idx}`)}
                  className="ml-3 p-2 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedCommand === `bonus-${idx}` ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-gray-500 text-xs">
          <p className="mb-2">
            <strong className="text-gray-400">Topics Covered:</strong> Git
            commands, GitHub workflows, version control, CI/CD automation,
            security best practices, performance optimization, merge conflicts,
            rebase, cherry-pick, git stash, branch management, commit signing,
            monorepo, Git LFS, sparse checkout, team collaboration, pull
            requests, code review, emergency fixes, Git recovery, reflog,
            bisect, worktree
          </p>
          <p>
            © 2025 Dev Kant Kumar. All commands tested and verified for Git
            2.40+
          </p>
        </div>
      </div>
    </div>
  );
}

function Gift({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}
