import axiosInstance from "../../../utils/axiosInstance";
import { appUrl } from "../../../utils/api";

function fetchSpecializationsRequest(body) {
  return axiosInstance({
    method: "get",
    baseURL: `${appUrl}/api/v1/specializations`,
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
    method: "post",
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

function changeArticleStatusRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/therapy-areas/change-status/${id}`,
    data: body
  });
}

function checkImageRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/gallery/check-image",
    data: body
  });
}

function searchTagsRequest(query) {
  return axiosInstance({
    method: "post",
    url: `/tags/search/${query}`,
    data: query
  });
}

function fetchTagsRequest(body) {
  return axiosInstance({
    method: "get",
    url: "/tags",
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
  fetchCurrentArticleRequest,
  changeArticleStatusRequest,
  checkImageRequest,
  searchTagsRequest,
  fetchTagsRequest
};

export default PostManagementServices;
