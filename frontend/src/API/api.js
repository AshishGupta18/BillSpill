import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5174/api', // Replace with your backend URL
});

export const signup = async (email, password) => {
  return await api.post('/auth/signup', { email, password });
};

export const login = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const getCurrentUser = async (token) => {
  return await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Additional API functions for group management can be added here