import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";

// redux actions
import { login, clearErrors } from "Services/redux/actions/authActions";

const LoginForm = ({
  form,
  form: { getFieldDecorator }, // these are props from antd form
  isAuthenticated,
  loading,
  error,
  login,
  clearErrors,
  history // props from react router
}) => {
  //@todo
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Invalid Credentials") {
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
        alert("error");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2>Login to your account</h2>
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
      <Form.Item>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    loading: state.authState.loading,
    error: state.authState.error
  };
};

WrappedLoginForm.protoTypes = {};

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(WrappedLoginForm);
