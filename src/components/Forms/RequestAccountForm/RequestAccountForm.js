import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertContext from "Context/alerts/alertContext";
import Alerts from "Components/Alerts/Alerts";

const RequestAccountForm = props => {
  const alertContext = useContext(AlertContext); // get our alert context
  const { setAlert } = alertContext; // get values from the provider

  const [user, setUser] = useState({
    email: "",
    department: ""
  });

  const { email, department } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (email === "" || department === "") {
      setAlert("Please fill in the fields", "error");
    } else {
      console.log(user);

      setAlert(
        "Your request was sent to the MDCorner Administrator who may create your account. Please allow up to 2 business days, please reach out to another MDCorner Administrator to assist you.",
        "info"
      );
      //   login({
      //     email,
      //     password
      //   }); // call login method
    }
  };

  return (
    <div style={{ margin: "50px auto 0", width: "300px" }}>
      <h2>Request New Account</h2>

      <Alerts />

      <form onSubmit={handleSubmit}>
        <div className="ant-form-item-control">
          <label
            htmlFor="email"
            className="ant-form-item-required"
            title="email"
          >
            Your Sanofi Email
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
            htmlFor="email"
            className="ant-form-item-required"
            title="email"
          >
            Your Department
          </label>
          <input
            type="text"
            name="department"
            value={department}
            className="ant-input"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="ant-btn ant-btn-primary ant-btn-block"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestAccountForm;
