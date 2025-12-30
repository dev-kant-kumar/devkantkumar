import {
    ArrowRight,
    CheckCircle2,
    Clock,
    Eye,
    Globe,
    Info,
    Layout,
    Loader2,
    Megaphone,
    Palette,
    Save,
    Settings as SettingsIcon,
    Trophy,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    useGetGeneralSettingsQuery,
    useUpdateGeneralSettingsMutation
} from '../../store/api/adminApiSlice';

const Announcements = () => {
    const { data: settings, isLoading, refetch } = useGetGeneralSettingsQuery();
    const [updateSettings, { isLoading: isUpdating }] = useUpdateGeneralSettingsMutation();

    const [announcementData, setAnnouncementData] = useState({
        campaignName: 'New Year Special',
        bannerText: '🚀 New Year, New Projects! Check out my latest work.',
        bannerLink: '/projects',
        isActive: false,
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        startDate: '',
        endDate: '',
        targetPages: ['all'],
        priority: 0,
        isDismissible: true
    });

    useEffect(() => {
        if (settings?.data?.announcement) {
            const data = settings.data.announcement;
            setAnnouncementData({
                ...data,
                startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : '',
                endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : '',
            });
        }
    }, [settings]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnnouncementData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTargetPageToggle = (page) => {
        setAnnouncementData(prev => {
            if (page === 'all') return { ...prev, targetPages: ['all'] };

            const newTargets = prev.targetPages.includes('all')
                ? [page]
                : prev.targetPages.includes(page)
                    ? prev.targetPages.filter(p => p !== page)
                    : [...prev.targetPages, page];

            return {
                ...prev,
                targetPages: newTargets.length === 0 ? ['all'] : newTargets
            };
        });
    };

    const onSave = async (e) => {
        e.preventDefault();
        try {
            const updatedSettings = {
                ...settings.data,
                announcement: {
                    ...announcementData,
                    priority: Number(announcementData.priority),
                    startDate: announcementData.startDate || null,
                    endDate: announcementData.endDate || null
                }
            };
            await updateSettings(updatedSettings).unwrap();
            toast.success("Announcement settings updated!");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update settings");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <Megaphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 w-6 h-6" />
                </div>
            </div>
        );
    }

    const pageOptions = [
        { id: 'all', label: 'All Pages' },
        { id: 'home', label: 'Home Page' },
        { id: 'projects', label: 'Projects' },
        { id: 'blog', label: 'Blog' },
        { id: 'skills', label: 'Skills' },
        { id: 'marketplace', label: 'Marketplace' }
    ];

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
            {/* High-End Header */}
            <header className="relative py-12 px-8 rounded-xl bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 text-white overflow-hidden shadow-2xl shadow-blue-900/40">
                <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl bg-blue-400 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 p-12 opacity-10 blur-3xl bg-purple-400 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-blue-300 text-xs font-black uppercase tracking-[0.2em]">
                            <SettingsIcon size={14} className="animate-[spin_4s_linear_infinite]" />
                            Marketing Command Center
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                            Broadcasting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Campaigns.</span>
                        </h1>
                        <p className="text-blue-100/70 text-xl font-medium max-w-xl leading-relaxed">
                            Orchestrate world-class announcement banners with precision scheduling and targeting.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                         <div className={`group relative flex items-center gap-4 px-8 py-5 rounded-[2rem] border transition-all duration-500 backdrop-blur-2xl ${
                            announcementData.isActive
                                ? 'bg-green-500/10 border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)] scale-105'
                                : 'bg-white/5 border-white/10 text-gray-400'
                        }`}>
                            <div className="space-y-1 text-right">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${announcementData.isActive ? 'text-green-400' : 'text-gray-500'}`}>Status</span>
                                <div className={`text-xl font-black ${announcementData.isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {announcementData.isActive ? 'OPERATIONAL' : 'OFFLINE'}
                                </div>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 ${
                                announcementData.isActive ? 'bg-green-500 shadow-lg shadow-green-500/40 text-white' : 'bg-gray-800 text-gray-600'
                            }`}>
                                {announcementData.isActive ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <form onSubmit={onSave} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Main Configuration Section */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Banner Content Card */}
                    <div className="group bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] hover:border-blue-200 dark:hover:border-blue-900/30">
                        <div className="p-10">
                            <div className="flex items-center gap-5 mb-12">
                                <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Layout size={28} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Content Strategy</h3>
                                    <p className="text-sm font-medium text-gray-500">Define your campaign's core identity and message</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                                <div className="space-y-5">
                                    <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                        <Megaphone size={12} className="text-blue-500" /> Campaign Name
                                    </label>
                                    <input
                                        name="campaignName"
                                        value={announcementData.campaignName}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-lg placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                        placeholder="e.g. Winter Sale 2024"
                                    />
                                </div>
                                <div className="space-y-5">
                                    <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                        <Trophy size={12} className="text-amber-500" /> Relative Priority
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="priority"
                                            value={announcementData.priority}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-bold text-lg"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full">
                                            RANK
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-5">
                                    <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                        <Info size={12} className="text-purple-500" /> Blast Message
                                    </label>
                                    <textarea
                                        name="bannerText"
                                        value={announcementData.bannerText}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-8 py-6 rounded-[2rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all font-bold text-xl leading-relaxed resize-none placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                        placeholder="Enter the high-impact message..."
                                    />
                                </div>

                                <div className="space-y-5">
                                    <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                        <ArrowRight size={12} className="text-indigo-500" /> Conversion URL
                                    </label>
                                    <input
                                        name="bannerLink"
                                        value={announcementData.bannerLink}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold"
                                        placeholder="e.g. /projects"
                                    />
                                </div>

                                <div className="flex items-end h-full mb-1">
                                    <label className="w-full relative flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/30 border-2 border-transparent hover:border-blue-500/20 transition-all cursor-pointer group/toggle">
                                        <input
                                            type="checkbox"
                                            name="isDismissible"
                                            checked={announcementData.isDismissible}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                                <XCircle size={18} />
                                            </div>
                                            <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Dismissible</span>
                                        </div>
                                        <div className="relative w-12 h-7 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[1.25rem] after:w-[1.25rem] after:transition-all peer-checked:after:translate-x-full" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                        <div className="p-10">
                            <div className="flex items-center gap-5 mb-12">
                                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl text-white shadow-xl shadow-purple-500/20">
                                    <Globe size={28} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Deployment Logistics</h3>
                                    <p className="text-sm font-medium text-gray-500">Control when and where your message is visible</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Universal Targeting</label>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {pageOptions.map(option => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => handleTargetPageToggle(option.id)}
                                                className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                                                    announcementData.targetPages.includes(option.id)
                                                        ? 'bg-blue-600 border-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] scale-105'
                                                        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-gray-100 dark:border-gray-800">
                                    <div className="space-y-5">
                                        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                            <Clock size={14} className="text-emerald-500" /> Start Sequence
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            value={announcementData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-5">
                                        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                            <Clock size={14} className="text-rose-500" /> Termination Sequence
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            value={announcementData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/5 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Creative & Controls */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="sticky top-10 space-y-10">
                        {/* Interactive Preview Card */}
                        <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden p-1">
                            <div className="bg-black/50 p-8 rounded-[2.3rem] space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Eye size={16} className="text-blue-500" /> Real-time Feed
                                    </h3>
                                    <div className="flex items-center gap-3">
                                         <label className="relative inline-flex items-center cursor-pointer scale-125">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={announcementData.isActive}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-9 h-5 bg-gray-800 border border-white/5 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-full transition-colors" />
                                        </label>
                                    </div>
                                </div>

                                <div className="relative group/preview py-12 px-6 rounded-3xl border border-dashed border-gray-800 bg-gray-950 flex flex-col items-center justify-center min-h-[180px] transition-all">
                                    <div
                                        className="w-full py-5 px-6 rounded-2xl text-center font-black text-sm shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-700 flex items-center justify-center gap-4 border border-white/10"
                                        style={{
                                            backgroundColor: announcementData.backgroundColor,
                                            color: announcementData.textColor,
                                            opacity: announcementData.isActive ? 1 : 0.3,
                                            transform: announcementData.isActive ? 'translateY(0)' : 'translateY(10px)'
                                        }}
                                    >
                                        <Megaphone size={18} />
                                        <span>{announcementData.bannerText || "BROADCAST MESSAGE"}</span>
                                        {announcementData.bannerLink && <ArrowRight size={18} className="animate-pulse" />}
                                    </div>

                                    {!announcementData.isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-3xl opacity-0 group-hover/preview:opacity-100 transition-opacity pointer-events-none">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                                                <Info size={14} /> Systems Offline
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Branding</label>
                                            <div className="relative group/color">
                                                <input
                                                    type="color"
                                                    name="backgroundColor"
                                                    value={announcementData.backgroundColor}
                                                    onChange={handleInputChange}
                                                    className="w-full h-14 rounded border-2 border-gray-800 bg-transparent cursor-pointer hover:border-blue-500/50 transition-colors"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-black text-white/50 group-hover/color:text-white transition-colors">
                                                    HEX: {announcementData.backgroundColor}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Typeface</label>
                                            <div className="relative group/color">
                                                <input
                                                    type="color"
                                                    name="textColor"
                                                    value={announcementData.textColor}
                                                    onChange={handleInputChange}
                                                    className="w-full h-14 rounded border-2 border-gray-800 bg-transparent cursor-pointer hover:border-blue-500/50 transition-colors"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-black text-white/50 group-hover/color:text-white transition-colors">
                                                    HEX: {announcementData.textColor}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-[1.50rem] border border-white/5 space-y-4">
                                        <div className="flex items-center gap-2 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                                            <Palette size={14} className="text-blue-500" /> Deployment Logic
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-bold uppercase tracking-tighter">Pages</span>
                                                <span className="text-white font-black">{announcementData.targetPages.length} SECTORS</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-bold uppercase tracking-tighter">Priority</span>
                                                <span className="text-blue-400 font-black">LVL {announcementData.priority}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="w-full py-6 rounded-[1.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xl font-black uppercase tracking-widest transition-all shadow-[0_20px_50px_rgba(37,99,235,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-4"
                                    >
                                        {isUpdating ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} className="group-hover:rotate-12 transition-transform" />}
                                        Launch
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Announcements;
