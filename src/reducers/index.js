import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";

export default combineReducers({
  authState: authReducer,
  articleState: articleReducer
});
