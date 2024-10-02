import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const signup = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/signup`, {
    email,
    password,
  });
  return response;
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