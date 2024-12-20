import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mentorshipmatchingplatform-production.up.railway.app/api/v1', // Backend URL
});

export const registerUser = (userData) => {
    return api.post("/user/signup", userData);
};

export const signInUser = (userData) => {
    return api.post("/user/signin", userData);
};

// Add Authorization Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
