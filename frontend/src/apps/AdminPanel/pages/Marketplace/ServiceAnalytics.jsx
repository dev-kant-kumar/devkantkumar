import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BarChart2,
    Box,
    Clock,
    DollarSign,
    Layers,
    Minus,
    RefreshCw,
    ShoppingBag,
    Star,
    TrendingDown,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useGetServiceAnalyticsQuery } from '../../store/api/adminApiSlice';

// ─────────────────────────────────── helpers ──────────────────────────────────

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount || 0);

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const formatMonthLabel = (ym) => {
    if (!ym) return '';
    const [year, month] = ym.split('-');
    return new Date(Number(year), Number(month) - 1).toLocaleString('en-US', { month: 'short', year: '2-digit' });
};

const PACKAGE_COLORS = { basic: '#10B981', standard: '#3B82F6', premium: '#8B5CF6', unknown: '#9CA3AF' };
const PALETTE = ['#6366F1', '#10B981', '#F59E0B', '#3B82F6', '#EC4899'];

const TrendBadge = ({ value, label }) => {
    const dir = value === null || value === undefined ? null : Number(value) > 0 ? true : Number(value) < 0 ? false : null;
    const text = value === null || value === undefined ? 'N/A' : `${Number(value) >= 0 ? '+' : ''}${Number(value).toFixed(1)}%`;
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
            {text}
            {label && <span className="text-gray-400 font-normal ml-0.5">{label}</span>}
        </span>
    );
};

const StatCard = ({ title, value, icon: Icon, color, trend, trendLabel, sub }) => (
    <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 dark:border-gray-700/50 shadow-sm relative overflow-hidden group">
        <div className={`absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity`} style={{ color: 'currentColor' }}>
            <Icon size={80} />
        </div>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${color} text-white shadow-lg flex-shrink-0`}>
                <Icon size={16} />
            </div>
        </div>
        {(trend !== undefined || sub) && (
            <div className="mt-3 flex items-center gap-2">
                {trend !== undefined && <TrendBadge value={trend} label={trendLabel} />}
                {sub && <span className="text-xs text-gray-400">{sub}</span>}
            </div>
        )}
    </div>
);

// ─────────────────────────────────── main ─────────────────────────────────────

const ServiceAnalytics = () => {
    const { id } = useParams();
    const { data, isLoading, isFetching, refetch } = useGetServiceAnalyticsQuery(id, { skip: !id });
    const analytics = data?.analytics || {};
    const service = analytics.service || {};
    const allTime = analytics.allTime || {};
    const period = analytics.period || {};
    const trends = period.trends || {};

    const chartData = useMemo(
        () =>
            (analytics.monthlyTimeline || []).map((m) => ({
                ...m,
                label: formatMonthLabel(m._id),
            })),
        [analytics.monthlyTimeline]
    );

    const packageData = useMemo(
        () =>
            (analytics.packageBreakdown || []).map((p) => ({
                name: p._id || 'unknown',
                count: p.count,
                revenue: p.revenue,
                color: PACKAGE_COLORS[p._id] || PACKAGE_COLORS.unknown,
            })),
        [analytics.packageBreakdown]
    );

    const recentOrders = analytics.recentOrders || [];

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-64" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/marketplace/services"
                        className="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                {service.title || 'Service Analytics'}
                            </h1>
                            {service.isActive !== undefined && (
                                <span
                                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                        service.isActive
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    {service.isActive ? 'Active' : 'Inactive'}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                            {service.category?.replace(/-/g, ' ') || '—'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refetch}
                        disabled={isFetching}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={13} className={isFetching ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                    <Link
                        to={`/admin/marketplace/services/edit/${id}`}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all"
                    >
                        Edit Service
                    </Link>
                </div>
            </div>

            {/* ── KPI Cards ───────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="30-Day Revenue"
                    value={formatCurrency(period.revenue)}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-emerald-500 to-teal-600"
                    trend={trends.revenue}
                    trendLabel="vs prior 30d"
                />
                <StatCard
                    title="30-Day Orders"
                    value={period.orders ?? 0}
                    icon={ShoppingBag}
                    color="bg-gradient-to-br from-blue-500 to-indigo-600"
                    trend={trends.orders}
                    trendLabel="vs prior 30d"
                />
                <StatCard
                    title="All-Time Revenue"
                    value={formatCurrency(allTime.revenue)}
                    icon={BarChart2}
                    color="bg-gradient-to-br from-violet-500 to-purple-600"
                    sub={`${allTime.orders ?? 0} total orders`}
                />
                <StatCard
                    title="Active Orders"
                    value={allTime.activeOrders ?? 0}
                    icon={Zap}
                    color="bg-gradient-to-br from-orange-500 to-rose-600"
                    sub="currently in progress"
                />
            </div>

            {/* ── Service Info ─────────────────────────────────────────────── */}
            <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 dark:border-gray-700/50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                                <Star size={15} className="fill-amber-400 text-amber-400" />
                                {(service.rating?.average ?? 0).toFixed(1)}
                                <span className="text-xs text-gray-400 font-normal">({service.rating?.count ?? 0})</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Packages</p>
                            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                                <Layers size={15} className="text-indigo-500" />
                                {service.packages?.length ?? 0}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white capitalize">
                                <Box size={15} className="text-purple-500" />
                                {service.category?.replace(/-/g, ' ') || '—'}
                            </div>
                        </div>
                    </div>
                    {/* Package price range */}
                    {service.packages?.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {service.packages.map((pkg, i) => (
                                <div key={i} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize">{pkg.name}</p>
                                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">₹{pkg.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Charts ──────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Timeline */}
                <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            <TrendingUp size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">Monthly Performance</h3>
                            <p className="text-xs text-gray-500">Revenue and orders — last 6 months</p>
                        </div>
                    </div>
                    <div className="h-52">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="svcRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="svcOrd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="label"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
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
                                        width={28}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }}
                                        formatter={(val, name) => [name === 'revenue' ? formatCurrency(val) : val, name]}
                                    />
                                    <Area yAxisId="rev" type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#svcRev)" name="revenue" />
                                    <Area yAxisId="ord" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2.5} fill="url(#svcOrd)" name="orders" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-3">
                                <BarChart2 size={40} className="opacity-40" />
                                <p className="text-sm">No sales data yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Package Breakdown */}
                <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            <Layers size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">Package Popularity</h3>
                            <p className="text-xs text-gray-500">Orders by package tier</p>
                        </div>
                    </div>
                    <div className="h-52">
                        {packageData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={packageData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#6B7280' }}
                                    />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }}
                                        formatter={(val, name) => [name === 'revenue' ? formatCurrency(val) : val, name]}
                                    />
                                    <Bar dataKey="count" name="orders" radius={[4, 4, 0, 0]}>
                                        {packageData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-3">
                                <Layers size={40} className="opacity-40" />
                                <p className="text-sm">No package data available</p>
                            </div>
                        )}
                    </div>
                    {/* Package revenue breakdown */}
                    {packageData.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {packageData.map((pkg, i) => (
                                <div key={i} className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: pkg.color }} />
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize">{pkg.name}</p>
                                    <p className="text-xs text-gray-500">{pkg.count} orders</p>
                                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(pkg.revenue)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Recent Orders ────────────────────────────────────────────── */}
            <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                        <Clock size={18} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                        <p className="text-xs text-gray-500">Last 10 orders for this service</p>
                    </div>
                </div>
                {recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left pb-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Order #</th>
                                    <th className="text-left pb-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="text-left pb-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Package</th>
                                    <th className="text-left pb-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="text-left pb-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left pb-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {recentOrders.map((order) => {
                                    const pkg = order.items?.find((it) => String(it.itemId) === String(id))?.selectedPackage?.name;
                                    return (
                                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-3 pr-4">
                                                <Link
                                                    to={`/admin/marketplace/orders/${order._id}`}
                                                    className="font-mono text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                                >
                                                    {order.orderNumber || order._id?.slice(-8)}
                                                </Link>
                                            </td>
                                            <td className="py-3 pr-4 text-xs text-gray-600 dark:text-gray-400">
                                                {order.billing?.email || '—'}
                                            </td>
                                            <td className="py-3 pr-4">
                                                {pkg ? (
                                                    <span
                                                        className="px-2 py-0.5 text-xs rounded-full font-medium capitalize"
                                                        style={{
                                                            backgroundColor: `${PACKAGE_COLORS[pkg] || PACKAGE_COLORS.unknown}20`,
                                                            color: PACKAGE_COLORS[pkg] || PACKAGE_COLORS.unknown,
                                                        }}
                                                    >
                                                        {pkg}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="py-3 pr-4 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                                                {formatCurrency(order.payment?.amount?.total)}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 capitalize font-medium">
                                                    {order.status?.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="py-3 text-xs text-gray-500">{formatDate(order.createdAt)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400 dark:text-gray-600 gap-3">
                        <ShoppingBag size={32} className="opacity-40" />
                        <p className="text-sm">No orders for this service yet</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ServiceAnalytics;
