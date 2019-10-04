import * as types from "Actions";

const initialState = {
  article: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES:
      return {
        ...state,
        article: action.payload,
        loading: false
      };
    case types.CLEAR_ARTICLES:
      return {
        ...state,
        article: null,
        error: null,
        current: null
      };
    case types.ARTICLE_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
