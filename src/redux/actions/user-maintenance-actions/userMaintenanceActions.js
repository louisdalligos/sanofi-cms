import UserMaintenanceServices from "./service";
import { returnNotifications } from "../notification-actions/notificationActions";

import {
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "./types";

// Fetch current user
export function fetchCurrentUser() {
  return async dispatch => {
    dispatch({ type: FETCH_CURRENT_USER_REQUEST });
    try {
      const response = await UserMaintenanceServices.fetchCurrentUserRequest();
      dispatch({
        type: FETCH_CURRENT_USER_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

// Update profile information
export function updateProfileInfo(body) {
  return async dispatch => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      // PUT request
      const response = await UserMaintenanceServices.updateProfileRequest(body);

      console.log(response);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UPDATE_PROFILE_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UPDATE_PROFILE_FAILED"
        )
      );
      dispatch({ type: UPDATE_PROFILE_FAILED });
    }
  };
}

// Change password
export function changePassword(body) {
  return async dispatch => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
      // POST request
      const response = await UserMaintenanceServices.changePasswordRequest(
        body
      );

      console.log(response, "change password");
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "CHANGE_PASSWORD_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "CHANGE_PASSWORD_FAILED"
        )
      );
      dispatch({ type: CHANGE_PASSWORD_FAILED });
    }
  };
}

// Forgot password
export function resetPassword(body) {
  return async dispatch => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      // POST request
      const response = await UserMaintenanceServices.resetPasswordRequest(body);
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "RESET_PASSWORD_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "RESET_PASSWORD_ERROR"
        )
      );
      dispatch({ type: RESET_PASSWORD_ERROR });
    }
  };
}
