import Giscus from '@giscus/react';
import { portfolioData } from "../../../store/data/portfolioData";

const GiscusComments = () => {
  const { giscusConfig } = portfolioData;

  if (!giscusConfig || !giscusConfig.repo) return null;

  return (
    <div className="w-full mt-10 p-6 sm:p-8 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-cyan-400">💬</span> Discussion
      </h3>
      <Giscus
        id="comments"
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default GiscusComments;
