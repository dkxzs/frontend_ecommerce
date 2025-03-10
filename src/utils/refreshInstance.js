import axios from "axios";

const refreshInstance = axios.create({
  baseURL: "https://backend-ecommerce-mdxo.onrender.com/api",
  withCredentials: true,
});

export default refreshInstance;
