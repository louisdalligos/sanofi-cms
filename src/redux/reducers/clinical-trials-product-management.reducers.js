import {
  CLINICAL_TRIALS_ARTICLES_FETCH,
  CLINICAL_TRIALS_ARTICLES_SET,
  CLINICAL_TRIALS_DND_SET,
  CLINICAL_TRIALS_LOADERS
} from "../actions/product-management-actions/clinical-trials-productmanagement.types";

let initialState = {
  articles: [],
  selectedArticle: "",
  dndList: [],
  selected: [],
  loader: false
};

const clinicalTrialsProductManagementReducers = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CLINICAL_TRIALS_ARTICLES_FETCH:
      return {
        ...state,
        loader: false,
        articles: action.payload.withinSelectTag || []
      };

    case CLINICAL_TRIALS_LOADERS:
      return {
        ...state,
        loader: !state.loader
      };

    case CLINICAL_TRIALS_DND_SET:
      return {
        ...state,
        dndList: action.payload.dndList
      };

    case CLINICAL_TRIALS_ARTICLES_SET:
      // alert(action.payload.selectedArticle);

      return {
        ...state,
        selectedArticle: action.payload.selectedArticle
      };

    default:
      return state;
  }
};

export default clinicalTrialsProductManagementReducers;
