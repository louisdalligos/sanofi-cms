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
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILED,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILED,
  FETCH_CURRENT_ADMIN_REQUEST,
  FETCH_CURRENT_ADMIN_SUCCESS,
  FETCH_CURRENT_ADMIN_FAILED
} from "../actions/admin-actions/types";

const initialState = {
  verifiedAdmins: null,
  adminRequestList: null,
  requestInProgress: null,
  currentAdmin: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERIFIED_ADMINS_REQUEST:
    case FETCH_ADMIN_REQUEST_LIST:
    case DELETE_ADMIN_REQUEST:
    case CREATE_ADMIN_REQUEST:
    case UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case FETCH_VERIFIED_ADMINS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        verifiedAdmins: action.payload
      };
    case DELETE_ADMIN_SUCCESS:
    case DELETE_ADMIN_FAILED:
    case CREATE_ADMIN_FAILED:
    case UPDATE_ADMIN_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    case FETCH_ADMIN_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        adminRequestList: action.payload
      };
    case FETCH_VERIFIED_ADMINS_FAILED:
    case FETCH_ADMIN_REQUEST_LIST_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    case CREATE_ADMIN_SUCCESS:
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        verifiedAdmins: [...state.verifiedAdmins, action.payload],
        requestInProgress: false
      };
    case FETCH_CURRENT_ADMIN_REQUEST:
    case FETCH_CURRENT_ADMIN_FAILED:
      return {
        ...state
      };
    case FETCH_CURRENT_ADMIN_SUCCESS:
      return {
        ...state,
        currentAdmin: action.payload
      };
    default:
      return state;
  }
};
