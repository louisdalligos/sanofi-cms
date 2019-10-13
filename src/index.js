import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createBrowserHistory } from "history";
import axiosInstance from "./utils/axiosInstance";
import store from "./stores/store-dev";

import App from "./container/App";
import "antd/dist/antd.min.css";
import { message } from "antd";
import "./app.scss";

import {
  connectTheUser,
  getAuthUser
} from "./redux/actions/auth-actions/authActions";

export const history = createBrowserHistory();
const token = localStorage.getItem("access_token");

if (token) {
  // if token exists in local storage!
  store.dispatch(connectTheUser(token));
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

const WrappedApp = props => {
  useEffect(() => {
    if (token) {
      // We need to check if the token are valid or not by getting the auth user
      props.store.dispatch(getAuthUser());
      //eslint-disable-next-line
    }
  }, []);

  return (
    <>
      {/*if token is available we try to get the user once each time the app gets reloaded, so we don't need to
      fetch the auth user everytime we need him,*/}

      {token && props.isLoadingUser
        ? message.loading("Please wait a moment..", 1)
        : props.children}
    </>
  );
};

const mapStateToProps = reduxStore => {
  return {
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

const ConnectedWrappedApp = connect(mapStateToProps)(WrappedApp);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedWrappedApp store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ConnectedWrappedApp>
  </Provider>,
  document.getElementById("app")
);
