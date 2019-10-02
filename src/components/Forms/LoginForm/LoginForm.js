import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Form, Icon, Input, Button } from "antd";

//import { login } from "Services/redux/actions/authActions";
import { fetchArticles } from "Services/redux/actions/articleActions";

const LoginForm = ({ form, form: { getFieldDecorator }, store }) => {
  const [loading] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        //login(values);
        store.dispatch(fetchArticles());
      } else {
        alert("error");
        console.log(store);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2>Login to your account</h2>
      <Form.Item label="Email">
        {getFieldDecorator("username", {
          rules: [
            {
              type: "email",
              message: "Please enter a valid e-mail"
            },
            { required: true, message: "Please input your email" }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item label="Password">
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/forgot-password">Forgot password</Link>
        <Link to="/request-account" style={{ float: "right" }}>
          Request new account
        </Link>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default WrappedLoginForm;
