import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../redux/reducers/index";

const initialState = {};
let middleware = [];
const logger = createLogger();

if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk /*, #TOKEN logger*/];
} else {
  middleware = [...middleware, thunk];
}

// Initialize our REDUX store
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
