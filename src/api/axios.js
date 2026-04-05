import axios from "axios";
console.log('VITE_API_URL:' + import.meta.env.VITE_API_URL);

/* const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // 🔥 MUST for cookies
}); */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // 🔥 MUST for cookies
});
// ❌ REMOVE token interceptor (not needed anymore)
// Cookies are automatically sent with every request

export default api;
//--------------------------------------------------
/* import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // your NestJS backend
    withCredentials: true, // 🔥 IMPORTANT
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api; */