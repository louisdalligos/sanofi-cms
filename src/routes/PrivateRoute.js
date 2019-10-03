import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import AuthContext from "Context/auth/authContext";

import { loadUser } from "Services/redux/actions/authActions";

const PrivateRoute = (
  { component: Component, auth: { loading, isAuthenticated } },
  ...rest
) => {
  //const authContext = useContext(AuthContext);
  //const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const maptStateToProps = state => {
  return {
    auth: state.authState
  };
};

PrivateRoute.propTypes = {
  auth: PropTypes.object
};

export default connect(
  maptStateToProps,
  {}
)(PrivateRoute);
