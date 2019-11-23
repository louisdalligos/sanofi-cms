import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED,
  ARCHIVE_PRODUCT_REQUEST,
  ARCHIVE_PRODUCT_SUCCESS,
  ARCHIVE_PRODUCT_FAILED,
  FETCH_CURRENT_PRODUCT_REQUEST,
  FETCH_CURRENT_PRODUCT_SUCCESS,
  FETCH_CURRENT_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_REQUEST,
  FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_SUCCESS,
  FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED
} from "../actions/product-management-actions/types";

const initialState = {
  categories: null,
  requestInProgress: null,
  loading: false,
  modal: false,
  currentProduct: null,
  specializations: null,
  articlesByCategory: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case ARCHIVE_PRODUCT_REQUEST:
    case FETCH_CURRENT_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case CREATE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_FAILED:
    case ARCHIVE_PRODUCT_SUCCESS:
    case ARCHIVE_PRODUCT_FAILED:
    case FETCH_CURRENT_PRODUCT_FAILED:
    case FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    case FETCH_CURRENT_PRODUCT_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        currentProduct: action.payload
      };
    case FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        articlesByCategory: action.payload
      };
    default:
      return state;
  }
};
