import axiosInstance from "../../../utils/axiosInstance";

function filterTableWithParamsRequest(params, url) {
  return axiosInstance({
    method: "get",
    url: url,
    params: params
  });
}

const TableServices = {
  filterTableWithParamsRequest
};

export default TableServices;
