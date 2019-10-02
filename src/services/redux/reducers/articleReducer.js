import { SET_LOADING, ARTICLE_ERROR, FETCH_ARTICLES } from "../actions/types";

const initialState = {
  article: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      console.log(action.payload);
      return {
        ...state,
        article: action.payload,
        loading: false
      };
    case ARTICLE_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
