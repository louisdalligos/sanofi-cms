import { SET_PRODUCT_SECTION_DIRTY } from "./centralize-functionality.types";

export function setProductDirty(payload) {
  return dispatch => {
    dispatch({
      type: SET_PRODUCT_SECTION_DIRTY,
      payload
    });
  };
}
