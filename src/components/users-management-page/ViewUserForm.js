import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, PageHeader, Row, Descriptions, Spin } from "antd";

import { fetchCurrentUser } from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const pageTitle = "View doctor's information";

const ViewUserForm = ({ superadmin, currentUser, match, ...props }) => {
    const [loading, setLoading] = useState(false);

    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [yearsOfPractice, setYearsOfPractice] = useState(null);
    const [alumni, setAlumni] = useState(null);
    const [mobile, setMobile] = useState(null);

    useEffect(() => {
        setLoading(true);

        if (currentUser && loading) {
            setLoading(false);
            setFirstName(currentUser.firstname);
            setLastName(currentUser.lastname);
            setDateOfBirth(currentUser.date_of_birth);
            setYearsOfPractice(currentUser.years_of_practice);
            setAlumni(
                currentUser.alumni && currentUser.alumni === 1 ? "yes" : null
            );
            setMobile(currentUser.mobile_number);
        }
        //eslint-disable-next-line
    }, [currentUser]);

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />
                <Row>
                    <Button
                        type="primary"
                        style={{ float: "right", zIndex: 500 }}
                    >
                        <Link to="/doctors">Back to Doctors Table</Link>
                    </Button>
                </Row>
                <Spin spinning={loading}>
                    <Descriptions title="Account Information" layout="vertical">
                        <Descriptions.Item label="First name">
                            {firstname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Name">
                            {lastname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of birth">
                            {dateOfBirth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Years of practice">
                            {yearsOfPractice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Alumni">
                            {alumni}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">
                            {mobile}
                        </Descriptions.Item>
                    </Descriptions>
                </Spin>
            </div>
        </Fragment>
    );
};

const WrappedViewUserForm = Form.create({ name: "view_user" })(ViewUserForm);

const mapStateToProps = state => {
    return {
        superadmin: state.superadmin,
        currentUser: state.superadmin.currentUser
    };
};

export default connect(
    mapStateToProps,
    { fetchCurrentUser, clearNotifications }
)(WrappedViewUserForm);
