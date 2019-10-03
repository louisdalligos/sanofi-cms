import {
  USER_LOADED,
  CLEAR_CURRENT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING_USER
} from "./types";
import axios from "axios";

import setAuthToken from "Utils/setAuthToken";

// load the user
export const loadUser = () => async dispatch => {
  // load token into global headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Login User
export const login = formData => async dispatch => {
  try {
    setLoading(); // loading state

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/auth", formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    loadUser(); // load the user
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.msg
    });
  }
};

// Logout
export const logout = () => {
  return { type: LOGOUT };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING_USER
  };
};
