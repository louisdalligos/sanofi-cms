import {
  PRODUCT_OTHER_REFERENCES_SELECT_TYPE,
  PRODUCT_OTHER_REFERENCES_GET_FILES,
  PRODUCT_OTHER_REFERENCES_LOADER,
  PRODUCT_OTHER_REFERENCES_MESSAGE
} from "./other-references-productmanagement.types";
import OtherReferencesProductManagementService from "./other-references-productmanagement.service";

export function selectType(type) {
  return dispatch => {
    dispatch({
      type: PRODUCT_OTHER_REFERENCES_SELECT_TYPE,
      payload: {
        type
      }
    });
  };
}

export function saveOtherReferences(id, payload) {
  return async dispatch => {
    try {
      dispatch({
        type: PRODUCT_OTHER_REFERENCES_LOADER,
        payload: {
          loader: true
        }
      });

      const res = await OtherReferencesProductManagementService.saveOtherReferences(
        id,
        payload
      );

      dispatch({
        type: PRODUCT_OTHER_REFERENCES_MESSAGE,
        payload: res
      });
      // FETCH
      this.fetchOtherReferences(id);
    } catch (error) {
      // console.log(error.message);
      dispatch({
        type: PRODUCT_OTHER_REFERENCES_MESSAGE,
        payload: error
      });
    }
  };
}

export function saveFilePostOtherReferences(id, payload) {
  return async dispatch => {
    try {
      dispatch({
        type: PRODUCT_OTHER_REFERENCES_LOADER,
        payload: { loader: true }
      });

      const res = await OtherReferencesProductManagementService.saveFilePostOtherReferences(
        id,
        payload
      );

      dispatch({
        type: PRODUCT_OTHER_REFERENCES_MESSAGE,
        payload: res
      });
      // FETCH
      this.fetchOtherReferences(id);
    } catch (error) {
      // console.log(error.message);
      dispatch({
        type: PRODUCT_OTHER_REFERENCES_MESSAGE,
        payload: error
      });
    }
  };
}
// TODO: These are common to other tabs
export function fetchOtherReferences(id) {
  return async dispatch => {
    try {
      const res = await OtherReferencesProductManagementService.fetchOtherReferences(
        id
      );
      dispatch({
        type: PRODUCT_OTHER_REFERENCES_GET_FILES,
        payload: res
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteOtherReferences(id, editId) {
  return async dispatch => {
    dispatch({
      type: PRODUCT_OTHER_REFERENCES_LOADER,
      payload: {
        loader: true
      }
    });
    try {
      const res = await OtherReferencesProductManagementService.deleteOtherReferences(
        id
      );

      this.fetchOtherReferences(editId);
    } catch (error) {
      console.log(error.message);
    }
  };
}
