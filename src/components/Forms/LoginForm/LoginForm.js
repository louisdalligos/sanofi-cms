import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertContext from "Context/alerts/alertContext";
import AuthContext from "Context/auth/authContext";
import Alerts from "Components/Alerts/Alerts";

const LoginForm = props => {
  const authContext = useContext(AuthContext); // get our auth context
  const alertContext = useContext(AlertContext); // get our alert context

  const { login, error, clearErrors, isAuthenticated } = authContext; // get values from the provider
  const { setAlert } = alertContext; // get values from the provider

  //@todo
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "error");
      clearErrors(); // set error to null
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); // add error value as a dependency of useEffect

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // destructure our state
  const { email, password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlert("Please fill in the fields", "error");
    } else {
      login({
        email,
        password
      }); // call login method
    }
  };

  return (
    <div style={{ margin: "50px auto 0", width: "300px" }}>
      <h2>Login to your account</h2>

      <Alerts />

      <form onSubmit={handleSubmit}>
        <div className="ant-form-item-control">
          <label
            htmlFor="email"
            className="ant-form-item-required"
            title="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="ant-input"
            onChange={handleChange}
          />
        </div>

        <div className="ant-form-item-control">
          <label
            htmlFor="password"
            className="ant-form-item-required"
            title="email"
          >
            Password
          </label>
          <span className="ant-input-password ant-input-affix-wrapper">
            <input
              name="password"
              type="password"
              className="ant-input"
              value={password}
              onChange={handleChange}
            />
          </span>
        </div>

        <button
          type="submit"
          className="ant-btn ant-btn-primary ant-btn-block"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Login
        </button>

        <Link to="/forgot-password">Forgot password</Link>
        <Link to="/request-account" style={{ float: "right" }}>
          Request new account
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
