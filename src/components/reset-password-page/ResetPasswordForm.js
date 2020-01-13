import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Layout, Row, message, Alert } from "antd";
import { useQuery } from "../../utils/helper";

import {
  getResetPasswordTokenFromParams,
  verifyPasswordResetToken,
  passwordReset,
  resendPasswordResetLink
} from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

import logo from "../../assets/logo.png";
const { Content } = Layout;

const ResetPasswordForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  userMaintenance: {
    password_reset_token,
    requestInProgress,
    isResetPasswordTokenVerified,
    loading
  },
  notifs: {
    notifications: { error, success },
    id,
    uiType
  },
  notifications,
  history,
  getResetPasswordTokenFromParams,
  verifyPasswordResetToken,
  passwordReset,
  resendPasswordResetLink
}) => {
  let query = useQuery();

  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    const info = () => {
      message.info("Please wait a moment...", 1);
    };
    info();

    console.log("password reset token: ", query.get("reset_token"));
    const pwr_token = query.get("reset_token");

    if (pwr_token) {
      getResetPasswordTokenFromParams(pwr_token);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (id) {
      case "VERIFY_RESET_PASSWORD_TOKEN_FAILED":
        setAlert(error ? error : notifications.message);
        setAlertType(uiType);
        break;
      case "PASSWORD_RESET_SUCCESS":
        message.success(success);
        history.push("/login");
        break;
      case "PASSWORD_RESET_FAILED":
        message.error(error ? error : notifications.error);
        break;
      case "RESEND_PASSWORD_RESET_EMAIL_LINK_SUCCESS":
        message.success(success);
        break;
      case "RESEND_PASSWORD_RESET_EMAIL_LINK_FAILED":
        message.error(notifications);
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [id, notifications]);

  useEffect(() => {
    if (password_reset_token) {
      verifyPasswordResetToken(password_reset_token);
    }
    //eslint-disable-next-line
  }, [password_reset_token]);

  // handle confirm blur
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("New Passwords do not match.");
    } else {
      callback();
    }
  };

  // validate password
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["password_confirmation"], { force: true });
    }
    callback();
  };

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        passwordReset(values, password_reset_token);
        resetFields();
        clearNotifications();
      }
    });
  };

  const handleResendEmail = () => {
    resendPasswordResetLink(password_reset_token);
  };

  const onCloseAlert = e => {
    clearNotifications();
    setAlert(null);
  };

  return (
    <div className="full-page-layout">
      {!loading ? (
        <Layout>
          <Content>
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "100vh" }}
            >
              {isResetPasswordTokenVerified ? (
                <Form onSubmit={handleSubmit} className="auth-form">
                  <div className="heading">
                    <img src={logo} alt="" />
                    <h3>Reset Password</h3>
                  </div>

                  <p>Enter your password below</p>
                  <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input a password!"
                        },
                        {
                          min: 8,
                          message: "Password must be minimum of 8 characters."
                        },
                        {
                          max: 16,
                          message: "Password must be maximum of 16 characters."
                        },
                        {
                          pattern: new RegExp("(?=.*[@#!$%^&+=])"),
                          message: "Should have at least 1 special character"
                        },
                        {
                          pattern: new RegExp("(?=.*[A-Z])"),
                          message: "Should have at least 1 capital case letter"
                        },
                        {
                          pattern: new RegExp("(?=.*[a-z])"),
                          message: "Should have at least 1 lower case letter"
                        },
                        {
                          pattern: new RegExp("(?=.*[0-9])"),
                          message: "Should have at least 1 number"
                        },
                        {
                          validator: validateToNextPassword
                        }
                      ]
                    })(<Input.Password />)}
                  </Form.Item>
                  <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator("password_confirmation", {
                      rules: [
                        {
                          required: true,
                          message: "Please confirm the password!"
                        },
                        {
                          validator: compareToFirstPassword
                        }
                      ]
                    })(<Input.Password onBlur={handleConfirmBlur} />)}
                  </Form.Item>

                  <Form.Item style={{ marginTop: 20 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={requestInProgress}
                    >
                      Reset my password
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Fragment>
                  <div style={{ width: 300 }}>
                    {/* Handle response messages on UI */}
                    {alert ? (
                      <Alert
                        type={alertType}
                        message={alert}
                        closable
                        onClose={onCloseAlert}
                      />
                    ) : null}
                    <Button
                      type="primary"
                      onClick={handleResendEmail}
                      loading={requestInProgress}
                      style={{
                        marginTop: 20
                      }}
                    >
                      Resend link
                    </Button>
                  </div>
                </Fragment>
              )}
            </Row>
          </Content>
        </Layout>
      ) : null}
    </div>
  );
};

const WrappedResetPasswordForm = Form.create({
  name: "reset_password"
})(ResetPasswordForm);

const mapStatetoProps = state => {
  return {
    notifs: state.notificationReducer,
    notifications: state.notificationReducer.notifications,
    userMaintenance: state.userMaintenanceReducer
  };
};

export default connect(
  mapStatetoProps,
  {
    getResetPasswordTokenFromParams,
    verifyPasswordResetToken,
    passwordReset,
    resendPasswordResetLink,
    clearNotifications
  }
)(WrappedResetPasswordForm);
