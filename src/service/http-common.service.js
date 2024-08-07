import axios from 'axios';

const BaseService = axios.create({
  baseURL: 'http://38.25.38.94:5105/api/v1',
});

BaseService.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default BaseService;