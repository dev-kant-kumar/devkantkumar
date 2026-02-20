import { ArrowRight, Star } from "lucide-react";

const products = {
  habit: {
    title: "How To Practice Coding Every Day",
    subtitle: "Build a Consistent Coding Habit",
    description: "Stop guessing and start building. This e-book provides practical strategies, exercises, and routines to help you code regularly and improve steadily.",
    shortDesc: "The ultimate guide to building a daily coding habit.",
    author: "Han Shavir",
    price: "$27",
    link: "https://www.checkout-ds24.com/redir/633818/devkumar506768337/",
    color: "cyan",
    accent: "text-cyan-400",
    bgAccent: "bg-cyan-500",
    borderAccent: "border-cyan-500",
    glow: "rgba(34,211,238,0.1)"
  },
  reading: {
    title: "How to Read and Understand Other People's Code",
    subtitle: "Master Unfamiliar Codebases",
    description: "Struggling to make sense of someone else's code? Learn practical strategies to navigate, analyze, and master unfamiliar codebases with confidence.",
    shortDesc: "Navigate and master complex codebases with ease.",
    author: "Han Shavir",
    price: "$27",
    link: "https://www.checkout-ds24.com/redir/633834/devkumar506768337/",
    color: "amber",
    accent: "text-amber-400",
    bgAccent: "bg-amber-500",
    borderAccent: "border-amber-500",
    glow: "rgba(245,158,11,0.1)"
  }
};

const AffiliatePromo = ({ className = "", variant = "vertical", productId = "habit" }) => {
  const productList = productId === "all" ? Object.keys(products) : [productId];

  if (variant === "horizontal") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
           <Star size={14} className="text-amber-400 fill-amber-400" />
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Resources</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {productList.map((id) => {
            const p = products[id] || products.habit;
            return (
              <div key={id} className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 group transition-all duration-300 hover:border-${p.color}-500/30`}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top right, ${p.glow}, transparent)` }} />
                <div className="relative z-10 flex items-center gap-6">
                  {/* CSS Book Mockup */}
                  <div className="relative flex-shrink-0 transform group-hover:scale-105 transition-transform duration-500">
                     <div className={`w-20 h-28 bg-slate-800 rounded-r-lg border-l-4 ${p.borderAccent} shadow-2xl relative overflow-hidden flex flex-col justify-between p-2 after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/20 after:to-transparent`}>
                        <div className="space-y-1">
                           <div className="text-[6px] font-black text-white leading-tight uppercase font-mono">
                              {p.title}
                           </div>
                        </div>
                        <div className="text-[5px] text-slate-400 font-medium tracking-tighter">{p.author}</div>
                     </div>
                     <div className={`absolute -inset-1 ${p.bgAccent}/10 blur opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">{p.subtitle}</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                       {p.description}
                    </p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${p.bgAccent} text-white font-bold text-[10px] hover:opacity-90 transition-all shadow-lg shadow-${p.color}-500/10 active:scale-[0.98]`}
                    >
                      Get E-Book
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
         <Star size={14} className="text-amber-400 fill-amber-400" />
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended</span>
      </div>
      <div className="space-y-4">
        {productList.map((id) => {
          const p = products[id] || products.habit;
          return (
            <div key={id} className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 group transition-all duration-300 hover:border-${p.color}-500/30`}>
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top right, ${p.glow}, transparent)` }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* CSS Book Mockup */}
                <div className="relative mb-4 transform group-hover:scale-105 transition-transform duration-500">
                   <div className={`w-20 h-28 bg-slate-800 rounded-r-lg border-l-4 ${p.borderAccent} shadow-2xl relative overflow-hidden flex flex-col justify-between p-2 after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/20 after:to-transparent`}>
                      <div className="space-y-1 text-left">
                         <div className="text-[6px] font-black text-white leading-tight uppercase font-mono">
                            {p.title}
                         </div>
                      </div>
                      <div className="text-[5px] text-slate-500 font-medium text-left">{p.author}</div>
                   </div>
                   <div className={`absolute -inset-1 ${p.bgAccent}/20 blur opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                <h3 className="text-[13px] font-bold text-white mb-1 leading-tight">
                  {p.subtitle}
                </h3>
                <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
                  {p.shortDesc}
                </p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl ${p.bgAccent} text-white font-bold text-[10px] hover:opacity-90 shadow-lg shadow-${p.color}-500/10 active:scale-[0.98] transition-all`}
                >
                  Buy Now
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



export default AffiliatePromo;
