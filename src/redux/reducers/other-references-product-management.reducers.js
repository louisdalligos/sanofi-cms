import {
    PRODUCT_OTHER_REFERENCES_SELECT_TYPE,
    PRODUCT_OTHER_REFERENCES_SET_FILES,
    PRODUCT_OTHER_REFERENCES_GET_FILES,
    PRODUCT_OTHER_REFERENCES_LOADER,
    PRODUCT_OTHER_REFERENCES_MESSAGE
} from "../actions/product-management-actions/other-references-productmanagement.types";

let initialState = {
    type: "video",
    files: [],
    loader: false,
    // frontend
    toastr: null
};

const otherReferencesProductManagementReducers = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PRODUCT_OTHER_REFERENCES_SELECT_TYPE:
            return {
                ...state,
                type: action.payload.type,
                toastr: null
            };

        case PRODUCT_OTHER_REFERENCES_GET_FILES:
            const { other_resources } = action.payload.data;

            if (other_resources) other_resources.sort((a, b) => b.id - a.id);

            return {
                ...state,
                files: other_resources || [],
                loader: false,
                toastr: null
            };

        case PRODUCT_OTHER_REFERENCES_LOADER:
            const loader = action.payload.loader;
            return {
                ...state,
                loader: loader
            };

        case PRODUCT_OTHER_REFERENCES_MESSAGE:
            const { success, error } = action.payload.data;
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

export default otherReferencesProductManagementReducers;
