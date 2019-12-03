import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    ARCHIVE_PRODUCT_REQUEST,
    ARCHIVE_PRODUCT_SUCCESS,
    ARCHIVE_PRODUCT_FAILED,
    FETCH_CURRENT_PRODUCT_REQUEST,
    FETCH_CURRENT_PRODUCT_SUCCESS,
    FETCH_CURRENT_PRODUCT_FAILED,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_REQUEST,
    FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_SUCCESS,
    FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED,
    CHANGE_PRODUCT_STATUS_REQUEST,
    CHANGE_PRODUCT_STATUS_SUCCESS,
    CHANGE_PRODUCT_STATUS_FAILED
} from "./types";

import ProductManagementServices from "./service";

import { returnNotifications } from "../notification-actions/notificationActions";

// Create product
export function createProduct(values) {
    return async dispatch => {
        await dispatch({
            type: CREATE_PRODUCT_REQUEST
        });

        try {
            const res = await ProductManagementServices.createProductRequest(
                values
            ); // POST request
            console.log(res);
            await dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: res.data
            });

            dispatch(
                returnNotifications(
                    res.data,
                    "success",
                    res.status,
                    "CREATE_PRODUCT_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: CREATE_PRODUCT_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data.errors
                        ? err.response.data.errors
                        : err.response.data.error,
                    "error",
                    err.status,
                    "CREATE_PRODUCT_FAILED"
                )
            );
        }
    };
}

// Update product
export function updateProduct(id, values) {
    return async dispatch => {
        await dispatch({
            type: UPDATE_PRODUCT_REQUEST
        });

        try {
            const res = await ProductManagementServices.updateProductRequest(
                id,
                values
            ); // PUT request

            await dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: res.data
            });

            dispatch(
                returnNotifications(
                    res.data,
                    "success",
                    res.status,
                    "UPDATE_PRODUCT_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: UPDATE_PRODUCT_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data.error,
                    "success",
                    err.status,
                    "UPDATE_PRODUCT_FAILED"
                )
            );
        }
    };
}

// Archive product
export function archiveProduct(id) {
    return async dispatch => {
        await dispatch({
            type: ARCHIVE_PRODUCT_REQUEST
        });

        const values = {
            status: "archived"
        };

        try {
            const res = await ProductManagementServices.archiveProductRequest(
                id,
                values
            ); // PUT request

            await dispatch({
                type: ARCHIVE_PRODUCT_SUCCESS
            });

            dispatch(
                returnNotifications(
                    res.data,
                    "success",
                    res.status,
                    "ARCHIVE_PRODUCT_SUCCESS"
                )
            );
        } catch (err) {
            dispatch({
                type: ARCHIVE_PRODUCT_FAILED
            });
            dispatch(
                returnNotifications(
                    err.response.data,
                    "success",
                    err.response.status,
                    "ARCHIVE_PRODUCT_FAILED"
                )
            );
        }
    };
}

// Fetch current product
export function fetchCurrentProduct(id) {
    return async dispatch => {
        await dispatch({
            type: FETCH_CURRENT_PRODUCT_REQUEST
        });
        try {
            const response = await ProductManagementServices.fetchCurrentProductRequest(
                id
            ); // GET request

            await dispatch({
                type: FETCH_CURRENT_PRODUCT_SUCCESS,
                payload: response.data
            });
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_CURRENT_PRODUCT_FAILED"
                )
            );
            dispatch({
                type: FETCH_CURRENT_PRODUCT_FAILED
            });
        }
    };
}

// Change product status
export function changeProductStatus(id, values) {
    return async dispatch => {
        await dispatch({
            type: CHANGE_PRODUCT_STATUS_REQUEST
        });

        try {
            const res = await ProductManagementServices.changeProductStatusRequest(
                id,
                values
            ); // PUT request

            await dispatch({
                type: CHANGE_PRODUCT_STATUS_SUCCESS,
                payload: res.data
            });

            dispatch(
                returnNotifications(
                    res.data,
                    "success",
                    res.status,
                    "CHANGE_PRODUCT_STATUS_SUCCESS"
                )
            );
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "CHANGE_PRODUCT_STATUS_FAILED"
                )
            );
            dispatch({
                type: CHANGE_PRODUCT_STATUS_FAILED
            });
        }
    };
}

// Fetch current product category id article list
export function fetchCurrentProductArticlesByCategoryId(id) {
    return async dispatch => {
        await dispatch({
            type: FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_REQUEST
        });
        try {
            const response = await ProductManagementServices.fetchCurrentProductArticlesByCategoryIdRequest(
                id
            ); // GET request

            await dispatch({
                type: FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_SUCCESS,
                payload: response.data
            });
        } catch (err) {
            dispatch(
                returnNotifications(
                    err.response.data,
                    "error",
                    err.response.status,
                    "FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED"
                )
            );
            dispatch({
                type: FETCH_CURRENT_PRODUCT_ARTICLES_BY_CATEGORY_FAILED
            });
        }
    };
}
