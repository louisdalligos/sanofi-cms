import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect, Switch } from "react-router-dom";

// Pages
import Dashboard from "../components/dashboard-page/Dashboard";
import ProfileManagement from "../components/profile-management-page/ProfileManagement";
import SiteAdminManagement from "../components/site-admins-management-page/SiteAdminManagement";
import CreateAdminPage from "../components/site-admins-management-page/CreateAdminPage";
import UpdateAdminPage from "../components/site-admins-management-page/UpdateAdminPage";
//import TherapyAreas from "../components/therapy-areas-management-page/TherapyAreas";
import NotFound from "../components/404-page/NotFound";

// Components as smart container
import WrappedLoginForm from "../components/login-page/LoginForm";
import WrappedRequestAccountForm from "../components/request-account-page/RequestAccountForm";
import WrappedForgotPasswordForm from "../components/forgot-password-page/ForgotPasswordForm";
import WrappedCompleteRegistrationForm from "../components/complete-registration-page/CompleteRegistrationForm";

//import WrappedUpdateAdminForm from "../components/site-admins-management-page/UpdateAdminForm";

import { logout } from "../redux/actions/auth-actions/authActions";

// Our MAIN APP wrapper
const App = props => {
  return (
    <div className="wrapper">
      <Switch location={props.history.location}>
        <PrivateRoute
          exact
          authenticated={props.isLoggedIn}
          path={"/"}
          component={Dashboard}
        />
        <PrivateRoute
          authenticated={props.isLoggedIn}
          path="/profile"
          component={ProfileManagement}
        />
        <PrivateRoute
          authenticated={props.isLoggedIn}
          path="/admins"
          component={SiteAdminManagement}
        />
        <PrivateRoute
          authenticated={props.isLoggedIn}
          path="/create-admin"
          component={CreateAdminPage}
        />
        <PrivateRoute
          authenticated={props.isLoggedIn}
          path="/update-admin/:id"
          component={UpdateAdminPage}
        />
        {/*<PrivateRoute
                    authenticated={props.isLoggedIn}
                    path={"/therapyareas"}
                    component={TherapyAreas}
                />*/}
        <GuestRoute
          authenticated={props.isLoggedIn}
          path="/request-account"
          component={WrappedRequestAccountForm}
        />
        <GuestRoute
          authenticated={props.isLoggedIn}
          path="/login"
          component={WrappedLoginForm}
        />
        <GuestRoute
          authenticated={props.isLoggedIn}
          path="/forgot-password"
          component={WrappedForgotPasswordForm}
        />
        <GuestRoute
          authenticated={props.isLoggedIn}
          path="/register"
          component={WrappedCompleteRegistrationForm}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

// define our routes here:
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function GuestRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
