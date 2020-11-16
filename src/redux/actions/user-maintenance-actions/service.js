import axiosInstance from "../../../utils/axiosInstance";

function fetchCurrentUserRequest() {
    return axiosInstance({
        method: "get",
        url: "/profile"
    });
}

function changePasswordRequest(body) {
    return axiosInstance({
        method: "put",
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

function forgotPasswordEmailRequest(body) {
    return axiosInstance({
        method: "post",
        url: "/request-reset-password",
        data: body
    });
}

function passwordNotificationRequest() {
    return axiosInstance({
        method: "get",
        url: "/profile/password-notification"
    });
}

const UserMaintenanceServices = {
    fetchCurrentUserRequest,
    changePasswordRequest,
    updateProfileRequest,
    forgotPasswordEmailRequest,
    passwordNotificationRequest
};

export default UserMaintenanceServices;
