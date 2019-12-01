import {
  CENTRALIZE_TOASTR_DEFAULT,
  CENTRALIZE_TOASTR_GET,
  CENTRALIZE_TOASTR_SET
} from "./centralize-toastr.types";

let initialState = {
  toastr: null
};

const centralizeToastrReducers = (state = initialState, action) => {
  switch (action.type) {
    case CENTRALIZE_TOASTR_DEFAULT:
      return {
        ...state,
        toastr: null
      };

    case CENTRALIZE_TOASTR_GET:
      return {
        ...state
      };

    case CENTRALIZE_TOASTR_SET:
      const { success, error } =
        action.payload.data || action.payload.response.data;
      const isSuccess = (success && success.length) || false;

      return {
        ...state,
        toastr: {
          type: isSuccess ? "success" : "error",
          message: isSuccess ? success : error
        }
      };

    default:
      return state;
  }
};

export default centralizeToastrReducers;
