import { SET_FORM_DIRTY } from "./types";

export function setFormDirty(value) {
  console.log(value);
  return async dispatch => {
    await dispatch({
      type: SET_FORM_DIRTY,
      payload: value
    });
  };
}
