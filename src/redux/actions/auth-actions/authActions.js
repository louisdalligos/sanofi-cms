import {
  GET_TOKEN_PARAMS,
  VERIFY_REGISTRATION_TOKEN_REQUEST,
  VERIFY_REGISTRATION_TOKEN_SUCCESS,
  VERIFY_REGISTRATION_TOKEN_FAILED,
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
  LOGOUT_SUCCESS,
  RESEND_EMAIL_LINK_REQUEST,
  RESEND_EMAIL_LINK_SUCCESS,
  RESEND_EMAIL_LINK_FAILED
} from "./types";

import { API } from "../../../utils/api";
import axios from "axios";

import AuthServices from "./service";
import { returnNotifications } from "../notification-actions/notificationActions";

// Get registration token from params
export function getTokenFromParams(token) {
  return dispatch => {
    sessionStorage.setItem("registration_token", token);
    dispatch({
      type: GET_TOKEN_PARAMS,
      payload: token
    });
  };
}

// Verify registration token
export function verifyRegistrationToken(token) {
  return async dispatch => {
    await dispatch({
      type: VERIFY_REGISTRATION_TOKEN_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "registration-token": token
      }
    };

    try {
      await axios.get(`${API}/check-registration-token`, config);

      dispatch({
        type: VERIFY_REGISTRATION_TOKEN_SUCCESS
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "VERIFY_REGISTRATION_TOKEN_FAILED"
        )
      );
      dispatch({ type: VERIFY_REGISTRATION_TOKEN_FAILED });
    }
  };
}

// Resend email if registration_token is expired/invalid
export function resendEmailLink(token) {
  return async dispatch => {
    await dispatch({
      type: RESEND_EMAIL_LINK_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "registration-token": token
      }
    };

    try {
      const res = await axios.post(`${API}/resend-request-link`, null, config);

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "RESEND_EMAIL_LINK_SUCCESS"
        )
      );

      dispatch({
        type: RESEND_EMAIL_LINK_SUCCESS
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "RESEND_EMAIL_LINK_FAILED"
        )
      );
      dispatch({ type: RESEND_EMAIL_LINK_FAILED });
    }
  };
}

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
      sessionStorage.removeItem("access_token");
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

      dispatch(returnNotifications(null, null, null, "SIGNIN_SUCCESS")); // just return our success id to trigger getAuthUser action
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response.headers["access-token"]
      });
      sessionStorage.setItem("access_token", response.headers["access-token"]); // set our access token to local storage for verification on page reloads

      // dispatch our fetching of user action
      dispatch(getAuthUser());
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "SIGNIN_FAILURE"
        )
      );
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
export function register(values, token) {
  return async dispatch => {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "registration-token": token
      }
    };

    try {
      const response = await axios.post(`${API}/registration`, values, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.headers["access-token"]
      });
      sessionStorage.setItem("access_token", response.headers["access-token"]); // set our access token to local storage

      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "REGISTER_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          "There was an error in processing your request",
          "error",
          err.response.status,
          "REGISTER_ERROR"
        )
      );
      dispatch({ type: REGISTER_ERROR });
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      //await AuthServices.logoutRequest();
      sessionStorage.removeItem("access_token");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (e) {
      dispatch({ type: LOGOUT_FAILED });
    }
  };
}

export function connectTheUser(token) {
  return async dispatch => {
    sessionStorage.setItem("access_token", token);
    dispatch({
      type: CONNECT_THE_USER,
      payload: {
        access_token: token
      }
    });
  };
}
