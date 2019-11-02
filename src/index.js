import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import axiosInstance from "./utils/axiosInstance";
import store from "./stores/store-dev";
import history from "./utils/history";

import App from "./container/App";
import "antd/dist/antd.min.css";
import "./app.scss";

import {
  connectTheUser,
  getAuthUser
} from "./redux/actions/auth-actions/authActions";
const token = sessionStorage.getItem("access_token");

if (token) {
  // if token exists in local storage!, redirect if logged in
  store.dispatch(connectTheUser(token)); // connect the user
  store.dispatch(getAuthUser()); // get user on browser reload
}

store.subscribe(() => {
  const reduxSubs = store.getState();
  if (reduxSubs.authReducer.access_token) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${reduxSubs.authReducer.access_token}`;
    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${reduxSubs.authReducer.access_token}`;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
