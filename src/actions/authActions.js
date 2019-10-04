import * as types from "./index";

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

    dispatch({ type: types.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: types.AUTH_ERROR });
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
      type: types.LOGIN_SUCCESS,
      payload: res.data
    });

    loadUser(); // load the user
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAILURE,
      payload: error.response.data.msg
    });
  }
};

// Logout
export const logout = () => {
  return { type: types.LOGOUT };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS
  };
};

// Set Loading
export const setLoading = () => {
  return {
    type: types.SET_LOADING_USER
  };
};
