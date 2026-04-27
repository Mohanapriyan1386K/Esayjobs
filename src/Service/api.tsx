

import axios from "axios";
import Cookies from "js-cookie";

const normalizeApiUrl = (url?: string) => {
  const raw = (url || "http://localhost:3000").trim().replace(/\/+$/, "");

  // Ensure absolute URL in production even when env var is missing protocol.
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
};

const apiBaseUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);

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
