import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message, Alert } from "antd";

import {
  changePassword,
  passwordNotification
} from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};

const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 7, offset: 5 }
};

const style = {
  width: 400,
  marginBottom: 30
};

const ChangePasswordForm = ({
  form,
  form: { getFieldDecorator },
  changePassword,
  requestInProgress,
  notifs,
  passwordNotification,
  userMaintenance
}) => {
  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    console.log("mounted comp");
    passwordNotification();
    console.log(userMaintenance);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "PASSWORD_NOTIFICATION_SUCCESS":
        console.log(notifs.notifications.success);
        setAlert(notifs.notifications.success);
        break;
      case "CHANGE_PASSWORD_FAILED":
        notifs.notifications.error
          ? message.error(notifs.notifications.error)
          : message.error("There was an error in processing your request");
        break;
      case "CHANGE_PASSWORD_SUCCESS":
        message.success(notifs.notifications.success);
        break;
      default:
        return;
    }
    // eslint-disable-next-line
  }, [notifs.id]); // add error value as a dependency of useEffect

  const check = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        changePassword(values);
        clearNotifications(); // always clear notifications
      }
    });
  };

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
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Form>
      <h3 style={{ marginBottom: 30 }}>Change your password</h3>

      {userMaintenance && userMaintenance.passwordNotification ? (
        <Alert
          message="Reminder to update your password"
          description={alert}
          type="info"
          style={style}
          showIcon
        />
      ) : null}

      <Form.Item {...formItemLayout} label="Current Password" hasFeedback>
        {getFieldDecorator("current_password", {
          rules: [
            {
              required: true,
              message: "Please input your current password!"
            }
          ]
        })(<Input.Password />)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="Password" hasFeedback>
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
      <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>
        {getFieldDecorator("password_confirmation", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>

      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={check} loading={requestInProgress}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedChangePasswordForm = Form.create({ name: "change_password" })(
  ChangePasswordForm
);

const mapStatetoProps = state => {
  return {
    userMaintenance: state.userMaintenanceReducer,
    requestInProgress: state.userMaintenanceReducer.requestInProgress,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStatetoProps,
  { changePassword, passwordNotification, clearNotifications }
)(WrappedChangePasswordForm);
