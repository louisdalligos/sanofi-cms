import React, { useEffect, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";

// Pages
import Dashboard from "../components/dashboard-page/Dashboard";
import ProfileManagement from "../components/profile-management-page/ProfileManagement";
import SiteAdminManagement from "../components/site-admins-management-page/SiteAdminManagement";
import WrappedCreateAdminForm from "../components/site-admins-management-page/CreateAdminForm";
import WrappedUpdateAdminForm from "../components/site-admins-management-page/UpdateAdminForm";
import UserManagement from "../components/users-management-page/UserManagement";
import TherapyAreasManagement from "../components/therapy-areas-management-page/TherapyAreasManagement";
import WrappedCreateUserForm from "../components/users-management-page/CreateUserForm";
import WrappedViewUserForm from "../components/users-management-page/ViewUserForm";
import CategoriesManagement from "../components/categories-management-page/CategoriesManagement";
import SubCategoriesManagement from "../components/sub-categories-management-page/SubCategoriesManagement";
import ProductsManagement from "../components/products-management-page/ProductsManagement";

// 404
import NotFound from "../components/404-page/NotFound";

// Components as smart container
import WrappedLoginForm from "../components/login-page/LoginForm";
import WrappedRequestAccountForm from "../components/request-account-page/RequestAccountForm";
import WrappedForgotPasswordForm from "../components/forgot-password-page/ForgotPasswordForm";
import WrappedCompleteRegistrationForm from "../components/complete-registration-page/CompleteRegistrationForm";
import WrappedResetPasswordForm from "../components/reset-password-page/ResetPasswordForm";
import CreateArticlePage from "../components/therapy-areas-management-page/new-article/CreateArticlePage";
import UpdateArticlePage from "../components/therapy-areas-management-page/update-article/UpdateArticlePage";
import CreateProductPage from "../components/products-management-page/add-product/CreateProductPage";

import { Role } from "../utils/role";
import { getAuthUser } from "../redux/actions/auth-actions/authActions";
import store from "../stores/store-dev";
import { message } from "antd";

import Navbar from "../components/main-navigation/Navbar";

const token = sessionStorage.getItem("access_token");

// Our MAIN APP wrapper
const App = ({ auth, ...props }) => {
  useEffect(() => {
    //console.log(props);
    //console.log(auth, "Auth store from app");
    //console.log(store, "Store from app");
    //console.log(Role.SuperAdmin, "role config");

    if (token) {
      //console.log("has token");
      store.dispatch(getAuthUser());
    }
  }, [token]);

  return (
    <Fragment>
      {token && auth.isLoadingUser ? (
        message.info("Please wait a moment...", 1)
      ) : (
        <div className="wrapper">
          {auth.isLoggedIn ? <Navbar {...props} /> : null}
          <Switch location={props.history.location}>
            <PrivateRoute exact path={"/"} component={Dashboard} />
            <PrivateRoute exact path="/profile" component={ProfileManagement} />
            <PrivateRoute
              exact
              path="/admins"
              component={SiteAdminManagement}
              roles={[Role.SuperAdmin]} // set what role can access this route - can be an array of users
            />
            <PrivateRoute
              path="/admins/create"
              component={WrappedCreateAdminForm}
              roles={[Role.SuperAdmin]}
            />
            <PrivateRoute
              path="/admins/:id"
              component={WrappedUpdateAdminForm}
              roles={[Role.SuperAdmin]}
            />
            <PrivateRoute
              exact
              path="/doctors"
              component={UserManagement}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              path="/doctors/create"
              component={WrappedCreateUserForm}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              path="/doctors/:id"
              component={WrappedViewUserForm}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              exact
              path="/therapy-areas"
              component={TherapyAreasManagement}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              exact
              path="/therapy-areas/create"
              component={CreateArticlePage}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              exact
              path="/therapy-areas/:id"
              component={UpdateArticlePage}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              path="/categories"
              component={CategoriesManagement}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              path="/sub-categories"
              component={SubCategoriesManagement}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              exact
              path="/products"
              component={ProductsManagement}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PrivateRoute
              exact
              path="/products/create"
              component={CreateProductPage}
              roles={[Role.SuperAdmin, Role.Admin]}
            />
            <PublicRoute
              exact
              path="/request-account"
              component={WrappedRequestAccountForm}
            />
            <PublicRoute exact path="/login" component={WrappedLoginForm} />
            <PublicRoute
              exact
              path="/forgot-password"
              component={WrappedForgotPasswordForm}
            />
            <PublicRoute
              exact
              path="/register"
              component={WrappedCompleteRegistrationForm}
            />
            <PublicRoute
              exact
              path="/reset-password"
              component={WrappedResetPasswordForm}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { getAuthUser }
)(withRouter(App));
