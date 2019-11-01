import axios from "axios";
import store from "../stores/store-dev";
import { logout } from "../redux/actions/auth-actions/authActions";
import { API } from "./api";
import history from "./history";

const token = sessionStorage.getItem("access_token");
console.log(token);
const axiosInstanceFormData = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`
  }
});

axiosInstanceFormData.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstanceFormData.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    switch (error.response.status) {
      case 401:
        // unauthorized -> token is invalid or expired
        // User must reconnect!
        store.dispatch(logout());
        history.push("/login");
        break;
      // case 200:
      //     message.success("Success");
      // case 422:
      //     message.error("There was an error in processing your request");
      //     break;
      // case 405:
      //     message.error("There was an error in processing your request");
      // case 500:
      //     store.dispatch(logout());
      //     history.push("/login");

      default:
        break;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstanceFormData;
