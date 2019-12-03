import { PRESCRIPTION_INFO_GET_FILES } from "../actions/product-management-actions/prescription-info.types";

let initialState = {
    files: []
};

const prescriptionInfoProductManagementReducers = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PRESCRIPTION_INFO_GET_FILES:
            const { prescription_info } = action.payload.data;

            if (prescription_info)
                prescription_info.sort((a, b) => b.id - a.id);

            return {
                ...state,
                files: prescription_info || []
            };
        default:
            return state;
    }
};

export default prescriptionInfoProductManagementReducers;
