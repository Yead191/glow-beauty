import API from './axios';

export const getDashboardAnalytics = async () => {
  const response = await API.get('/analytics');
  return response.data;
};
