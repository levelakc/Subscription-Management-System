// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = {
  get: (url, params = {}) => axios.get(`${API_BASE_URL}${url}`, { params }),
  post: (url, data) => axios.post(`${API_BASE_URL}${url}`, data),
  put: (url, data) => axios.put(`${API_BASE_URL}${url}`, data),
  delete: (url) => axios.delete(`${API_BASE_URL}${url}`)
};

export default api;
