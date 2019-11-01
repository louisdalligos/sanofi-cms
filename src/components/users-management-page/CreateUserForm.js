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
  InputNumber,
  Breadcrumb
} from "antd";
import { Link } from "react-router-dom";

import { createUser } from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

import Navbar from "../main-navigation/Navbar";
import InvitedDoctorsTable from "./InvitedDoctorsTable";

const pageTitle = "Create an account";

const CreateUserForm = ({
  form,
  form: { getFieldDecorator, resetFields },
  superadmin,
  clearNotifications,
  createUser,
  notifs,
  ...props
}) => {
  useEffect(() => {}, []);

  useEffect(() => {
    switch (notifs.id) {
      case "CREATE_USER_FAILED":
        notifs.notifications.error
          ? message.error(notifs.notifications.error)
          : message.error(notifs.notifications.errors);
        clearNotifications();
        break;
      case "CREATE_USER_SUCCESS":
        message.success(notifs.notifications.success);
        resetFields(); // reset the fields on the form on success creation
        clearNotifications();
        break;
      default:
        return;
    }

    return () => {
      notifs.id = null;
    };
    //eslint-disable-next-line
  }, [notifs.id]);

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createUser(values);
      }
    });
  };

  return (
    <>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <div className="page-breadcrumb">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item key="users">Users</Breadcrumb.Item>
              <Breadcrumb.Item key="admins">
                <Link to="/doctors">Doctors</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="users-create">
                Create Doctor
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button type="primary">
              <Link to="/doctors">Back to doctors table</Link>
            </Button>
          </div>
        </div>
        <Row>
          <InvitedDoctorsTable />
        </Row>
        <Form
          onSubmit={handleSubmit}
          className="single-form"
          style={{ marginTop: 50 }}
        >
          <h3>Account Information</h3>
          <Form.Item label="First Name">
            {getFieldDecorator("firstname", {
              rules: [
                {
                  required: true,
                  message: "Please enter the first name"
                }
              ]
            })(<Input placeholder="Enter first name" />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastname", {
              rules: [
                {
                  required: true,
                  message: "Please enter the last name"
                }
              ]
            })(<Input placeholder="Enter last name" />)}
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

          <Form.Item label="PRC Number">
            {getFieldDecorator("prc_number", {
              rules: [
                {
                  required: true,
                  message: "Please enter a prc number only"
                }
              ]
            })(<InputNumber />)}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={superadmin.requestInProgress}
            >
              Save &amp; Send Invitation
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const WrappedCreateUserForm = Form.create({ name: "create_user" })(
  CreateUserForm
);

const mapStateToProps = state => {
  return {
    superadmin: state.superadmin,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { createUser, clearNotifications }
)(WrappedCreateUserForm);
