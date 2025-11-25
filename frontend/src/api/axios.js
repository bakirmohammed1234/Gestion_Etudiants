import axios from 'axios';

// 1. Pointe vers ton vrai backend Node (souvent port 5000 ou 4000)
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// 2. Intercepteur : Ajoute le token JWT à chaque requête sortante
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;