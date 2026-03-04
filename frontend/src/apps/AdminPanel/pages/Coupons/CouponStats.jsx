import { Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';

const Sparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
    <path className="animate-sparkle-path opacity-0 group-hover:opacity-100 transition-opacity duration-500 fill-white" d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" />
    <path className="animate-sparkle-path opacity-0 group-hover:opacity-100 transition-opacity duration-700 fill-white" d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" />
    <path className="animate-sparkle-path opacity-0 group-hover:opacity-100 transition-opacity duration-1000 fill-white" d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" />
  </svg>
);

const PremiumStatCard = ({ title, value, icon: Icon, color, description, text }) => (
  <div className="group relative transition-all duration-300 transform hover:scale-[1.02] cursor-default h-full">
    {/* Primary Card Surface */}
    <div className="relative z-10 h-full bg-gray-900/40 dark:bg-black/80 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 dark:border-white/5 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Dynamic Background Glow */}
      <div className={`absolute -right-8 -top-8 p-12 opacity-5 group-hover:opacity-15 transition-all duration-700 transform group-hover:scale-125 ${text}`}>
        <Icon size={120} />
      </div>

      {/* Interactive Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content Header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors duration-300 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-sm leading-none tabular-nums">
              {value}
            </h3>
          </div>
        </div>

        {/* Animated Icon Container */}
        <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-500 group-hover:shadow-blue-500/20`}>
          <Icon size={22} className="relative z-10" />
          {/* Subtle icon pulse effect */}
          <div className={`absolute inset-0 rounded-2xl bg-white/20 animate-pulse group-hover:scale-110 group-hover:opacity-0 transition-all duration-700`} />
        </div>
      </div>

      {/* Footer / Description */}
      <div className="mt-8 relative z-10 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[11px] text-gray-400 group-hover:text-gray-300 font-medium transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Animated Sparkles */}
        <div className="transform scale-75 origin-bottom-right">
          <Sparkles />
        </div>
      </div>
    </div>
  </div>
);

const CouponStats = ({ stats }) => {
  const totalCoupons = stats?.totalCoupons?.[0]?.count || 0;
  const activeCoupons = stats?.activeCoupons?.[0]?.count || 0;
  const expiredCoupons = stats?.expiredCoupons?.[0]?.count || 0;
  const totalUsed = stats?.totalUsage?.[0]?.totalUsed || 0;
  const totalRevenueSaved = stats?.totalUsage?.[0]?.totalRevenueSaved || 0;

  const statCards = [
    {
      title: 'Total Coupons',
      value: totalCoupons,
      icon: Zap,
      color: 'from-blue-600 to-indigo-600',
      text: 'text-blue-600 dark:text-blue-400',
      description: 'Lifetime creation'
    },
    {
      title: 'Active Coupons',
      value: activeCoupons,
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
      text: 'text-emerald-600 dark:text-emerald-400',
      description: 'Currently valid'
    },
    {
      title: 'Expired Coupons',
      value: expiredCoupons,
      icon: Clock,
      color: 'from-rose-600 to-pink-700',
      text: 'text-rose-600 dark:text-rose-400',
      description: 'Past validity'
    },
    {
      title: 'Total Used',
      value: totalUsed,
      icon: DollarSign,
      color: 'from-violet-600 to-fuchsia-700',
      text: 'text-violet-600 dark:text-violet-400',
      description: 'Redemption count'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <PremiumStatCard key={index} {...stat} />
      ))}

      {/* Enhanced Revenue Impact - Hero Section */}
      <div className="md:col-span-2 lg:col-span-4 group relative transition-all duration-500">
        <div className="relative z-10 bg-gray-900/40 dark:bg-black/90 backdrop-blur-3xl rounded-3xl p-10 border border-white/10 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden">
          {/* Background Motif */}
          <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 transform group-hover:scale-110">
            <TrendingUp size={320} className="text-blue-400" />
          </div>

          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-blue-600 rounded-full" />
              <p className="text-blue-500 dark:text-blue-400 text-xs font-black tracking-widest uppercase">
                Campaign Revenue Impact
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <span className="text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                ₹{Math.round(totalRevenueSaved).toLocaleString('en-IN')}
              </span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                total savings delivered
              </span>
            </div>

            <p className="text-gray-400 mt-6 max-w-xl text-lg leading-relaxed font-medium">
              This metric represents the aggregate value processed through redeemed coupons, directly attributable to customer loyalty initiatives and seasonal campaigns.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 bg-white/5 dark:bg-blue-900/20 p-8 rounded-3xl border border-white/5 dark:border-blue-500/10 backdrop-blur-md">
            <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <TrendingUp size={32} />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Performance</p>
              <p className="text-3xl font-black text-white tracking-tighter">Growth Active</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-600 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponStats;
