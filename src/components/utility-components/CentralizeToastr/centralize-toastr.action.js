import { CENTRALIZE_TOASTR_DEFAULT } from "./centralize-toastr.types";

export function centralizeToastClear() {
    return dispatch => {
        dispatch({
            type: CENTRALIZE_TOASTR_DEFAULT
        });
    };
}
