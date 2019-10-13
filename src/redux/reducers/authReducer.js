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
} from "../actions/auth-actions/types";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoadingUser: false,
  access_token: null,
  requestInProgress: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_REQUEST:
      return {
        ...state,
        isLoadingUser: true
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoadingUser: false
      };

    case GET_AUTH_FAILURE:
      return {
        ...state,
        isLoadingUser: false,
        isLoggedIn: false,
        access_token: null
      };

    // Sign in
    case SIGNIN_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        access_token: action.payload,
        requestInProgress: false
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoadingUser: false,
        requestInProgress: false
      };

    // Request account
    case REQUEST_ACCOUNT:
      return {
        ...state,
        requestInProgress: true
      };
    case REQUEST_ACCOUNT_SUCCESS:
      return {
        ...state,
        requestInProgress: false
      };
    case REQUEST_ACCOUNT_ERROR:
      return {
        ...state,
        requestInProgress: false
      };

    //Sign up
    case REGISTER_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        requestInProgress: false
      };
    case REGISTER_ERROR:
      return {
        ...state,
        requestInProgress: false
      };

    // Logout
    case LOGOUT_REQUEST:
      return state;

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
        user: null
      };
    case LOGOUT_FAILED:
      return state;

    // Connect & disconnect user ( no interaction with the server )
    case DISCONNECT_THE_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        token: null
      };

    case CONNECT_THE_USER:
      return {
        ...state,
        isLoggedIn: true,
        access_token: action.payload.access_token // getting token from local storage and put to our state
      };
    default:
      return state;
  }
};

export default authReducer;
