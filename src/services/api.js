import axios from "axios";

const api = axios.create({
  baseURL: "https://user-crud-api-4ks8.onrender.com/api", //url do backend
});

export default api;
