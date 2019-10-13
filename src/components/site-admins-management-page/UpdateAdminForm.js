import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Table, Spin, message, Select } from "antd";

import {
  //updateAdmin,
  fetchCurrentAdmin
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { Option } = Select;

const UpdateAdminForm = ({
  form,
  form: { getFieldDecorator },
  clearNotifications,
  updateAdmin,
  notifs,
  notifId,
  id, // id of our selected admin
  fetchCurrentAdmin,
  superadmin
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchCurrentAdmin(id);
    if (notifId) {
      // if (notifId === "UPDATE_ADMIN_FAILED") {
      //     notifs.notifications.error
      //         ? message.error(notifs.notifications.error)
      //         : null;
      // } else if (notifId === "UPDATE_ADMIN_SUCCESS") {
      //     message.success(notifs.notifications.success);
      // } else {
      //     return;
      // }
    }
    //eslint-disable-next-line
  }, [notifId]);

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        //updateAdmin(values);
        clearNotifications(); // always clear notifications
      }
    });
  };

  return (
    <Fragment>
      <Form
        onSubmit={handleSubmit}
        className=""
        style={{
          width: 400,
          background: "#EEE",
          padding: "20px",
          border: "1px solid #CCC"
        }}
      >
        <Form.Item label="Name">
          {getFieldDecorator(
            "fullname",
            { initialValue: "sdfsdf" },
            {
              rules: [
                {
                  required: true,
                  message: "Please enter the fullname"
                }
              ]
            }
          )(<Input />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Please enter a valid e-mail"
              },
              { required: true, message: "Please input an email" }
            ]
          })(<Input placeholder="Enter an email" />)}
        </Form.Item>

        <Form.Item label="Department">
          {getFieldDecorator("department", {
            rules: [
              {
                required: true,
                message: "Please enter the department"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Role">
          {getFieldDecorator(
            "role",
            { initialValue: "superadmin" },
            {
              rules: [
                {
                  required: true,
                  message: "Please select the role"
                }
              ]
            }
          )(
            <Select>
              <Option value="superadmin">superadmin</Option>
              <Option value="admin">admin</Option>
              <Option value="contenteditor">contenteditor</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={superadmin.requestInProgress}
          >
            Update information
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

const WrappedUpdateAdminForm = Form.create({ name: "update_admin" })(
  UpdateAdminForm
);

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id,
    superadmin: state.superadmin
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrentAdmin, clearNotifications }
)(WrappedUpdateAdminForm);
