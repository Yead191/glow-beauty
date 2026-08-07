const Cart = require('../models/Cart');
const Product = require('../models/Product');

//    Get current user cart
//  GET /api/cart
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Add product to cart
//  POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let existingCartItem = await Cart.findOne({
      userId: req.user._id,
      productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += qty;
      await existingCartItem.save();
    } else {
      existingCartItem = await Cart.create({
        userId: req.user._id,
        productId,
        quantity: qty,
      });
    }

    const updatedCart = await Cart.find({ userId: req.user._id }).populate('productId');
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Update cart item quantity
//  PUT /api/cart/:id
const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const qty = Number(quantity);

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (qty <= 0) {
      await Cart.findByIdAndDelete(req.params.id);
    } else {
      cartItem.quantity = qty;
      await cartItem.save();
    }

    const updatedCart = await Cart.find({ userId: req.user._id }).populate('productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Remove product from cart
//  DELETE /api/cart/:id
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await Cart.findByIdAndDelete(req.params.id);

    const updatedCart = await Cart.find({ userId: req.user._id }).populate('productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Clear entire cart
//  DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user._id });
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
