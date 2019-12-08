import { SET_PRODUCT_SECTION_DIRTY } from "../actions/centralize-functionality-actions/centralize-functionality.types";

let initialState = {
  productDirty: false
};

const centralizeFunctionalityReducers = (state = initialState, action) => {
  switch (action) {
    case SET_PRODUCT_SECTION_DIRTY:
      const dirty = action.payload.dirty;
      return {
        ...state,
        productDirty: dirty
      };
    default:
      return state;
  }
};

export default centralizeFunctionalityReducers;
