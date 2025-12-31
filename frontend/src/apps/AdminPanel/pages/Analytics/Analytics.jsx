import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    Clock,
    Eye,
    FileText,
    Globe,
    HelpCircle,
    Info,
    Monitor,
    MousePointer2,
    Search,
    TrendingUp,
    Users
} from 'lucide-react';
import ReactCountryFlag from "react-country-flag";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useGetDashboardAnalyticsQuery } from '../../store/api/adminApiSlice';

// --- Premium Components ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/20 dark:shadow-none ${className}`}
    >
        {children}
    </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-white/10 p-3 rounded-xl shadow-xl">
                <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                    {payload[0].value.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">Views</span>
                </p>
            </div>
        );
    }
    return null;
};

const MetricBadge = ({ title, description }) => (
    <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl border border-blue-500/10 mt-6">
        <Info className="text-blue-500 shrink-0" size={20} />
        <div className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter mr-1">{title}:</span> {description}
        </div>
    </div>
);

const SkeletonCard = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl ${className}`} />
);

const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const s = parseInt(seconds, 10);
    if (isNaN(s)) return seconds; // Fallback if string
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
};

const Analytics = () => {
    const { data: response, isLoading } = useGetDashboardAnalyticsQuery();
    const analytics = response?.data?.googleAnalytics;
    const localTrendData = response?.data?.visitStats || [];

    if (isLoading) {
        return (
            <div className="p-8 max-w-[1600px] mx-auto space-y-10 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <SkeletonCard className="h-4 w-32" />
                        <SkeletonCard className="h-12 w-64" />
                        <SkeletonCard className="h-6 w-96" />
                    </div>
                    <SkeletonCard className="h-10 w-32 hidden lg:block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <SkeletonCard key={i} className="h-48" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <SkeletonCard className="lg:col-span-2 h-[450px]" />
                    <SkeletonCard className="h-[450px]" />
                </div>
            </div>
        );
    }

    const ga = analytics?.ga || {};
    const gsc = analytics?.gsc || {};
    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-8 max-w-[1600px] mx-auto space-y-10 pb-20"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Live Infrastructure Online</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Intelligence</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
                        <p className="text-gray-500 text-lg font-medium max-w-xl">
                            Deep-dive metrics powered by GA4 & GSC.
                        </p>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/5 border border-amber-500/10 rounded-full">
                            <Clock size={12} className="text-amber-500" />
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-tighter">Data updates every 24 hours</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4">
                    <div className="hidden lg:flex flex-col text-right">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Property ID</span>
                        <span className="text-xs font-mono font-bold dark:text-white">G-492315628</span>
                    </div>
                </motion.div>
            </div>

            {/* Fallback Warning Stripe */}
            {(ga.isFallback || gsc.isFallback) && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
                >
                    <Info className="text-amber-500" size={18} />
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-tight">
                        Platform Cold-Start: Google APIs are returning baseline data. Full insights will populate as your traffic scales.
                    </p>
                </motion.div>
            )}

            {/* Top KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Page Views', value: ga.overview?.pageViews || 0, icon: Eye, color: 'blue', desc: 'Cumulative total of all platform views in the last 30 days.' },
                    { label: 'Active Users', value: ga.overview?.users || 0, icon: Users, color: 'purple', desc: 'Distinct unique individuals who initiated interaction sequences.' },
                    { label: 'Retention Rate', value: ga.overview?.bounceRate ? (100 - parseFloat(ga.overview.bounceRate)).toFixed(2) + '%' : '0%', icon: Activity, color: 'emerald', desc: 'Inverse of bounce rate—percentage of users who stayed for multiple actions.' },
                    { label: 'Avg Duration', value: formatDuration(ga.overview?.avgSessionDuration), icon: Clock, color: 'orange', desc: 'Median engagement time within a single active user session.' },
                ].map((stat, i) => (
                    <GlassCard key={i} delay={i * 0.1} className="group hover:scale-[1.02] transition-transform duration-300">
                        <div className="p-8 relative">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 blur-[60px] rounded-full -mr-16 -mt-16`} />

                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 border border-${stat.color}-500/10`}>
                                    <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:rotate-12 transition-transform`} size={28} />
                                </div>
                                <div className="group/help relative">
                                    <HelpCircle size={18} className="text-gray-300 hover:text-gray-500 cursor-help transition-colors" />
                                    <div className="absolute right-0 top-8 w-56 p-3 bg-gray-900 text-[10px] text-white rounded-xl shadow-2xl pointer-events-none group-hover/help:block hidden z-[100] border border-white/10 leading-relaxed font-medium">
                                        {stat.desc}
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</h4>
                            <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Primary Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Dynamics */}
                <GlassCard className="lg:col-span-2 p-8 h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                <span className="p-2 bg-blue-500/10 rounded-lg"><TrendingUp className="text-blue-500" size={20} /></span>
                                Traffic Dynamics
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 font-medium italic">Internal tracking: 7-day rolling window</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={localTrendData.map(d => ({ name: d.date, views: d.views }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="premiumBlue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#888888" opacity={0.1} />
                                <XAxis
                                    dataKey="name"
                                    tick={{fontSize: 10, fontWeight: 700}}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(val) => val.split('-').slice(1).join('/')}
                                />
                                <YAxis tick={{fontSize: 10, fontWeight: 700}} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#premiumBlue)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Device Ecosystem */}
                <GlassCard className="p-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 mb-10">
                        <span className="p-2 bg-purple-500/10 rounded-lg"><Monitor className="text-purple-500" size={20} /></span>
                        Device Mix
                    </h3>
                    <div className="h-[300px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ga.devices || []}
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="users"
                                    nameKey="category"
                                    stroke="none"
                                >
                                    {(ga.devices || []).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '15px', border: 'none', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '10px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase'}} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global</span>
                            <span className="text-xl font-black dark:text-white">Sessions</span>
                        </div>
                    </div>
                    <MetricBadge title="Multi-Platform" description="Analyzing device categories ensures your CSS breakpoints are pixel-perfect for your most frequent visitors." />
                </GlassCard>
            </div>

            {/* Secondary Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Search Intent */}
                <GlassCard className="p-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 mb-8">
                        <span className="p-2 bg-indigo-500/10 rounded-lg"><Search className="text-indigo-500" size={20} /></span>
                        Intent Mapping
                    </h3>
                    <div className="space-y-3">
                        {AnimatePresence && (gsc.topQueries || []).length > 0 ? (gsc.topQueries || []).map((query, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.05) }}
                                className="group flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-transparent hover:border-indigo-500/20 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-xs font-black text-indigo-500 border border-gray-100 dark:border-white/5">
                                        #{i+1}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{query.query}</div>
                                        <div className="text-[10px] font-bold text-gray-400">{query.impressions.toLocaleString()} <span className="uppercase">Reach</span></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2">
                                        <MousePointer2 className="text-emerald-500" size={14} />
                                        <span className="text-sm font-black dark:text-white">{query.clicks}</span>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-emerald-500/80">Captured</span>
                                </div>
                            </motion.div>
                        )) : (
                           <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                               <Search className="text-gray-300 mb-2" size={32} />
                               <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Awaiting Search Index</span>
                               <span className="text-[10px] text-gray-400 mt-1 italic">Not enough search volume to display metadata</span>
                           </div>
                        )}
                    </div>
                </GlassCard>

                {/* Content Popularity */}
                <GlassCard className="p-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 mb-8">
                        <span className="p-2 bg-emerald-500/10 rounded-lg"><FileText className="text-emerald-500" size={20} /></span>
                        Resource Resonance
                    </h3>
                    <div className="space-y-6">
                        {(ga.topPages || []).map((page, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                                className="space-y-2"
                            >
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        <span className="text-xs font-black text-gray-500 uppercase tracking-tighter truncate leading-none pt-1">/{page.path.replace(/^\/+/, '')}</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900 dark:text-white">{page.views.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (page.views / (ga.topPages[0]?.views || 1)) * 100)}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full relative"
                                    >
                                        <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-12" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Geographical Footprint */}
            <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="p-2 bg-orange-500/10 rounded-lg"><Globe className="text-orange-500" size={20} /></span>
                        World Impact
                    </h3>
                    <div className="px-4 py-1.5 rounded-full bg-orange-100/50 dark:bg-orange-500/10 border border-orange-500/20 text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 tracking-widest">
                        Global Distribution
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
                    {(ga.countries || []).map((c, i) => {
                        const isUnknown = !c.countryCode || c.countryCode.includes('(') || c.country === '(not set)';
                        return (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-transparent shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/20 transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-1 rounded-lg border border-gray-100 dark:border-white/10 group-hover:border-orange-500/30 transition-colors bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden w-10 h-7">
                                        {isUnknown ? (
                                            <Globe className="text-gray-400 group-hover:text-orange-500 transition-colors" size={16} />
                                        ) : (
                                            <ReactCountryFlag
                                                countryCode={c.countryCode}
                                                svg
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                title={c.country}
                                            />
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                        {isUnknown ? '??' : c.countryCode}
                                    </span>
                                </div>
                                <div className="text-sm font-black text-gray-900 dark:text-white truncate mb-1">
                                    {isUnknown ? 'Global/Unknown' : c.country}
                                </div>
                                <div className="flex items-end gap-1">
                                    <span className="text-2xl font-black text-orange-500 tracking-tighter">{c.users}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase pb-1.5 leading-none">Users</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <MetricBadge title="Global reach" description="This breakdown tracks sovereign interaction points. Visualizing flags provides instant cognitive mapping of your brand's international resonance." />
            </GlassCard>

            {/* SEO Executive Billboard */}
            <motion.div
                variants={itemVariants}
                className="relative bg-black rounded-3xl p-10 md:p-14 overflow-hidden border border-white/10 group active:scale-[0.99] transition-transform"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-purple-900/30 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                <div className="relative flex flex-col xl:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 text-center xl:text-left">
                        <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.3em]">SEO Strategic Overview</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                            Dominating the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Search Landscape</span>
                        </h2>
                        <p className="text-gray-400 font-medium max-w-lg mx-auto xl:mx-0 leading-relaxed">
                            Search Console indicates high relevance for your specialized keywords. Your platform is systematically converting organic impressions into high-value user acquisitions.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 lg:gap-20">
                        {[
                            { label: 'Avg Position', value: gsc.overview?.position || 0, suffix: '', sub: 'Search Ranking' },
                            { label: 'Click Rate', value: gsc.overview?.ctr || 0, suffix: '%', sub: 'Engagement Efficiency' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group/stat">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-black mb-4 group-hover/stat:text-blue-400 transition-colors">{stat.label}</div>
                                <div className="text-6xl lg:text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="text-[10px] text-blue-400/50 uppercase font-black tracking-tighter mt-4">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Analytics;
