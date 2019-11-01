import axiosInstance from "../../../utils/axiosInstance";
import axiosInstanceFormData from "../../../utils/axiosInstanceFormData";

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
  return axiosInstanceFormData({
    method: "post",
    url: "/therapy-areas/create",
    data: body
  });
}

function fetchCurrentArticleRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/therapy-areas/edit/${id}`
  });
}

function archiveArticleRequest(id) {
  return axiosInstanceFormData({
    method: "delete",
    url: `/therapy-areas/delete/${id}`
  });
}

const PostManagementServices = {
  fetchCategoriesRequest,
  addCategoryRequest,
  fetchSubCategoriesRequest,
  addSubCategoryRequest,
  createArticleRequest,
  archiveArticleRequest,
  fetchCurrentArticleRequest
};

export default PostManagementServices;
