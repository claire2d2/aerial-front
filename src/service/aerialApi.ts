import axios from "axios";

const aerialApi = axios.create({
  //   baseURL: import.meta.env.VITE_BACKEND_URL
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

aerialApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return request;
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default aerialApi;
