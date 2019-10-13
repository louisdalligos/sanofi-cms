import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Alert } from "antd";

import { requestAccount } from "../../redux/actions/auth-actions/authActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// @todo helper

const RequestAccountForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  requestInProgress,
  requestAccount,
  clearNotifications,
  notifs,
  notifId
}) => {
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    if (notifId) {
      console.log("Notifications has changed");
      if (notifId === "REQUEST_ACCOUNT_ERROR") {
        setAlert(notifs.notifications.error);
        setAlertType(notifs.uiType);
      } else if (notifId === "REQUEST_ACCOUNT_SUCCESS") {
        setAlert(notifs.notifications.success);
        setAlertType(notifs.uiType);
      } else {
        setAlert(null);
      }
    }

    // eslint-disable-next-line
  }, [notifId]);

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        requestAccount(values);
        resetFields();
      }
    });

    clearNotifications();
  };

  const onCloseAlert = e => {
    clearNotifications();
    setAlert(null);
  };
  return (
    <div style={{ margin: "50px auto 0", width: "300px" }}>
      <Form onSubmit={handleSubmit} className="auth-form">
        <h2>Request new account</h2>

        {/* Handle response messages on UI */}
        {alert ? (
          <Alert
            type={alertType}
            message={alert}
            closable
            onClose={onCloseAlert}
          />
        ) : null}

        <Form.Item label="Full Name">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Please input your full name"
              }
            ]
          })(<Input placeholder="Full name" />)}
        </Form.Item>

        <Form.Item label="Your Sanofi Email">
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
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Department">
          {getFieldDecorator("department", {
            rules: [
              {
                required: true,
                message: "Please input your department!"
              }
            ]
          })(<Input type="text" placeholder="Enter your department" />)}
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
      </Form>
    </div>
  );
};

const WrappedRequestAccountForm = Form.create({ name: "request_account" })(
  RequestAccountForm
);

const mapStatetoProps = state => {
  return {
    requestInProgress: state.authReducer.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id
  };
};

export default connect(
  mapStatetoProps,
  { requestAccount, clearNotifications }
)(WrappedRequestAccountForm);
