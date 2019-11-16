import axiosInstance from "../../../utils/axiosInstance";

function createProductRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/products/create",
    data: body
  });
}

const ProductManagementServices = {
  createProductRequest
};

export default ProductManagementServices;
