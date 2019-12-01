import {
  FETCH_DELETED_USERS,
  DELETED_USER_PAGINATION_CHANGE_PAGE,
  DELETED_USER_PAGINATION_CHANGE_PERPAGE,
  DELETED_USER_TABLE_CHANGE_COLUMN,
  DELETED_USER_TABLE_SET_FILTERS,
  DELETED_USER_DELETE_PERMANENTLY_MESSAGE
} from "./actionTypes";
import UsersDeletedServices from "./service";

export function setTableFilters(filters) {
  return dispatch => {
    dispatch({
      type: DELETED_USER_TABLE_SET_FILTERS,
      payload: {
        tableFilters: filters
      }
    });
  };
}

export function deletedUserOnChangePage(page, pageSize, table) {
  return async dispatch => {
    try {
      const pagination = { page, per_page: pageSize };
      const res = await UsersDeletedServices.tableAndPaginationFilters(
        table,
        pagination
      );
      dispatch({
        type: DELETED_USER_PAGINATION_CHANGE_PAGE,
        payload: res
      });
    } catch (error) {
      throw new Error("deletedUserOnChangePage() API Error");
    }
  };
}

export function deletedUserOnChangePerPage(current, size, table) {
  return async dispatch => {
    try {
      const pagination = { page: current, per_page: size };
      const res = await UsersDeletedServices.tableAndPaginationFilters(
        table,
        pagination
      );
      dispatch({
        type: DELETED_USER_PAGINATION_CHANGE_PERPAGE,
        payload: res
      });
    } catch (error) {
      throw new Error("deletedUserOnChangePerPage() API Error");
    }
  };
}

export function deletedUserOnChangeTableColumn(table, pagination) {
  return async dispatch => {
    try {
      const res = await UsersDeletedServices.tableAndPaginationFilters(
        table,
        pagination
      );
      dispatch({
        type: DELETED_USER_TABLE_CHANGE_COLUMN,
        payload: res
      });
    } catch (error) {
      throw new Error("deletedUserOnChangeTableColumn() API Error");
    }
  };
}

export function deletedUsersDeletePermanently(userId) {
  return async dispatch => {
    try {
      const success = await UsersDeletedServices.deletedUsersDeletePermanently(
        userId
      );
      dispatch({
        type: DELETED_USER_DELETE_PERMANENTLY_MESSAGE,
        payload: success
        /* should be like this
                payload: {
                    data: { success: "Account successfully permanent deleted!" }
                }*/
      });
      const res = await UsersDeletedServices.fetchAllDeletedUsers();
      dispatch({
        type: FETCH_DELETED_USERS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: DELETED_USER_DELETE_PERMANENTLY_MESSAGE,
        payload: error
        /* should be like this
                payload: {
                    data: { error: "Unauthorized access" }
                }*/
      });
    }
  };
}

export function fetchAllDeletedUsers() {
  return async dispatch => {
    try {
      const res = await UsersDeletedServices.fetchAllDeletedUsers();
      dispatch({
        type: FETCH_DELETED_USERS,
        payload: res
      });
    } catch (error) {
      throw new Error("fetchAllDeletedUsers() API Error");
    }
  };
}
