import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";

import AlertContext from "Context/alerts/alertContext";
import AuthContext from "Context/auth/authContext";
import Alerts from "Components/Alerts/Alerts";

const LoginForm = ({ form, form: { getFieldDecorator }, history }) => {
  const authContext = useContext(AuthContext); // get our auth context
  const alertContext = useContext(AlertContext); // get our alert context

  const { login, error, clearErrors, isAuthenticated, loading } = authContext; // get values from the provider
  const { setAlert } = alertContext; // get values from the provider

  //@todo
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "error");
      clearErrors(); // set error to null
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]); // add error value as a dependency of useEffect

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        login(values);
      } else {
        setAlert("Please fill in the fields", "error");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2>Login to your account</h2>
      <Alerts />

      <Form.Item label="Email">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Please enter a valid e-mail"
            },
            { required: true, message: "Please input your email" }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item label="Password">
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item style={{ marginTop: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/forgot-password">Forgot password</Link>
        <Link to="/request-account" style={{ float: "right" }}>
          Request new account
        </Link>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default WrappedLoginForm;
