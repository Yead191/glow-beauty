const Ticket = require('../models/Ticket');

//    Create a support ticket (Customer)
//   POST /api/tickets
const createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const ticket = await Ticket.create({
      userId: req.user._id,
      subject,
      message,
      status: 'Open',
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get tickets for logged-in user (Customer)
//   GET /api/tickets/mytickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Get all support tickets (Admin)
//   GET /api/tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Reply to a support ticket (Admin)
//   PUT /api/tickets/:id/reply
const replyTicket = async (req, res) => {
  try {
    const { reply, status } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      if (reply !== undefined) ticket.reply = reply;
      if (status) ticket.status = status;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Close a support ticket (Admin)
//   PUT /api/tickets/:id/close
const closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      ticket.status = 'Closed';
      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  replyTicket,
  closeTicket,
};
