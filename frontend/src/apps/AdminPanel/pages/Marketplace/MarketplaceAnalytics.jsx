import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    BarChart2,
    Box,
    ChevronDown,
    ChevronUp,
    Clock,
    DollarSign,
    Download,
    Eye,
    Filter,
    Globe,
    Minus,
    MousePointer2,
    Package,
    RefreshCw,
    Search,
    ShoppingBag,
    Star,
    TrendingDown,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useGetDashboardAnalyticsQuery, useGetMarketplaceAnalyticsQuery } from '../../store/api/adminApiSlice';

// ─────────────────────────────── helpers ──────────────────────────────────────

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount || 0);

const formatTrend = (value) => {
    if (value === null || value === undefined) return 'N/A';
    const num = Number(value);
    if (!isFinite(num)) return 'N/A';
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
};

const trendDir = (value) => {
    if (value === null || value === undefined) return null;
    const num = Number(value);
    if (!isFinite(num) || num === 0) return null;
    return num > 0;
};

const TrendBadge = ({ value }) => {
    const dir = trendDir(value);
    const label = formatTrend(value);
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                dir === true
                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30'
                    : dir === false
                    ? 'text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/30'
                    : 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
            }`}
        >
            {dir === true ? <TrendingUp size={11} /> : dir === false ? <TrendingDown size={11} /> : <Minus size={11} />}
            {label}
        </span>
    );
};

const STATUS_COLORS = {
    completed: '#10B981',
    delivered: '#6366F1',
    in_progress: '#3B82F6',
    revising: '#F59E0B',
    awaiting_requirements: '#8B5CF6',
    confirmed: '#14B8A6',
    pending: '#9CA3AF',
    cancelled: '#EF4444',
    refunded: '#F97316',
};

const PIE_PALETTE = [
    '#6366F1', '#10B981', '#F59E0B', '#3B82F6', '#EC4899',
    '#8B5CF6', '#14B8A6', '#F97316', '#EF4444', '#06B6D4',
];

const PERIOD_OPTIONS = [
    { label: '7 Days', value: 7 },
    { label: '30 Days', value: 30 },
    { label: '90 Days', value: 90 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─────────────────────────────── sub-components ───────────────────────────────

const GlassCard = ({ children, className = '' }) => (
    <div
        className={`bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
        {children}
    </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Icon size={18} />
        </div>
        <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
    </div>
);

const EmptyState = ({ icon: Icon, message }) => (
    <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-gray-600 gap-3">
        <Icon size={40} className="opacity-40" />
        <p className="text-sm">{message}</p>
    </div>
);

const CustomAreaTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 text-sm">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.name} style={{ color: p.color }} className="flex items-center gap-1">
                    <span className="font-medium">
                        {p.name === 'revenue' ? formatCurrency(p.value) : p.value}
                    </span>
                    <span className="text-gray-400 text-xs">
                        {p.name === 'revenue' ? 'revenue' : 'orders'}
                    </span>
                </p>
            ))}
        </div>
    );
};

// ─────────────────────────────── sortable table ───────────────────────────────

const SortIcon = ({ field, sortConfig }) => {
    if (sortConfig.key !== field) return <ChevronDown size={12} className="opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
};

const useSort = (data, defaultKey = 'revenue') => {
    const [sortConfig, setSortConfig] = useState({ key: defaultKey, direction: 'desc' });
    const sorted = useMemo(() => {
        if (!data?.length) return [];
        return [...data].sort((a, b) => {
            const av = a[sortConfig.key] ?? 0;
            const bv = b[sortConfig.key] ?? 0;
            if (typeof av === 'string') {
                return sortConfig.direction === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            }
            return sortConfig.direction === 'asc' ? av - bv : bv - av;
        });
    }, [data, sortConfig]);

    const toggle = (key) =>
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
        }));

    return { sorted, sortConfig, toggle };
};

// ─────────────────────────────── main component ───────────────────────────────

const MarketplaceAnalytics = () => {
    const [period, setPeriod] = useState(30);
    const [activeTab, setActiveTab] = useState('products');

    const { data, isLoading, isFetching, refetch } = useGetMarketplaceAnalyticsQuery(period);
    const analytics = data?.analytics || {};
    const overview = analytics.overview || {};
    const trends = overview.trends || {};

    // Fetch marketplace-specific Google Analytics + Search Console data
    const { data: gaData } = useGetDashboardAnalyticsQuery();
    const marketplaceGa = gaData?.data?.googleAnalytics?.marketplaceGa;
    const marketplaceGsc = gaData?.data?.googleAnalytics?.marketplaceGsc;

    const { sorted: sortedProducts, sortConfig: pSort, toggle: pToggle } = useSort(
        analytics.productPerformance
    );
    const { sorted: sortedServices, sortConfig: sSort, toggle: sToggle } = useSort(
        analytics.servicePerformance
    );

    const statusPieData = useMemo(
        () =>
            (analytics.statusDistribution || []).map((item) => ({
                name: item._id?.replace(/_/g, ' ') || 'unknown',
                value: item.count,
                color: STATUS_COLORS[item._id] || '#9CA3AF',
            })),
        [analytics.statusDistribution]
    );

    const productCatData = useMemo(
        () => (analytics.productCategoryDist || []).map((c) => ({ name: c._id || 'other', count: c.count })),
        [analytics.productCategoryDist]
    );

    const serviceCatData = useMemo(
        () => (analytics.serviceCategoryDist || []).map((c) => ({ name: c._id || 'other', count: c.count })),
        [analytics.serviceCategoryDist]
    );

    const kpiCards = [
        {
            title: 'Period Revenue',
            value: formatCurrency(overview.periodRevenue),
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-600',
            glow: 'text-emerald-500',
            trend: trends.revenue,
            sub: 'vs prior period',
        },
        {
            title: 'Period Orders',
            value: overview.periodOrders ?? 0,
            icon: ShoppingBag,
            color: 'from-blue-500 to-indigo-600',
            glow: 'text-blue-500',
            trend: trends.orders,
            sub: 'vs prior period',
        },
        {
            title: 'Avg Order Value',
            value: formatCurrency(overview.avgOrderValue),
            icon: BarChart2,
            color: 'from-violet-500 to-purple-600',
            glow: 'text-violet-500',
            trend: trends.avgOrderValue,
            sub: 'per transaction',
        },
        {
            title: 'New Customers',
            value: overview.newCustomers ?? 0,
            icon: Users,
            color: 'from-orange-500 to-rose-600',
            glow: 'text-orange-500',
            trend: trends.newCustomers,
            sub: 'vs prior period',
        },
        {
            title: 'All-Time Revenue',
            value: formatCurrency(overview.totalRevenue),
            icon: Zap,
            color: 'from-sky-500 to-cyan-600',
            glow: 'text-sky-500',
            trend: null,
            sub: 'lifetime earnings',
        },
        {
            title: 'Total Orders',
            value: overview.totalOrders ?? 0,
            icon: Activity,
            color: 'from-pink-500 to-fuchsia-600',
            glow: 'text-pink-500',
            trend: null,
            sub: 'all paid orders',
        },
        {
            title: 'Products',
            value: overview.totalProducts ?? 0,
            icon: Package,
            color: 'from-amber-500 to-yellow-600',
            glow: 'text-amber-500',
            trend: null,
            sub: 'listed in marketplace',
        },
        {
            title: 'Services',
            value: overview.totalServices ?? 0,
            icon: Box,
            color: 'from-lime-500 to-green-600',
            glow: 'text-lime-500',
            trend: null,
            sub: 'active service offerings',
        },
    ];

    // ─── Loading skeleton ─────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-72" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                    <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Marketplace Analytics
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        Industry-grade insights across products, services, and revenue.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Period selector */}
                    <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
                        {PERIOD_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setPeriod(opt.value)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                    period === opt.value
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    {/* Refresh */}
                    <button
                        onClick={refetch}
                        disabled={isFetching}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={13} className={isFetching ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                        <Clock size={13} />
                        Live data
                    </div>
                </div>
            </motion.div>

            {/* ── KPI Grid ────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpiCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <GlassCard key={i} className="p-5 relative overflow-hidden group">
                            <div className={`absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity ${card.glow}`}>
                                <Icon size={80} />
                            </div>
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{card.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{card.value}</p>
                                </div>
                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg flex-shrink-0 ml-2`}>
                                    <Icon size={16} />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                {card.trend !== null ? (
                                    <TrendBadge value={card.trend} />
                                ) : (
                                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">—</span>
                                )}
                                <span className="text-xs text-gray-400 truncate">{card.sub}</span>
                            </div>
                        </GlassCard>
                    );
                })}
            </motion.div>

            {/* ── Revenue + Status Charts ──────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue + Orders Timeline */}
                <GlassCard className="lg:col-span-2 p-6">
                    <SectionTitle icon={TrendingUp} title="Revenue & Orders Trend" subtitle={`Daily breakdown — last ${period} days`} />
                    <div className="h-72">
                        {analytics.revenueTimeline?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analytics.revenueTimeline} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gradOrd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="_id"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                        minTickGap={20}
                                    />
                                    <YAxis
                                        yAxisId="rev"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                        tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                                        width={52}
                                    />
                                    <YAxis
                                        yAxisId="ord"
                                        orientation="right"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                        width={30}
                                    />
                                    <Tooltip content={<CustomAreaTooltip />} />
                                    <Area
                                        yAxisId="rev"
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#6366F1"
                                        strokeWidth={2.5}
                                        fill="url(#gradRev)"
                                    />
                                    <Area
                                        yAxisId="ord"
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#10B981"
                                        strokeWidth={2.5}
                                        fill="url(#gradOrd)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyState icon={TrendingUp} message="No revenue data for selected period" />
                        )}
                    </div>
                </GlassCard>

                {/* Order Status Donut */}
                <GlassCard className="p-6">
                    <SectionTitle icon={ShoppingBag} title="Order Status" subtitle="All-time distribution" />
                    <div className="h-72">
                        {statusPieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusPieData}
                                        cx="50%"
                                        cy="44%"
                                        innerRadius={58}
                                        outerRadius={82}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {statusPieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '10px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            fontSize: '12px',
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        iconType="circle"
                                        iconSize={8}
                                        wrapperStyle={{ fontSize: '11px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyState icon={ShoppingBag} message="No order data available" />
                        )}
                    </div>
                </GlassCard>
            </motion.div>

            {/* ── Top Performers ──────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <GlassCard className="p-6">
                    <SectionTitle icon={Package} title="Top Products" subtitle="By all-time revenue" />
                    {analytics.topProducts?.length > 0 ? (
                        <div className="space-y-2.5">
                            {analytics.topProducts.map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-5 text-xs font-bold text-gray-400 flex-shrink-0">{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                            {p.title || 'Untitled'}
                                        </p>
                                        <div
                                            className="mt-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"
                                        >
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        ((p.revenue || 0) /
                                                            (analytics.topProducts[0]?.revenue || 1)) *
                                                            100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(p.revenue)}
                                        </p>
                                        <p className="text-xs text-gray-400">{p.orders} orders</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState icon={Package} message="No product sales yet" />
                    )}
                </GlassCard>

                {/* Top Services */}
                <GlassCard className="p-6">
                    <SectionTitle icon={Zap} title="Top Services" subtitle="By all-time revenue" />
                    {analytics.topServices?.length > 0 ? (
                        <div className="space-y-2.5">
                            {analytics.topServices.map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-5 text-xs font-bold text-gray-400 flex-shrink-0">{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                            {s.title || 'Untitled'}
                                        </p>
                                        <div className="mt-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        ((s.revenue || 0) /
                                                            (analytics.topServices[0]?.revenue || 1)) *
                                                            100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(s.revenue)}
                                        </p>
                                        <p className="text-xs text-gray-400">{s.orders} orders</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState icon={Zap} message="No service sales yet" />
                    )}
                </GlassCard>
            </motion.div>

            {/* ── Category Distribution ────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Categories */}
                <GlassCard className="p-6">
                    <SectionTitle icon={Filter} title="Product Categories" subtitle="Distribution by count" />
                    <div className="h-56">
                        {productCatData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={productCatData} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                        width={90}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }}
                                        formatter={(v) => [v, 'Products']}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {productCatData.map((_, i) => (
                                            <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyState icon={Package} message="No products found" />
                        )}
                    </div>
                </GlassCard>

                {/* Service Categories */}
                <GlassCard className="p-6">
                    <SectionTitle icon={Filter} title="Service Categories" subtitle="Distribution by count" />
                    <div className="h-56">
                        {serviceCatData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={serviceCatData} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                        width={110}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }}
                                        formatter={(v) => [v, 'Services']}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {serviceCatData.map((_, i) => (
                                            <Cell key={i} fill={PIE_PALETTE[(i + 3) % PIE_PALETTE.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyState icon={Box} message="No services found" />
                        )}
                    </div>
                </GlassCard>
            </motion.div>

            {/* ── Performance Tables ───────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                <BarChart2 size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">Performance Breakdown</h3>
                                <p className="text-xs text-gray-500">Detailed per-item analytics with sortable columns</p>
                            </div>
                        </div>
                        {/* Tab switcher */}
                        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            {[
                                { key: 'products', label: 'Products', icon: Package },
                                { key: 'services', label: 'Services', icon: Zap },
                            ].map((tab) => {
                                const TabIcon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            activeTab === tab.key
                                                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        <TabIcon size={12} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'products' ? (
                            <motion.div
                                key="products"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {sortedProducts.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    {[
                                                        { key: 'title', label: 'Product' },
                                                        { key: 'category', label: 'Category' },
                                                        { key: 'orders', label: 'Orders' },
                                                        { key: 'totalUnits', label: 'Units' },
                                                        { key: 'revenue', label: 'Revenue' },
                                                        { key: 'views', label: 'Views' },
                                                        { key: 'downloads', label: 'Downloads' },
                                                        { key: 'rating', label: 'Rating' },
                                                    ].map((col) => (
                                                        <th
                                                            key={col.key}
                                                            className="text-left pb-3 pr-4 font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-indigo-600 select-none whitespace-nowrap"
                                                            onClick={() => pToggle(col.key)}
                                                        >
                                                            <span className="flex items-center gap-1">
                                                                {col.label}
                                                                <SortIcon field={col.key} sortConfig={pSort} />
                                                            </span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {sortedProducts.map((p, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="py-3 pr-4">
                                                            <p className="font-medium text-gray-900 dark:text-white max-w-[180px] truncate">
                                                                {p.title || '—'}
                                                            </p>
                                                        </td>
                                                        <td className="py-3 pr-4 text-gray-500 capitalize text-xs">
                                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                                {p.category || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-200">{p.orders}</td>
                                                        <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{p.totalUnits}</td>
                                                        <td className="py-3 pr-4 font-semibold text-emerald-600 dark:text-emerald-400">
                                                            {formatCurrency(p.revenue)}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span className="flex items-center gap-1 text-gray-500">
                                                                <Eye size={12} /> {p.views ?? 0}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span className="flex items-center gap-1 text-gray-500">
                                                                <Download size={12} /> {p.downloads ?? 0}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                                                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                                                {(p.rating ?? 0).toFixed(1)}
                                                                <span className="text-xs text-gray-400">({p.ratingCount ?? 0})</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <EmptyState icon={Package} message="No product sales data available" />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="services"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {sortedServices.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    {[
                                                        { key: 'title', label: 'Service' },
                                                        { key: 'category', label: 'Category' },
                                                        { key: 'orders', label: 'Orders' },
                                                        { key: 'revenue', label: 'Revenue' },
                                                        { key: 'rating', label: 'Rating' },
                                                    ].map((col) => (
                                                        <th
                                                            key={col.key}
                                                            className="text-left pb-3 pr-4 font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-indigo-600 select-none whitespace-nowrap"
                                                            onClick={() => sToggle(col.key)}
                                                        >
                                                            <span className="flex items-center gap-1">
                                                                {col.label}
                                                                <SortIcon field={col.key} sortConfig={sSort} />
                                                            </span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {sortedServices.map((s, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="py-3 pr-4">
                                                            <p className="font-medium text-gray-900 dark:text-white max-w-[200px] truncate">
                                                                {s.title || '—'}
                                                            </p>
                                                        </td>
                                                        <td className="py-3 pr-4 text-gray-500 text-xs capitalize">
                                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                                {s.category?.replace(/-/g, ' ') || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-200">{s.orders}</td>
                                                        <td className="py-3 pr-4 font-semibold text-emerald-600 dark:text-emerald-400">
                                                            {formatCurrency(s.revenue)}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                                                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                                                {(s.rating ?? 0).toFixed(1)}
                                                                <span className="text-xs text-gray-400">({s.ratingCount ?? 0})</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <EmptyState icon={Zap} message="No service sales data available" />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </motion.div>

            {/* ── Google Analytics & Search Console (Marketplace) ─────────── */}
            {(marketplaceGa || marketplaceGsc) && (
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Google Analytics */}
                    {marketplaceGa && !marketplaceGa.isFallback && (
                        <GlassCard className="p-6">
                            <SectionTitle
                                icon={BarChart2}
                                title="Google Analytics — Marketplace"
                                subtitle="Traffic data for /marketplace pages (last 30 days)"
                            />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {[
                                    { label: 'Page Views', value: (marketplaceGa.overview?.pageViews ?? 0).toLocaleString(), icon: Eye, color: 'text-blue-500' },
                                    { label: 'Users', value: (marketplaceGa.overview?.users ?? 0).toLocaleString(), icon: Users, color: 'text-emerald-500' },
                                    { label: 'Sessions', value: (marketplaceGa.overview?.sessions ?? 0).toLocaleString(), icon: Activity, color: 'text-violet-500' },
                                    { label: 'Bounce Rate', value: marketplaceGa.overview?.bounceRate ?? '—', icon: MousePointer2, color: 'text-orange-500' },
                                ].map((m) => {
                                    const Icon = m.icon;
                                    return (
                                        <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                            <Icon size={18} className={m.color} />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
                                                <p className="font-bold text-gray-900 dark:text-white text-sm">{m.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {marketplaceGa.topPages?.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Top Pages</p>
                                    <div className="space-y-1.5">
                                        {marketplaceGa.topPages.slice(0, 5).map((page, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-300 truncate max-w-[70%] font-mono">{page.path}</span>
                                                <span className="font-semibold text-blue-600 dark:text-blue-400 ml-2 shrink-0">{page.views.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    )}

                    {/* Search Console */}
                    {marketplaceGsc && !marketplaceGsc.isFallback && (
                        <GlassCard className="p-6">
                            <SectionTitle
                                icon={Search}
                                title="Search Console — Marketplace"
                                subtitle="Organic search performance for /marketplace (last 30 days)"
                            />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {[
                                    { label: 'Clicks', value: (marketplaceGsc.overview?.clicks ?? 0).toLocaleString(), icon: MousePointer2, color: 'text-blue-500' },
                                    { label: 'Impressions', value: (marketplaceGsc.overview?.impressions ?? 0).toLocaleString(), icon: Eye, color: 'text-purple-500' },
                                    { label: 'CTR', value: `${marketplaceGsc.overview?.ctr ?? 0}%`, icon: TrendingUp, color: 'text-emerald-500' },
                                    { label: 'Avg. Position', value: marketplaceGsc.overview?.position ?? '—', icon: Globe, color: 'text-orange-500' },
                                ].map((m) => {
                                    const Icon = m.icon;
                                    return (
                                        <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                            <Icon size={18} className={m.color} />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
                                                <p className="font-bold text-gray-900 dark:text-white text-sm">{m.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {marketplaceGsc.topQueries?.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Top Search Queries</p>
                                    <div className="space-y-1.5">
                                        {marketplaceGsc.topQueries.slice(0, 5).map((q, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-300 truncate max-w-[70%]">{q.query}</span>
                                                <div className="flex gap-3 shrink-0 ml-2">
                                                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{q.clicks} clicks</span>
                                                    <span className="text-gray-400">{q.impressions} impr.</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    )}
                </motion.div>
            )}

            {/* ── Footer note ─────────────────────────────────────────────── */}
            <motion.p variants={itemVariants} className="text-xs text-center text-gray-400 dark:text-gray-600 pb-4">
                Analytics include only paid & fulfilled orders • Period trends compare against the immediately preceding {period}-day window
            </motion.p>
        </motion.div>
    );
};

export default MarketplaceAnalytics;
