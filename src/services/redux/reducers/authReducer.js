import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  CLEAR_CURRENT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      console.log(action.payload);
      debugger;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token); // put the token we get back inside of localstorage
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
