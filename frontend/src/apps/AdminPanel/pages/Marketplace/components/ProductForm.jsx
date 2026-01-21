import {
    Check,
    ChevronDown,
    Coins,
    Eye,
    FileText,
    Github,
    Globe,
    Image as ImageIcon,
    Layers,
    Link as LinkIcon,
    Loader,
    Plus,
    Tag,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
    useUploadFilesMutation,
    useUploadImageMutation
} from "../../../store/api/adminApiSlice";


const CATEGORIES = [
  { value: "templates", label: "Templates", icon: "📄" },
  { value: "components", label: "Components", icon: "🧩" },
  { value: "themes", label: "Themes", icon: "🎨" },
  { value: "plugins", label: "Plugins", icon: "🔌" },
  { value: "graphics", label: "Graphics", icon: "🖼️" },
  { value: "fonts", label: "Fonts", icon: "🔤" },
  { value: "courses", label: "Courses", icon: "📚" },
  { value: "ebooks", label: "Ebooks", icon: "📖" },
];

const MAX_DESC_CHARS = 1000;
const MAX_TAGS = 10;
const MAX_TAG_CHARS = 20;

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  error,
  ...props
}) => (
  <div className="relative group">
    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border transition-all duration-200 outline-none
                    ${
                      error
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                    } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1 ml-1 animate-in slide-in-from-top-1">
        {error}
      </p>
    )}
  </div>
);

// Premium Custom Dropdown Component
const CustomDropdown = ({ value, onChange, options, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name: "category", value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative group" ref={dropdownRef}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border text-left transition-all duration-200 outline-none
                    ${
                      isOpen
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {Icon && <Icon size={18} />}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedOption.icon}</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {selectedOption.label}
          </span>
        </div>
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/30 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors
                                ${
                                  value === option.value
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                }`}
            >
              <span className="flex-1 font-medium">{option.label}</span>
              {value === option.value && (
                <Check size={18} className="text-blue-600 dark:text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductForm = ({ initialData, onSubmit, isLoading, onCancel }) => {
  /* const { data: settingsData } = useGetSettingsQuery(); */
  const baseCurrency = "INR";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "templates",
    images: [],
    demoUrl: "",
    sourceCodeUrl: "",
    downloadFiles: [],
    tags: [],
    regionalPricing: [],
    features: [],
  });


  const [featureInput, setFeatureInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [externalFile, setExternalFile] = useState({ name: "", url: "" });
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [uploadFiles, { isLoading: isUploadingFiles }] =
    useUploadFilesMutation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags || [],
        downloadFiles: initialData.downloadFiles || [],
        regionalPricing: initialData.regionalPricing || [],
        features: initialData.features || [],
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 120) {
      newErrors.title = "Title cannot exceed 120 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    // URL fields are optional in schema but logic might require them if fields present?
    // Current logic enforced them. I'll keep enforcement.
    if (formData.demoUrl.trim() && !urlPattern.test(formData.demoUrl)) {
      newErrors.demoUrl = "Enter a valid URL (http:// or https://)";
    }

    if (
      formData.sourceCodeUrl.trim() &&
      !urlPattern.test(formData.sourceCodeUrl)
    ) {
      newErrors.sourceCodeUrl = "Enter a valid URL (http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const MAX_SIZE_MB = 100;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    const ALLOWED_EXTS = [
      ".zip",
      ".rar",
      ".pdf",
      ".docx",
      ".pptx",
      ".txt",
      ".png",
      ".jpg",
      ".jpeg",
      ".svg",
      ".webp",
    ];

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      const ext = "." + file.name.split(".").pop().toLowerCase();
      if (file.size > MAX_SIZE_BYTES) {
        invalidFiles.push(`${file.name} (Too large)`);
      } else if (!ALLOWED_EXTS.includes(ext)) {
        invalidFiles.push(`${file.name} (Invalid format)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(`Rejected:\n${invalidFiles.join("\n")}`);
      if (validFiles.length === 0) return;
    }

    const uploadFormData = new FormData();
    validFiles.forEach((file) => uploadFormData.append("files", file));

    try {
      const res = await uploadFiles(uploadFormData).unwrap();
      if (res.files) {
        setFormData((prev) => ({
          ...prev,
          downloadFiles: [
            ...(prev.downloadFiles || []),
            ...res.files.map((f) => ({
              name: f.originalName,
              url: f.url,
              size: f.size,
              type: f.mimetype,
              public_id: f.id,
            })),
          ],
        }));
        setErrors((prev) => ({ ...prev, downloadFiles: null }));
        toast.success(`${res.files.length} file(s) uploaded`);
      }
    } catch (err) {
      console.error(err);
      toast.error("File upload failed");
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      downloadFiles: prev.downloadFiles.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > MAX_DESC_CHARS) return;

    let newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddExternalFile = () => {
    if (!externalFile.name.trim() || !externalFile.url.trim()) {
      toast.error("Name and URL are required");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      downloadFiles: [
        ...prev.downloadFiles,
        {
          name: externalFile.name,
          url: externalFile.url,
          size: 0,
          type: "external",
        },
      ],
    }));
    setExternalFile({ name: "", url: "" });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage(formData).unwrap();
      if (res.image) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { url: res.image.url, public_id: res.image.id },
          ],
        }));
        setErrors((prev) => ({ ...prev, images: null }));
        toast.success("Image uploaded");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }
    const submissionData = {
      ...formData,
      price: Number(formData.price),
      regionalPricing: formData.regionalPricing.map((p) => ({
        currency: p.currency,
        price: Number(p.price),
        region: p.region || p.currency,
      })),
    };
    onSubmit(submissionData);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!tagInput.trim()) return;

      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .filter((tag) => !formData.tags.includes(tag));

      if (newTags.length === 0) {
        setTagInput("");
        return;
      }

      if (formData.tags.length + newTags.length > MAX_TAGS) {
        toast.error(`Maximum ${MAX_TAGS} tags allowed`);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, ...newTags],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. Basic Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FileText size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Product Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Modern Portfolio Template"
            error={errors.title}
          />

          <CustomDropdown
            label="Category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORIES}
            icon={Layers}
          />
        </div>

        <div className="relative group">
          <div className="flex justify-between mb-1.5 ml-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Description
            </label>
            <span
              className={`text-xs ${
                formData.description.length >= MAX_DESC_CHARS
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {formData.description.length} / {MAX_DESC_CHARS}
            </span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border transition-all duration-200 outline-none resize-none
                      ${
                        errors.description
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                      } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
            placeholder="Detailed description of features, tech stack, and benefits..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.description}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="flex justify-between mb-1.5 ml-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tags
            </label>
            <span className="text-xs text-gray-400">
              {formData.tags.length} / {MAX_TAGS}
            </span>
          </div>

          <div
            className={`w-full min-h-[50px] px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all flex flex-wrap gap-2`}
          >
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 animate-in zoom-in-50 duration-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                  className="ml-1.5 hover:text-blue-900 dark:hover:text-blue-100 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={
                formData.tags.length < MAX_TAGS
                  ? "Type tags separated by comma..."
                  : "Max tags reached"
              }
              disabled={formData.tags.length >= MAX_TAGS}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm py-1"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 ml-1">
            Type tags separated by comma and press Enter
          </p>
        </div>
      </section>

      {/* 2. Features */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Tag size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Start Features
          </h3>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
            Key Features List
          </label>

          <div className="space-y-2">
            {formData.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl group hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddFeature())
                }
                placeholder="Add a key feature (e.g. 'Responsive Design')"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Media Uploads */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <ImageIcon size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Media & Assets
          </h3>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
            Product Images{" "}
            <span className="text-gray-400 font-normal normal-case ml-1">
              (Cover & Gallery)
            </span>
          </label>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <label
            className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
                  ${
                    errors.images
                      ? "border-red-300 bg-red-50/50 dark:bg-red-900/10"
                      : "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                  }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
              {isUploading ? (
                <Loader className="w-8 h-8 animate-spin mb-2" />
              ) : (
                <Upload className="w-8 h-8 mb-2" />
              )}
              <p className="text-sm font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-xs opacity-70 mt-1">
                PNG, JPG, WEBP (Max 100MB) • Rec: 1920x1080px (16:9)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          {errors.images && (
            <p className="text-red-500 text-xs ml-1">{errors.images}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
            Product Files{" "}
            <span className="text-gray-400 font-normal normal-case ml-1">
              (Downloadable Assets)
            </span>
          </label>

          <div className="columns-2 md:columns-3 gap-4 space-y-4 pb-4">
            {formData.downloadFiles.map((file, idx) => (
              <div
                key={idx}
                className="break-inside-avoid relative group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden mb-4 shadow-sm hover:shadow-md transition-all"
              >
                {/* Preview Area */}
                {file.type?.toString().startsWith("image/") ? (
                  <div className="relative">
                    <img
                      src={file.url}
                      alt=""
                      className="w-full h-auto block"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors backdrop-blur-md"
                        title="View Image"
                      >
                        <Eye size={18} />
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors backdrop-blur-md"
                        title="Remove File"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 aspect-[4/3] group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors relative">
                    <FileText
                      size={40}
                      className="text-gray-400 mb-3 group-hover:text-blue-500 transition-colors"
                    />
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      {file.type || "FILE"}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg rounded-lg hover:text-blue-500"
                      >
                        <Eye size={18} />
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg rounded-lg hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer Info */}
                <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                  <p
                    className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1"
                    title={file.name}
                  >
                    {file.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      {file.type
                        ? file.type.split("/").pop().toUpperCase()
                        : "LINK"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <label
            className={`relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
                  ${
                    errors.downloadFiles
                      ? "border-red-300 bg-red-50/50 dark:bg-red-900/10"
                      : "border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                  }`}
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-5 text-gray-500 dark:text-gray-400">
              {isUploadingFiles ? (
                <Loader className="w-6 h-6 animate-spin mb-2" />
              ) : (
                <Upload className="w-6 h-6 mb-2" />
              )}
              <p className="text-sm font-medium">
                Upload Product Files (ZIP, PDF, etc)
              </p>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploadingFiles}
            />
          </label>
          {errors.downloadFiles && (
            <p className="text-red-500 text-xs ml-1">{errors.downloadFiles}</p>
          )}

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
            <span className="text-xs text-gray-500 font-medium uppercase">
              OR ADD LINK
            </span>
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="File Name (e.g. Documentation)"
              value={externalFile.name}
              onChange={(e) =>
                setExternalFile((prev) => ({ ...prev, name: e.target.value }))
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm text-gray-900 dark:text-white"
            />
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={externalFile.url}
              onChange={(e) =>
                setExternalFile((prev) => ({ ...prev, url: e.target.value }))
              }
              className="flex-[2] px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddExternalFile}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors text-sm whitespace-nowrap"
            >
              Add Link
            </button>
          </div>
        </div>
      </section>

      {/* 3. Pricing */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <Coins size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pricing
          </h3>
        </div>

        <div className="max-w-md">
          <InputField
            label="Price (INR)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            icon={Coins}
            error={errors.price}
          />
        </div>
      </section>

      {/* 4. External Links */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
            <LinkIcon size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            External Links
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Live Demo URL"
            name="demoUrl"
            icon={Globe}
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="https://preview.com"
            error={errors.demoUrl}
          />
          <InputField
            label="Source Code (Repo)"
            name="sourceCodeUrl"
            icon={Github}
            value={formData.sourceCodeUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            error={errors.sourceCodeUrl}
          />
        </div>
      </section>

      {/* Footer Actions */}
      <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 border border-transparent hover:border-red-200 dark:hover:border-red-800/30 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploading || isUploadingFiles}
          className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Saving...
            </span>
          ) : initialData ? (
            "Save Changes"
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
