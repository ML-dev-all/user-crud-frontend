import axios from "axios";

//const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, //url do backend
});

export default api;
