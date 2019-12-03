import axios from "axios";
import store from "../stores/store-prod";
import { logout } from "../redux/actions/auth-actions/authActions";
import { API } from "./api";
import history from "../utils/history";

const cors = true;
const token = sessionStorage.getItem("access_token");

const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});

// cors
axiosInstance.interceptors.request.use(function(config) {
    if (cors) {
        if (
            config.method === "OPTION" ||
            typeof config.headers["X-CSRF-TOKEN"] === "undefined"
        ) {
            delete config.headers["X-CSRF-TOKEN"];
            delete config.headers["X-Requested-With"];
            delete config.headers.common["X-CSRF-TOKEN"];
            delete config.headers.common["X-Requested-With"];
        }
    }
    return config;
});

axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
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

export default axiosInstance;
