import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { localPosts } from "../postsLocal";

const RelatedPosts = ({ currentSlug, tags = [], category }) => {
  const related = useMemo(() => {
    // Filter localPosts to find related ones
    const candidates = localPosts.filter((post) => post.meta.slug !== currentSlug);

    const scored = candidates.map((post) => {
      let score = 0;
      // Category match
      if (category && post.meta.category === category) score += 3;
      // Tag matches
      if (tags && post.meta.tags) {
        const matchingTags = post.meta.tags.filter((t) => tags.includes(t));
        score += matchingTags.length;
      }
      return { ...post, score };
    });

    const withScore = scored.filter(p => p.score > 0).sort((a, b) => b.score - a.score);

    // Fill with latest if strictly related are few
    let final = withScore;
    if (final.length < 3) {
        const remaining = candidates.filter(c => !final.find(f => f.meta.slug === c.meta.slug));
        // Sort remaining by date
        remaining.sort((a, b) => new Date(b.meta.publishDate) - new Date(a.meta.publishDate));
        final = [...final, ...remaining].slice(0, 3);
    } else {
        final = final.slice(0, 3);
    }

    return final;
  }, [currentSlug, tags, category]);

  if (related.length === 0) return null;

  return (
    <section className="py-16 bg-slate-900/30 border-t border-slate-800 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-cyan-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Read Next</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((post) => (
              <Link
                key={post.meta.id}
                to={`/blog/${post.meta.slug}`}
                className="group block bg-slate-900/60 border border-slate-800/60 rounded-xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Image Placeholder or Actual Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                   {(() => {
                        const ImgComp = post.Component?.CardImage || post.Component?.Image || post.Component?.FeaturedImage;
                        if (ImgComp) {
                            return <ImgComp className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />;
                        }
                        if (post.meta.image) {
                             return (
                               <img
                                 src={post.meta.image}
                                 alt={post.meta.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                 loading="lazy"
                               />
                             );
                        }
                        return (
                           <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-800/50">
                               <Sparkles size={32} />
                           </div>
                        );
                   })()}

                   {/* Category Badge */}
                   <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-slate-950/70 backdrop-blur-md text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700/50 shadow-sm">
                        {post.meta.category}
                      </span>
                   </div>
                </div>

                <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {new Date(post.meta.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                         <span>•</span>
                        <span>{post.meta.readTime}</span>
                    </div>

                    <h4 className="text-white font-bold mb-3 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                        {post.meta.title}
                    </h4>

                     <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {post.meta.excerpt}
                     </p>

                    <div className="flex items-center text-sm text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform mt-auto">
                        Read Article <ArrowRight size={14} className="ml-1.5" />
                    </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
