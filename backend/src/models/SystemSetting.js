const mongoose = require('mongoose');

const systemSettingSchema = new mongoose.Schema({
  marketplace: {
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR', 'GBP']
    },
    taxRate: {
      type: Number,
      default: 18,
      min: 0,
      max: 100
    },
    enableProductSales: {
      type: Boolean,
      default: true
    },
    enableServiceBooking: {
      type: Boolean,
      default: true
    }
  },
  general: {
    siteName: {
      type: String,
      default: 'DevKant Kumar Portfolio'
    },
    supportEmail: {
      type: String,
      default: 'contact@devkantkumar.com'
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String
  },
  announcement: {
    campaignName: {
      type: String,
      default: 'General'
    },
    bannerText: {
      type: String,
      default: ''
    },
    bannerLink: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#3b82f6'
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    startDate: Date,
    endDate: Date,
    targetPages: {
      type: [String],
      default: ['all']
    },
    priority: {
      type: Number,
      default: 0
    },
    isDismissible: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Prevent multiple settings documents
// We will only ever have one document with a fixed ID or logic to fetch the first one
systemSettingSchema.statics.getSettings = async function() {
  const settings = await this.findOne();
  if (settings) return settings;

  // Create defaults if not found
  return await this.create({});
};

module.exports = mongoose.model('SystemSetting', systemSettingSchema);
