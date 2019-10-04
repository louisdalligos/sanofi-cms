import * as types from "Actions";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOADED:
      console.log(action.payload);
      debugger;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token); // put the token we get back inside of localstorage
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case types.LOGIN_FAILURE:
    case types.AUTH_ERROR:
    case types.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case types.SET_LOADING_USER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
