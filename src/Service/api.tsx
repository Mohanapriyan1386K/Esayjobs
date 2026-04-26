

import axios from "axios";
import Cookies from "js-cookie";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
   const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.log("Unauthorized - Token expired");
      localStorage.removeItem("token")
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
