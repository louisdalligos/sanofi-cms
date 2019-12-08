import {
  FETCH_ALL_SUBCATEGORIES,
  SUBCATEGORIES_LOADERS
} from "../actions/subcategories-actions/subcategories.types";

let initialState = {
  categories: [],
  loader: false
};

const newSubcategoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SUBCATEGORIES:
      const { results } = action.payload.data;
      return {
        ...state,
        categories: results || [],
        loader: false
      };
    case SUBCATEGORIES_LOADERS:
      return {
        ...state,
        loader: !state.loader
      };
    default:
      return state;
  }
};

export default newSubcategoriesReducers;
