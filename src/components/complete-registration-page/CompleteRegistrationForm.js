import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message, Layout, Row } from "antd";
import { register } from "../../redux/actions/auth-actions/authActions";
import logo from "../../assets/logo.png";
const { Content } = Layout;

const CompleteRegistrationForm = ({
  form,
  form: { getFieldDecorator },
  requestInProgress,
  match,
  location,
  register,
  notifs
}) => {
  // component state
  const [confirmDirty, setConfirmDirty] = useState(false);

  useEffect(() => {
    console.log(match, location);
  }, []);

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

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        register(values);
      }
    });
  };

  return (
    <div className="full-page-layout">
      <Layout>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            <Form onSubmit={handleSubmit} className="auth-form">
              <div className="heading">
                <img src={logo} alt="" />
                <h3>Complete your registration</h3>
              </div>

              {console.log(notifs, "Notifs availabe")}
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input a password!"
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm the password!"
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={handleConfirmBlur} />)}
              </Form.Item>

              <Form.Item label="Position">
                {getFieldDecorator("position", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your position!"
                    }
                  ]
                })(<Input type="text" placeholder="Enter your position" />)}
              </Form.Item>

              <Form.Item style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={requestInProgress}
                >
                  Complete Registration
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

const WrappedCompleteRegistrationForm = Form.create({
  name: "complete_registration"
})(CompleteRegistrationForm);

const mapStatetoProps = state => {
  return {
    requestInProgress: state.authReducer.requestInProgress,
    notifs: state.notificationReducer.notifications
  };
};

export default connect(
  mapStatetoProps,
  { register }
)(WrappedCompleteRegistrationForm);
