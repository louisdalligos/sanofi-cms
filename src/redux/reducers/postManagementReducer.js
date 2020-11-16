import {
  FETCH_SPECIALIZATIONS_REQUEST,
  FETCH_SPECIALIZATIONS_SUCCESS,
  FETCH_SPECIALIZATIONS_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILED,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILED,
  ARCHIVE_ARTICLE_REQUEST,
  ARCHIVE_ARTICLE_SUCCESS,
  ARCHIVE_ARTICLE_FAILED,
  FETCH_CURRENT_ARTICLE_REQUEST,
  FETCH_CURRENT_ARTICLE_SUCCESS,
  FETCH_CURRENT_ARTICLE_FAILED,
  CHANGE_ARTICLE_STATUS_REQUEST,
  CHANGE_ARTICLE_STATUS_SUCCESS,
  CHANGE_ARTICLE_STATUS_FAILED,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILED,
  CHECK_IMAGE_REQUEST,
  CHECK_IMAGE_SUCCESS,
  CHECK_IMAGE_FAILED,
  SEARCH_TAGS_REQUEST,
  SEARCH_TAGS_SUCCESS,
  SEARCH_TAGS_FAILED,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILED,
  SET_STATUS_CHANGE_FORM_DISABLE
} from "../actions/post-management-actions/types";

const initialState = {
  categories: null,
  subCategories: null,
  requestInProgress: null,
  loading: false,
  modal: false,
  currentArticle: null,
  specializations: null,
  isFormDirty: null,
  tags: null,
  statusChangeFormDisable: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
    case FETCH_SUBCATEGORIES_REQUEST:
    case CREATE_ARTICLE_REQUEST:
    case ARCHIVE_ARTICLE_REQUEST:
    case FETCH_CURRENT_ARTICLE_REQUEST:
    case FETCH_SPECIALIZATIONS_REQUEST:
    case CHANGE_ARTICLE_STATUS_REQUEST:
    case UPDATE_ARTICLE_REQUEST:
    case CHECK_IMAGE_REQUEST:
    case SEARCH_TAGS_REQUEST:
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        requestInProgress: true
      };
    case FETCH_SPECIALIZATIONS_SUCCESS:
      return {
        ...state,
        specializations: action.payload,
        requestInProgress: false
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        requestInProgress: false
      };
    case FETCH_SPECIALIZATIONS_FAILED:
    case FETCH_CATEGORIES_FAILED:
    case FETCH_SUBCATEGORIES_FAILED:
    case CREATE_ARTICLE_FAILED:
    case ARCHIVE_ARTICLE_SUCCESS:
    case ARCHIVE_ARTICLE_FAILED:
    case FETCH_CURRENT_ARTICLE_FAILED:
    case CHANGE_ARTICLE_STATUS_FAILED:
    case UPDATE_ARTICLE_FAILED:
    case CHECK_IMAGE_SUCCESS:
    case CHECK_IMAGE_FAILED:
    case SEARCH_TAGS_SUCCESS:
    case SEARCH_TAGS_FAILED:
      return {
        ...state,
        requestInProgress: false
      };
    case CHANGE_ARTICLE_STATUS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        statusChangeFormDisable: true
      };
    case CHANGE_ARTICLE_STATUS_FAILED:
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
    case ADD_CATEGORY_REQUEST:
    case ADD_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_CATEGORY_SUCCESS:
    case ADD_CATEGORY_FAILED:
    case ADD_SUBCATEGORY_SUCCESS:
    case ADD_SUBCATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        modal: false
      };
    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subCategories: action.payload,
        requestInProgress: false
      };
    case FETCH_CURRENT_ARTICLE_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        currentArticle: action.payload
      };
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        isFormDirty: false
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        tags: action.payload
      };
    case FETCH_TAGS_FAILED:
      return {
        ...state,
        requestInProgress: false,
        tags: null
      };
    default:
      return state;
  }
};
