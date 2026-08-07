import API from './axios';

export const createTicket = async (ticketData) => {
  const response = await API.post('/tickets', ticketData);
  return response.data;
};

export const getMyTickets = async () => {
  const response = await API.get('/tickets/mytickets');
  return response.data;
};

export const getAllTickets = async () => {
  const response = await API.get('/tickets');
  return response.data;
};

export const replyTicket = async (ticketId, replyData) => {
  const response = await API.put(`/tickets/${ticketId}/reply`, replyData);
  return response.data;
};

export const closeTicket = async (ticketId) => {
  const response = await API.put(`/tickets/${ticketId}/close`);
  return response.data;
};
