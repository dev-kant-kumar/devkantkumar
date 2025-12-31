import { AnimatePresence, motion } from "framer-motion";
import {
    Code2,
    Cpu,
    Database,
    Globe,
    Layout,
    Loader,
    Plus,
    Save,
    Settings2,
    Terminal,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    useCreateSkillMutation,
    useDeleteSkillMutation,
    useGetAdminSkillsQuery,
    useUpdateSkillMutation
} from "../../store/api/adminApiSlice";

const categoryIcons = {
  Frontend: <Globe size={18} />,
  Backend: <Terminal size={18} />,
  Database: <Database size={18} />,
  DevOps: <Cpu size={18} />,
  Mobile: <Layout size={18} />,
  Tools: <Settings2 size={18} />,
  Other: <Code2 size={18} />
};

const SkillsManagement = () => {
  const { data: skillsData, isLoading } = useGetAdminSkillsQuery();
  const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend",
    level: 80,
    priority: 0
  });

  const [editingId, setEditingId] = useState(null);

  // The backend might return grouped or flat data depending on implementation
  // Based on my refactored portfolioController, it returns grouped data with a 'details' array
  const categories = skillsData?.data || [];

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await createSkill(newSkill).unwrap();
      toast.success("Skill added successfully");
      setNewSkill({ name: "", category: "Frontend", level: 80, priority: 0 });
      setIsAdding(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this skill?")) {
      try {
        await deleteSkill(id).unwrap();
        toast.success("Skill deleted");
      } catch (error) {
        toast.error("Failed to delete skill");
      }
    }
  };

  const handleLevelChange = async (skill, newLevel) => {
    try {
       // Using the 'details' item from the grouped data which has the real _id
       await updateSkill({ id: skill._id, level: newLevel }).unwrap();
    } catch (error) {
       toast.error("Failed to update level");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <Cpu size={16} />
            </span>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Expertise</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Skills & Mastery
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage your technical toolbox and proficiency levels across categories.
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="group flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold tracking-tight">Add New Skill</span>
          </button>
        )}
      </div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden"
          >
            <form onSubmit={handleAddSkill} className="flex flex-col md:flex-row gap-6 items-end">
              <div className="flex-1 space-y-4 w-full">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Skill Name</label>
                      <input
                        type="text"
                        required
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                        placeholder="e.g. React.js"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white capitalize cursor-pointer"
                      >
                        {Object.keys(categoryIcons).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Proficiency Level ({newSkill.level}%)</label>
                       <input
                         type="range"
                         min="0"
                         max="100"
                         value={newSkill.level}
                         onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                         className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                       />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Display Priority</label>
                      <input
                        type="number"
                        value={newSkill.priority}
                        onChange={(e) => setNewSkill({...newSkill, priority: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all outline-none text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                 </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <button
                   type="button"
                   onClick={() => setIsAdding(false)}
                   className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   disabled={isCreating}
                   className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
                 >
                   {isCreating ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                   <span>Save Skill</span>
                 </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800/40 rounded-3xl animate-pulse border border-gray-200 dark:border-gray-700/50" />
          ))
        ) : categories.length === 0 ? (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
             <Cpu size={48} className="text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">No skills added yet</h3>
             <p className="text-gray-500 mt-1">Start by adding your core competencies.</p>
          </div>
        ) : (
          categories.map((categoryGroup, idx) => (
            <motion.div
              key={categoryGroup.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    {categoryIcons[categoryGroup.category] || <Code2 size={18} />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{categoryGroup.category}</h3>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg">
                  {categoryGroup.details.length} Items
                </span>
              </div>

              <div className="space-y-5 flex-1">
                {categoryGroup.details.map((skill) => (
                  <div key={skill._id} className="group relative">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        {skill.name}
                        <span className="text-[10px] text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          #{skill.priority}
                        </span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded-md"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {/* Mastery Bar */}
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        className={`h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                      />
                      {/* Interaction: Quick adjust level via click if we wanted, but keeping it simple */}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsManagement;
