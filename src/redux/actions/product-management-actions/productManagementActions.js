import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED
} from "./types";

import ProductManagementServices from "./service";

import { returnNotifications } from "../notification-actions/notificationActions";

// Fetch categories
// export function fetchCategories() {
//     return async dispatch => {
//         await dispatch({
//             type: FETCH_CATEGORIES_REQUEST
//         });

//         try {
//             const res = await ProductManagementServices.fetchCategoriesRequest(); // GET request

//             await dispatch({
//                 type: FETCH_CATEGORIES_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(
//                 returnNotifications(
//                     res.data,
//                     "success",
//                     res.status,
//                     "FETCH_CATEGORIES_SUCCESS"
//                 )
//             );
//         } catch (err) {
//             console.log(err);
//             dispatch({
//                 type: FETCH_CATEGORIES_FAILED
//             });
//         }
//     };
// }

// Create product
export function createProduct(values) {
  return async dispatch => {
    await dispatch({
      type: CREATE_PRODUCT_REQUEST
    });

    try {
      const res = await ProductManagementServices.createProductRequest(values); // POST request
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
// export function updateProduct(id, values) {
//     return async dispatch => {
//         await dispatch({
//             type: UPDATE_PRODUCT_REQUEST
//         });

//         try {
//             const res = await ProductManagementServices.updateArticleRequest(
//                 id,
//                 values
//             ); // PUT request

//             await dispatch({
//                 type: UPDATE_PRODUCT_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(
//                 returnNotifications(
//                     res.data,
//                     "success",
//                     res.status,
//                     "UPDATE_PRODUCT_SUCCESS"
//                 )
//             );
//         } catch (err) {
//             dispatch({
//                 type: UPDATE_PRODUCT_FAILED
//             });
//             dispatch(
//                 returnNotifications(
//                     err.data,
//                     "success",
//                     err.status,
//                     "UPDATE_PRODUCT_FAILED"
//                 )
//             );
//         }
//     };
// }

// Archive product
// export function archiveProduct(id) {
//     return async dispatch => {
//         await dispatch({
//             type: ARCHIVE_ARTICLE_REQUEST
//         });

//         const values = {
//             status: "archived"
//         };

//         try {
//             const res = await ProductManagementServices.archiveArticleRequest(
//                 id,
//                 values
//             ); // PUT request

//             await dispatch({
//                 type: ARCHIVE_ARTICLE_SUCCESS
//             });

//             dispatch(
//                 returnNotifications(
//                     res.data,
//                     "success",
//                     res.status,
//                     "ARCHIVE_ARTICLE_SUCCESS"
//                 )
//             );
//         } catch (err) {
//             dispatch({
//                 type: ARCHIVE_ARTICLE_FAILED
//             });
//             dispatch(
//                 returnNotifications(
//                     err.response.data,
//                     "success",
//                     err.response.status,
//                     "ARCHIVE_ARTICLE_FAILED"
//                 )
//             );
//         }
//     };
// }

// Fetch current product
// export function fetchCurrentProduct(id) {
//     return async dispatch => {
//         await dispatch({
//             type: FETCH_CURRENT_ARTICLE_REQUEST
//         });
//         try {
//             const response = await ProductManagementServices.fetchCurrentArticleRequest(
//                 id
//             ); // GET request

//             await dispatch({
//                 type: FETCH_CURRENT_ARTICLE_SUCCESS,
//                 payload: response.data
//             });
//         } catch (err) {
//             dispatch(
//                 returnNotifications(
//                     err.response.data,
//                     "error",
//                     err.response.status,
//                     "FETCH_CURRENT_ARTICLE_FAILED"
//                 )
//             );
//             dispatch({
//                 type: FETCH_CURRENT_ARTICLE_FAILED
//             });
//         }
//     };
// }

// Change product status
// export function changeProductStatus(id, values) {
//     return async dispatch => {
//         await dispatch({
//             type: CHANGE_ARTICLE_STATUS_REQUEST
//         });
//         try {
//             const res = await ProductManagementServices.changeArticleStatusRequest(
//                 id,
//                 values
//             ); // PUT request

//             await dispatch({
//                 type: CHANGE_PRODUCT_STATUS_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(
//                 returnNotifications(
//                     res.data,
//                     "success",
//                     res.status,
//                     "CHANGE_PRODUCT_STATUS_SUCCESS"
//                 )
//             );
//         } catch (err) {
//             dispatch(
//                 returnNotifications(
//                     err.response.data,
//                     "error",
//                     err.response.status,
//                     "CHANGE_PRODUCT_STATUS_FAILED"
//                 )
//             );
//             dispatch({
//                 type: CHANGE_PRODUCT_STATUS_FAILED
//             });
//         }
//     };
// }
