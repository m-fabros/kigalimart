import axios from 'axios';

const API = axios.create({
  baseURL: 'https://kigalimart-backend.onrender.com/api',
});

export default API;