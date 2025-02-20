import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // token is expired EC = -999
    // if (error.response.data && error.response.data.EC === -999) {
    //   window.location.href = "/login";
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
  }
);

export default instance;
