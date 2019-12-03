import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select, message } from "antd";

import { updateProfileInfo } from "../../redux/actions/user-maintenance-actions/userMaintenanceActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 }
};

const formTailLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 7, offset: 5 }
};

const UserInfoForm = ({
    form,
    form: { getFieldDecorator },
    notifs,
    updateProfileInfo,
    requestInProgress,
    currentUser
}) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        switch (notifs.id) {
            case "UPDATE_PROFILE_FAILED":
                notifs.notifications.error
                    ? message.error(notifs.notifications.error)
                    : message.error(
                          "There was an error in processing your request"
                      );
                break;
            case "UPDATE_PROFILE_SUCCESS":
                message.success(notifs.notifications.success);
                break;
            default:
                return;
        }
        // eslint-disable-next-line
    }, [notifs.id]);

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email);
            setName(currentUser.fullname);
            setDepartment(currentUser.department);
            setRole(currentUser.role_type);
        }

        console.log("Current user from profile page: ", currentUser);
        // eslint-disable-next-line
    }, [currentUser]);

    const check = () => {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // send to server
                updateProfileInfo(values);
                clearNotifications(); // always clear notifications
            }
        });
    };

    return (
        <Form>
            <h3 style={{ marginBottom: 30 }}>
                Update your profile information
            </h3>

            <Form.Item {...formItemLayout} label="Work email">
                {getFieldDecorator("email", { initialValue: email })(
                    <Input disabled />
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Full name">
                {getFieldDecorator(
                    "fullname",
                    { initialValue: name },
                    {
                        rules: [
                            {
                                required: true,
                                message: "Please input your name"
                            }
                        ]
                    }
                )(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Department">
                {getFieldDecorator(
                    "department",
                    { initialValue: department },
                    {
                        rules: [
                            {
                                required: true,
                                message: "Please select your department"
                            }
                        ]
                    }
                )(
                    <Select
                        placeholder="Select your department"
                        //   onChange={thandleSelectChange}
                    >
                        <Option value="BOSD">BOSD</Option>
                        <Option value="Marketing">Marketing</Option>
                        <Option value="Sales">Sales</Option>
                        <Option value="ITS">ITS</Option>
                        <Option value="Others">Others</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Role">
                {getFieldDecorator("role", { initialValue: role })(
                    <Input disabled />
                )}
            </Form.Item>
            <Form.Item {...formTailLayout}>
                <Button
                    type="primary"
                    onClick={check}
                    loading={requestInProgress}
                >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedUserInfoForm = Form.create({ name: "user_info" })(UserInfoForm);

const mapStateToProps = state => {
    return {
        notifs: state.notificationReducer,
        requestInProgress: state.userMaintenanceReducer.requestInProgress,
        currentUser: state.authReducer.user
    };
};

export default connect(
    mapStateToProps,
    { updateProfileInfo, clearNotifications }
)(WrappedUserInfoForm);
