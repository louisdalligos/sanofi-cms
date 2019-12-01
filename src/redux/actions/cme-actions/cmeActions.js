import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILED,
  CHANGE_EVENT_STATUS_REQUEST,
  CHANGE_EVENT_STATUS_SUCCESS,
  CHANGE_EVENT_STATUS_FAILED,
  FETCH_CURRENT_EVENT_REQUEST,
  FETCH_CURRENT_EVENT_SUCCESS,
  FETCH_CURRENT_EVENT_FAILED,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILED,
  CREATE_EVENT_HEADING_REQUEST,
  CREATE_EVENT_HEADING_SUCCESS,
  CREATE_EVENT_HEADING_FAILED,
  DELETE_EVENT_HEADING_REQUEST,
  DELETE_EVENT_HEADING_SUCCESS,
  DELETE_EVENT_HEADING_FAILED,
  CREATE_EVENT_HEADING_VIDEO_REQUEST,
  CREATE_EVENT_HEADING_VIDEO_SUCCESS,
  CREATE_EVENT_HEADING_VIDEO_FAILED,
  DELETE_EVENT_HEADING_VIDEO_REQUEST,
  DELETE_EVENT_HEADING_VIDEO_SUCCESS,
  DELETE_EVENT_HEADING_VIDEO_FAILED,
  SET_SELECTED_VIDEO,
  CLEAR_CURRENT_VIDEO,
  UPDATE_EVENT_HEADING_VIDEO_REQUEST,
  UPDATE_EVENT_HEADING_VIDEO_SUCCESS,
  UPDATE_EVENT_HEADING_VIDEO_FAILED,
  SET_SELECTED_HEADING
} from "./types";

import CMEManagementServices from "./service";

import { returnNotifications } from "../notification-actions/notificationActions";

// Create product
export function createEvent(values) {
  return async dispatch => {
    await dispatch({
      type: CREATE_EVENT_REQUEST
    });

    try {
      const res = await CMEManagementServices.createEventRequest(values); // POST request
      console.log(res);
      await dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "CREATE_EVENT_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: CREATE_EVENT_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          "error",
          err.status,
          "CREATE_EVENT_FAILED"
        )
      );
    }
  };
}

// Change event status
export function changeEventStatus(id, values) {
  return async dispatch => {
    await dispatch({
      type: CHANGE_EVENT_STATUS_REQUEST
    });
    try {
      const res = await CMEManagementServices.changeEventStatusRequest(
        id,
        values
      ); // PUT request

      await dispatch({
        type: CHANGE_EVENT_STATUS_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "CHANGE_EVENT_STATUS_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "CHANGE_EVENT_STATUS_FAILED"
        )
      );
      dispatch({
        type: CHANGE_EVENT_STATUS_FAILED
      });
    }
  };
}

// Fetch selected event on edit mode
export function fetchCurrentEvent(id) {
  return async dispatch => {
    await dispatch({
      type: FETCH_CURRENT_EVENT_REQUEST
    });
    try {
      const response = await CMEManagementServices.fetchCurrentEventRequest(id); // GET request

      await dispatch({
        type: FETCH_CURRENT_EVENT_SUCCESS,
        payload: response.data
      });

      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.data.status,
          "FETCH_CURRENT_EVENT_SUCCESS"
        )
      );
    } catch (err) {
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "FETCH_CURRENT_EVENT_FAILED"
        )
      );
      dispatch({
        type: FETCH_CURRENT_EVENT_FAILED
      });
    }
  };
}

// Update event
// export function updateEvent(id, values) {
//     return async dispatch => {
//         await dispatch({
//             type: UPDATE_ARTICLE_REQUEST
//         });

//         try {
//             const res = await CMEManagementServices.updateEventRequest(
//                 id,
//                 values
//             ); // PUT request

//             await dispatch({
//                 type: UPDATE_ARTICLE_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(
//                 returnNotifications(
//                     res.data,
//                     "success",
//                     res.status,
//                     "UPDATE_ARTICLE_SUCCESS"
//                 )
//             );
//         } catch (err) {
//             dispatch({
//                 type: UPDATE_ARTICLE_FAILED
//             });
//             dispatch(
//                 returnNotifications(
//                     err.data,
//                     "success",
//                     err.status,
//                     "UPDATE_ARTICLE_FAILED"
//                 )
//             );
//         }
//     };
// }

// create an event heading action
export function createEventHeading(values) {
  return async dispatch => {
    await dispatch({
      type: CREATE_EVENT_HEADING_REQUEST
    });

    try {
      const res = await CMEManagementServices.createEventHeadingRequest(values); // POST request
      await dispatch({
        type: CREATE_EVENT_HEADING_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "CREATE_EVENT_HEADING_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: CREATE_EVENT_HEADING_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          "error",
          err.status,
          "CREATE_EVENT_HEADING_FAILED"
        )
      );
    }
  };
}

// Delete event heading
export function deleteEventHeading(id, values) {
  return async dispatch => {
    await dispatch({
      type: DELETE_EVENT_HEADING_REQUEST
    });
    try {
      const response = await CMEManagementServices.deleteEventHeadingRequest(
        id,
        values
      ); // DELETE request

      await dispatch({
        type: DELETE_EVENT_HEADING_SUCCESS,
        payload: response.data
      });

      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "DELETE_EVENT_HEADING_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_EVENT_HEADING_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "DELETE_EVENT_HEADING_FAILED"
        )
      );
    }
  };
}

// create an event heading action
export function createEventHeadingVideo(values) {
  return async dispatch => {
    await dispatch({
      type: CREATE_EVENT_HEADING_VIDEO_REQUEST
    });

    try {
      const res = await CMEManagementServices.createEventHeadingVideoRequest(
        values
      ); // POST request
      await dispatch({
        type: CREATE_EVENT_HEADING_VIDEO_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "CREATE_EVENT_HEADING_VIDEO_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: CREATE_EVENT_HEADING_VIDEO_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          "error",
          err.status,
          "CREATE_EVENT_HEADING_VIDEO_FAILED"
        )
      );
    }
  };
}

// Delete video heading
export function deleteEventHeadingVideo(id) {
  return async dispatch => {
    await dispatch({
      type: DELETE_EVENT_HEADING_VIDEO_REQUEST
    });
    try {
      const response = await CMEManagementServices.deleteEventHeadingVideoRequest(
        id
      ); // DELETE request

      await dispatch({
        type: DELETE_EVENT_HEADING_VIDEO_SUCCESS,
        payload: response.data
      });

      dispatch(
        returnNotifications(
          response.data,
          "success",
          response.status,
          "DELETE_EVENT_HEADING_VIDEO_SUCCESS"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_EVENT_HEADING_VIDEO_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data,
          "error",
          err.response.status,
          "DELETE_EVENT_HEADING_VIDEO_FAILED"
        )
      );
    }
  };
}

// Set the selected Video
export function setSelectedVideo(values) {
  return async dispatch => {
    await dispatch({
      type: SET_SELECTED_VIDEO,
      payload: values
    });
  };
}

// Fetch the video
export function clearCurrentVideo() {
  return async dispatch => {
    await dispatch({
      type: CLEAR_CURRENT_VIDEO
    });
  };
}

// update an event heading video
export function updateEventHeadingVideo(id, values) {
  return async dispatch => {
    await dispatch({
      type: UPDATE_EVENT_HEADING_VIDEO_REQUEST
    });

    try {
      const res = await CMEManagementServices.updateEventHeadingVideoRequest(
        id,
        values
      ); // POST request
      await dispatch({
        type: UPDATE_EVENT_HEADING_VIDEO_SUCCESS,
        payload: res.data
      });

      dispatch(
        returnNotifications(
          res.data,
          "success",
          res.status,
          "UPDATE_EVENT_HEADING_VIDEO_SUCCESS"
        )
      );
    } catch (err) {
      dispatch({
        type: UPDATE_EVENT_HEADING_VIDEO_FAILED
      });
      dispatch(
        returnNotifications(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          "error",
          err.status,
          "UPDATE_EVENT_HEADING_VIDEO_FAILED"
        )
      );
    }
  };
}

// Set the selected heading
export function setSelectedHeading(values) {
  return async dispatch => {
    await dispatch({
      type: SET_SELECTED_HEADING,
      payload: values
    });
  };
}
