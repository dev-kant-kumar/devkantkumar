const Setting = require('../models/Setting');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await Setting.getSettings();

  res.status(200).json({
    status: 'success',
    data: {
      settings
    }
  });
});

exports.updateSettings = catchAsync(async (req, res, next) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = new Setting();
  }

  // Update fields if provided
  if (req.body.currency) {
    settings.currency = {
      ...settings.currency,
      ...req.body.currency
    };
  }

  if (req.body.general) {
    settings.general = {
      ...settings.general,
      ...req.body.general
    };
  }

  await settings.save();

  res.status(200).json({
    status: 'success',
    data: {
      settings
    }
  });
});
