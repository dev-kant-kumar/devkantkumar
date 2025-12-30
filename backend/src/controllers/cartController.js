const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');

// Helper to calculate prices based on region
const processCartPrices = (cartItems, countryCode) => {
  return cartItems.map(item => {
    const itemObj = item.toObject ? item.toObject() : item;

    // Determine the item (product or service)
    const productOrService = item.type === 'product' ? itemObj.product : itemObj.service;

    if (!productOrService) return itemObj;

    let price = productOrService.price;
    let currency = 'INR';
    let discount = productOrService.discount || 0;

    // Handle Service Packages
    if (item.type === 'service' && itemObj.packageName && productOrService.packages) {
        const pkg = productOrService.packages.find(p => p.name === itemObj.packageName);
        if (pkg) {
            price = pkg.price;
            // Check for package-specific regional pricing
            if (pkg.regionalPricing && pkg.regionalPricing.length > 0) {
                 const regional = pkg.regionalPricing.find(r => r.region === countryCode);
                 if (regional) {
                     price = regional.price;
                     currency = regional.currency;
                 }
            }
        }
    } else {
        // Handle Products (or Services without packages if that were possible)
        if (productOrService.regionalPricing && productOrService.regionalPricing.length > 0) {
            const regional = productOrService.regionalPricing.find(r => r.region === countryCode);
            if (regional) {
                price = regional.price;
                currency = regional.currency;
                discount = regional.discount || 0;
            }
        }
    }

    // Attach calculated price/currency to the item for frontend
    itemObj.currentPrice = price;
    itemObj.currency = currency;
    itemObj.discount = discount;

    return itemObj;
  });
};

// @desc    Get user cart
// @route   GET /api/v1/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    const countryCode = req.headers['x-country-code'] || 'IN';

    const user = await User.findById(req.user.id).populate({
      path: 'cart.items.product',
      select: 'title price images category slug regionalPricing discount'
    }).populate({
        path: 'cart.items.service',
        select: 'title price image category slug packages regionalPricing'
    });

    const processedCartItems = processCartPrices(user.cart.items, countryCode);

    res.status(200).json({
      success: true,
      cart: {
          ...user.cart.toObject(),
          items: processedCartItems
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/v1/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, serviceId, quantity = 1, package: packageName } = req.body;
    const countryCode = req.headers['x-country-code'] || 'IN';

    // Determine type and ID
    const type = serviceId ? 'service' : 'product';
    const itemId = serviceId || productId;

    if (!itemId) {
        return res.status(400).json({
            success: false,
            message: 'Product ID or Service ID is required'
        });
    }

    const user = await User.findById(req.user.id);

    // Check if item already exists in cart
    const existingItemIndex = user.cart.items.findIndex(item => {
        if (type === 'product') return item.product?.toString() === itemId;
        if (type === 'service') {
            return item.service?.toString() === itemId && item.packageName === packageName;
        }
        return false;
    });

    if (existingItemIndex > -1) {
      // Update quantity
      user.cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem = {
          type,
          quantity,
          [type]: itemId, // dynamic key: product or service
          packageName // Store package name for services
      };
      user.cart.items.push(newItem);
    }

    user.cart.updatedAt = Date.now();
    await user.save();

    // Return populated cart
    const populatedUser = await User.findById(req.user.id).populate({
      path: 'cart.items.product',
      select: 'title price images category slug regionalPricing discount'
    }).populate({
        path: 'cart.items.service',
        select: 'title price image category slug packages regionalPricing'
    });

    const processedCartItems = processCartPrices(populatedUser.cart.items, countryCode);

    res.status(200).json({
      success: true,
      cart: {
          ...populatedUser.cart.toObject(),
          items: processedCartItems
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params; // This is the unique _id of the cart item
    const countryCode = req.headers['x-country-code'] || 'IN';

    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity > 0) {
      user.cart.items[itemIndex].quantity = quantity;
    } else {
      // Remove item if quantity is 0
      user.cart.items.splice(itemIndex, 1);
    }

    user.cart.updatedAt = Date.now();
    await user.save();

    // Return populated cart
    const populatedUser = await User.findById(req.user.id).populate({
        path: 'cart.items.product',
        select: 'title price images category slug regionalPricing discount'
      }).populate({
          path: 'cart.items.service',
          select: 'title price image category slug packages regionalPricing'
      });

    const processedCartItems = processCartPrices(populatedUser.cart.items, countryCode);

    res.status(200).json({
        success: true,
        cart: {
            ...populatedUser.cart.toObject(),
            items: processedCartItems
        }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const countryCode = req.headers['x-country-code'] || 'IN';

      const user = await User.findById(req.user.id);

      user.cart.items = user.cart.items.filter(
        (item) => item._id.toString() !== itemId
      );

      user.cart.updatedAt = Date.now();
      await user.save();

      // Return populated cart
      const populatedUser = await User.findById(req.user.id).populate({
        path: 'cart.items.product',
        select: 'title price images category slug regionalPricing discount'
      }).populate({
          path: 'cart.items.service',
          select: 'title price image category slug packages regionalPricing'
      });

      const processedCartItems = processCartPrices(populatedUser.cart.items, countryCode);

      res.status(200).json({
          success: true,
          cart: {
              ...populatedUser.cart.toObject(),
              items: processedCartItems
          }
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc    Clear cart
  // @route   DELETE /api/v1/cart
  // @access  Private
  exports.clearCart = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      user.cart.items = [];
      user.cart.updatedAt = Date.now();
      await user.save();

      res.status(200).json({
        success: true,
        cart: user.cart
      });
    } catch (error) {
      next(error);
    }
  };
