import {
  FETCH_VERIFIED_ADMINS_REQUEST,
  FETCH_VERIFIED_ADMINS_SUCCESS,
  FETCH_VERIFIED_ADMINS_FAILED,
  FETCH_ADMIN_REQUEST_LIST,
  FETCH_ADMIN_REQUEST_LIST_SUCCESS,
  FETCH_ADMIN_REQUEST_LIST_FAILED,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILED,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILED,
  FETCH_CURRENT_ADMIN_REQUEST,
  FETCH_CURRENT_ADMIN_SUCCESS,
  FETCH_CURRENT_ADMIN_FAILED,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILED
} from "./types";

import SuperAdminServices from "./service";
import { returnNotifications } from "../notification-actions/notificationActions";

// Fetch list of verified admins
export function fetchVerifiedAdmins() {
  return async dispatch => {
    await dispatch({
      type: FETCH_VERIFIED_ADMINS_REQUEST
    });
    try {
      const response = await SuperAdminServices.fetchVerifiedAdminsRequest(); // GET request
      await dispatch({
        type: FETCH_VERIFIED_ADMINS_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_VERIFIED_ADMINS_FAILED"
        )
      );
      dispatch({
        type: FETCH_VERIFIED_ADMINS_FAILED
      });
    }
  };
}

// Fetch list of admin requests
export function fetchAdminRequestList() {
  return async dispatch => {
    await dispatch({
      type: FETCH_ADMIN_REQUEST_LIST
    });
    try {
      const response = await SuperAdminServices.fetchAdminRequestList(); // GET request

      await dispatch({
        type: FETCH_ADMIN_REQUEST_LIST_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_ADMIN_REQUEST_LIST_FAILED"
        )
      );
      dispatch({
        type: FETCH_ADMIN_REQUEST_LIST_FAILED
      });
    }
  };
}

// Create an admin action
export function createAdmin(values) {
  return async dispatch => {
    dispatch({ type: CREATE_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.createAdminRequest(values); // POST request
      dispatch({
        type: CREATE_ADMIN_SUCCESS,
        payload: response.data
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "CREATE_ADMIN_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "CREATE_ADMIN_FAILED"
        )
      );
      dispatch({ type: CREATE_ADMIN_FAILED });
    }
  };
}

// Create an admin action
export function updateAdmin(values) {
  return async dispatch => {
    dispatch({ type: UPDATE_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.updateAdminRequest(values); // POST request
      dispatch({
        type: UPDATE_ADMIN_SUCCESS,
        payload: response.data
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UPDATE_ADMIN_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UPDATE_ADMIN_FAILED"
        )
      );
      dispatch({ type: UPDATE_ADMIN_FAILED });
    }
  };
}

// Delete an admin action
export function deleteAdmin(id) {
  return async dispatch => {
    dispatch({ type: DELETE_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.deleteAdminRequest(id); // DELETE request

      console.log(response.data);
      dispatch({
        type: DELETE_ADMIN_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "DELETE_ADMIN_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "DELETE_ADMIN_FAILED"
        )
      );
      dispatch({ type: DELETE_ADMIN_FAILED });
    }
  };
}

// Fetch current admin
export function fetchCurrentAdmin(id) {
  return async dispatch => {
    await dispatch({
      type: FETCH_CURRENT_ADMIN_REQUEST
    });
    try {
      const response = await SuperAdminServices.fetchCurrentAdminRequest(id); // GET request

      await dispatch({
        type: FETCH_CURRENT_ADMIN_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_CURRENT_ADMIN_FAILED"
        )
      );
      dispatch({
        type: FETCH_CURRENT_ADMIN_FAILED
      });
    }
  };
}
