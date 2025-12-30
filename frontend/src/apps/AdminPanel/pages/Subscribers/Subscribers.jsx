import { Download, Loader2, Mail, Search, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useGetSubscribersQuery, useUnsubscribeMutation } from "../../../Portfolio/store/api/subscriberApiSlice";

const Subscribers = () => {
    const { data, isLoading } = useGetSubscribersQuery();
    const [unsubscribe] = useUnsubscribeMutation();
    const [searchTerm, setSearchTerm] = useState("");

    const subscribers = data?.data || [];

    const handleUnsubscribe = async (email) => {
        if (window.confirm(`Are you sure you want to unsubscribe ${email}?`)) {
            try {
                await unsubscribe(email).unwrap();
                toast.success("Subscriber removed successfully");
            } catch (error) {
                toast.error("Failed to remove subscriber");
            }
        }
    };

    const handleExportCSV = () => {
        if (!subscribers.length) return;

        const headers = ["Email", "Subscribed At", "Status"];
        const csvContent = [
            headers.join(","),
            ...subscribers.map(sub => [
                sub.email,
                new Date(sub.subscribedAt).toISOString(),
                sub.isActive ? "Active" : "Inactive"
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Subscribers
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                        Manage your newsletter audience and growth.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                        <Users size={18} className="text-blue-500" />
                        <span className="font-bold text-gray-900 dark:text-white">{subscribers.length}</span>
                        <span className="hidden sm:inline">total subscribers</span>
                    </div>
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 font-medium shadow-md"
                    >
                        <Download className="w-4 h-4" />
                        Export Data
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search subscribers by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Subscriber</th>
                                <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center">Emails Sent</th>
                                <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Join Date</th>
                                <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                            {filteredSubscribers.length > 0 ? (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub._id} className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full flex items-center justify-center">
                                                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {sub.email}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                                                        ID: {sub._id.substring(sub._id.length - 8).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset
                                                ${sub.isActive
                                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 ring-green-600/20"
                                                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 ring-red-600/20"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${sub.isActive ? "bg-green-500" : "bg-red-500"}`} />
                                                {sub.isActive ? "Active" : "Unsubscribed"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                                                {sub.emailsSentCount || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                {new Date(sub.subscribedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleUnsubscribe(sub.email)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                title="Unsubscribe customer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                                <Users size={32} className="text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No subscribers found</h3>
                                            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto text-sm">
                                                Records will appear here as soon as someone signs up for your newsletter.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
							)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Subscribers;
