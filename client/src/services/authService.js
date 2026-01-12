import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(name, email, password) {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/user/profile');
    return data.user;
  },

  async updateProfile(userData) {
    const { data } = await api.put('/user/profile', userData);
    return data.user;
  }
};

export const taskService = {
  async getTasks(params = {}) {
    const { data } = await api.get('/tasks', { params });
    return data.tasks;
  },

  async createTask(taskData) {
    const { data } = await api.post('/tasks', taskData);
    return data.task;
  },

  async updateTask(id, taskData) {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data.task;
  },

  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  }
};