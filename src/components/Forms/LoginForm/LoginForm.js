import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = props => {
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
    console.log("submit");
  };

  return (
    <div style={{ margin: "50px auto 0", width: "300px" }}>
      <h2>Login to your account</h2>

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
          Request account
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
