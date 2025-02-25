import axios from "axios";

const refreshInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default refreshInstance;