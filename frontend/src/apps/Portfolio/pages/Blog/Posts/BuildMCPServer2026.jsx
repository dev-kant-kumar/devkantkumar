import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import React from "react";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Boxes,
  Check,
  Clock,
  Copy,
  Cpu,
  FileText,
  Plug,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  User,
  Wrench,
} from "lucide-react";

// Register only the languages used in this post (keeps the bundle small).
// The github-dark hljs theme is imported globally in BlogPost.jsx.
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);

// Self hosted brand logos reused from the AI coding tools post.
const LOGOS = {
  claude: "/images/blog/logos/claude-code.png",
  cursor: "/images/blog/logos/cursor.png",
  copilot: "/images/blog/logos/github-copilot.png",
};

function ToolLogo({ src, alt, size = 26 }) {
  return (
    <span className="not-prose inline-flex flex-shrink-0 align-middle">
      <img
        src={src}
        alt={`${alt} logo`}
        width={size}
        height={size}
        loading="lazy"
        style={{ width: size, height: size }}
        className="rounded-md bg-white/5 border border-slate-700/50 object-contain p-0.5"
      />
    </span>
  );
}

// Editor-style code block: window chrome, line-number gutter, and highlight.js
// syntax coloring (github-dark theme, imported globally in BlogPost.jsx).
// not-prose keeps the article's prose styles from fighting the editor look.
function CodeBlock({ language = "bash", filename, code }) {
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

  const trimmed = code.trim();

  const highlightedHtml = React.useMemo(() => {
    try {
      const lang = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(trimmed, { language: lang }).value;
    } catch {
      return trimmed
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  }, [trimmed, language]);

  const lineCount = trimmed.split("\n").length;

  return (
    <div
      className="not-prose relative my-8 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-cyan-500/5"
      style={{ background: "#0d1117" }}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <Terminal size={14} className="text-cyan-400 ml-1" />
          <span className="px-2.5 py-1 rounded-md bg-cyan-900/40 text-cyan-300 border border-cyan-700/40 font-mono font-semibold text-xs">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400 text-xs">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-xs font-medium"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-emerald-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body with line-number gutter */}
      <div className="flex overflow-x-auto" style={{ background: "transparent" }}>
        <div
          aria-hidden="true"
          className="select-none flex-shrink-0 border-r border-slate-700/40 text-right font-mono text-sm leading-loose text-slate-600 py-6 pr-4 pl-4"
          style={{ minWidth: `${String(lineCount).length * 0.65 + 3}ch` }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>
        <pre
          className="m-0 pl-5 pr-6 py-6 flex-1 text-sm leading-loose hljs overflow-x-visible"
          style={{ background: "transparent" }}
        >
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            style={{ background: "transparent", padding: 0 }}
          />
        </pre>
      </div>
    </div>
  );
}

function InfoBox({ type = "info", title, icon, children }) {
  const Icon = icon || Sparkles;
  const styles = {
    info: "from-cyan-950/40 border-cyan-500/30 text-cyan-300",
    success: "from-emerald-950/40 border-emerald-500/30 text-emerald-300",
    warning: "from-amber-950/40 border-amber-500/30 text-amber-300",
    tip: "from-violet-950/40 border-violet-500/30 text-violet-300",
  };
  return (
    <div
      className={`not-prose my-8 rounded-2xl border bg-gradient-to-br to-transparent p-6 ${styles[type]}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={20} />
        <span className="font-bold text-white">{title}</span>
      </div>
      <div className="text-slate-300 text-base leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function FeaturedImage({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-950 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 text-sm font-medium">
            Hands on Tutorial for 2026
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Bot size={28} className="text-cyan-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Plug size={40} className="text-cyan-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Server size={28} className="text-emerald-400" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Build Your First </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500">
            MCP Server
          </span>
        </h2>

        <p className="text-slate-400 text-lg">
          Connect Claude, Cursor, and Copilot to your own tools
        </p>
      </div>
    </div>
  );
}

function CardImage({ className = "h-48" }) {
  return (
    <div
      className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 ${className}`}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Plug size={32} className="text-cyan-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-cyan-50">
          Build Your First MCP Server
        </span>
      </div>
    </div>
  );
}

function ArticleMetadata() {
  return (
    <div className="py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm px-6">
        <div className="flex items-center gap-2">
          <User size={16} className="text-cyan-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-cyan-400" />
          <span>16 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-cyan-400" />
          <span>Beginner Friendly</span>
        </div>
      </div>
    </div>
  );
}

const PY_INSTALL = `# Create a project folder and a virtual environment
mkdir weather-mcp && cd weather-mcp
python -m venv .venv

# Activate it
# macOS or Linux:
source .venv/bin/activate
# Windows (PowerShell):
.venv\\Scripts\\Activate.ps1

# Install the official MCP SDK (ships FastMCP)
pip install "mcp[cli]"`;

const PY_SERVER = `# server.py
from mcp.server.fastmcp import FastMCP

# Give your server a clear, unique name.
mcp = FastMCP("weather-demo")

@mcp.tool()
def get_forecast(city: str) -> str:
    """Return a short weather forecast for a city."""
    # In a real server you would call a weather API here.
    # We keep it simple so you can see the whole flow first.
    return f"The weather in {city} is sunny, 27 degrees C."

if __name__ == "__main__":
    # stdio is the default transport for local servers.
    mcp.run()`;

const PY_RUN = `python server.py`;

const INSPECTOR = `# The Inspector launches your server and gives you a UI
# to list tools and call them, with no AI model involved.
npx @modelcontextprotocol/inspector python server.py`;

const CLAUDE_CONFIG_PY = `{
  "mcpServers": {
    "weather-demo": {
      "command": "python",
      "args": ["/absolute/path/to/weather-mcp/server.py"]
    }
  }
}`;

const TS_INSTALL = `mkdir weather-mcp && cd weather-mcp
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node`;

const TS_SERVER = `// index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "weather-demo", version: "1.0.0" });

server.registerTool(
  "get_forecast",
  {
    title: "Get forecast",
    description: "Return a short weather forecast for a city.",
    inputSchema: { city: z.string().describe("City name, e.g. Mumbai") },
  },
  async ({ city }) => {
    // In a real server you would call a weather API here.
    const text = "The weather in " + city + " is sunny, 27 degrees C.";
    return { content: [{ type: "text", text }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);`;

const CLAUDE_CONFIG_TS = `{
  "mcpServers": {
    "weather-demo": {
      "command": "node",
      "args": ["/absolute/path/to/weather-mcp/build/index.js"]
    }
  }
}`;

function BuildMCPServer2026() {
  return (
    <div className="min-h-screen">
      <FeaturedImage />
      <ArticleMetadata />

      <article className="py-12 px-6">
        <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
          If you have used an AI coding tool this year, you have probably heard
          people talk about MCP. Here is how to actually build one, start to
          finish, in about twenty minutes.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          The Model Context Protocol is having a moment. It is the standard that
          lets AI assistants like Claude, Cursor, and Copilot talk to outside
          tools in a consistent way, and developers are searching for how to
          build one more than twenty thousand times a month. The problem is that
          most of what you find online is either the raw specification or a wall
          of theory. This guide is the opposite. We will build a working server
          you can talk to from Claude, and I will explain each piece as we go.
        </p>

        <div className="not-prose my-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <span className="text-slate-400 text-sm font-medium">
            Works with:
          </span>
          <span className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <ToolLogo src={LOGOS.claude} alt="Claude" /> Claude
          </span>
          <span className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <ToolLogo src={LOGOS.cursor} alt="Cursor" /> Cursor
          </span>
          <span className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <ToolLogo src={LOGOS.copilot} alt="GitHub Copilot" /> Copilot
          </span>
        </div>

        <InfoBox type="success" title="What you will have by the end" icon={Rocket}>
          <p>
            A running MCP server with a working tool, tested in the MCP
            Inspector, and connected to Claude Desktop so you can ask Claude to
            call it in plain English. You will see the exact code in both Python
            and TypeScript.
          </p>
        </InfoBox>

        {/* What is it */}
        <h2 id="what-is-mcp" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          What is an MCP server, in plain English
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Think of MCP as a universal adapter for AI. Before it, every tool that
          wanted to plug into an AI assistant needed its own custom integration,
          which meant the same work rebuilt over and over. MCP fixes that with
          one shared protocol. You build a server once, and any MCP aware client,
          whether that is Claude, Cursor, or a growing list of others, can use
          it.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          People often call it the USB-C of AI tools, and the comparison fits. A
          single standard plug, and everything speaks the same language. Your
          server is the device. The AI assistant is the laptop. MCP is the port
          in between. If you have read my guide on{" "}
          <a href="/blog/best-ai-coding-tools-2026">the best AI coding tools</a>,
          this is the plumbing that lets those tools reach into your own systems.
        </p>

        {/* Three primitives */}
        <h2 id="three-primitives" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          The three things an MCP server can expose
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          An MCP server can offer three kinds of building blocks. You do not need
          all three, and most first servers use only the first one, but it helps
          to know the map before you start.
        </p>

        <div className="not-prose my-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Wrench size={18} className="text-cyan-400" />
              <h3 className="text-white font-bold">Tools</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Actions the AI can take, like search a database, send an email, or
              call an API. This is what you will build today.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-cyan-400" />
              <h3 className="text-white font-bold">Resources</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Read only data the AI can pull in as context, like a file, a
              document, or a row from your database.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Boxes size={18} className="text-cyan-400" />
              <h3 className="text-white font-bold">Prompts</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reusable prompt templates a user can trigger, like a saved
              workflow for a common task.
            </p>
          </div>
        </div>

        <InfoBox type="info" title="Tools are the star" icon={Wrench}>
          <p>
            For your first server, focus entirely on a tool. Once one tool works
            end to end, adding resources and prompts is a small step. Do not try
            to learn all three at once.
          </p>
        </InfoBox>

        {/* Prerequisites */}
        <h2 id="prerequisites" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          What you need before you start
        </h2>

        <ul className="space-y-3 mb-8 list-none">
          <li className="flex items-start gap-3">
            <Check size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              Python 3.10 or newer, or Node.js 18 or newer, depending on which
              version you follow.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              The Claude Desktop app installed, so you can connect your server to
              a real client.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              Comfort running commands in a terminal. That is the only hard
              requirement.
            </span>
          </li>
        </ul>

        {/* Python build */}
        <h2 id="python-server" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Build an MCP server in Python, the fast way
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Python is the quickest path because the official SDK ships with
          FastMCP, a helper that turns a plain function into an MCP tool with a
          single decorator. Start by setting up a project and installing the SDK.
        </p>

        <CodeBlock language="bash" filename="setup" code={PY_INSTALL} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Now create a file called <code>server.py</code>. This is the entire
          server. Read the comments, because every line earns its place.
        </p>

        <CodeBlock language="python" filename="server.py" code={PY_SERVER} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          That is genuinely all it takes. The <code>@mcp.tool()</code> decorator
          reads your function name, its type hints, and its docstring, then turns
          all of that into a tool the AI can discover and call. The type hint on{" "}
          <code>city</code> becomes input validation for free. Run it to make
          sure nothing is broken.
        </p>

        <CodeBlock language="bash" filename="run" code={PY_RUN} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          If the command sits there quietly without an error, that is a good
          sign. A stdio server communicates over standard input and output, so it
          is supposed to wait silently for a client. Press Ctrl C to stop it, and
          let us test it properly.
        </p>

        {/* Inspector */}
        <h2 id="inspector" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Test it with the MCP Inspector first
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Before you wire anything into Claude, test the server on its own. The
          MCP Inspector is an official tool that launches your server and gives
          you a web UI to list its tools and call them by hand. No AI model is
          involved, so if something is wrong you find out here instead of
          wondering why Claude is silent.
        </p>

        <CodeBlock language="bash" filename="inspector" code={INSPECTOR} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          It opens a page in your browser. Click to list the tools, find{" "}
          <code>get_forecast</code>, type a city into the argument box, and run
          it. If you get your forecast text back, your server works. This one
          habit will save you hours over the next few months.
        </p>

        {/* Connect to Claude */}
        <h2 id="connect-claude" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Connect your server to Claude Desktop
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Claude Desktop reads a small config file that lists the MCP servers it
          should start. You point it at your server, restart the app, and Claude
          can use your tool. First, open the config file. You will find it here:
        </p>

        <ul className="space-y-3 mb-8 list-none">
          <li className="flex items-start gap-3">
            <Cpu size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">macOS:</strong>{" "}
              <code>
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Cpu size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">Windows:</strong>{" "}
              <code>%APPDATA%\Claude\claude_desktop_config.json</code>
            </span>
          </li>
        </ul>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          If the file does not exist yet, create it. Add your server like this,
          and use the full absolute path to your file, not a relative one.
        </p>

        <CodeBlock language="json" filename="claude_desktop_config.json" code={CLAUDE_CONFIG_PY} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Save the file and fully restart Claude Desktop. Once it reopens, you
          will see a tools icon in the message box. Ask Claude something like
          "what is the weather in Mumbai," and it will call your{" "}
          <code>get_forecast</code> tool and answer using what your server
          returns. That is the whole loop, and you built it.
        </p>

        <InfoBox type="tip" title="It also works in Cursor" icon={Plug}>
          <p>
            Cursor and several other clients read a similar MCP config. Once your
            server speaks the protocol, the same code works across every MCP
            aware tool. Build once, use everywhere.
          </p>
        </InfoBox>

        {/* TypeScript */}
        <h2 id="typescript-server" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Prefer TypeScript? Here is the same server in Node
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          If your world is JavaScript, the official TypeScript SDK gives you the
          same result with a little more setup. Install the packages first.
        </p>

        <CodeBlock language="bash" filename="setup" code={TS_INSTALL} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Then write the server. It reads slightly longer than the Python
          version, but it is doing the same three jobs: create a server, register
          a tool with a schema, and connect a transport.
        </p>

        <CodeBlock language="typescript" filename="index.ts" code={TS_SERVER} />

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Compile it with <code>npx tsc</code>, then point Claude Desktop at the
          built JavaScript file instead of the Python one.
        </p>

        <CodeBlock language="json" filename="claude_desktop_config.json" code={CLAUDE_CONFIG_TS} />

        {/* Transports */}
        <h2 id="transports" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          stdio vs HTTP: local now, production later
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          You just used the stdio transport, where the client starts your server
          as a local process and they talk over standard input and output. It is
          perfect for a server that runs on your own machine, which is most first
          projects.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          When you want a server that lives on the internet and serves many
          users, you switch to the Streamable HTTP transport. The tool code you
          wrote does not change. You only swap how the server is exposed, and you
          add the things any public service needs.
        </p>

        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Question</th>
                <th className="px-4 py-3 font-semibold">stdio</th>
                <th className="px-4 py-3 font-semibold">Streamable HTTP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="px-4 py-3">Where it runs</td>
                <td className="px-4 py-3">Your own machine</td>
                <td className="px-4 py-3">A server on the internet</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Who can use it</td>
                <td className="px-4 py-3">Just you</td>
                <td className="px-4 py-3">Many users</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Setup effort</td>
                <td className="px-4 py-3">Almost none</td>
                <td className="px-4 py-3">More, plus auth</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Best for</td>
                <td className="px-4 py-3">Learning and personal tools</td>
                <td className="px-4 py-3">Shared, production servers</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Production */}
        <h2 id="production" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Going to production: what actually changes
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Do not jump to this until your local server works, but here is what the
          path looks like so it is not a mystery. Moving a server to production
          usually means four things:
        </p>

        <ol className="space-y-4 mb-8 list-decimal pl-6">
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">Switch to Streamable HTTP</strong> so
            clients can reach it over the network.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">Add authentication.</strong> The
            common choice is OAuth 2.1, so only allowed users can call your
            tools.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">Package it in Docker</strong> so it
            runs the same everywhere and is easy to deploy.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">Handle errors and limits</strong> like
            timeouts, rate limits, and clear messages when a tool call fails.
          </li>
        </ol>

        <InfoBox type="warning" title="Never skip auth on a public server" icon={AlertTriangle}>
          <p>
            A local stdio server only you can start is safe by nature. A public
            HTTP server that runs actions is not. If your tools can touch real
            data or systems, treat authentication as a requirement, not an
            afterthought.
          </p>
        </InfoBox>

        {/* Troubleshooting */}
        <h2 id="troubleshooting" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Common mistakes and how to fix them
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          When a server does not show up in Claude, it is almost always one of
          these. Check them in order.
        </p>

        <ol className="space-y-4 mb-8 list-decimal pl-6">
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">A relative path in the config.</strong>{" "}
            Claude cannot guess where your file is. Use the full absolute path.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">You did not restart Claude.</strong>{" "}
            The config is read on startup. Quit the app completely and reopen it,
            do not just close the window.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">Broken JSON.</strong> A missing comma
            or a stray bracket makes the whole file invalid. Paste it into a JSON
            validator if the server will not load.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">The wrong Python.</strong> If you
            installed the SDK inside a virtual environment, point the config at
            that environment's Python, or the import will fail.
          </li>
          <li className="text-slate-300 leading-relaxed">
            <strong className="text-white">You skipped the Inspector.</strong> If
            you are not sure whether the problem is your server or the config,
            test with the Inspector first. It removes half the guesswork.
          </li>
        </ol>

        {/* Where next */}
        <h2 id="where-next" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Where to go from here
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Your weather tool is a toy, on purpose, so you could see the whole
          shape without noise. The real power shows up when the tool does
          something only you can offer. A few ideas that make great second
          projects:
        </p>

        <ul className="space-y-3 mb-8 list-none">
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              A tool that queries your own database so Claude can answer
              questions about your data.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              A tool that reads and writes your notes, tickets, or project files.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-cyan-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              A tool that wraps an internal API your team already uses every day.
            </span>
          </li>
        </ul>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          There are already hundreds of community built MCP servers for tools
          like GitHub, Slack, Postgres, Stripe, and Docker, so you rarely start
          from zero. If you want to understand the bigger picture of AI agents
          that use tools like this, read my guide on{" "}
          <a href="/blog/agentic-ai-guide">building AI agents that work</a>.
        </p>

        {/* Bottom line */}
        <h2 id="bottom-line" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          The bottom line
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          MCP looks intimidating from the outside, but the core is small. Create
          a server, register a tool, connect a transport, and point a client at
          it. Everything else, the resources, the prompts, the production setup,
          is built on top of that same simple loop. You now have the loop
          working, which is the part most people never get past.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Build the weather server today, then replace the tool with something
          real tomorrow. The moment Claude calls a tool you wrote and does
          something useful with the result, the whole idea clicks, and you will
          not look at AI assistants the same way again.
        </p>

        {/* FAQ */}
        <h2 id="faq" className="text-2xl lg:text-3xl font-bold text-white mt-16 mb-6 border-b border-slate-800/60 pb-4">
          Frequently asked questions
        </h2>

        <div className="space-y-6">
          {BuildMCPServer2026.info.faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

BuildMCPServer2026.FeaturedImage = FeaturedImage;
BuildMCPServer2026.Image = CardImage;
BuildMCPServer2026.CardImage = CardImage;

BuildMCPServer2026.info = {
  id: "how-to-build-mcp-server-2026",
  slug: "how-to-build-mcp-server-2026",
  title: "How to Build Your First MCP Server in 2026 (Step by Step)",
  excerpt:
    "A hands on guide to building a Model Context Protocol server in Python and TypeScript, testing it with the MCP Inspector, and connecting it to Claude, Cursor, and Copilot. No fluff, real code.",
  description:
    "Learn how to build an MCP server in 2026 step by step. Full Python and TypeScript code, test with the MCP Inspector, and connect to Claude Desktop, Cursor, and Copilot.",
  category: "AI Engineering",
  author: "Dev Kant Kumar",
  readTime: "16 min read",
  image: "/images/blog/how-to-build-mcp-server-2026.png",
  featuredImage: "/images/blog/how-to-build-mcp-server-2026.png",
  featured: true,
  publishDate: "2026-07-10",
  modifiedDate: "2026-07-10",
  keywords:
    "how to build mcp server, mcp server tutorial, model context protocol tutorial, build mcp server python, fastmcp tutorial, mcp server typescript, connect mcp to claude, mcp server 2026, what is mcp server, claude desktop mcp, mcp inspector",
  tags: [
    "MCP",
    "Model Context Protocol",
    "AI Tools",
    "Claude",
    "Python",
    "TypeScript",
    "AI Agents",
    "Developer Tools",
  ],
  faqs: [
    {
      question: "What is an MCP server?",
      answer:
        "An MCP server is a small program that exposes tools, data, or prompts to AI assistants through the Model Context Protocol. It lets clients like Claude, Cursor, and Copilot call your own functions and read your own data in a standard way, so you build the integration once and any MCP aware client can use it.",
    },
    {
      question: "Do I need Python or TypeScript to build an MCP server?",
      answer:
        "Either works. Python is the fastest start because the official SDK ships FastMCP, which turns a function into a tool with one decorator. The official TypeScript SDK gives you the same result with a bit more setup. MCP also has SDKs for Java, Kotlin, C#, Rust, and Swift.",
    },
    {
      question: "How do I connect an MCP server to Claude?",
      answer:
        "Open Claude Desktop's claude_desktop_config.json file, add your server under the mcpServers key with the command and the absolute path to your server file, then fully restart Claude Desktop. A tools icon appears and Claude can call your tool when you ask in plain English.",
    },
    {
      question: "What is the MCP Inspector?",
      answer:
        "The MCP Inspector is an official tool you run with npx @modelcontextprotocol/inspector. It launches your server and gives you a web UI to list and call its tools by hand, with no AI model involved, so you can confirm the server works before connecting it to a client.",
    },
    {
      question: "What is the difference between stdio and HTTP transports?",
      answer:
        "stdio runs your server as a local process that talks over standard input and output, which is ideal for personal tools on your own machine. Streamable HTTP exposes the server over the network for many users and production use, and it usually adds authentication such as OAuth 2.1. Your tool code stays the same either way.",
    },
    {
      question: "Is it safe to run an MCP server?",
      answer:
        "A local stdio server that only you can start is safe by nature. A public HTTP server that can run actions or touch real data needs authentication and careful error handling. Never expose a production MCP server without auth if its tools can affect real systems.",
    },
  ],
};

export default BuildMCPServer2026;
