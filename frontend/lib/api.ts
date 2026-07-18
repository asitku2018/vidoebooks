import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Ensures cookies (like HTTP-Only JWT) are sent with every request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
