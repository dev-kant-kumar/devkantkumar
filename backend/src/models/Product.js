const mongoose = require("mongoose");

// Simple slug generation function
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Product title must be at least 3 characters"],
      maxlength: [120, "Product title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    longDescription: {
      type: String,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "templates",
        "components",
        "themes",
        "plugins",
        "graphics",
        "fonts",
        "courses",
        "ebooks",
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 0,
    },
    // Note: All prices are stored in INR. Surcharge is applied at display/checkout via settings.
    images: [
      {
        public_id: String,
        url: {
          type: String,
          required: true,
        },
        alt: String,
      },
    ],
    previewImages: [
      {
        public_id: String,
        url: String,
        alt: String,
      },
    ],
    downloadFiles: [
      {
        name: String,
        url: String,
        size: Number,
        format: String,
        public_id: String,
      },
    ],
    demoUrl: String,
    sourceCodeUrl: String,
    documentationUrl: String,
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    compatibility: [
      {
        type: String,
        trim: true,
      },
    ],
    version: {
      type: String,
      default: "1.0.0",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    // reviews field removed in favor of virtual populate
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDigitalProduct: {
      type: Boolean,
      default: true,
    },
    license: {
      type: String,
      enum: ["personal", "commercial", "extended"],
      default: "personal",
    },
    licenseDetails: {
      type: String,
      maxlength: [1000, "License details cannot exceed 1000 characters"],
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    analytics: {
      totalRevenue: {
        type: Number,
        default: 0,
      },
      totalSales: {
        type: Number,
        default: 0,
      },
      conversionRate: {
        type: Number,
        default: 0,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for reviews
productSchema.virtual('confirmReviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

// Virtual for discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
});

// Virtual for savings amount
productSchema.virtual("savings").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return this.originalPrice - this.price;
  }
  return 0;
});

// Virtual for savings percentage
productSchema.virtual("savingsPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Indexes for better performance
productSchema.index({ category: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ price: 1 });
productSchema.index({ "rating.average": -1 });
productSchema.index({ downloads: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ title: "text", description: "text", tags: "text" });

// Pre-save middleware to generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Pre-save middleware to auto-calculate discount percentage if originalPrice and price are set
productSchema.pre("save", function (next) {
  // If both originalPrice and price are set, calculate discount percentage
  if (this.originalPrice && this.price && this.originalPrice > this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  next();
});

// Method to increment views
productSchema.methods.incrementViews = function () {
  return this.updateOne({ $inc: { views: 1 } });
};

// Method to increment downloads
productSchema.methods.incrementDownloads = function () {
  return this.updateOne({ $inc: { downloads: 1 } });
};

// Method to update rating
// Method to update rating - DEPRECATED: Handled by Review model hooks
// productSchema.methods.updateRating = ...

// Alias for lowercase reference issues
mongoose.model("product", productSchema);

module.exports = mongoose.model("Product", productSchema);
