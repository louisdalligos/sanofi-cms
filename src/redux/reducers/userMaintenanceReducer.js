import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    FORGOT_PASSWORD_EMAIL_REQUEST,
    FORGOT_PASSWORD_EMAIL_SUCCESS,
    FORGOT_PASSWORD_EMAIL_FAILED,
    GET_RESET_PASSWORD_TOKEN_PARAMS,
    VERIFY_RESET_PASSWORD_TOKEN_REQUEST,
    VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
    VERIFY_RESET_PASSWORD_TOKEN_FAILED,
    RESEND_PASSWORD_RESET_EMAIL_LINK_REQUEST,
    RESEND_PASSWORD_RESET_EMAIL_LINK_SUCCESS,
    RESEND_PASSWORD_RESET_EMAIL_LINK_FAILED,
    PASSWORD_NOTIFICATION_REQUEST,
    PASSWORD_NOTIFICATION_SUCCESS
} from "../actions/user-maintenance-actions/types";

const initialState = {
    requestInProgress: null,
    currentUser: null,
    password_reset_token: null,
    isResetPasswordTokenVerified: true,
    loading: true,
    passwordNotification: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_NOTIFICATION_SUCCESS:
            return {
                ...state,
                passwordNotification: action.payload
            };
        case FETCH_CURRENT_USER_REQUEST:
        case PASSWORD_NOTIFICATION_REQUEST:
            return {
                ...state
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
        case UPDATE_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_EMAIL_REQUEST:
            return {
                ...state,
                requestInProgress: true
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PROFILE_FAILED:
        case CHANGE_PASSWORD_SUCCESS:
        case CHANGE_PASSWORD_FAILED:
        case FORGOT_PASSWORD_EMAIL_SUCCESS:
        case FORGOT_PASSWORD_EMAIL_FAILED:
            return {
                ...state,
                requestInProgress: false
            };
        case GET_RESET_PASSWORD_TOKEN_PARAMS:
            return {
                ...state,
                loading: true,
                password_reset_token: action.payload
            };
        case VERIFY_RESET_PASSWORD_TOKEN_REQUEST:
            return {
                ...state
            };
        case VERIFY_RESET_PASSWORD_TOKEN_SUCCESS:
            return {
                ...state,
                isResetPasswordTokenVerified: true,
                loading: false
            };
        case VERIFY_RESET_PASSWORD_TOKEN_FAILED:
            return {
                ...state,
                isResetPasswordTokenVerified: false,
                loading: false
            };
        // case RESEND_EMAIL_LINK_REQUEST:
        //     return {
        //         ...state,
        //         requestInProgress: true
        //     };
        // case RESEND_EMAIL_LINK_SUCCESS:
        // case RESEND_EMAIL_LINK_FAILED:
        //     return {
        //         ...state,
        //         requestInProgress: false
        //     };
        default:
            return state;
    }
};
