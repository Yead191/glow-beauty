const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomerDetails,
} = require('../controllers/customerController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

router.use(protect, adminOnly);

router.get('/', getAllCustomers);
router.get('/:id', getCustomerDetails);

module.exports = router;
