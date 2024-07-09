import axios from 'axios';

const BaseService = axios.create({
  baseURL: 'http://localhost:5105/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
});

export default BaseService;