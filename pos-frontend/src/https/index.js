import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;

// Auth API Endpoints
export const login = (data) => api.post('/api/user/login', data);
export const register = (data) => api.post('/api/user/register', data);
export const getUserData = () => api.get('/api/user');
export const logout = () => api.post('/api/user/logout');

// Order API Endpoints
export const addOrder = (data) => api.post('/api/order', data);
export const getOrders = () => api.get('/api/order');
export const updateOrderStatus = (id, orderStatus) => api.put(`/api/order/${id}`, { orderStatus });
