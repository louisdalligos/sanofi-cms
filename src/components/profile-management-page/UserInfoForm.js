import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Alert, message } from "antd";

import { updateProfileInfo } from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};

const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 7, offset: 5 }
};

const UserInfoForm = ({
  form,
  form: { getFieldDecorator },
  updateProfileInfo,
  requestInProgress,
  notifs,
  notifId,
  currentUser
}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    if (notifId) {
      if (notifId === "UPDATE_PROFILE_FAILED") {
        message.error(notifs.notifications.error);
      } else if (notifId === "UPDATE_PROFILE_SUCCESS") {
        message.success(notifs.notifications.success);
      } else {
        return;
      }
    }

    clearNotifications();

    if (currentUser) {
      setEmail(currentUser.email);
      setName(currentUser.fullname);
      setDepartment(currentUser.department);
      setRole(currentUser.role);
    }

    console.log("Current user: ", currentUser);
    // eslint-disable-next-line
  }, [notifId, currentUser]); // add error value as a dependency of useEffect

  const check = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // send to server
        updateProfileInfo(values);
        clearNotifications(); // always clear notifications
      }
    });
  };

  return (
    <Form>
      <h3 style={{ marginBottom: 30 }}>Update your profile information</h3>

      <Form.Item {...formItemLayout} label="Work email">
        {getFieldDecorator("email", { initialValue: email })(
          <Input disabled />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Full name">
        {getFieldDecorator(
          "fullname",
          { initialValue: name },
          {
            rules: [
              {
                required: true,
                message: "Please input your name"
              }
            ]
          }
        )(<Input />)}
      </Form.Item>
      {/* <Form.Item {...formItemLayout} label="Last Name">
                {getFieldDecorator("lastName", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your last name"
                        }
                    ]
                })(<Input placeholder="Last name" />)}
            </Form.Item> */}
      <Form.Item {...formItemLayout} label="Department">
        {getFieldDecorator(
          "department",
          { initialValue: department },
          {
            rules: [
              {
                required: true,
                message: "Please input your department"
              }
            ]
          }
        )(<Input />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Role">
        {getFieldDecorator("role", { initialValue: role })(<Input disabled />)}
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={check} loading={requestInProgress}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedUserInfoForm = Form.create({ name: "user_info" })(UserInfoForm);

const mapStateToProps = state => {
  return {
    requestInProgress: state.userMaintenanceReducer.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id,
    currentUser: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { updateProfileInfo, clearNotifications }
)(WrappedUserInfoForm);
