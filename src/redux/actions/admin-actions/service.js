import axiosInstance from "../../../utils/axiosInstance";

function fetchVerifiedAdminsRequest(body) {
    return axiosInstance({
        method: "get",
        url: "/cms",
        data: body
    });
}

function fetchAdminRequestList(body) {
    return axiosInstance({
        method: "get",
        url: "/cms/request",
        data: body
    });
}

function createAdminRequest(body) {
    return axiosInstance({
        method: "post",
        url: "/cms/create",
        data: body
    });
}

function updateAdminRequest(id, body) {
    return axiosInstance({
        method: "put",
        url: `/cms/edit/${id}`,
        data: body
    });
}

function deleteAdminRequest(id) {
    return axiosInstance({
        method: "delete",
        url: `/cms/${id}`
    });
}

function undoDeleteAdminRequest(id) {
    return axiosInstance({
        method: "put",
        url: `/cms/revert/${id}`
    });
}

function fetchCurrentAdminRequest(id) {
    return axiosInstance({
        method: "get",
        url: `/cms/edit/${id}`
    });
}

function unlockAdminRequest(id) {
    return axiosInstance({
        method: "put",
        url: `/cms/unlock/${id}`
    });
}

function fetchSiteUsersRequest(body) {
    return axiosInstance({
        method: "get",
        url: "/users",
        data: body
    });
}

function createUserRequest(body) {
    return axiosInstance({
        method: "post",
        url: "/users/create",
        data: body
    });
}

function deleteUserRequest(id) {
    return axiosInstance({
        method: "delete",
        url: `/users/${id}`
    });
}

function undoDeleteUserRequest(id) {
    return axiosInstance({
        method: "put",
        url: `/users/revert/${id}`
    });
}

function fetchCurrentUserRequest(id) {
    return axiosInstance({
        method: "get",
        url: `/users/view/${id}`
    });
}

function fetchInvitedSiteUsersRequest(body) {
    return axiosInstance({
        method: "get",
        url: "/users/invite-list",
        data: body
    });
}

function unlockUserRequest(id) {
    return axiosInstance({
        method: "put",
        url: `/users/unlock/${id}`
    });
}

function blockUserRequest(id) {
    return axiosInstance({
        method: "put",
        url: `/users/block/${id}`
    });
}

const SuperAdminServices = {
    fetchVerifiedAdminsRequest,
    fetchAdminRequestList,
    createAdminRequest,
    updateAdminRequest,
    deleteAdminRequest,
    undoDeleteAdminRequest,
    fetchCurrentAdminRequest,
    unlockAdminRequest,
    fetchSiteUsersRequest,
    createUserRequest,
    deleteUserRequest,
    undoDeleteUserRequest,
    fetchCurrentUserRequest,
    fetchInvitedSiteUsersRequest,
    unlockUserRequest,
    blockUserRequest
};

export default SuperAdminServices;
