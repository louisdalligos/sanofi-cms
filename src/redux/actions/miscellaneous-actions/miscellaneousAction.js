import {
  CREATE_MISC_CONTENT,
  UPDATE_MISC_CONTENT,
  LOADING_MISC_CONTENT,
  FETCH_ALL_MISC_CONTENT,
  ERROR_CREATE_MISC_CONTENT,
  ERROR_UPDATE_MISC_CONTENT,
  ERROR_CLEAR_PLACEHOLDER,
  ERROR_FETCH_MISC_CONTENT,
  SPECIAL_CASE_MESSAGE
} from "./actionTypes";
import MiscellaneousServices from "./service";

export function addSpecialMessage(message) {
  return dispatch => {
    dispatch({
      type: SPECIAL_CASE_MESSAGE,
      payload: {
        message: message
      }
    });
  };
}

export function fetchAllMiscContent() {
  return async dispatch => {
    await dispatch({
      type: LOADING_MISC_CONTENT
    });
    await dispatch({
      type: ERROR_CLEAR_PLACEHOLDER
    });
    try {
      const res = await MiscellaneousServices.fetchAllMiscContent();
      dispatch({
        type: FETCH_ALL_MISC_CONTENT,
        payload: res
      });
    } catch (error) {
      const payload = {
        // BEFORE: error.response.data.message;
        message: error.response.data.error || error.response.data.message
      };
      dispatch({
        type: ERROR_FETCH_MISC_CONTENT,
        payload
      });
    }
  };
}

export function createMiscContent(body) {
  return async dispatch => {
    await dispatch({
      type: LOADING_MISC_CONTENT
    });
    await dispatch({
      type: ERROR_CLEAR_PLACEHOLDER
    });
    try {
      const res = await MiscellaneousServices.createMiscContent(body);
      console.log("create", res);

      dispatch({
        type: CREATE_MISC_CONTENT,
        payload: res
      });
    } catch (error) {
      const payload = {
        // BEFORE: error.response.data.message;
        message: error.response.data.error || error.response.data.message
      };
      dispatch({
        type: ERROR_CREATE_MISC_CONTENT,
        payload
      });
    }
  };
}

export function updateMiscContent(body) {
  return async dispatch => {
    await dispatch({
      type: LOADING_MISC_CONTENT
    });
    await dispatch({
      type: ERROR_CLEAR_PLACEHOLDER
    });
    try {
      const res = await MiscellaneousServices.updateMiscContent(body);
      console.log("update", res);

      await dispatch({
        type: UPDATE_MISC_CONTENT,
        payload: res
      });
    } catch (error) {
      const payload = {
        // BEFORE: error.response.data.message;
        message: error.response.data.error || error.response.data.message
      };
      dispatch({
        type: ERROR_UPDATE_MISC_CONTENT,
        payload
      });
    }
  };
}

export function cleanErrors() {
  return dispatch => dispatch({ type: ERROR_CLEAR_PLACEHOLDER });
}
