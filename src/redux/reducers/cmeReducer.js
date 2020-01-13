import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILED,
  CHANGE_EVENT_STATUS_REQUEST,
  CHANGE_EVENT_STATUS_SUCCESS,
  CHANGE_EVENT_STATUS_FAILED,
  FETCH_CURRENT_EVENT_REQUEST,
  FETCH_CURRENT_EVENT_SUCCESS,
  FETCH_CURRENT_EVENT_FAILED,
  CREATE_EVENT_HEADING_REQUEST,
  CREATE_EVENT_HEADING_SUCCESS,
  CREATE_EVENT_HEADING_FAILED,
  RENAME_EVENT_HEADING_REQUEST,
  RENAME_EVENT_HEADING_SUCCESS,
  RENAME_EVENT_HEADING_FAILED,
  DELETE_EVENT_HEADING_REQUEST,
  DELETE_EVENT_HEADING_SUCCESS,
  DELETE_EVENT_HEADING_FAILED,
  CREATE_EVENT_HEADING_VIDEO_REQUEST,
  CREATE_EVENT_HEADING_VIDEO_SUCCESS,
  CREATE_EVENT_HEADING_VIDEO_FAILED,
  DELETE_EVENT_HEADING_VIDEO_REQUEST,
  DELETE_EVENT_HEADING_VIDEO_SUCCESS,
  DELETE_EVENT_HEADING_VIDEO_FAILED,
  SET_SELECTED_VIDEO,
  CLEAR_CURRENT_VIDEO,
  UPDATE_EVENT_HEADING_VIDEO_REQUEST,
  UPDATE_EVENT_HEADING_VIDEO_SUCCESS,
  UPDATE_EVENT_HEADING_VIDEO_FAILED,
  SET_SELECTED_HEADING,
  CLEAR_SELECTED_HEADING,
  FEATURE_EVENT_REQUEST,
  FEATURE_EVENT_SUCCESS,
  FEATURE_EVENT_FAILED,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILED,
  SET_STATUS_CHANGE_FORM_DISABLE
} from "../actions/cme-actions/types";

const initialState = {
  requestInProgress: null,
  currentEvent: null,
  currentVideoSelected: null,
  currentHeadingSelected: null,
  editVideoMode: false,
  editHeadingMode: false,
  toggleFeaturedProgress: null,
  isFormDirty: null,
  statusChangeFormDisable: true
};

const cmeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
    case CHANGE_EVENT_STATUS_REQUEST:
    case FETCH_CURRENT_EVENT_REQUEST:
    case CREATE_EVENT_HEADING_REQUEST:
    case CREATE_EVENT_HEADING_VIDEO_REQUEST:
    case DELETE_EVENT_HEADING_VIDEO_REQUEST:
    case DELETE_EVENT_HEADING_REQUEST:
    case UPDATE_EVENT_HEADING_VIDEO_REQUEST:
    case RENAME_EVENT_HEADING_REQUEST:
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };

    case CREATE_EVENT_FAILED:
    case FETCH_CURRENT_EVENT_FAILED:
    case CREATE_EVENT_HEADING_SUCCESS:
    case CREATE_EVENT_HEADING_FAILED:
    case CREATE_EVENT_HEADING_VIDEO_SUCCESS:
    case CREATE_EVENT_HEADING_VIDEO_FAILED:
    case DELETE_EVENT_HEADING_VIDEO_SUCCESS:
    case DELETE_EVENT_HEADING_VIDEO_FAILED:
    case DELETE_EVENT_HEADING_SUCCESS:
    case DELETE_EVENT_HEADING_FAILED:
    case UPDATE_EVENT_HEADING_VIDEO_FAILED:
    case RENAME_EVENT_HEADING_FAILED:
    case UPDATE_EVENT_SUCCESS:
    case UPDATE_EVENT_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    case CHANGE_EVENT_STATUS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        statusChangeFormDisable: true
      };
    case CHANGE_EVENT_STATUS_FAILED:
      return {
        ...state,
        requestInProgress: false,
        statusChangeFormDisable: false
      };
    case SET_STATUS_CHANGE_FORM_DISABLE:
      return {
        ...state,
        statusChangeFormDisable: action.payload
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        isFormDirty: false
      };
    case FETCH_CURRENT_EVENT_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        currentEvent: action.payload
      };
    case SET_SELECTED_VIDEO:
      return {
        ...state,
        currentVideoSelected: action.payload,
        editVideoMode: true
      };
    case CLEAR_CURRENT_VIDEO:
      return {
        ...state,
        currentVideoSelected: {
          event_section_id: "",
          video_title: "",
          video_link: "",
          video_description: ""
        },
        editVideoMode: false
      };
    case SET_SELECTED_HEADING:
      return {
        ...state,
        editHeadingMode: true,
        currentHeadingSelected: action.payload
      };
    case CLEAR_SELECTED_HEADING:
      return {
        ...state,
        editHeadingMode: false,
        currentHeadingSelected: null
      };
    case FEATURE_EVENT_REQUEST:
      return {
        ...state,
        toggleFeaturedProgress: true
      };
    case FEATURE_EVENT_SUCCESS:
    case FEATURE_EVENT_FAILED:
      return {
        ...state,
        toggleFeaturedProgress: false
      };
    case RENAME_EVENT_HEADING_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        editHeadingMode: false,
        currentHeadingSelected: null
      };
    case UPDATE_EVENT_HEADING_VIDEO_SUCCESS:
      return {
        ...state,
        editVideoMode: false,
        currentVideoSelected: {
          event_section_id: "",
          video_title: "",
          video_link: "",
          video_description: ""
        },
        editHeadingMode: false
      };
    default:
      return state;
  }
};

export default cmeReducer;
