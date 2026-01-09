const mongoose = require('mongoose');

const systemSettingSchema = new mongoose.Schema({
  marketplace: {
    currency: {
      baseCurrency: {
        type: String,
        default: 'INR',
        required: true
      },
      exchangeRates: [{
        code: {
          type: String,
          required: true,
          uppercase: true
        },
        name: String,
        symbol: String,
        rate: {
          type: Number,
          required: true,
          default: 1
        },
        isActive: {
          type: Boolean,
          default: true
        }
      }]
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
      default: 'support@devkantkumar.com'
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
  return await this.create({
    marketplace: {
      currency: {
        baseCurrency: 'INR',
        exchangeRates: [
          { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.012, isActive: true },
          { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.011, isActive: true },
          { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.0094, isActive: true }
        ]
      }
    }
  });
};

module.exports = mongoose.model('SystemSetting', systemSettingSchema);
