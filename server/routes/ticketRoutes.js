const express = require('express');
const router = express.Router();
const {
  createTicket,
  getMyTickets,
  getAllTickets,
  replyTicket,
  closeTicket,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

router.post('/', protect, createTicket);
router.get('/mytickets', protect, getMyTickets);
router.get('/', protect, adminOnly, getAllTickets);
router.put('/:id/reply', protect, adminOnly, replyTicket);
router.put('/:id/close', protect, adminOnly, closeTicket);

module.exports = router;
