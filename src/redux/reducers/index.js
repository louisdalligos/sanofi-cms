import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import superadmin from "./superAdminReducer";
import userMaintenanceReducer from "./userMaintenanceReducer";

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  superadmin,
  userMaintenanceReducer
});

export default rootReducer;
