import {
    FETCH_MONTHLY_USERS_COUNT_REQUEST,
    FETCH_MONTHLY_USERS_COUNT_SUCCESS,
    FETCH_MONTHLY_USERS_COUNT_FAILED,
    FETCH_TOTAL_ACTIVE_DOCTORS_REQUEST,
    FETCH_TOTAL_ACTIVE_DOCTORS_SUCCESS,
    FETCH_TOTAL_ACTIVE_DOCTORS_FAILED,
    FETCH_TOTAL_BLOCKED_DOCTORS_REQUEST,
    FETCH_TOTAL_BLOCKED_DOCTORS_SUCCESS,
    FETCH_TOTAL_BLOCKED_DOCTORS_FAILED,
    FETCH_TOTAL_ACTIVE_ADMINS_REQUEST,
    FETCH_TOTAL_ACTIVE_ADMINS_SUCCESS,
    FETCH_TOTAL_ACTIVE_ADMINS_FAILED,
    FETCH_TOTAL_BLOCKED_ADMINS_REQUEST,
    FETCH_TOTAL_BLOCKED_ADMINS_SUCCESS,
    FETCH_TOTAL_BLOCKED_ADMINS_FAILED,
    FETCH_TOTAL_CATEGORIES_REQUEST,
    FETCH_TOTAL_CATEGORIES_SUCCESS,
    FETCH_TOTAL_CATEGORIES_FAILED,
    FETCH_TOTAL_SUBCATEGORIES_REQUEST,
    FETCH_TOTAL_SUBCATEGORIES_SUCCESS,
    FETCH_TOTAL_SUBCATEGORIES_FAILED,
    FETCH_TOTAL_ARTICLES_REQUEST,
    FETCH_TOTAL_ARTICLES_SUCCESS,
    FETCH_TOTAL_ARTICLES_FAILED,
    FETCH_TOTAL_PRODUCTS_REQUEST,
    FETCH_TOTAL_PRODUCTS_SUCCESS,
    FETCH_TOTAL_PRODUCTS_FAILED,
    FETCH_TOTAL_EVENTS_REQUEST,
    FETCH_TOTAL_EVENTS_SUCCESS,
    FETCH_TOTAL_EVENTS_FAILED
} from "./types";

import DashboardServices from "./service";

import { returnNotifications } from "../notification-actions/notificationActions";

// Fetch total monthly registered doctors
export function fetchTotalMonthlyNewDoctors() {
    return async dispatch => {
        await dispatch({
            type: FETCH_MONTHLY_USERS_COUNT_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalMonthlyNewDoctorsRequest(); // GET request

            await dispatch({
                type: FETCH_MONTHLY_USERS_COUNT_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_MONTHLY_USERS_COUNT_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_MONTHLY_USERS_COUNT_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_MONTHLY_NEW_REGISTERED_DOCTORS_FAILED"
                )
            );
        }
    };
}

// Fetch total active doctors
export function fetchTotalActiveDoctors() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_ACTIVE_DOCTORS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalActiveDoctorsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_ACTIVE_DOCTORS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_ACTIVE_DOCTORS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_ACTIVE_DOCTORS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_ACTIVE_DOCTORS_FAILED"
                )
            );
        }
    };
}

// Fetch total blocked doctors
export function fetchTotalBlockedDoctors() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_BLOCKED_DOCTORS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalBlockedDoctorsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_BLOCKED_DOCTORS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_BLOCKED_DOCTORS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_BLOCKED_DOCTORS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_BLOCKED_DOCTORS_FAILED"
                )
            );
        }
    };
}

// Fetch total active admins
export function fetchTotalActiveAdmins() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_ACTIVE_ADMINS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalActiveAdminsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_ACTIVE_ADMINS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_ACTIVE_ADMINS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_ACTIVE_ADMINS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_ACTIVE_ADMINS_FAILED"
                )
            );
        }
    };
}

// Fetch total blocked admins
export function fetchTotalBlockedAdmins() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_BLOCKED_ADMINS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalBlockedAdminsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_BLOCKED_ADMINS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_BLOCKED_ADMINS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_BLOCKED_ADMINS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_BLOCKED_ADMINS_FAILED"
                )
            );
        }
    };
}

// Fetch total categories
export function fetchTotalCategories() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_CATEGORIES_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalCategoriesRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_CATEGORIES_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_CATEGORIES_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_CATEGORIES_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_CATEGORIES_FAILED"
                )
            );
        }
    };
}

// Fetch total subcategories
export function fetchTotalSubCategories() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_SUBCATEGORIES_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalSubCategoriesRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_SUBCATEGORIES_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_SUBCATEGORIES_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_SUBCATEGORIES_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_SUBCATEGORIES_FAILED"
                )
            );
        }
    };
}

// Fetch total articles therapy
export function fetchTotalTherapyArticles() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_ARTICLES_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalTherapyArticlesRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_ARTICLES_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_ARTICLES_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_ARTICLES_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_ARTICLES_FAILED"
                )
            );
        }
    };
}

// Fetch total products
export function fetchTotalProducts() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_PRODUCTS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalProductsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_PRODUCTS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_PRODUCTS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_PRODUCTS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_PRODUCTS_FAILED"
                )
            );
        }
    };
}

// Fetch total events
export function fetchTotalEvents() {
    return async dispatch => {
        await dispatch({
            type: FETCH_TOTAL_EVENTS_REQUEST
        });
        try {
            const response = await DashboardServices.fetchTotalEventsRequest(); // GET request

            await dispatch({
                type: FETCH_TOTAL_EVENTS_SUCCESS,
                payload: response.data
            });

            dispatch(
                returnNotifications(
                    response.data,
                    "success",
                    response.data.status,
                    "FETCH_TOTAL_EVENTS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: FETCH_TOTAL_EVENTS_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_TOTAL_EVENTS_FAILED"
                )
            );
        }
    };
}
