import PrescriptionInfoServices from "./prescription-info.services";
import { PRESCRIPTION_INFO_GET_FILES } from "./prescription-info.types";
import {
    CENTRALIZE_TOASTR_SET,
    CENTRALIZE_TOASTR_DEFAULT
} from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";

// TODO: These are common to other tabs
export function fetchPrescriptionInfo(id) {
    return async dispatch => {
        try {
            const res = await PrescriptionInfoServices.fetchPrescriptionInfo(
                id
            );

            dispatch({
                type: PRESCRIPTION_INFO_GET_FILES,
                payload: res
            });
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
        }
    };
}

export function savePrescriptionInfo(id, payload) {
    return async dispatch => {
        try {
            const res = await PrescriptionInfoServices.savePrescriptionInfo(
                id,
                payload
            );

            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            //
            this.fetchPrescriptionInfo(id);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
        }
    };
}

export function deleletPrescriptionInfo(productId, prescriptionId) {
    return async dispatch => {
        try {
            const res = await PrescriptionInfoServices.deleletPrescriptionInfo(
                prescriptionId
            );

            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            //
            this.fetchPrescriptionInfo(productId);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
        }
    };
}

export function saveEditedDocumentInPrescriptionInfo(
    productId,
    prescriptionId,
    filename
) {
    return async dispatch => {
        try {
            const res = await PrescriptionInfoServices.saveEditedDocumentInPrescriptionInfo(
                prescriptionId,
                filename
            );

            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: res
            });
            //
            this.fetchPrescriptionInfo(productId);
            //
        } catch (error) {
            dispatch({
                type: CENTRALIZE_TOASTR_SET,
                payload: error
            });
        }
    };
}
