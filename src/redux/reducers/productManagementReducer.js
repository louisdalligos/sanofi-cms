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
  FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILED,
  SET_STATUS_CHANGE_FORM_DISABLE,
  CHANGE_PRODUCT_STATUS_REQUEST,
  CHANGE_PRODUCT_STATUS_SUCCESS,
  CHANGE_PRODUCT_STATUS_FAILED
} from "../actions/product-management-actions/types";

const initialState = {
  categories: null,
  requestInProgress: null,
  loading: false,
  modal: false,
  currentProduct: null,
  specializations: null,
  articlesByCategory: null,
  toggleNewProgress: null,
  isFormDirty: null,
  // TODO: Refactor
  productImages: [],
  serverSideLoader: false,
  statusChangeFormDisable: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case ARCHIVE_PRODUCT_REQUEST:
    case FETCH_CURRENT_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_REQUEST:
    case CHANGE_PRODUCT_STATUS_REQUEST:
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
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        toggleNewProgress: true
      };
    case NEW_PRODUCT_SUCCESS:
    case NEW_PRODUCT_FAILED:
      return {
        ...state,
        toggleNewProgress: false
      };
    // TODO: Refactor
    case "ADD_PRODUCT_IMAGES":
      return {
        ...state,
        productImages: action.payload.productImages
      };
    case "SERVER_SIDE_LOADER":
      return {
        ...state,
        serverSideLoader: action.payload.loader
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        isFormDirty: false
      };
    case CHANGE_PRODUCT_STATUS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        statusChangeFormDisable: true
      };
    case CHANGE_PRODUCT_STATUS_FAILED:
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
    default:
      return state;
  }
};
