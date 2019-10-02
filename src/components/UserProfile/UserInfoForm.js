import React, { useContext } from "react";

import { Form, Input, Button } from "antd";

import AlertContext from "Context/alerts/alertContext";
import Alerts from "Components/Alerts/Alerts";

const alertLayout = {
  wrapperCol: { span: 12 }
};

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 9 }
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};

const UserInfoForm = ({ form, form: { getFieldDecorator, resetFields } }) => {
  const alertContext = useContext(AlertContext); // get our alert context
  const { setAlert } = alertContext;

  const check = () => {
    form.validateFields(err => {
      if (!err) {
        setAlert("Changes saved!.", "success");
        resetFields();
      } else {
        setAlert("There were some problems in your entries.", "error");
      }
    });
  };

  return (
    <Form>
      <Form.Item {...alertLayout}>
        <Alerts />
      </Form.Item>

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
