import {
  FILTER_TABLE_REQUEST,
  FILTER_TABLE_SUCCESS,
  FILTER_TABLE_FAILED,
  SET_PAGE_SIZE,
  SET_PAGE_NUMBER,
  SET_PARAMS,
  SET_PARAM_URL,
  CLEAR_PARAMS,
  SET_TOTAL_RESULT_COUNT
} from "./types";

import TableServices from "./service";

// Fetch list of verified admins
export function filterTableWithParams(params, url) {
  return async dispatch => {
    dispatch({ type: FILTER_TABLE_REQUEST });
    try {
      const response = await TableServices.filterTableWithParamsRequest(
        params,
        url
      ); // GET request

      await dispatch({
        type: FILTER_TABLE_SUCCESS,
        payload: response.data.results,
        meta: response.data.info
      });

      console.log(response);
      //debugger;
    } catch (err) {
      dispatch({ type: FILTER_TABLE_FAILED });
    }
  };
}

export function setPageSize(size) {
  return async dispatch => {
    filterTableWithParams({ per_page: size });
    dispatch({
      type: SET_PAGE_SIZE,
      payload: size
    });
  };
}

export function setPageNumber(number) {
  return async dispatch => {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: number
    });
  };
}

export function setParams(params) {
  return async dispatch => {
    dispatch({
      type: SET_PARAMS,
      payload: params
    });
  };
}

export function setParamUrl(url) {
  return async dispatch => {
    dispatch({
      type: SET_PARAM_URL,
      payload: url
    });
  };
}

export function clearParams() {
  return async dispatch => {
    dispatch({
      type: CLEAR_PARAMS
    });
  };
}

export function setTotalResultCount(total) {
  return async dispatch => {
    dispatch({
      type: SET_TOTAL_RESULT_COUNT,
      payload: total
    });
  };
}
