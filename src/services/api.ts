import axios from 'axios';

// axios nako //
const API_URL = 'http://localhost:8000/api';

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

// api nako //
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

export const getTodos = async () => {
  return api.get('/todo/');
};

export const getTodoDetail = async (todoId: number) => {
  return api.get(`/todo-detail/${todoId}/`);
};

export const markTodoAsCompleted = async (todoId: number) => {
  return api.patch(`/todo-completed/${todoId}/`);
};

export const createTodo = async (data: {
  title: string;
  completed: boolean;
  due_date?: string;
  status?: string;
}) => {
  return api.post('/todo/', data);
};

export const updateTodo = async (todoId: number, data: {
  title?: string;
  completed?: boolean;
  due_date?: string;
  status?: string;
}) => {
  return api.patch(`/todo-detail/${todoId}/`, data);
};

export const deleteTodo = async (todoId: number) => {
  return api.delete(`/todo-detail/${todoId}/`);
};

export const markTodoAsImportant = async (todoId: number) => {
  return api.patch(`/todo-important/${todoId}/`);
};

// logout boss //
export const logout = async () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Export the api instance
export { api };