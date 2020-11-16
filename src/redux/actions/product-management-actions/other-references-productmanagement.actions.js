import {
    PRODUCT_OTHER_REFERENCES_SELECT_TYPE,
    PRODUCT_OTHER_REFERENCES_GET_FILES,
    PRODUCT_OTHER_REFERENCES_LOADER,
    PRODUCT_OTHER_REFERENCES_MESSAGE
} from "./other-references-productmanagement.types";
import OtherReferencesProductManagementService from "./other-references-productmanagement.service";
import {
    CENTRALIZE_TOASTR_DEFAULT,
    CENTRALIZE_TOASTR_SET,
    CENTRALIZE_TOASTR_GET
} from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";

export function selectType(type) {
    return dispatch => {
        dispatch({
            type: PRODUCT_OTHER_REFERENCES_SELECT_TYPE,
            payload: {
                type
            }
        });
    };
}

export function saveOtherReferences(id, payload) {
    return async dispatch => {
        try {
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: {
                    loader: true
                }
            });

            const res = await OtherReferencesProductManagementService.saveOtherReferences(
                id,
                payload
            );
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // FETCH
            this.fetchOtherReferences(id);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: { loader: false }
            });
        }
    };
}

export function saveFilePostOtherReferences(id, payload) {
    return async dispatch => {
        try {
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: { loader: true }
            });

            const res = await OtherReferencesProductManagementService.saveFilePostOtherReferences(
                id,
                payload
            );
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            // FETCH
            this.fetchOtherReferences(id);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: { loader: false }
            });
        }
    };
}
// TODO: These are common to other tabs
export function fetchOtherReferences(id) {
    return async dispatch => {
        try {
            const res = await OtherReferencesProductManagementService.fetchOtherReferences(
                id
            );
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_GET_FILES,
                payload: res
            });
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: { loader: false }
            });
        }
    };
}

export function deleteOtherReferences(id, editId) {
    return async dispatch => {
        dispatch({
            type: PRODUCT_OTHER_REFERENCES_LOADER,
            payload: {
                loader: true
            }
        });
        try {
            const res = await OtherReferencesProductManagementService.deleteOtherReferences(
                id
            );
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            this.fetchOtherReferences(editId);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
            dispatch({
                type: PRODUCT_OTHER_REFERENCES_LOADER,
                payload: { loader: false }
            });
        }
    };
}
