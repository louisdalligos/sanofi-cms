import axiosInstance from "../../../utils/axiosInstance";

const isProd = process.env.NODE_ENV === "development" ? false : true;

function fetchAllDeletedUsers() {
  return axiosInstance({
    method: "GET",
    url: "/users/audit-trail"
  });
}

function tableAndPaginationFilters(table, pagination) {
  const sorterLen = (table && Object.keys(table.sorter).length) || 0;
  const params = {
    order_by_field: sorterLen ? table.sorter.column.key : null,
    order_by_sort: sorterLen
      ? table.sorter.order === "descend"
        ? "DESC"
        : "ASC"
      : null,
    page: pagination.page,
    per_page: pagination.per_page
  };
  return axiosInstance({
    method: "GET",
    url: "/users/audit-trail",
    params
  });
}

function deletedUserManagePagination({ page, per_page }) {
  const params = { page, per_page };
  return axiosInstance({
    method: "GET",
    url: "/users/audit-trail",
    params
  });
}

function deletedUsersDeletePermanently(userId) {
  return axiosInstance({
    method: "DELETE",
    url: `/users/audit-trail/${userId}`
  });
}

const UsersDeletedServices = {
  fetchAllDeletedUsers,
  deletedUserManagePagination,
  tableAndPaginationFilters,
  deletedUsersDeletePermanently
};

export default UsersDeletedServices;
