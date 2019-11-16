import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED
} from "../actions/product-management-actions/types";

const initialState = {
  categories: null,
  requestInProgress: null,
  loading: false,
  modal: false,
  currentProduct: null,
  specializations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case CREATE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    default:
      return state;
  }
};
