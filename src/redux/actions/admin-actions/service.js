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

// function updateAdminRequest(id) {
//     return axiosInstance({
//         method: "put",
//         url: `/cms/edit/${id}`,
//         data: body
//     });
// }

function deleteAdminRequest(id) {
  return axiosInstance({
    method: "delete",
    url: `/cms/delete/${id}`
  });
}

function fetchCurrentAdminRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/cms/edit/${id}`
  });
}

const SuperAdminServices = {
  fetchVerifiedAdminsRequest,
  fetchAdminRequestList,
  createAdminRequest,
  deleteAdminRequest,
  fetchCurrentAdminRequest
};

export default SuperAdminServices;
