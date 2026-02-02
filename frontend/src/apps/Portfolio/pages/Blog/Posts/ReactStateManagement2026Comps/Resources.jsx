import { ExternalLink, Book, Users, Video, FileText, Code, Wrench } from 'lucide-react';

const Resources = () => {
  const officialDocs = [
    {
      name: 'TanStack Query',
      url: 'https://tanstack.com/query/latest',
      desc: 'Official docs for server state management',
      category: 'Server State'
    },
    {
      name: 'Zustand',
      url: 'https://github.com/pmndrs/zustand',
      desc: 'Lightweight client state management',
      category: 'Client State'
    },
    {
      name: 'Redux Toolkit',
      url: 'https://redux-toolkit.js.org/',
      desc: 'Enterprise-grade state management',
      category: 'Enterprise'
    },
    {
      name: 'React Context',
      url: 'https://react.dev/learn/passing-data-deeply-with-context',
      desc: 'Built-in React state sharing',
      category: 'Built-in'
    },
  ];

  const tools = [
    {
      name: 'React Query DevTools',
      url: 'https://tanstack.com/query/latest/docs/react/devtools',
      desc: 'Debug your server state with visual tools',
      icon: Wrench
    },
    {
      name: 'Redux DevTools',
      url: 'https://github.com/reduxjs/redux-devtools',
      desc: 'Time-travel debugging for Redux',
      icon: Wrench
    },
    {
      name: 'Bundlephobia',
      url: 'https://bundlephobia.com/',
      desc: 'Check bundle size before installing',
      icon: Code
    },
    {
      name: 'NPM Trends',
      url: 'https://npmtrends.com/zustand-vs-redux-vs-jotai-vs-recoil',
      desc: 'Compare library popularity trends',
      icon: Code
    }
  ];

  const articles = [
    {
      title: 'You Might Not Need Redux',
      author: 'Dan Abramov',
      url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
      desc: 'When to (and not to) use Redux'
    },
    {
      title: 'React Query in 100 Seconds',
      author: 'Fireship',
      url: 'https://www.youtube.com/watch?v=novnyCaa7To',
      desc: 'Quick intro to React Query'
    },
    {
      title: 'Server State vs Client State',
      author: 'Kent C. Dodds',
      url: 'https://kentcdodds.com/blog/application-state-management-with-react',
      desc: 'Understanding the distinction'
    },
    {
      title: 'Zustand Best Practices',
      author: 'TkDodo',
      url: 'https://tkdodo.eu/blog/working-with-zustand',
      desc: 'Advanced patterns and tips'
    }
  ];

  const communities = [
    {
      name: 'React Query Discord',
      url: 'https://discord.com/invite/react-query',
      members: '20K+ members',
      desc: 'Get help with TanStack Query'
    },
    {
      name: 'Reactiflux Discord',
      url: 'https://www.reactiflux.com/',
      members: '200K+ members',
      desc: 'General React community'
    },
    {
      name: 'r/reactjs',
      url: 'https://reddit.com/r/reactjs',
      members: '700K+ members',
      desc: 'Reddit community for React'
    },
    {
      name: 'State of React Survey',
      url: 'https://stateofjs.com/react',
      members: 'Annual trends',
      desc: 'Industry trends and statistics'
    }
  ];

  return (
    <section className="py-16 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Resources & Further Reading
          </h2>
          <p className="text-lg text-slate-300">
            Everything you need to master React state management
          </p>
        </div>

        {/* Official Documentation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Book className="text-indigo-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Official Documentation</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {officialDocs.map((res) => (
              <a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {res.name}
                    </h4>
                    <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                      {res.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{res.desc}</p>
                </div>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors ml-4 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Tools & DevTools */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="text-emerald-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Tools & DevTools</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <tool.icon size={20} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-slate-400">{tool.desc}</p>
                </div>
                <ExternalLink size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Recommended Reading */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Recommended Reading</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {articles.map((article) => (
              <a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {article.title}
                  </h4>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
                <p className="text-sm text-slate-400 mb-2">{article.desc}</p>
                <p className="text-xs text-slate-500">By {article.author}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Community Resources */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-purple-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Community & Support</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {communities.map((community) => (
              <a
                key={community.name}
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-purple-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors mb-1">
                    {community.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-1">{community.desc}</p>
                  <p className="text-xs text-purple-300">{community.members}</p>
                </div>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors ml-4 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
