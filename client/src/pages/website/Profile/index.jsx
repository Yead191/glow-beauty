import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import * as ticketService from '../../../services/ticketService';
import { User, Mail, Phone, MapPin, Lock, LifeBuoy, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import Spinner from '../../../components/loaders/Spinner';

const Profile = () => {
  const { user, updateUser } = useAuth();

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [password, setPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Tickets State
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [ticketFeedback, setTicketFeedback] = useState({ type: '', text: '' });

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const data = await ticketService.getMyTickets();
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      setProfileMessage({ type: '', text: '' });
      await updateUser({
        name,
        email,
        phone,
        address,
        ...(password ? { password } : {}),
      });
      setPassword('');
      setProfileMessage({ type: 'success', text: 'Profile information updated successfully!' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    try {
      setCreatingTicket(true);
      setTicketFeedback({ type: '', text: '' });
      await ticketService.createTicket({ subject, message });
      setSubject('');
      setMessage('');
      setTicketFeedback({ type: 'success', text: 'Support ticket submitted to CRM team!' });
      fetchTickets();
    } catch (err) {
      setTicketFeedback({ type: 'error', text: 'Failed to create ticket.' });
    } finally {
      setCreatingTicket(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          Customer Account & Support
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage personal info and submit CRM support tickets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Personal Info Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-rose-500" />
            <h3 className="font-serif text-xl font-bold text-gray-900">Personal Information</h3>
          </div>

          {profileMessage.text && (
            <div
              className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                profileMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {profileMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{profileMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  New Password (Optional)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Default Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updatingProfile}
              className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-md shadow-rose-200 transition-all"
            >
              {updatingProfile ? 'Saving Changes...' : 'Save Profile Details'}
            </button>
          </form>
        </div>

        {/* Right Column: Support Tickets */}
        <div className="space-y-6">
          
          {/* Create Support Ticket */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <LifeBuoy className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif text-xl font-bold text-gray-900">Create Support Ticket</h3>
            </div>

            {ticketFeedback.text && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200">
                {ticketFeedback.text}
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Order Delivery Status Inquiry"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Message *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={creatingTicket}
                className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-full transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {creatingTicket ? 'Submitting...' : 'Submit Support Ticket'}
              </button>
            </form>
          </div>

          {/* Ticket History */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-serif text-lg font-bold text-gray-900">My Support Ticket History</h4>

            {loadingTickets ? (
              <Spinner size="sm" text="Loading tickets..." />
            ) : tickets.length === 0 ? (
              <p className="text-xs text-gray-400 py-4">No support tickets submitted yet.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {tickets.map((t) => (
                  <div key={t._id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-gray-900">{t.subject}</h5>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100">
                      {t.message}
                    </p>

                    {t.reply ? (
                      <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 space-y-1">
                        <span className="text-[10px] font-bold text-rose-700 uppercase flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> CRM Admin Reply:
                        </span>
                        <p className="text-xs text-rose-950 font-medium">{t.reply}</p>
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-gray-400">Awaiting admin reply...</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
