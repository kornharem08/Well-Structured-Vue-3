import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          toast.error('Unauthorized access');
          // Handle logout or token refresh here
          break;
        case 403:
          toast.error('Access forbidden');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error');
          break;
        default:
          toast.error('Something went wrong');
      }
    } else {
      toast.error('Network error');
    }
    
    return Promise.reject(error);
  }
);

export default api;