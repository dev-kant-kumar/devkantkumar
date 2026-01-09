const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  currency: {
    baseCurrency: {
      type: String,
      required: true,
      default: 'USD',
      uppercase: true,
      trim: true
    },
    exchangeRates: [{
      code: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
      },
      rate: {
        type: Number,
        required: true,
        min: 0
      },
      symbol: {
        type: String,
        required: true,
        trim: true
      },
      isActive: {
        type: Boolean,
        default: true
      }
    }]
  },
  general: {
    siteName: {
      type: String,
      default: 'MarketPlace'
    },
    supportEmail: String
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      currency: {
        baseCurrency: 'USD',
        exchangeRates: [
          { code: 'INR', rate: 84, symbol: '₹', isActive: true },
          { code: 'EUR', rate: 0.92, symbol: '€', isActive: true },
          { code: 'GBP', rate: 0.79, symbol: '£', isActive: true }
        ]
      }
    });
  }
  return settings;
};

module.exports = mongoose.model('Setting', settingSchema);
