import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Layout, Row, message, Alert } from "antd";
import { useQuery } from "../../utils/helper";

import {
  register,
  getTokenFromParams,
  verifyRegistrationToken,
  resendEmailLink
} from "../../redux/actions/auth-actions/authActions";

import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

import logo from "../../assets/logo.png";
const { Content } = Layout;

const CompleteRegistrationForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  auth: {
    registration_token,
    requestInProgress,
    isRegistrationTokenVerified,
    loading
  },
  notifs: {
    notifications: { error, success },
    id
  },
  notifications,
  register,
  getTokenFromParams,
  verifyRegistrationToken,
  resendEmailLink,
  history
}) => {
  let query = useQuery();

  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const info = () => {
      message.info("Please wait a moment...", 1);
    };
    info();

    console.log("token: ", query.get("token"));
    const r_token = query.get("token");

    if (r_token) {
      getTokenFromParams(r_token);
    }
  }, []);

  useEffect(() => {
    switch (id) {
      case "VERIFY_REGISTRATION_TOKEN_FAILED":
        message.error(error);
        break;
      case "RESEND_EMAIL_LINK_SUCCESS":
        message.success(success);
        break;
      case "RESEND_EMAIL_LINK_FAILED":
        message.error(error ? error : notifications.message);
        setDisabled(true);
        break;
      case "VERIFY_REGISTRATION_TOKEN_FAILED":
        message.error(error);
        break;
      case "REGISTER_SUCCESS":
        message.success(success);
        history.push("/login");
        break;
      case "REGISTER_ERROR":
        message.error(notifications);
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (registration_token) {
      verifyRegistrationToken(registration_token);
    }
  }, [registration_token]);

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
    clearNotifications();

    form.validateFields((err, values) => {
      if (!err) {
        register(values, registration_token);
        resetFields();
      }
    });
  };

  const handleResendEmail = () => {
    clearNotifications();
    resendEmailLink(registration_token);
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
              {isRegistrationTokenVerified ? (
                <Form onSubmit={handleSubmit} className="auth-form">
                  <div className="heading">
                    <img src={logo} alt="" />
                    <h3>Complete your registration</h3>
                  </div>

                  <p>Enter a password for your account</p>
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
                          pattern: new RegExp("(?=.*[@#$%^&+=])"),
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
                      Complete Registration
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Fragment>
                  <div style={{ width: 300 }}>
                    <Alert
                      type="warning"
                      message="Your registration link has expired.
                                        Please get a new one by clicking on the
                                        button below"
                      closable
                    />
                    <Button
                      type="primary"
                      onClick={handleResendEmail}
                      loading={requestInProgress}
                      style={{
                        marginTop: 20
                      }}
                      disabled={disabled}
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

const WrappedCompleteRegistrationForm = Form.create({
  name: "complete_registration"
})(CompleteRegistrationForm);

const mapStatetoProps = state => {
  return {
    auth: state.authReducer,
    notifs: state.notificationReducer,
    notifications: state.notificationReducer.notifications
  };
};

export default connect(
  mapStatetoProps,
  {
    register,
    getTokenFromParams,
    verifyRegistrationToken,
    resendEmailLink,
    clearNotifications
  }
)(WrappedCompleteRegistrationForm);
