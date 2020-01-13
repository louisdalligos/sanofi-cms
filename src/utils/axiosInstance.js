import axios from "axios";
// import store from "../stores/store-prod";
import { connectTheUser } from "../redux/actions/auth-actions/authActions";
import { API } from "./api";
import store from "../stores/store-dev";
import history from "../utils/history";
// import LocalStorageService from './LocalStorageService';
// #TOKEN FIXED ON (12:54AM)

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    Accept: "application/json",
    ContentType: "application/json"
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const request = error.config;

    if (
      error.response.status === 401 &&
      !request._oldTokenRefresh &&
      request.url !== `${API}/login`
    ) {
      request._oldTokenRefresh = true;
      const refreshToken = error.response.headers["access-token"];
      sessionStorage.setItem("access_token", refreshToken);
      const token = sessionStorage.getItem("access_token", refreshToken);
      // reconfigure Tokens
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      // update store
      store.dispatch(connectTheUser(token));
      return axiosInstance(request);
    }

    /* Working in Progress(testing)
    } else if( error.response.status === 429 && !request._restTooManyAttempts ){
        request._restTooManyAttempts = true;
        let delay = setTimeout(() => {
            clearTimeout(delay);
            return axiosInstance(request);
        }, 1500);
    }*/

    return Promise.reject(error);
  }
);

export default axiosInstance;
