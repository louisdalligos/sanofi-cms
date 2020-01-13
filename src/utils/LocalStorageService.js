const LocalStorageService = (function() {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.access_token);
    localStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken
  };
})();

export default LocalStorageService;

// console.clear();
// console.log('originalRequest', JSON.stringify(error,null,4));

// if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     console.log('[error.response]', error.response);
// }

/*
    if (error.response.status === 401) {
         && originalRequest.url === 
         'http://13.232.130.60:8081/v1/auth/token) {
        router.push('/login');
        return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return axios.post('/auth/token',
            {
                "refresh_token": refreshToken
            })
            .then(res => {
                if (res.status === 201) {
                    localStorageService.setToken(res.data);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                    return axios(originalRequest);
                }
            })
    }
    */
/*
const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});
*/

/* Add a response interceptor
axiosInstance.interceptors.response.use(null, error => {
    if (error.response &&
        (error.response.status === 401 || error.response.status == 403)
    ) {
        token = error.response.headers["access-token"];
        sessionStorage.setItem("access_token", token);
        alert(JSON.stringify(token));
        // store.dispatch(connectTheUser(token));
    }

    return Promise.reject(error);
});*/

//const token = sessionStorage.getItem("access_token");
// let token;

/* cors
const cors = false;
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
});*/

// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
