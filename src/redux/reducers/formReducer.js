import { SET_FORM_DIRTY } from "../actions/form-actions/types";

const initialState = {
  isFormDirty: null
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DIRTY:
      return {
        ...state,
        isFormDirty: action.payload
      };

    default:
      return state;
  }
};

export default formReducer;
