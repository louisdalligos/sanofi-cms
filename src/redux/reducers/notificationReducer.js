import {
  GET_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/notification-actions/types";

const initialState = {
  notifications: {},
  uiType: null,
  status: null,
  id: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        notifications: action.payload.message,
        uiType: action.payload.uiType,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_NOTIFICATIONS:
      return {
        notifications: {},
        uiType: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
};

export default notificationReducer;
