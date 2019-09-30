import {
  ADD_THERAPY,
  DELETE_THERAPY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_THERAPY,
  THERAPY_ERROR,
  FETCH_THERAPIES
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_THERAPIES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case ADD_THERAPY:
      return {
        ...state,
        articles: [...state.articles, action.payload],
        loading: false
      };
    case UPDATE_THERAPY:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        ),
        loading: false
      };
    case DELETE_THERAPY:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        ),
        loading: false
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
    case THERAPY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
