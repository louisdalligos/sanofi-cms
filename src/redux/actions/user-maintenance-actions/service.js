import axiosInstance from "../../../utils/axiosInstance";

function fetchCurrentUserRequest() {
  return axiosInstance({
    method: "get",
    url: "/profile"
  });
}

function changePasswordRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/profile/change-password",
    data: body
  });
}

function updateProfileRequest(body) {
  return axiosInstance({
    method: "put",
    url: "/profile",
    data: body
  });
}

function resetPasswordRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/request-reset-password",
    data: body
  });
}

const UserMaintenanceServices = {
  fetchCurrentUserRequest,
  changePasswordRequest,
  updateProfileRequest,
  resetPasswordRequest
};

export default UserMaintenanceServices;
