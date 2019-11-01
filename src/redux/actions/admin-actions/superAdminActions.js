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
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILED,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILED,
  UNDO_DELETE_ADMIN_REQUEST,
  UNDO_DELETE_ADMIN_SUCCESS,
  UNDO_DELETE_ADMIN_FAILED,
  FETCH_CURRENT_ADMIN_REQUEST,
  FETCH_CURRENT_ADMIN_SUCCESS,
  FETCH_CURRENT_ADMIN_FAILED,
  FETCH_SITE_USERS_REQUEST,
  FETCH_SITE_USERS_SUCCESS,
  FETCH_SITE_USERS_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UNDO_DELETE_USER_REQUEST,
  UNDO_DELETE_USER_SUCCESS,
  UNDO_DELETE_USER_FAILED,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILED,
  FETCH_INVITED_SITE_USERS_REQUEST,
  FETCH_INVITED_SITE_USERS_SUCCESS,
  FETCH_INVITED_SITE_USERS_FAILED,
  UNLOCK_ADMIN_REQUEST,
  UNLOCK_ADMIN_SUCCESS,
  UNLOCK_ADMIN_FAILED,
  UNLOCK_USER_REQUEST,
  UNLOCK_USER_SUCCESS,
  UNLOCK_USER_FAILED,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_FAILED
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

      console.log(response.data);
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
export function updateAdmin(id, values) {
  return async dispatch => {
    dispatch({ type: UPDATE_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.updateAdminRequest(id, values); // POST request
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
      console.log(err);
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

// Undo delete admin action
export function undoDeleteAdmin(id) {
  return async dispatch => {
    dispatch({ type: UNDO_DELETE_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.undoDeleteAdminRequest(id); // PUT request
      dispatch({
        type: UNDO_DELETE_ADMIN_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UNDO_DELETE_ADMIN_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UNDO_DELETE_ADMIN_FAILED"
        )
      );
      dispatch({ type: UNDO_DELETE_ADMIN_FAILED });
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

// Fetch list of users(doctors)
export function fetchSiteUsers() {
  return async dispatch => {
    await dispatch({
      type: FETCH_SITE_USERS_REQUEST
    });
    try {
      const response = await SuperAdminServices.fetchSiteUsersRequest(); // GET request
      await dispatch({
        type: FETCH_SITE_USERS_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_SITE_USERS_FAILED"
        )
      );
      dispatch({
        type: FETCH_SITE_USERS_FAILED
      });
    }
  };
}

// Create an user action
export function createUser(values) {
  return async dispatch => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await SuperAdminServices.createUserRequest(values); // POST request
      console.log(response.data);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "CREATE_USER_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "CREATE_USER_FAILED"
        )
      );
      dispatch({ type: CREATE_USER_FAILED });
    }
  };
}
// Fetch current user
export function fetchCurrentUser(id) {
  return async dispatch => {
    await dispatch({
      type: FETCH_CURRENT_USER_REQUEST
    });
    try {
      const response = await SuperAdminServices.fetchCurrentUserRequest(id); // GET request

      await dispatch({
        type: FETCH_CURRENT_USER_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_CURRENT_USER_FAILED"
        )
      );
      dispatch({
        type: FETCH_CURRENT_USER_FAILED
      });
    }
  };
}

// Delete user
export function deleteUser(id) {
  return async dispatch => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const response = await SuperAdminServices.deleteUserRequest(id); // DELETE request

      dispatch({
        type: DELETE_USER_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "DELETE_USER_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "DELETE_USER_FAILED"
        )
      );
      dispatch({ type: DELETE_USER_FAILED });
    }
  };
}

// Undo delete user
export function undoDeleteUser(id) {
  return async dispatch => {
    dispatch({ type: UNDO_DELETE_USER_REQUEST });
    try {
      const response = await SuperAdminServices.undoDeleteUserRequest(id); // PUT request
      dispatch({
        type: UNDO_DELETE_USER_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UNDO_DELETE_USER_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UNDO_DELETE_USER_FAILED"
        )
      );
      dispatch({ type: UNDO_DELETE_USER_FAILED });
    }
  };
}

// Fetch invited list of users(doctors)
export function fetchInvitedSiteUsers() {
  return async dispatch => {
    await dispatch({
      type: FETCH_INVITED_SITE_USERS_REQUEST
    });
    try {
      const response = await SuperAdminServices.fetchInvitedSiteUsersRequest(); // GET request
      await dispatch({
        type: FETCH_INVITED_SITE_USERS_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_INVITED_SITE_USERS_FAILED"
        )
      );
      dispatch({
        type: FETCH_INVITED_SITE_USERS_FAILED
      });
    }
  };
}

// Unlock an admin action
export function unlockAdmin(id) {
  return async dispatch => {
    dispatch({ type: UNLOCK_ADMIN_REQUEST });
    try {
      const response = await SuperAdminServices.unlockAdminRequest(id); // PUT request

      dispatch({
        type: UNLOCK_ADMIN_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UNLOCK_ADMIN_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UNLOCK_ADMIN_FAILED"
        )
      );
      dispatch({ type: UNLOCK_ADMIN_FAILED });
    }
  };
}

// Unlock user action
export function unlockUser(id) {
  return async dispatch => {
    dispatch({ type: UNLOCK_USER_REQUEST });
    try {
      const response = await SuperAdminServices.unlockUserRequest(id); // PUT request

      dispatch({
        type: UNLOCK_USER_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "UNLOCK_USER_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "UNLOCK_USER_FAILED"
        )
      );
      dispatch({ type: UNLOCK_USER_FAILED });
    }
  };
}

// Unlock user action
export function blockUser(id) {
  return async dispatch => {
    dispatch({ type: BLOCK_USER_REQUEST });
    try {
      const response = await SuperAdminServices.blockUserRequest(id); // PUT request

      dispatch({
        type: BLOCK_USER_SUCCESS
      });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "BLOCK_USER_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "BLOCK_USER_FAILED"
        )
      );
      dispatch({ type: BLOCK_USER_FAILED });
    }
  };
}
