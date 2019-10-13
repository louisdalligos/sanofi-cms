import {
  FETCH_ARTICLES,
  CLEAR_ARTICLES,
  ARTICLE_ERROR,
  SET_LOADING_ARTICLES
} from "../actions/post-management-actions/types";

const initialState = {
  article: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        article: action.payload,
        loading: false
      };
    case CLEAR_ARTICLES:
      return {
        ...state,
        article: null,
        error: null,
        current: null
      };
    case ARTICLE_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING_ARTICLES:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
