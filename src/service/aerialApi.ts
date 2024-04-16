import axios from "axios";

const aerialApi = axios.create({
  //   baseURL: import.meta.env.VITE_BACKEND_URL
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default aerialApi;
