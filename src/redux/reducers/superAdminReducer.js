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
  UNDO_DELETE_ADMIN_REQUEST,
  UNDO_DELETE_ADMIN_SUCCESS,
  UNDO_DELETE_ADMIN_FAILED,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILED,
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
  BLOCK_USER_FAILED,
  UNBLOCK_USER_REQUEST,
  UNBLOCK_USER_SUCCESS,
  UNBLOCK_USER_FAILED
} from "../actions/admin-actions/types";

const initialState = {
  verifiedAdmins: null,
  siteUsers: null,
  invitedSiteUsers: null,
  adminRequestList: null,
  requestInProgress: null,
  currentAdmin: null,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERIFIED_ADMINS_REQUEST:
    case FETCH_ADMIN_REQUEST_LIST:
    case DELETE_ADMIN_REQUEST:
    case CREATE_ADMIN_REQUEST:
    case UPDATE_ADMIN_REQUEST:
    case UNDO_DELETE_ADMIN_REQUEST:
    case FETCH_SITE_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case UNDO_DELETE_USER_REQUEST:
    case FETCH_INVITED_SITE_USERS_REQUEST:
    case UNLOCK_ADMIN_REQUEST:
    case UNLOCK_USER_REQUEST:
    case BLOCK_USER_REQUEST:
    case UNBLOCK_USER_REQUEST:
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
    case FETCH_SITE_USERS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        siteUsers: action.payload
      };
    case FETCH_INVITED_SITE_USERS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        invitedSiteUsers: action.payload
      };
    case DELETE_ADMIN_SUCCESS:
    case DELETE_ADMIN_FAILED:
    case CREATE_ADMIN_FAILED:
    case UPDATE_ADMIN_FAILED:
    case UNDO_DELETE_ADMIN_SUCCESS:
    case UNDO_DELETE_ADMIN_FAILED:
    case FETCH_SITE_USERS_FAILED:
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAILED:
    case DELETE_USER_SUCCESS:
    case DELETE_USER_FAILED:
    case UNDO_DELETE_USER_SUCCESS:
    case UNDO_DELETE_USER_FAILED:
    case FETCH_INVITED_SITE_USERS_FAILED:
    case UNLOCK_ADMIN_SUCCESS:
    case UNLOCK_ADMIN_FAILED:
    case UNLOCK_USER_SUCCESS:
    case UNLOCK_USER_FAILED:
    case BLOCK_USER_SUCCESS:
    case BLOCK_USER_FAILED:
    case UNBLOCK_USER_SUCCESS:
    case UNBLOCK_USER_FAILED:
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
        //verifiedAdmins: [...state.verifiedAdmins, action.payload],
        requestInProgress: false
      };
    case FETCH_CURRENT_ADMIN_REQUEST:
    case FETCH_CURRENT_ADMIN_FAILED:
    case FETCH_CURRENT_USER_REQUEST:
    case FETCH_CURRENT_USER_FAILED:
      return {
        ...state
      };
    case FETCH_CURRENT_ADMIN_SUCCESS:
      return {
        ...state,
        currentAdmin: action.payload
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};
