import React, { useState, useEffect } from 'react';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../../components/loaders/Spinner';
import Modal from '../../../components/modals/Modal';
import { LifeBuoy, MessageSquare, CheckCircle2, Send, XCircle } from 'lucide-react';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reply Modal State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketService.getAllTickets();
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching admin tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const openReplyModal = (ticket) => {
    setSelectedTicket(ticket);
    setReplyText(ticket.reply || '');
    setTicketStatus(ticket.status || 'Open');
    setIsModalOpen(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      setSubmitting(true);
      await ticketService.replyTicket(selectedTicket._id, {
        reply: replyText,
        status: ticketStatus,
      });
      setIsModalOpen(false);
      fetchTickets();
    } catch (err) {
      alert('Failed to send reply to ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseTicketDirectly = async (ticketId) => {
    try {
      await ticketService.closeTicket(ticketId);
      fetchTickets();
    } catch (err) {
      alert('Failed to close ticket.');
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Support Ticket Center</h1>
        <p className="text-xs text-gray-500 mt-1">Review customer inquiries and reply directly from CRM</p>
      </div>

      {/* Ticket List Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <Spinner text="Loading support tickets..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase border-b border-gray-100">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-4">Subject</th>
                  <th className="py-4 px-4">Message</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400 text-xs">
                      No support tickets submitted yet.
                    </td>
                  </tr>
                ) : (
                  tickets.map((t) => (
                    <tr key={t._id} className="hover:bg-rose-50/20 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900">{t.userId?.name || 'Customer'}</p>
                        <p className="text-xs text-gray-400">{t.userId?.email}</p>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{t.subject}</td>
                      <td className="py-4 px-4 text-xs text-gray-600 max-w-xs truncate">{t.message}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            t.status === 'Open'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openReplyModal(t)}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full transition-colors inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Reply
                        </button>
                        {t.status === 'Open' && (
                          <button
                            onClick={() => handleCloseTicketDirectly(t._id)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                            title="Close Ticket"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Ticket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reply to Support Ticket"
      >
        {selectedTicket && (
          <form onSubmit={handleSendReply} className="space-y-4">
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                Customer Message from {selectedTicket.userId?.name}
              </span>
              <h4 className="font-bold text-sm text-gray-900">{selectedTicket.subject}</h4>
              <p className="text-xs text-gray-600">{selectedTicket.message}</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                Admin Response Message *
              </label>
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official reply to the customer..."
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ticket Status</label>
              <select
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold bg-white"
              >
                <option value="Open">Open (Pending Followup)</option>
                <option value="Closed">Closed (Resolved)</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Sending...' : 'Send CRM Reply'}
              </button>
            </div>

          </form>
        )}
      </Modal>

    </div>
  );
};

export default Support;
