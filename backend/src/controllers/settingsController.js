const SystemSetting = require('../models/SystemSetting');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await SystemSetting.getSettings();

  res.status(200).json({
    status: 'success',
    data: settings
  });
});

exports.updateSettings = catchAsync(async (req, res, next) => {
  let settings = await SystemSetting.getSettings();

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

  if (req.body.marketplace) {
    settings.marketplace = {
      ...settings.marketplace,
      ...req.body.marketplace
    };
  }

  if (req.body.seo) {
    settings.seo = {
      ...settings.seo,
      ...req.body.seo
    };
  }

  if (req.body.announcement) {
    settings.announcement = {
      ...settings.announcement,
      ...req.body.announcement
    };
  }

  await settings.save();

  res.status(200).json({
    status: 'success',
    data: settings
  });
});
