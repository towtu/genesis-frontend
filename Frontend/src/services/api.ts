import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your Django backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (data: {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  return api.post('/register/', {
    email: data.email,
    username: data.username,
    password: data.password,
    password2: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
  });
};

export const login = async (data: { email: string; password: string }) => {
  return api.post('/token/', data);
};

export const getDashboard = async () => {
  return api.get('/dashboard/');
};

export const getTodos = async (userId: number) => {
  return api.get(`/todo/${userId}/`);
};

export const getTodoDetail = async (userId: number, todoId: number) => {
  return api.get(`/todo-detail/${userId}/${todoId}/`);
};

export const markTodoAsCompleted = async (userId: number, todoId: number) => {
  return api.patch(`/todo-completed/${userId}/${todoId}/`);
};

// Logout function
export const logout = async () => {
  try {
    // If your Django backend has a logout endpoint, you can call it here
    // Example: await api.post('/logout/');

    // Clear tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Optionally, redirect the user to the login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export default api;