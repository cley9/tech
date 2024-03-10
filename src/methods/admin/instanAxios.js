import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/admin',
//   baseURL: 'http://localhost:8080/api/v1/admin/home',
  // Otros parámetros de configuración si los hay
});

// Configurar un interceptor para adjuntar el token a todas las solicitudes salientes
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
