import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Alert, Layout, Row } from "antd";

import { signin } from "../../redux/actions/auth-actions/authActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

import logo from "../../assets/logo.png";

const { Content } = Layout;

const LoginForm = ({
    form,
    form: { getFieldDecorator },
    auth: { requestInProgress, user },
    notifs,
    history,
    signin,
    clearNotifications
}) => {
    const [alert, setAlert] = useState(null);
    const [alertType, setAlertType] = useState(null);

    useEffect(() => {
        switch (notifs.id) {
            case "SIGNIN_SUCCESS":
                history.push("/");
                clearNotifications();
                break;
            case "SIGNIN_FAILURE":
                setAlert(
                    notifs.notifications.error
                        ? notifs.notifications.error
                        : notifs.notifications.message
                );
                setAlertType(notifs.uiType);
                break;
            default:
                setAlert(null);
                return;
        }
        // eslint-disable-next-line
    }, [notifs.id]);

    const handleSubmit = e => {
        e.preventDefault();
        clearNotifications();

        form.validateFields((err, values) => {
            if (!err) {
                signin(values);
            }
        });
    };

    const onCloseAlert = e => {
        clearNotifications();
        setAlert(null);
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
                                <h3>Login to your account</h3>
                            </div>

                            {/* Handle response messages on UI */}
                            {alert ? (
                                <Alert
                                    type={alertType}
                                    message={alert}
                                    closable
                                    onClose={onCloseAlert}
                                />
                            ) : null}

                            <Form.Item label="Email">
                                {getFieldDecorator("email", {
                                    rules: [
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid e-mail"
                                        },
                                        {
                                            required: true,
                                            message: "Please input your email"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Password">
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item style={{ marginTop: 20 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    block
                                    loading={requestInProgress}
                                >
                                    Login
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/forgot-password">
                                    Forgot password
                                </Link>
                                <Link
                                    to="/request-account"
                                    style={{ float: "right" }}
                                >
                                    Request new account
                                </Link>
                            </Form.Item>
                        </Form>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

const mapStatetoProps = state => {
    return {
        auth: state.authReducer,
        notifs: state.notificationReducer
    };
};

export default connect(
    mapStatetoProps,
    { signin, clearNotifications }
)(WrappedLoginForm);
