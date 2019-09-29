import {
  ADD_THERAPY,
  DELETE_THERAPY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_THERAPY
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case ADD_THERAPY:
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    case UPDATE_THERAPY:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        )
      };
    case DELETE_THERAPY:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
