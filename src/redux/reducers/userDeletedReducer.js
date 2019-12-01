import {
  FETCH_DELETED_USERS,
  DELETED_USER_PAGINATION_CHANGE_PAGE,
  DELETED_USER_PAGINATION_CHANGE_PERPAGE,
  DELETED_USER_TABLE_CHANGE_COLUMN,
  DELETED_USER_TABLE_SET_FILTERS,
  DELETED_USER_DELETE_PERMANENTLY_MESSAGE
} from "../actions/users-deleted-actions/actionTypes";

let initialState = {
  isLoading: true,
  toastr: null,
  users: [],
  tableFilters: null,
  info: {
    total_count: 0,
    per_page: 0,
    page: 1
  }
};

const userDeletedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELETED_USERS:
    case DELETED_USER_PAGINATION_CHANGE_PAGE:
    case DELETED_USER_PAGINATION_CHANGE_PERPAGE:
    case DELETED_USER_TABLE_CHANGE_COLUMN:
      const { results, info } = action.payload.data;
      return {
        ...state,
        users: results,
        info: info,
        isLoading: false,
        toastr: null
      };

    case DELETED_USER_TABLE_SET_FILTERS:
      return {
        ...state,
        tableFilters: action.payload.tableFilters,
        toastr: null
      };

    case DELETED_USER_DELETE_PERMANENTLY_MESSAGE:
      const { success, error } = action.payload.data;
      const isSuccess = (success && success.length) || false;
      return {
        ...state,
        toastr: {
          type: isSuccess ? "success" : "error",
          message: isSuccess ? success : error
        }
      };

    default:
      return state;
  }
};

export default userDeletedReducer;
