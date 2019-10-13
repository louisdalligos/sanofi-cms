import { GET_NOTIFICATION, CLEAR_NOTIFICATIONS } from "./types";

// RETURN ERRORS
export const returnNotifications = (message, uiType, status, id = null) => {
  return {
    type: GET_NOTIFICATION,
    payload: { message, uiType, status, id }
  };
};

// CLEAR ERRORS
export const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
};
