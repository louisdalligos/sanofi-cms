import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import superadmin from "./superAdminReducer";
import userMaintenanceReducer from "./userMaintenanceReducer";
import postManagementReducer from "./postManagementReducer";
import productManagementReducer from "./productManagementReducer";
import cmeReducer from "./cmeReducer";
import dashboardReducer from "./dashboardReducer";

import miscellaneousReducer from "./miscellaneousReducer";
import userDeletedReducer from "./userDeletedReducer";

import otherReferencesProductManagementReducers from "./other-references-product-management.reducers";
import prescriptionInfoProductManagementReducers from "./prescription-info-product-management.reducers";
import newCategoriesReducers from "./new-categories.reducers";
import newSubcategoriesReducers from "./new-subcategories.reducers";
import clinicalTrialsProductManagementReducers from "./clinical-trials-product-management.reducers";
import centralizeFunctionalityReducers from "./centralize-functionality.reducers";
//centralize
import centralizeToastrReducers from "../../components/utility-components/CentralizeToastr/centralize-toastr.reducers";

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  superadmin,
  userMaintenanceReducer,
  postManagementReducer,
  productManagementReducer,
  cmeReducer,
  dashboardReducer,
  miscellaneousReducer,
  userDeletedReducer,
  // Centralize Toaster
  centralizeToastrReducers,
  // (Sub)Categories
  newCategoriesReducers,
  newSubcategoriesReducers,
  // ProductsManagementPage
  prescriptionInfoProductManagementReducers,
  otherReferencesProductManagementReducers,
  clinicalTrialsProductManagementReducers,
  // for dirty
  centralizeFunctionalityReducers
});

export default rootReducer;
