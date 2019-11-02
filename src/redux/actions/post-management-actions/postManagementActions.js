import {
  FETCH_SPECIALIZATIONS_REQUEST,
  FETCH_SPECIALIZATIONS_SUCCESS,
  FETCH_SPECIALIZATIONS_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILED,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILED,
  ARCHIVE_ARTICLE_REQUEST,
  ARCHIVE_ARTICLE_SUCCESS,
  ARCHIVE_ARTICLE_FAILED,
  FETCH_CURRENT_ARTICLE_REQUEST,
  FETCH_CURRENT_ARTICLE_SUCCESS,
  FETCH_CURRENT_ARTICLE_FAILED,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILED
} from "./types";

import PostManagementServices from "./service";

import { returnNotifications } from "../notification-actions/notificationActions";

// Fetch specializations
export function fetchSpecializations() {
  return async dispatch => {
    await dispatch({
      type: FETCH_SPECIALIZATIONS_REQUEST
    });

    try {
      const res = await PostManagementServices.fetchSpecializationsRequest(); // GET request

      await dispatch({
        type: FETCH_SPECIALIZATIONS_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "FETCH_SPECIALIZATIONS_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_SPECIALIZATIONS_FAILED
      });
    }
  };
}

// Fetch categories
export function fetchCategories() {
  return async dispatch => {
    await dispatch({
      type: FETCH_CATEGORIES_REQUEST
    });

    try {
      const res = await PostManagementServices.fetchCategoriesRequest(); // GET request

      await dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "FETCH_CATEGORIES_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_CATEGORIES_FAILED
      });
    }
  };
}

// Fetch sub categories
export function fetchSubCategories() {
  return async dispatch => {
    await dispatch({
      type: FETCH_SUBCATEGORIES_REQUEST
    });

    try {
      const res = await PostManagementServices.fetchSubCategoriesRequest(); // GET request

      await dispatch({
        type: FETCH_SUBCATEGORIES_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "FETCH_SUBCATEGORIES_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_SUBCATEGORIES_FAILED
      });
    }
  };
}

// Add a category
export function addCategory(values) {
  return async dispatch => {
    await dispatch({
      type: ADD_CATEGORY_REQUEST
    });

    try {
      const res = await PostManagementServices.addCategoryRequest(values); // POST request
      console.log(res);
      await dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "ADD_CATEGORY_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: ADD_CATEGORY_FAILED
      });
      dispatch(
        returnNotifications(
          err.data,
          "success",
          err.status,
          "ADD_CATEGORY_FAILED"
        )
      );
    }
  };
}

// Add subcategory
export function addSubCategory(values) {
  return async dispatch => {
    await dispatch({
      type: ADD_SUBCATEGORY_REQUEST
    });

    try {
      const res = await PostManagementServices.addSubCategoryRequest(values); // POST request
      console.log(res);
      await dispatch({
        type: ADD_SUBCATEGORY_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "ADD_SUBCATEGORY_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: ADD_SUBCATEGORY_FAILED
      });
      dispatch(
        returnNotifications(
          err.data,
          "success",
          err.status,
          "ADD_SUBCATEGORY_FAILED"
        )
      );
    }
  };
}

// Create article
export function createArticle(values) {
  return async dispatch => {
    await dispatch({
      type: CREATE_ARTICLE_REQUEST
    });

    try {
      const res = await PostManagementServices.createArticleRequest(values); // POST request
      console.log(res);
      await dispatch({
        type: CREATE_ARTICLE_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "CREATE_ARTICLE_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: CREATE_ARTICLE_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          "error",
          err.status,
          "CREATE_ARTICLE_FAILED"
        )
      );
    }
  };
}

// Update article
export function updateArticle(id) {
  return async dispatch => {
    await dispatch({
      type: UPDATE_ARTICLE_REQUEST
    });

    try {
      const res = await PostManagementServices.updateArticleRequest(id); // PUT request

      await dispatch({
        type: UPDATE_ARTICLE_SUCCESS
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "UPDATE_ARTICLE_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: UPDATE_ARTICLE_FAILED
      });
      dispatch(
        returnNotifications(
          err.data,
          "success",
          err.status,
          "UPDATE_ARTICLE_FAILED"
        )
      );
    }
  };
}

// Archive article
export function archiveArticle(id) {
  return async dispatch => {
    await dispatch({
      type: ARCHIVE_ARTICLE_REQUEST
    });

    try {
      const res = await PostManagementServices.archiveArticleRequest(id); // DELETE request

      await dispatch({
        type: ARCHIVE_ARTICLE_SUCCESS
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "ARCHIVE_ARTICLE_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: ARCHIVE_ARTICLE_FAILED
      });
      dispatch(
        returnNotifications(
          err.data,
          "success",
          err.status,
          "ARCHIVE_ARTICLE_FAILED"
        )
      );
    }
  };
}

export function fetchCurrentArticle(id) {
  return async dispatch => {
    await dispatch({
      type: FETCH_CURRENT_ARTICLE_REQUEST
    });
    try {
      const response = await PostManagementServices.fetchCurrentArticleRequest(
        id
      ); // GET request

      await dispatch({
        type: FETCH_CURRENT_ARTICLE_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_CURRENT_ARTICLE_FAILED"
        )
      );
      dispatch({
        type: FETCH_CURRENT_ARTICLE_FAILED
      });
    }
  };
}
