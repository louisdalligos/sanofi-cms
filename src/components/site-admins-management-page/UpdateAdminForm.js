import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  PageHeader,
  Breadcrumb,
  Spin
} from "antd";

import {
  updateAdmin,
  fetchCurrentAdmin
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { Option } = Select;
const pageTitle = "Update an admin";

const UpdateAdminForm = ({
  form,
  form: { getFieldDecorator, setFieldsValue },
  clearNotifications,
  updateAdmin,
  superadmin,
  currentAdmin,
  fetchCurrentAdmin,
  notifs: {
    notifications: { error, success },
    id
  },
  match,
  ...props
}) => {
  const [currentAdminId, setCurrentAdminId] = useState(match.params.id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // check if our fetched request from api is available
    if (currentAdmin) {
      setLoading(false);
      setFieldsValue({
        fullname: currentAdmin.fullname,
        email: currentAdmin.email,
        department: currentAdmin.department,
        role: currentAdmin.role
      });
    }
    //eslint-disable-next-line
  }, [currentAdmin]);

  useEffect(() => {
    switch (id) {
      case "UPDATE_ADMIN_FAILED":
        message.error(error ? error : null);
        clearNotifications();
        break;
      case "UPDATE_ADMIN_SUCCESS":
        message.success(success);
        clearNotifications();
        setLoading(true);
        setTimeout(() => {
          fetchCurrentAdmin(currentAdminId);
          setLoading(false);
        }, 2000);
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
        console.log(match.params.id, values);
        updateAdmin(match.params.id, values);
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
              <Breadcrumb.Item key="content">Users</Breadcrumb.Item>
              <Breadcrumb.Item key="admins">
                <Link to="/admins">Site Admins</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="admins-update">
                Update Admin
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button type="primary">
              <Link to="/admins">Back to admins table</Link>
            </Button>
          </div>
        </div>
        <Spin spinning={loading}>
          <Form onSubmit={handleSubmit} className="single-form">
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
                <Select>
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
                loading={superadmin.requestInProgress}
              >
                Update information
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </Fragment>
  );
};

const WrappedUpdateAdminForm = Form.create({ name: "update_admin" })(
  UpdateAdminForm
);

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    superadmin: state.superadmin,
    currentAdmin: state.superadmin.currentAdmin
  };
};

export default connect(
  mapStateToProps,
  { updateAdmin, fetchCurrentAdmin, clearNotifications }
)(WrappedUpdateAdminForm);
