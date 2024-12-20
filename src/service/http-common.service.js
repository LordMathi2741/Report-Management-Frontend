import axios from 'axios';

const BaseService = axios.create({
  baseURL: 'http://localhost:5105/api/v1',
});

BaseService.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default BaseService;