import axiosInstance from "../../../utils/axiosInstance";

function fetchSpecializationsRequest(body) {
  return axiosInstance({
    method: "get",
    baseURL: "https://sanofi-qa.nuworks.ph:8443/api/v1/specializations",
    data: body
  });
}

function fetchCategoriesRequest(body) {
  return axiosInstance({
    method: "get",
    url: "/categories",
    data: body
  });
}

function addCategoryRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/categories/create",
    data: body
  });
}

function fetchSubCategoriesRequest(body) {
  return axiosInstance({
    method: "get",
    url: "/sub-categories",
    data: body
  });
}

function addSubCategoryRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/sub-categories/create",
    data: body
  });
}

function createArticleRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/therapy-areas/create",
    data: body
  });
}

function updateArticleRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/therapy-areas/update/${id}`,
    data: body
  });
}

function fetchCurrentArticleRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/therapy-areas/edit/${id}`
  });
}

function archiveArticleRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/therapy-areas/change-status/${id}`,
    data: body
  });
}

function changeArticleStatusRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/therapy-areas/change-status/${id}`,
    data: body
  });
}

const PostManagementServices = {
  fetchSpecializationsRequest,
  fetchCategoriesRequest,
  addCategoryRequest,
  fetchSubCategoriesRequest,
  addSubCategoryRequest,
  createArticleRequest,
  updateArticleRequest,
  archiveArticleRequest,
  fetchCurrentArticleRequest,
  changeArticleStatusRequest
};

export default PostManagementServices;
