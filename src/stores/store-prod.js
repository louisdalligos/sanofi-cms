import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers/index";

const initialState = {};
let middleware = [];

middleware = [...middleware, thunk];

// Initialize our REDUX store
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

// console.log = function() {}; // remove clg

export default store;
