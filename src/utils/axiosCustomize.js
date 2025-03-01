import axios from "axios";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/userServices";
import { logout, updateAccessToken } from "../redux/slices/userSlice";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Hàm đồng bộ token từ Redux sang localStorage
const syncTokenToLocalStorage = () => {
  const token = store?.getState()?.user?.account?.access_token;
  if (token) localStorage.setItem("access_token", token);
};

// Request Interceptor (CẢI TIẾN)
instance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("/refresh-token")) return config;

    // Đồng bộ token từ Redux -> localStorage
    syncTokenToLocalStorage();

    const token = localStorage.getItem("access_token");

    // Thêm token vào header dù hết hạn hay không
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (CẢI TIẾN)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra token hết hạn
    const token = localStorage.getItem("access_token");
    const isServerTokenExpired =
      error.response?.data?.EC === -999 || error.response?.status === 401;
    const isClientTokenExpired =
      token && jwtDecode(token).exp < Date.now() / 1000;

    if (
      (isServerTokenExpired || isClientTokenExpired) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequestsQueue.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await refreshToken();
        const newToken = response?.DT?.access_token;

        if (!newToken) throw new Error("Invalid refresh token response");

        store.dispatch(updateAccessToken(response));
        localStorage.setItem("access_token", newToken);
        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Retry request gốc
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await instance(originalRequest);

        // Xử lý hàng đợi với token mới
        failedRequestsQueue.forEach((cb) => cb(newToken));
        failedRequestsQueue = [];

        return retryResponse;
      } catch (refreshError) {
        store.dispatch(logout());
        localStorage.removeItem("access_token");
        instance.defaults.headers.common.Authorization = "";
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
