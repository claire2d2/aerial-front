import axios from "axios";

const aerialApi = axios.create({
  //   baseURL: import.meta.env.VITE_BACKEND_URL
  baseURL: "http://localhost:5005/api",
});

export default aerialApi;
