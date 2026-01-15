const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');
const { getRedisClient } = require('../db/redis'); // Import Redis client getter
const { validationResult } = require('express-validator');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .cookie('refreshToken', refreshToken, { ...options, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message,
      token,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        phone: user.profile?.phone,
        bio: user.profile?.bio,
        website: user.profile?.website,
        location: user.profile?.location,
        company: user.profile?.company,
        socialLinks: user.profile?.socialLinks,
        preferences: user.preferences,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt,
        addresses: user.addresses,
        cart: user.cart
      }
    });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      // Check if the account is permanently deactivated (past grace period)
      if (!existingUser.isActive && existingUser.scheduledDeletionAt) {
        const gracePeriodExpired = new Date(existingUser.scheduledDeletionAt) <= new Date();

        if (gracePeriodExpired) {
          // Account is permanently deactivated - remove it to allow re-registration
          await User.findByIdAndDelete(existingUser._id);
          logger.info(`Permanently deactivated account removed for re-registration: ${email}`);
        } else {
          // Still within grace period - user should reactivate instead
          return res.status(400).json({
            success: false,
            code: 'ACCOUNT_DEACTIVATED_RECOVERABLE',
            message: 'An account with this email exists and is scheduled for deletion. Please sign in to reactivate it.',
            hint: 'You can restore your account by signing in.'
          });
        }
      } else if (existingUser.isActive) {
        // Active account exists
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      } else {
        // Deactivated but no scheduled deletion date (legacy) - don't allow duplicate
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      isEmailVerified: false // Enforce email verification
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(user.email, verificationToken, user.firstName);
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails, but log it
    }

    logger.info(`New user registered: ${user.email} - awaiting verification`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    logger.info(`Login attempt for email: ${email}`);

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      logger.warn(`Login failed - User not found: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.info(`User found: ${user.email}, Role: ${user.role}`);

    // Check if account is locked
    if (user.isLocked) {
      logger.warn(`Login failed - Account locked: ${email}`);
      return res.status(423).json({
        success: false,
        message: 'Account temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active (handle deactivated accounts with grace period)
    if (!user.isActive) {
      // Check if within grace period
      if (user.scheduledDeletionAt && new Date(user.scheduledDeletionAt) > new Date()) {
        logger.warn(`Login attempt for deactivated account within grace period: ${email}`);

        // Format the scheduled deletion date
        const deletionDate = new Date(user.scheduledDeletionAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        return res.status(403).json({
          success: false,
          code: 'ACCOUNT_DEACTIVATED',
          message: 'Your account is scheduled for deletion',
          scheduledDeletionAt: user.scheduledDeletionAt,
          scheduledDeletionFormatted: deletionDate,
          canReactivate: true,
          hint: 'You can reactivate your account before this date by clicking "Reactivate Account".'
        });
      }

      logger.warn(`Login failed - Account permanently deactivated: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Account has been permanently deactivated',
        canReactivate: false
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      logger.warn(`Login failed - Email not verified: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Please verify your email address before logging in'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      logger.warn(`Login failed - Invalid password for: ${email}`);
      // Increment login attempts
      await user.incLoginAttempts();

      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Log successful login with role information
    if (user.role === 'admin') {
      logger.info(`🔐 ADMIN LOGIN SUCCESSFUL: ${user.email} - Admin panel access granted`);
    } else {
      logger.info(`✅ User login successful: ${user.email} - Role: ${user.role}`);
    }

    // Check for Two-Factor Authentication
    if (user.isTwoFactorEnabled) {
      // Create a temporary token for 2FA verification
      const tempToken = jwt.sign(
        { id: user._id, role: user.role, type: '2fa_pending' },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
      );

      return res.status(200).json({
        success: true,
        otpRequired: true,
        tempToken,
        message: 'Please enter your 2FA code'
      });
    }

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // Check if refresh token exists in cookies if not in body
    const tokenToBlacklist = refreshToken || (req.cookies && req.cookies.refreshToken);

    if (tokenToBlacklist) {
      const redisClient = getRedisClient();
      if (redisClient && redisClient.isOpen) {
        // Decode to get expiration time
        const decoded = jwt.decode(tokenToBlacklist);
        if (decoded && decoded.exp) {
          const ttl = decoded.exp - Math.floor(Date.now() / 1000);
          if (ttl > 0) {
            // Add to blacklist with expiration
            await redisClient.set(`blacklist:${tokenToBlacklist}`, 'true', { EX: ttl });
            logger.info('Refresh token blacklisted via Redis');
          }
        }
      } else {
        logger.warn('Redis client not available for token blacklisting');
      }
    }

    res
      .status(200)
      .clearCookie('token')
      .clearCookie('refreshToken')
      .json({
        success: true,
        message: 'Logged out successfully'
      });
  } catch (error) {
    logger.error('Logout error:', error);
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        phone: user.profile?.phone,
        bio: user.profile?.bio,
        website: user.profile?.website,
        location: user.profile?.location,
        company: user.profile?.company,
        socialLinks: user.profile?.socialLinks,
        preferences: user.preferences,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt,
        addresses: user.addresses,
        cart: user.cart
      }
    });
  } catch (error) {
    logger.error('Get me error:', error);
    next(error);
  }
};

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh
// @access  Public
const refreshToken = async (req, res, next) => {
  try {
    let { refreshToken } = req.body;

    // Fallback to cookie if not in body
    if (!refreshToken && req.cookies) {
      refreshToken = req.cookies.refreshToken;
    }

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Check Redis blacklist
    const redisClient = getRedisClient();
    if (redisClient && redisClient.isOpen) {
      const isBlacklisted = await redisClient.get(`blacklist:${refreshToken}`);
      if (isBlacklisted) {
        logger.warn('Attempt to use blacklisted refresh token');
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token (Revoked)'
        });
      }
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }

      sendTokenResponse(user, 200, res, 'Token refreshed successfully');
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
  } catch (error) {
    logger.error('Refresh token error:', error);
    next(error);
  }
};

// @desc    Verify email
// @route   GET /api/v1/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    logger.info(`Email verification attempt - Looking for token: ${hashedToken.substring(0, 10)}...`);

    // Find user with matching token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      // Let's diagnose what's happening
      // Check if any user has this token but it's expired
      const expiredTokenUser = await User.findOne({
        emailVerificationToken: hashedToken
      });

      if (expiredTokenUser) {
        logger.warn(`Verification token found but expired for: ${expiredTokenUser.email}`);
        return res.status(400).json({
          success: false,
          code: 'TOKEN_EXPIRED',
          message: 'Verification link has expired',
          hint: 'Please request a new verification email.'
        });
      }

      // Check if user is already verified (token cleared)
      // We can't match exact user, but log for debugging
      logger.warn(`No user found with token: ${hashedToken.substring(0, 10)}... - may be already used or invalid`);

      return res.status(400).json({
        success: false,
        code: 'TOKEN_INVALID_OR_USED',
        message: 'Invalid or expired verification token',
        hint: 'If you have already verified your email, you can proceed to sign in.'
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    logger.info(`Email verified for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    logger.error('Email verification error:', error);
    next(error);
  };
};

// @desc    Resend verification email
// @route   POST /api/v1/auth/resend-verification
// @access  Public
const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(
        user.email,
        verificationToken,
        user.firstName
      );

      res.status(200).json({
        success: true,
        message: 'Verification email sent'
      });
    } catch (err) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    logger.error('Resend verification error:', error);
    next(error);
  }
};


// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset email
    try {
      const emailResult = await emailService.sendPasswordResetEmail(user.email, resetToken, user.firstName);

      if (emailResult.info === 'Email service not configured') {
        res.status(200).json({
          success: true,
          message: 'Password reset token generated. Email service is currently unavailable.',
          resetToken: resetToken // Only for development - remove in production
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Password reset email sent'
        });
      }
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      logger.error('Failed to send password reset email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    logger.error('Forgot password error:', error);
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    logger.info(`Password reset for user: ${user.email}`);

    // Send password reset success confirmation email
    try {
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
      const userAgent = req.headers['user-agent'];

      await emailService.sendPasswordResetSuccessEmail(
        user.email,
        user.firstName || 'User',
        { ipAddress, userAgent }
      );
      logger.info(`Password reset success email sent to: ${user.email}`);
    } catch (emailError) {
      // Don't fail the reset if email fails, just log it
      logger.error('Failed to send password reset success email:', emailError);
    }

    sendTokenResponse(user, 200, res, 'Password reset successful');
  } catch (error) {
    logger.error('Reset password error:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/update-profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const {
      firstName, lastName, phone, bio, avatar, gender, dateOfBirth,
      website, location, company, socialLinks
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (avatar) user.avatar = avatar;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    // Update nested profile fields
    if (!user.profile) user.profile = {};

    if (phone) user.profile.phone = phone;
    if (bio) user.profile.bio = bio;
    if (website) user.profile.website = website;
    if (location) user.profile.location = location;
    if (company) user.profile.company = company;

    if (socialLinks) {
      if (!user.profile.socialLinks) user.profile.socialLinks = {};
      if (socialLinks.linkedin) user.profile.socialLinks.linkedin = socialLinks.linkedin;
      if (socialLinks.github) user.profile.socialLinks.github = socialLinks.github;
      if (socialLinks.twitter) user.profile.socialLinks.twitter = socialLinks.twitter;
      if (socialLinks.instagram) user.profile.socialLinks.instagram = socialLinks.instagram;
    }

    // Update preferences
    if (req.body.preferences) {
      const { newsletter, notifications, theme } = req.body.preferences;
      if (!user.preferences) user.preferences = {};

      if (newsletter !== undefined) user.preferences.newsletter = newsletter;
      if (theme) user.preferences.theme = theme;

      if (notifications) {
        if (!user.preferences.notifications) user.preferences.notifications = {};
        if (notifications.email !== undefined) user.preferences.notifications.email = notifications.email;
        if (notifications.push !== undefined) user.preferences.notifications.push = notifications.push;
      }
    }

    await user.save();

    logger.info(`Profile updated for user: ${user.email}`);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.profile?.phone,
        bio: user.profile?.bio,
        website: user.profile?.website,
        location: user.profile?.location,
        company: user.profile?.company,
        socialLinks: user.profile?.socialLinks,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        avatar: user.avatar,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/v1/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error('Change password error:', error);
    next(error);
  }
};

// @desc    Setup 2FA (Generate Secret & QR Code)
// @route   POST /api/v1/auth/2fa/setup
// @access  Private
const setup2FA = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const secret = speakeasy.generateSecret({
      issuer: 'Dev Kant Kumar Portfolio',
      name: `Dev Kant Kumar Portfolio (${user.email})`
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    const url = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode: url
    });
  } catch (error) {
    logger.error('Setup 2FA error:', error);
    next(error);
  }
};

// @desc    Verify 2FA Setup & Enable
// @route   POST /api/v1/auth/2fa/verify
// @access  Private
const verify2FASetup = async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id).select('+twoFactorSecret');

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token
    });

    if (verified) {
      user.isTwoFactorEnabled = true;
      await user.save();

      res.status(200).json({
        success: true,
        message: '2FA enabled successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
  } catch (error) {
    logger.error('Verify 2FA setup error:', error);
    next(error);
  }
};

// @desc    Disable 2FA
// @route   POST /api/v1/auth/2fa/disable
// @access  Private
const disable2FA = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    user.isTwoFactorEnabled = false;
    user.twoFactorSecret = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: '2FA disabled successfully'
    });
  } catch (error) {
    logger.error('Disable 2FA error:', error);
    next(error);
  }
};

// @desc    Verify 2FA for Login
// @route   POST /api/v1/auth/login/verify-2fa
// @access  Public
const verify2FALogin = async (req, res, next) => {
  try {
    const { tempToken, otp } = req.body;

    if (!tempToken || !otp) {
      return res.status(400).json({ success: false, message: 'Token and OTP required' });
    }

    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    if (decoded.type !== '2fa_pending') {
      return res.status(400).json({ success: false, message: 'Invalid token type' });
    }

    const user = await User.findById(decoded.id).select('+twoFactorSecret');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: otp
    });

    if (verified) {
      sendTokenResponse(user, 200, res, 'Login successful');
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

  } catch (error) {
    logger.error('Verify 2FA login error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
  setup2FA,
  verify2FASetup,
  disable2FA,
  verify2FALogin
};
