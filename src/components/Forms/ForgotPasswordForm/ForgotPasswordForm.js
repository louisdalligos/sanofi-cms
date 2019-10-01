import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertContext from "Context/alerts/alertContext";
import Alerts from "Components/Alerts/Alerts";

const ForgotPasswordForm = props => {
  const alertContext = useContext(AlertContext); // get our alert context
  const { setAlert } = alertContext; // get values from the provider

  const [user, setUser] = useState({
    email: ""
  });

  const { email } = user;

  const handleChange = e => setUser({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (email === "") {
      setAlert("Please fill in the fields", "error");
    } else {
      alert(email);
      //   login({
      //     email,
      //     password
      //   }); // call login method
    }
  };

  return (
    <div style={{ margin: "50px auto 0", width: "300px" }}>
      <h2>Forgot Password</h2>

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

        <button
          type="submit"
          className="ant-btn ant-btn-primary ant-btn-block"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Request Password Reset
        </button>

        <Link to="/login">Login</Link>
        <Link to="/request-account" style={{ float: "right" }}>
          Request account
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
