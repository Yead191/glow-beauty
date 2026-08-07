import API from './axios';

export const createOrder = async (orderData) => {
  const response = await API.post('/orders', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await API.get('/orders/myorders');
  return response.data;
};

export const getAllOrders = async () => {
  const response = await API.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await API.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await API.get(`/orders/${orderId}`);
  return response.data;
};
