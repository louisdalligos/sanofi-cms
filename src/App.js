import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context API
import AuthState from "Context/auth/AuthState";
import AlertState from "Context/alerts/AlertState";

// Pages
import Dashboard from "Pages/Dashboard/Dashboard";
import RegisterPage from "Pages/Register";
// Components
import LoginForm from "Components/Forms/LoginForm/LoginForm";
//import AccountRegistrationForm from "Components/Forms/AccountRegistrationForm/AccountRegistrationForm";

// Our MAIN APP wrapper
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
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
