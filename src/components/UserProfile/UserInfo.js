import React from "react";

import { Form, Input, Icon, Select, Row, Col, Checkbox, Button } from "antd";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};

const UserInfoForm = ({ form, form: { getFieldDecorator } }) => {
  const check = () => {
    form.validateFields(err => {
      if (!err) {
        console.info("success");
      }
    });
  };

  return (
    <Form>
      <Form.Item {...formItemLayout} label="Work Email">
        <Input value={"Johndoe@gmail.com"} disabled />
      </Form.Item>
      <Form.Item {...formItemLayout} label="First Name">
        {getFieldDecorator("firstName", {
          rules: [
            {
              required: true,
              message: "Please input your first name"
            }
          ]
        })(<Input placeholder="First name" />)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="Last Name">
        {getFieldDecorator("lastName", {
          rules: [
            {
              required: true,
              message: "Please input your last name"
            }
          ]
        })(<Input placeholder="Last name" />)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="Department">
        {getFieldDecorator("department", {
          rules: [
            {
              required: true,
              message: "Please input your department"
            }
          ]
        })(<Input placeholder="Department" />)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="Role">
        <Input value={"administrator"} disabled />
      </Form.Item>

      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={check}>
          Check
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedUserInfoForm = Form.create({ name: "userInfo" })(UserInfoForm);

export default WrappedUserInfoForm;
