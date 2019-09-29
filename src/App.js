import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Context API
import AuthState from "Context/auth/AuthState";
import AlertState from "Context/alerts/AlertState";

// Pages
import Dashboard from "Pages/Dashboard/Dashboard";
import RegisterPage from "Pages/Register";

// Components
import LoginForm from "Components/Forms/LoginForm/LoginForm";
//import AccountRegistrationForm from "Components/Forms/AccountRegistrationForm/AccountRegistrationForm";

import setAuthToken from "Utils/setAuthToken";
// load token into global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const history = createBrowserHistory();

// Our MAIN APP wrapper
const App = props => {
  return (
    <AuthState>
      <AlertState>
        <Router history={history}>
          <Switch>
            <Route exact path={"/"} component={Dashboard} />
            <Route exact path={"/register"} component={RegisterPage} />
            <Route exact path={"/login"} component={LoginForm} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
