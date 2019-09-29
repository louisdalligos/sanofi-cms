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

    default:
      return state;
  }
};
