import React, { useEffect, useContext, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Table, Spin, message, Select } from "antd";

import {
  fetchAdminRequestList,
  createAdmin
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { Option } = Select;
const customIconLoading = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: "Name",
    dataIndex: "fullname",
    key: "fullname",
    sorter: true
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    sorter: true
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true
  },
  {
    title: "Action",
    render: (text, record) => <Button type="primary">Resend Invitation</Button>,
    key: "action"
  }
];

const CreateAdminForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  requestInProgress,
  adminRequestList,
  fetchAdminRequestList,
  clearNotifications,
  createAdmin,
  notifs,
  notifId
}) => {
  useEffect(() => {
    fetchAdminRequestList();

    if (notifId) {
      // if (notifId === "CREATE_ADMIN_FAILED") {
      //     notifs.notifications.error
      //         ? message.error(notifs.notifications.error)
      //         : null;
      // } else if (notifId === "CREATE_ADMIN_SUCCESS") {
      //     message.success(notifs.notifications.success);
      // } else {
      //     return;
      // }
    }
    //eslint-disable-next-line
  }, [notifId]);

  if (requestInProgress || adminRequestList === null) {
    return (
      <div className="loading-container">
        <Spin indicator={customIconLoading} />
      </div>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createAdmin(values);
        resetFields();
        clearNotifications(); // always clear notifications
      }
    });
  };

  return (
    <Fragment>
      {/* <Table dataSource={adminRequestList} columns={columns} /> */}

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
        <h3 style={{ marginTop: 30, marginBotom: 20 }}>Account Information</h3>
        <Form.Item label="Name">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Please enter the fullname"
              }
            ]
          })(<Input />)}
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
            block
            shape="round"
            loading={requestInProgress}
          >
            Save &amp; Send Invitation
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

const WrappedCreateAdminForm = Form.create({ name: "create_admin" })(
  CreateAdminForm
);

const mapStateToProps = state => {
  return {
    adminRequestList: state.superadmin.adminRequestList,
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id
  };
};

export default connect(
  mapStateToProps,
  { fetchAdminRequestList, createAdmin, clearNotifications }
)(WrappedCreateAdminForm);
