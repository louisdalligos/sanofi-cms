import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Alert } from "antd";

import { signin } from "../../redux/actions/auth-actions/authActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const LoginForm = ({
  form,
  form: { getFieldDecorator },
  history,
  isLoggedIn,
  signin,
  requestInProgress,
  clearNotifications,
  notifs,
  notifId
}) => {
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }

    if (notifId) {
      if (notifId === "SIGNIN_FAILURE") {
        console.log("Reach failed login");

        setAlert(notifs.notifications.error);
        setAlertType(notifs.uiType);
      } else if (notifId === "SIGNIN_SUCCESS") {
        setAlert(notifs.notifications.success);
        setAlertType(notifs.uiType);
      } else {
        setAlert(null);
      }
    }
    // eslint-disable-next-line
  }, [notifId, isLoggedIn, history]); // add error value as a dependency of useEffect

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        signin(values);
        // we can reset fields here
      }
    });

    clearNotifications();
  };

  const onCloseAlert = e => {
    clearNotifications();
    setAlert(null);
  };

  return (
    <div className="full-page-layout">
      <Form onSubmit={handleSubmit} className="auth-form">
        <h2>Login to your account</h2>

        {/* Handle response messages on UI */}
        {alert ? (
          <Alert
            type={alertType}
            message={alert}
            closable
            onClose={onCloseAlert}
          />
        ) : null}

        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Please enter a valid e-mail"
              },
              {
                required: true,
                message: "Please input your email"
              }
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
            rules: [
              {
                required: true,
                message: "Please input your Password!"
              }
            ]
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
            loading={requestInProgress}
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
    </div>
  );
};

LoginForm.propTypes = {
  signin: PropTypes.func.isRequired,
  requestInProgress: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  status: PropTypes.number
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

const mapStatetoProps = state => {
  return {
    isLoggedin: state.authReducer.isLoggedin,
    isLoadingUser: state.authReducer.isLoadingUser,
    requestInProgress: state.authReducer.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id
  };
};

export default connect(
  mapStatetoProps,
  { signin, clearNotifications }
)(WrappedLoginForm);
