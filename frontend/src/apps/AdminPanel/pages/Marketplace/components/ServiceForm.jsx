import {
    Briefcase,
    Check,
    ChevronDown,
    Image as ImageIcon,
    IndianRupee,
    Layers,
    Loader,
    Package,
    Plus,
    Sparkles,
    Star,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
    useUploadImageMutation
} from "../../../store/api/adminApiSlice";

const CATEGORIES = [
  { value: "web-development", label: "Web Development", icon: "💻" },
  { value: "mobile-development", label: "Mobile Development", icon: "📱" },
  { value: "ui-ux-design", label: "UI/UX Design", icon: "🎨" },
  { value: "backend-development", label: "Backend Development", icon: "⚙️" },
  { value: "consulting", label: "Consulting", icon: "💡" },
  { value: "maintenance", label: "Maintenance", icon: "🔧" },
  { value: "custom-solutions", label: "Custom Solutions", icon: "🚀" },
];

const PACKAGES = ["basic", "standard", "premium"];

// Validation limits
const MAX_DESC_CHARS = 1000;
const MIN_TITLE_CHARS = 3;
const MAX_TITLE_CHARS = 100;

// Premium InputField Component
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

      {/* Dropdown Options */}
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
              <span className="text-xl">{option.icon}</span>
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

const ServiceForm = ({ initialData, onSubmit, isLoading, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "web-development",
    images: [],
    packages: PACKAGES.map((type) => ({
      name: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: "",
      price: "",
      originalPrice: "",
      discount: 0,
      deliveryTime: "",
      revisions: "unlimited",
      features: [""],
      isPopular: type === "standard",
      regionalPricing: [],
    })),
  });

  const [errors, setErrors] = useState({});
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const baseCurrency = "INR";

  useEffect(() => {
    if (initialData) {
      const mergedPackages = PACKAGES.map((type) => {
        const existing = initialData.packages?.find((p) => p.name === type);
        return existing
          ? {
              ...existing,
              features: existing.features?.length ? existing.features : [""],
            }
          : {
              name: type,
              title: type.charAt(0).toUpperCase() + type.slice(1),
              description: "",
              price: "",
              originalPrice: "",
              discount: 0,
              deliveryTime: "",
              revisions: "unlimited",
              features: [""],
              isPopular: type === "standard",
              regionalPricing: [],
            };
      });
      setFormData({ ...initialData, packages: mergedPackages });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    // Title validation
    if (!formData.title.trim()) newErrors.title = "Service title is required";
    else if (formData.title.length < MIN_TITLE_CHARS)
      newErrors.title = `Title must be at least ${MIN_TITLE_CHARS} characters`;
    else if (formData.title.length > MAX_TITLE_CHARS)
      newErrors.title = `Title cannot exceed ${MAX_TITLE_CHARS} characters`;

    // Description validation
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters";
    else if (formData.description.length > MAX_DESC_CHARS)
      newErrors.description = `Description cannot exceed ${MAX_DESC_CHARS} characters`;
    const packageErrors = [];
    formData.packages.forEach((pkg, idx) => {
      const pkgErr = {};
      if (!pkg.title.trim()) pkgErr.title = "Required";
      if (!pkg.description.trim()) pkgErr.description = "Required";
      if (pkg.price === "" || Number(pkg.price) < 0) pkgErr.price = "Invalid";
      if (pkg.deliveryTime === "" || Number(pkg.deliveryTime) < 1)
        pkgErr.deliveryTime = "Invalid";
      if (Object.keys(pkgErr).length > 0) packageErrors[idx] = pkgErr;
    });
    if (packageErrors.length > 0) newErrors.packages = packageErrors;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const newPackages = [...prev.packages];
      let updatedPackage = { ...newPackages[index], [field]: value };

      // Discount Calculation Logic
      if (field === "price" || field === "originalPrice") {
        const price =
          field === "price"
            ? parseFloat(value)
            : parseFloat(updatedPackage.price);
        const original =
          field === "originalPrice"
            ? parseFloat(value)
            : parseFloat(updatedPackage.originalPrice);

        if (!isNaN(price) && !isNaN(original) && original > price) {
          updatedPackage.discount = Math.round(
            ((original - price) / original) * 100
          );
        } else {
          updatedPackage.discount = 0;
        }
      }

      // Auto-calculate regional pricing if price changes
      if (field === "price" && value !== "") {
        const basePrice = parseFloat(value);
        if (!isNaN(basePrice)) {
          updatedPackage.regionalPricing = calculateRegionalPricing(
            basePrice
          ).map((rp) => ({
            ...rp,
            discount: updatedPackage.discount || 0,
          }));
        }
      }

      newPackages[index] = updatedPackage;
      return { ...prev, packages: newPackages };
    });
  };



  const handleFeatureChange = (pkgIndex, featureIndex, value) => {
    setFormData((prev) => {
      const newPackages = [...prev.packages];
      const newFeatures = [...newPackages[pkgIndex].features];
      newFeatures[featureIndex] = value;
      newPackages[pkgIndex].features = newFeatures;
      return { ...prev, packages: newPackages };
    });
  };

  const addFeature = (pkgIndex) => {
    setFormData((prev) => {
      const newPackages = [...prev.packages];
      newPackages[pkgIndex].features.push("");
      return { ...prev, packages: newPackages };
    });
  };

  const removeFeature = (pkgIndex, featureIndex) => {
    setFormData((prev) => {
      const newPackages = [...prev.packages];
      newPackages[pkgIndex].features = newPackages[pkgIndex].features.filter(
        (_, i) => i !== featureIndex
      );
      return { ...prev, packages: newPackages };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    try {
      const res = await uploadImage(formDataUpload).unwrap();
      if (res.image) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { url: res.image.url, public_id: res.image.id },
          ],
        }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
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
      toast.error("Please fix errors in the form");
      return;
    }
    const validPackages = formData.packages.map((pkg) => {
      return {
        ...pkg,
        price: Number(pkg.price),
        originalPrice: Number(pkg.originalPrice),
        discount: Number(pkg.discount),
        deliveryTime: Number(pkg.deliveryTime),
        features: pkg.features.filter((f) => f.trim()),
        regionalPricing: [], // Clear/Ignore legacy field
      };
    });
    onSubmit({ ...formData, packages: validPackages });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Basic Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Briefcase size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title with character counter */}
          <div className="relative group">
            <div className="flex justify-between mb-1.5 ml-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service Title
              </label>
              <span
                className={`text-xs font-medium transition-colors ${
                  formData.title.length >= MAX_TITLE_CHARS
                    ? "text-red-500"
                    : formData.title.length >= MAX_TITLE_CHARS * 0.9
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {formData.title.length} / {MAX_TITLE_CHARS}
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Briefcase size={18} />
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={MAX_TITLE_CHARS}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border transition-all duration-200 outline-none
                              ${
                                errors.title
                                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                  : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                              } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                placeholder="e.g. Full Stack Web Application"
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 ml-1 animate-in slide-in-from-top-1">
                {errors.title}
              </p>
            )}
          </div>
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
              className={`text-xs font-medium transition-colors ${
                formData.description.length >= MAX_DESC_CHARS
                  ? "text-red-500"
                  : formData.description.length >= MAX_DESC_CHARS * 0.9
                  ? "text-yellow-500"
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
            maxLength={MAX_DESC_CHARS}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border transition-all duration-200 outline-none resize-none
                      ${
                        errors.description
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                      } text-gray-900 dark:text-white placeholder-gray-400`}
            placeholder="Describe your service in detail - what you offer, your process, and what clients can expect..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 ml-1 animate-in slide-in-from-top-1">
              {errors.description}
            </p>
          )}
        </div>
      </section>

      {/* 2. Media Uploads */}
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
            Service Images{" "}
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

          <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
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
        </div>
      </section>

      {/* 3. Service Packages */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="p-1.5 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <Package size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Service Packages
          </h3>
        </div>

        {errors.packages && (
          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            Please fix errors in packages below.
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {formData.packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-5 bg-white dark:bg-gray-800 border-2 transition-all duration-300 hover:shadow-lg
                          ${
                            pkg.isPopular
                              ? "border-blue-500 dark:border-blue-400 shadow-blue-500/10"
                              : errors.packages?.[index]
                              ? "border-red-300 dark:border-red-800"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                          }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                  <Star size={12} className="fill-current" /> POPULAR
                </div>
              )}

              <div className="flex items-center gap-2 mb-4 pt-2">
                <div
                  className={`p-2 rounded-lg ${
                    pkg.name === "basic"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      : pkg.name === "standard"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  }`}
                >
                  <Sparkles size={20} />
                </div>
                <h4 className="font-bold text-lg capitalize text-gray-900 dark:text-white">
                  {pkg.name}
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                    Package Title
                  </label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) =>
                      handlePackageChange(index, "title", e.target.value)
                    }
                    className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-700/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                      errors.packages?.[index]?.title
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } text-gray-900 dark:text-white`}
                    placeholder="e.g. Starter Package"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                    Description
                  </label>
                  <textarea
                    value={pkg.description}
                    onChange={(e) =>
                      handlePackageChange(index, "description", e.target.value)
                    }
                    className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-700/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none ${
                      errors.packages?.[index]?.description
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } text-gray-900 dark:text-white`}
                    rows={2}
                    placeholder="What's included..."
                  />
                </div>

                {/* Delivery & Revisions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                      Delivery Days
                    </label>
                    <input
                      type="number"
                      value={pkg.deliveryTime}
                      onChange={(e) =>
                        handlePackageChange(index, "deliveryTime", e.target.value)
                      }
                      className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-700/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        errors.packages?.[index]?.deliveryTime
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-900 dark:text-white`}
                      min="1"
                      placeholder="7"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                      Revisions
                    </label>
                    <input
                      type="number"
                      value={pkg.revisions === -1 ? "" : pkg.revisions}
                      onChange={(e) =>
                         handlePackageChange(
                          index,
                          "revisions",
                          e.target.value === "" ? -1 : Number(e.target.value)
                        )
                      }
                      className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white"
                      min="-1"
                      placeholder="Optional"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Empty = Unlimited</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Price Section */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl space-y-3 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1">
                        <IndianRupee size={12} /> Pricing ({baseCurrency})
                      </label>
                    </div>

                    <div>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) =>
                          handlePackageChange(index, "price", e.target.value)
                        }
                        className={`w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                          errors.packages?.[index]?.price
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } text-gray-900 dark:text-white`}
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                      Features
                    </label>
                    <div className="space-y-2 mt-2">
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, fIdx, e.target.value)
                            }
                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white"
                            placeholder="Feature..."
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index, fIdx)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFeature(index)}
                        className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-1"
                      >
                        <Plus size={14} /> Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
          disabled={isLoading || isUploading}
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
            "Create Service"
          )}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
