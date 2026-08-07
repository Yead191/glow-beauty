const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

//   Get dashboard analytics metrics
//  GET /api/analytics
const getDashboardMetrics = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    // Calculate total revenue from delivered/all orders
    const orders = await Order.find({});
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Low stock products (stock threshold <= 5)
    const lowStockProducts = await Product.find({ stock: { $lte: 5 } });
    const lowStockCount = lowStockProducts.length;

    // Recent 5 orders for dashboard feed
    const recentOrders = await Order.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Sales by Category
    const products = await Product.find({});
    const categoryCounts = {};
    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    res.json({
      totalCustomers,
      totalProducts,
      totalOrders,
      totalSales,
      lowStockCount,
      lowStockProducts,
      recentOrders,
      categoryCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardMetrics,
};
