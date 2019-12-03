import UserMaintenanceServices from "./service";
import { API } from "../../../utils/api";
import { returnNotifications } from "../notification-actions/notificationActions";
import axios from "axios";

import {
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    FORGOT_PASSWORD_EMAIL_REQUEST,
    FORGOT_PASSWORD_EMAIL_SUCCESS,
    FORGOT_PASSWORD_EMAIL_FAILED,
    GET_RESET_PASSWORD_TOKEN_PARAMS,
    VERIFY_RESET_PASSWORD_TOKEN_REQUEST,
    VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
    VERIFY_RESET_PASSWORD_TOKEN_FAILED,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    RESEND_PASSWORD_RESET_EMAIL_LINK_REQUEST,
    RESEND_PASSWORD_RESET_EMAIL_LINK_SUCCESS,
    RESEND_PASSWORD_RESET_EMAIL_LINK_FAILED,
    PASSWORD_NOTIFICATION_REQUEST,
    PASSWORD_NOTIFICATION_SUCCESS
} from "./types";

// Fetch current user
export function fetchCurrentUser() {
    return async dispatch => {
        dispatch({ type: FETCH_CURRENT_USER_REQUEST });
        try {
            const response = await UserMaintenanceServices.fetchCurrentUserRequest();
            dispatch({
                type: FETCH_CURRENT_USER_SUCCESS,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

// Update profile information
export function updateProfileInfo(body) {
    return async dispatch => {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        try {
            // PUT request
            const response = await UserMaintenanceServices.updateProfileRequest(
                body
            );

            console.log(response);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS
            });
            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.status,
                    "UPDATE_PROFILE_SUCCESS"
                )
            );
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "UPDATE_PROFILE_FAILED"
                )
            );
            dispatch({ type: UPDATE_PROFILE_FAILED });
        }
    };
}

// Change password
export function changePassword(body) {
    return async dispatch => {
        dispatch({ type: CHANGE_PASSWORD_REQUEST });
        try {
            // POST request
            const response = await UserMaintenanceServices.changePasswordRequest(
                body
            );

            console.log(response, "change password");
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS
            });
            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.status,
                    "CHANGE_PASSWORD_SUCCESS"
                )
            );
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "CHANGE_PASSWORD_FAILED"
                )
            );
            dispatch({ type: CHANGE_PASSWORD_FAILED });
        }
    };
}

// Forgot password request
export function forgotPasswordEmail(body) {
    return async dispatch => {
        dispatch({ type: FORGOT_PASSWORD_EMAIL_REQUEST });
        try {
            // POST request
            const response = await UserMaintenanceServices.forgotPasswordEmailRequest(
                body
            );
            dispatch({
                type: FORGOT_PASSWORD_EMAIL_SUCCESS
            });
            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.status,
                    "FORGOT_PASSWORD_EMAIL_SUCCESS"
                )
            );
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FORGOT_PASSWORD_EMAIL_FAILED"
                )
            );
            dispatch({ type: FORGOT_PASSWORD_EMAIL_FAILED });
        }
    };
}

// Get password reset token from params
export function getResetPasswordTokenFromParams(token) {
    return dispatch => {
        sessionStorage.setItem("password_reset_token", token);
        dispatch({
            type: GET_RESET_PASSWORD_TOKEN_PARAMS,
            payload: token
        });
    };
}

// Verify password reset token
export function verifyPasswordResetToken(token) {
    return async dispatch => {
        await dispatch({
            type: VERIFY_RESET_PASSWORD_TOKEN_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "password-reset-token": token
            }
        };

        try {
            await axios.get(`${API}/check-password-reset-token`, config);

            dispatch({
                type: VERIFY_RESET_PASSWORD_TOKEN_SUCCESS
            });
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "VERIFY_RESET_PASSWORD_TOKEN_FAILED"
                )
            );
            dispatch({ type: VERIFY_RESET_PASSWORD_TOKEN_FAILED });
        }
    };
}

// Update password action from verified registration email
export function passwordReset(values, token) {
    return async dispatch => {
        dispatch({ type: PASSWORD_RESET_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "password-reset-token": token
            }
        };

        try {
            const response = await axios.post(
                `${API}/reset-password`,
                values,
                config
            );

            dispatch({
                type: PASSWORD_RESET_SUCCESS
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.status,
                    "PASSWORD_RESET_SUCCESS"
                )
            );
        } catch (err) {
            dispatch(
                returnNotifications(
                    "There was an error in processing your request",
                    "error",
                    err.response.status,
                    "PASSWORD_RESET_FAILED"
                )
            );
            dispatch({ type: PASSWORD_RESET_FAILED });
        }
    };
}

// Resend email if password_reset_token is expired/invalid
export function resendPasswordResetLink(token) {
    return async dispatch => {
        await dispatch({
            type: RESEND_PASSWORD_RESET_EMAIL_LINK_REQUEST
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "password-reset-token": token
            }
        };
        try {
            const res = await axios.post(
                `${API}/resend-password-reset-link`,
                null,
                config
            );
            dispatch(
                returnNotifications(
                    res.data,
                    "success",
                    res.status,
                    "RESEND_PASSWORD_RESET_EMAIL_LINK_SUCCESS"
                )
            );
            dispatch({
                type: RESEND_PASSWORD_RESET_EMAIL_LINK_SUCCESS
            });
        } catch (err) {
            dispatch(
                returnNotifications(
                    "There was an error in processing your request",
                    "error",
                    err.response.status,
                    "RESEND_PASSWORD_RESET_EMAIL_LINK_FAILED"
                )
            );
            dispatch({ type: RESEND_PASSWORD_RESET_EMAIL_LINK_FAILED });
        }
    };
}

// Fetch current user
export function passwordNotification() {
    return async dispatch => {
        dispatch({ type: PASSWORD_NOTIFICATION_REQUEST });

        try {
            const response = await UserMaintenanceServices.passwordNotificationRequest();

            dispatch({
                type: PASSWORD_NOTIFICATION_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.status,
                    "PASSWORD_NOTIFICATION_SUCCESS"
                )
            );
        } catch (err) {
            console.log(err);
        }
    };
}
