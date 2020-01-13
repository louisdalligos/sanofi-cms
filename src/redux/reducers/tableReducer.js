import {
  FILTER_TABLE_REQUEST,
  FILTER_TABLE_SUCCESS,
  FILTER_TABLE_FAILED,
  SET_PAGE_SIZE,
  SET_PAGE_NUMBER,
  SET_PARAMS,
  SET_PARAM_URL,
  SET_TOTAL_RESULT_COUNT,
  CLEAR_PARAMS
} from "../actions/table-actions/types";

const initialState = {
  requestInProgress: null,
  results: [],
  pagination: {},
  per_page: 10,
  result_count: null,
  page_number: 1,
  params: {},
  param_url: null,
  total_count: null
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_TABLE_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case FILTER_TABLE_SUCCESS:
      console.log(action.meta);
      //debugger;
      return {
        ...state,
        requestInProgress: false,
        results: action.payload,
        result_count: action.meta.result_count, // response data from api
        total_count: action.meta.total_count
      };
    case FILTER_TABLE_FAILED:
      return {
        ...state,
        requestInProgress: false,
        results: [],
        result_count: null
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        per_page: action.payload
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        page_number: action.payload
      };
    case SET_PARAMS:
      return {
        ...state,
        params: action.payload
      };
    case SET_PARAM_URL:
      return {
        ...state,
        param_url: action.payload
      };
    case SET_TOTAL_RESULT_COUNT:
      return {
        ...state,
        result_count: action.payload
      };
    case CLEAR_PARAMS:
      return {
        ...state,
        results: [],
        per_page: 10,
        result_count: null,
        page_number: 1,
        params: {},
        param_url: null
      };
    default:
      return state;
  }
};

export default tableReducer;
