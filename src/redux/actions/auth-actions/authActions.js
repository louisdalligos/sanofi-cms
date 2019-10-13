import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  REQUEST_ACCOUNT,
  REQUEST_ACCOUNT_SUCCESS,
  REQUEST_ACCOUNT_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_REQUEST,
  DISCONNECT_THE_USER,
  CONNECT_THE_USER,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS
} from "./types";

import AuthServices from "./service";
import { returnNotifications } from "../notification-actions/notificationActions";

export function getAuthUser() {
  return async dispatch => {
    await dispatch({
      type: GET_AUTH_REQUEST
    });
    try {
      const response = await AuthServices.getAuthUserRequest();
      await dispatch({
        type: GET_AUTH_SUCCESS,
        payload: {
          user: response.data,
          isLoggedIn: true
        }
      });
    } catch (e) {
      localStorage.removeItem("access_token");
      dispatch({
        type: GET_AUTH_FAILURE
      });
    }
  };
}

export function signin(values) {
  return async dispatch => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
      const response = await AuthServices.signinRequest(values); // POST request
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response.headers["access-token"]
      });
      localStorage.setItem("access_token", response.headers["access-token"]); // set our access token to local storage for verification on page reloads
    } catch (err) {
      // dispatch(
      //     returnNotifications(
      //         err.response.data,
      //         "error",
      //         err.response.status,
      //         "SIGNIN_FAILURE"
      //     )
      // );
      console.log(err);
      dispatch({ type: SIGNIN_FAILURE });
    }
  };
}

// Request an account to admin
export function requestAccount(body) {
  return async dispatch => {
    dispatch({ type: REQUEST_ACCOUNT });
    try {
      const response = await AuthServices.requestAccountService(body); // POST request
      dispatch({ type: REQUEST_ACCOUNT_SUCCESS });
      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "REQUEST_ACCOUNT_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "REQUEST_ACCOUNT_ERROR"
        )
      );
      dispatch({ type: REQUEST_ACCOUNT_ERROR });
    }
  };
}

// Complete registration action from verified registration email
export function register(body) {
  return async dispatch => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await AuthServices.registerRequest(body);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      localStorage.setItem("access_token", response.headers["access-token"]); // set our access token to local storage
    } catch (err) {
      dispatch({ type: REGISTER_ERROR });
      dispatch(returnNotifications(err.response.data, err.response.status));
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      //await AuthServices.logoutRequest();
      localStorage.removeItem("access_token");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (e) {
      dispatch({ type: LOGOUT_FAILED });
    }
  };
}

export function connectTheUser(token) {
  return async dispatch => {
    localStorage.setItem("access_token", token);
    dispatch({
      type: CONNECT_THE_USER,
      payload: {
        access_token: token
      }
    });
  };
}
