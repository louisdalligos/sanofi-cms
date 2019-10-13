import axiosInstance from "../../../utils/axiosInstance";

function signinRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/login",
    data: body
  });
}

function requestAccountService(body) {
  return axiosInstance({
    method: "post",
    url: "/request-account",
    data: body
  });
}

function registerRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/registration",
    data: body
  });
}

function getAuthUserRequest(body) {
  return axiosInstance({
    method: "get",
    url: "/profile",
    data: body
  });
}

// function logoutRequest() {
//     return axiosInstance({
//         method: "get",
//         url: "logout",
//         data: null
//     });
// }

const AuthServices = {
  signinRequest,
  requestAccountService,
  registerRequest,
  //logoutRequest,
  getAuthUserRequest
};

export default AuthServices;
