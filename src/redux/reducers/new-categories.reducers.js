import {
  FETCH_ALL_CATEGORIES,
  CATEGORIES_LOADERS
} from "../actions/categories-actions/categories.types";

let initialState = {
  categories: [],
  loader: false
};

const newCategoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      const { results } = action.payload.data;
      return {
        ...state,
        categories: results || [],
        loader: false
      };
    case CATEGORIES_LOADERS:
      return {
        ...state,
        loader: !state.loader
      };
    default:
      return state;
  }
};

export default newCategoriesReducers;
