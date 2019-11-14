import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Alert, Layout, Row } from "antd";

import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";
import { forgotPasswordEmail } from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";

import logo from "../../assets/logo.png";
const { Content } = Layout;

const ForgotPasswordForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  requestInProgress,
  clearNotifications,
  notifs: {
    notifications: { error, success },
    id,
    uiType
  },
  forgotPasswordEmail
}) => {
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    switch (id) {
      case "FORGOT_PASSWORD_EMAIL_FAILED":
        setAlert(error);
        setAlertType(uiType);
        break;
      case "FORGOT_PASSWORD_EMAIL_SUCCESS":
        setAlert(success);
        setAlertType(uiType);
        break;
      default:
        setAlert(null);
        return;
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    clearNotifications();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        forgotPasswordEmail(values);
        resetFields();
      }
    });
  };

  const onCloseAlert = e => {
    clearNotifications();
    setAlert(null);
  };

  return (
    <div className="full-page-layout">
      <Layout>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            <Form onSubmit={handleSubmit} className="auth-form">
              <div className="heading">
                <img src={logo} alt="" />
                <h3>Request password reset</h3>
              </div>

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
                    prefix={
                      <Icon
                        type="user"
                        style={{
                          color: "rgba(0,0,0,.25)"
                        }}
                      />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>

              <Form.Item style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={requestInProgress}
                >
                  Send Request
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">Login</Link>
                <Link to="/request-account" style={{ float: "right" }}>
                  Request new account
                </Link>
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

const WrappedForgotPasswordForm = Form.create({ name: "forgot_password" })(
  ForgotPasswordForm
);

const mapStatetoProps = state => {
  return {
    requestInProgress: state.userMaintenanceReducer.requestInProgress,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStatetoProps,
  { forgotPasswordEmail, clearNotifications }
)(WrappedForgotPasswordForm);
