import { Code2, Headphones, Stethoscope, TrendingUp, Truck } from "lucide-react";

export default function Part8_UseCases() {
  const cases = [
      {
          title: "Customer Support Automation",
          stat: "70% Auto-Resolution",
          icon: Headphones,
          color: "text-cyan-400",
          desc: "Not just a chatbot. An agent that can check order status in Shopify, issue a refund in Stripe, and email the user—all autonomously."
      },
       {
          title: "Financial Analysis",
          stat: "24/7 Market Watch",
          icon: TrendingUp,
          color: "text-emerald-400",
          desc: "Agents that monitor news feeds for specific tickers, cross-reference with historical earnings, and draft investment memos for human analysts."
      },
       {
          title: "Healthcare Triage",
          stat: "99% Accuracy in Pilots",
          icon: Stethoscope,
          color: "text-red-400",
          desc: "Pre-screening patients, summarizing 50-page medical histories into 1-page briefs for doctors, and scheduling appointments."
      },
       {
          title: "Supply Chain",
          stat: "Route Optimization",
          icon: Truck,
          color: "text-amber-400",
          desc: "Predicting inventory shortages based on weather patterns and automatically placing purchase orders with suppliers."
      },
       {
          title: "Software Engineering",
          stat: "Test Writing",
          icon: Code2,
          color: "text-purple-400",
          desc: "Agents that read a PR, write unit tests for the new code, run them, and fix simple syntax errors before a human review."
      }
  ];

  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Part 8:</span> Real-World Use Cases
        </h2>
        <p className="text-xl text-slate-300 leading-relaxed font-light">
           Theory is great, but who is actually making money with this?
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-all group">
                  <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <c.icon className={c.color} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-4 ${c.color}`}>{c.stat}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
          ))}
      </section>
    </div>
  );
}
