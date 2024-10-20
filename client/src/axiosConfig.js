import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Update to your backend port
});

export default instance;
