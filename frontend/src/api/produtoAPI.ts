import axios from "axios";

const produtoAPI = axios.create({
  baseURL: "http://localhost:3000/produto/", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('atividadefinal-eletiva-web-token')}`
  },
});

produtoAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('atividadefinal-eletiva-web-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default produtoAPI;