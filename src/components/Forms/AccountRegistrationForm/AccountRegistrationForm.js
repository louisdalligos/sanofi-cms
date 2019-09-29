import React, { useState, useContext, useEffect } from "react";

import AlertContext from "Context/alerts/alertContext";
import AuthContext from "Context/auth/authContext";
import Alerts from "Components/Alerts/Alerts";

const AccountRegistrationForm = props => {
  const authContext = useContext(AuthContext); // get our auth context
  const alertContext = useContext(AlertContext); // get our alert context

  const { register, error, clearErrors } = authContext; // get values from the provider
  const { setAlert } = alertContext; // get values from the provider

  //@todo add id to error messages
  useEffect(() => {
    if (error === "User with that email already exists") {
      setAlert(error, "error");
      clearErrors(); // set error to null
    }
  }, [error]); // add error value as a dependency of useEffect

  // set our state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    confirmDirty: false
  });

  // destructure our state
  const { name, email, password, confirm_password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  // handle submission of form
  const handleSubmit = e => {
    e.preventDefault();

    if (name === "") {
      setAlert("Please enter a name", "error", 1000);
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div style={{ margin: "50px auto 0", width: "400px" }}>
      <h2>Register Account</h2>

      <Alerts />

      <form onSubmit={handleSubmit}>
        <div className="ant-form-item-control">
          <label htmlFor="name" className="ant-form-item-required" title="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="ant-input"
            onChange={handleChange}
          />
        </div>
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

        <div className="ant-form-item-control">
          <label
            htmlFor="confirm_password"
            className="ant-form-item-required"
            title="email"
          >
            Confirm Password
          </label>
          <span className="ant-input-password ant-input-affix-wrapper">
            <input
              name="confirm_password"
              type="password"
              className="ant-input"
              value={confirm_password}
              onChange={handleChange}
            />
          </span>
        </div>

        <div className="ant-form-item-control">
          <span className="ant-form-item-children">
            <label className="ant-checkbox-wrapper">
              <span className="ant-checkbox">
                <input
                  id="register_agreement"
                  type="checkbox"
                  className="ant-checkbox-input"
                  value=""
                />
                <span className="ant-checkbox-inner" />
              </span>
              <span>
                I have read the <a href="">agreement</a>
              </span>
            </label>
          </span>
        </div>

        <button
          type="submit"
          className="ant-btn ant-btn-primary"
          style={{ marginTop: 10 }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AccountRegistrationForm;
