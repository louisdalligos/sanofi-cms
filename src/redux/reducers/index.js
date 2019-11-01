import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import superadmin from "./superAdminReducer";
import userMaintenanceReducer from "./userMaintenanceReducer";
import postManagementReducer from "./postManagementReducer";

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  superadmin,
  userMaintenanceReducer,
  postManagementReducer
});

export default rootReducer;
