import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "../actions/user-maintenance-actions/types";

const initialState = {
  requestInProgress: null,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case UPDATE_PROFILE_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_FAILED:
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_FAILED:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        requestInProgress: false
      };
    default:
      return state;
  }
};
