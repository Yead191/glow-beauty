import API from './axios';

export const getAllCustomers = async () => {
  const response = await API.get('/customers');
  return response.data;
};

export const getCustomerDetails = async (id) => {
  const response = await API.get(`/customers/${id}`);
  return response.data;
};
