import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Route
import PrivateRoute from "./privateRoute";

// Context API
import AuthState from "Context/auth/AuthState";
import AlertState from "Context/alerts/AlertState";
import TherapyState from "Context/therapy/TherapyState";

// Pages
import Dashboard from "Pages/Dashboard";
import Profile from "Pages/Profile";
import Users from "Pages/Users";
import Admins from "Pages/Admins";
import TherapyAreas from "Pages/TherapyAreas";

// Components
import WrappedLoginForm from "Components/Forms/LoginForm/LoginForm";
import AccountRegistrationForm from "Components/Forms/AccountRegistrationForm/AccountRegistrationForm";
import ForgotPasswordForm from "Components/Forms/ForgotPasswordForm/ForgotPasswordForm";

// load token into global headers
import setAuthToken from "Utils/setAuthToken";
import RequestAccountForm from "../components/Forms/RequestAccountForm/RequestAccountForm";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const history = createBrowserHistory();

// Our MAIN APP wrapper
const App = props => {
  return (
    <AuthState>
      <TherapyState>
        <AlertState>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={"/"} component={Dashboard} />
              <Route exact path={"/profile/:id"} component={Profile} />

              {/* Users(Top Level) Route*/}
              <Route exact path={"/users"} component={Users} />

              <Route exact path={"/admins"} component={Admins} />

              {/* Content(Top Level) Route*/}
              <Route exact path={"/therapyareas"} component={TherapyAreas} />

              {/* Public Route */}
              <Route
                exact
                path={"/register"}
                component={AccountRegistrationForm}
              />
              <Route exact path={"/login"} component={WrappedLoginForm} />
              <Route
                exact
                path={"/forgot-password"}
                component={ForgotPasswordForm}
              />
              <Route
                exact
                path={"/request-account"}
                component={RequestAccountForm}
              />
            </Switch>
          </Router>
        </AlertState>
      </TherapyState>
    </AuthState>
  );
};

export default App;