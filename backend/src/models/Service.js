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

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: [3, "Service title must be at least 3 characters"],
      maxlength: [120, "Service title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    longDescription: {
      type: String,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "web-development",
        "mobile-development",
        "ui-ux-design",
        "backend-development",
        "consulting",
        "maintenance",
        "custom-solutions",
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    packages: [
      {
        name: {
          type: String,
          required: true,
          enum: ["basic", "standard", "premium"],
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
        originalPrice: {
          type: Number,
          min: [0, "Original Price cannot be negative"],
        },
        discount: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        // Note: All prices are stored in INR. Surcharge is applied at display/checkout via settings.
        deliveryTime: {
          type: Number,
          required: true,
          min: [1, "Delivery time must be at least 1 day"],
        },
        revisions: {
          type: Number,
          default: -1, // -1 for unlimited
        },
        features: [
          {
            type: String,
            required: true,
          },
        ],
        isPopular: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
    portfolioItems: [
      {
        title: String,
        description: String,
        image: {
          public_id: String,
          url: String,
        },
        url: String,
        technologies: [String],
      },
    ],
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
    deliverables: [
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
    faqs: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
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
    totalOrders: {
      type: Number,
      default: 0,
    },
    completedOrders: {
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    availability: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      nextAvailableDate: Date,
      maxOrdersPerMonth: {
        type: Number,
        default: 10,
      },
      currentMonthOrders: {
        type: Number,
        default: 0,
      },
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
      averageOrderValue: {
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
serviceSchema.virtual('confirmReviews', {
  ref: 'Review',
  foreignField: 'service',
  localField: '_id'
});

// Virtual for starting price
serviceSchema.virtual("startingPrice").get(function () {
  if (this.packages && this.packages.length > 0) {
    return Math.min(...this.packages.map((pkg) => pkg.price));
  }
  return 0;
});

// Virtual for completion rate
serviceSchema.virtual("completionRate").get(function () {
  if (this.totalOrders === 0) return 100;
  return Math.round((this.completedOrders / this.totalOrders) * 100);
});

// Indexes for better performance
serviceSchema.index({ category: 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ "packages.price": 1 });
serviceSchema.index({ "rating.average": -1 });
serviceSchema.index({ totalOrders: -1 });
serviceSchema.index({ createdAt: -1 });
serviceSchema.index({ isFeatured: 1, isActive: 1 });
serviceSchema.index({ title: "text", description: "text", tags: "text" });

// Pre-save middleware to generate slug
serviceSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Pre-save middleware to auto-calculate discount percentage for packages
serviceSchema.pre("save", function (next) {
  if (this.packages && this.packages.length > 0) {
    this.packages.forEach(pkg => {
      // If both originalPrice and price are set, calculate discount percentage
      if (pkg.originalPrice && pkg.price && pkg.originalPrice > pkg.price) {
        pkg.discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
      }
    });
  }
  next();
});

// Method to increment views
serviceSchema.methods.incrementViews = function () {
  return this.updateOne({ $inc: { views: 1 } });
};

// Method to update rating
// Method to update rating - DEPRECATED: Handled by Review model hooks
// serviceSchema.methods.updateRating = ...

// Method to check availability
serviceSchema.methods.checkAvailability = function () {
  if (!this.availability.isAvailable) return false;
  if (
    this.availability.nextAvailableDate &&
    this.availability.nextAvailableDate > new Date()
  )
    return false;
  if (
    this.availability.currentMonthOrders >= this.availability.maxOrdersPerMonth
  )
    return false;
  return true;
};

// Alias for lowercase reference issues
mongoose.model("service", serviceSchema);

module.exports = mongoose.model("Service", serviceSchema);
