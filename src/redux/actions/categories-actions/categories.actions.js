import {
    CENTRALIZE_TOASTR_SET,
    CENTRALIZE_TOASTR_DEFAULT
} from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";
import CategoriesServices from "./categories.service";
import { FETCH_ALL_CATEGORIES, CATEGORIES_LOADERS } from "./categories.types";

export function saveEditedCategory(payload) {
    return async dispatch => {
        dispatch({
            type: CATEGORIES_LOADERS
        });
        try {
            const res = await CategoriesServices.saveEditedCategory(payload);
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // TODO: Fetch But get errors,
            const requestGet = await CategoriesServices.getNewCategories();
            dispatch({
                type: FETCH_ALL_CATEGORIES,
                payload: requestGet
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
        }
    };
}
export function getNewCategories() {
    return async dispatch => {
        try {
            const res = await CategoriesServices.getNewCategories();
            dispatch({
                type: FETCH_ALL_CATEGORIES,
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
                type: CATEGORIES_LOADERS
            });
        }
    };
}

export function deleteCategory(id) {
    return async dispatch => {
        dispatch({
            type: CATEGORIES_LOADERS
        });
        try {
            const res = await CategoriesServices.deleteCategory(id);
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // TODO: Fetch But get errors,
            const requestGet = await CategoriesServices.getNewCategories();
            dispatch({
                type: FETCH_ALL_CATEGORIES,
                payload: requestGet
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
        }
    };
}

export function saveSortedCategories(payload) {
    return async dispatch => {
        dispatch({
            type: CATEGORIES_LOADERS
        });
        try {
            const res = await CategoriesServices.saveSortedCategories(payload);
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // TODO: Fetch But get errors,
            const requestGet = await CategoriesServices.getNewCategories();
            dispatch({
                type: FETCH_ALL_CATEGORIES,
                payload: requestGet
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
        }
    };
}

export function saveNewCategory(payload) {
    return async dispatch => {
        dispatch({
            type: CATEGORIES_LOADERS
        });
        try {
            const res = await CategoriesServices.saveNewCategory(payload);
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // TODO: Fetch But get errors,
            const requestGet = await CategoriesServices.getNewCategories();
            dispatch({
                type: FETCH_ALL_CATEGORIES,
                payload: requestGet
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: CATEGORIES_LOADERS
            });
        }
    };
}
