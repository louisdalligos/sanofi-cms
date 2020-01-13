import axiosInstance from "../../../utils/axiosInstance";

function createProductRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/products/create",
    data: body
  });
}

function archiveProductRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/products/change-status/${id}`,
    data: body
  });
}

function changeProductStatusRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/products/change-status/${id}`,
    data: body
  });
}

function fetchCurrentProductRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/products/edit/${id}`
  });
}

function updateProductRequest(id, body) {
  return axiosInstance({
    method: "post",
    url: `/products/update/${id}`,
    data: body
  });
}

function fetchCurrentProductArticlesByCategoryIdRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/products/article/category/${id}`
  });
}

function newProductRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/products/update/new/${id}`,
    data: body
  });
}

function removeProductImageById(uid) {
  return axiosInstance({
    method: "DELETE",
    url: `/products/file/delete/${uid}`
  });
}

const ProductManagementServices = {
  createProductRequest,
  archiveProductRequest,
  changeProductStatusRequest,
  fetchCurrentProductRequest,
  updateProductRequest,
  fetchCurrentProductArticlesByCategoryIdRequest,
  newProductRequest,
  removeProductImageById
};

export default ProductManagementServices;
