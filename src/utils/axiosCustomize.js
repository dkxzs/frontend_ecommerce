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

    // Kiểm tra cả client-side và server-side expiration
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
          failedRequestsQueue.push(() => resolve(instance(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        const response = await refreshToken();
        const newToken = response?.DT?.access_token;

        // Validate token response
        if (!newToken) throw new Error("Invalid refresh token response");

        // Cập nhật đồng bộ cả Redux và localStorage
        store.dispatch(updateAccessToken(response));
        localStorage.setItem("access_token", newToken);

        // Cập nhật header cho các request tiếp theo
        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Retry request gốc với headers mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await instance(originalRequest);

        // Thực hiện các request trong hàng đợi
        failedRequestsQueue.forEach((cb) => cb());
        failedRequestsQueue = [];

        return retryResponse;
      } catch (refreshError) {
        // Xử lý cleanup triệt để
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
