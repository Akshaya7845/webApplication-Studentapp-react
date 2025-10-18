/*import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5278", // ← backend API URL (change port if needed)
  headers: { "Content-Type": "application/json" },
});

// Attach token to each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;*/
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5278", // ✅ your backend API URL
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach JWT token for every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

