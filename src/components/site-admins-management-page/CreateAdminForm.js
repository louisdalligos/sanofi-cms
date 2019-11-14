import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  Row,
  PageHeader,
  Breadcrumb
} from "antd";
import { Link } from "react-router-dom";

import { createAdmin } from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

import AdminRequestTable from "./AdminRequestTable";

const { Option } = Select;
const pageTitle = "Create an admin";

const CreateAdminForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  requestInProgress,
  clearNotifications,
  createAdmin,
  notifs: {
    notifications: { error, success },
    id
  },
  ...props
}) => {
  useEffect(() => {
    switch (id) {
      case "CREATE_ADMIN_FAILED":
        message.error(error ? error : null);
        clearNotifications();
        break;
      case "CREATE_ADMIN_SUCCESS":
        message.success(success);
        clearNotifications();
        resetFields(); // reset the fields on the form on success creation
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createAdmin(values);
      }
    });
  };

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <div className="page-breadcrumb">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item key="users">Users</Breadcrumb.Item>
              <Breadcrumb.Item key="admins">
                <Link to="/admins">Site Admins</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="admins-create">
                Create Admin
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button type="primary">
              <Link to="/admins">Back to admins table</Link>
            </Button>
          </div>
        </div>

        <Row>
          <h3 style={{ marginBottom: 30 }}>List of admin requests</h3>
          <AdminRequestTable />
        </Row>

        <Form onSubmit={handleSubmit} className="single-form">
          <h3>Account Information</h3>
          <Form.Item label="Name">
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  message: "Please enter the fullname"
                }
              ]
            })(<Input placeholder="Enter fullname" />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Please enter a valid e-mail"
                },
                {
                  required: true,
                  message: "Please input an email"
                }
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
            })(
              <Select placeholder="Select your department">
                <Option value="BOSD">BOSD</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Sales">Sales</Option>
                <Option value="ITS">ITS</Option>
                <Option value="Others">Others</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Role">
            {getFieldDecorator("role", {
              rules: [
                {
                  required: true,
                  message: "Please select the role"
                }
              ]
            })(
              <Select placeholder="Select a role">
                <Option value="superadmin">Super Admin</Option>
                <Option value="admin">Admin</Option>
                <Option value="editor">Content Editor</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={requestInProgress}
            >
              Save &amp; Send Invitation
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

const WrappedCreateAdminForm = Form.create({ name: "create_admin" })(
  CreateAdminForm
);

const mapStateToProps = state => {
  return {
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { createAdmin, clearNotifications }
)(WrappedCreateAdminForm);
