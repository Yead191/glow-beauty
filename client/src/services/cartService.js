import API from './axios';

export const getCart = async () => {
  const response = await API.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  const response = await API.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await API.delete(`/cart/${cartItemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await API.delete('/cart');
  return response.data;
};
