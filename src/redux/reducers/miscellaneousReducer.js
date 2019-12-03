import {
    CREATE_MISC_CONTENT,
    UPDATE_MISC_CONTENT,
    LOADING_MISC_CONTENT,
    FETCH_ALL_MISC_CONTENT,
    ERROR_CREATE_MISC_CONTENT,
    ERROR_UPDATE_MISC_CONTENT,
    ERROR_CLEAR_PLACEHOLDER,
    ERROR_FETCH_MISC_CONTENT,
    SPECIAL_CASE_MESSAGE
} from "../actions/miscellaneous-actions/actionTypes";

let initialState = {
    isLoading: false,
    errorMessage: "",
    // as per backend convention
    legal_disclaimer: "",
    privacy_policy: "",
    contact_us_url: "",
    zinc_code: "" // "DSAD.SAD.32.13.13,Version 3.2,31 Sda 3333",
};

const miscellaneousReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_MISC_CONTENT:
            const { payload } = action;
            payload.data.length &&
                payload.data.map((miscellaneous, idx) => {
                    // OR state[miscellaneous.type] = miscellaneous.content;
                    state = Object.assign(
                        { ...state },
                        { [miscellaneous.type]: miscellaneous.content }
                    );
                });

            return {
                ...state,
                isLoading: false
            };

        case UPDATE_MISC_CONTENT:
        case CREATE_MISC_CONTENT:
            const { type, content } = action.payload.data;

            return {
                ...state,
                [type]: content,
                isLoading: false
            };

        case SPECIAL_CASE_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message
            };

        case LOADING_MISC_CONTENT:
            return {
                ...state,
                isLoading: true
            };

        case ERROR_CLEAR_PLACEHOLDER:
            return {
                ...state,
                errorMessage: ""
            };

        case ERROR_CREATE_MISC_CONTENT:
        case ERROR_UPDATE_MISC_CONTENT:
        case ERROR_FETCH_MISC_CONTENT:
            return {
                ...state,
                errorMessage: action.payload.message,
                isLoading: false
            };
        default:
            return state;
    }
};

export default miscellaneousReducer;
