import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { isLoggedIn, user },
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      //console.log(isLoggedIn, "props from private route");
      //console.log("User from private route:", user);
      if (!isLoggedIn) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(user.role) === -1) {
        console.log("Roles from app.js", roles);
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
