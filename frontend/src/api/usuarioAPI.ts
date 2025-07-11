import axios from "axios";

const usuarioAPI = axios.create({
  baseURL: "http://localhost:3000/usuario/", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('atividadefinal-eletiva-web-token')}`
  },
});

usuarioAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('atividadefinal-eletiva-web-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default usuarioAPI;