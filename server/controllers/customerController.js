const User = require('../models/User');
const Order = require('../models/Order');

//    Get all customers (Admin)
//   GET /api/customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get single customer details with purchase history (Admin)
//   GET /api/customers/:id
const getCustomerDetails = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });

    res.json({
      customer,
      purchaseHistory: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerDetails,
};
