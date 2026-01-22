const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  // Polymorphic reference - can be for a product or a service
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating is required']
  },
  comment: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    maxlength: [1000, 'Review cannot be more than 1000 characters']
  },
  images: [{
    public_id: String,
    url: String
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  response: {
    comment: String,
    audio: String, // URL to audio file
    repliedAt: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ service: 1, createdAt: -1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true, partialFilterExpression: { product: { $exists: true } } });
reviewSchema.index({ user: 1, service: 1 }, { unique: true, partialFilterExpression: { service: { $exists: true } } });

// Static method to calculate average rating and save to DB
reviewSchema.statics.calcAverageRatings = async function(resourceId, resourceType) {
  const stats = await this.aggregate([
    {
      $match: { [resourceType.toLowerCase()]: resourceId }
    },
    {
      $group: {
        _id: `$${resourceType.toLowerCase()}`,
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  const Model = mongoose.model(resourceType);

  if (stats.length > 0) {
    await Model.findByIdAndUpdate(resourceId, {
      'rating.average': Math.round(stats[0].avgRating * 10) / 10,
      'rating.count': stats[0].nRating,
      'reviews': [] // We don't want to embed anymore, or we keep IDs if we want refs, but let's stick to virtuals/separate queries usually.
                   // However, existing models show `reviews` field. The plan said to remove embedded or use virtual.
                   // To minimize breaking changes immediately, we might leave it but not populate it, or update it if it was storing IDs.
                   // The Product model had embedded schema, not IDs. So we should probably clear it or ignore it.
                   // Actually, let's look at Product.js again. It had embedded schema.
                   // So we should probably NOT update specific review fields there, just the aggregates.
    });
  } else {
    await Model.findByIdAndUpdate(resourceId, {
      'rating.average': 0,
      'rating.count': 0
    });
  }
};

// Call calcAverageRatings after save
reviewSchema.post('save', async function() {
  // this points to current review
  if (this.product) await this.constructor.calcAverageRatings(this.product, 'Product');
  if (this.service) await this.constructor.calcAverageRatings(this.service, 'Service');
});

// Call calcAverageRatings before remove/delete
// findOneAnd... logic might be needed for updates/deletes if we implement them
reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) {
    if (doc.product) await doc.constructor.calcAverageRatings(doc.product, 'Product');
    if (doc.service) await doc.constructor.calcAverageRatings(doc.service, 'Service');
  }
});

module.exports = mongoose.model('Review', reviewSchema);
