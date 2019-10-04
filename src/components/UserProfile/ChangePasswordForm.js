import React, { useContext, useState } from "react";

import { Form, Input, Button } from "antd";

import AlertContext from "Context/alerts/alertContext";
import Alerts from "Components/Alerts/Alerts";

const alertLayout = {
  wrapperCol: { span: 12 }
};

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 7 }
};

const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 7, offset: 5 }
};

const ChangePasswordForm = ({
  form,
  form: { getFieldDecorator, resetFields }
}) => {
  const alertContext = useContext(AlertContext); // get our alert context
  const { setAlert } = alertContext;

  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);

  const check = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        setAlert("Changes saved!.", "success");
        resetFields();
      } else {
        setAlert("There were some problems in your entries.", "error");
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

  // validate if existing password matches - API call
  const validateExistingEmail = () => {
    console.log("validate existing email");
  };

  return (
    <Form>
      <Form.Item {...alertLayout}>
        <Alerts />
      </Form.Item>

      <Form.Item {...formItemLayout} label="Current Password" hasFeedback>
        {getFieldDecorator("currentPassword", {
          rules: [
            {
              required: true,
              message: "Please input your current password!"
            }
            // {
            //   validator: validateExistingEmail
            // }
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
        {getFieldDecorator("confirm", {
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
        <Button type="primary" onClick={check}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedChangePasswordForm = Form.create({ name: "userInfo" })(
  ChangePasswordForm
);

export default WrappedChangePasswordForm;
