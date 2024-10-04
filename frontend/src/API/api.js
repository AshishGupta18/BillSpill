import axios from 'axios';

// Base API configuration
const API = axios.create({ baseURL: '/api' });

// Add Authorization header dynamically for every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Signup request
export const signup = (username, email, password) => 
    API.post('/auth/signup', { username, email, password });

// Login request
export const login = (email, password) => 
    API.post('/auth/login', { email, password });

// Fetch user profile
export const fetchUserProfile = () => 
    API.get('/auth/me');

// Fetch groups
export const fetchGroups = () => API.get('/groups');

// Fetch group details by ID
export const fetchGroupDetails = (groupId) =>
    API.get(`/groups/${groupId}`);

// Add expense
export const addExpense = (groupId, expense) =>
    API.post(`/groups/${groupId}/expenses`, expense);

// Currency conversion API (Using Open Exchange Rates API)
// export const fetchExchangeRates = () => {
//     const appId = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;  // Assuming you have the API key in your environment variables
//     return axios.get(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
// };