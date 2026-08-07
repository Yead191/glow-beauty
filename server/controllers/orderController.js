const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

//    Create new order (Checkout)
//   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, phone } = req.body;

    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    let totalPrice = 0;
    const products = [];

    for (const item of cartItems) {
      if (!item.productId) continue;
      const itemTotal = item.productId.price * item.quantity;
      totalPrice += itemTotal;

      products.push({
        productId: item.productId._id,
        name: item.productId.name,
        image: item.productId.image,
        price: item.productId.price,
        quantity: item.quantity,
      });

      // Deduct stock
      if (item.productId.stock >= item.quantity) {
        item.productId.stock -= item.quantity;
        await item.productId.save();
      }
    }

    const order = new Order({
      userId: req.user._id,
      products,
      shippingAddress,
      phone,
      totalPrice,
      status: 'Pending',
    });

    const createdOrder = await order.save();

    // Clear user cart
    await Cart.deleteMany({ userId: req.user._id });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get logged in user orders
//   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get all orders (Admin)
//   GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Update order status (Admin)
//   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Processing', 'Delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get order details by ID
//   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email phone address');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};
