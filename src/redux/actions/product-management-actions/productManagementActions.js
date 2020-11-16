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
  CHANGE_PRODUCT_STATUS_FAILED,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILED,
  SET_STATUS_CHANGE_FORM_DISABLE
} from "./types";

import ProductManagementServices from "./service";
import { returnNotifications } from "../notification-actions/notificationActions";
import { CENTRALIZE_TOASTR_SET } from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";

import {
  filterTableWithParams,
  setPageNumber
} from "../table-actions/tableActions";

// Create product
export function createProduct(values, historyRef) {
  return async dispatch => {
    await dispatch({
      type: CREATE_PRODUCT_REQUEST
    });

    try {
      const res = await ProductManagementServices.createProductRequest(values); // POST request
      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });

      historyRef.push("/products");
    } catch (exception) {
      /* |----------------------------
               | 401 = Token expired
               | 429 = Too Many Attempts
               |---------------------------- */
      const { status, errors, error } = exception.response.data;
      if (status !== 401 && status !== 429) {
        errors &&
          errors.map((err, idx, arr) => {
            dispatch({
              type: CENTRALIZE_TOASTR_SET,
              payload: {
                data: { error: err }
              }
            });
          });

        error &&
          dispatch({
            type: CENTRALIZE_TOASTR_SET,
            payload: {
              data: { error }
            }
          });
      }

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
    }
  };
}

// Update product
export function updateProduct(id, historyRef, values) {
  return async dispatch => {
    await dispatch({
      type: UPDATE_PRODUCT_REQUEST
    });

    try {
      const res = await ProductManagementServices.updateProductRequest(
        id,
        values
      ); // PUT request

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });

      historyRef.push("/products");

      // console.log("[WARNING]", res);

      // await dispatch({
      //     type: UPDATE_PRODUCT_SUCCESS,
      //     payload: res.data
      // });

      // dispatch(
      //     returnNotifications(
      //         res.data,
      //         "success",
      //         res.status,
      //         "UPDATE_PRODUCT_SUCCESS"
      //     )
      // );

      // dispatch({
      //     type: "SERVER_SIDE_LOADER",
      //     payload: {
      //         loader: false
      //     }
      // });
    } catch (exception) {
      /* |----------------------------
               | 401 = Token expired
               | 429 = Too Many Attempts
               |---------------------------- */
      const { status, errors, error } = exception.response.data;
      if (status !== 401 && status !== 429) {
        errors &&
          errors.map((err, idx, arr) => {
            dispatch({
              type: CENTRALIZE_TOASTR_SET,
              payload: {
                data: { error: err }
              }
            });
          });

        error &&
          dispatch({
            type: CENTRALIZE_TOASTR_SET,
            payload: {
              data: { error }
            }
          });
      }

      // dispatch({
      //     type: UPDATE_PRODUCT_FAILED
      // });
      // dispatch(
      //     returnNotifications(
      //         err.response.data.error,
      //         "success",
      //         err.status,
      //         "UPDATE_PRODUCT_FAILED"
      //     )
      // );

      // dispatch({
      //     type: "SERVER_SIDE_LOADER",
      //     payload: {
      //         loader: false
      //     }
      // });

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
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

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
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

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
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

      dispatch(filterTableWithParams(null, "/products")); // reload updated data
      dispatch(setPageNumber(1)); // set to default page number

      // return message toastr
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: CHANGE_PRODUCT_STATUS_FAILED
      });

      // return message toastr
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: err
      });
    }
  };
}

export function setStatusChangeFormDisable(value) {
  return async dispatch => {
    await dispatch({
      type: SET_STATUS_CHANGE_FORM_DISABLE,
      payload: value
    });
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

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
    }
  };
}

// Set product to new
export function newProduct(id, values) {
  return async dispatch => {
    await dispatch({
      type: NEW_PRODUCT_REQUEST
    });

    try {
      const res = await ProductManagementServices.newProductRequest(id, values); // POST request
      await dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: res.data
      });

      dispatch(filterTableWithParams(null, "/products")); // reload updated data
      dispatch(setPageNumber(1)); // set to default page number

      // return message toastr
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: NEW_PRODUCT_FAILED
      });
      // return message toastr
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: err
      });
    }
  };
}

// TODO: Refactor
export function addProductImages(payload) {
  return dispatch => {
    dispatch({
      type: "ADD_PRODUCT_IMAGES",
      payload
    });
  };
}
export function removeProductImageById(uid) {
  return async dispatch => {
    try {
      // this.setServerSideLoader(true);

      const res = await ProductManagementServices.removeProductImageById(uid);
      console.log(res);

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: "SERVER_SIDE_LOADER",
        payload: {
          loader: false
        }
      });
    }
  };
}

export function setServerSideLoader(bool) {
  return dispatch => {
    dispatch({
      type: "SERVER_SIDE_LOADER",
      payload: {
        loader: bool
      }
    });
  };
}
