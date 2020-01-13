import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  auth: { isLoggedIn },
  user,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isLoggedIn) {
        // alert('Go To Public ' + isLoggedIn);

        // logged in so redirect to the component
        return <Component {...props} />;
      }

      // redirect to login
      return <Redirect to="/login" />;
    }}
  />
);

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    user: state.authReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(PublicRoute));
