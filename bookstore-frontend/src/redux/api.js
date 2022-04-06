import axios from "axios";

const backend = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

backend.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default backend;

