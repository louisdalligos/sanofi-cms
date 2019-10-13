import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";

import { changePassword } from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};

const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 7, offset: 5 }
};

const ChangePasswordForm = ({
  form,
  form: { getFieldDecorator },
  changePassword,
  requestInProgress,
  notifs,
  notifId
}) => {
  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);

  useEffect(() => {
    if (notifId) {
      // if (notifId === "CHANGE_PASSWORD_FAILED") {
      //     notifs.notifications.error
      //         ? message.error(notifs.notifications.error)
      //         : null;
      // } else if (notifId === "CHANGE_PASSWORD_SUCCESS") {
      //     message.success(notifs.notifications.success);
      // } else {
      //     return;
      // }
    }
    // eslint-disable-next-line
  }, [notifId]); // add error value as a dependency of useEffect

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
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm_password", {
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
    requestInProgress: state.userMaintenanceReducer.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id
  };
};

export default connect(
  mapStatetoProps,
  { changePassword, clearNotifications }
)(WrappedChangePasswordForm);
