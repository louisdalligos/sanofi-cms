import {
  CENTRALIZE_TOASTR_SET,
  CENTRALIZE_TOASTR_DEFAULT
} from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";
import SubCategoriesServices from "./subcategories.service";

import {
  FETCH_ALL_SUBCATEGORIES,
  SUBCATEGORIES_LOADERS
} from "./subcategories.types";

export function saveEditedSubCategory(payload) {
  return async dispatch => {
    dispatch({
      type: SUBCATEGORIES_LOADERS
    });
    try {
      const res = await SubCategoriesServices.saveEditedSubCategory(payload);
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
      // TODO: Fetch But get errors,
      const requestGet = await SubCategoriesServices.getNewSubCategories();
      dispatch({
        type: FETCH_ALL_SUBCATEGORIES,
        payload: requestGet
      });
      // dispatch({
      //     type: SUBCATEGORIES_LOADERS
      // });
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
      dispatch({
        type: SUBCATEGORIES_LOADERS
      });
    }
  };
}
export function getNewSubCategories() {
  return async dispatch => {
    try {
      const res = await SubCategoriesServices.getNewSubCategories();
      dispatch({
        type: FETCH_ALL_SUBCATEGORIES,
        payload: res
      });
      // TODO: Fetch But get errors,
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
      dispatch({
        type: SUBCATEGORIES_LOADERS
      });
    }
  };
}

export function deleteSubCategory(id) {
  return async dispatch => {
    dispatch({
      type: SUBCATEGORIES_LOADERS
    });
    try {
      const res = await SubCategoriesServices.deleteSubCategory(id);
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
      // TODO: Fetch But get errors,
      const requestGet = await SubCategoriesServices.getNewSubCategories();
      dispatch({
        type: FETCH_ALL_SUBCATEGORIES,
        payload: requestGet
      });
      // dispatch({
      //     type: SUBCATEGORIES_LOADERS
      // });
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
      dispatch({
        type: SUBCATEGORIES_LOADERS
      });
    }
  };
}

export function saveSortedSubCategories(payload) {
  return async dispatch => {
    dispatch({
      type: SUBCATEGORIES_LOADERS
    });
    try {
      const res = await SubCategoriesServices.saveSortedSubCategories(payload);
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
      // TODO: Fetch But get errors,
      const requestGet = await SubCategoriesServices.getNewSubCategories();
      dispatch({
        type: FETCH_ALL_SUBCATEGORIES,
        payload: requestGet
      });
      // dispatch({
      //     type: SUBCATEGORIES_LOADERS
      // });
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
      dispatch({
        type: SUBCATEGORIES_LOADERS
      });
    }
  };
}

export function saveNewSubCategory(payload) {
  return async dispatch => {
    dispatch({
      type: SUBCATEGORIES_LOADERS
    });
    try {
      const res = await SubCategoriesServices.saveNewSubCategory(payload);
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
      // TODO: Fetch But get errors,
      const requestGet = await SubCategoriesServices.getNewSubCategories();
      dispatch({
        type: FETCH_ALL_SUBCATEGORIES,
        payload: requestGet
      });
      // dispatch({
      //     type: SUBCATEGORIES_LOADERS
      // });
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
      dispatch({
        type: SUBCATEGORIES_LOADERS
      });
    }
  };
}
