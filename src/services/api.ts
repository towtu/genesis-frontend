// api.ts
import api from '../middleware/axios-interceptor';
import { RegisterData, LoginData, Todo, UpdateTodoData } from './types';

export const register = async (data: RegisterData) => {
  return api.post('/register/', {
    email: data.email,
    username: data.username,
    password: data.password,
    password2: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
  });
};

export const login = async (data: LoginData) => {
  return api.post('/token/', data);
};

export const getDashboard = async () => {
  return api.get('/dashboard/');
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todo/');
  return response.data;
};

export const getTodoDetail = async (todoId: number): Promise<Todo> => {
  const response = await api.get(`/todo-detail/${todoId}/`);
  return response.data;
};

export const markTodoAsCompleted = async (todoId: number): Promise<Todo> => {
  const response = await api.patch(`/todo-completed/${todoId}/`);
  return response.data;
};

export const createTodo = async (data: Todo): Promise<Todo> => {
  const response = await api.post('/todo/', {
    title: data.title,
    completed: data.completed,
    due_date: data.due_date || null,
    status: data.status || 'not_started',
    date: data.date || null,
  });
  return response.data; // The response will include the actual ID
};

export const updateTodo = async (todoId: number, data: UpdateTodoData): Promise<Todo> => {
  const response = await api.patch(`/todo-detail/${todoId}/`, {
    title: data.title,
    completed: data.completed,
    due_date: data.due_date || null,
    status: data.status,
    date: data.date || null,
  });
  return response.data;
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await api.delete(`/todo-detail/${todoId}/`);
};

export const markTodoAsImportant = async (todoId: number): Promise<Todo> => {
  const response = await api.patch(`/todo-important/${todoId}/`);
  return response.data;
};

export const logout = async (): Promise<void> => {
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