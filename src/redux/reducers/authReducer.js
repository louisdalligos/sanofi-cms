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
  LOGOUT_SUCCESS,
  VERIFY_REGISTRATION_TOKEN_SUCCESS,
  VERIFY_REGISTRATION_TOKEN_FAILED,
  VERIFY_REGISTRATION_TOKEN_REQUEST,
  GET_TOKEN_PARAMS,
  RESEND_EMAIL_LINK_REQUEST,
  RESEND_EMAIL_LINK_FAILED,
  RESEND_EMAIL_LINK_SUCCESS
} from "../actions/auth-actions/types";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoadingUser: false,
  access_token: null,
  requestInProgress: null,
  registration_token: null,
  isRegistrationTokenVerified: true,
  loading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_PARAMS:
      return {
        ...state,
        loading: true,
        registration_token: action.payload
      };
    case VERIFY_REGISTRATION_TOKEN_REQUEST:
      return {
        ...state
      };
    case VERIFY_REGISTRATION_TOKEN_SUCCESS:
      return {
        ...state,
        isRegistrationTokenVerified: true,
        loading: false
      };
    case VERIFY_REGISTRATION_TOKEN_FAILED:
      return {
        ...state,
        isRegistrationTokenVerified: false,
        loading: false
      };
    case RESEND_EMAIL_LINK_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case RESEND_EMAIL_LINK_SUCCESS:
    case RESEND_EMAIL_LINK_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
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
        requestInProgress: false,
        access_token: action.payload
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
