import axios from 'axios';

// Create an axios instance with custom config
const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:5000/api' : '/api', // Use absolute URL in dev mode
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    // Get token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired tokens, network errors, etc.
    if (error.response?.status === 401) {
      // Clear tokens on auth errors
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // Optionally redirect to login
      // window.location.href = '/signin';
    }
    
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.status, error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api; 